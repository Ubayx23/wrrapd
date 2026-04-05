'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const TIMES = [
  { value: '06:00', label: '6am' },
  { value: '07:00', label: '7am' },
  { value: '08:00', label: '8am' },
  { value: '09:00', label: '9am' },
  { value: '10:00', label: '10am' },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '16px 20px',
  color: '#ffffff',
  fontSize: 'clamp(15px, 4vw, 17px)',
  fontFamily: 'Poppins, sans-serif',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

const labelStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.4)',
  fontSize: 'clamp(10px, 2.5vw, 11px)',
  fontFamily: 'Poppins, sans-serif',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  marginBottom: '10px',
  display: 'block',
};

const headingStyle: React.CSSProperties = {
  color: '#ffffff',
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: 800,
  fontSize: 'clamp(24px, 6.5vw, 34px)',
  letterSpacing: '-1.5px',
  margin: '0 0 8px 0',
  lineHeight: 1.15,
};

const subStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.35)',
  fontFamily: 'Poppins, sans-serif',
  fontSize: 'clamp(13px, 3.5vw, 14px)',
  margin: '0 0 36px 0',
  lineHeight: 1.6,
};

export default function OnboardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [checkInTime, setCheckInTime] = useState('08:00');
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Override global scroll-lock rules on this route
  useEffect(() => {
    const prevBody = document.body.style.cssText;
    const prevHtml = document.documentElement.style.cssText;
    document.body.style.cssText =
      'overflow-x: hidden; overflow-y: auto; background-color: #07070F; margin: 0; padding: 0;';
    document.documentElement.style.cssText = 'overflow-y: auto; overflow-x: hidden;';
    return () => {
      document.body.style.cssText = prevBody;
      document.documentElement.style.cssText = prevHtml;
    };
  }, []);

  async function handleCreateAccount() {
    if (!email.trim() || !password.trim()) {
      setError('both fields required');
      return;
    }
    setLoading(true);
    setError('');
    const { data, error: authError } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    if (!data.user) {
      setError('something went wrong. try again.');
      return;
    }
    setUserId(data.user.id);
    setStep(2);
  }

  async function handleFinish() {
    if (!userId) {
      setError('session lost. start over.');
      return;
    }
    setLoading(true);
    setError('');
    const { error: dbError } = await supabase.from('profiles').upsert({
      id: userId,
      name: name.trim(),
      goal: goal.trim(),
      check_in_time: checkInTime,
    });
    setLoading(false);
    if (dbError) {
      setError(dbError.message);
      return;
    }
    router.push('/dashboard');
  }

  function buttonStyle(active = true): React.CSSProperties {
    return {
      width: '100%',
      background: '#9B5DE5',
      border: 'none',
      borderRadius: '12px',
      padding: '16px 20px',
      color: '#ffffff',
      fontSize: 'clamp(14px, 4vw, 15px)',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      cursor: active && !loading ? 'pointer' : 'not-allowed',
      opacity: active && !loading ? 1 : 0.35,
      transition: 'opacity 0.15s',
      letterSpacing: '0.01em',
    };
  }

  function renderStep() {
    if (step === 1) {
      return (
        <>
          <h1 style={headingStyle}>create your account</h1>
          <p style={subStyle}>takes 30 seconds.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            <div>
              <span style={labelStyle}>email</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <span style={labelStyle}>password</span>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={inputStyle}
                placeholder="min 6 characters"
                autoComplete="new-password"
                onKeyDown={e => e.key === 'Enter' && !loading && handleCreateAccount()}
              />
            </div>
          </div>
          <button style={buttonStyle(true)} onClick={handleCreateAccount} disabled={loading}>
            {loading ? 'creating account...' : 'create account'}
          </button>
        </>
      );
    }

    if (step === 2) {
      const valid = name.trim().length > 0;
      return (
        <>
          <h1 style={headingStyle}>what do we call you</h1>
          <p style={subStyle}>first name is fine.</p>
          <div style={{ marginBottom: '16px' }}>
            <span style={labelStyle}>name</span>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
              placeholder="your name"
              autoComplete="given-name"
              onKeyDown={e => e.key === 'Enter' && valid && setStep(3)}
              autoFocus
            />
          </div>
          <button style={buttonStyle(valid)} onClick={() => valid && setStep(3)} disabled={!valid}>
            next
          </button>
        </>
      );
    }

    if (step === 3) {
      const valid = goal.trim().length > 0;
      return (
        <>
          <h1 style={headingStyle}>what are you showing up for</h1>
          <p style={subStyle}>be specific. one thing.</p>
          <div style={{ marginBottom: '16px' }}>
            <span style={labelStyle}>your goal</span>
            <input
              type="text"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              style={inputStyle}
              placeholder="the gym, my business, my craft..."
              onKeyDown={e => e.key === 'Enter' && valid && setStep(4)}
              autoFocus
            />
          </div>
          <button style={buttonStyle(valid)} onClick={() => valid && setStep(4)} disabled={!valid}>
            next
          </button>
        </>
      );
    }

    if (step === 4) {
      return (
        <>
          <h1 style={headingStyle}>when should we text you</h1>
          <p style={subStyle}>every day at this time, no exceptions.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {TIMES.map(t => {
              const selected = checkInTime === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => setCheckInTime(t.value)}
                  style={{
                    background: selected ? 'rgba(155,93,229,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${selected ? '#9B5DE5' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '12px',
                    padding: '14px 20px',
                    color: selected ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(14px, 4vw, 15px)',
                    fontWeight: selected ? 600 : 400,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.12s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  {t.label}
                  {selected && (
                    <span style={{ color: '#9B5DE5', fontSize: '16px', lineHeight: 1 }}>&#10003;</span>
                  )}
                </button>
              );
            })}
          </div>
          <button style={buttonStyle(true)} onClick={handleFinish} disabled={loading}>
            {loading ? 'saving...' : 'looks good'}
          </button>
        </>
      );
    }

    return null;
  }

  return (
    <div
      className="landing-page"
      style={{
        minHeight: '100dvh',
        background: '#07070F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 clamp(24px, 6vw, 40px) clamp(40px, 8vw, 80px)',
        boxSizing: 'border-box',
      }}
    >
      {/* Logo */}
      <div style={{
        position: 'fixed',
        top: 'clamp(20px, 4vw, 32px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
      }}>
        <span style={{
          color: '#ffffff',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(18px, 4vw, 22px)',
          letterSpacing: '-0.5px',
        }}>
          wrrapd
        </span>
      </div>

      {/* Spacer to clear fixed logo */}
      <div style={{ height: 'clamp(48px, 10vw, 72px)', flexShrink: 0 }} />

      {/* Progress bars */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginBottom: 'clamp(32px, 7vw, 48px)',
        width: '100%',
        maxWidth: '420px',
      }}>
        {[1, 2, 3, 4].map(n => (
          <div
            key={n}
            style={{
              flex: 1,
              height: '2px',
              borderRadius: '2px',
              background: n <= step ? '#9B5DE5' : 'rgba(255,255,255,0.1)',
              transition: 'background 0.35s ease',
            }}
          />
        ))}
      </div>

      {/* Step content */}
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {renderStep()}

            {error && (
              <p style={{
                color: '#ff6b6b',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '12px',
                marginTop: '12px',
                margin: '12px 0 0 0',
                lineHeight: 1.5,
              }}>
                {error}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
