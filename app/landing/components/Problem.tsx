'use client';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Features() {
  return (
    <section id="how-it-works" style={{
      background: '#07070F',
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(30px, 4vw, 49px) clamp(24px, 6vw, 80px)',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* ── Section header ── */}
        <div style={{ textAlign: 'center', marginBottom: 48, position: 'relative' }}>

          {/* Radial glow behind headline */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(76,61,143,0.15)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          {/* Part 1 — Two-tier headline */}
          <div style={{ marginBottom: 24, position: 'relative', zIndex: 1 }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(15px, 2vw, 22px)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.32)',
                letterSpacing: '0.2px',
                margin: '0 0 6px',
              }}
            >
              it's not you.
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(36px, 6.5vw, 72px)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-2px',
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              nobody's holding you{' '}
              <span style={{
                color: '#7B68EE',
                textShadow: '0 0 40px rgba(123,104,238,0.7), 0 0 80px rgba(123,104,238,0.3)',
              }}>
                accountable.
              </span>
            </motion.h2>
          </div>

          {/* Part 2 — Tags with varying visual weight */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            justifyContent: 'center',
            marginBottom: 24,
            position: 'relative',
            zIndex: 1,
          }}>
            {[
              { label: 'skipped leg day again', delay: 0.4 },
              { label: 'said tomorrow',          delay: 0.6 },
              { label: 'missed the deadline',    delay: 0.8 },
              { label: 'hit snooze 4 times',     delay: 1.0 },
              { label: 'forgot to study',        delay: 1.2 },
            ].map(({ label, delay }) => (
              <motion.span
                key={label}
                className="feature-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22, delay }}
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.6)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: 100,
                  padding: '4px 10px',
                  display: 'inline-block',
                  cursor: 'default',
                }}
              >
                {label}
              </motion.span>
            ))}
          </div>

          {/* Part 3 — Closing copy, trimmed */}
          <div style={{ maxWidth: 420, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 15,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.38)',
                lineHeight: 1.75,
                margin: '0 0 10px',
              }}
            >
              humans need external pressure. a real reason to show up.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.65 }}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 22,
                fontWeight: 700,
                color: '#7B68EE',
                textShadow: '0 0 30px rgba(123,104,238,0.55)',
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              wrrapd is that reason.
            </motion.p>
          </div>

        </div>


      </div>

      {/* Fade into next section */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        background: 'linear-gradient(to top, #07070F 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
    </section>
  );
}
