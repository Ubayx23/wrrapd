'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const FAQS = [
  {
    q: 'how does the daily text work?',
    a: "you pick a time, we send you one SMS every day. answer or ignore — but it's there, waiting.",
  },
  {
    q: 'what is the wrapped card?',
    a: 'every month you get a summary of your streak, your wins, and your honest stats. like spotify wrapped but for your goals.',
  },
  {
    q: 'can I change my goal?',
    a: 'yes, once per month. goals need weight to matter.',
  },
  {
    q: 'how do I cancel?',
    a: 'text STOP or cancel from your account settings. no dark patterns, no guilt trip.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      style={{
        background: '#07070F',
        padding: `clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)`,
      }}
    >
      <h2
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(36px, 6vw, 56px)',
          color: '#FFFFFF',
          letterSpacing: '-2px',
          textAlign: 'center',
          marginBottom: 'clamp(40px, 6vw, 64px)',
          margin: `0 auto clamp(40px, 6vw, 64px) auto`,
        }}
      >
        questions.
      </h2>

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
