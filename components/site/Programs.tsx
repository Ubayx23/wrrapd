import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { programs } from "@/content/site";

export default function Programs() {
  return (
    <section id="programs" aria-labelledby="programs-title" className="scroll-mt-6 pt-[72px] md:pt-[120px]">
      <Container>
        <Reveal>
          <SectionHeader id="programs-title" eyebrow={programs.eyebrow} heading={programs.heading} />
          <ol className="divide-y divide-line">
            {programs.items.map((item, i) => (
              <li
                key={item.title}
                className="group grid grid-cols-[44px_minmax(0,1fr)] items-baseline gap-x-4 py-6 sm:grid-cols-[88px_minmax(0,1fr)_auto] sm:gap-x-6 md:py-8"
              >
                <span className="font-display text-[clamp(28px,3.6vw,44px)] leading-none text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[clamp(26px,3vw,34px)] font-normal leading-[1.1] transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[46em] text-pretty text-[15.5px] leading-[1.55] text-ink-2 md:text-[16.5px]">
                    {item.description}
                  </p>
                </div>
                <span className="col-start-2 mt-4 justify-self-start whitespace-nowrap rounded-full border border-line px-3 py-1 text-[13px] text-ink-3 sm:col-start-3 sm:mt-0 sm:self-center">
                  {programs.status}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
