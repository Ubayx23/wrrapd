'use client';

import { useEffect } from 'react';

export default function TermsPage() {
  useEffect(() => {
    const prev = document.body.style.cssText;
    document.body.style.cssText = 'background-color: #0a0a0a; margin: 0; padding: 0; overflow-x: hidden;';
    return () => { document.body.style.cssText = prev; };
  }, []);

  return (
    <div style={{
      minHeight: '100dvh',
      width: '100vw',
      maxWidth: '100%',
      background: '#0a0a0a',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 680,
        margin: '0 auto',
        padding: 'clamp(32px, 8vw, 64px) clamp(20px, 5vw, 40px)',
        boxSizing: 'border-box',
      }}>

        {/* Logo */}
        <a href="/" style={{
          display: 'inline-block',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 800,
          fontSize: 18,
          color: '#ffffff',
          letterSpacing: '-0.5px',
          textDecoration: 'none',
          marginBottom: 'clamp(40px, 8vw, 64px)',
        }}>
          wrrapd.
        </a>

        {/* Page title */}
        <h1 style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(28px, 7vw, 40px)',
          color: '#ffffff',
          letterSpacing: '-1.5px',
          lineHeight: 1.1,
          margin: '0 0 8px',
        }}>
          terms and conditions
        </h1>
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 13,
          color: 'rgba(255,255,255,0.28)',
          margin: '0 0 48px',
        }}>
          last updated: april 8, 2026
        </p>

        <Section title="what wrrapd is">
          <Body>
            wrrapd is a daily SMS accountability service. once you sign up, we send you one text message per day asking whether you showed up for your stated goal. you reply yes or no. that is the service.
          </Body>
        </Section>

        <Section title="subscription and billing">
          <Body>
            wrrapd offers a 7-day free trial. no charge is made during the trial period. after the trial ends, your card will be charged $9.99 per month.
          </Body>
          <Body>
            by starting the free trial you are agreeing to provide a valid payment method and authorizing recurring charges of $9.99/month after the trial ends.
          </Body>
        </Section>

        <Section title="SMS messaging">
          <Body>
            by providing your phone number you consent to receive one SMS message per day from wrrapd. message frequency is one message per day. message and data rates may apply.
          </Body>
          <Body>
            to stop receiving messages at any time, reply STOP to any message. for help, reply HELP. opting out will pause your service.
          </Body>
        </Section>

        <Section title="cancellation">
          <Body>
            you may cancel your subscription at any time through your account settings. cancellation takes effect at the end of the current billing cycle.
          </Body>
          <Body>
            no refunds are issued once a billing cycle has started. if you cancel during a billing period, you retain access until that period ends.
          </Body>
        </Section>

        <Section title="account termination">
          <Body>
            we reserve the right to suspend or terminate accounts that abuse the service, including but not limited to: using the service to harass others, attempting to circumvent payment, or violating any applicable law.
          </Body>
        </Section>

        <Section title="disclaimer">
          <Body>
            wrrapd is a tool for personal accountability. we do not guarantee any specific outcome, result, or change in behavior. the service is provided as-is without warranties of any kind.
          </Body>
        </Section>

        <Section title="changes to these terms">
          <Body>
            we may update these terms from time to time. continued use of the service after changes are posted constitutes acceptance of the updated terms.
          </Body>
        </Section>

        <Section title="contact">
          <Body>
            questions about these terms? reach us at{' '}
            <a href="mailto:ubaydullanoorullah@gmail.com" style={{ color: '#9B5DE5', textDecoration: 'none' }}>
              ubaydullanoorullah@gmail.com
            </a>
            .
          </Body>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 700,
        fontSize: 'clamp(16px, 4vw, 18px)',
        color: '#ffffff',
        letterSpacing: '-0.5px',
        margin: '0 0 12px',
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: 'Poppins, sans-serif',
      fontSize: 'clamp(13px, 3.5vw, 14px)',
      color: 'rgba(255,255,255,0.5)',
      lineHeight: 1.75,
      margin: '0 0 12px',
    }}>
      {children}
    </p>
  );
}
