'use client';
import { motion } from 'framer-motion';


const glowStyle = {
  color: '#7B68EE',
  fontWeight: 800,
} as const;

const glowAnim = {
  textShadow: ['0 0 0px #7B68EE', '0 0 10px rgba(123,104,238,0.6)', '0 0 0px #7B68EE'],
};

const glowTransition = {
  duration: 2.5,
  repeat: Infinity,
  ease: 'easeInOut' as const,
};


export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        background: '#07070F',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px) clamp(60px, 10vw, 96px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fade from previous section */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
        background: 'linear-gradient(to bottom, #07070F 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* Ambient background blobs */}
      <motion.div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            top: 100,
            left: -100,
            background: 'radial-gradient(circle, rgba(123,104,238,0.22) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            bottom: -100,
            right: -50,
            background: 'radial-gradient(circle, rgba(76,61,143,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      <style>{`
        .how-it-works-inner {
          flex-direction: column;
          align-items: center;
        }
        @media (min-width: 768px) {
          .how-it-works-inner {
            flex-direction: row;
            align-items: center;
          }
        }
      `}</style>

      <div
        className="how-it-works-inner"
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          gap: 'clamp(48px, 8vw, 80px)',
          position: 'relative',
          zIndex: 1,
        }}
      >

        {/* LEFT — text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              color: '#7B68EE',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              margin: '0 0 14px',
            }}
          >
            HOW IT WORKS
          </p>

          <h2
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              margin: '0 0 14px',
            }}
          >
            simple. just show up.
          </h2>

          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.4)',
              margin: '0 0 36px',
              lineHeight: 1.6,
            }}
          >
            three steps. that&apos;s all it takes.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              <>sign up. pick what you want to show up for.</>,
              <>every morning <motion.span style={glowStyle} animate={glowAnim} transition={glowTransition}>wrrapd</motion.span> texts you one question.</>,
              <>reply <motion.span style={glowStyle} animate={glowAnim} transition={glowTransition}>yes</motion.span> or no. first reply counts.</>,
              <>your points update. your <motion.span style={glowStyle} animate={glowAnim} transition={glowTransition}>rank</motion.span> moves.</>,
              <>miss a day, you drop. show up, you climb.</>,
              <>end of month your <motion.span style={glowStyle} animate={glowAnim} transition={glowTransition}>wrrapd</motion.span> drops.</>,
            ].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.1 }}
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(16px, 2vw, 22px)',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.5,
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT — Wrapped card */}
        <div style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Glow behind image — wide soft halo */}
            <div style={{
              position: 'absolute',
              inset: -60,
              borderRadius: 60,
              background: 'radial-gradient(circle, rgba(123,104,238,0.55) 0%, rgba(76,61,143,0.25) 45%, transparent 70%)',
              filter: 'blur(50px)',
              zIndex: 0,
              pointerEvents: 'none',
            }} />
            {/* Second tighter glow for intensity */}
            <div style={{
              position: 'absolute',
              inset: -20,
              borderRadius: 40,
              background: 'radial-gradient(circle, rgba(123,104,238,0.35) 0%, transparent 60%)',
              filter: 'blur(20px)',
              zIndex: 0,
              pointerEvents: 'none',
            }} />
            <img
              src="/wrrapd-card.png"
              alt="wrrapd monthly card"
              style={{
                width: '260px',
                borderRadius: '24px',
                display: 'block',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 40px 80px rgba(0,0,0,0.9), 0 0 80px rgba(123,104,238,0.45), 0 0 0 1px rgba(255,255,255,0.08)',
              }}
            />
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
