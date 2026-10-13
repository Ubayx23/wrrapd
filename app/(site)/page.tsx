import Faq from "@/components/site/Faq";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import HowItWorks from "@/components/site/HowItWorks";
import Closing from "@/components/site/Closing";
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
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
