import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  console.log('[wrrapd/send/test] received request');
  console.log('[wrrapd/send/test] TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER);

  const body = await request.json();
  const { userId } = body;

  console.log('[wrrapd/send/test] userId:', userId);

  if (!userId) {
    console.error('[wrrapd/send/test] missing userId');
    return NextResponse.json({ success: false, error: 'missing userId' }, { status: 400 });
  }

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log('[wrrapd/send/test] fetching profile...');
  const { data: profile, error: profileError } = await adminSupabase
    .from('profiles')
    .select('id, name, goal, phone_number')
    .eq('id', userId)
    .single();

  if (profileError || !profile) {
    console.error('[wrrapd/send/test] profile fetch error:', profileError?.message);
    return NextResponse.json({ success: false, error: profileError?.message ?? 'profile not found' }, { status: 404 });
  }

  console.log('[wrrapd/send/test] profile:', { name: profile.name, goal: profile.goal, phone: profile.phone_number });

  if (!profile.phone_number) {
    console.error('[wrrapd/send/test] no phone_number on profile');
    return NextResponse.json({ success: false, error: 'no phone number on profile' }, { status: 400 });
  }

  console.log('[wrrapd/send/test] counting check_ins...');
  const { count, error: countError } = await adminSupabase
    .from('check_ins')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (countError) {
    console.error('[wrrapd/send/test] count error:', countError.message);
  }

  const totalCheckIns = count ?? 0;
  console.log('[wrrapd/send/test] total check_ins:', totalCheckIns);

  const messageBody = totalCheckIns === 0
    ? `did you show up for ${profile.goal} today? yes or no.`
    : `did you show up for ${profile.goal} today?`;

  console.log('[wrrapd/send/test] sending message:', messageBody);
  console.log('[wrrapd/send/test] to:', profile.phone_number);

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const msg = await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: profile.phone_number,
    });
    console.log('[wrrapd/send/test] success! sid:', msg.sid, 'status:', msg.status);
    return NextResponse.json({ success: true, phone: profile.phone_number, sid: msg.sid });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[wrrapd/send/test] twilio error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
