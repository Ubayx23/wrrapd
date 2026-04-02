'use client';

import Waitlist from '@/components/ui/waitlist';
import { ShaderBackground } from '@/components/ui/animated-shader-hero';

export default function Page() {
  return (
    <div
      className="waitlist-page"
      style={{
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'black',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated WebGL shader background */}
      <ShaderBackground />

      {/* Dark purple overlay over shader */}
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
          padding: 'clamp(24px, 6vw, 60px) 24px',
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

        {/* Headline */}
        <h2
          style={{
            color: '#ffffff',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(28px, 7vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 12px 0',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>to be launched on</span><br />
          <span style={{ color: '#7B68EE', fontStyle: 'italic' }}>April 8</span>
        </h2>

        {/* Subtext */}
        <p
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 'clamp(13px, 3vw, 16px)',
            lineHeight: 1.7,
            maxWidth: 340,
            margin: '0 auto 32px auto',
          }}
        >
          check in <strong style={{ color: '#ffffff', fontWeight: 700 }}>once a day</strong>.{' '}
          stay on track.{' '}
          get your month{' '}
          <strong style={{ color: '#7B68EE', fontWeight: 800 }}>wrrapd</strong>.
        </p>

        {/* Form container — frosted card */}
        <div
          style={{
            width: '100%',
            maxWidth: 380,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20,
            padding: '28px 24px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
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
        <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: 12 }}>Under Construction</span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: 12 }}>© 2026 wrrapd</span>
      </footer>
    </div>
  );
}
