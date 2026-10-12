import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { journal } from "@/content/site";

export default function Journal() {
  return (
    <section id="journal" aria-labelledby="journal-title" className="scroll-mt-6 pt-[72px] md:pt-[120px]">
      <Container>
        <Reveal>
          <SectionHeader id="journal-title" eyebrow={journal.eyebrow} heading={journal.heading} />
          <ul className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
            {journal.items.map((item) => (
              <li key={item.title}>
                <article className="flex h-full min-h-[150px] flex-col md:min-h-[200px] justify-between gap-10 rounded-2xl border border-line bg-surface p-6">
                  <div className="flex items-center gap-3 text-[13px]">
                    <span className="rounded-full border border-lavender/30 px-2.5 py-0.5 text-lavender">
                      {journal.tag}
                    </span>
                    <span className="text-ink-3">{journal.readTime}</span>
                  </div>
                  <h3 className="font-display text-[clamp(26px,2.6vw,30px)] font-normal leading-[1.1]">{item.title}</h3>
                </article>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
