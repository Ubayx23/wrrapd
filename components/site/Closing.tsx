import ImageSlot from "@/components/ui/ImageSlot";
import { closing } from "@/content/site";

/** The painted landscape that closes the page. Decorative only; the footer slides up over its faded tail. */
export default function Closing() {
  return (
    <div aria-hidden="true" className="section-space relative z-0">
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
