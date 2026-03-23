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
    { name: 'Twitter', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/X_icon_2.svg', href: 'https://x.com/_17Tm', iconSize: 'size-11', tilt: 2 },
    { name: 'LinkedIn', image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', href: 'https://www.linkedin.com/in/ubaydulla-noorullah-526994276/', iconSize: 'size-11' },
    { name: 'Instagram', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', href: 'https://www.instagram.com/ubay.xx/', iconSize: 'size-11' },
    { name: 'TikTok', image: '/tiktok.png', href: 'https://www.tiktok.com/@ubaydasimp', iconSize: 'size-16', tilt: 12 },
  ];

  return (
    <>
      <div className="flashlight-overlay" id="flashlight" />

      {/* Mask on header (full-width, left:0) so viewport-relative --mouse-x/y coords align correctly */}
      <header className="always-visible logo-white-layer fixed top-0 left-0 w-full flex justify-center pt-4 md:pt-6">
        {/* White version — dark backgrounds (desktop overlay + mobile dark bg) */}
        <div className="flex items-center cursor-default" data-purpose="logo">
          <span className="font-dmsans font-semibold text-white tracking-tight text-[3rem] md:text-[4rem]">wrrapd.</span>
        </div>
      </header>

      {/* Dark cutout logo — visible inside the flashlight circle (light background) */}
      <div className="logo-in-cutout">
        <div className="flex items-center">
          <span className="font-dmsans font-semibold text-black tracking-tight text-[3rem] md:text-[4rem]">wrrapd.</span>
        </div>
      </div>

      {/* group on main so ghost "lock in" text reacts to page hover */}
      <main className="group flex flex-col items-center justify-center min-h-dvh px-6 pt-16 pb-32 z-10 relative">
        <h1
          className="font-playfair font-light text-wrrapd-navy leading-[0.88] tracking-tight text-center mb-10 md:mb-14"
          style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)" }}
        >
          to be launched
          <br />
          {/* Half-highlight: light navy wash covers bottom ~45% of the text like a marker */}
          on <span
            className="italic"
            style={{ background: 'linear-gradient(to top, rgba(10,31,71,0.18) 45%, transparent 45%)', paddingBottom: '0.05em' }}
          >
            March 30
          </span>
        </h1>

        {/* Subtle prompt above the social icons */}
        <p className="text-wrrapd-navy/50 text-sm font-poppins mb-3 tracking-wide">(follow me ;)</p>

        {/* New logo-only socials — old AnimatedSocialLinks commented out in social-links.tsx */}
        <LogoSocialLinks socials={socials} className="mb-6" />

        {/* Waitlist form with social proof */}
        <Waitlist className="mb-0" />

        {/* Ghost "lock in" — bottom left, small, desktop only */}
        <div
          className="hidden md:block fixed bottom-16 left-6 font-dmsans font-bold text-wrrapd-navy pointer-events-none select-none opacity-0 group-hover:opacity-[0.22] transition-opacity duration-700 z-[60]"
          style={{ fontSize: '2.5rem', letterSpacing: '-0.03em' }}
          aria-hidden
        >
          lock in
        </div>
      </main>

      {/* Sticky on mobile so it sits below content; fixed on desktop */}
      <footer className="sticky md:fixed bottom-0 left-0 right-0 py-4 px-6 flex justify-between items-center bg-wrrapd-gray text-wrrapd-navy text-sm font-poppins font-semibold border-t-2 border-wrrapd-navy/40 z-[50]">
        <span>Under Construction</span>
        <span className="text-xs font-normal opacity-60">built by a student for students</span>
        <span>© 2026</span>
      </footer>

    </>
  );
}
