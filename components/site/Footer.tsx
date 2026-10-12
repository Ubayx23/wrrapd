import Container from "@/components/ui/Container";
import { footer } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="grid grid-cols-1 gap-10 pb-10 pt-14 sm:grid-cols-[2fr_1fr_1fr] md:pt-16">
        <div>
          <p className="font-display text-[28px] leading-none">{footer.logo}</p>
          <p className="mt-4 max-w-[24em] text-[15px] leading-[1.6] text-ink-2">{footer.blurb}</p>
        </div>
        {footer.columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="text-[14px] font-medium text-ink">{col.heading}</h2>
            <ul className="mt-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-[15px] text-ink-2 no-underline hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="pb-[calc(env(safe-area-inset-bottom,0px)+24px)]">
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-line pt-6 text-[13.5px] text-ink-3">
          <span>{footer.bottom}</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </Container>
    </footer>
  );
}
