# CLAUDE.md

## Core idea
wrrapd is a program of micro lessons, about two minutes each, across four connected fields: neuroscience, psychology, philosophy (Stoicism and Buddhism) and religion. Each lesson teaches one principle, helps you put it to use, and connects to lessons in the other fields, so you start noticing the same patterns in your own life. The five knots are the entry points. The map shows how everything connects.

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
Never market 'free' above the FAQ. It only appears in the FAQ and the footer.
The hero has no subheading.

## Design system
Tokens (also CSS variables in app/globals.css and colors in tailwind.config.ts):
- bg #F5EEE2 (matches the paper in the illustrations so their edges disappear into the page), surface #FBF7EF, line #E4DAC8
- ink #1D1B26, ink-2 #5B5867, ink-3 #8E8A98
- lavender #7C6FD0 (eyebrow labels and small details only), peach #E9A27F, sage #A9BFA0
- night #2A2540 (not used on the landing right now), lavender-light #C9C0F2 for lit neurons on the map.
- Field colors (tailwind field-*, CSS --field-*): neuroscience #6E9BD8 (blue), psychology #7C6FD0 (lavender), philosophy #E9A27F (peach), religion #8FAF86 (sage, deeper than the sage token so it reads on cream). Only for dots, map nodes, lines and small chips. Text stays ink or ink-2.
Type: Instrument Serif for headings, Figtree for body.
Buttons: ink pills (rounded-full), surface-colored text, a small up-right arrow, min height 44px.
Cursor: KnotCursor, a small knot of thread around the pointer. It turns slowly at rest, pulls tight into a trefoil when you move fast, loosens when you slow down, and unties into a lavender ring over links. Desktop only.
Nav: Trainza style. Logo pill on the left, centered link pill, CTA pill on the right.
Section headers: a small lavender eyebrow on the left and a serif heading on the right, over a hairline.
Illustrations: painted gouache in lavender, peach and sage, with torn paper edges. No border, radius or shadow on illustrations; they blend into the page. Rendered through components/ui/ImageSlot (next/image, with fallbacks when a file is missing).
Main reference: docs/design/landing/trainza-editorial.png.
Never use: icon feature grids, stat counters, testimonials, gradient blobs, glassmorphism, emojis, em dashes.
The landing should feel like a calm studio or program, not a SaaS product.
In-app design (map, lessons) is not decided yet. See docs/design/app-later/.

## Product map
Live:
- / : landing page. Sections in order: Hero, How it works (the animated map), The knots, FAQ, Join the list (in the closing band), Footer.
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
- app/(site)/ : landing route
- components/site/ : landing sections (Nav, Hero, HowItWorks, Knots, Faq, Join, Footer)
- components/ui/ : shared primitives (Button, SectionHeader, Accordion, ImageSlot, Container, Reveal, Parallax, Logo, KnotCursor)
- content/site.ts : all landing copy
- No email collection on the landing. People who want to take part message @ubay.xx on Instagram.
- content/lessons/ : lesson markdown
- lib/ : helpers
- public/images/landing/ : landing illustrations
- docs/copy/ : landing copy (source of truth)
- docs/design/landing/ : landing references
- docs/design/app-later/ : references for the in-app design, not decided yet
content/site.ts holds all landing copy. Components never hardcode copy.
docs/copy/landing.md is the source of truth for landing copy. Edit copy there first, then sync content/site.ts.

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
