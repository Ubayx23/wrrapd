'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const FAQS = [
  {
    q: 'how does the daily text work?',
    a: 'you pick a time, we text you one question. that\'s it.',
  },
  {
    q: 'what is the wrrapd card?',
    a: 'it shows your streak and your journey. like spotify wrapped, but for your goals.',
  },
  {
    q: 'can I change my goal?',
    a: 'yes, once a month. goals need weight to matter.',
  },
  {
    q: 'how do I cancel?',
    a: 'text STOP or cancel in settings. no guilt trip.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      style={{
        background: '#07070F',
        padding: `clamp(40px, 4.9vw, 59px) clamp(24px, 6vw, 80px)`,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <span
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: '11px',
            color: 'rgba(123,104,238,0.7)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px',
          }}
        >
          faq
        </span>
        <h2
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 56px)',
            color: '#FFFFFF',
            letterSpacing: '-2px',
            textAlign: 'center',
            margin: `0 0 clamp(40px, 6vw, 64px)`,
          }}
        >
          questions.
        </h2>
      </div>

      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {FAQS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                padding: '20px 0',
              }}
            >
              {/* Question row */}
              <div
                onClick={() => toggle(index)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: '15px',
                    color: isOpen ? '#7B68EE' : '#FFFFFF',
                    transition: 'color 0.2s ease',
                    paddingRight: '16px',
                  }}
                >
                  {item.q}
                </span>
                <span
                  style={{
                    color: '#7B68EE',
                    fontSize: '20px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400,
                    lineHeight: 1,
                    flexShrink: 0,
                    userSelect: 'none',
                  }}
                >
                  {isOpen ? '−' : '+'}
                </span>
              </div>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.7,
                        paddingTop: '12px',
                        margin: 0,
                      }}
                    >
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
