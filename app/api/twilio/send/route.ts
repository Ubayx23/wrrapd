import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function currentHourLabel(): string {
  const now = new Date();
  const h = now.getHours();
  if (h === 0) return '12am';
  if (h < 12) return `${h}am`;
  if (h === 12) return '12pm';
  return `${h - 12}pm`;
}

function hourToValue(label: string): string {
  const map: Record<string, string> = {
    '12am': '00:00',
    '1am':  '01:00',
    '2am':  '02:00',
    '3am':  '03:00',
    '4am':  '04:00',
    '5am':  '05:00',
    '6am':  '06:00',
    '7am':  '07:00',
    '8am':  '08:00',
    '9am':  '09:00',
    '10am': '10:00',
    '11am': '11:00',
    '12pm': '12:00',
    '1pm':  '13:00',
    '2pm':  '14:00',
    '3pm':  '15:00',
    '4pm':  '16:00',
    '5pm':  '17:00',
    '6pm':  '18:00',
    '7pm':  '19:00',
    '8pm':  '20:00',
    '9pm':  '21:00',
    '10pm': '22:00',
    '11pm': '23:00',
  };
  return map[label] ?? '';
}

export async function GET() {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const hourLabel = currentHourLabel();
  const checkInValue = hourToValue(hourLabel);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  console.log(`[wrrapd/send] hour: ${hourLabel} (${checkInValue}), running at ${new Date().toISOString()}`);

  if (!checkInValue) {
    return NextResponse.json({ error: 'could not determine current hour' }, { status: 500 });
  }

  const { data: users, error: dbError } = await adminSupabase
    .from('profiles')
    .select('id, name, goal, phone_number, check_in_time')
    .eq('check_in_time', checkInValue)
    .not('phone_number', 'is', null)
    .or(`is_active.eq.true,created_at.gte.${sevenDaysAgo}`);

  if (dbError) {
    console.error('[wrrapd/send] db error:', dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  console.log(`[wrrapd/send] found ${users?.length ?? 0} users to text`);

  const results: { userId: string; phone: string; status: string; error?: string }[] = [];

  for (const user of users ?? []) {
    const messageBody = `did you show up for ${user.goal} today?\nreply yes or no. first reply counts.`;
    try {
      const msg = await client.messages.create({
        body: messageBody,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.phone_number,
      });
      console.log(`[wrrapd/send] sent to ${user.phone_number} sid=${msg.sid}`);
      results.push({ userId: user.id, phone: user.phone_number, status: 'sent' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[wrrapd/send] failed to send to ${user.phone_number}:`, message);
      results.push({ userId: user.id, phone: user.phone_number, status: 'failed', error: message });
    }
  }

  const sent   = results.filter(r => r.status === 'sent').length;
  const failed = results.filter(r => r.status === 'failed').length;

  return NextResponse.json({
    hour: hourLabel,
    usersMatched: users?.length ?? 0,
    sent,
    failed,
    results,
  });
}
