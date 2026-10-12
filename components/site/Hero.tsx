import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImageSlot from "@/components/ui/ImageSlot";
import { hero } from "@/content/site";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <Container className="relative z-10 pt-14 text-center md:pt-20">
        <h1
          id="hero-title"
          className="font-display text-[clamp(44px,7.2vw,88px)] font-normal leading-[0.98] tracking-[-0.02em]"
        >
          {hero.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-6 max-w-[34em] text-[17px] leading-[1.6] text-ink-2 md:text-[18px]">{hero.sub}</p>
        <Button href={hero.cta.href} className="mt-8">
          {hero.cta.label}
        </Button>
      </Container>

      {/* full bleed; pulled up so the text sits in the open sky. The sky scales with width, so the overlap does too. */}
      <div className="relative z-0 mt-10 [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_90%,transparent)] sm:-mt-[8vw]">
        <ImageSlot src={hero.image.src} mobileSrc={hero.image.mobileSrc} alt={hero.image.alt} priority />
      </div>
    </section>
  );
}
