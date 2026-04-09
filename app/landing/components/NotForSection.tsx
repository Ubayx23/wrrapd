'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const accent = '#9B5DE5';

const cards = [
  'you had the plan. never the proof.',
  'you said tomorrow. tomorrow lied back.',
  'you knew who you wanted to be. you just never checked.',
];

export default function NotForSection() {
  return (
    <section
      id="how-it-works"
      style={{
        background: '#07070F',
        paddingTop: 'clamp(48px, 8vw, 96px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
        paddingLeft: 'clamp(24px, 6vw, 80px)',
        paddingRight: 'clamp(24px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center' }}>

        {/* Small italic line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease }}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(13px, 1.4vw, 15px)',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: 'clamp(20px, 3vw, 32px)',
            letterSpacing: '0.01em',
          }}
        >
          be honest.
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(28px, 5vw, 52px)',
            lineHeight: 1.1,
            letterSpacing: 'clamp(-1px, -0.3vw, -2px)',
            margin: '0 0 clamp(28px, 4vw, 44px)',
          }}
        >
          <span style={{ color: '#ffffff' }}>you said you&apos;d</span>
          <br />
          <span style={{ color: accent }}>become someone.</span>
        </motion.h2>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2vw, 16px)', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
          {cards.map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: 'clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 24px)',
                background: 'rgba(255,255,255,0.02)',
                textAlign: 'left',
              }}
            >
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(15px, 2vw, 20px)',
                lineHeight: 1.4,
                color: 'rgba(255,255,255,0.7)',
                margin: 0,
                letterSpacing: 'clamp(-0.3px, -0.05vw, -0.5px)',
              }}>
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(15px, 2vw, 20px)',
            lineHeight: 1.5,
            color: accent,
            margin: 0,
          }}
        >
          wrrapd is the mirror.
        </motion.p>

      </div>
    </section>
  );
}
