'use client';

import { useEffect } from 'react';
import AnimatedSocialLinks, { type Social } from '@/components/ui/social-links';
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
    { name: 'X', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/X_icon_2.svg', href: 'https://x.com/_17Tm', iconSize: 'size-22', tilt: 2 },
    { name: 'LinkedIn', image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', href: 'https://www.linkedin.com/in/ubaydulla-noorullah-526994276/' },
    { name: 'Instagram', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', href: 'https://www.instagram.com/ubay.xx/' },
    { name: 'TikTok', image: '/tiktok.png', href: 'https://www.tiktok.com/@ubaydasimp', iconSize: 'size-26', tilt: 12 },
  ];

  return (
    <>
      <div className="flashlight-overlay" id="flashlight" />

      {/* Mask on the header (full-width, left:0) so viewport-relative --mouse-x/y coords align correctly */}
      <header className="always-visible logo-white-layer fixed top-0 left-0 w-full flex justify-center pt-6">
        <div
          className="font-dmsans font-semibold text-white tracking-tight text-[3.25rem] cursor-default"
          data-purpose="logo"
        >
          wrrapd.
        </div>
      </header>

      <div className="logo-in-cutout">
        <div className="font-dmsans font-semibold text-black tracking-tight text-[3.25rem]">
          wrrapd.
        </div>
      </div>

      <main className="flex flex-col items-center min-h-screen px-6 pt-28 pb-24 z-10 relative select-none">
        <h1
          className="font-playfair font-light text-wrrapd-navy leading-[0.88] tracking-tight text-center mb-14"
          style={{ fontSize: "clamp(3.75rem, 8vw, 6.5rem)" }}
        >
          To be launched
          <br />
          on <span className="italic">March 23</span>
        </h1>

        <AnimatedSocialLinks socials={socials} className="mb-4 text-wrrapd-navy" />

        {/* Replaced inline form with Waitlist component — includes loading/success states and social proof count */}
        <Waitlist className="mb-12" />

        <div className="flex-1 min-h-[2rem]" />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 py-4 px-6 flex justify-between items-center bg-wrrapd-gray text-wrrapd-navy text-sm font-poppins font-semibold border-t-2 border-wrrapd-navy/40 z-[50]">
        <span>Under Construction</span>
        <span>© 2026</span>
      </footer>

      <span
        className="fixed bottom-14 right-4 z-30 text-[12px] text-wrrapd-navy font-poppins select-none pointer-events-none"
        aria-hidden
      >
        unc status
      </span>
    </>
  );
}
