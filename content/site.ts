// All landing copy lives here. Components read from this file and never hardcode copy.
// Source of truth: docs/copy/landing.md. Edit copy there first, then sync this file.

export type Link = { label: string; href: string };

export const meta = {
  title: "wrrapd",
  description:
    "A program that teaches you principles of the mind, helps you put them to use, and lets you notice the patterns in your own life.",
  url: "https://wrrapd.app",
  ogImage: "/images/landing/hero.png",
};

const links: Link[] = [
  { label: "How it works", href: "#how" },
  { label: "The knots", href: "#knots" },
  { label: "FAQ", href: "#faq" },
  { label: "Join", href: "#join" },
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
  /** The "Picture it" line, shown under the name with no label. */
  picture: string;
  principle: string;
  useToday: string;
  notice: string;
};

export const knots = {
  eyebrow: "the five knots",
  heading: "What's loud in your head right now?",
  intro: "Every knot is a pattern. Pick the one that sounds like you today.",
  prompt: "Tap the one that sounds like you.",
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
        "You're not solving the problem. You're replaying it. A thought that keeps repeating isn't giving you new information. It's asking for your attention, and you keep giving it.",
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
        "Your mind is living in a day that doesn't exist yet. It rehearses the worst version so you feel prepared, but all it really does is make you live it twice.",
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
        "Not starting feels safe, because you can't fail at something you never tried. But waiting to feel ready is just fear with good manners.",
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
        "Wanting turned into needing. Now the thing you want is holding your peace hostage, and every delay feels like a threat.",
      useToday:
        "Think of what you want and clench your fist. Feel how tight that is. Now open your hand and keep thinking about it. You still want it. You just stopped strangling it. Now do one thing today that moves you toward it.",
      notice: "If I never got this, who would I still be?",
    },
    {
      slug: "self-sabotage",
      name: "Self-sabotage",
      soundsLike: "Why do I keep doing this?",
      picture:
        "It's a smoke alarm that goes off every time you cook. It isn't broken. It's just trying too hard to keep you safe.",
      principle:
        "It isn't laziness. Some part of you is protecting you from something: being seen, being judged, or losing the version of you that you already know.",
      useToday:
        'Finish this sentence on paper: "The part of me that stops me is trying to protect me from..."',
      notice: "What am I afraid would happen if I actually followed through?",
    },
  ] satisfies Knot[],
};

/** mobile: one of the seven neurons the small map shows. The rest render only from lg up. */
export type MapNode = { slug: string; label: string; core?: boolean; mobile?: boolean };

export const how = {
  eyebrow: "how it works",
  heading: "Learn it. Use it. Notice it.",
  tabsLabel: "Steps",
  /** One per step, in order. alt describes the map at that step for screen readers. */
  steps: [
    {
      label: "Learn the principle",
      body: "One short lesson on one principle of how your mind works. A new neuron appears.",
      alt: "A map of lessons drawn as neurons. Everything is faint except overthinking, the principle you just learned.",
    },
    {
      label: "Put it to use",
      body: "Every lesson ends with something to do today. Do it, and the neuron lights up.",
      alt: "You did today's action, so overthinking lights up in lavender and connects to thoughts aren't facts, the observer and the future.",
    },
    {
      label: "Notice the pattern",
      body: "Over time the lessons connect, and you start seeing the same patterns in your own life. Seeing them is what loosens them.",
      alt: "The connections from overthinking grow stronger, and new links reach further lessons, like presence and holding back. The same pattern shows up across the map.",
    },
  ],
  footnote: {
    quote: '"Neurons that fire together wire together."',
    source: "Hebb's rule, as summarized by Carla Shatz.",
  },
  nodes: [
    { slug: "overthinking", label: "overthinking", core: true, mobile: true },
    { slug: "the-future", label: "the future", core: true, mobile: true },
    { slug: "presence", label: "presence", mobile: true },
    { slug: "the-observer", label: "the observer", mobile: true },
    { slug: "thoughts-arent-facts", label: "thoughts aren't facts", mobile: true },
    { slug: "attachment", label: "attachment", core: true, mobile: true },
    { slug: "wanting-vs-needing", label: "wanting vs needing" },
    { slug: "enough", label: "enough" },
    { slug: "holding-back", label: "holding back", core: true, mobile: true },
    { slug: "fear-of-being-seen", label: "fear of being seen" },
    { slug: "self-trust", label: "self-trust" },
    { slug: "self-sabotage", label: "self-sabotage", core: true },
    { slug: "the-loop", label: "the loop" },
    { slug: "urges", label: "urges" },
    { slug: "purpose-in-the-moment", label: "purpose in the moment" },
  ] satisfies MapNode[],
};

export const faq = {
  eyebrow: "before you begin",
  heading: "Fair questions.",
  sideNote: {
    text: "Still have a question? Message me on Instagram.",
    link: { label: "@ubay.xx", href: "https://www.instagram.com/ubay.xx/" } satisfies Link,
  },
  items: [
    {
      question: "Why is wrrapd free?",
      answer:
        "Because I don't have all the answers myself. I'm working through the same knots you are, and charging for that would feel wrong. Most of what's here isn't mine anyway. It comes from the Stoics, the Buddha and modern psychology, and some of it is over two thousand years old. I'm just putting it in one place and making it easier to use.",
    },
    {
      question: "What's the catch?",
      answer:
        "There isn't one. No ads, no selling your data, no premium tier waiting at lesson six. If wrrapd ever needs money to keep running, there will be a donate button, and it will always be optional.",
    },
    {
      question: "What can I expect?",
      answer:
        "Short lessons, each on one principle of how your mind works, each ending with something to do that day. Some will feel obvious until you try them. Over time you'll start noticing the same patterns in your own life. That's the point, and it takes reps.",
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
    {
      question: "How do I help shape wrrapd?",
      answer:
        "Join the list at the bottom of this page. You'll get each new lesson first, and you get a vote on which knot we take apart next.",
    },
  ],
};

/** The six interests the join form accepts. The server action rejects anything else. */
export const interests = [
  { value: "overthinking", label: "Overthinking" },
  { value: "the-future", label: "The future" },
  { value: "holding-back", label: "Holding back" },
  { value: "attachment", label: "Attachment" },
  { value: "self-sabotage", label: "Self-sabotage" },
  { value: "other", label: "Other" },
] as const;

export type Interest = (typeof interests)[number]["value"];

export const join = {
  heading: "Help build wrrapd.",
  sub: "Get each new lesson first, and vote on which knot we take apart next.",
  question: "What do you want to untangle first?",
  otherLabel: "What else?",
  otherMax: 60,
  emailLabel: "Your email",
  emailPlaceholder: "you@example.com",
  submit: "Join the list",
  sending: "Joining...",
  fine: "Just email. No spam. Leave anytime.",
  success: "You're in. The first lesson is on its way.",
  error: "That didn't work. Check your email and try again.",
  image: { src: "/images/landing/cta.png", alt: "" },
};

export const footer = {
  logo: "wrrapd.",
  blurb: "A free program for overthinkers. Learn how your mind works, then take it to paper.",
  columns: [
    { heading: "Program", links },
    { heading: "Follow", links: [{ label: "Instagram", href: "https://www.instagram.com/ubay.xx/" }] satisfies Link[] },
  ],
  copyright: "wrrapd™. All rights reserved.",
};
