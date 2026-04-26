'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AnnouncementBanner from '@/app/components/AnnouncementBanner';

type Profile = {
  check_in_time: string;
  goal: string;
  created_at: string;
};

function formatJoinDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function formatCheckInTime(t: string): string {
  const [h] = t.split(':').map(Number);
  if (h === 0) return '12am';
  if (h < 12) return `${h}am`;
  if (h === 12) return '12pm';
  return `${h - 12}pm`;
}

const TIMES = [
  { value: '07:00', label: '7am' },
  { value: '09:00', label: '9am' },
  { value: '12:00', label: '12pm' },
  { value: '15:00', label: '3pm' },
  { value: '18:00', label: '6pm' },
  { value: '21:00', label: '9pm' },
];

function HomeIcon({ active }: { active: boolean }) {
  const c = active ? '#A87DF0' : 'rgba(255,255,255,0.3)';
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke={c} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7.5 18v-5h5v5" stroke={c} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon({ active }: { active: boolean }) {
  const c = active ? '#A87DF0' : 'rgba(255,255,255,0.3)';
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="2.5" stroke={c} strokeWidth="1.4" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HelpIcon({ active }: { active: boolean }) {
  const c = active ? '#A87DF0' : 'rgba(255,255,255,0.3)';
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke={c} strokeWidth="1.4" />
      <path d="M7.5 7.5a2.5 2.5 0 015 .833c0 1.667-2.5 2.084-2.5 3.334" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="0.75" fill={c} />
    </svg>
  );
}

const navItems = [
  { id: 'home',     label: 'home',     href: '/dashboard', Icon: HomeIcon },
  { id: 'settings', label: 'settings', href: '/settings',  Icon: SettingsIcon },
  { id: 'help',     label: 'help',     href: '/help',      Icon: HelpIcon },
];

const sectionLabel: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 10,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.25)',
  marginBottom: 12,
  display: 'block',
};

const strip: React.CSSProperties = {
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  padding: '14px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const rowText: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 'clamp(13px, 3.5vw, 14px)',
  color: 'rgba(255,255,255,0.55)',
};

const rowValue: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 'clamp(12px, 3vw, 13px)',
  color: 'rgba(255,255,255,0.25)',
};

const linkBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  fontFamily: 'Poppins, sans-serif',
  fontSize: 'clamp(12px, 3vw, 13px)',
  color: '#A87DF0',
  cursor: 'pointer',
  padding: 0,
  textDecoration: 'none',
};

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [saving, setSaving] = useState(false);
  const [isTrial, setIsTrial] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prev = document.body.style.cssText;
    document.body.style.cssText = 'background-color: #0a0a0a; margin: 0; padding: 0; overflow-x: hidden;';
    return () => { document.body.style.cssText = prev; };
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.replace('/onboard'); return; }
      setEmail(session.user.email ?? '');
      const { data } = await supabase
        .from('profiles')
        .select('check_in_time, goal, created_at')
        .eq('id', session.user.id)
        .single();
      if (data) {
        setProfile({ check_in_time: data.check_in_time, goal: data.goal, created_at: data.created_at });
        setSelectedTime(data.check_in_time);
        const days = Math.floor((Date.now() - new Date(data.created_at).getTime()) / 86400000);
        setIsTrial(days < 14);
      }
      setLoading(false);
    });
  }, [router]);

  async function handleUpdateTime() {
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setSaving(false); return; }
    await supabase
      .from('profiles')
      .update({ check_in_time: selectedTime })
      .eq('id', session.user.id);
    setProfile(p => p ? { ...p, check_in_time: selectedTime } : p);
    setShowTimeSelector(false);
    setSaving(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', width: '100vw', maxWidth: '100%', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 18, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>wrrapd.</span>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100dvh', width: '100vw', maxWidth: '100%', background: '#0a0a0a', boxSizing: 'border-box', overflowX: 'hidden' }}>
      <div style={{
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        padding: '0 20px 100px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
      }}>

        {/* TOP BAR */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          paddingTop: 'clamp(20px, 5vw, 32px)',
          paddingBottom: 16,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: 'clamp(32px, 7vw, 48px)',
        }}>
          <button
            onClick={() => router.back()}
            style={{
              position: 'absolute',
              left: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              color: 'rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 800,
            fontSize: 18,
            color: '#ffffff',
            letterSpacing: '-0.5px',
          }}>
            settings.
          </span>
        </div>

        <AnnouncementBanner />

        {/* ACCOUNT */}
        <div style={{ marginBottom: 32 }}>
          <span style={sectionLabel}>account</span>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={strip}>
              <span style={rowText}>email</span>
              <span style={rowValue}>{email}</span>
            </div>
            <div style={strip}>
              <span style={rowText}>password</span>
              <button style={linkBtn}>change password</button>
            </div>
          </div>
        </div>

        {/* SUBSCRIPTION */}
        <div style={{ marginBottom: 32 }}>
          <span style={sectionLabel}>subscription</span>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={strip}>
              <span style={rowText}>status</span>
              <span style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(12px, 3vw, 13px)',
                color: isTrial ? '#A87DF0' : 'rgba(255,255,255,0.4)',
              }}>
                {isTrial ? 'free trial' : 'active'}
              </span>
            </div>
            <div style={strip}>
              <button style={{ ...linkBtn, color: 'rgba(239,68,68,0.6)', fontSize: 'clamp(12px, 3vw, 13px)' }}>
                cancel subscription
              </button>
            </div>
          </div>
        </div>

        {/* CHECK-IN TIME */}
        <div style={{ marginBottom: 32 }}>
          <span style={sectionLabel}>check-in time</span>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={strip}>
              <span style={rowText}>daily text</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={rowValue}>
                  {profile ? formatCheckInTime(profile.check_in_time) : '--'}
                </span>
                <button
                  onClick={() => setShowTimeSelector(p => !p)}
                  style={linkBtn}
                >
                  {showTimeSelector ? 'cancel' : 'update'}
                </button>
              </div>
            </div>
            {showTimeSelector && (
              <div style={{ paddingBottom: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                  {TIMES.map(t => {
                    const sel = selectedTime === t.value;
                    return (
                      <button
                        key={t.value}
                        onClick={() => setSelectedTime(t.value)}
                        style={{
                          background: sel ? 'rgba(168,125,240,0.14)' : 'rgba(255,255,255,0.03)',
                          border: `1px solid ${sel ? '#A87DF0' : 'rgba(255,255,255,0.07)'}`,
                          borderRadius: 10,
                          padding: '11px 16px',
                          color: sel ? '#ffffff' : 'rgba(255,255,255,0.4)',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: 13,
                          fontWeight: sel ? 600 : 400,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.12s',
                        }}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={handleUpdateTime}
                  disabled={saving}
                  style={{
                    width: '100%',
                    background: '#A87DF0',
                    border: 'none',
                    borderRadius: 10,
                    padding: '13px 20px',
                    color: '#ffffff',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.4 : 1,
                    transition: 'opacity 0.15s',
                  }}
                >
                  {saving ? 'saving...' : 'save'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div style={{ marginBottom: 32 }}>
          <span style={sectionLabel}>notifications</span>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={strip}>
              <span style={rowText}>sms</span>
              <span style={rowValue}>on</span>
            </div>
          </div>
        </div>

        {/* IDENTITY */}
        {profile && (
          <div style={{ marginBottom: 48 }}>
            <span style={sectionLabel}>your identity</span>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={strip}>
                <span style={rowText}>becoming</span>
                <span style={rowValue}>{profile.goal}</span>
              </div>
              <div style={strip}>
                <span style={rowText}>joined</span>
                <span style={rowValue}>{formatJoinDate(profile.created_at)}</span>
              </div>
            </div>
          </div>
        )}

        {/* SPACER — pushes sign out to the bottom */}
        <div style={{ marginTop: 'auto' }} />

        {/* SIGN OUT */}
        <button
          onClick={handleSignOut}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 13,
            color: 'rgba(255,255,255,0.2)',
            cursor: 'pointer',
            padding: 0,
            letterSpacing: '0.01em',
            transition: 'color 0.15s',
            display: 'block',
            margin: '0 auto',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}
        >
          sign out
        </button>

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
            onClick={e => { e.preventDefault(); router.push(href); }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none', cursor: 'pointer' }}
          >
            <Icon active={id === 'settings'} />
            <span style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 10,
              color: id === 'settings' ? '#A87DF0' : 'rgba(255,255,255,0.28)',
              letterSpacing: '0.03em',
            }}>
              {label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}
