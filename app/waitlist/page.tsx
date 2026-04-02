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

      {/* Light overlay so black text is readable over the shader */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255, 255, 255, 0.88)',
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
            color: '#000000',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontWeight: 800,
            letterSpacing: -1,
            margin: '0 0 16px 0',
          }}
        >
          wrrapd<span style={{ color: '#4C3D8F' }}>.</span>
        </h1>

        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(76,61,143,0.1)',
            border: '1px solid rgba(76,61,143,0.3)',
            borderRadius: 100,
            padding: '8px 20px',
            marginBottom: 28,
          }}
        >
          <span style={{ color: '#4C3D8F', fontSize: 12, fontWeight: 700, letterSpacing: 2 }}>
            APRIL 8 DROP
          </span>
        </div>

        {/* Headline */}
        <h2
          style={{
            color: '#000000',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(28px, 7vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 12px 0',
          }}
        >
          to be launched on<br />
          <span style={{ color: '#4C3D8F', fontStyle: 'italic' }}>April 8</span>
        </h2>

        {/* Subtext */}
        <p
          style={{
            color: 'rgba(0,0,0,0.6)',
            fontSize: 'clamp(13px, 3vw, 16px)',
            lineHeight: 1.6,
            maxWidth: 340,
            margin: '0 auto 32px auto',
          }}
        >
          check in <strong style={{ color: '#000000' }}>once a day</strong>. stay on track.{' '}
          get your month <strong style={{ color: '#4C3D8F' }}>wrrapd</strong>.
        </p>

        {/* Form container */}
        <div style={{ width: '100%', maxWidth: 380 }}>
          <Waitlist />
        </div>

        {/* Social section */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: 13, marginBottom: 16 }}>
            stay updated ;)
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center' }}>
            {/* Twitter / X */}
            <a
              href="https://x.com/ubaydev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5a/X_icon_2.svg"
                alt="X"
                style={{ width: 20, height: 20 }}
              />
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ubaydulla-noorullah-526994276/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                alt="LinkedIn"
                style={{ width: 22, height: 22 }}
              />
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/ubay.xx/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                style={{ width: 22, height: 22 }}
              />
            </a>
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@ubaydasimp"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <img
                src="/tiktok.png"
                alt="TikTok"
                style={{ width: 22, height: 22 }}
              />
            </a>
          </div>
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
          borderTop: '1px solid rgba(0,0,0,0.08)',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span style={{ color: 'rgba(0,0,0,0.5)', fontWeight: 700, fontSize: 12 }}>Under Construction</span>
        <span style={{ color: 'rgba(0,0,0,0.5)', fontWeight: 700, fontSize: 12 }}>© 2026 wrrapd</span>
      </footer>
    </div>
  );
}
