'use client';
import { motion } from 'framer-motion';

export default function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {/* Purple glow behind phone */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 420,
        height: 420,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,104,238,0.4) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Floating wrapper */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
        style={{ marginBottom: '-180px', zIndex: 1, flexShrink: 0 }}
      >
        {/* Outer shell */}
        <div style={{
          position: 'relative',
          width: 300,
          margin: '0 auto',
          background: '#1A1A1A',
          borderRadius: 50,
          border: '1.5px solid rgba(255,255,255,0.15)',
          padding: 10,
          boxSizing: 'border-box' as const,
          boxShadow: '0 60px 120px rgba(0,0,0,0.9), 0 0 60px rgba(123,104,238,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
        }}>

          {/* Volume button top */}
          <div style={{ position: 'absolute', left: -3, top: 110, width: 3, height: 28, background: '#333', borderRadius: 2 }} />
          {/* Volume button bottom */}
          <div style={{ position: 'absolute', left: -3, top: 150, width: 3, height: 28, background: '#333', borderRadius: 2 }} />
          {/* Power button */}
          <div style={{ position: 'absolute', right: -3, top: 130, width: 3, height: 44, background: '#333', borderRadius: 2 }} />

          {/* Screen */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: 42,
            overflow: 'hidden',
            height: 560,
            display: 'flex',
            flexDirection: 'column',
          }}>

            {/* Dynamic Island */}
            <div style={{
              width: 110,
              height: 30,
              background: '#000000',
              borderRadius: 20,
              margin: '12px auto 0',
              flexShrink: 0,
            }} />

            {/* Status bar */}
            <div style={{
              padding: '6px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0,
              background: '#FFFFFF',
            }}>
              <span style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                fontSize: 13,
                fontWeight: 700,
                color: '#000000',
                letterSpacing: '-0.2px',
              }}>9:41</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                {/* Signal bars */}
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                  <rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="#000000" />
                  <rect x="4" y="5" width="2.5" height="6" rx="0.5" fill="#000000" />
                  <rect x="8" y="2.5" width="2.5" height="8.5" rx="0.5" fill="#000000" />
                  <rect x="12" y="0" width="2.5" height="11" rx="0.5" fill="#000000" />
                </svg>
                {/* WiFi */}
                <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                  <path d="M7.5 8.5a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Z" fill="#000000" />
                  <path d="M3.2 6C4.5 4.7 5.9 4 7.5 4s3 .7 4.3 2" stroke="#000000" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                  <path d="M0.5 3.2C2.5 1.2 4.9 0 7.5 0s5 1.2 7 3.2" stroke="#000000" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                </svg>
                {/* Battery */}
                <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                  <rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="#000000" strokeWidth="1" />
                  <rect x="2" y="2" width="13" height="7" rx="1" fill="#000000" />
                  <path d="M20 3.5v4a1.8 1.8 0 0 0 0-4Z" fill="#000000" />
                </svg>
              </div>
            </div>

            {/* Contact header */}
            <div style={{
              padding: '4px 14px 8px',
              borderBottom: '0.5px solid rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              background: '#FFFFFF',
              position: 'relative',
            }}>
              <span style={{ fontSize: 20, color: '#007AFF', lineHeight: 1, flexShrink: 0 }}>&#8249;</span>
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#4C3D8F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700, color: '#ffffff' }}>W</span>
                </div>
                <span style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#000000',
                }}>wrrapd</span>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                  <rect x="0" y="1.5" width="13" height="11" rx="2" fill="#007AFF" />
                  <path d="M13 4.5l5.5-3v11L13 9.5V4.5Z" fill="#007AFF" />
                </svg>
              </div>
            </div>

            {/* Messages area */}
            <div style={{
              background: '#F2F2F7',
              flex: 1,
              padding: '14px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              overflow: 'hidden',
            }}>

              {/* Incoming bubble 1 */}
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                style={{ maxWidth: '75%', alignSelf: 'flex-start' }}
              >
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '18px 18px 18px 4px',
                  padding: '10px 14px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                }}>
                  <p style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    fontSize: 14,
                    color: '#000000',
                    lineHeight: 1.4,
                    margin: 0,
                  }}>
                    ok talk to me. did you show up today?
                  </p>
                </div>
                <p style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontSize: 11,
                  color: 'rgba(0,0,0,0.35)',
                  margin: '4px 0 0 4px',
                }}>8:00 AM</p>
              </motion.div>

              {/* Outgoing bubble */}
              <motion.div
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                style={{ maxWidth: '40%', alignSelf: 'flex-end' }}
              >
                <div style={{
                  background: '#007AFF',
                  borderRadius: '18px 18px 4px 18px',
                  padding: '10px 14px',
                }}>
                  <p style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    fontSize: 14,
                    color: '#FFFFFF',
                    lineHeight: 1.4,
                    margin: 0,
                  }}>
                    yes
                  </p>
                </div>
              </motion.div>

              {/* Incoming bubble 2 */}
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                style={{ maxWidth: '80%', alignSelf: 'flex-start' }}
              >
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '18px 18px 18px 4px',
                  padding: '10px 14px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                }}>
                  <p style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    fontSize: 14,
                    color: '#000000',
                    lineHeight: 1.4,
                    margin: 0,
                  }}>
                    4/5 this week. thats better than last week. lowkey you&apos;re building something.
                  </p>
                </div>
              </motion.div>

            </div>

            {/* Home indicator */}
            <div style={{
              background: '#FFFFFF',
              padding: '8px 0 12px',
              display: 'flex',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{ width: 120, height: 4, background: '#000000', borderRadius: 4 }} />
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
