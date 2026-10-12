import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Signature from "@/components/ui/Signature";
import { note } from "@/content/site";

export default function Note() {
  return (
    <section aria-labelledby="note-title" className="pt-[72px] md:pt-[120px]">
      <Container>
        <Reveal className="mx-auto max-w-[34em]">
          <h2 id="note-title" className="text-[14px] font-medium text-lavender">
            {note.eyebrow}
          </h2>
          <div className="mt-6 space-y-5 text-[19px] leading-[1.7] text-ink">
            {note.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-10">
            <Signature name={note.signature} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
