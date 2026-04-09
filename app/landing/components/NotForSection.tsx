'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const accent = '#9B5DE5';

const identities = [
  { pre: 'the', bold: 'disciplined', post: 'entrepreneur.' },
  { pre: 'the', bold: 'consistent', post: 'athlete.' },
  { pre: 'the', bold: 'focused', post: 'student.' },
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
          <span style={{ color: '#ffffff' }}>you said you&apos;d.</span>
        </motion.h2>

        {/* Identities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px, 3vw, 28px)', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
          {identities.map(({ pre, bold, post }, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(22px, 4vw, 38px)',
                lineHeight: 1.2,
                color: 'rgba(255,255,255,0.45)',
                margin: 0,
                letterSpacing: 'clamp(-0.5px, -0.1vw, -1px)',
                textAlign: 'center',
              }}
            >
              {pre}{' '}
              <span style={{
                color: '#9B5DE5',
                fontWeight: 800,
                textShadow: '0 0 32px rgba(155,93,229,0.55)',
              }}>
                {bold}
              </span>{' '}
              {post}
            </motion.p>
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
