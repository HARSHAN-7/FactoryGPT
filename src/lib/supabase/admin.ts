import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Admin Supabase client using SUPABASE_SERVICE_ROLE_KEY.
 * MUST ONLY be imported in Server Components, Server Actions, or API Routes.
 */
export function getAdminSupabaseClient() {
  if (typeof window !== 'undefined') {
    throw new Error('CRITICAL SECURITY ALERT: getAdminSupabaseClient cannot be invoked on the client side.');
  }

  if (!supabaseUrl || !serviceRoleKey || serviceRoleKey === 'your-supabase-service-role-key') {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
