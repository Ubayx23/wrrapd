'use client';

export default function FounderTweet() {
  return (
    <section style={{
      background: '#07070F',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 'clamp(60px, 12vw, 100px) 24px 0',
      position: 'relative',
      zIndex: 1,
      width: '100%',
    }}>

      {/* V2 hint */}
      <p style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: 11,
        fontWeight: 400,
        color: 'rgba(255,255,255,0.18)',
        textAlign: 'center',
        margin: 0,
        letterSpacing: '0.02em',
      }}>
        rankings + squads coming soon
      </p>

      {/* Bottom tagline */}
      <div style={{
        textAlign: 'center',
        marginTop: 20,
        paddingBottom: 100,
      }}>
        <span style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontSize: 13,
          color: 'rgba(255,255,255,0.25)',
          display: 'block',
          marginBottom: 8,
        }}>
          built for doers.
        </span>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 700,
          fontSize: 14,
          color: 'rgba(255,255,255,0.15)',
          display: 'block',
        }}>
          wrrapd. 2026
        </span>
      </div>
    </section>
  );
}
