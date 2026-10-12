import CtaBand from "@/components/site/CtaBand";
import Faq from "@/components/site/Faq";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import HowItWorks from "@/components/site/HowItWorks";
import Journal from "@/components/site/Journal";
import Nav from "@/components/site/Nav";
import PaperMethod from "@/components/site/PaperMethod";
import Programs from "@/components/site/Programs";

export default function Home() {
  return (
    <div id="top" className="overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Programs />
        <HowItWorks />
        <PaperMethod />
        <Faq />
        <Journal />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
