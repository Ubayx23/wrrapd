"use client";

import { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { INTRO_KEY, REPLAY_EVENT } from "@/lib/intro";
import StrandKnot from "./StrandKnot";

const FADE_MS = 400;

type Stage = "off" | "knot" | "untangling" | "leaving";

function setLandingHidden(hidden: boolean) {
  const root = document.documentElement;
  if (hidden) root.setAttribute("data-intro", "");
  else root.removeAttribute("data-intro");
  document.getElementById("landing")?.toggleAttribute("inert", hidden);
}

export default function Intro() {
  const [stage, setStage] = useState<Stage>("off");

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-intro")) {
      setLandingHidden(true);
      setStage("knot");
    }
    const replay = () => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setLandingHidden(true);
      setStage("knot");
    };
    window.addEventListener(REPLAY_EVENT, replay);
    return () => window.removeEventListener(REPLAY_EVENT, replay);
  }, []);

  const finish = useCallback(() => {
    try {
      localStorage.setItem(INTRO_KEY, "1");
    } catch {}
    setStage("leaving");
    setLandingHidden(false);
    window.setTimeout(() => setStage("off"), FADE_MS);
  }, []);

  const getTarget = useCallback(
    () => document.querySelector("[data-margin-line]")?.getBoundingClientRect() ?? null,
    []
  );

  const start = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) finish();
    else setStage("untangling");
  };

  if (stage === "off") return null;
  const busy = stage !== "knot";

  return (
    <div
      className="paper-grid fixed inset-0 z-50 overflow-hidden transition-opacity ease-out"
      style={{ opacity: stage === "leaving" ? 0 : 1, transitionDuration: `${FADE_MS}ms` }}
    >
      <StrandKnot untangling={stage === "untangling"} getTarget={getTarget} onDone={finish} />

      <p
        className="pointer-events-none absolute left-5 top-6 -rotate-2 font-hand text-[26px] leading-none text-ink-2 transition-opacity duration-300 md:left-10 md:top-10 md:text-[30px]"
        style={{ opacity: busy ? 0 : 1 }}
      >
        this is your mind right now.
      </p>

      <div
        className="absolute inset-x-0 flex justify-center transition-opacity duration-300"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 40px)", opacity: busy ? 0 : 1 }}
      >
        <Button onClick={start} disabled={busy} className="min-w-[140px]">
          untangle
        </Button>
      </div>
    </div>
  );
}

export function UntangleAgain() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(REPLAY_EVENT))}
      className="inline-flex min-h-[44px] items-center text-ink-2 underline decoration-ink-3 decoration-[1.5px] underline-offset-[5px] hover:text-ink hover:decoration-ink"
    >
      untangle again
    </button>
  );
}
