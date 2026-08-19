import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabaseClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const supabaseAdmin = getAdminSupabaseClient();
    let userId: string = `usr-${Date.now()}`;
    let userEmail: string = email;

    if (supabaseAdmin) {
      const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName || email.split('@')[0], role: 'Technician' },
      });

      if (!createError && createData?.user) {
        userId = createData.user.id;
      } else {
        const { data: existingProfiles } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('email', email)
          .limit(1);

        if (existingProfiles && existingProfiles.length > 0) {
          userId = existingProfiles[0].id;
        }
      }

      await supabaseAdmin.from('profiles').upsert({
        id: userId,
        email: userEmail,
        full_name: fullName || email.split('@')[0],
        role: 'Technician',
        updated_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: userEmail,
        fullName: fullName || email.split('@')[0],
        role: 'Technician',
        factoryName: 'Apex Automotive Plant #4',
      },
    });
  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ error: error.message || 'Registration failed' }, { status: 500 });
  }
}
