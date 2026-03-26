'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('./Globe'), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const GOALS = [
  { label: 'hit the gym', selected: true },
  { label: 'read daily', selected: false },
  { label: 'no phone before bed', selected: false },
  { label: 'drink water', selected: false },
];

const CARD_STYLE = {
  border: '1px solid rgba(123,104,238,0.15)',
  boxShadow: '0 0 0 1px rgba(76,61,143,0.08), 0 8px 32px rgba(0,0,0,0.5), 0 0 60px rgba(76,61,143,0.08)',
};

function CardLabel({ text }: { text: string }) {
  return (
    <p style={{
      fontFamily: 'Poppins, sans-serif',
      fontSize: 11,
      fontWeight: 500,
      color: '#7B68EE',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      margin: '0 0 10px',
    }}>
      {text}
    </p>
  );
}

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

        {/* ── Bento grid ── */}
        <div className="features-bento-grid">

          {/* ── CARD 1 — full width ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0, ease }}
            style={{
              ...CARD_STYLE,
              background: '#0D0F14',
              borderRadius: 20,
              minHeight: 280,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Top-right purple glow */}
            <div style={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 360,
              height: 360,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(76,61,143,0.35) 0%, transparent 65%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            <div className="features-card1-inner" style={{ height: '100%', position: 'relative', zIndex: 1 }}>
              {/* Left — copy */}
              <div style={{ padding: 36, flex: 1 }}>
                <CardLabel text="01 / set your goal" />
                <h3 style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 'clamp(22px, 3vw, 32px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.8px',
                  lineHeight: 1.2,
                  margin: '0 0 14px',
                }}>
                  tell us what's holding<br />you back.
                </h3>
                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 14,
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: 280,
                }}>
                  pick one thing. gym, sleep, studying, screen time. takes 2 minutes to set up.
                </p>
              </div>

              {/* Right — goal picker visual, bleeds to card edge */}
              <div className="features-card1-visual">
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '24px 0 24px 20px',
                  gap: 6,
                }}>
                  {GOALS.map(({ label, selected }) => (
                    <div key={label} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '13px 20px',
                      borderRadius: selected ? '10px 0 0 10px' : '8px 0 0 8px',
                      background: selected
                        ? 'linear-gradient(135deg, rgba(76,61,143,0.9) 0%, rgba(123,104,238,0.6) 100%)'
                        : 'rgba(255,255,255,0.04)',
                      border: selected
                        ? '1px solid rgba(123,104,238,0.5)'
                        : '1px solid rgba(255,255,255,0.07)',
                      borderRight: 'none',
                      boxShadow: selected
                        ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(76,61,143,0.4)'
                        : 'none',
                    }}>
                      <div style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: selected
                          ? 'rgba(255,255,255,0.15)'
                          : 'transparent',
                        border: selected
                          ? '1.5px solid rgba(255,255,255,0.4)'
                          : '1.5px solid rgba(255,255,255,0.15)',
                        boxShadow: selected ? '0 0 8px rgba(123,104,238,0.6)' : 'none',
                      }}>
                        {selected && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 3" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 13,
                        fontWeight: selected ? 600 : 400,
                        color: selected ? '#ffffff' : 'rgba(255,255,255,0.3)',
                        whiteSpace: 'nowrap',
                        letterSpacing: selected ? '0' : '-0.1px',
                      }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Bottom row ── */}
          <div className="features-bento-bottom">

            {/* ── CARD 2 — daily check-in ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              style={{
                ...CARD_STYLE,
                background: '#0D0F14',
                borderRadius: 20,
                overflow: 'hidden',
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }}
            >
              <div>
                <CardLabel text="02 / daily check-in" />
                <h3 style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 'clamp(20px, 2.5vw, 26px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.6px',
                  lineHeight: 1.2,
                  margin: '0 0 10px',
                }}>
                  we text you.<br />every single day.
                </h3>
                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  one question. yes or no. no app to open. no excuses.
                </p>
              </div>

              {/* SMS bubbles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* Incoming — question */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3, ease }}
                  style={{ alignSelf: 'flex-start', maxWidth: '80%' }}
                >
                  <div style={{
                    background: '#2C2C2E',
                    borderRadius: '4px 18px 18px 18px',
                    padding: '10px 16px',
                  }}>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#ffffff', lineHeight: 1.5, margin: 0 }}>
                      did you show up today?
                    </p>
                  </div>
                </motion.div>

                {/* Outgoing — yes */}
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5, ease }}
                  style={{ alignSelf: 'flex-end', maxWidth: '80%' }}
                >
                  <div style={{
                    background: '#4C3D8F',
                    borderRadius: '18px 4px 18px 18px',
                    padding: '10px 18px',
                  }}>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#ffffff', lineHeight: 1.5, margin: 0 }}>
                      yes
                    </p>
                  </div>
                </motion.div>

                {/* Incoming — streak reward */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.75, ease }}
                  style={{ alignSelf: 'flex-start', maxWidth: '88%' }}
                >
                  <div style={{
                    background: '#2C2C2E',
                    borderRadius: '4px 18px 18px 18px',
                    padding: '10px 16px',
                  }}>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#ffffff', lineHeight: 1.5, margin: 0 }}>
                      🔥 day 7 streak. keep going.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* ── CARD 3 — you are not alone ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              style={{
                ...CARD_STYLE,
                background: '#0D0F14',
                borderRadius: 20,
                overflow: 'hidden',
                padding: 32,
                paddingBottom: 0,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Globe glow */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '55%',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center bottom, rgba(76,61,143,0.45) 0%, rgba(76,61,143,0.15) 45%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
              }} />

              <div style={{ marginBottom: 20, position: 'relative', zIndex: 1 }}>
                <CardLabel text="03 / you are not alone" />
                <h3 style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 'clamp(20px, 2.5vw, 26px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.6px',
                  lineHeight: 1.2,
                  margin: '0 0 10px',
                }}>
                  millions are on<br />the same journey.
                </h3>
                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  wrrapd keeps everyone accountable. every single day.
                </p>
              </div>

              {/* Globe bleeding out bottom */}
              <div style={{
                flex: 1,
                marginBottom: -20,
                minHeight: 180,
                position: 'relative',
                zIndex: 1,
              }}>
                <Globe />
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
