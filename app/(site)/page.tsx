import Faq from "@/components/site/Faq";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import HowItWorks from "@/components/site/HowItWorks";
import Join from "@/components/site/Join";
import Knots from "@/components/site/Knots";
import Nav from "@/components/site/Nav";

export default function Home() {
  return (
    <div id="top" className="overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Knots />
        <Faq />
        <Join />
      </main>
      <Footer />
    </div>
  );
}
