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
              onClick={(e) => {
                e.preventDefault();
                const id = href.replace('#', '');
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
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
                        padding: '6px 12px 10px',
                        borderBottom: '0.5px solid rgba(0,0,0,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0,
                        background: '#FFFFFF',
                        position: 'relative',
                      }}>
                        {/* Back chevron */}
                        <span style={{ fontSize: 20, color: '#007AFF', lineHeight: 1, flexShrink: 0 }}>‹</span>
                        {/* Center: avatar + name stacked */}
                        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#4C3D8F', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(76,61,143,0.35)' }}>
                            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700, color: '#ffffff' }}>W</span>
                          </div>
                          <span style={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                            fontSize: 11,
                            fontWeight: 600,
                            color: '#1a1a1a',
                            lineHeight: 1,
                            padding: '3px 10px',
                            borderRadius: 20,
                            background: 'rgba(255,255,255,0.65)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: '0.5px solid rgba(0,0,0,0.08)',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                            letterSpacing: '0.2px',
                          }}>wrrapd</span>
                        </div>
                        {/* FaceTime button — right */}
                        <div style={{ marginLeft: 'auto' }}>
                          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                            <rect x="0" y="2" width="14" height="12" rx="2.5" fill="#007AFF" />
                            <path d="M14 5.5l6-3.5v12l-6-3.5V5.5Z" fill="#007AFF" />
                          </svg>
                        </div>
                      </div>

                      {/* Messages */}
                      <div style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden', background: '#F2F2F7' }}>
                        {/* Incoming bubble */}
                        <motion.div
                          initial={{ opacity: 0, x: -14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.9 }}
                          style={{ maxWidth: '75%', alignSelf: 'flex-start' }}
                        >
                          <div style={{ background: '#E9E9EB', borderRadius: '18px 18px 18px 4px', padding: '10px 14px', boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
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
                      <div style={{ flexShrink: 0 }}>
                        {/* iMessage input bar */}
                        <div style={{
                          padding: '7px 10px',
                          borderTop: '0.5px solid rgba(0,0,0,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          background: '#F9F9F9',
                        }}>
                          {/* Input pill */}
                          <div style={{ flex: 1, background: '#ffffff', borderRadius: 20, padding: '7px 14px', border: '1px solid rgba(0,0,0,0.12)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)' }}>
                            <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 12, color: '#C0C0C6' }}>iMessage</span>
                          </div>
                          {/* Send button */}
                          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#007AFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 6px rgba(0,122,255,0.4)' }}>
                            <span style={{ color: '#ffffff', fontSize: 13, lineHeight: 1 }}>↑</span>
                          </div>
                        </div>

                        {/* Keyboard rows */}
                        <div style={{ background: '#CDD0D6', paddingTop: 4, paddingBottom: 6 }}>
                          {[
                            ['Q','W','E','R','T','Y','U','I','O','P'],
                            ['A','S','D','F','G','H','J','K','L'],
                            ['⇧','Z','X','C','V','B','N','M','⌫'],
                            ['123',' ','return'],
                          ].map((row, ri) => (
                            <div key={ri} style={{
                              display: 'flex',
                              justifyContent: 'center',
                              gap: 3,
                              padding: ri === 3 ? '3px 4px 2px' : '0 4px 3px',
                              marginLeft: ri === 1 ? 6 : ri === 2 ? 3 : 0,
                            }}>
                              {row.map((key, ki) => (
                                <div key={ki} style={{
                                  flex: key === ' ' ? 4 : key === '123' || key === 'return' ? 1.4 : 1,
                                  height: ri === 3 ? 34 : 28,
                                  background: ['⇧','⌫','123','return'].includes(key) ? '#ADB5BD' : '#ffffff',
                                  borderRadius: 5,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: key === 'return' || key === '123' ? 8 : 10,
                                  fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                                  color: '#000000',
                                  boxShadow: '0 1px 0 1px rgba(0,0,0,0.25)',
                                  minWidth: 0,
                                }}>
                                  {key === ' ' ? '' : key}
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
