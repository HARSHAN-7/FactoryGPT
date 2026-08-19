import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getAdminSupabaseClient } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const errorParam = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  // Handle Google OAuth Cancellation or Access Denied
  if (errorParam || errorDescription) {
    const errorMsg = errorDescription || errorParam || 'Google authentication was canceled or denied.';
    return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=${encodeURIComponent(errorMsg)}`);
  }

  if (code) {
    const cookieStore = cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (e) {}
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (e) {}
        },
      },
    });

    const { data: sessionData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('Google OAuth Exchange Error:', exchangeError.message);
      return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=${encodeURIComponent(exchangeError.message)}`);
    }

    if (sessionData?.user) {
      const user = sessionData.user;
      const userEmail = user.email || '';
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || userEmail.split('@')[0];

      // Save or update Google user profile in 'profiles' table without duplicating accounts
      const supabaseAdmin = getAdminSupabaseClient();
      if (supabaseAdmin) {
        await supabaseAdmin.from('profiles').upsert({
          id: user.id,
          email: userEmail,
          full_name: fullName,
          role: 'Technician',
          auth_provider: 'google',
          updated_at: new Date().toISOString(),
        });
      }

      // Successful Google Authentication -> Redirect to FactoryGPT Dashboard
      return NextResponse.redirect(`${requestUrl.origin}/chat`);
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/chat`);
}
