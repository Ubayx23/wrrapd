import type { CSSProperties } from "react";
import ImageSlot from "@/components/ui/ImageSlot";
import { closing } from "@/content/site";
import { pngSize } from "@/lib/image";

// Where the mountains begin, as a fraction of the painting's height. Everything above is paper and faint
// cloud, so the painting slides up under the end of the FAQ by that much, minus the section rhythm.
// That leaves the usual 72px (mobile) or 120px (md up) between the last question and the mountains.
// Re-measure if the illustration changes.
const MOUNTAINS = 0.59;
// Under 640px the painting is cropped to this height with object-cover, so its sky is a fixed size.
const MOBILE_HEIGHT = 240;

/** The painted landscape that closes the page. Decorative only; the footer slides up over its faded tail. */
export default function Closing() {
  const size = pngSize(closing.image.src);
  const ratio = size ? size.height / size.width : 768 / 2048;
  const style = {
    "--sky-mobile": `${Math.round(MOUNTAINS * MOBILE_HEIGHT)}px`,
    "--sky": `${(MOUNTAINS * ratio * 100).toFixed(2)}vw`,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      style={style}
      className="relative z-0 mt-[calc(72px-var(--sky-mobile))] sm:mt-[calc(72px-var(--sky))] md:mt-[calc(120px-var(--sky))]"
    >
      <div className="[mask-image:linear-gradient(to_bottom,transparent_0%,#000_18%,#000_70%,transparent_100%)]">
        <ImageSlot
          src={closing.image.src}
          alt={closing.image.alt}
          fallback="fade"
          className="max-sm:h-[240px] max-sm:object-cover"
        />
      </div>
    </div>
  );
}
