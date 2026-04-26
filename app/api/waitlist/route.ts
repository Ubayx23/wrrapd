import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let body: { email?: string; phone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const phone = body.phone?.trim();

  if (!email || !phone) {
    return NextResponse.json({ error: 'email and phone required' }, { status: 400 });
  }

  console.log('[waitlist] inserting:', { email, phone });

  const { error } = await supabase
    .from('waitlist')
    .insert({ email, phone });

  if (error) {
    console.error('[waitlist] insert error:', error);

    if (error.code === '23505') {
      const msg = error.message ?? '';
      if (msg.includes('email')) {
        return NextResponse.json({ error: "you're already on the list" }, { status: 409 });
      }
      if (msg.includes('phone')) {
        return NextResponse.json({ error: 'that phone is already on the list' }, { status: 409 });
      }
      return NextResponse.json({ error: "you're already on the list" }, { status: 409 });
    }

    return NextResponse.json({ error: 'something went wrong. try again.' }, { status: 500 });
  }

  console.log('[waitlist] success for:', email);
  return NextResponse.json({ success: true });
}
