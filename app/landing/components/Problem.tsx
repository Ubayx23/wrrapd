'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('./Globe'), { ssr: false });

const lines = [
  { text: 'i start strong then disappear.', color: 'rgba(255,255,255,0.25)', borderColor: 'rgba(76,61,143,0.25)', delay: 0 },
  { text: 'i have too many goals and finish none.', color: 'rgba(255,255,255,0.55)', borderColor: 'rgba(76,61,143,0.55)', delay: 0.15 },
  { text: "i know what i want. i just can't stay consistent.", color: 'rgba(255,255,255,0.92)', borderColor: '#4C3D8F', delay: 0.3 },
];

export default function Problem() {
  return (
    <section style={{
      background: '#07070F',
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(76,61,143,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Two column layout */}
        <div className="problem-grid">
          {/* LEFT — confession lines */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vw, 28px)', marginBottom: 64 }}>
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: line.delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  style={{ borderLeft: `2px solid ${line.borderColor}`, paddingLeft: 20 }}
                >
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 'clamp(20px, 3.5vw, 36px)',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    color: line.color,
                    letterSpacing: '-0.5px',
                    lineHeight: 1.2,
                    margin: 0,
                  }}>
                    &ldquo;{line.text}&rdquo;
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Closing statement */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.88)',
                letterSpacing: '-1px',
                lineHeight: 1.25,
                margin: '0 0 6px',
              }}>
                that&apos;s not a motivation problem.
              </p>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontWeight: 700,
                color: '#4C3D8F',
                letterSpacing: '-1px',
                lineHeight: 1.25,
                margin: 0,
              }}>
                that&apos;s an accountability problem.
              </p>
            </motion.div>
          </div>

          {/* RIGHT — Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              maxWidth: '280px',
              margin: '0 auto',
              width: '100%',
            }}
          >
            <Globe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
