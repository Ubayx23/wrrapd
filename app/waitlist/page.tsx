'use client';

import { useEffect } from 'react';
import { LogoSocialLinks, type Social } from '@/components/ui/social-links';
import Waitlist from '@/components/ui/waitlist';

export default function Page() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const root = document.documentElement;

    const setPos = (x: number, y: number) => {
      root.style.setProperty('--mouse-x', `${x}px`);
      root.style.setProperty('--mouse-y', `${y}px`);
    };

    setPos(window.innerWidth / 2, window.innerHeight / 2);

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (window.innerWidth <= 743) return;
      const ev = e as MouseEvent;
      const touch = (e as TouchEvent).touches?.[0];
      const x = ev.clientX ?? touch?.clientX;
      const y = ev.clientY ?? touch?.clientY;
      if (typeof x === 'number' && typeof y === 'number') setPos(x, y);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
    };
  }, []);

  const socials: Social[] = [
    { name: 'Twitter', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/X_icon_2.svg', href: 'https://x.com/ubaydev', iconSize: 'size-11', tilt: 2 },
    { name: 'LinkedIn', image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', href: 'https://www.linkedin.com/in/ubaydulla-noorullah-526994276/', iconSize: 'size-11' },
    { name: 'Instagram', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', href: 'https://www.instagram.com/ubay.xx/', iconSize: 'size-11' },
    { name: 'TikTok', image: '/tiktok.png', href: 'https://www.tiktok.com/@ubaydasimp', iconSize: 'size-16', tilt: 12 },
  ];

  return (
    <div style={{ minHeight: '100dvh', background: '#07070F', position: 'relative', overflow: 'hidden' }}>

      {/* ── Animated blob background ── */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(76,61,143,0.7) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'blob-drift 8s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        top: '35%',
        left: '60%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,104,238,0.35) 0%, transparent 70%)',
        filter: 'blur(80px)',
        animation: 'blob-drift 11s ease-in-out infinite reverse',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* ── Logo ── */}
      <header className="always-visible logo-white-layer fixed top-0 left-0 w-full flex justify-center pt-4 md:pt-6" style={{ zIndex: 30 }}>
        <div className="flex items-center cursor-default" data-purpose="logo">
          <span className="font-dmsans font-semibold text-white tracking-tight text-[3rem] md:text-[4rem]">wrrapd.</span>
        </div>
      </header>

      {/* ── Main content ── */}
      <main
        className="waitlist-page group"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100dvh',
          padding: 'clamp(100px, 14vw, 140px) clamp(20px, 5vw, 60px) 120px',
        }}
      >
        {/* Headline */}
        <h1 style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 'clamp(3rem, 9vw, 7rem)',
          fontWeight: 800,
          color: '#FFFFFF',
          letterSpacing: 'clamp(-2px, -0.4vw, -3px)',
          lineHeight: 1.05,
          textAlign: 'center',
          margin: '0 0 clamp(24px, 4vw, 40px)',
        }}>
          to be launched<br />
          on <em style={{ color: '#7B68EE', fontStyle: 'italic' }}>March 30</em>
        </h1>

        {/* Follow me */}
        <p className="text-sm font-poppins mb-3 tracking-wide" style={{ color: 'rgba(255,255,255,0.5)' }}>
          (follow me ;)
        </p>

        {/* Social icons — all hrefs unchanged */}
        <LogoSocialLinks socials={socials} className="mb-8" />

        {/* Frosted glass card wrapping waitlist */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          padding: 32,
          width: '100%',
          maxWidth: 480,
        }}>
          <Waitlist className="mb-0" />
        </div>

        {/* Ghost "lock in" */}
        <div
          className="hidden md:block fixed bottom-16 left-6 font-dmsans font-bold pointer-events-none select-none opacity-0 group-hover:opacity-[0.18] transition-opacity duration-700 z-[60]"
          style={{ fontSize: '2.5rem', letterSpacing: '-0.03em', color: '#FFFFFF' }}
          aria-hidden
        >
          lock in
        </div>
      </main>

      {/* ── Decorative large background text ── */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 900,
        fontSize: 'clamp(6rem, 20vw, 16rem)',
        color: 'rgba(255,255,255,0.03)',
        letterSpacing: '-4px',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
        lineHeight: 1,
      }}>
        wrrapd.
      </div>

      {/* ── Footer — unchanged ── */}
      <footer className="sticky md:fixed bottom-0 left-0 right-0 py-4 px-6 flex justify-between items-center bg-wrrapd-gray text-wrrapd-navy text-sm font-poppins font-semibold border-t-2 border-wrrapd-navy/40 z-[50]">
        <span>Under Construction</span>
        <span className="text-xs font-normal opacity-60">built by a student for students</span>
        <span>© 2026</span>
      </footer>

    </div>
  );
}
