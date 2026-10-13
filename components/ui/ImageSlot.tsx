import Image, { getImageProps } from "next/image";
import { publicFileExists, pngSize } from "@/lib/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** Shown under 640px. If the file is missing, src is cropped with object-cover instead. */
  mobileSrc?: string;
  /** Where to focus the crop when src stands in for a missing mobileSrc. */
  mobileFocus?: string;
  /** What to render when src itself is missing. */
  fallback?: "fade" | "night" | "none";
  /** width: full width at natural height. cover: fill the parent box (the parent sets the size). */
  fit?: "width" | "cover";
  /** cover: under 640px the mobileSrc fills the parent's height, cropped from the bottom center. */
  mobileFit?: "width" | "cover";
  priority?: boolean;
  className?: string;
};

const SIZES = "100vw";

/**
 * A full width illustration. No border, radius or shadow so it blends into the page.
 * File existence and dimensions are checked on the server at build time.
 */
export default function ImageSlot({
  src,
  alt,
  mobileSrc,
  mobileFocus = "34% 50%",
  fallback = "none",
  fit = "width",
  mobileFit = "width",
  priority = false,
  className,
}: Props) {
  const size = publicFileExists(src) ? pngSize(src) : null;

  if (!size) {
    if (fallback === "night") {
      return <div aria-hidden="true" className={cn("h-full w-full bg-night", className)} />;
    }
    if (fallback === "fade") {
      return (
        <div
          aria-hidden="true"
          className={cn("h-[clamp(200px,28vw,380px)] w-full bg-gradient-to-b from-bg to-lavender/15", className)}
        />
      );
    }
    return null;
  }

  const loading = priority ? { priority: true } : { loading: "lazy" as const };

  if (fit === "cover") {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={SIZES}
        {...loading}
        className={cn("object-cover", className)}
        style={{ objectPosition: "center" }}
      />
    );
  }
  const mobileSize = mobileSrc && publicFileExists(mobileSrc) ? pngSize(mobileSrc) : null;

  // Art direction: a dedicated mobile file under 640px, the wide file above.
  if (mobileSrc && mobileSize) {
    const common = { alt, sizes: SIZES, ...loading };
    const { props: wide } = getImageProps({ ...common, src, ...size });
    const {
      props: { srcSet: narrowSet },
    } = getImageProps({ ...common, src: mobileSrc, ...mobileSize });
    return (
      <picture className={cn("block w-full", mobileFit === "cover" && "max-sm:h-full", className)}>
        <source media="(max-width: 639px)" srcSet={narrowSet} width={mobileSize.width} height={mobileSize.height} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through getImageProps */}
        <img
          {...wide}
          className={cn(
            "block h-auto w-full",
            mobileFit === "cover" && "max-sm:h-full max-sm:object-cover max-sm:object-[50%_100%]",
          )}
        />
      </picture>
    );
  }

  // No mobile file: crop the wide image to a taller frame under 640px.
  if (mobileSrc) {
    return (
      <div className={cn("relative w-full overflow-hidden max-sm:aspect-[5/4]", className)}>
        <Image
          src={src}
          alt={alt}
          {...size}
          sizes={SIZES}
          {...loading}
          className="block h-auto w-full max-sm:h-full max-sm:object-cover"
          style={{ objectPosition: mobileFocus }}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      {...size}
      sizes={SIZES}
      {...loading}
      className={cn("block h-auto w-full", className)}
    />
  );
}
