'use client';

import { useEffect } from 'react';

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

  return (
    <>
      <div className="flashlight-overlay" id="flashlight" />

      <header className="always-visible fixed top-0 left-0 w-full flex justify-center pt-6">
        <div
          className="font-dmsans font-semibold text-white tracking-tight text-[3.25rem]"
          data-purpose="logo"
        >
          wrrapd.
        </div>
      </header>

      <div className="logo-in-cutout">
        <div className="font-dmsans font-semibold text-wrrapd-navy tracking-tight text-[3.25rem]">
          wrrapd.
        </div>
      </div>

      <main className="flex flex-col items-center min-h-screen px-6 pt-28 pb-24 z-10 relative select-none">
        <h1
          className="font-playfair font-light text-wrrapd-navy leading-[0.88] tracking-tight text-center mb-12"
          style={{ fontSize: "clamp(3.75rem, 8vw, 6.5rem)" }}
        >
          To be launched
          <br />
          on <span className="italic">March 23</span>
        </h1>

        <div
          className="flex gap-[1.5rem] items-center mb-8"
          data-purpose="social-links"
        >
          <a
            className="hover:opacity-70 transition-opacity text-wrrapd-navy"
            href="#"
            aria-label="X (Twitter)"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            className="hover:opacity-70 transition-opacity text-wrrapd-navy"
            href="#"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            className="hover:opacity-70 transition-opacity text-wrrapd-navy"
            href="#"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            className="hover:opacity-70 transition-opacity text-wrrapd-navy"
            href="#"
            aria-label="TikTok"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31 0 2.591.214 3.75.606V5.32c-1.027-.308-2.127-.466-3.25-.466-.547 0-1.062.057-1.557.165v12.005c0 2.154-1.746 3.9-3.9 3.9s-3.9-1.746-3.9-3.9 1.746-3.9 3.9-3.9c.462 0 .902.081 1.311.23V8.71c-1.426-.401-2.936-.613-4.5-.613-3.235 0-6 2.765-6 6s2.765 6 6 6 6-2.765 6-6V0h2.164c.504 1.63 1.832 2.895 3.511 3.483V0h-3.75z" />
            </svg>
          </a>
        </div>

        <div className="w-full max-w-[400px] mb-12" data-purpose="waitlist-container">
          <form
            className="flex gap-2 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              console.log('submitted');
            }}
          >
            <input
              className="flex-1 rounded-lg bg-transparent border-[0.5px] font-poppins px-4 py-2 focus:ring-0 placeholder:font-light border-wrrapd-navy text-wrrapd-navy placeholder:text-wrrapd-navy/40 focus:border-wrrapd-navy"
              placeholder="your@email.com"
              required
              type="email"
            />
            <button
              className="rounded-lg font-poppins font-bold px-6 py-2 transition-transform hover:scale-[1.02] active:scale-95 bg-wrrapd-navy text-wrrapd-gray"
              type="submit"
            >
              Join
            </button>
          </form>
        </div>

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
