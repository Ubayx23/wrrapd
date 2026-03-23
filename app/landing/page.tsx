'use client';
import Hero from './components/Hero';
import Features from './components/Features';
import FounderTweet from './components/FounderTweet';

export default function LandingPage() {
  return (
    <main className="landing-page" style={{ background: '#07070F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Hero />
      <Features />
      <FounderTweet />
    </main>
  );
}
