'use client';
import Hero from './landing/components/Hero';
import NotForSection from './landing/components/NotForSection';
import HowItWorks from './landing/components/HowItWorks';
import WaitlistForm from './landing/components/WaitlistForm';
import FAQ from './landing/components/FAQ';
import FounderTweet from './landing/components/FounderTweet';

export default function LandingPage() {
  return (
    <main className="landing-page" style={{ background: '#07070F', minHeight: '100vh' }}>
      <Hero />
      <NotForSection />
      <HowItWorks />
      <WaitlistForm />
      <FAQ />
      <FounderTweet />
    </main>
  );
}
