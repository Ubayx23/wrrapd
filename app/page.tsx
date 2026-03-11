'use client';

import { useEffect, useRef } from 'react';

export default function Page() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!overlayRef.current) return;
      overlayRef.current.style.background =
        `radial-gradient(circle 500px at ${e.clientX}px ${e.clientY}px, transparent 0%, transparent 25%, #0F1C2E 60%)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="landing">
      <div
        ref={overlayRef}
        className="overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          background: '#0F1C2E',
        }}
      />

      <header
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '1.5rem',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: '1.1rem',
          color: 'white',
          textTransform: 'lowercase',
        }}
      >
        wrrapd
      </header>

      <section
        className="hero"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            color: '#0F1C2E',
            fontSize: 'clamp(5rem, 10vw, 9rem)',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          to be launched
          <br />
          on March 23
        </p>
      </section>

      <div
        style={{
          position: 'relative',
          zIndex: 20,
          marginTop: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '5.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            color: 'white',
            marginTop: '2rem',
          }}
        >
          <a href="#" aria-label="X" style={{ color: 'white' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn" style={{ color: 'white' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="#" aria-label="TikTok" style={{ color: 'white' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" style={{ color: 'white' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="waitlist"
          style={{
            display: 'flex',
            gap: '8px',
            width: '100%',
            maxWidth: '400px',
            marginTop: '1.5rem',
            padding: '0 1.5rem',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            required
            className="waitlist-input"
            style={{
              flex: 1,
              fontSize: '0.875rem',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              background: 'white',
              color: '#0F1C2E',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            join waitlist
          </button>
        </form>
      </div>

      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1.5rem',
          color: 'rgba(255,255,255,0.6)',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 300,
        }}
      >
        <span>under construction</span>
        <span>2026</span>
      </footer>
    </main>
  );
}
