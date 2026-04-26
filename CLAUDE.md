# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Commands
npm run dev      # Start dev server
npm run build    # Production build + type checking
npm run lint     # ESLint
npx tsc --noEmit # Type-check without building

## Project Overview
wrrapd (wrrapd.app) is an SMS accountability app for Gen Z.
One text a day. Identity affirmation: "are you someone who's [goal] today?"
User replies "I am" or "I am not". First reply counts.
$4.99/month after 14 day free trial.

## Active Routes
/ — landing page (app/page.tsx or app/landing)
/onboard — multi-step signup flow
/login — returning user sign in
/dashboard — user home after auth
/settings — account settings
/help — FAQ page
/api/twilio/send — cron endpoint, sends daily texts
/api/twilio/send/test — manual test send
/api/twilio/welcome — sends welcome text after onboarding
/api/twilio/webhook — receives Twilio inbound replies

## Tech Stack
- Next.js 15 App Router
- Supabase (auth + database)
- Twilio (SMS)
- Stripe (payments, not yet active)
- Vercel (deployment)
- Framer Motion (animations)
- DaisyUI (mockup-phone only)
- Tailwind CSS

## Environment Variables Required
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER=+16193043459
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_PRICE_ID
STRIPE_WEBHOOK_SECRET

## Supabase Tables

profiles:
- id (uuid, PK, references auth.users)
- name (text)
- email (text)
- phone_number (text, format: +1XXXXXXXXXX)
- check_in_time (text, format: "08:00" 24hr)
- goal (text)
- is_active (boolean, default false)
- created_at (timestamptz, default now())

check_ins:
- id (uuid, PK, default gen_random_uuid())
- user_id (uuid, FK references profiles.id)
- date (date)
- response (text, "yes" or "no")
- day_count (integer)
- created_at (timestamptz, default now())

waitlist:
- id
- phone_number
- habit_answer
- created_at

RLS is enabled on all tables.
Service role key bypasses RLS for server actions.
Always initialize Supabase client INSIDE handler 
functions, never at module level.

## Twilio Rules
- phone_number stored as +1XXXXXXXXXX in Supabase
- check_in_time stored as "08:00" in Supabase
- Match hours like this (never use "8am" string format):
  const currentHour = new Date().getHours()
  const [h] = user.check_in_time.split(':')
  const userHour = parseInt(h)
  match if userHour === currentHour
- Twilio trial only sends to verified numbers
- Always use HTTP POST for webhooks
- TwiML response format:
  import { twiml } from 'twilio'
  const response = new twiml.MessagingResponse()
  response.message('your message here')
  return new Response(response.toString(), {
    headers: { 'Content-Type': 'text/xml' }
  })
- Welcome text fires immediately after onboarding
- Daily text fires via cron hitting /api/twilio/send
- First reply only counts, ignore subsequent replies

## Design System
Background: #0a0a0a (true dark, edge to edge)
Purple accent: #9B5DE5
Text primary: #FFFFFF
Text muted: rgba(255,255,255,0.4)
Font: DM Sans or Poppins
Tone: cold, minimal, exposing. NOT motivational.
Copy: lowercase throughout, no emojis, no em dashes
Brand voice: "wrrapd doesn't motivate you. it exposes you."

## Mobile Rules (CRITICAL - read before every task)
- Mobile is the PRIMARY screen. 390px is the target.
- Every feature must be built mobile first.
- Full width on mobile means 100vw, no gray sidebars.
- Never use fixed widths that cause overflow.
- Always add overflow-x: hidden to page wrappers.
- Content padding: px-4 or px-5 only, never more.
- Font sizes must scale with clamp() or responsive units.
- Bottom nav must have safe area padding for iPhone.
- Buttons must be thumb friendly, minimum 44px height.
- No horizontal scrolling ever.
- Test every change with Puppeteer at 390px width.
- Also test at 1280px for desktop.
- After EVERY file change take Puppeteer screenshots 
  at both 390px and 1280px before moving on.

## Auth Rules
- Use Supabase auth for signup and login
- After signUp always call getSession() and wait 
  for valid session before writing to profiles
- Profile insert uses service role key via server action
- If no session at insert time: show error, reset to step 1
- If signed in but no profile: redirect to /onboard
- If signed in with profile: redirect to /dashboard
- Sign out redirects to /login
- Never use NEXT_PUBLIC_ prefix for service role key

## Loading States
- Never show thin loading bars
- Full screen dark #0a0a0a with "wrrapd." centered
- Fade in content with opacity transition duration-300
- Session checks should resolve in under 2 seconds

## Onboarding Flow
Step 1: Create account (email + password)
Step 2: Name
Step 3: Goal ("what are you committing to?")
Step 4: Phone number (format: +1XXXXXXXXXX, 
        display as (555) 000-0000, max 10 digits)
Step 5: Check-in time (stored as "08:00" format)
After step 5: call /api/twilio/welcome then 
redirect to /dashboard
Save progress to localStorage so refresh 
doesnt reset the flow.
Clear localStorage on successful completion.

## Password Requirements
Min 6 characters, 1 capital, 1 number, 1 symbol.
Show strength progress bar while typing.
Show/hide password toggle with eye icon.
Block proceeding until all requirements met.

## Dashboard
Mobile first, max 480px centered on desktop.
Shows: greeting, check-in stats, trial status,
next check-in time, test text button.
Trial countdown: days since created_at vs 7 days.
If trial expired and is_active false: show paywall.
Bottom nav: home, settings, help.

## API Routes Rules
- Always initialize Supabase INSIDE the handler
- Never at module level (causes Vercel build failures)
- Always add detailed console.log for debugging
- Return proper JSON responses with success/error
- Twilio webhook must return TwiML XML not JSON

## Git Rules
- Commit after every working state
- Main branch = production (auto deploys to Vercel)
- Feature branches for new work
- Always confirm branch before making changes
- Format: git add . && git commit -m "feat: description"

## Prompting Rules
- One file per prompt, never edit multiple files at once
- Read the target file fully before touching anything
- Describe outcomes not code
- Never pre-write JSX, describe what it should do
- Always verify with Puppeteer screenshots after changes
- If a bug exists check the file first before assuming
- Do not redesign sections unless explicitly asked
- Do not add features not asked for
- Do not touch files outside the scope of the task

## What NOT To Do
- Never use em dashes anywhere in copy or code comments
- Never show friendly or motivational copy
- Never use fixed widths that break mobile
- Never initialize Supabase at module level
- Never expose service role key to client
- Never use "8am" string format for time matching
- Never add emojis
- Never redesign pages unless asked
- Never skip Puppeteer verification