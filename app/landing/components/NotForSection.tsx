'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const accent = '#9B5DE5';
const lineBase: React.CSSProperties = {
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: 400,
  fontSize: 'clamp(20px, 3.5vw, 32px)',
  lineHeight: 1.2,
  margin: 0,
  letterSpacing: 'clamp(-0.5px, -0.1vw, -1px)',
};

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
            marginBottom: 'clamp(32px, 5vw, 52px)',
            letterSpacing: '0.01em',
          }}
        >
          sound familiar.
        </motion.p>

        {/* Stacked text groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 4vw, 40px)' }}>

          {/* Group 1 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0, ease }}
            style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <p style={{ ...lineBase, color: 'rgba(255,255,255,0.9)' }}>
              you said tomorrow.
            </p>
            <p style={{ ...lineBase, color: accent }}>
              tomorrow came.
            </p>
            <p style={{ ...lineBase, color: 'rgba(255,255,255,0.38)' }}>
              you said it again.
            </p>
          </motion.div>

          {/* Group 2 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <p style={{ ...lineBase, color: 'rgba(255,255,255,0.88)' }}>
              <span style={{ color: accent }}>3am</span> you meant it.
            </p>
            <p style={{ ...lineBase, color: 'rgba(255,255,255,0.55)' }}>
              <span style={{ color: accent }}>9am</span> you forgot why.
            </p>
          </motion.div>

          {/* Group 3 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.2, ease }}
            style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <p style={{ ...lineBase, color: 'rgba(255,255,255,0.75)' }}>
              you planned everything.
            </p>
            <p style={{ ...lineBase, fontWeight: 700, color: accent }}>
              did nothing.
            </p>
          </motion.div>

        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          style={{ marginTop: 'clamp(36px, 5vw, 56px)' }}
        >
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            lineHeight: 1.5,
            margin: '0 0 clamp(12px, 2vw, 18px) 0',
            color: 'rgba(255,255,255,0.82)',
          }}>
            <span style={{ color: accent }}>wrrapd</span> doesn&apos;t motivate you.
          </p>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            lineHeight: 1.5,
            margin: 0,
            color: 'rgba(255,255,255,0.55)',
          }}>
            it shows you what{' '}
            <span style={{ color: accent }}>actually happened.</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
