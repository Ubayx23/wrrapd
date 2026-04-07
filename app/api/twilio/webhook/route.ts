import { twiml } from 'twilio';
import { createClient } from '@supabase/supabase-js';

function todayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function twimlReply(text: string): Response {
  const response = new twiml.MessagingResponse();
  response.message(text);
  return new Response(response.toString(), {
    headers: { 'Content-Type': 'text/xml' },
  });
}

export async function POST(req: Request) {
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const contentType = req.headers.get('content-type') ?? '';
  let from = '';
  let body = '';

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const text = await req.text();
    const params = new URLSearchParams(text);
    from = params.get('From') ?? '';
    body = params.get('Body') ?? '';
  } else {
    const json = await req.json().catch(() => ({}));
    from = json.From ?? '';
    body = json.Body ?? '';
  }

  console.log(`[wrrapd/webhook] inbound from=${from} body="${body}"`);

  if (!from) {
    return twimlReply('could not identify sender.');
  }

  const { data: user, error: userError } = await adminSupabase
    .from('profiles')
    .select('id, goal')
    .eq('phone_number', from)
    .single();

  if (userError || !user) {
    console.log(`[wrrapd/webhook] no user found for phone ${from}`);
    return twimlReply('number not recognized.');
  }

  const today = todayDate();

  const { data: existing } = await adminSupabase
    .from('check_ins')
    .select('id')
    .eq('user_id', user.id)
    .eq('date', today)
    .single();

  if (existing) {
    console.log(`[wrrapd/webhook] user ${user.id} already checked in today, ignoring`);
    return twimlReply('already got your reply for today.');
  }

  const normalized = body.trim().toLowerCase();
  let response: 'yes' | 'no' | null = null;

  if (normalized.startsWith('y')) response = 'yes';
  else if (normalized.startsWith('n')) response = 'no';

  if (!response) {
    console.log(`[wrrapd/webhook] unrecognized reply from ${from}: "${body}"`);
    return twimlReply('reply yes or no. that\'s it.');
  }

  const { count } = await adminSupabase
    .from('check_ins')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const dayCount = (count ?? 0) + 1;

  const { error: insertError } = await adminSupabase
    .from('check_ins')
    .insert({
      user_id:   user.id,
      date:      today,
      response,
      day_count: dayCount,
    });

  if (insertError) {
    console.error(`[wrrapd/webhook] insert failed for user ${user.id}:`, insertError);
    return twimlReply('something went wrong. try again.');
  }

  console.log(`[wrrapd/webhook] recorded ${response} for user ${user.id}, day_count=${dayCount}`);

  const replyText = `noted. ${dayCount} days in.`;

  return twimlReply(replyText);
}
