'use client';

import { motion } from 'framer-motion';
import PhoneMockupCTA from './PhoneMockupCTA';

export default function Pricing() {
  return (
    <section
      id="pricing"
      style={{
        background: '#07070F',
        paddingTop: 'clamp(60px, 10vw, 120px)',
        paddingBottom: 'clamp(60px, 10vw, 120px)',
        paddingLeft: 'clamp(24px, 6vw, 80px)',
        paddingRight: 'clamp(24px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow blob — top left */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          top: -100,
          left: -100,
          background: 'radial-gradient(circle, rgba(123,104,238,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Ambient glow blob — bottom right */}
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          bottom: -80,
          right: -80,
          background: 'radial-gradient(circle, rgba(76,61,143,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          gap: 'clamp(40px, 8vw, 64px)',
          alignItems: 'center',
        }}
        className="cta-two-col"
      >
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{ flex: 1 }}
        >
          {/* Label */}
          <span
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(10px, 1.2vw, 12px)',
              color: '#7B68EE',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'block',
              marginBottom: 16,
            }}
          >
            EARLY ACCESS
          </span>

          {/* Headline */}
          <h2
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(36px, 6vw, 64px)',
              lineHeight: 1.1,
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: '-2px',
            }}
          >
            you&apos;ve been saying<br />
            you&apos;ll{' '}
            <span style={{ color: '#7B68EE' }}>start.</span>
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(13px, 1.5vw, 15px)',
              color: 'rgba(255,255,255,0.4)',
              marginTop: 16,
              marginBottom: 32,
            }}
          >
            join the waitlist. be first in.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              marginTop: 32,
            }}
          >
            <a
              href="/waitlist"
              style={{
                background: '#7B68EE',
                color: '#FFFFFF',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: 9999,
                fontSize: 'clamp(13px, 1.4vw, 14px)',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Request Access
            </a>
            <button
              onClick={() => {
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: 9999,
                fontSize: 'clamp(13px, 1.4vw, 14px)',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              learn more
            </button>
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PhoneMockupCTA />
        </motion.div>
      </div>
    </section>
  );
}
