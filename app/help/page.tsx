'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AnnouncementBanner from '@/app/components/AnnouncementBanner';

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
  { id: 'home',     label: 'home',     href: '/dashboard', Icon: HomeIcon },
  { id: 'settings', label: 'settings', href: '/settings',  Icon: SettingsIcon },
  { id: 'help',     label: 'help',     href: '/help',      Icon: HelpIcon },
];

const faqs = [
  {
    q: 'how does it work?',
    a: 'one text a day. reply yes or no. first reply counts.',
  },
  {
    q: 'when do i get texted?',
    a: 'every day at the time you chose. no exceptions.',
  },
  {
    q: 'what is my wrrapd?',
    a: 'end of month you get a visual drop of what your month actually looked like.',
  },
  {
    q: 'how do i cancel?',
    a: 'go to settings and cancel anytime. no questions asked.',
  },
  {
    q: 'i need help.',
    a: 'text us at +1 (555) 000-0000',
  },
];

export default function HelpPage() {
  const router = useRouter();

  useEffect(() => {
    const prev = document.body.style.cssText;
    document.body.style.cssText = 'background-color: #0a0a0a; margin: 0; padding: 0; overflow-x: hidden;';
    return () => { document.body.style.cssText = prev; };
  }, []);

  return (
    <div style={{ minHeight: '100dvh', width: '100vw', maxWidth: '100%', background: '#0a0a0a', boxSizing: 'border-box', overflowX: 'hidden' }}>
      <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', padding: '0 20px 100px', boxSizing: 'border-box' }}>

        {/* TOP BAR */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          paddingTop: 'clamp(20px, 5vw, 32px)',
          paddingBottom: 16,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: 'clamp(40px, 10vw, 56px)',
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
            help.
          </span>
        </div>

        <AnnouncementBanner />

        {/* FAQ LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 8vw, 44px)' }}>
          {faqs.map(({ q, a }) => (
            <div key={q}>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(15px, 4vw, 17px)',
                color: '#ffffff',
                margin: '0 0 8px',
                letterSpacing: '-0.3px',
                lineHeight: 1.3,
              }}>
                {q}
              </p>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(13px, 3.5vw, 14px)',
                color: 'rgba(255,255,255,0.35)',
                margin: 0,
                lineHeight: 1.65,
              }}>
                {a}
              </p>
            </div>
          ))}
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
            onClick={e => { e.preventDefault(); router.push(href); }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none', cursor: 'pointer' }}
          >
            <Icon active={id === 'help'} />
            <span style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 10,
              color: id === 'help' ? '#9B5DE5' : 'rgba(255,255,255,0.28)',
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
