'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const bullets = [
  'one text. every day. no reminders.',
  'yes or no. first reply counts.',
  'end of month, your wrrapd drops.',
];

export default function Pricing() {
  const [hovered, setHovered] = useState(false);

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
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          top: '50%',
          left: '0',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, rgba(155,93,229,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 420, margin: '0 auto' }}>
        {/* Headline above card */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(13px, 2.5vw, 15px)',
            color: 'rgba(255,255,255,0.35)',
            margin: '0 0 20px',
            lineHeight: 1.5,
          }}
        >
          the cost of excuses is higher.
        </motion.p>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(155,93,229,0.2)',
            borderRadius: 20,
            padding: 'clamp(28px, 5vw, 40px)',
            boxSizing: 'border-box',
          }}
        >
          {/* Strikethrough price */}
          <div style={{ marginBottom: 4 }}>
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(13px, 2.5vw, 15px)',
                color: 'rgba(255,255,255,0.25)',
                textDecoration: 'line-through',
                fontWeight: 400,
              }}
            >
              $9.99/mo
            </span>
          </div>

          {/* FREE */}
          <div
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(64px, 16vw, 96px)',
              color: '#FFFFFF',
              letterSpacing: '-4px',
              lineHeight: 1,
              margin: '4px 0 10px',
            }}
          >
            FREE
          </div>

          {/* Subtext */}
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(11px, 2vw, 13px)',
              color: 'rgba(255,255,255,0.28)',
              margin: '0 0 28px',
              lineHeight: 1.5,
            }}
          >
            for 30 days. then $9.99/month.
          </p>

          {/* Divider */}
          <div
            style={{
              width: '100%',
              height: 1,
              background: 'rgba(255,255,255,0.07)',
              marginBottom: 24,
            }}
          />

          {/* Bullets */}
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {bullets.map((b) => (
              <li
                key={b}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 1,
                    background: 'rgba(255,255,255,0.2)',
                    flexShrink: 0,
                    display: 'inline-block',
                  }}
                />
                {b}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="/onboard"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: 'block',
              width: '100%',
              background: hovered ? '#9B5DE5' : 'transparent',
              color: hovered ? '#ffffff' : '#9B5DE5',
              border: '1px solid #9B5DE5',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(13px, 2.5vw, 14px)',
              textDecoration: 'none',
              textAlign: 'center',
              padding: '13px 24px',
              borderRadius: 10,
              boxSizing: 'border-box',
              transition: 'background 0.15s, color 0.15s',
              letterSpacing: '0.01em',
            }}
          >
            start free trial
          </a>
        </motion.div>
      </div>
    </section>
  );
}
