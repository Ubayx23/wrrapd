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

// Mobile text block, top to button bottom: pt-7, a headline that always balances to 3 lines
// (its width is capped in em), the 19px line under it on 2 lines after mt-5, mt-9, then the 44px
// button. Keep in sync with the classes below.
const MOBILE_H1 = "clamp(36px,11.3vw,44px)";
const MOBILE_TEXT = `(28px + 3 * 0.96 * var(--h1-mobile) + 20px + 2 * 28.5px + 36px + 44px)`;
const MOBILE_GAP = 8;

/** Distance from the bottom of a full-width, bottom-anchored image to its mountain line, in vw. */
function mountainOffset(src: string, fraction: number, fallbackRatio: number, gap = GAP) {
  const size = pngSize(src);
  const ratio = size ? size.height / size.width : fallbackRatio;
  return `calc(${((1 - fraction) * ratio * 100).toFixed(2)}vw + ${gap}px)`;
}

/**
 * Mobile bottom padding. The image covers the whole section, so once the section is taller than the
 * image's natural height its mountain line sits at (1 - fraction) of the section height. Solving
 * pb = (1 - fraction) * (text + pb) + gap puts the button just above the mountains. Below that height
 * the image is width bound and the plain offset applies; max() picks whichever case holds.
 */
function mobilePadding(src: string) {
  const below = 1 - MOUNTAINS_MOBILE;
  const coverBound = `calc((${below} * ${MOBILE_TEXT} + ${MOBILE_GAP}px) / ${MOUNTAINS_MOBILE})`;
  return `max(${coverBound}, ${mountainOffset(src, MOUNTAINS_MOBILE, 1402 / 1122, MOBILE_GAP)})`;
}

export default function Hero() {
  const style = {
    "--pb-desktop": mountainOffset(hero.image.src, MOUNTAINS_DESKTOP, 831 / 1891),
    "--h1-mobile": MOBILE_H1,
    "--pb-mobile": mobilePadding(hero.image.mobileSrc),
  } as CSSProperties;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      style={style}
      className="relative isolate flex flex-col overflow-hidden pb-[var(--pb-mobile)] pt-7 [mask-image:linear-gradient(to_bottom,#000_93%,transparent)] sm:min-h-[clamp(640px,92vh,980px)] sm:justify-end sm:pb-[var(--pb-desktop)] sm:pt-10"
    >
      {/* Background: full bleed, pinned to the bottom. Its paper sky fades into the page above it.
          Under 640px it covers the whole section, so the sky sits behind the headline. */}
      <Parallax className="absolute inset-x-0 bottom-0 -z-10 max-sm:top-0">
        <div className="[mask-image:linear-gradient(to_bottom,transparent,#000_6%)] max-sm:h-full sm:[mask-image:linear-gradient(to_bottom,transparent,#000_14%)]">
          <ImageSlot
            src={hero.image.src}
            mobileSrc={hero.image.mobileSrc}
            alt={hero.image.alt}
            mobileFit="cover"
            priority
          />
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
          className="mx-auto max-w-[6.2em] font-display text-[length:var(--h1-mobile)] font-normal leading-[0.96] tracking-[-0.02em] max-sm:[text-wrap:balance] sm:max-w-none sm:text-[clamp(48px,8.4vw,104px)]"
        >
          {/* one balanced paragraph on mobile, a line per entry from sm up */}
          {hero.title.map((line, i) => (
            <span key={line} className="inline sm:block">
              {i > 0 && " "}
              {line}
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-5 max-w-[19em] text-[19px] leading-[1.5] text-ink-2 max-sm:[text-wrap:balance] sm:max-w-none">
          {hero.subtitle}
        </p>
        <Button href={hero.cta.href} className="mt-9">
          {hero.cta.label}
        </Button>
      </Container>
    </section>
  );
}
