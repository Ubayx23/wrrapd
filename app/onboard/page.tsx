'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { insertProfile } from './actions';

const STORAGE_KEY = 'wrrapd_onboard';
const TOTAL_STEPS = 5;

const TIMES = [
  { value: '18:00', label: '6pm' },
  { value: '19:00', label: '7pm' },
  { value: '20:00', label: '8pm' },
  { value: '21:00', label: '9pm' },
  { value: '22:00', label: '10pm' },
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

const PW_LEVELS = [
  { label: 'weak',   color: '#ef4444' },
  { label: 'weak',   color: '#ef4444' },
  { label: 'fair',   color: '#f97316' },
  { label: 'good',   color: '#eab308' },
  { label: 'strong', color: '#22c55e' },
];

function getPasswordStrength(pw: string) {
  const length  = pw.length >= 6;
  const capital = /[A-Z]/.test(pw);
  const number  = /[0-9]/.test(pw);
  const symbol  = /[^A-Za-z0-9]/.test(pw);
  const score   = [length, capital, number, symbol].filter(Boolean).length;
  return { score, length, capital, number, symbol };
}

function toDigits(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 10);
}

function formatPhoneDisplay(digits: string): string {
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function normalizePhone(digits: string): string {
  return digits.length === 10 ? `+1${digits}` : '';
}

function isValidPhone(digits: string): boolean {
  return digits.length === 10;
}

export default function OnboardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [phone, setPhone] = useState('');
  const [checkInTime, setCheckInTime] = useState('21:00');
  const [consent, setConsent] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [resumedFromSession, setResumedFromSession] = useState(false);

  // Override global scroll-lock
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

  // On mount: check session and profile state
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return; // no session — stay at step 1

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', session.user.id)
        .maybeSingle();

      if (profile) {
        // account + profile complete — send to dashboard
        router.replace('/dashboard');
      } else {
        // session exists but no profile — resume from step 2 with existing account
        setUserId(session.user.id);
        setSessionEmail(session.user.email ?? null);
        setResumedFromSession(true);
        setStep(2);
      }
    });
  }, [router]);

  // Persist field progress to localStorage (step intentionally excluded)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, goal, phone, checkInTime }));
    } catch {}
  }, [name, goal, phone, checkInTime]);

  function goToStep(n: number) {
    setError('');
    setStep(n);
  }

  async function handleCreateAccount() {
    if (!email.trim() || !password.trim()) {
      setError('both fields required');
      return;
    }
    setLoading(true);
    setError('');
    const { data, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) {
      setLoading(false);
      const msg = authError.message.toLowerCase();
      if (msg.includes('already registered') || msg.includes('already been registered') || msg.includes('user already')) {
        setError('account already exists. sign in instead.');
      } else {
        setError(authError.message);
      }
      return;
    }
    if (!data.user) {
      setLoading(false);
      setError('something went wrong. try again.');
      return;
    }
    const { data: { session } } = await supabase.auth.getSession();
    setLoading(false);
    if (!session) {
      setError('session not established. check your email to confirm your account, then sign in.');
      return;
    }
    setUserId(session.user.id);
    goToStep(2);
  }

  async function handleFinish() {
    setLoading(true);
    setError('');
    const { data: { session } } = await supabase.auth.getSession();
    const activeUserId = session?.user?.id ?? null;
    console.log('[wrrapd] session at finish:', session);
    console.log('[wrrapd] userId at finish:', activeUserId);
    if (!session || !activeUserId) {
      setLoading(false);
      setError('session expired. please start over.');
      goToStep(1);
      return;
    }
    const payload = {
      id: activeUserId,
      name: name.trim(),
      goal: goal.trim(),
      phone_number: normalizePhone(phone),
      email: session.user.email ?? '',
      check_in_time: checkInTime,
    };
    console.log('[wrrapd] calling insertProfile with:', payload);
    const result = await insertProfile(payload);
    console.log('[wrrapd] insertProfile result:', result);
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? 'failed to save your profile. please try again.');
      return;
    }
    try { localStorage.removeItem(STORAGE_KEY); } catch {}

    fetch('/api/twilio/welcome', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: activeUserId }),
    }).catch(() => {});

    router.replace('/dashboard');
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
      const pw = getPasswordStrength(password);
      const pwReady = pw.score === 4;
      const level = PW_LEVELS[pw.score];
      const checks = [
        { label: 'at least 6 characters', ok: pw.length },
        { label: '1 uppercase letter',    ok: pw.capital },
        { label: '1 number',              ok: pw.number },
        { label: '1 symbol',              ok: pw.symbol },
      ];
      return (
        <>
          <h1 style={{ ...headingStyle, fontSize: 'clamp(28px, 8vw, 40px)', marginBottom: '32px' }}>
            let&apos;s see if you&apos;re serious.
          </h1>
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
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ ...inputStyle, paddingRight: '48px' }}
                  placeholder="min 6 characters"
                  autoComplete="new-password"
                  onKeyDown={e => e.key === 'Enter' && pwReady && !loading && handleCreateAccount()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 4,
                    color: 'rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      <path d="M6.5 6.6A2 2 0 008 10a2 2 0 001.4-3.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      <path d="M2.5 9.5C1.7 8.8 1 8 1 8s3-5 7-5c.9 0 1.7.2 2.5.5M12 6c1 .9 2 2 3 2 0 0-3 5-7 5-1 0-2-.3-2.8-.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.3"/>
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/>
                    </svg>
                  )}
                </button>
              </div>

              {password.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  {/* Strength bar */}
                  <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                    {[1, 2, 3, 4].map(n => (
                      <div
                        key={n}
                        style={{
                          flex: 1,
                          height: 3,
                          borderRadius: 2,
                          background: n <= pw.score ? level.color : 'rgba(255,255,255,0.08)',
                          transition: 'background 0.2s',
                        }}
                      />
                    ))}
                  </div>
                  {/* Checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {checks.map(c => (
                      <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          background: c.ok ? '#22c55e' : 'rgba(255,255,255,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'background 0.2s',
                        }}>
                          {c.ok && (
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path d="M1.5 4l2 2 3-3" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: 11,
                          color: c.ok ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.25)',
                          transition: 'color 0.2s',
                        }}>
                          {c.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button style={buttonStyle(pwReady)} onClick={handleCreateAccount} disabled={!pwReady || loading}>
            {loading ? 'creating account...' : 'create account'}
          </button>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(12px, 3vw, 13px)',
            color: 'rgba(255,255,255,0.3)',
            marginTop: '20px',
            marginBottom: 0,
            textAlign: 'center',
          }}>
            already in?{' '}
            <a href="/login" style={{ color: '#9B5DE5', textDecoration: 'none' }}>sign in</a>
          </p>
        </>
      );
    }

    if (step === 2) {
      const valid = name.trim().length > 0;
      return (
        <>
          {sessionEmail && (
            <p style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 11,
              color: 'rgba(255,255,255,0.28)',
              margin: '0 0 20px',
              letterSpacing: '0.01em',
            }}>
              signed in as {sessionEmail}
            </p>
          )}
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
              onKeyDown={e => e.key === 'Enter' && valid && goToStep(3)}
              autoFocus
            />
          </div>
          <button style={buttonStyle(valid)} onClick={() => valid && goToStep(3)} disabled={!valid}>
            next
          </button>
        </>
      );
    }

    if (step === 3) {
      const valid = goal.trim().length > 0;
      return (
        <>
          <h1 style={headingStyle}>who are you becoming?</h1>
          <p style={subStyle}>be specific. one thing.</p>
          <div style={{ marginBottom: '16px' }}>
            <span style={labelStyle}>your goal</span>
            <input
              type="text"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              style={inputStyle}
              placeholder="a disciplined entrepreneur, a consistent athlete, a focused student..."
              onKeyDown={e => e.key === 'Enter' && valid && goToStep(4)}
              autoFocus
            />
          </div>
          <button style={buttonStyle(valid)} onClick={() => valid && goToStep(4)} disabled={!valid}>
            next
          </button>
        </>
      );
    }

    if (step === 4) {
      const valid = isValidPhone(phone) && consent === true;
      return (
        <>
          <h1 style={headingStyle}>what&apos;s your number?</h1>
          <p style={subStyle}>this is how we reach you. daily.</p>
          <div style={{ marginBottom: '16px' }}>
            <span style={labelStyle}>phone</span>
            <input
              type="tel"
              value={formatPhoneDisplay(phone)}
              onChange={e => setPhone(toDigits(e.target.value))}
              style={inputStyle}
              placeholder="(555) 000-0000"
              autoComplete="tel"
              onKeyDown={e => e.key === 'Enter' && valid && goToStep(5)}
              autoFocus
            />
          </div>
          <div style={{ marginTop: '20px', marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', fontSize: 'clamp(12px, 2vw, 13px)', lineHeight: '1.6', color: 'rgba(255,255,255,0.8)' }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                style={{ marginRight: '10px', marginTop: '2px', width: '18px', height: '18px', cursor: 'pointer', accentColor: '#9B5DE5', flexShrink: 0 }}
              />
              <span>
                I agree to receive one daily SMS check-in from wrrapd. Msg & data rates may apply. 1 msg/day. Reply <strong>STOP</strong> to cancel.{' '}
                <a href="/terms" target="_blank" style={{ color: '#9B5DE5', textDecoration: 'underline' }}>
                  terms
                </a>
                {' '}•{' '}
                <a href="/privacy" target="_blank" style={{ color: '#9B5DE5', textDecoration: 'underline' }}>
                  privacy
                </a>
              </span>
            </label>
          </div>
          <button style={buttonStyle(valid)} onClick={() => valid && goToStep(5)} disabled={!valid}>
            got it
          </button>
        </>
      );
    }

    if (step === 5) {
      return (
        <>
          <h1 style={headingStyle}>when should we check on you?</h1>
          <p style={subStyle}>we recommend 9pm. the day is done by then.</p>
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
      {/* Fixed top bar: back button (left) + logo (center) + spacer (right) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'clamp(52px, 10vw, 68px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        padding: '0 clamp(24px, 6vw, 40px)',
      }}>
        {/* Back button — left absolute */}
        {step > 1 && step < 6 && !(resumedFromSession && step === 2) && (
          <button
            onClick={() => goToStep(step - 1)}
            style={{
              position: 'absolute',
              left: 'clamp(24px, 6vw, 40px)',
              background: 'none',
              border: 'none',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(12px, 3vw, 13px)',
              color: 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              padding: 0,
              letterSpacing: '0.01em',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            back
          </button>
        )}

        {/* Logo — always centered */}
        <span style={{
          color: '#ffffff',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(16px, 4vw, 20px)',
          letterSpacing: '-0.5px',
        }}>
          wrrapd.
        </span>
      </div>

      {/* Spacer to clear fixed top bar */}
      <div style={{ height: 'clamp(52px, 10vw, 68px)', flexShrink: 0 }} />

      {/* Progress bars */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginBottom: 'clamp(32px, 7vw, 48px)',
        width: '100%',
        maxWidth: '420px',
        marginTop: 16,
      }}>
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(n => (
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
              <div style={{
                marginTop: 16,
                display: 'flex',
                justifyContent: 'center',
              }}>
                <span style={{
                  background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#fca5a5',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 12,
                  padding: '7px 14px',
                  borderRadius: 999,
                  lineHeight: 1.5,
                  textAlign: 'center',
                }}>
                  {error.includes('sign in instead') ? (
                    <>account already exists.{' '}
                      <a href="/login" style={{ color: '#9B5DE5', textDecoration: 'none' }}>sign in instead.</a>
                    </>
                  ) : error}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
