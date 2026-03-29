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
                you&apos;re doing more<br />than you think.<br />
                <span style={{ color: '#7B68EE' }}>you just don&apos;t see it.</span>
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
                one text a day. yes or no. that&apos;s it.
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
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(123,104,238,0.35) 0%, transparent 70%)',
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
                {/* Outer shell — iPhone 15 Pro */}
                <div style={{
                  position: 'relative',
                  width: 280,
                  margin: '0 auto',
                  background: '#1A1A1A',
                  borderRadius: 54,
                  padding: 12,
                  boxShadow: '0 80px 160px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.08), 0 30px 60px rgba(123,104,238,0.25)',
                }}>

                  {/* Volume button top */}
                  <div style={{ position: 'absolute', left: -3, top: 108, width: 3, height: 28, background: '#2A2A2A', borderRadius: 2 }} />
                  {/* Volume button bottom */}
                  <div style={{ position: 'absolute', left: -3, top: 146, width: 3, height: 28, background: '#2A2A2A', borderRadius: 2 }} />
                  {/* Power button */}
                  <div style={{ position: 'absolute', right: -3, top: 126, width: 3, height: 44, background: '#2A2A2A', borderRadius: 2 }} />

                  {/* Screen */}
                  <div style={{
                    background: '#FFFFFF',
                    borderRadius: 44,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>

                    {/* Dynamic Island */}
                    <div style={{
                      width: 110,
                      height: 30,
                      background: '#000000',
                      borderRadius: 20,
                      margin: '10px auto 0',
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
                      <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 13, fontWeight: 700, color: '#000000', letterSpacing: '-0.2px' }}>9:41</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        {/* Signal bars */}
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
                          <rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="#000000" />
                          <rect x="4" y="5" width="2.5" height="6" rx="0.5" fill="#000000" />
                          <rect x="8" y="2.5" width="2.5" height="8.5" rx="0.5" fill="#000000" />
                          <rect x="12" y="0" width="2.5" height="11" rx="0.5" fill="#000000" />
                        </svg>
                        {/* Wifi */}
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
                      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#4C3D8F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 700, color: '#ffffff' }}>W</span>
                        </div>
                        <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 11, fontWeight: 600, color: '#000000' }}>wrrapd</span>
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
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}>

                      {/* Incoming bubble 1 */}
                      <motion.div
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                        style={{ maxWidth: '72%', alignSelf: 'flex-start' }}
                      >
                        <div style={{ background: '#FFFFFF', borderRadius: 18, padding: '10px 14px' }}>
                          <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 15, color: '#000000', lineHeight: 1.4, margin: 0 }}>
                            ok talk to me. did you show up today?
                          </p>
                        </div>
                        <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 11, color: 'rgba(0,0,0,0.35)', margin: '4px 0 0 4px' }}>8:00 AM</p>
                      </motion.div>

                      {/* Outgoing bubble */}
                      <motion.div
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                        style={{ maxWidth: '72%', alignSelf: 'flex-end' }}
                      >
                        <div style={{ background: '#007AFF', borderRadius: 18, padding: '10px 14px' }}>
                          <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 15, color: '#FFFFFF', lineHeight: 1.4, margin: 0 }}>
                            yes
                          </p>
                        </div>
                      </motion.div>

                      {/* Incoming bubble 2 */}
                      <motion.div
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                        style={{ maxWidth: '72%', alignSelf: 'flex-start' }}
                      >
                        <div style={{ background: '#FFFFFF', borderRadius: 18, padding: '10px 14px' }}>
                          <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 15, color: '#000000', lineHeight: 1.4, margin: 0 }}>
                            4/5 this week. thats better than last week. lowkey you&apos;re building something.
                          </p>
                        </div>
                      </motion.div>

                    </div>

                    {/* Home indicator */}
                    <div style={{
                      background: '#FFFFFF',
                      padding: '6px 0 10px',
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
