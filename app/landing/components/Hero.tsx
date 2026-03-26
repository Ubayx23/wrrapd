'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BeamsBackground } from './BeamsBackground';

export default function Hero() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const prev = {
      htmlStyle: document.documentElement.getAttribute('style') || '',
      bodyStyle: document.body.getAttribute('style') || '',
    };
    document.documentElement.style.cssText += ';height:auto!important;overflow:auto!important';
    document.body.style.cssText += ';overflow:auto!important;height:auto!important;min-height:100dvh!important;display:block!important;position:static!important';
    return () => {
      document.documentElement.setAttribute('style', prev.htmlStyle);
      document.body.setAttribute('style', prev.bodyStyle);
    };
  }, []);

  return (
    <>
      {/* ── FLOATING NAVBAR ── */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{
          position: 'fixed',
          bottom: 24,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'rgba(8, 6, 18, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 100,
          padding: '6px 6px 6px 20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(76,61,143,0.3)',
          pointerEvents: 'all',
          gap: 4,
        }}>
          {/* Logo */}
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 15,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.5px',
            marginRight: 12,
            flexShrink: 0,
          }}>
            wrrapd<span style={{ color: '#4C3D8F' }}>.</span>
          </span>

          {/* Divider — hidden on mobile */}
          <div className="nav-divider-hide-mobile" style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.1)', marginRight: 4, flexShrink: 0 }} />

          {/* Nav links — hidden on mobile */}
          {[['how it works', '#how-it-works'], ['pricing', '#pricing']].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="nav-link-hide-mobile"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 13,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.45)',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: 100,
                transition: 'color 0.15s',
                flexShrink: 0,
                display: 'inline-block',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              {label}
            </a>
          ))}

          {/* CTA */}
          <a
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#4C3D8F',
              color: '#ffffff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              padding: '9px 20px',
              borderRadius: 100,
              marginLeft: 4,
              flexShrink: 0,
              transition: 'opacity 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            get started
          </a>
        </div>
      </motion.nav>

      {/* ── HERO SECTION ── */}
      <section style={{
        position: 'relative',
        width: '100%',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <BeamsBackground>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 'clamp(60px, 12vw, 140px)',
            width: '100%',
          }}>

            {/* HEADLINE */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              style={{ textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 1 }}
            >
              <h1 style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(44px, 10vw, 96px)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: 'clamp(-1px, -0.5vw, -3px)',
                lineHeight: 1.05,
                margin: '0 0 20px',
              }}>
                stop <em style={{ fontStyle: 'italic', color: '#ffffff' }}>lying</em><br />
                to yourself<span style={{ color: '#4C3D8F' }}>.</span>
              </h1>
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(14px, 2vw, 17px)',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.38)',
                margin: '0 auto 48px',
                maxWidth: 340,
                lineHeight: 1.7,
              }}>
                one question. every day. no excuses.
              </p>
            </motion.div>

            {/* PHONE MOCKUP */}
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
              {/* Glow behind phone */}
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'clamp(240px, 60vw, 440px)',
                height: 'clamp(240px, 60vw, 440px)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(76,61,143,0.4) 0%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: 0,
              }} />

              {/* DaisyUI mockup-phone shell */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                style={{
                  marginBottom: '-300px',
                  zIndex: 1,
                  flexShrink: 0,
                  width: 'clamp(320px, 88vw, 420px)',
                  height: 'clamp(600px, 180vw, 780px)',
                }}
              >
                <div
                  className="mockup-phone"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderColor: '#2a2a2a',
                    boxShadow: '0 0 0 1px rgba(76,61,143,0.25), 0 40px 80px rgba(0,0,0,0.9), 0 0 100px rgba(76,61,143,0.25)',
                  }}
                >
                  {/* Camera notch (DaisyUI dynamic island) */}
                  <div className="mockup-phone-camera" />

                  {/* Screen */}
                  <div className="mockup-phone-display">
                    <div style={{ height: '100%', background: '#FFFFFF', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                      {/* Part 1 — Status bar */}
                      <div style={{
                        height: 44,
                        background: '#FFFFFF',
                        padding: '0 16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexShrink: 0,
                      }}>
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(10px, 3vw, 12px)', fontWeight: 600, color: '#000000' }}>9:41</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          {/* Signal bars */}
                          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="8" width="3" height="4" rx="0.5" fill="#000000"/>
                            <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" fill="#000000"/>
                            <rect x="9" y="3" width="3" height="9" rx="0.5" fill="#000000"/>
                            <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" fill="#000000"/>
                          </svg>
                          {/* WiFi icon */}
                          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 8.5C8.05228 8.5 8.5 8.94772 8.5 9.5C8.5 10.0523 8.05228 10.5 7.5 10.5C6.94772 10.5 6.5 10.0523 6.5 9.5C6.5 8.94772 6.94772 8.5 7.5 8.5Z" fill="#000000"/>
                            <path d="M4.5 6.5C5.5 5.5 6.43 5 7.5 5C8.57 5 9.5 5.5 10.5 6.5" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                            <path d="M2 4C3.5 2.5 5.4 1.5 7.5 1.5C9.6 1.5 11.5 2.5 13 4" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                          </svg>
                          {/* Battery icon */}
                          <svg width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#000000" strokeWidth="1"/>
                            <rect x="19" y="3.5" width="2" height="4" rx="1" fill="#000000"/>
                            <rect x="2" y="2" width="13" height="7" rx="1.5" fill="#000000"/>
                          </svg>
                        </div>
                      </div>

                      {/* Part 2 — Contact header */}
                      <div style={{
                        background: '#FFFFFF',
                        padding: '8px 12px',
                        borderBottom: '0.5px solid rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0,
                      }}>
                        {/* Left: chevron + avatar + name */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
                          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 300, color: '#007AFF', lineHeight: 1, marginTop: -2 }}>‹</span>
                          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#4C3D8F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 9, fontWeight: 700, color: '#ffffff' }}>w.</span>
                          </div>
                          <div>
                            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: '#000000', lineHeight: 1.2 }}>wrrapd</div>
                            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, color: '#8E8E93', lineHeight: 1.2 }}>daily check-in</div>
                          </div>
                        </div>
                        {/* Right: video + phone icons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="13" height="15" rx="2.5" stroke="#007AFF" strokeWidth="1.2"/>
                            <path d="M14 5.5L21 2V14L14 10.5V5.5Z" stroke="#007AFF" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
                          </svg>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 1C3 1 1 3 1 6C1 10.97 5.03 15 10 15C13 15 15 13 15 13L12.5 10.5C12.5 10.5 11.5 11 10.5 11C8.5 11 5 7.5 5 5.5C5 4.5 5.5 3.5 5.5 3.5L3 1Z" stroke="#007AFF" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
                          </svg>
                        </div>
                      </div>

                      {/* Part 3 — Message area */}
                      <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 6, overflow: 'hidden', background: '#FFFFFF' }}>
                        {/* Incoming bubble */}
                        <motion.div
                          initial={{ opacity: 0, x: -14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                        >
                          <div style={{ background: '#E9E9EB', borderRadius: '4px 18px 18px 18px', padding: '10px 14px', maxWidth: '75%', display: 'inline-block' }}>
                            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(10px, 3vw, 13px)', color: '#000000', lineHeight: 1.5, margin: 0 }}>
                              are you becoming who you said you want to become?
                            </p>
                          </div>
                          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, color: '#8E8E93', marginTop: 3, paddingLeft: 2 }}>8:00 AM</p>
                        </motion.div>

                        {/* Outgoing typing indicator — purple, right-aligned */}
                        <motion.div
                          initial={{ opacity: 0, x: 14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                          style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto', width: '100%' }}
                        >
                          <div style={{ background: '#4C3D8F', borderRadius: '18px 4px 18px 18px', padding: '10px 14px', display: 'flex', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
                            {[0, 1, 2].map(i => (
                              <motion.div
                                key={i}
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                                style={{ width: 5, height: 5, borderRadius: '50%', background: '#FFFFFF', flexShrink: 0 }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      {/* Part 4 — Input bar + keyboard */}
                      <div style={{ flexShrink: 0 }}>
                        {/* iMessage input bar */}
                        <div style={{
                          background: '#F2F2F7',
                          borderTop: '0.5px solid rgba(0,0,0,0.1)',
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}>
                          {/* Camera icon */}
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                            <rect x="1" y="4" width="16" height="12" rx="2.5" stroke="#8E8E93" strokeWidth="1.2"/>
                            <circle cx="9" cy="10" r="3" stroke="#8E8E93" strokeWidth="1.2"/>
                            <path d="M6.5 4L7.5 2H10.5L11.5 4" stroke="#8E8E93" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {/* Input field */}
                          <div style={{ flex: 1, background: '#FFFFFF', borderRadius: 20, padding: '6px 12px', border: '0.5px solid rgba(0,0,0,0.12)' }}>
                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(9px, 2.5vw, 12px)', color: 'rgba(0,0,0,0.25)' }}>iMessage</span>
                          </div>
                          {/* Mic icon */}
                          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                            <rect x="4" y="1" width="6" height="10" rx="3" stroke="#8E8E93" strokeWidth="1.2"/>
                            <path d="M1 9C1 12.31 3.69 15 7 15C10.31 15 13 12.31 13 9" stroke="#8E8E93" strokeWidth="1.2" strokeLinecap="round"/>
                            <line x1="7" y1="15" x2="7" y2="17" stroke="#8E8E93" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                        </div>

                        {/* Keyboard rows */}
                        <div style={{ background: '#D1D5DB', padding: '6px 4px' }}>
                          {[
                            ['Q','W','E','R','T','Y','U','I','O','P'],
                            ['A','S','D','F','G','H','J','K','L'],
                            ['⇧','Z','X','C','V','B','N','M','⌫'],
                            ['123','space','return'],
                          ].map((row, ri) => (
                            <div key={ri} style={{
                              display: 'flex',
                              justifyContent: 'center',
                              gap: 4,
                              marginBottom: ri < 3 ? 4 : 0,
                              paddingBottom: ri === 3 ? 4 : 0,
                            }}>
                              {row.map((key, ki) => (
                                <div key={ki} style={{
                                  flex: key === 'space' ? 4 : key === '123' || key === 'return' ? 1.4 : 1,
                                  height: ri === 3 ? 38 : 30,
                                  background: ['⇧','⌫','123','return'].includes(key) ? '#ADB5BD' : '#FFFFFF',
                                  borderRadius: 5,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: key === 'return' || key === '123' ? 'clamp(6px, 1.5vw, 8px)' : 'clamp(8px, 2vw, 11px)',
                                  fontFamily: 'Poppins, sans-serif',
                                  fontWeight: 500,
                                  color: '#000000',
                                  boxShadow: '0 1px 0 rgba(0,0,0,0.3)',
                                  minWidth: 0,
                                  userSelect: 'none',
                                }}>
                                  {key === 'space' ? '' : key}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div style={{
              position: 'relative',
              zIndex: 3,
              width: '100%',
              height: 'clamp(200px, 40vw, 280px)',
              background: 'linear-gradient(to bottom, transparent 0%, #07070F 60%)',
              pointerEvents: 'none',
              flexShrink: 0,
            }} />

          </div>
        </BeamsBackground>
      </section>
    </>
  );
}
