const STEPS = [
  {
    title: "learn",
    body: "Read a short lesson on one pattern. What it is, why it happens, how it shows up in you, and what to do.",
  },
  {
    title: "reflect on paper",
    body: "Every lesson ends with a prompt for your notebook. Your reflections never live here.",
  },
  {
    title: "notice",
    body: "Light up your map as you go and watch your patterns connect, from the outside, without judging them.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="scroll-mt-6 pt-24 md:pt-32">
      <h2
        id="how-title"
        className="font-display text-[clamp(40px,5.6vw,64px)] font-normal leading-none tracking-[-0.01em]"
      >
        How it works
      </h2>
      <ol className="mt-10 grid grid-cols-1 divide-y divide-dashed divide-ink/25 md:mt-14 md:grid-cols-3 md:divide-x md:divide-y-0">
        {STEPS.map((step, i) => (
          <li key={step.title} className="py-7 first:pt-0 last:pb-0 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0">
            <span className="block font-hand text-[34px] leading-none text-ink-2">{i + 1}</span>
            <h3 className="mt-2 font-display text-[30px] font-normal leading-[1.05]">{step.title}</h3>
            <p className="mt-3 max-w-[26em] text-[16.5px] leading-[1.6] text-ink-2">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
