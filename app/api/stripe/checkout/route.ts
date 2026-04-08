import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await request.json();
  const { userId } = body;

  console.log('[wrrapd/stripe/checkout] userId:', userId);

  if (!userId) {
    return NextResponse.json({ success: false, error: 'missing userId' }, { status: 400 });
  }

  const { data: profile, error: profileError } = await adminSupabase
    .from('profiles')
    .select('id, name, email, phone_number, stripe_customer_id')
    .eq('id', userId)
    .single();

  if (profileError || !profile) {
    console.error('[wrrapd/stripe/checkout] profile fetch error:', profileError?.message);
    return NextResponse.json({ success: false, error: profileError?.message ?? 'profile not found' }, { status: 404 });
  }

  console.log('[wrrapd/stripe/checkout] profile:', { name: profile.name, email: profile.email });

  let stripeCustomerId = profile.stripe_customer_id;

  if (!stripeCustomerId) {
    console.log('[wrrapd/stripe/checkout] creating new Stripe customer...');
    const customer = await stripe.customers.create({
      email: profile.email ?? undefined,
      name: profile.name ?? undefined,
      metadata: { userId },
    });
    stripeCustomerId = customer.id;
    console.log('[wrrapd/stripe/checkout] created customer:', stripeCustomerId);

    const { error: updateError } = await adminSupabase
      .from('profiles')
      .update({ stripe_customer_id: stripeCustomerId })
      .eq('id', userId);

    if (updateError) {
      console.error('[wrrapd/stripe/checkout] failed to save stripe_customer_id:', updateError.message);
    }
  } else {
    console.log('[wrrapd/stripe/checkout] reusing existing customer:', stripeCustomerId);
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{
      price: process.env.STRIPE_PRICE_ID,
      quantity: 1,
    }],
    subscription_data: {
      trial_period_days: 7,
    },
    success_url: 'https://wrrapd.app/dashboard?paid=true',
    cancel_url: 'https://wrrapd.app/dashboard',
  });

  console.log('[wrrapd/stripe/checkout] session created:', session.id, 'url:', session.url);

  return NextResponse.json({ success: true, url: session.url });
}
