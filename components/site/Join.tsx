import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImageSlot from "@/components/ui/ImageSlot";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { join } from "@/content/site";

export default function Join() {
  return (
    <section id="join" aria-labelledby="join-title" className="section-space relative isolate scroll-mt-24">
      {/* The invite sits above the painting; from sm up the painting's sky slides up under the end of it. */}
      <Container className="relative z-20 text-center">
        <Reveal className="mx-auto max-w-[46em]">
          <SectionHeader id="join-title" layout="center" heading={join.heading} intro={join.sub} />
          <Button href={join.cta.href} target="_blank" rel="noopener noreferrer" className="mt-8">
            {join.cta.label}
          </Button>
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
