import CtaBand from "@/components/site/CtaBand";
import Faq from "@/components/site/Faq";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import HowItWorks from "@/components/site/HowItWorks";
import Knots from "@/components/site/Knots";
import Nav from "@/components/site/Nav";
import Note from "@/components/site/Note";
import Today from "@/components/site/Today";
import ImageSlot from "@/components/ui/ImageSlot";
import { today } from "@/content/site";

export default function Home() {
  return (
    <div id="top" className="overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <Knots />
        <Today background={<ImageSlot src={today.image.src} alt={today.image.alt} fit="cover" fallback="night" />} />
        <HowItWorks />
        <Note />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
