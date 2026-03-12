# wrrapd.

> The all-in-one study platform built by a student, for students.

**wrrapd** is a modern productivity and social study platform launching **March 23**. Connect with other students, discover tools, and lock in — together.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Components | shadcn/ui + Radix UI |
| Animations | Framer Motion |
| Icons | Lucide React |
| Font | DM Sans (Google Fonts) |
| Deployment | Vercel |

---

## Features

- **Interactive flashlight effect** — cursor-driven spotlight with dual-layer logo that switches color as the circle sweeps over it
- **Animated social links** — logo icons that pop on hover with blur-out of non-focused items
- **Waitlist form** — email capture with animated submit state and social proof
- **Ghost text elements** — low-opacity ambient text for visual depth
- **Fully responsive** — optimised for desktop, tablet, and mobile

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/your-username/wrrapd.git
cd wrrapd
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## Project Structure

```
wrrapd/
├── app/
│   ├── layout.tsx        # Root layout with fonts and metadata
│   └── page.tsx          # Landing page
├── components/
│   └── ui/
│       ├── social-links.tsx  # Animated social icons component
│       └── waitlist.tsx      # Email waitlist form with social proof
├── lib/
│   └── utils.ts          # Utility functions (cn)
├── public/               # Static assets (logos, avatars)
└── tailwind.config.ts    # Tailwind theme config
```

---

## Environment

No environment variables are required for the current version. Backend waitlist integration (API route + database) is planned for v1.1.

---

## Deployment

This project is deployed on [Vercel](https://vercel.com). Every push to `main` triggers an automatic production deployment.

---

## Roadmap

- [ ] Waitlist backend integration (email collection + notifications)
- [ ] Authentication (student SSO)
- [ ] Study rooms — real-time collaborative sessions
- [ ] Tool discovery hub
- [ ] Social profiles

---

## License

Private — all rights reserved. Built by a student, for students.
