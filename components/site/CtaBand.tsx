import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImageSlot from "@/components/ui/ImageSlot";
import Reveal from "@/components/ui/Reveal";
import { closing } from "@/content/site";

export default function CtaBand() {
  return (
    <section aria-labelledby="closing-title" className="relative pt-[72px] md:pt-[120px]">
      <Container className="relative z-10 text-center">
        <Reveal>
          <h2
            id="closing-title"
            className="font-display text-[clamp(36px,5.6vw,68px)] font-normal leading-[1.02] tracking-[-0.015em]"
          >
            {closing.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <Button href={closing.cta.href} className="mt-8">
            {closing.cta.label}
          </Button>
        </Reveal>
      </Container>

      {/* full bleed; on wider screens the open sky slides up behind the text */}
      <div className="relative z-0 mt-10 sm:-mt-[6vw]">
        <ImageSlot src={closing.image.src} alt={closing.image.alt} fallback="fade" />
      </div>
    </section>
  );
}
