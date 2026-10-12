import Link from "next/link";
import Button from "@/components/ui/Button";
import Highlight from "@/components/ui/Highlight";
import NeuronSketch from "./NeuronSketch";

export default function Hero() {
  return (
    <>
      <header className="flex items-center justify-between gap-4 py-5">
        <Link href="/" className="font-display text-[30px] leading-none tracking-[-0.01em] text-ink no-underline">
          wrrapd.
        </Link>
        <a
          href="#how"
          className="inline-flex min-h-[44px] items-center text-[15px] text-ink-2 no-underline hover:text-ink hover:underline hover:decoration-[1.5px] hover:underline-offset-4"
        >
          how it works
        </a>
      </header>

      <section
        aria-labelledby="hero-title"
        className="grid grid-cols-1 items-center gap-10 pb-6 pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-6 md:pt-14"
      >
        <div className="relative min-w-0 pl-[18px] sm:pl-7">
          <div data-margin-line aria-hidden="true" className="absolute -bottom-3 -top-3 left-0 w-[2px] bg-margin" />
          <p className="mb-1.5 font-hand text-[24px] leading-[1.1] text-ink-2">for the overthinkers</p>
          <h1
            id="hero-title"
            className="mb-[22px] font-display text-[clamp(52px,8.4vw,108px)] font-normal leading-[0.92] tracking-[-0.02em] [text-wrap:balance]"
          >
            Untangle your{" "}
            <Highlight color="orange" mode="load">
              mind
            </Highlight>
            .
          </h1>
          <p className="mb-7 max-w-[30em] text-[17px] leading-[1.55] text-ink-2 sm:text-[18px]">
            Short lessons on how your thoughts, urges and fears actually work. Read one, then take it to paper. Your
            notebook does the rest.
          </p>
          <Button href="#how">See how it works</Button>
        </div>

        <NeuronSketch />
      </section>
    </>
  );
}
