'use client';

import { useEffect } from 'react';

export default function PrivacyPage() {
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
          privacy policy
        </h1>
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 13,
          color: 'rgba(255,255,255,0.28)',
          margin: '0 0 48px',
        }}>
          last updated: april 8, 2026
        </p>

        <Section title="what we collect">
          <Body>when you use wrrapd, we collect the following information:</Body>
          <List items={[
            'name',
            'email address',
            'phone number',
            'your daily goal or commitment',
            'check-in responses (yes or no)',
            'device and browser information',
            'payment method details (processed by Stripe)',
          ]} />
        </Section>

        <Section title="how we use it">
          <Body>we use your information to:</Body>
          <List items={[
            'send you one daily SMS check-in at your chosen time',
            'track your accountability responses over time',
            'process subscription payments via Stripe',
            'provide customer support when you contact us',
          ]} />
        </Section>

        <Section title="SMS and phone numbers">
          <Body>
            your phone number is used exclusively to send your daily check-in message. we do not use it for marketing, promotions, or any other purpose. message frequency is one SMS per day. message and data rates may apply.
          </Body>
          <Body>
            to opt out of SMS messages at any time, reply STOP to any message we send. to get help, reply HELP.
          </Body>
        </Section>

        <Section title="data sharing">
          <Body>
            we do not sell your personal data to third parties. we do not share your data with advertisers or use it for marketing purposes.
          </Body>
          <Body>
            we work with the following third-party services to operate wrrapd:
          </Body>
          <List items={[
            'Stripe: payment processing',
            'Twilio: SMS delivery',
            'Supabase: secure database hosting',
            'Vercel: application hosting',
          ]} />
          <Body>
            each of these providers handles data under their own privacy policies and applicable data protection laws.
          </Body>
        </Section>

        <Section title="data retention">
          <Body>
            we store your data for as long as your account is active. if you cancel your subscription, your data remains stored unless you explicitly request deletion.
          </Body>
        </Section>

        <Section title="deleting your account">
          <Body>
            you can request deletion of your account and all associated data at any time by emailing us at{' '}
            <a href="mailto:ubaydullanoorullah@gmail.com" style={{ color: '#9B5DE5', textDecoration: 'none' }}>
              ubaydullanoorullah@gmail.com
            </a>
            . we will process your request within 30 days.
          </Body>
        </Section>

        <Section title="security">
          <Body>
            we take reasonable measures to protect your data. all data is encrypted in transit and at rest. payment information is never stored on our servers.
          </Body>
        </Section>

        <Section title="contact">
          <Body>
            questions about this policy? reach us at{' '}
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

function List({ items }: { items: string[] }) {
  return (
    <ul style={{
      margin: '0 0 12px',
      paddingLeft: 20,
      listStyle: 'none',
    }}>
      {items.map((item, i) => (
        <li key={i} style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 'clamp(13px, 3.5vw, 14px)',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.75,
          paddingLeft: 12,
          position: 'relative',
        }}>
          <span style={{
            position: 'absolute',
            left: 0,
            color: 'rgba(155,93,229,0.6)',
          }}>
            -
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
