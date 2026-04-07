'use client';

import Waitlist from '@/components/ui/waitlist';
import { ShaderBackground } from '@/components/ui/animated-shader-hero';

export default function Page() {
  return (
    <div
      className="waitlist-page"
      style={{
        minHeight: '100dvh',
        width: '100vw',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'black',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <ShaderBackground />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, rgba(6,2,22,0.92) 0%, rgba(20,8,55,0.88) 50%, rgba(6,2,22,0.94) 100%)',
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(24px, 6vw, 60px) clamp(16px, 4vw, 32px)',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <h1
          style={{
            color: '#ffffff',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontWeight: 800,
            letterSpacing: -1,
            margin: '0 0 16px 0',
          }}
        >
          wrrapd<span style={{ color: '#7B68EE' }}>.</span>
        </h1>

        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(123,104,238,0.15)',
            border: '1px solid rgba(123,104,238,0.35)',
            borderRadius: 100,
            padding: '8px 20px',
            marginBottom: 28,
          }}
        >
          <span style={{ color: '#b8aff5', fontSize: 12, fontWeight: 700, letterSpacing: 2 }}>
            APRIL 8 DROP
          </span>
        </div>

        {/* Stacked headline */}
        <div style={{ marginBottom: 40 }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 6vw, 52px)',
            lineHeight: 1.15,
            letterSpacing: 'clamp(-1px, -0.3vw, -2px)',
            color: '#ffffff',
            margin: '0 0 2px 0',
          }}>
            one question a day.
          </p>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 6vw, 52px)',
            lineHeight: 1.15,
            letterSpacing: 'clamp(-1px, -0.3vw, -2px)',
            color: 'rgba(255,255,255,0.45)',
            margin: '0 0 2px 0',
          }}>
            one answer.
          </p>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 6vw, 52px)',
            lineHeight: 1.15,
            letterSpacing: 'clamp(-1px, -0.3vw, -2px)',
            color: 'rgba(255,255,255,0.22)',
            margin: 0,
          }}>
            we keep track.
          </p>
        </div>

        {/* Form card */}
        <div
          style={{
            width: '100%',
            maxWidth: 'min(420px, calc(100vw - 48px))',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20,
            padding: 'clamp(20px, 5vw, 28px) clamp(16px, 4vw, 24px)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxSizing: 'border-box',
          }}
        >
          <Waitlist />
        </div>

      </div>

      {/* Footer */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: 12 }}>wrrapd</span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: 12 }}>© 2026</span>
      </footer>
    </div>
  );
}
