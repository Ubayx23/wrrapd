# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build (also runs type checking)
npm run lint     # ESLint
npx tsc --noEmit # Type-check without building
```

## Architecture

**Next.js 15 App Router** project. Two active routes:

- `/` — `app/page.tsx`: Original "coming soon" page. Flashlight/cursor-tracking overlay via CSS custom properties (`--mouse-x`, `--mouse-y`). Supabase waitlist form (`components/ui/waitlist.tsx`). Global CSS locks scroll for this page only.
- `/landing` — `app/landing/page.tsx`: Full marketing landing page. Sections: Hero → FounderTweet → Features → Pricing → FAQ → FinalCTA.
- `/dashboard` — `app/dashboard/page.tsx`: WIP, not built out.

## Landing Page (`/landing`) Structure

Each section is a separate component in `app/landing/components/`.

**Rule: inline styles only inside all landing components. No Tailwind classes inside components except DaisyUI utilities (mockup-phone) and CSS classNames for media queries defined in globals.css.**

Active components:
- `BeamsBackground.tsx` — Canvas animated beam effect. Named export. Wraps children. Canvas is position absolute.
- `Hero.tsx` — Floating bottom pill navbar (fixed, zIndex 1000) + hero section with DaisyUI mockup-phone. useEffect overrides globals.css scroll-lock via document.body/documentElement.style.cssText.
- `FounderTweet.tsx` — Tweet embed via react-tweet with GlowEffect border. Light mode via colorScheme: light on wrapper.
- `Features.tsx` — Combined problem + how it works section. Lamp effect header. Three big numbered moments (01, 02, 03) stacked vertically. Globe lives in moment 03 via dynamic import ssr: false.
- `Globe.tsx` — Interactive COBE 3D globe. Dark purple theme. Must always be dynamically imported with ssr: false.
- `GlowEffect` — at components/ui/glow-effect.tsx.

Deleted components (do not recreate):
- Problem.tsx — deleted, replaced by Features.tsx
- HowItWorks.tsx — deleted, replaced by Features.tsx

## Prompting Rules (read before every task)

- One file per prompt. Never edit multiple components in one task.
- Never give Claude Code pre-written JSX — describe the outcome and let it write the code.
- Always use clamp() for font sizes and spacing so mobile and desktop scale automatically.
- Every color must be set explicitly — never rely on inherited colors especially inside phone mockups.
- framer-motion only for animations. Use [0.22, 1, 0.36, 1] as [number, number, number, number] for cubic-bezier easing to satisfy TypeScript.
- All whileInView animations use viewport={{ once: true, margin: '-80px' }}.
- Commit after every working state: git add . && git commit -m "feat: [description]" && git push origin landing.

## CSS / Scroll Architecture

globals.css applies overflow: hidden and height: 100vh at desktop breakpoints for the root / page only. Landing page overrides this with:
1. body:not(:has(.landing-page)) scoping in globals.css
2. useEffect in Hero.tsx that directly sets document.body.style.cssText

The main element in app/landing/page.tsx has className="landing-page" — this is the selector that excludes landing from scroll-locking rules. Never remove this className.

## Design System

Background: #07070F — used for every section, no white or light backgrounds
Purple dark: #4C3D8F — buttons, active states, borders
Purple accent: #7B68EE — glows, highlights, dots
Text primary: #FFFFFF
Text muted: rgba(255,255,255,0.38)
Headings: DM Sans 700/800, letter-spacing -2px to -3px
Body/labels: Poppins 400/500/600
Section padding: clamp(60px, 10vw, 120px) vertical, clamp(24px, 6vw, 80px) horizontal

## Audience & Tone

Target: Gen Z, ages 16-35, short attention span
Voice: direct, casual, like a friend — not corporate, not SaaS
Copy style: short sentences, lowercase where possible, no filler words
Animations: should feel alive not decorative — every animation has a purpose

## Key Packages

- **framer-motion** (v12) + **motion** — all animations
- **cobe** — 3D globe, always dynamic import ssr: false
- **react-tweet** — tweet embed
- **DaisyUI** — themes: false, base: false. Only used for mockup-phone
- **Supabase** — lib/supabase.ts, needs NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
- **@/lib/utils** — cn() helper for className merging## Product Build (wrrapd v1)

We are now building the actual product. The landing page is largely done on the `landing` branch.

### Current focus
- Update waitlist page at `/` to collect phone numbers alongside emails
- Build `/onboarding` multi-step flow
- Build `/dashboard` for streak tracking
- Integrate Twilio for SMS sending and yes/no reply handling

### User flow
1. User lands on `/` — enters phone number + email
2. Twilio sends verification code
3. User verifies → picks goal → picks daily time → done
4. Every day at chosen time Twilio sends one question
5. User replies yes or no
6. Streak updates in Supabase
7. End of month → wrapped card generated

### Database tables needed (Supabase)
- users: id, phone, email, created_at
- goals: id, user_id, goal_text, created_at
- checkins: id, user_id, date, response (yes/no), created_at
- streaks: id, user_id, current_streak, best_streak, updated_at

### Stack
- Supabase for auth and database (MCP connected)
- Twilio for SMS (need to install and configure)
- Next.js API routes for Twilio webhook
- Context7 for looking up docs before implementing anything

### Rules
- Use context7 to look up Twilio and Supabase docs before writing any SMS or auth code
- Use supabase MCP to create tables directly instead of writing SQL manually
- Never expose API keys in frontend — .env.local only
- Test each feature before moving to next
- Commit after each working feature
