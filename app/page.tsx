export default function Home() {
  return (
    <main
      className="flex min-h-[100svh] items-center justify-center overflow-x-hidden bg-[#f7efbd] px-5"
      style={{
        backgroundImage:
          "linear-gradient(rgba(72,80,58,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(72,80,58,.13) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[clamp(3rem,14vw,7rem)] leading-none text-[#1e2a3f]">
        wrrapd.
      </h1>
    </main>
  );
}
