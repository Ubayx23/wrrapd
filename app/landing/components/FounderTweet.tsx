'use client';
import { Tweet } from 'react-tweet';
import { GlowEffect } from '@/components/ui/glow-effect';

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
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 480,
        borderRadius: 16,
        colorScheme: 'light',
      }}>
        <GlowEffect
          colors={['#4C3D8F', '#7B68EE', '#2D2460', '#7B68EE']}
          mode='rotate'
          blur='strong'
          duration={4}
        />
        <div style={{ position: 'relative', zIndex: 1, borderRadius: 16, overflow: 'hidden' }}>
          <Tweet id="2033996418705461745" />
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: 'clamp(48px, 6vw, 64px)',
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
          built by a student for students.
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
