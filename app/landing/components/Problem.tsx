'use client';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CHIPS = [
  { label: 'skipped leg day again', delay: 0.05 },
  { label: 'said "tomorrow"', delay: 0.1 },
  { label: 'missed the deadline', delay: 0.15 },
  { label: 'hit snooze 4 times', delay: 0.08 },
  { label: 'forgot to study', delay: 0.12 },
  { label: 'broke the streak', delay: 0.18 },
];

export default function Problem() {
  return (
    <section style={{
      background: '#07070F',
      position: 'relative',
      padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 700, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(32px, 4vw, 48px)' }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 11,
            fontWeight: 600,
            color: 'rgba(123,104,238,0.7)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          the real problem
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.05, ease }}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 800,
            color: '#F8F8FF',
            letterSpacing: '-2.5px',
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          it's not you.<br />
          nobody's holding<br />
          you accountable<span style={{ color: '#4C3D8F' }}>.</span>
        </motion.h2>

        {/* Chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'center',
            maxWidth: 560,
          }}
        >
          {CHIPS.map(({ label, delay }) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay, ease }}
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 12,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.35)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 100,
                padding: '7px 16px',
                letterSpacing: '0.1px',
              }}
            >
              {label}
            </motion.span>
          ))}
        </motion.div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.38)',
            lineHeight: 1.75,
            margin: 0,
            maxWidth: 440,
          }}
        >
          willpower alone doesn't work. humans need external pressure. a real consequence for slipping. a real reason to show up. wrrapd is that reason.
        </motion.p>

      </div>
    </section>
  );
}
