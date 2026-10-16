// All landing copy lives here. Components read from this file and never hardcode copy.
// Source of truth: docs/copy/landing.md. Edit copy there first, then sync this file.

export type Link = { label: string; href: string };

export const meta = {
  title: "wrrapd",
  description:
    "Two-minute lessons from neuroscience, psychology, philosophy and religion. Learn a principle, put it to use, and notice the patterns in your own life.",
  url: "https://wrrapd.app",
  ogImage: "/images/landing/hero.png",
};

const links: Link[] = [
  { label: "How it works", href: "#how" },
  { label: "The knots", href: "#knots" },
  { label: "FAQ", href: "#faq" },
];

export const nav = {
  logo: "wrrapd.",
  links,
  menuOpen: "Menu",
  menuClose: "Close",
  menuLabel: "Site navigation",
};

export const hero = {
  title: ["Untangle your mind,", "one lesson at a time."],
  cta: { label: "Explore the knots", href: "#knots" } satisfies Link,
  image: {
    src: "/images/landing/hero.png",
    mobileSrc: "/images/landing/hero-mobile.png",
    alt: "A painted landscape at sunrise. A person sits on a grassy hill looking toward a river that unwinds from a tangled knot in the distance.",
  },
};

export type Knot = {
  slug: string;
  name: string;
  soundsLike: string;
  /** The "Picture it" line, shown under the name with no label. */
  picture: string;
  principle: string;
  useToday: string;
  notice: string;
};

export const knots = {
  eyebrow: "the five knots",
  heading: "What's on your mind lately?",
  intro: "Every knot is a pattern most minds share. Pick the one you're curious about today.",
  prompt: "Tap one to see what it's about.",
  labels: { principle: "The principle", useToday: "Use it today", notice: "Notice it" },
  footer: "The full lesson is being written. For now, take this to paper.",
  copy: "Copy the question",
  copied: "Copied",
  items: [
    {
      slug: "overthinking",
      name: "Overthinking",
      soundsLike: "Let me think about it one more time.",
      picture:
        "Thinking is walking somewhere. Overthinking is pacing the same room, hoping a door will appear.",
      principle:
        "Thinking moves toward an answer. Overthinking circles the same question. A thought that keeps repeating isn't bringing new information. It's asking for attention.",
      useToday:
        'Write the thought in one sentence. Under it, write "7pm." Close the notebook and go back to what you were doing. At 7pm, give it 10 minutes. If it still matters, write one next step. If it doesn\'t, cross it out.',
      notice: "If I already knew the answer, what would I do next?",
    },
    {
      slug: "the-future",
      name: "The future",
      soundsLike: "What if it all goes wrong?",
      picture:
        "Worry is carrying tomorrow's bag today. It's heavy, and it isn't even yours yet.",
      principle:
        "The mind likes to visit days that haven't happened yet. It rehearses the hard version so you feel prepared, and often that just means living it twice.",
      useToday:
        "Split a page in two. Left: what I can act on this week. Right: what I can't control. Do one thing from the left side. Leave the right side on the page.",
      notice: "What is the one step in front of me today?",
    },
    {
      slug: "holding-back",
      name: "Holding back",
      soundsLike: "I'll start when I'm ready.",
      picture:
        "You can't steer a parked car. Move first, then adjust.",
      principle:
        "Not starting can feel safe, because nothing has been tested yet. But readiness usually shows up after you begin, not before.",
      useToday:
        "Do the smallest version of it in the next ten minutes. One paragraph. One message. One rep.",
      notice: "What would I start this week if no one would ever see it fail?",
    },
    {
      slug: "attachment",
      name: "Attachment",
      soundsLike: "I'll be okay once I have it.",
      picture:
        "Desire is an open hand. Attachment is a closed fist. You can hold the same thing either way, but only one of them lets you feel it.",
      principle:
        "Sometimes wanting quietly turns into needing. Then your peace starts to depend on the outcome, and every delay feels heavier than it is.",
      useToday:
        "Think of what you want and close your hand into a fist. Notice how tight that feels. Now open your hand and keep thinking about it. You still want it. You're just holding it more gently. Then do one small thing today that moves you toward it.",
      notice: "If I never got this, who would I still be?",
    },
    {
      slug: "self-sabotage",
      name: "Self-sabotage",
      soundsLike: "Why do I keep doing this?",
      picture:
        "It's a smoke alarm that goes off every time you cook. It isn't broken. It's just trying too hard to keep you safe.",
      principle:
        "It isn't laziness. Often a part of you is trying to protect you from something: being seen, being judged, or losing the version of you that you already know.",
      useToday:
        'Finish this sentence on paper: "The part of me that stops me is trying to protect me from..."',
      notice: "What am I afraid would happen if I actually followed through?",
    },
  ] satisfies Knot[],
};

/** The four fields every lesson comes from. Colors live in tailwind.config.ts and globals.css under the same keys. */
export type Field = "neuroscience" | "psychology" | "philosophy" | "religion";

export const fields: { key: Field; label: string }[] = [
  { key: "neuroscience", label: "Neuroscience" },
  { key: "psychology", label: "Psychology" },
  { key: "philosophy", label: "Philosophy" },
  { key: "religion", label: "Religion" },
];

/**
 * field: the lesson's field, or "knot" for the five hubs.
 */
export type MapNode = { slug: string; label: string; field: Field | "knot" };

export const how = {
  eyebrow: "how it works",
  heading: "One idea. Four fields. All connected.",
  intro: "Two-minute lessons from neuroscience, psychology, philosophy and religion. Each one teaches a principle you can use today.",
  legendLabel: "Fields",
  /** One per step, in order. alt describes the map at that step for screen readers. */
  steps: [
    {
      label: "Learn the principle",
      body: "One short lesson, one idea. A new neuron appears.",
      alt: "A map of two-minute lessons drawn as neurons and colored by field. Everything is faint except the predicting brain, a neuroscience lesson, which has just appeared.",
    },
    {
      label: "Put it to use",
      body: "Every lesson ends with something to do today. Do it, and the neuron lights up.",
      alt: "The predicting brain fills with blue and glows, and a line draws from it to the future, one of the five knots.",
    },
    {
      label: "Notice the pattern",
      body: "The same idea shows up in every field. As the lessons connect, you start seeing the pattern in your own life.",
      alt: "Lines draw from the future to thoughts aren't facts in psychology, imagined suffering and the second arrow in philosophy, and tie your camel in religion. The rest of the map fades in behind. One knot, four fields.",
    },
  ],
  /** The strip under the map: one idea, said once per field. Desktop only. */
  strip: {
    label: "Same idea, four fields",
    items: [
      { field: "neuroscience", text: "Your brain predicts what's coming before it sees it. You live partly in a forecast." },
      { field: "psychology", text: "That's why a thought can feel true without being true." },
      { field: "philosophy", text: '"We suffer more often in imagination than in reality." Seneca' },
      { field: "religion", text: "Tie your camel. Do your part, then trust the outcome." },
    ] satisfies { field: Field; text: string }[],
    note: "All of these untangle one knot: the future.",
  },
  footnote: {
    quote: '"Neurons that fire together wire together."',
    source: "Hebb's rule, as summarized by Carla Shatz.",
  },
  nodes: [
    { slug: "overthinking", label: "overthinking", field: "knot" },
    { slug: "the-future", label: "the future", field: "knot" },
    { slug: "holding-back", label: "holding back", field: "knot" },
    { slug: "attachment", label: "attachment", field: "knot" },
    { slug: "self-sabotage", label: "self-sabotage", field: "knot" },
    { slug: "the-predicting-brain", label: "the predicting brain", field: "neuroscience" },
    { slug: "wired-together", label: "wired together", field: "neuroscience" },
    { slug: "the-stress-response", label: "the stress response", field: "neuroscience" },
    { slug: "thoughts-arent-facts", label: "thoughts aren't facts", field: "psychology" },
    { slug: "the-spotlight-effect", label: "the spotlight effect", field: "psychology" },
    { slug: "loss-aversion", label: "loss aversion", field: "psychology" },
    { slug: "the-second-arrow", label: "the second arrow", field: "philosophy" },
    { slug: "imagined-suffering", label: "imagined suffering", field: "philosophy" },
    { slug: "whats-in-your-control", label: "what's in your control", field: "philosophy" },
    { slug: "tie-your-camel", label: "tie your camel", field: "religion" },
    { slug: "intention", label: "intention", field: "religion" },
  ] satisfies MapNode[],
};

export const faq = {
  eyebrow: "before you begin",
  heading: "Fair questions.",
  sideNote: {
    text: "Have a question, or want to help build wrrapd? Message me on Instagram.",
    link: { label: "@ubay.xx", href: "https://www.instagram.com/ubay.xx/" } satisfies Link,
  },
  items: [
    {
      question: "Why is wrrapd free?",
      answer:
        "Because I don't have all the answers myself. I'm learning this alongside you, and charging for that would feel wrong. Most of what's here isn't mine anyway. It comes from neuroscience, psychology, the Stoics, the Buddha and religious tradition, and some of it is over two thousand years old. I'm just putting it in one place and making it easier to use.",
    },
    {
      question: "What can I expect?",
      answer:
        "Two-minute lessons, each on one principle of how your mind works, each ending with something to do that day. Over time they connect, and you start noticing the same patterns in your own life. It's a practice, so there's no rush.",
    },
    {
      question: "Where do the lessons come from?",
      answer:
        "Neuroscience and psychology research, Stoic and Buddhist philosophy, and religious tradition. Every lesson names its source, so you can go deeper on anything that interests you.",
    },
    {
      question: "Is this therapy?",
      answer:
        "No. wrrapd teaches how the mind works, the way a good book would. If you're going through something heavy, please talk to a licensed professional.",
    },
  ],
};

export const closing = {
  image: { src: "/images/landing/cta.png", alt: "" },
};

export const footer = {
  logo: "wrrapd.",
  blurb: "A free program of two-minute lessons on how the mind works. Learn a principle, then use it today.",
  columns: [
    { heading: "Program", links },
    { heading: "Follow", links: [{ label: "Instagram", href: "https://www.instagram.com/ubay.xx/" }] satisfies Link[] },
  ],
  copyright: "wrrapd™. All rights reserved.",
};
