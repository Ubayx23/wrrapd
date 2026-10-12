import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { steps } from "@/content/site";

export default function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="scroll-mt-24 pt-[72px] md:pt-[120px]">
      <Container>
        <Reveal>
          <SectionHeader id="how-title" eyebrow={steps.eyebrow} heading={steps.heading} />
          <ol className="grid grid-cols-1 divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {steps.items.map((step, i) => (
              <li key={step.title} className="py-8 md:px-8 md:pb-2 md:pt-10 md:first:pl-0 md:last:pr-0">
                <span className="font-display text-[22px] leading-none text-ink-3">{i + 1}</span>
                <h3 className="mt-3 font-display text-[clamp(26px,2.6vw,30px)] font-normal leading-[1.1]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[28em] text-[15.5px] leading-[1.6] text-ink-2 md:text-[16px]">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
