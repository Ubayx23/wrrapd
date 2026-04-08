import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await request.json();
  const { userId, response } = body;

  console.log('[wrrapd/checkin] userId:', userId, 'response:', response);

  if (!userId || !response) {
    return NextResponse.json({ success: false, error: 'missing userId or response' }, { status: 400 });
  }

  if (response !== 'yes' && response !== 'no') {
    return NextResponse.json({ success: false, error: 'response must be yes or no' }, { status: 400 });
  }

  const today = new Date().toISOString().slice(0, 10);

  // Check for existing check-in today
  const { data: existing } = await adminSupabase
    .from('check_ins')
    .select('id, response')
    .eq('user_id', userId)
    .eq('date', today)
    .maybeSingle();

  if (existing) {
    console.log('[wrrapd/checkin] already checked in today for user:', userId);
    return NextResponse.json({ success: false, error: 'already checked in today' }, { status: 409 });
  }

  // Get total check-in count for this user
  const { count } = await adminSupabase
    .from('check_ins')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId);

  const dayCount = (count ?? 0) + 1;

  const { error: insertError } = await adminSupabase
    .from('check_ins')
    .insert({
      user_id: userId,
      date: today,
      response,
      day_count: dayCount,
    });

  if (insertError) {
    console.error('[wrrapd/checkin] insert error:', insertError.message);
    return NextResponse.json({ success: false, error: insertError.message }, { status: 500 });
  }

  console.log('[wrrapd/checkin] recorded', response, 'for user', userId, 'day_count:', dayCount);
  return NextResponse.json({ success: true, day_count: dayCount });
}
