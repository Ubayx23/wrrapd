'use client';
import { motion } from 'framer-motion';
import { BeamsBackground } from './BeamsBackground';
import PhoneMockup from './PhoneMockup';

export default function Hero() {

  return (
    <>
      {/* FLOATING NAVBAR */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{
          position: 'fixed',
          bottom: 24,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'rgba(8, 6, 18, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 100,
          padding: '6px 6px 6px 20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(76,61,143,0.3)',
          pointerEvents: 'all',
          gap: 4,
        }}>
          {/* Logo */}
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 15,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.5px',
            marginRight: 12,
            flexShrink: 0,
          }}>
            wrrapd<span style={{ color: '#4C3D8F' }}>.</span>
          </span>

          {/* CTA */}
          <a
            href="/onboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#A87DF0',
              color: '#ffffff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              padding: '9px 20px',
              borderRadius: 100,
              marginLeft: 4,
              flexShrink: 0,
              transition: 'opacity 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            lock in now
          </a>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        width: '100%',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <BeamsBackground>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 'clamp(60px, 12vw, 140px)',
            width: '100%',
          }}>

            {/* HEADLINE */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              style={{ textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              {/* Status pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 100,
                padding: '6px 14px',
                marginBottom: 28,
              }}>
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#4ade80',
                    display: 'block',
                    flexShrink: 0,
                  }}
                />
                <span style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(11px, 1.2vw, 12px)',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}>
                  Cohort 1 · 47 spots remaining
                </span>
              </div>

              <h1 style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(44px, 10vw, 96px)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: 'clamp(-1px, -0.4vw, -2px)',
                lineHeight: 1.1,
                margin: '0 0 20px',
              }}>
                become who you<br />
                <span style={{
                  fontStyle: 'italic',
                  color: '#A87DF0',
                }}>said</span> you would.
              </h1>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(12px, 1.4vw, 14px)',
                fontWeight: 500,
                color: 'rgba(255,250,245,0.62)',
                margin: '0 auto 16px',
                maxWidth: 280,
                lineHeight: 1.6,
                letterSpacing: '0.01em',
                textAlign: 'center',
              }}>
                not everyone gets in.
              </p>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(11px, 1.2vw, 13px)',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.28)',
                margin: '0 auto 48px',
                lineHeight: 1.6,
                letterSpacing: '0.04em',
                textAlign: 'center',
              }}>
                dropping june 1.
              </p>
            </motion.div>

            {/* PHONE MOCKUP */}
            <PhoneMockup />

            {/* Fade gradient at bottom */}
            <div style={{
              position: 'relative',
              zIndex: 3,
              width: '100%',
              height: 'clamp(200px, 40vw, 280px)',
              background: 'linear-gradient(to bottom, transparent 0%, #07070F 60%)',
              pointerEvents: 'none',
              flexShrink: 0,
            }} />

          </div>
        </BeamsBackground>
      </section>
    </>
  );
}
