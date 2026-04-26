'use server';

import { createClient } from '@supabase/supabase-js';

export async function insertProfile(payload: {
  id: string;
  name: string;
  goal: string;
  phone_number: string;
  email: string;
  check_in_time: string;
  consented_at: string;
}): Promise<{ success: boolean; error?: string; reset?: boolean }> {
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log('[wrrapd] insertProfile called with:', payload);

  const { data, error } = await adminSupabase
    .from('profiles')
    .upsert(payload)
    .select()
    .single();

  console.log('[wrrapd] insertProfile result — full row:', data, '| error:', error);

  if (error) {
    if (error.code === '23505') {
      const msg = error.message ?? '';
      if (msg.includes('phone_number') || msg.includes('phone')) {
        return { success: false, error: 'that phone is already on an account. try signing in.' };
      }
      if (msg.includes('email')) {
        return { success: false, error: 'that email is already on an account. try signing in.' };
      }
      return { success: false, error: 'an account already exists with these details. try signing in.' };
    }
    if (error.code === '23503') {
      return { success: false, error: 'your session expired. starting over.', reset: true };
    }
    return { success: false, error: `${error.message} (code: ${error.code})` };
  }

  const check = await adminSupabase
    .from('profiles')
    .select('*')
    .eq('id', payload.id)
    .single();

  console.log('profile check:', check);

  if (!check.data) {
    return { success: false, error: 'profile not found after insert' };
  }

  return { success: true };
}
