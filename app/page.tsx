import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Intro from "@/components/landing/Intro";
import PaperMethod from "@/components/landing/PaperMethod";
import InkFilter from "@/components/ui/InkFilter";
import { introGateScript } from "@/lib/intro";

export default function Home() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
      <InkFilter />
      <Intro />
      <div id="landing" className="landing overflow-x-hidden">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-5">
          <Hero />
          <main>
            <HowItWorks />
            <PaperMethod />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
