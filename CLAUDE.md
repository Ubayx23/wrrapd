# CLAUDE.md

## What wrrapd is
wrrapd is a free reflection platform for overthinkers. It teaches you how your mind works through short, deep lessons, then sends you to your own notebook to reflect. Built by Ubay for himself first, shared on Instagram.
Tagline: untangle your mind.

## Principles (never break these)
- Free. No subscriptions, no paywalls, no payments.
- No AI features. Guidance comes from written lessons and simple rules.
- Journals never live in this app. Users reflect on paper or in their own notes app. Never ask for or store journal text.
- The app only stores: the account, lessons lit (reflected on paper), lessons saved.
- Depth over surface. Every lesson goes: what it is, why it happens, how it shows up in you, what to do.
- Consume, then create. Every lesson ends with a prompt to take to paper.
- Purpose is created in the moment, not chased.

## Voice
Calm, honest, like a good tutor. Direct and action first. Never hype, never harsh, never motivational fluff. Short sentences. No em dashes. No emojis.

## Design system
One look only: legal pad paper. No dark mode.
- Paper: #f7efbd with a 24px grid, lines rgba(72,80,58,.13)
- Paper light (notes, sheets): #fbf6d6
- Margin line: rgba(206,92,92,.32)
- Ink: #1e2a3f, ink-2 #4b5669, ink-3 #7c8391
- Highlighters: blue #a5c9ef, purple #ccb0f0, orange #f6ae88, green #bfdf99, pink #f3aad9
- Strands (intro knot): fill #8fb2f0, edge #c46fd1
Type: Instrument Serif (display), Figtree (body), Caveat (handwritten notes, used sparingly).
Signature details: highlighter swipes behind key words, hand-drawn ink lines (SVG turbulence wobble), torn paper edges, a red margin line, neurons drawn in ink, the strand knot.
Avoid: gradient buttons, glassmorphism, identical rounded cards, centering everything, decorative stock icons, purple SaaS gradients, Inter.
References: docs/design/wrrapd-prototype.html is the approved look. docs/design/inspiration/ has the mood references.

## Product map
Live:
- / : intro (untangle the knot) then the landing page
Planned:
- /map : home. A neuron map of lessons with a feeling filter (overwhelmed, stuck in my head, wanting it too much, getting in my own way, scared to start) that highlights related neurons.
- /lesson/[slug] : lesson reader, slide by slide
- /login : Supabase auth
- /saved : saved lessons

## Lesson format
Lessons are markdown files in content/lessons/[slug].md with frontmatter: title, slug, core, feelings, related, root.
Each lesson is a set of slides that also export as 1080x1350 Instagram carousel slides:
1. Hook  2. Name it  3. Why it happens  4. How it shows up  5. Ask yourself  6. Do this today  7. Take it to paper  8. Closing line
Core lessons: overthinking, holding back, the future, attachment, self-sabotage.

## Tech stack
Next.js 15 App Router, TypeScript, Tailwind CSS 3, Framer Motion, Supabase (auth and progress only, not yet wired), Vercel.

## Structure
- app/ : routes only
- components/landing/ : landing sections
- components/ui/ : shared primitives (Highlight, Button, TornEdge, InkFilter)
- lib/ : helpers
- content/lessons/ : lesson markdown
- docs/design/ : prototype and inspiration

## Code rules
- Server components by default. "use client" only for canvas and interactions.
- Respect prefers-reduced-motion everywhere.
- Works at 390px. No horizontal scroll. Tap targets at least 44px.
- Supabase clients are created inside handlers, never at module level. Never expose the service role key.
- Canvas: devicePixelRatio aware (cap at 2), stop the loop when off screen, clean up on unmount.

## Git
- Work on a feature branch. main auto deploys to Vercel.
- Commit after every working state: git add . && git commit -m "feat: description"

## Commands
npm run dev | npm run build | npm run lint | npx tsc --noEmit
