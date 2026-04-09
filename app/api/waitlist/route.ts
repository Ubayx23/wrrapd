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

  const { email, phone } = body;

  if (!email || !phone) {
    return NextResponse.json({ error: 'email and phone required' }, { status: 400 });
  }

  console.log('[waitlist] inserting:', { email, phone });

  const { error } = await supabase
    .from('waitlist')
    .insert({ email, phone });

  if (error) {
    console.error('[waitlist] insert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('[waitlist] success for:', email);
  return NextResponse.json({ success: true });
}
