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
                stop <em style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, #7B68EE 0%, #a78bfa 50%, #c4b5fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 0 24px rgba(123,104,238,0.55))',
                }}>lying</em><br />
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
                style={{ marginBottom: '-180px', zIndex: 1, flexShrink: 0 }}
              >
                <div
                  className="mockup-phone"
                  style={{
                    maxWidth: 'clamp(260px, 86vw, 340px)',
                    width: '100%',
                    borderColor: '#2a2a2a',
                    boxShadow: '0 0 0 1px rgba(76,61,143,0.25), 0 40px 80px rgba(0,0,0,0.9), 0 0 100px rgba(76,61,143,0.25)',
                  }}
                >
                  {/* Camera notch (DaisyUI dynamic island) */}
                  <div className="mockup-phone-camera" />

                  {/* Screen */}
                  <div className="mockup-phone-display">
                    <div style={{ height: '100%', background: '#FFFFFF', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                      {/* Status bar */}
                      <div style={{
                        paddingTop: '7%',
                        padding: '7% 14px 4px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexShrink: 0,
                        background: '#FFFFFF',
                      }}>
                        <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 15, fontWeight: 600, color: '#000000', letterSpacing: '-0.3px' }}>9:41</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {/* Signal bars */}
                          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                            <rect x="0" y="8" width="3" height="4" rx="0.5" fill="#000000" />
                            <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" fill="#000000" />
                            <rect x="9" y="3" width="3" height="9" rx="0.5" fill="#000000" />
                            <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#000000" />
                          </svg>
                          {/* WiFi */}
                          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                            <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill="#000000" />
                            <path d="M3.5 6.5C4.9 5.1 6.4 4.3 8 4.3s3.1.8 4.5 2.2" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                            <path d="M0.5 3.5C2.7 1.3 5.2 0 8 0s5.3 1.3 7.5 3.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                          </svg>
                          {/* Battery */}
                          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                            <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#000000" strokeWidth="1" />
                            <rect x="2" y="2" width="15" height="8" rx="1.5" fill="#000000" />
                            <path d="M22.5 4v4a2 2 0 0 0 0-4Z" fill="#000000" />
                          </svg>
                        </div>
                      </div>

                      {/* Contact header */}
                      <div style={{
                        padding: '4px 12px 8px',
                        borderBottom: '0.5px solid rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        flexShrink: 0,
                        background: '#FFFFFF',
                      }}>
                        {/* Back chevron */}
                        <span style={{ fontSize: 20, color: '#007AFF', lineHeight: 1, flexShrink: 0 }}>‹</span>
                        {/* Avatar */}
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#4C3D8F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 700, color: '#ffffff' }}>w</span>
                        </div>
                        {/* Name + status */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 14, fontWeight: 600, color: '#000000', lineHeight: 1.2 }}>wrrapd</div>
                          <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 11, color: '#8E8E93', lineHeight: 1.2 }}>active now</div>
                        </div>
                        {/* Action icons */}
                        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexShrink: 0 }}>
                          {/* Video camera */}
                          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                            <rect x="0" y="2" width="14" height="12" rx="2.5" fill="#007AFF" />
                            <path d="M14 5.5l6-3.5v12l-6-3.5V5.5Z" fill="#007AFF" />
                          </svg>
                          {/* Phone handset */}
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3.5 1C3.5 1 2 1 1.5 2.5c-.8 2.3.2 6 4.2 10S13.2 17.3 15.5 16.5c1.5-.5 1.5-2 1.5-2l-2.5-2.5c0 0-.8-.8-1.8-.2l-1.2.8c-.6.4-1.4.2-2-.4L6 9.1c-.6-.6-.8-1.4-.4-2l.8-1.2c.6-1 .2-1.8.2-1.8L4 1.5C3.7 1.2 3.5 1 3.5 1Z" fill="#007AFF" />
                          </svg>
                        </div>
                      </div>

                      {/* Messages */}
                      <div style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden', background: '#FFFFFF' }}>
                        {/* Incoming bubble */}
                        <motion.div
                          initial={{ opacity: 0, x: -14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.9 }}
                          style={{ maxWidth: '75%', alignSelf: 'flex-start' }}
                        >
                          <div style={{ background: '#E9E9EB', borderRadius: '18px 18px 18px 4px', padding: '10px 14px' }}>
                            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#000000', lineHeight: 1.5, margin: 0 }}>
                              are you becoming who you said you want to become?
                            </p>
                          </div>
                          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, color: 'rgba(0,0,0,0.28)', marginTop: 3, paddingLeft: 2 }}>8:00 AM</p>
                        </motion.div>

                        {/* Typing dots — outgoing (right side) */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                          style={{ alignSelf: 'flex-end' }}
                        >
                          <div style={{ background: '#007AFF', borderRadius: '18px 18px 4px 18px', padding: '10px 14px', width: 58, display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
                            {[0, 1, 2].map(i => (
                              <motion.div
                                key={i}
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
                                style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.85)' }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      {/* Keyboard + input */}
                      <div style={{ flexShrink: 0, background: '#D1D5DB' }}>
                        {/* iMessage input bar */}
                        <div style={{
                          padding: '8px 10px',
                          borderTop: '0.5px solid rgba(0,0,0,0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          background: '#FFFFFF',
                        }}>
                          {/* + button */}
                          <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#007AFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ color: '#ffffff', fontSize: 14, lineHeight: 1, fontWeight: 400, marginTop: '-1px' }}>+</span>
                          </div>
                          {/* Input pill */}
                          <div style={{ flex: 1, background: '#F2F2F7', borderRadius: 20, padding: '8px 14px', border: '0.5px solid rgba(0,0,0,0.1)' }}>
                            <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 12, color: '#8E8E93' }}>iMessage</span>
                          </div>
                          {/* Mic icon */}
                          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" style={{ flexShrink: 0 }}>
                            <rect x="4" y="0" width="8" height="12" rx="4" fill="#007AFF" />
                            <path d="M1 9c0 3.9 3.1 7 7 7s7-3.1 7-7" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                            <line x1="8" y1="16" x2="8" y2="19.5" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="5" y1="19.5" x2="11" y2="19.5" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>

                        {/* Keyboard rows */}
                        {[
                          ['Q','W','E','R','T','Y','U','I','O','P'],
                          ['A','S','D','F','G','H','J','K','L'],
                          ['⇧','Z','X','C','V','B','N','M','⌫'],
                          ['123','space','return'],
                        ].map((row, ri) => (
                          <div key={ri} style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: ri === 3 ? 4 : 3,
                            padding: ri === 1 ? '0 3px 0 6px' : ri === 2 ? '0 3px 0 3px' : ri === 3 ? '4px 3px 6px' : '3px 3px 0',
                          }}>
                            {row.map((key, ki) => (
                              <div key={ki} style={{
                                flex: key === 'space' ? 4 : key === '123' || key === 'return' ? 1.2 : 1,
                                height: ri === 3 ? 36 : 30,
                                background: ['⇧','⌫','123','return'].includes(key) ? '#ADB5BD' : '#ffffff',
                                borderRadius: 5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: `clamp(9px, 2vw, 11px)`,
                                fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                                fontWeight: ['⇧','⌫','123','return'].includes(key) ? 400 : 400,
                                color: '#000000',
                                boxShadow: '0 1px 0 rgba(0,0,0,0.3)',
                                minWidth: 0,
                              }}>
                                {key}
                              </div>
                            ))}
                          </div>
                        ))}
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
