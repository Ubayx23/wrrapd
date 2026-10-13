import Accordion from "@/components/ui/Accordion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { faq } from "@/content/site";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-space relative z-10 scroll-mt-24">
      <Container>
        <Reveal className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] md:gap-14">
          {/* left: stays in view while the questions scroll */}
          <SectionHeader
            id="faq-title"
            layout="stacked"
            eyebrow={faq.eyebrow}
            heading={faq.heading}
            className="md:sticky md:top-28"
            intro={
              <>
                {faq.sideNote.text}{" "}
                <a
                  href={faq.sideNote.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-ink-3 decoration-[1.5px] underline-offset-[4px] transition-colors duration-150 hover:decoration-ink"
                >
                  {faq.sideNote.link.label}
                </a>
              </>
            }
          />

          <Accordion items={faq.items} />
        </Reveal>
      </Container>
    </section>
  );
}
