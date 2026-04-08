'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  async function handleSignIn() {
    if (!email.trim() || !password.trim()) {
      setError('both fields required');
      return;
    }
    setLoading(true);
    setError('');
    const { data: signInData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setLoading(false);
      setError('wrong email or password.');
      return;
    }
    console.log('[wrrapd] sign in success — session:', signInData.session);

    const userId = signInData.session?.user?.id;
    if (!userId) {
      setLoading(false);
      setError('something went wrong. try again.');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    setLoading(false);

    if (profile) {
      console.log('[wrrapd] profile found, redirecting to /dashboard');
      router.push('/dashboard');
    } else {
      console.log('[wrrapd] no profile found, redirecting to /onboard to complete signup');
      router.push('/onboard');
    }
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
        alignSelf: 'flex-start',
        width: '100%',
        maxWidth: 400,
        paddingTop: 'clamp(28px, 6vw, 48px)',
        marginBottom: 'clamp(40px, 9vw, 64px)',
      }}>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(15px, 3.5vw, 18px)',
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: '-0.3px',
        }}>
          wrrapd.
        </span>
      </div>

      {/* Form */}
      <div style={{ width: '100%', maxWidth: 400 }}>
        <h1 style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(28px, 8vw, 40px)',
          color: '#ffffff',
          letterSpacing: '-1.5px',
          lineHeight: 1.1,
          margin: '0 0 8px',
        }}>
          welcome back.
        </h1>
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 'clamp(12px, 3vw, 14px)',
          color: 'rgba(255,255,255,0.3)',
          margin: '0 0 36px',
          lineHeight: 1.6,
        }}>
          time to check in.
        </p>

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
              placeholder="your password"
              autoComplete="current-password"
              onKeyDown={e => e.key === 'Enter' && !loading && handleSignIn()}
            />
          </div>
        </div>

        {error && (
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '12px',
            color: '#ff6b6b',
            margin: '0 0 12px',
            lineHeight: 1.5,
          }}>
            {error}
          </p>
        )}

        <button
          onClick={handleSignIn}
          disabled={loading}
          style={{
            width: '100%',
            background: '#9B5DE5',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 20px',
            color: '#ffffff',
            fontSize: 'clamp(14px, 4vw, 15px)',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.4 : 1,
            transition: 'opacity 0.15s',
            letterSpacing: '0.01em',
          }}
        >
          {loading ? 'signing in...' : 'sign in'}
        </button>

        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 'clamp(12px, 3vw, 13px)',
          color: 'rgba(255,255,255,0.3)',
          marginTop: '20px',
          marginBottom: 0,
          textAlign: 'center',
        }}>
          no account yet?{' '}
          <a href="/onboard" style={{ color: '#9B5DE5', textDecoration: 'none' }}>
            start here
          </a>
        </p>
      </div>
    </div>
  );
}
