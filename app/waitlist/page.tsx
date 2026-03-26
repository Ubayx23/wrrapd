'use client';

import { useEffect } from 'react';
import { LogoSocialLinks, type Social } from '@/components/ui/social-links';
import Waitlist from '@/components/ui/waitlist';
import { EtherealShadow } from '@/components/ui/etheral-shadow';

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
    <>
      {/* Ethereal animated background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <EtherealShadow
          color="rgba(76,61,143,0.9)"
          animation={{ scale: 80, speed: 70 }}
          noise={{ opacity: 0.3, scale: 1.2 }}
        />
      </div>

      <header className="always-visible logo-white-layer fixed top-0 left-0 w-full flex justify-center pt-4 md:pt-6" style={{ position: 'fixed', zIndex: 30 }}>
        {/* White version — visible on dark background */}
        <div className="flex items-center cursor-default" data-purpose="logo">
          <span className="font-dmsans font-bold tracking-tight text-[3rem] md:text-[4rem]" style={{ color: '#FFFFFF', letterSpacing: '-0.04em' }}>
            wrrapd<span style={{ color: '#4C3D8F' }}>.</span>
          </span>
        </div>
      </header>

      <div className="logo-in-cutout" style={{ zIndex: 30 }}>
        <div className="flex items-center">
          <span className="font-dmsans font-bold tracking-tight text-[3rem] md:text-[4rem]" style={{ color: '#07070F', letterSpacing: '-0.04em' }}>
            wrrapd<span style={{ color: '#4C3D8F' }}>.</span>
          </span>
        </div>
      </div>

      {/* group on main so ghost "lock in" text reacts to page hover */}
      <main className="waitlist-page group flex flex-col items-center justify-center min-h-dvh px-6 pt-16 pb-32 relative" style={{ position: 'relative', zIndex: 10 }}>
        <h1
          className="font-playfair font-light leading-[0.88] tracking-tight text-center mb-10 md:mb-14 w-full"
          style={{ fontSize: "clamp(2.75rem, 6vw, 5.5rem)", color: '#FFFFFF', maxWidth: '900px' }}
        >
          to be launched
          <br />
          {/* Half-highlight: purple wash covers bottom ~45% of the text like a marker */}
          on <span
            className="italic march-30"
            style={{ color: '#7B68EE', paddingBottom: '0.05em' }}
          >
            March 30
          </span>
        </h1>

        {/* Subtle prompt above the social icons */}
        <p className="text-sm font-poppins mb-3 tracking-wide" style={{ color: 'rgba(255,255,255,0.6)' }}>(follow me ;)</p>

        {/* New logo-only socials — old AnimatedSocialLinks commented out in social-links.tsx */}
        <LogoSocialLinks socials={socials} className="mb-6" />

        {/* Waitlist form with social proof */}
        <Waitlist className="mb-0" />

        {/* Ghost "lock in" — bottom left, small, desktop only */}
        <div
          className="hidden md:block fixed bottom-16 left-6 font-dmsans font-bold pointer-events-none select-none opacity-0 group-hover:opacity-[0.18] transition-opacity duration-700 z-[60]"
          style={{ fontSize: '2.5rem', letterSpacing: '-0.03em', color: '#FFFFFF' }}
          aria-hidden
        >
          lock in
        </div>
      </main>

      {/* Sticky on mobile so it sits below content; fixed on desktop */}
      <footer
        className="sticky md:fixed bottom-0 left-0 right-0 py-4 px-6 flex justify-between items-center text-sm font-poppins z-[50]"
        style={{ background: 'transparent', borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)', zIndex: 50 }}
      >
        <span>Under Construction</span>
        <span className="text-xs font-normal" style={{ opacity: 0.6 }}>built by a student for students</span>
        <span>© 2026</span>
      </footer>

    </>
  );
}
