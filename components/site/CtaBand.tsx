import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImageSlot from "@/components/ui/ImageSlot";
import Reveal from "@/components/ui/Reveal";
import { closing } from "@/content/site";

export default function CtaBand() {
  return (
    <section aria-labelledby="closing-title" className="pt-[72px] md:pt-[120px]">
      {/* Below lg the text stacks above the image. From lg up the sky is tall enough to hold it, under the torn edge. */}
      <div className="relative flex flex-col lg:block">
        <div className="[mask-image:linear-gradient(to_bottom,#000_85%,transparent)]">
          <ImageSlot
            src={closing.image.src}
            alt={closing.image.alt}
            fallback="fade"
            className="max-sm:h-[240px] max-sm:object-cover"
          />
        </div>
        <Container className="order-first mb-10 text-center lg:absolute lg:inset-x-0 lg:top-[10%] lg:mb-0">
          <Reveal>
            <h2
              id="closing-title"
              className="font-display text-[clamp(36px,4.4vw,68px)] font-normal leading-[1.02] tracking-[-0.015em]"
            >
              {closing.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <Button href={closing.cta.href} className="mt-7">
              {closing.cta.label}
            </Button>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
