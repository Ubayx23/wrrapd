'use client';

import { useEffect } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';
import { LogoSocialLinks, type Social } from '@/components/ui/social-links';
import Waitlist from '@/components/ui/waitlist';

export default function Page() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Unlock scroll — globals.css locks it for non-landing pages
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

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

      {/* ── MeshGradient background ── */}
      <MeshGradient
        style={{ position: 'absolute' as const, inset: 0, width: '100%', height: '100%' }}
        colors={['#07070F', '#0D0820', '#1A0F3C', '#4C3D8F']}
        speed={0.4}
      />

      {/* ── Decorative repeating text strip above footer ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 72,
          left: 0,
          right: 0,
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
          letterSpacing: '0.2em',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.06)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 5,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {'wrrapd · lock in · '.repeat(30)}
      </div>

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
          padding: 'clamp(36px, 6vw, 64px) clamp(20px, 5vw, 60px) clamp(100px, 12vw, 140px)',
          gap: 'clamp(16px, 2.8vw, 28px)',
        }}
      >

        {/* Logo */}
        <div
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(3.5rem, 7vw, 6rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-3px',
            lineHeight: 1,
            cursor: 'default',
            textShadow: '0 0 40px rgba(123,104,238,0.8), 0 0 80px rgba(76,61,143,0.5), 0 2px 12px rgba(0,0,0,0.6)',
          }}
        >
          wrrapd.
        </div>

        {/* Launch badge */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(76,61,143,0.9) 0%, rgba(123,104,238,0.7) 100%)',
            border: '1px solid rgba(123,104,238,0.6)',
            borderRadius: 999,
            padding: '8px 22px',
            color: '#FFFFFF',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.08em',
            boxShadow: '0 0 24px rgba(123,104,238,0.45), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
            textTransform: 'uppercase' as const,
          }}
        >
          🚀 &nbsp;march 30 drop
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: 'clamp(-2px, -0.4vw, -3px)',
            lineHeight: 1.05,
            textAlign: 'center',
            margin: 0,
          }}
        >
          to be launched<br />
          on <em style={{ color: '#7B68EE', fontStyle: 'italic' }}>March 30</em>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
            color: 'rgba(255,255,255,0.45)',
            textAlign: 'center',
            maxWidth: 420,
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          check in once a day. stay on track. get your month wrapped.
        </p>

        {/* Follow label */}
        <p
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.5)',
            margin: 0,
            letterSpacing: '0.03em',
          }}
        >
          (follow me ;)
        </p>

        {/* Social icons */}
        <LogoSocialLinks socials={socials} />

        {/* Frosted glass card wrapping waitlist */}
        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20,
            padding: 32,
            width: '100%',
            maxWidth: 520,
          }}
        >
          <Waitlist className="mb-0" />
        </div>

      </main>

      {/* ── Footer ── */}
      <footer className="sticky md:fixed bottom-0 left-0 right-0 py-4 px-6 flex justify-between items-center bg-wrrapd-gray text-wrrapd-navy text-sm font-poppins font-semibold border-t-2 border-wrrapd-navy/40 z-[50]">
        <span>Under Construction</span>
        <span className="text-xs font-normal opacity-60">built by a student for students</span>
        <span>© 2026</span>
      </footer>

    </div>
  );
}
