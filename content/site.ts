// All landing copy lives here. Components read from this file and never hardcode copy.
// Source of truth: docs/copy/landing.md. Edit copy there first, then sync this file.

export type Link = { label: string; href: string };

export const meta = {
  title: "wrrapd",
  description: "Untangle your mind, one lesson at a time. A free program for overthinkers.",
  url: "https://wrrapd.app",
  ogImage: "/images/landing/hero.png",
};

const links: Link[] = [
  { label: "The knots", href: "#knots" },
  { label: "Today", href: "#today" },
  { label: "How it works", href: "#how" },
  { label: "FAQ", href: "#faq" },
];

export const nav = {
  logo: "wrrapd.",
  links,
  cta: { label: "Find your knot", href: "#knots" } satisfies Link,
  menuOpen: "Menu",
  menuClose: "Close",
  menuLabel: "Site navigation",
};

export const hero = {
  eyebrow: "a free program for overthinkers",
  title: ["Untangle your mind,", "one lesson at a time."],
  sub: "You don't have a motivation problem. You have a few knots. Learn how each one works, then untie it on paper.",
  cta: { label: "Find your knot", href: "#knots" } satisfies Link,
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
  happening: string;
  ask: string;
  doNow: string;
};

export const knots = {
  eyebrow: "the five knots",
  heading: "What's loud in your head right now?",
  intro: "Pick the one that sounds most like you today. That's where you start.",
  prompt: "Tap the one that sounds like you.",
  labels: { happening: "What's happening", ask: "Ask yourself", doNow: "Do this now" },
  footer: "The full lesson is being written. For now, take this question to paper.",
  copy: "Copy the question",
  copied: "Copied",
  items: [
    {
      slug: "overthinking",
      name: "Overthinking",
      soundsLike: "Let me think about it one more time.",
      happening:
        "You're not solving the problem. You're replaying it. A thought that keeps repeating isn't giving you new information. It's asking for your attention, and you keep giving it.",
      ask: "If I already knew the answer, what would I do next?",
      doNow:
        'Write the thought down in one sentence. Under it, write "I\'ll come back to this at 7pm." Close the notebook.',
    },
    {
      slug: "the-future",
      name: "The future",
      soundsLike: "What if it all goes wrong?",
      happening:
        "Your mind is living in a day that doesn't exist yet. It rehearses the worst version so you feel prepared, but all it really does is make you live it twice.",
      ask: "What is the one step in front of me today?",
      doNow:
        "Split a page in two. Left: what I can act on this week. Right: what I can't control. Do one thing from the left side. Leave the right side on the page.",
    },
    {
      slug: "holding-back",
      name: "Holding back",
      soundsLike: "I'll start when I'm ready.",
      happening:
        "Not starting feels safe, because you can't fail at something you never tried. But waiting to feel ready is just fear with good manners.",
      ask: "What would I start this week if no one would ever see it fail?",
      doNow: "Do the smallest version of it in the next ten minutes. One paragraph. One message. One rep.",
    },
    {
      slug: "attachment",
      name: "Attachment",
      soundsLike: "I'll be okay once I have it.",
      happening:
        "Wanting turned into needing. Now the thing you want is holding your peace hostage, and every delay feels like a threat.",
      ask: "If I never got this, who would I still be?",
      doNow: "Write what is yours to do today and underline it. The result isn't on that list. It never was.",
    },
    {
      slug: "self-sabotage",
      name: "Self-sabotage",
      soundsLike: "Why do I keep doing this?",
      happening:
        "It isn't laziness. Some part of you is protecting you from something: being seen, being judged, or losing the version of you that you already know.",
      ask: "What am I afraid would happen if I actually followed through?",
      doNow: 'Finish this sentence on paper: "The part of me that stops me is trying to protect me from..."',
    },
  ] satisfies Knot[],
};

export const today = {
  eyebrow: "today's thought",
  instruction: "Write it at the top of today's page. Come back to it tonight.",
  thoughts: [
    { text: "We suffer more often in imagination than in reality.", source: "Seneca, Letters to Lucilius" },
    {
      text: "Men are disturbed not by things, but by the views which they take of things.",
      source: "Epictetus, Enchiridion",
    },
    { text: "All that we are is the result of what we have thought.", source: "The Dhammapada" },
    {
      text: "If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it; and this you have the power to revoke at any moment.",
      source: "Marcus Aurelius, Meditations",
    },
    { text: "You have a right to your actions, but never to the fruits of your actions.", source: "Bhagavad Gita" },
    {
      text: "Begin at once to live, and count each separate day as a separate life.",
      source: "Seneca, Letters to Lucilius",
    },
    {
      text: "How much more grievous are the consequences of anger than the causes of it.",
      source: "Marcus Aurelius, Meditations",
    },
    { text: "A thought that repeats isn't new information.", source: "wrrapd" },
    { text: "Waiting to feel ready is fear with good manners.", source: "wrrapd" },
    { text: "Define enough before you start, or you'll chase it forever.", source: "wrrapd" },
    { text: "The part of you that sabotages you is trying to protect you. Ask it from what.", source: "wrrapd" },
    { text: "Presence isn't calm. It's coming back, again and again.", source: "wrrapd" },
    { text: "Your notebook is the one place you don't have to perform.", source: "wrrapd" },
    { text: "You can care fully and still hold it loosely.", source: "wrrapd" },
  ],
};

export const steps = {
  eyebrow: "how it works",
  heading: "Learn it. Write it. Notice it.",
  items: [
    {
      title: "Learn it",
      body: "Each lesson takes one knot apart. What it is, why your mind does it, how it shows up in you, and what to do about it. Five minutes, no fluff.",
    },
    {
      title: "Write it",
      body: "Every lesson ends with one question for your notebook. Paper, not a screen. You remember what you write by hand, and nobody reads it but you.",
    },
    {
      title: "Notice it",
      body: "After a while, you catch the knot while it's forming. That's the whole skill. Seeing it from the outside is what loosens it.",
    },
  ],
};

export const practice = {
  eyebrow: "the practice",
  heading: "Five lines, every night.",
  lines: ["what happened", "what I thought", "what I felt", "what I did", "what the observer notices"],
  body: [
    "When something hits you, don't analyze it. Write it in five lines. The first four are the story. The fifth is you stepping out of the story and looking at it. That step back is the practice.",
    "Seneca did a version of this every night. Before sleep, he went back over his whole day, without excuses and without punishing himself. Just looking.",
  ],
  copy: "Copy the five lines",
  copied: "Copied. Go write.",
};

export const note = {
  eyebrow: "why this exists",
  body: [
    "I built wrrapd for myself.",
    "I overthink. I get attached to things before they happen, and I've talked myself out of more good ideas than I've started.",
    "I found people online who explained the mind better than any class I'd taken. But the tools around them cost hundreds a year, or turned it all into manifestation.",
    "I wanted something simpler. Learn how the knot works, then sit down with a pen and untie it.",
    "So I made it, and it's free. If it helps you too, that's the whole point.",
  ],
  signature: "Ubay",
};

export const faq = {
  eyebrow: "before you begin",
  heading: "Fair questions.",
  items: [
    {
      question: "Why is wrrapd free?",
      answer:
        "Because the ideas aren't mine to sell. Most of what's here comes from the Stoics, the Buddha and modern psychology, and some of it is over two thousand years old. I'm putting it in one place and making it easier to use. Something meant to make your mind lighter shouldn't come with a bill.",
    },
    {
      question: "What's the catch?",
      answer:
        "There isn't one. No ads, no selling your data, no premium tier waiting at lesson six. If wrrapd ever needs money to keep running, there will be a donate button, and it will always be optional.",
    },
    {
      question: "What can I expect?",
      answer:
        "Short lessons, each on one knot in your thinking. Some will feel obvious until you write about them. Expect a few uncomfortable questions. Don't expect a fix overnight. You're learning to see your own mind, and that takes reps.",
    },
    {
      question: "Why paper and not an app?",
      answer:
        "Writing by hand slows you down enough to actually think. It's also private in a way nothing online can be. wrrapd teaches you. Your notebook is where the work happens.",
    },
    {
      question: "Who is this for?",
      answer:
        "People who live in their heads. Who replay conversations, rehearse the future, and know exactly what they should do but don't do it. If that's you, start with the knot that's loudest today.",
    },
    {
      question: "Is this therapy?",
      answer:
        "No. wrrapd teaches how the mind works, the way a good book would. If you're going through something heavy, please talk to a licensed professional. Learning about your mind and getting support aren't either-or.",
    },
  ],
};

export const closing = {
  title: ["Begin untangling.", "One knot at a time."],
  cta: { label: "Find your knot", href: "#knots" } satisfies Link,
  image: { src: "/images/landing/cta.png", alt: "" },
};

export const footer = {
  logo: "wrrapd.",
  blurb: "A free program for overthinkers. Learn how your mind works, then take it to paper.",
  columns: [
    { heading: "Program", links },
    { heading: "Follow", links: [{ label: "Instagram", href: "#" }] satisfies Link[] },
  ],
  bottom: "Free. Built for one overthinker first.",
};
