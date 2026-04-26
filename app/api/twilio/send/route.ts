import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  console.log('[wrrapd/send] TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER);
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const currentHour = new Date().getHours();
  const trialWindowStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  console.log(`[wrrapd/send] running at ${new Date().toISOString()}, current hour: ${currentHour}`);

  const { data: users, error: dbError } = await adminSupabase
    .from('profiles')
    .select('id, name, goal, phone_number, check_in_time')
    .not('phone_number', 'is', null)
    .or(`is_active.eq.true,created_at.gte.${trialWindowStart}`);

  if (dbError) {
    console.error('[wrrapd/send] db error:', dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  console.log(`[wrrapd/send] total users fetched: ${users?.length ?? 0}`);

  const results: { userId: string; phone: string; status: string; error?: string }[] = [];

  for (const user of users ?? []) {
    const [h] = user.check_in_time.split(':');
    const userHour = parseInt(h, 10);

    console.log(`[wrrapd/send] user ${user.id} check_in_time=${user.check_in_time} userHour=${userHour} currentHour=${currentHour}`);

    if (userHour !== currentHour) {
      console.log(`[wrrapd/send] skipping user ${user.id} (hour mismatch)`);
      continue;
    }

    const today = new Date().toISOString().slice(0, 10);
    const { data: alreadyTexted } = await adminSupabase
      .from('check_ins')
      .select('id')
      .eq('user_id', user.id)
      .eq('date', today)
      .maybeSingle();

    if (alreadyTexted) {
      console.log(`[wrrapd/send] skipping user ${user.id} (already has check_in today)`);
      continue;
    }

    const messageBody = `did you show up for ${user.goal} today?\nreply yes or no. first reply counts.`;

    console.log(`[wrrapd/send] sending to ${user.phone_number} for goal: ${user.goal}`);

    try {
      const msg = await client.messages.create({
        body: messageBody,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.phone_number,
      });
      console.log(`[wrrapd/send] success: sent to ${user.phone_number} sid=${msg.sid}`);
      results.push({ userId: user.id, phone: user.phone_number, status: 'sent' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[wrrapd/send] error sending to ${user.phone_number}:`, message);
      results.push({ userId: user.id, phone: user.phone_number, status: 'failed', error: message });
    }
  }

  const sent   = results.filter(r => r.status === 'sent').length;
  const failed = results.filter(r => r.status === 'failed').length;

  return NextResponse.json({
    currentHour,
    usersMatched: results.length,
    sent,
    failed,
    results,
  });
}
