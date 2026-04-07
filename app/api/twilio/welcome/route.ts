import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  console.log('[wrrapd/welcome] received request');

  const body = await request.json();
  const { userId } = body;

  console.log('[wrrapd/welcome] userId:', userId);

  if (!userId) {
    console.error('[wrrapd/welcome] missing userId');
    return NextResponse.json({ success: false, error: 'missing userId' }, { status: 400 });
  }

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log('[wrrapd/welcome] fetching profile...');
  const { data: profile, error: profileError } = await adminSupabase
    .from('profiles')
    .select('id, name, goal, phone_number')
    .eq('id', userId)
    .single();

  if (profileError || !profile) {
    console.error('[wrrapd/welcome] profile fetch error:', profileError?.message);
    return NextResponse.json({ success: false, error: profileError?.message ?? 'profile not found' }, { status: 404 });
  }

  console.log('[wrrapd/welcome] profile found:', { name: profile.name, goal: profile.goal, phone: profile.phone_number });

  if (!profile.phone_number) {
    console.error('[wrrapd/welcome] no phone_number on profile');
    return NextResponse.json({ success: false, error: 'no phone number on profile' }, { status: 400 });
  }

  const messageBody = `welcome to wrrapd.\ndid you show up for ${profile.goal} today?\nyes or no. reply STOP anytime to opt out.`;

  console.log('[wrrapd/welcome] sending message to:', profile.phone_number);
  console.log('[wrrapd/welcome] message body:', messageBody);

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
    console.log('[wrrapd/welcome] twilio response:', { sid: msg.sid, status: msg.status, to: msg.to, from: msg.from });
    return NextResponse.json({ success: true, sid: msg.sid });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[wrrapd/welcome] twilio error:', message);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
