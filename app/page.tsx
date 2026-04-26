'use client';
import Hero from './landing/components/Hero';
import FAQ from './landing/components/FAQ';

export default function LandingPage() {
  return (
    <main className="landing-page" style={{ background: '#0A0814', minHeight: '100vh' }}>
      <Hero />
      <FAQ />
    </main>
  );
}
