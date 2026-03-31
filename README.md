# wrrapd

Landing + waitlist for an SMS-first student accountability product.

## Current Product Focus

- Public landing page at `/`
- Separate waitlist page at `/waitlist`
- Waitlist collects **phone number only** (no email)
- Current priority: finish and ship landing/waitlist to validate demand
- Backend product features (verification, messaging, streak logic) are intentionally deferred

## Routes

- `/` -> main public landing page (canonical)
- `/landing` -> redirects to `/` (legacy route)
- `/waitlist` -> separate waitlist signup page
- `/dashboard` -> prototype UI only (not wired to backend)

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase JS client (used for waitlist inserts)

## Environment Variables

The waitlist form writes to Supabase and requires:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Create a `.env.local` file with those values before running locally.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Current Scope Guardrails

- Do not merge waitlist into landing; keep `/waitlist` separate.
- Do not add email to waitlist yet.
- Do not build backend product tables/routes yet.
- Do not wire dashboard to Supabase yet.
