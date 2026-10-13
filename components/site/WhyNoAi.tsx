import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { why } from "@/content/site";

export default function WhyNoAi() {
  return (
    <section id="why" aria-labelledby="why-title" className="scroll-mt-24 pt-[72px] md:pt-[120px]">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[40em] text-center">
            <p className="text-[14px] font-medium text-lavender">{why.eyebrow}</p>
            <h2
              id="why-title"
              className="mt-3 font-display text-[clamp(32px,4.4vw,48px)] font-normal leading-[1.05] tracking-[-0.01em]"
            >
              {why.heading}
            </h2>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-2 md:text-[18px]">{why.body}</p>
            <p className="mx-auto mt-5 max-w-[34em] text-[14.5px] leading-[1.6] text-ink-3">{why.research}</p>
          </div>

          {/* them, then us. A hairline between rows, no cards. */}
          <ul className="mt-12 border-y border-line md:mt-16">
            {why.rows.map((row) => (
              <li
                key={row.us}
                className="grid grid-cols-1 gap-1 border-b border-line py-6 last:border-b-0 sm:grid-cols-2 sm:gap-8 md:py-7"
              >
                <p className="font-display text-[clamp(22px,2.4vw,28px)] leading-[1.2] text-ink-3">{row.them}</p>
                <p className="font-display text-[clamp(22px,2.4vw,28px)] leading-[1.2] text-ink">{row.us}</p>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-12 text-balance text-center font-display text-[clamp(32px,4.6vw,52px)] italic leading-[1.1] tracking-[-0.01em] md:mt-16">
            {why.closing.map((line, i) => (
              <span key={line} className="sm:block">
                {i > 0 && " "}
                {line}
              </span>
            ))}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
