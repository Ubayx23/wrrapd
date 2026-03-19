'use client';
import { Tweet } from 'react-tweet';
import { GlowEffect } from '@/components/ui/glow-effect';

export default function FounderTweet() {
  return (
    <section style={{
      background: 'linear-gradient(to bottom, #07070F 0%, #ffffff 15%, #ffffff 85%, #07070F 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 'clamp(60px, 12vw, 100px) 24px',
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
    </section>
  );
}
