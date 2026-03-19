'use client';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        background: '#07070F',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 clamp(24px, 6vw, 80px) clamp(40px, 6vw, 80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Lamp effect */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 360, pointerEvents: 'none', zIndex: 0 }}>
        <motion.div
          initial={{ width: '3rem', opacity: 0 }}
          whileInView={{ width: '16rem', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            height: 2,
            background: 'linear-gradient(to right, transparent, rgba(180,160,255,0.9) 40%, #ffffff 50%, rgba(180,160,255,0.9) 60%, transparent)',
            boxShadow: '0 0 12px 3px rgba(180,160,255,0.6), 0 0 30px 8px rgba(123,104,238,0.4)',
            borderRadius: 2,
          }}
        />
        <div style={{ position: 'absolute', top: 0, left: '50%', width: 0, height: 0 }}>
          <motion.div
            initial={{ opacity: 0, scaleX: 0.1 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 1, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: 0, left: -160, width: 320, height: 340,
              background: 'linear-gradient(to bottom, rgba(100,80,200,0.22) 0%, rgba(76,61,143,0.08) 60%, transparent 100%)',
              clipPath: 'polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)',
              transformOrigin: 'top center',
            }}
          />
        </div>
        <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', width: 180, height: 90, borderRadius: '50%', background: 'rgba(120,100,220,0.35)', filter: 'blur(28px)' }} />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 280, height: 60, borderRadius: '50%', background: 'rgba(76,61,143,0.18)', filter: 'blur(20px)' }}
        />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ textAlign: 'center', marginBottom: 0, position: 'relative', zIndex: 1, paddingTop: 'clamp(28px, 4vw, 44px)' }}
      >
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 14px' }}>
          how it works
        </p>
        <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800, color: '#F8F8FF', letterSpacing: '-2.5px', lineHeight: 1.05, margin: 0, textShadow: '0 0 40px rgba(255,255,255,0.15)' }}>
          less saying<span style={{ color: '#4C3D8F' }}>.</span><br />
          more doing<span style={{ color: '#4C3D8F' }}>.</span>
        </h2>
      </motion.div>
    </section>
  );
}
