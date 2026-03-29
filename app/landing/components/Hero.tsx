'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BeamsBackground } from './BeamsBackground';

export default function Hero() {
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
      {/* FLOATING NAVBAR */}
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

          {/* Divider - hidden on mobile */}
          <div className="nav-divider-hide-mobile" style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.1)', marginRight: 4, flexShrink: 0 }} />

          {/* Nav links - hidden on mobile */}
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
            href="/waitlist"
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

      {/* HERO SECTION */}
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
                width: 440,
                height: 440,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(76,61,143,0.5) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                zIndex: 0,
              }} />

              {/* Floating animation wrapper */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                style={{ marginBottom: '-180px', zIndex: 1, flexShrink: 0 }}
              >
                {/* Centered phone container */}
                <div style={{ width: 320, margin: '0 auto' }}>

                  {/* Outer shell */}
                  <div style={{
                    position: 'relative',
                    background: '#1A1A1A',
                    borderRadius: 52,
                    padding: 12,
                    boxShadow: '0 80px 160px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.1), 0 30px 60px rgba(123,104,238,0.2)',
                  }}>

                    {/* Volume button top */}
                    <div style={{ position: 'absolute', left: -3, top: 120, width: 3, height: 28, background: '#2A2A2A', borderRadius: 2 }} />
                    {/* Volume button bottom */}
                    <div style={{ position: 'absolute', left: -3, top: 160, width: 3, height: 28, background: '#2A2A2A', borderRadius: 2 }} />
                    {/* Power button */}
                    <div style={{ position: 'absolute', right: -3, top: 140, width: 3, height: 44, background: '#2A2A2A', borderRadius: 2 }} />

                    {/* Screen */}
                    <div style={{
                      background: '#FFFFFF',
                      borderRadius: 42,
                      overflow: 'hidden',
                      height: 580,
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                    }}>

                      {/* Dynamic Island */}
                      <div style={{
                        width: 120,
                        height: 32,
                        background: '#000000',
                        borderRadius: 20,
                        margin: '12px auto 0',
                        flexShrink: 0,
                      }} />

                      {/* Status bar */}
                      <div style={{
                        padding: '8px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexShrink: 0,
                        background: '#FFFFFF',
                      }}>
                        <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 15, fontWeight: 600, color: '#000000', letterSpacing: '-0.3px' }}>9:41</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                            <rect x="0" y="8" width="3" height="4" rx="0.5" fill="#000000" />
                            <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" fill="#000000" />
                            <rect x="9" y="3" width="3" height="9" rx="0.5" fill="#000000" />
                            <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#000000" />
                          </svg>
                          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                            <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill="#000000" />
                            <path d="M3.5 6.5C4.9 5.1 6.4 4.3 8 4.3s3.1.8 4.5 2.2" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                            <path d="M0.5 3.5C2.7 1.3 5.2 0 8 0s5.3 1.3 7.5 3.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                          </svg>
                          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                            <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#000000" strokeWidth="1" />
                            <rect x="2" y="2" width="15" height="8" rx="1.5" fill="#000000" />
                            <path d="M22.5 4v4a2 2 0 0 0 0-4Z" fill="#000000" />
                          </svg>
                        </div>
                      </div>

                      {/* Contact header */}
                      <div style={{
                        padding: '6px 16px 10px',
                        borderBottom: '0.5px solid rgba(0,0,0,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0,
                        background: '#FFFFFF',
                        position: 'relative',
                      }}>
                        <span style={{ fontSize: 22, color: '#007AFF', lineHeight: 1, flexShrink: 0 }}>&#8249;</span>
                        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#4C3D8F', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(76,61,143,0.4)' }}>
                            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 700, color: '#ffffff' }}>W</span>
                          </div>
                          <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 12, fontWeight: 600, color: '#1a1a1a' }}>wrrapd</span>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                            <rect x="0" y="2" width="14" height="12" rx="2.5" fill="#007AFF" />
                            <path d="M14 5.5l6-3.5v12l-6-3.5V5.5Z" fill="#007AFF" />
                          </svg>
                        </div>
                      </div>

                      {/* Messages area */}
                      <div style={{
                        background: '#F5F5F5',
                        flex: 1,
                        padding: '12px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        overflowY: 'hidden',
                      }}>

                        {/* Incoming bubble 1 */}
                        <motion.div
                          initial={{ opacity: 0, x: -14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                          style={{ maxWidth: '75%', alignSelf: 'flex-start' }}
                        >
                          <div style={{ background: '#FFFFFF', borderRadius: 18, padding: '10px 14px', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                            <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 14, color: '#000000', lineHeight: 1.45, margin: 0 }}>
                              ok talk to me. did you show up today?
                            </p>
                          </div>
                          <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 10, color: 'rgba(0,0,0,0.3)', margin: '4px 0 0 4px' }}>8:00 AM</p>
                        </motion.div>

                        {/* Outgoing bubble */}
                        <motion.div
                          initial={{ opacity: 0, x: 14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                          style={{ maxWidth: '75%', alignSelf: 'flex-end' }}
                        >
                          <div style={{ background: '#007AFF', borderRadius: 18, padding: '10px 14px' }}>
                            <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 14, color: '#FFFFFF', lineHeight: 1.45, margin: 0 }}>
                              yes
                            </p>
                          </div>
                        </motion.div>

                        {/* Incoming bubble 2 */}
                        <motion.div
                          initial={{ opacity: 0, x: -14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                          style={{ maxWidth: '85%', alignSelf: 'flex-start' }}
                        >
                          <div style={{ background: '#FFFFFF', borderRadius: 18, padding: '10px 14px', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
                            <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 14, color: '#000000', lineHeight: 1.45, margin: 0 }}>
                              4/5 this week. thats better than last week. lowkey you&apos;re building something.
                            </p>
                          </div>
                        </motion.div>

                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Fade gradient at bottom */}
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
