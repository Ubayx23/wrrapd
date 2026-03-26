'use client';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FounderTweet from './components/FounderTweet';

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
