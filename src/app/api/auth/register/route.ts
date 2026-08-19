import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabaseClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, fullName } = body || {};

    // 1. Validate required inputs
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json(
        { error: 'Full Name is required.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'Work Email Address is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address (e.g., operator@factory.com).' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const cleanedEmail = email.trim().toLowerCase();
    const cleanedName = fullName.trim();

    const supabaseAdmin = getAdminSupabaseClient();

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database service role configuration missing. Please check server environment variables.' },
        { status: 500 }
      );
    }

    // 2. Check if user with this email already exists in 'profiles' or Supabase Auth
    const { data: existingProfiles, error: profileCheckError } = await supabaseAdmin
      .from('profiles')
      .select('id, email')
      .eq('email', cleanedEmail)
      .limit(1);

    if (existingProfiles && existingProfiles.length > 0) {
      return NextResponse.json(
        { error: 'An account with this email address is already registered. Please sign in instead.' },
        { status: 409 }
      );
    }

    // 3. Create User in Supabase Auth securely (Password hashed automatically by Supabase Auth BCrypt)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: cleanedEmail,
      password: password,
      email_confirm: true,
      user_metadata: {
        full_name: cleanedName,
        role: 'Technician',
        provider: 'email',
      },
    });

    if (authError) {
      console.error('Supabase Auth User Creation Error:', authError);
      
      const msg = authError.message || '';
      if (msg.includes('already been registered') || msg.includes('already exists')) {
        return NextResponse.json(
          { error: 'An account with this email address is already registered. Please sign in instead.' },
          { status: 409 }
        );
      }
      if (msg.includes('at least 6 characters')) {
        return NextResponse.json(
          { error: 'Password must be at least 6 characters long.' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: authError.message || 'Failed to create account in database.' },
        { status: 400 }
      );
    }

    if (!authData?.user) {
      return NextResponse.json(
        { error: 'Failed to create user session in database.' },
        { status: 500 }
      );
    }

    const userId = authData.user.id;

    // 4. Save User Profile in PostgreSQL 'profiles' table
    const { error: profileUpsertError } = await supabaseAdmin.from('profiles').upsert({
      id: userId,
      email: cleanedEmail,
      full_name: cleanedName,
      role: 'Technician',
      auth_provider: 'email',
      updated_at: new Date().toISOString(),
    });

    if (profileUpsertError) {
      console.warn('Profile DB upsert warning:', profileUpsertError.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: userId,
        email: cleanedEmail,
        fullName: cleanedName,
        role: 'Technician',
        factoryName: 'Apex Automotive Plant #4',
      },
    });
  } catch (error: any) {
    console.error('Registration Route Uncaught Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Server error occurred during registration. Please try again.' },
      { status: 500 }
    );
  }
}
