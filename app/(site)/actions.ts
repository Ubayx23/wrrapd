"use server";

import { createClient } from "@supabase/supabase-js";
import { interests as knownInterests, join, type Interest } from "@/content/site";

/** On error the submitted values come back so the form can show them again after React resets it. */
export type JoinState = {
  status: "idle" | "success" | "error";
  email?: string;
  interests?: string[];
  other?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const KNOWN = new Set<string>(knownInterests.map((i) => i.value));

/**
 * Adds an email to the list, or updates the interests of one already on it.
 * The only writer of email_list. Runs on the server with the service role key, which never reaches the browser.
 */
export async function joinList(_prev: JoinState, form: FormData): Promise<JoinState> {
  // Honeypot: people never see this field, so anything in it is a bot. Look successful and drop it.
  if (String(form.get("company") ?? "").trim() !== "") return { status: "success" };

  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const picked = [...new Set(form.getAll("interests").map(String))].filter((v): v is Interest => KNOWN.has(v));
  const otherText = String(form.get("other") ?? "").trim().slice(0, join.otherMax);
  const other = picked.includes("other") && otherText ? otherText : null;
  const failed: JoinState = { status: "error", email: email.slice(0, 254), interests: picked, other: otherText };

  if (email.length > 254 || !EMAIL.test(email)) return failed;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("joinList: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing");
    return failed;
  }

  // Created per request, never at module level.
  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await supabase
    .from("email_list")
    .upsert({ email, interests: picked, other }, { onConflict: "email" });

  if (error) {
    console.error("joinList: insert failed", error.message);
    return failed;
  }
  return { status: "success" };
}
