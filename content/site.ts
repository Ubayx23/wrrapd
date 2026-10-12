// All landing copy lives here. Components read from this file and never hardcode copy.

export type Link = { label: string; href: string };

export const meta = {
  title: "wrrapd",
  description: "Untangle your mind, one lesson at a time. A free program for overthinkers.",
  url: "https://wrrapd.app",
  ogImage: "/images/landing/hero.png",
};

export const nav = {
  logo: "wrrapd.",
  links: [
    { label: "Programs", href: "#programs" },
    { label: "How it works", href: "#how" },
    { label: "Journal", href: "#journal" },
    { label: "FAQ", href: "#faq" },
  ] satisfies Link[],
  cta: { label: "Start free", href: "#programs" } satisfies Link,
  menuOpen: "Menu",
  menuClose: "Close",
  menuLabel: "Site navigation",
};

export const hero = {
  title: ["Untangle your mind,", "one lesson at a time."],
  sub: "A free program of short lessons on how your thoughts, urges and fears work. Learn one, then take it to paper.",
  cta: { label: "Start untangling", href: "#programs" } satisfies Link,
  image: {
    src: "/images/landing/hero.png",
    mobileSrc: "/images/landing/hero-mobile.png",
    alt: "A painted landscape at sunrise. A person sits on a grassy hill looking toward a river that unwinds from a tangled knot in the distance.",
  },
};

export const programs = {
  eyebrow: "programs",
  heading: "Explore the five paths",
  status: "coming soon",
  items: [
    {
      title: "Overthinking",
      description: "For when your mind won't stop looping. Learn to step out of the thought instead of arguing with it.",
    },
    {
      title: "Holding back",
      description: "For when you stay small so nothing can go wrong. Learn to start before you feel ready.",
    },
    {
      title: "The future",
      description: "For when tomorrow feels heavy today. Learn to come back to the one step in front of you.",
    },
    {
      title: "Attachment",
      description: "For when wanting something turns into needing it. Learn to care fully and hold it loosely.",
    },
    {
      title: "Self-sabotage",
      description: "For when you get in your own way. Learn what that part of you is protecting you from.",
    },
  ],
};

export const steps = {
  eyebrow: "how it works",
  heading: "Learn. Reflect. Notice.",
  items: [
    {
      title: "Learn",
      body: "Read a short lesson on one pattern. What it is, why it happens, how it shows up in you, and what to do.",
    },
    {
      title: "Reflect on paper",
      body: "Every lesson ends with a prompt for your notebook. Your reflections never live here.",
    },
    {
      title: "Notice",
      body: "Over time you start to see your patterns from the outside, without judging them.",
    },
  ],
};

export const practice = {
  eyebrow: "the practice",
  heading: "Five lines, every day",
  lines: ["what happened", "what I thought", "what I felt", "what I did", "what the observer notices"],
  body: "When something hits you, write these five lines. The last one matters most. It is you, looking at yourself from the outside.",
  note: "Free. No ads. No AI. Your journal stays yours.",
  copy: "Copy the template",
  copied: "Copied",
};

export const faq = {
  eyebrow: "faq",
  heading: "Clarity before you begin",
  items: [
    { question: "Is wrrapd really free?", answer: "Yes. No subscriptions, no ads, no paywall." },
    {
      question: "Do you store what I write?",
      answer:
        "No. You reflect on paper or in your own notes app. wrrapd only remembers which lessons you finished and saved.",
    },
    {
      question: "Is this therapy?",
      answer:
        "No. wrrapd teaches how the mind works. If you are struggling, please reach out to a licensed professional.",
    },
    {
      question: "How long is a lesson?",
      answer: "About five minutes to read. Then as long as you want with your notebook.",
    },
    {
      question: "Where do the ideas come from?",
      answer: "CBT, ACT, Stoicism and Buddhist psychology, rewritten in plain language.",
    },
  ],
};

export const journal = {
  eyebrow: "journal",
  heading: "From the journal",
  tag: "lesson",
  readTime: "5 min read",
  items: [{ title: "Thoughts aren't facts" }, { title: "The loop behind self-sabotage" }, { title: "Wanting vs needing" }],
};

export const closing = {
  title: ["Begin untangling.", "One lesson at a time."],
  cta: { label: "Start free", href: "#programs" } satisfies Link,
  image: {
    src: "/images/landing/cta.png",
    alt: "",
  },
};

export const footer = {
  logo: "wrrapd.",
  blurb: "A free program for overthinkers. Learn how your mind works, then take it to paper.",
  columns: [
    { heading: "Program", links: nav.links },
    { heading: "Follow", links: [{ label: "Instagram", href: "#" }] satisfies Link[] },
  ],
  bottom: "Free. Built for one overthinker first.",
};
