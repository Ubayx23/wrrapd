'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Profile = {
  id: string;
  name: string;
  goal: string;
  check_in_time: string;
  created_at: string;
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

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState('home');

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
          .select('id, name, goal, check_in_time, created_at')
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
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100dvh',
        background: '#07070F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.2)' }}>
          loading...
        </span>
      </div>
    );
  }

  if (!profile) return null;

  const days = daysSince(profile.created_at);
  const isTrial = days < 7;
  const trialDaysLeft = Math.max(7 - days, 0);

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
      background: '#07070F',
      boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '0 24px 80px' }}>

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
        background: '#07070F',
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
    </div>
  );
}
