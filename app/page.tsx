'use client';
import Hero from './landing/components/Hero';
import Features from './landing/components/Features';
import Pricing from './landing/components/Pricing';
import FAQ from './landing/components/FAQ';
import FounderTweet from './landing/components/FounderTweet';

export default function LandingPage() {
  return (
    <main className="landing-page" style={{ background: '#07070F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <FounderTweet />
    </main>
  );
}
