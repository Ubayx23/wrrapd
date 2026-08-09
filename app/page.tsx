'use client';
import Hero from './landing/components/Hero';
import WaitlistForm from './landing/components/WaitlistForm';
import FAQ from './landing/components/FAQ';

export default function LandingPage() {
  return (
    <main className="landing-page" style={{ background: '#0A0814', minHeight: '100vh' }}>
      <Hero />
      <WaitlistForm />
      <FAQ />
      <footer style={{
        background: '#0A0814',
        padding: 'clamp(40px, 8vw, 56px) clamp(24px, 6vw, 40px) 110px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        textAlign: 'center',
        boxSizing: 'border-box',
        width: '100%',
      }}>
        <div style={{
          maxWidth: 420,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <a href="/privacy" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(13px, 3vw, 14px)',
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(168,125,240,0.55)',
              textUnderlineOffset: 4,
              fontWeight: 500,
            }}>
              privacy policy
            </a>
            <a href="/terms" style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(13px, 3vw, 14px)',
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(168,125,240,0.55)',
              textUnderlineOffset: 4,
              fontWeight: 500,
            }}>
              terms
            </a>
          </div>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 800,
            fontSize: 13,
            color: 'rgba(255,255,255,0.28)',
            letterSpacing: '-0.5px',
          }}>
            wrrapd.
          </span>
        </div>
      </footer>
    </main>
  );
}
