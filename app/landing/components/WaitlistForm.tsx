'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const inputBorderIdle = '1px solid rgba(255,255,255,0.18)';
const inputBorderFocus = '1px solid #A87DF0';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.07)',
  border: inputBorderIdle,
  borderRadius: 14,
  padding: '14px 18px',
  color: '#ffffff',
  fontSize: 'clamp(14px, 3vw, 15px)',
  fontFamily: 'Poppins, sans-serif',
  outline: 'none',
  boxSizing: 'border-box',
  textAlign: 'left',
  transition: 'border-color 0.15s, background 0.15s',
};

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  async function handleSubmit() {
    const trimmedEmail = email.trim();
    if (!trimmedEmail.includes('@')) {
      setError('valid email required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const trimmedPhone = phone.trim();
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          phone: trimmedPhone || undefined,
          consent: consentChecked,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'something went wrong. try again.');
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError('something went wrong. try again.');
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section
        id="waitlist"
        style={{
          background: '#0A0814',
          padding: 'clamp(60px, 10vw, 120px) clamp(24px, 6vw, 80px)',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ maxWidth: 420, margin: '0 auto' }}
        >
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(24px, 5vw, 36px)',
            color: '#A87DF0',
            margin: '0 0 12px',
            letterSpacing: '-1px',
          }}>
            You&apos;re on the waitlist.
          </p>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(13px, 2vw, 15px)',
            color: 'rgba(255,250,245,0.45)',
            margin: 0,
          }}>
            We&apos;ll text you when wrrapd launches.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="waitlist"
      style={{
        background: '#0A0814',
        padding: 'clamp(60px, 10vw, 120px) clamp(24px, 6vw, 80px)',
        textAlign: 'center',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        width: 500,
        height: 500,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(168,125,240,0.10) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 420, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 11,
            fontWeight: 600,
            color: '#A87DF0',
            letterSpacing: '0.06em',
            textTransform: 'none',
            margin: '0 0 14px',
          }}
        >
          for the first 47
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 6vw, 52px)',
            color: '#FFFFFF',
            letterSpacing: 'clamp(-1px, -0.3vw, -2px)',
            lineHeight: 1.1,
            margin: '0 0 10px',
          }}
        >
          get early access.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(12px, 1.8vw, 14px)',
            color: 'rgba(255,250,245,0.40)',
            margin: '0 0 32px',
            lineHeight: 1.6,
          }}
        >
          dropping june 1. cohort 1 only.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your email"
            style={inputStyle}
            onFocus={e => { e.currentTarget.style.border = inputBorderFocus; e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; }}
            onBlur={e => { e.currentTarget.style.border = inputBorderIdle; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
            onKeyDown={e => e.key === 'Enter' && !loading && handleSubmit()}
          />
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="your phone number"
            style={inputStyle}
            onFocus={e => { e.currentTarget.style.border = inputBorderFocus; e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; }}
            onBlur={e => { e.currentTarget.style.border = inputBorderIdle; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
            onKeyDown={e => e.key === 'Enter' && !loading && handleSubmit()}
          />

          <button
            type="button"
            onClick={() => setConsentChecked(c => !c)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              width: '100%',
              padding: '14px 16px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${consentChecked ? '#A87DF0' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: 14,
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'border-color 0.15s, background 0.15s',
            }}
          >
            <div style={{
              width: 18,
              height: 18,
              minWidth: 18,
              borderRadius: 4,
              background: consentChecked ? '#A87DF0' : 'transparent',
              border: `1px solid ${consentChecked ? '#A87DF0' : 'rgba(255,255,255,0.3)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 1,
              flexShrink: 0,
              transition: 'all 0.15s',
            }}>
              {consentChecked && (
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 5.5l2.5 2.5L9 3.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(11px, 3vw, 12px)',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.55)',
            }}>
              I agree to receive recurring text messages from wrrapd at the phone number above. Message frequency: 1 per day. Message and data rates may apply. Reply STOP to opt out, HELP for help.
            </span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || !email.includes('@')}
            style={{
              width: '100%',
              background: '#A87DF0',
              border: 'none',
              borderRadius: 14,
              padding: '15px 24px',
              color: '#ffffff',
              fontSize: 'clamp(13px, 2.5vw, 15px)',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              cursor: (loading || !email.includes('@')) ? 'not-allowed' : 'pointer',
              opacity: (loading || !email.includes('@')) ? 0.5 : 1,
              transition: 'opacity 0.15s, transform 0.15s',
              letterSpacing: '0.01em',
              boxSizing: 'border-box',
              boxShadow: '0 8px 24px rgba(168,125,240,0.30)',
            }}
          >
            {loading ? 'joining...' : 'count me in'}
          </button>
        </motion.div>

        {error && (
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 12,
            color: '#fca5a5',
            margin: '12px 0 0',
            textAlign: 'center',
          }}>
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
