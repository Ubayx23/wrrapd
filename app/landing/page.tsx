'use client';
import Hero from './components/Hero';
import FounderTweet from './components/FounderTweet';
import Problem from './components/Problem';
import HowItWorks from './components/HowItWorks';

export default function LandingPage() {
  return (
    <main className="landing-page" style={{ background: '#07070F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Hero />
      <FounderTweet />
      <Problem />
      <HowItWorks />
    </main>
  );
}
