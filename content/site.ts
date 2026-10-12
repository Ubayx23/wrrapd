// All landing copy lives here. Components read from this file and never hardcode copy.

export type Link = { label: string; href: string };

export type Nav = { links: Link[]; cta: Link | null };

export type Hero = { eyebrow: string; title: string; lede: string; cta: Link | null; image: string };

export type Program = { slug: string; title: string; summary: string; image: string };

export type Step = { title: string; body: string };

export type FaqItem = { question: string; answer: string };

export type JournalEntry = { title: string; date: string; href: string; image: string };

export type Footer = { tagline: string; columns: { heading: string; links: Link[] }[] };

export const nav: Nav = { links: [], cta: null };

export const hero: Hero = { eyebrow: "", title: "", lede: "", cta: null, image: "" };

export const programs: Program[] = [];

export const steps: Step[] = [];

export const faq: FaqItem[] = [];

export const journal: JournalEntry[] = [];

export const footer: Footer = { tagline: "", columns: [] };
