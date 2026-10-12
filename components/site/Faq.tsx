import Accordion from "@/components/ui/Accordion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { faq } from "@/content/site";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 pt-[72px] md:pt-[120px]">
      <Container>
        <Reveal className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] md:gap-14">
          {/* left: stays in view while the questions scroll */}
          <div className="md:sticky md:top-28">
            <p className="text-[14px] font-medium text-lavender">{faq.eyebrow}</p>
            <h2
              id="faq-title"
              className="mt-3 font-display text-[clamp(32px,4.4vw,48px)] font-normal leading-[1.05] tracking-[-0.01em]"
            >
              {faq.heading}
            </h2>
            <p className="mt-6 max-w-[22em] text-[16px] leading-[1.6] text-ink-2">
              {faq.sideNote.text}{" "}
              <a
                href={faq.sideNote.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline decoration-ink-3 decoration-[1.5px] underline-offset-[4px] transition-colors duration-150 hover:decoration-ink"
              >
                {faq.sideNote.link.label}
              </a>
            </p>
          </div>

          <Accordion items={faq.items} />
        </Reveal>
      </Container>
    </section>
  );
}
