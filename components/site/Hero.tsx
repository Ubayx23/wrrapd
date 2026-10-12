import type { CSSProperties } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ImageSlot from "@/components/ui/ImageSlot";
import Parallax from "@/components/ui/Parallax";
import { hero } from "@/content/site";
import { pngSize } from "@/lib/image";

// Where the mountains begin, as a fraction of each image's height (measured across the text column).
// The text block's bottom sits just above that line. Re-measure if the illustrations change.
const MOUNTAINS_DESKTOP = 0.42;
const MOUNTAINS_MOBILE = 0.4;
const GAP = 28;

/** Distance from the bottom of a full-width, bottom-anchored image to its mountain line, in vw. */
function mountainOffset(src: string, fraction: number, fallbackRatio: number) {
  const size = pngSize(src);
  const ratio = size ? size.height / size.width : fallbackRatio;
  return `calc(${((1 - fraction) * ratio * 100).toFixed(2)}vw + ${GAP}px)`;
}

export default function Hero() {
  const style = {
    "--pb-desktop": mountainOffset(hero.image.src, MOUNTAINS_DESKTOP, 831 / 1891),
    "--pb-mobile": mountainOffset(hero.image.mobileSrc, MOUNTAINS_MOBILE, 1402 / 1122),
  } as CSSProperties;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      style={style}
      className="relative isolate flex min-h-[640px] flex-col sm:min-h-[clamp(640px,92vh,980px)] justify-end overflow-hidden pb-[var(--pb-mobile)] pt-10 [mask-image:linear-gradient(to_bottom,#000_93%,transparent)] sm:pb-[var(--pb-desktop)]"
    >
      {/* Background: full bleed, pinned to the bottom. Its paper sky fades into the page above it. */}
      <Parallax className="absolute inset-x-0 bottom-0 -z-10">
        <div className="[mask-image:linear-gradient(to_bottom,transparent,#000_14%)]">
          <ImageSlot src={hero.image.src} mobileSrc={hero.image.mobileSrc} alt={hero.image.alt} priority />
        </div>
      </Parallax>

      <Container className="relative text-center">
        {/* a soft pool of page color behind the text only, for contrast over the clouds */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -inset-y-10 -z-10 bg-[radial-gradient(closest-side,rgba(245,238,226,0.85),rgba(245,238,226,0))]"
        />
        <h1
          id="hero-title"
          className="font-display text-[clamp(48px,8.4vw,104px)] font-normal leading-[0.96] tracking-[-0.02em]"
        >
          {hero.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <Button href={hero.cta.href} className="mt-9">
          {hero.cta.label}
        </Button>
      </Container>
    </section>
  );
}
