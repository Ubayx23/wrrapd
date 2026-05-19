'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const IDENTITIES = ['in shape', 'disciplined', 'consistent', 'focused'];

export default function PhoneMockup() {
  const [identityIdx, setIdentityIdx] = useState(0);
  const [response, setResponse] = useState<'iam' | 'iamnot'>('iam');

  useEffect(() => {
    const id = setInterval(() => {
      setIdentityIdx(i => (i + 1) % IDENTITIES.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

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
      <div style={{ position: 'absolute', top: '16%', left: '50%', transform: 'translateX(-50%)', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,104,238,0.28) 0%, transparent 72%)', filter: 'blur(74px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ marginBottom: '-180px', zIndex: 1, flexShrink: 0, width: 'min(300px, 88vw)' }}>
        <div style={{ width: '100%', borderRadius: 52, background: '#1A1A1A', border: '1.5px solid rgba(255,255,255,0.15)', padding: 10, boxSizing: 'border-box', boxShadow: '0 80px 160px rgba(0,0,0,0.9), 0 30px 60px rgba(123,104,238,0.25), 0 0 0 1px rgba(255,255,255,0.05)', position: 'relative' }}>
          <div style={{ position: 'absolute', left: -4, top: 100, width: 3, height: 28, background: '#333', borderRadius: 2 }} />
          <div style={{ position: 'absolute', left: -4, top: 138, width: 3, height: 28, background: '#333', borderRadius: 2 }} />
          <div style={{ position: 'absolute', right: -4, top: 120, width: 3, height: 44, background: '#333', borderRadius: 2 }} />

          <div style={{ borderRadius: 42, overflow: 'hidden', height: 560, background: '#F2F2F7', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: 50, flexShrink: 0 }}>
              <div style={{ width: 120, height: 32, borderRadius: 20, background: '#000', position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)' }} />
              <div style={{ position: 'absolute', top: 12, left: 16, right: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 13, fontWeight: 700, color: '#000' }}>9:41</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <svg width="15" height="10" viewBox="0 0 15 10" fill="none"><rect x="0" y="6" width="2" height="4" rx="0.4" fill="#000" /><rect x="3.3" y="4.5" width="2" height="5.5" rx="0.4" fill="#000" /><rect x="6.6" y="2.5" width="2" height="7.5" rx="0.4" fill="#000" /><rect x="9.9" y="0.5" width="2" height="9.5" rx="0.4" fill="#000" /></svg>
                <svg width="13" height="10" viewBox="0 0 13 10" fill="none"><path d="M6.5 7.3a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" fill="#000" /><path d="M3.1 5.2c1-.95 2.1-1.45 3.4-1.45s2.4.5 3.4 1.45" stroke="#000" strokeWidth="1.1" strokeLinecap="round" fill="none" /><path d="M1 2.4C2.6.9 4.4.1 6.5.1s3.9.8 5.5 2.3" stroke="#000" strokeWidth="1.1" strokeLinecap="round" fill="none" /></svg>
                <svg width="22" height="10" viewBox="0 0 22 10" fill="none"><rect x="0.5" y="0.5" width="18" height="9" rx="2.1" stroke="#000" /><rect x="2.2" y="2.1" width="12.5" height="5.8" rx="1" fill="#000" /><rect x="19.2" y="3.1" width="2.1" height="3.8" rx="0.9" fill="#000" /></svg>
                </div>
              </div>
            </div>

            <div style={{ padding: '4px 12px 8px', borderBottom: '0.5px solid rgba(0,0,0,0.12)', position: 'relative', minHeight: 50, flexShrink: 0 }}>
              <span style={{ color: '#0A84FF', fontSize: 24, lineHeight: 1, position: 'absolute', left: 12, top: 9 }}>&#8249;</span>
              <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ width: 34, height: 34, borderRadius: 17, background: '#7B68EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, fontWeight: 700, color: '#FFF' }}>W</span>
                </div>
                <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 11, fontWeight: 700, color: '#111', background: 'rgba(255,255,255,0.22)', border: '0.5px solid rgba(0,0,0,0.05)', borderRadius: 999, padding: '1px 7px', backdropFilter: 'blur(2px)' }}>wrrapd</span>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px 10px 0', overflow: 'hidden' }}>
              <div style={{ alignSelf: 'flex-start', maxWidth: '100%', whiteSpace: 'nowrap', background: '#E5E5EA', borderRadius: '18px 18px 5px 18px', padding: '8px 11px', fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 12, lineHeight: 1.4, color: '#111', marginBottom: 10 }}>
                are you someone who&apos;s{' '}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={IDENTITIES[identityIdx]}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    style={{ display: 'inline-block', fontWeight: 600, color: '#7B5CCC' }}
                  >
                    {IDENTITIES[identityIdx]}
                  </motion.span>
                </AnimatePresence>
                ?
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={response}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  style={{ alignSelf: 'flex-end', maxWidth: '60%', background: '#0A84FF', borderRadius: '18px 18px 5px 18px', padding: '9px 13px', fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 12.5, lineHeight: 1.25, color: '#FFF', marginBottom: 10 }}
                >
                  {response === 'iam' ? 'I am' : 'I am not'}
                </motion.div>
              </AnimatePresence>
              <div style={{ alignSelf: 'flex-start', maxWidth: '60%', background: '#E5E5EA', borderRadius: '18px 18px 5px 18px', padding: '9px 13px', fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 12.5, lineHeight: 1.25, color: '#111', marginBottom: 4 }}>
                noted.
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={response === 'iam' ? 'd1' : 'd0'}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  style={{ alignSelf: 'flex-start', maxWidth: '60%', background: '#E5E5EA', borderRadius: '18px 18px 18px 5px', padding: '9px 13px', fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 12.5, lineHeight: 1.25, color: '#111' }}
                >
                  {response === 'iam' ? '1 day in.' : 'day zero.'}
                </motion.div>
              </AnimatePresence>

              <div style={{ marginTop: 'auto', marginLeft: -10, marginRight: -10, background: 'linear-gradient(to bottom, rgba(242,242,247,0) 0%, rgba(242,242,247,1) 22%, rgba(236,236,241,1) 100%)', borderTop: '0.5px solid rgba(0,0,0,0.08)', padding: '10px 10px 14px' }}>
                <div style={{ background: '#FFF', border: '0.5px solid rgba(0,0,0,0.13)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 7, padding: '6px 10px', marginBottom: 10 }}>
                  <span style={{ color: '#8E8E93', fontSize: 17, lineHeight: 1 }}>+</span>
                  <span style={{ color: '#B3B3B8', fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif', fontSize: 14 }}>iMessage</span>
                  <span style={{ marginLeft: 'auto', color: '#8E8E93', fontSize: 15 }}>✎</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => setResponse('iam')}
                    style={{
                      height: 36,
                      borderRadius: 999,
                      background: response === 'iam' ? '#A87DF0' : '#FFF',
                      border: response === 'iam' ? 'none' : '1px solid rgba(0,0,0,0.12)',
                      color: response === 'iam' ? '#FFF' : '#5C5C66',
                      fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontSize: 13,
                      fontWeight: response === 'iam' ? 600 : 500,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      letterSpacing: '0.01em',
                      boxShadow: response === 'iam'
                        ? '0 1px 0 rgba(0,0,0,0.06), 0 4px 14px rgba(168,125,240,0.35)'
                        : '0 0.5px 0 rgba(0,0,0,0.08)',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease',
                    }}
                  >
                    I am
                  </button>
                  <button
                    type="button"
                    onClick={() => setResponse('iamnot')}
                    style={{
                      height: 36,
                      borderRadius: 999,
                      background: response === 'iamnot' ? '#A87DF0' : '#FFF',
                      border: response === 'iamnot' ? 'none' : '1px solid rgba(0,0,0,0.12)',
                      color: response === 'iamnot' ? '#FFF' : '#5C5C66',
                      fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontSize: 13,
                      fontWeight: response === 'iamnot' ? 600 : 500,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      letterSpacing: '0.01em',
                      boxShadow: response === 'iamnot'
                        ? '0 1px 0 rgba(0,0,0,0.06), 0 4px 14px rgba(168,125,240,0.35)'
                        : '0 0.5px 0 rgba(0,0,0,0.08)',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease',
                    }}
                  >
                    I am not
                  </button>
                </div>
              </div>
            </div>

            <div style={{ width: 118, height: 4, borderRadius: 4, background: '#000', margin: '8px auto', flexShrink: 0 }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
