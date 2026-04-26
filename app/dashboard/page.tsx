'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AnnouncementBanner from '@/app/components/AnnouncementBanner';

type Profile = {
  id: string;
  name: string;
  goal: string;
  check_in_time: string;
  created_at: string;
  phone_number: string;
  is_active: boolean;
  stripe_customer_id: string | null;
};

type CheckIn = {
  date: string;
  response: string;
};

function formatCheckInTime(t: string): string {
  const [h] = t.split(':').map(Number);
  if (h === 0) return '12am';
  if (h < 12) return `${h}am`;
  if (h === 12) return '12pm';
  return `${h - 12}pm`;
}

function daysSince(dateStr: string): number {
  const created = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
}

function HomeIcon({ active }: { active: boolean }) {
  const c = active ? '#9B5DE5' : 'rgba(255,255,255,0.3)';
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke={c} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7.5 18v-5h5v5" stroke={c} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon({ active }: { active: boolean }) {
  const c = active ? '#9B5DE5' : 'rgba(255,255,255,0.3)';
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="2.5" stroke={c} strokeWidth="1.4" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HelpIcon({ active }: { active: boolean }) {
  const c = active ? '#9B5DE5' : 'rgba(255,255,255,0.3)';
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke={c} strokeWidth="1.4" />
      <path d="M7.5 7.5a2.5 2.5 0 015 .833c0 1.667-2.5 2.084-2.5 3.334" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="0.75" fill={c} />
    </svg>
  );
}

const navItems = [
  { id: 'home', label: 'home', href: '/dashboard', Icon: HomeIcon },
  { id: 'settings', label: 'settings', href: '/settings', Icon: SettingsIcon },
  { id: 'help', label: 'help', href: '/help', Icon: HelpIcon },
];

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState('home');
  const [todayResponse, setTodayResponse] = useState<string | null>(null);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [checkInError, setCheckInError] = useState<string | null>(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [welcomePhase, setWelcomePhase] = useState<'initial' | 'sending' | 'success' | 'error'>('initial');
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [upgradeError, setUpgradeError] = useState<string | null>(null);
  const [showPaidBanner, setShowPaidBanner] = useState(false);

  useEffect(() => {
    const prev = document.body.style.cssText;
    document.body.style.cssText = 'background-color: #0a0a0a; margin: 0; padding: 0; overflow-x: hidden;';
    return () => { document.body.style.cssText = prev; };
  }, []);

  useEffect(() => {
    if (!loading && searchParams.get('new') === 'true') {
      setShowWelcomePopup(true);
      setWelcomePhase('initial');
    }
    if (!loading && searchParams.get('paid') === 'true') {
      setShowPaidBanner(true);
      window.history.replaceState({}, '', '/dashboard');
      setTimeout(() => setShowPaidBanner(false), 3000);
    }
  }, [loading, searchParams]);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/onboard');
        return;
      }

      const [profileRes, checkInsRes] = await Promise.all([
        supabase
          .from('profiles')
          .select('id, name, goal, check_in_time, created_at, phone_number, is_active, stripe_customer_id')
          .eq('id', session.user.id)
          .single(),
        supabase
          .from('check_ins')
          .select('date, response')
          .eq('user_id', session.user.id)
          .gte('date', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10)),
      ]);

      if (!profileRes.data) {
        router.replace('/onboard');
        return;
      }
      setProfile(profileRes.data);
      if (checkInsRes.data) setCheckIns(checkInsRes.data);

      const today = new Date().toISOString().slice(0, 10);
      const todayCheckin = checkInsRes.data?.find(c => c.date === today);
      if (todayCheckin) setTodayResponse(todayCheckin.response);

      setLoading(false);
    }
    load();
  }, [router]);

  async function handleCheckIn(response: 'yes' | 'no') {
    setCheckInLoading(true);
    setCheckInError(null);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setCheckInLoading(false); setCheckInError('no session. try signing in again.'); return; }
    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, response }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (res.status === 409) {
          setCheckInError('already checked in today.');
        } else {
          setCheckInError(data.error ?? 'something went wrong.');
        }
        return;
      }
      setTodayResponse(response);
      // refresh check-ins from supabase
      const { data: fresh } = await supabase
        .from('check_ins')
        .select('date, response')
        .eq('user_id', session.user.id)
        .gte('date', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10));
      if (fresh) setCheckIns(fresh);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setCheckInError(message);
    } finally {
      setCheckInLoading(false);
    }
  }

  async function handleUpgrade() {
    setUpgradeLoading(true);
    setUpgradeError(null);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setUpgradeLoading(false); setUpgradeError('no session. try signing in again.'); return; }
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setUpgradeError(data.error ?? 'something went wrong.');
        setUpgradeLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setUpgradeError(message);
      setUpgradeLoading(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  async function handleSendFirstText() {
    setWelcomePhase('sending');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setWelcomePhase('error');
      return;
    }
    try {
      const res = await fetch('/api/twilio/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id }),
      });
      const data = await res.json();
      console.log('[wrrapd/dashboard] welcome text result:', data);
      if (!res.ok || !data.success) {
        setWelcomePhase('error');
        return;
      }
      setWelcomePhase('success');
    } catch (e) {
      console.error('[wrrapd/dashboard] welcome text failed:', e);
      setWelcomePhase('error');
    }
  }

  function handleClosePopup() {
    setShowWelcomePopup(false);
    setWelcomePhase('initial');
    window.history.replaceState({}, '', '/dashboard');
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100dvh',
        width: '100vw',
        maxWidth: '100%',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 18, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
          wrrapd.
        </span>
      </div>
    );
  }

  if (!profile) return null;

  const days = daysSince(profile.created_at);
  const isTrial = days < 30;
  const trialDaysLeft = Math.max(30 - days, 0);

  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const dayOfMonth = new Date().getDate();
  const totalCheckIns = checkIns.length;
  const aboveAverage = totalCheckIns / dayOfMonth >= 0.5;

  const strip: React.CSSProperties = {
    borderTop: '1px solid rgba(255,255,255,0.07)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    padding: '14px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <div style={{
      minHeight: '100dvh',
      width: '100vw',
      maxWidth: '100%',
      background: '#0a0a0a',
      boxSizing: 'border-box',
      overflowX: 'hidden',
    }}>
      <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', padding: '0 20px 80px', boxSizing: 'border-box' }}>

        {/* TOP BAR */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 'clamp(20px, 5vw, 32px)',
          paddingBottom: 16,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: 'clamp(32px, 7vw, 48px)',
        }}>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 800,
            fontSize: 18,
            color: '#ffffff',
            letterSpacing: '-0.5px',
          }}>
            wrrapd.
          </span>
          <button
            onClick={handleSignOut}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 12,
              color: 'rgba(255,255,255,0.22)',
              cursor: 'pointer',
              padding: 0,
              letterSpacing: '0.01em',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}
          >
            sign out
          </button>
        </div>

        <AnnouncementBanner />

        {/* SECTION 1 — identity */}
        <div style={{ marginBottom: 'clamp(40px, 10vw, 64px)' }}>
          <h1 style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(30px, 8vw, 42px)',
            color: '#ffffff',
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
            margin: '0 0 10px',
          }}>
            hey, {profile.name}.
          </h1>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(12px, 3vw, 13px)',
            color: 'rgba(255,255,255,0.28)',
            margin: 0,
            lineHeight: 1.5,
          }}>
            showing up for: {profile.goal}
          </p>
        </div>

        {/* CHECK-IN CARD */}
        <div style={{
          marginBottom: 'clamp(32px, 7vw, 48px)',
          background: 'rgba(155,93,229,0.06)',
          border: '1px solid rgba(155,93,229,0.18)',
          borderRadius: 14,
          padding: '20px 18px',
        }}>
          {todayResponse ? (
            <>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(16px, 4vw, 18px)',
                color: '#ffffff',
                letterSpacing: '-0.5px',
                margin: '0 0 6px',
              }}>
                logged.
              </p>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 12,
                color: 'rgba(255,255,255,0.3)',
                margin: 0,
              }}>
                {todayResponse} today.
              </p>
            </>
          ) : (
            <>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(16px, 4vw, 18px)',
                color: '#ffffff',
                letterSpacing: '-0.5px',
                lineHeight: 1.2,
                margin: '0 0 4px',
              }}>
                did you show up today?
              </p>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 12,
                color: 'rgba(255,255,255,0.28)',
                margin: '0 0 16px',
              }}>
                for: {profile.goal}
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => handleCheckIn('yes')}
                  disabled={checkInLoading}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: '1px solid #22c55e',
                    borderRadius: 10,
                    padding: '13px 16px',
                    color: '#22c55e',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: checkInLoading ? 'not-allowed' : 'pointer',
                    opacity: checkInLoading ? 0.5 : 1,
                    minHeight: 44,
                    transition: 'opacity 0.15s',
                    letterSpacing: '0.01em',
                  }}
                >
                  yes
                </button>
                <button
                  onClick={() => handleCheckIn('no')}
                  disabled={checkInLoading}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: '1px solid #ff6b6b',
                    borderRadius: 10,
                    padding: '13px 16px',
                    color: '#ff6b6b',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: checkInLoading ? 'not-allowed' : 'pointer',
                    opacity: checkInLoading ? 0.5 : 1,
                    minHeight: 44,
                    transition: 'opacity 0.15s',
                    letterSpacing: '0.01em',
                  }}
                >
                  no
                </button>
              </div>
              {checkInError && (
                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.35)',
                  margin: '10px 0 0',
                }}>
                  {checkInError}
                </p>
              )}
            </>
          )}
        </div>

        {/* SECTION 2 — the number */}
        <div style={{
          marginBottom: 'clamp(40px, 10vw, 64px)',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(96px, 28vw, 140px)',
            color: '#ffffff',
            letterSpacing: '-6px',
            lineHeight: 1,
            marginBottom: 16,
          }}>
            {totalCheckIns}
          </div>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(12px, 3vw, 14px)',
            color: 'rgba(255,255,255,0.35)',
            margin: '0 0 6px',
          }}>
            {totalCheckIns}/{daysInMonth} days this month.
          </p>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(12px, 3vw, 14px)',
            color: '#9B5DE5',
            margin: 0,
            fontWeight: 500,
          }}>
            {aboveAverage ? 'above average.' : 'below average.'}
          </p>
        </div>

        {/* SECTION 3 — status strip */}
        <div style={{ ...strip, marginBottom: 0 }}>
          <span style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(11px, 2.5vw, 13px)',
            color: 'rgba(255,255,255,0.35)',
          }}>
            {isTrial ? 'free trial' : 'member'}
          </span>
          <span style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(11px, 2.5vw, 13px)',
            color: isTrial ? '#9B5DE5' : 'rgba(255,255,255,0.25)',
          }}>
            {isTrial ? `${trialDaysLeft} days left` : 'active'}
          </span>
        </div>

        {/* SECTION 4 — next check-in strip */}
        <div style={{ ...strip, borderTop: 'none' }}>
          <span style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(11px, 2.5vw, 13px)',
            color: 'rgba(255,255,255,0.22)',
          }}>
            next check-in: {formatCheckInTime(profile.check_in_time)} tomorrow.
          </span>
        </div>

      </div>

      {/* BOTTOM NAV */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(40px, 12vw, 72px)',
        paddingTop: 12,
        paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
        zIndex: 100,
      }}>
        {navItems.map(({ id, label, href, Icon }) => (
          <a
            key={id}
            href={href}
            onClick={e => { e.preventDefault(); setActiveNav(id); router.push(href); }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <Icon active={activeNav === id} />
            <span style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 10,
              color: activeNav === id ? '#9B5DE5' : 'rgba(255,255,255,0.28)',
              letterSpacing: '0.03em',
            }}>
              {label}
            </span>
          </a>
        ))}
      </nav>

      {/* WELCOME POPUP */}
      {showWelcomePopup && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.95)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
        }}>
          <div style={{
            width: '100%',
            maxWidth: 340,
            background: '#0a0a0a',
            border: '1px solid rgba(155,93,229,0.4)',
            borderRadius: 16,
            padding: '36px 28px',
            textAlign: 'center',
          }}>
            {welcomePhase === 'initial' && (
              <>
                <h2 style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 7vw, 36px)',
                  color: '#ffffff',
                  letterSpacing: '-1.5px',
                  lineHeight: 1.1,
                  margin: '0 0 12px',
                }}>
                  you&apos;re in.
                </h2>
                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.38)',
                  margin: '0 0 32px',
                  lineHeight: 1.6,
                }}>
                  tap below to get your first text.
                </p>
                <button
                  onClick={handleSendFirstText}
                  style={{
                    width: '100%',
                    background: '#9B5DE5',
                    border: 'none',
                    borderRadius: 10,
                    padding: '15px 20px',
                    color: '#ffffff',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '0.01em',
                    minHeight: 44,
                  }}
                >
                  send my first text
                </button>
              </>
            )}

            {welcomePhase === 'sending' && (
              <>
                <h2 style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 7vw, 36px)',
                  color: '#ffffff',
                  letterSpacing: '-1.5px',
                  lineHeight: 1.1,
                  margin: '0 0 12px',
                }}>
                  you&apos;re in.
                </h2>
                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.38)',
                  margin: '0 0 32px',
                  lineHeight: 1.6,
                }}>
                  tap below to get your first text.
                </p>
                <button
                  disabled
                  style={{
                    width: '100%',
                    background: '#9B5DE5',
                    border: 'none',
                    borderRadius: 10,
                    padding: '15px 20px',
                    color: '#ffffff',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'not-allowed',
                    opacity: 0.5,
                    letterSpacing: '0.01em',
                    minHeight: 44,
                  }}
                >
                  sending...
                </button>
              </>
            )}

            {welcomePhase === 'success' && (
              <>
                <h2 style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 7vw, 36px)',
                  color: '#ffffff',
                  letterSpacing: '-1.5px',
                  lineHeight: 1.1,
                  margin: '0 0 8px',
                }}>
                  check your phone.
                </h2>
                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.25)',
                  margin: '0 0 32px',
                  lineHeight: 1.6,
                }}>
                  sent to ...{profile.phone_number.slice(-4)}
                </p>
                <button
                  onClick={handleClosePopup}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid #9B5DE5',
                    borderRadius: 10,
                    padding: '15px 20px',
                    color: '#9B5DE5',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '0.01em',
                    minHeight: 44,
                  }}
                >
                  got it
                </button>
              </>
            )}

            {welcomePhase === 'error' && (
              <>
                <h2 style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(22px, 6vw, 28px)',
                  color: '#ffffff',
                  letterSpacing: '-1px',
                  lineHeight: 1.2,
                  margin: '0 0 10px',
                }}>
                  something went wrong.
                </h2>
                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.3)',
                  margin: '0 0 32px',
                  lineHeight: 1.6,
                }}>
                  try again.
                </p>
                <button
                  onClick={handleSendFirstText}
                  style={{
                    width: '100%',
                    background: '#9B5DE5',
                    border: 'none',
                    borderRadius: 10,
                    padding: '15px 20px',
                    color: '#ffffff',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '0.01em',
                    minHeight: 44,
                  }}
                >
                  retry
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* PAYWALL OVERLAY */}
      {!isTrial && !profile.is_active && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.97)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
        }}>
          <div style={{
            width: '100%',
            maxWidth: 340,
            background: '#0a0a0a',
            border: '1px solid rgba(155,93,229,0.3)',
            borderRadius: 16,
            padding: '40px 28px',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(28px, 7vw, 36px)',
              color: '#ffffff',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              margin: '0 0 10px',
            }}>
              trial over.
            </h2>
            <p style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 13,
              color: 'rgba(255,255,255,0.32)',
              margin: '0 0 8px',
              lineHeight: 1.6,
            }}>
              $9.99/month to keep going.
            </p>
            <p style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 12,
              color: 'rgba(255,255,255,0.2)',
              margin: '0 0 32px',
              lineHeight: 1.5,
            }}>
              cancel anytime.
            </p>
            <button
              onClick={handleUpgrade}
              disabled={upgradeLoading}
              style={{
                width: '100%',
                background: '#9B5DE5',
                border: 'none',
                borderRadius: 10,
                padding: '15px 20px',
                color: '#ffffff',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                cursor: upgradeLoading ? 'not-allowed' : 'pointer',
                opacity: upgradeLoading ? 0.5 : 1,
                letterSpacing: '0.01em',
                minHeight: 44,
                transition: 'opacity 0.15s',
              }}
            >
              {upgradeLoading ? 'loading...' : 'continue'}
            </button>
            {upgradeError && (
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 12,
                color: '#ff6b6b',
                margin: '12px 0 0',
              }}>
                {upgradeError}
              </p>
            )}
          </div>
        </div>
      )}

      {/* PAID BANNER */}
      {showPaidBanner && (
        <div style={{
          position: 'fixed',
          bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 20px',
          zIndex: 400,
          pointerEvents: 'none',
        }}>
          <div style={{
            background: 'rgba(155,93,229,0.15)',
            border: '1px solid rgba(155,93,229,0.4)',
            borderRadius: 10,
            padding: '12px 20px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 13,
            color: '#ffffff',
            letterSpacing: '0.01em',
          }}>
            you&apos;re in. welcome to wrrapd.
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100dvh',
        width: '100vw',
        maxWidth: '100%',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 800,
          fontSize: 18,
          color: '#ffffff',
          letterSpacing: '-0.5px',
        }}>
          wrrapd.
        </span>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
