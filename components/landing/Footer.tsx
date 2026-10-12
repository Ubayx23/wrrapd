import { UntangleAgain } from "./Intro";

export default function Footer() {
  return (
    <footer className="mt-28 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-dashed border-ink/25 pb-[calc(env(safe-area-inset-bottom,0px)+32px)] pt-6 text-[14px] text-ink-3 md:mt-36">
      <span className="font-display text-[24px] leading-none text-ink">wrrapd.</span>
      <span>Free. Built for one overthinker first.</span>
      <UntangleAgain />
    </footer>
  );
}
