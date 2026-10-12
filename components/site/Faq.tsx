import Accordion from "@/components/ui/Accordion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { faq } from "@/content/site";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-6 pt-[72px] md:pt-[120px]">
      <Container>
        <Reveal>
          <SectionHeader id="faq-title" eyebrow={faq.eyebrow} heading={faq.heading} />
          <div className="mx-auto mt-10 max-w-[640px] md:mt-14">
            <Accordion items={faq.items} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
