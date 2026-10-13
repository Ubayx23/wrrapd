"use client";

import { useActionState, useState } from "react";
import { joinList, type JoinState } from "@/app/(site)/actions";
import Button from "@/components/ui/Button";
import { interests, join } from "@/content/site";

const field =
  "min-h-[48px] w-full rounded-full border border-line bg-surface px-5 text-[16px] text-ink placeholder:text-ink-3 transition-colors duration-150 focus:border-ink-3";

export default function JoinForm() {
  const [state, action, pending] = useActionState<JoinState, FormData>(joinList, { status: "idle" });
  const [otherOpen, setOtherOpen] = useState(false);
  // After an error React resets the form, so the submitted values come back as its defaults.
  const picked = new Set(state.interests ?? []);

  return (
    <div aria-live="polite" className="mt-8">
      {state.status === "success" ? (
        <p className="font-display text-[clamp(24px,2.6vw,32px)] leading-[1.2] text-ink">{join.success}</p>
      ) : (
        <form action={action} noValidate className="relative">
          <fieldset>
            <legend className="mx-auto text-[15px] text-ink-2">{join.question}</legend>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {interests.map((item) => (
                <label key={item.value} className="relative">
                  <input
                    type="checkbox"
                    name="interests"
                    value={item.value}
                    defaultChecked={picked.has(item.value)}
                    onChange={item.value === "other" ? (e) => setOtherOpen(e.target.checked) : undefined}
                    className="peer sr-only"
                  />
                  <span className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-surface px-4 text-[15px] text-ink-2 transition-colors duration-150 hover:border-ink-3 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-surface peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-ink motion-reduce:transition-none">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
            {(otherOpen || picked.has("other")) && (
              <div className="mx-auto mt-4 max-w-[320px] text-left">
                <label htmlFor="join-other" className="block px-5 text-[14px] text-ink-2">
                  {join.otherLabel}
                </label>
                <input
                  id="join-other"
                  name="other"
                  type="text"
                  maxLength={join.otherMax}
                  defaultValue={state.other ?? ""}
                  className={`${field} mt-2`}
                />
              </div>
            )}
          </fieldset>

          {/* Honeypot: hidden from people and screen readers, so only bots fill it in. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>

          <div className="mx-auto mt-6 flex max-w-[480px] flex-col gap-3 sm:flex-row">
            <label htmlFor="join-email" className="sr-only">
              {join.emailLabel}
            </label>
            <input
              id="join-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder={join.emailPlaceholder}
              defaultValue={state.email ?? ""}
              aria-invalid={state.status === "error" || undefined}
              aria-describedby={state.status === "error" ? "join-error" : undefined}
              className={`${field} sm:flex-1`}
            />
            <Button type="submit" disabled={pending} className="min-h-[48px] shrink-0 disabled:opacity-70">
              {pending ? join.sending : join.submit}
            </Button>
          </div>
          <p className="mt-3 text-[13.5px] text-ink-3">{join.fine}</p>
          {state.status === "error" && (
            <p id="join-error" className="mt-3 text-[15px] text-ink">
              {join.error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
