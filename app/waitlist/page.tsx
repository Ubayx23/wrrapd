'use client';

import Waitlist from '@/components/ui/waitlist';

export default function Page() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b69 40%, #1a0a2e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blob 1 */}
      <div
        style={{
          position: 'absolute',
          borderRadius: '50%',
          pointerEvents: 'none',
          width: 400,
          height: 400,
          top: -100,
          left: -100,
          background: 'radial-gradient(circle, rgba(123,104,238,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Blob 2 */}
      <div
        style={{
          position: 'absolute',
          borderRadius: '50%',
          pointerEvents: 'none',
          width: 300,
          height: 300,
          bottom: 0,
          right: -50,
          background: 'radial-gradient(circle, rgba(76,61,143,0.5) 0%, transparent 70%)',
          filter: 'blur(50px)',
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
            color: 'white',
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
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 100,
            padding: '8px 20px',
            marginBottom: 28,
          }}
        >
          <span style={{ color: 'white', fontSize: 12, fontWeight: 700, letterSpacing: 2 }}>
            APRIL 8 DROP
          </span>
        </div>

        {/* Headline */}
        <h2
          style={{
            color: 'white',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(28px, 7vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 12px 0',
          }}
        >
          to be launched on<br />
          <span style={{ color: '#7B68EE', fontStyle: 'italic' }}>April 8</span>
        </h2>

        {/* Subtext */}
        <p
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(13px, 3vw, 16px)',
            lineHeight: 1.6,
            maxWidth: 340,
            margin: '0 auto 32px auto',
          }}
        >
          check in once a day. stay on track. get your month wrrapd.
        </p>

        {/* Form container */}
        <div style={{ width: '100%', maxWidth: 380 }}>
          <Waitlist />
        </div>

        {/* Social section */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginBottom: 16 }}>
            (follow me ;)
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
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.1)',
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
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.1)',
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
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.1)',
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
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.1)',
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
          borderTop: '1px solid rgba(255,255,255,0.08)',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span style={{ color: 'white', fontWeight: 700, fontSize: 12 }}>Under Construction</span>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>built by a student for students</span>
        <span style={{ color: 'white', fontWeight: 700, fontSize: 12 }}>© 2025 wrrapd</span>
      </footer>
    </div>
  );
}
