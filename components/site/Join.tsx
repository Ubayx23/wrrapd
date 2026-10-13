import Container from "@/components/ui/Container";
import ImageSlot from "@/components/ui/ImageSlot";
import Reveal from "@/components/ui/Reveal";
import JoinForm from "@/components/site/JoinForm";
import { join } from "@/content/site";

export default function Join() {
  return (
    <section id="join" aria-labelledby="join-title" className="relative isolate scroll-mt-24 pt-[72px] md:pt-[120px]">
      {/* The form sits above the painting; from sm up the painting's sky slides up under the end of it. */}
      <Container className="relative z-20 text-center">
        <Reveal className="mx-auto max-w-[46em]">
          <h2
            id="join-title"
            className="font-display text-[clamp(36px,4.4vw,68px)] font-normal leading-[1.02] tracking-[-0.015em]"
          >
            {join.heading}
          </h2>
          <p className="mt-4 text-[17px] leading-[1.6] text-ink-2 md:text-[18px]">{join.sub}</p>
          <JoinForm />
        </Reveal>
      </Container>
      <div className="relative z-0 mt-6 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_18%,#000_70%,transparent_100%)] sm:-mt-[6vw]">
        <ImageSlot
          src={join.image.src}
          alt={join.image.alt}
          fallback="fade"
          className="max-sm:h-[240px] max-sm:object-cover"
        />
      </div>
    </section>
  );
}
