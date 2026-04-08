import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const sig = request.headers.get('stripe-signature');
  const rawBody = await request.text();

  console.log('[wrrapd/stripe/webhook] received event, sig:', sig?.slice(0, 20));

  if (!sig) {
    console.error('[wrrapd/stripe/webhook] missing stripe-signature header');
    return NextResponse.json({ error: 'missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[wrrapd/stripe/webhook] signature verification failed:', message);
    return NextResponse.json({ error: `webhook error: ${message}` }, { status: 400 });
  }

  console.log('[wrrapd/stripe/webhook] event type:', event.type);

  async function setActiveByCustomer(customerId: string, isActive: boolean) {
    const { error } = await adminSupabase
      .from('profiles')
      .update({ is_active: isActive })
      .eq('stripe_customer_id', customerId);
    if (error) {
      console.error(`[wrrapd/stripe/webhook] failed to set is_active=${isActive} for customer ${customerId}:`, error.message);
    } else {
      console.log(`[wrrapd/stripe/webhook] set is_active=${isActive} for customer ${customerId}`);
    }
  }

  switch (event.type) {
    case 'customer.subscription.created': {
      const sub = event.data.object as Stripe.Subscription;
      console.log('[wrrapd/stripe/webhook] subscription created:', sub.id, 'customer:', sub.customer);
      await setActiveByCustomer(sub.customer as string, true);
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      console.log('[wrrapd/stripe/webhook] subscription deleted:', sub.id, 'customer:', sub.customer);
      await setActiveByCustomer(sub.customer as string, false);
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log('[wrrapd/stripe/webhook] payment succeeded, invoice:', invoice.id, 'customer:', invoice.customer, 'amount:', invoice.amount_paid);
      await setActiveByCustomer(invoice.customer as string, true);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      console.error('[wrrapd/stripe/webhook] payment failed, invoice:', invoice.id, 'customer:', invoice.customer);
      await setActiveByCustomer(invoice.customer as string, false);
      break;
    }

    default:
      console.log('[wrrapd/stripe/webhook] unhandled event type:', event.type);
  }

  return NextResponse.json({ received: true });
}
