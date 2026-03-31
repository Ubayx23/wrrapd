'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Pricing() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="pricing"
      style={{
        background: '#07070F',
        padding: `clamp(40px, 4.9vw, 59px) clamp(24px, 6vw, 80px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{ textAlign: 'center', width: '100%', maxWidth: '440px', margin: '0 auto clamp(40px, 6vw, 64px)' }}
      >
        <span
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '11px',
            color: 'rgba(123,104,238,0.7)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px',
          }}
        >
          pricing
        </span>
        <h2
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 56px)',
            color: '#FFFFFF',
            letterSpacing: '-2px',
            margin: 0,
          }}
        >
          simple pricing.
        </h2>
      </motion.div>

      <div style={{ position: 'relative', maxWidth: '440px', width: '100%', margin: '0 auto' }}>
        {/* Purple glow behind card */}
        <div style={{
          position: 'absolute',
          width: 340,
          height: 340,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,61,143,0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{
            background: '#0D0F14',
            border: '1px solid rgba(123, 104, 238, 0.35)',
            boxShadow: '0 0 40px rgba(76,61,143,0.2)',
            borderRadius: '20px',
            padding: `clamp(40px, 6vw, 64px) clamp(32px, 5vw, 56px)`,
            width: '100%',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 1,
          }}
        >
        {/* Plan name */}
        <div
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            color: '#7B68EE',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          wrrapd pro
        </div>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '8px' }}>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(56px, 10vw, 72px)',
              color: '#FFFFFF',
              lineHeight: 1,
            }}
          >
            $9.99
          </span>
          <span
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: '18px',
              color: 'rgba(255,255,255,0.38)',
              paddingBottom: '6px',
            }}
          >
            /mo
          </span>
        </div>

        {/* Subtext */}
        <div
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            color: 'rgba(255,255,255,0.38)',
            marginBottom: '32px',
          }}
        >
          cancel anytime.
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            marginBottom: '32px',
          }}
        />

        {/* Features list */}
        {[
          'daily SMS check-in',
          'one goal tracked',
          'monthly wrapped card',
          'streak history',
        ].map((feature) => (
          <div
            key={feature}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '14px',
            }}
          >
            <span
              style={{
                color: '#7B68EE',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              ✓
            </span>
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {feature}
            </span>
          </div>
        ))}

        {/* CTA button */}
        <a
          href="/waitlist"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'block',
            width: '100%',
            background: '#4C3D8F',
            color: '#FFFFFF',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '15px',
            padding: '14px',
            borderRadius: '12px',
            marginTop: '32px',
            border: 'none',
            cursor: 'pointer',
            opacity: hovered ? 0.85 : 1,
            transition: 'opacity 0.15s ease',
            textDecoration: 'none',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          get started
        </a>
        </motion.div>
      </div>
    </section>
  );
}
