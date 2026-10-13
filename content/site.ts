// All landing copy lives here. Components read from this file and never hardcode copy.
// Source of truth: docs/copy/landing.md. Edit copy there first, then sync this file.

export type Link = { label: string; href: string };

export const meta = {
  title: "wrrapd",
  description: "Untangle your mind, one lesson at a time. Short lessons for overthinkers, then take it to paper.",
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
  subtitle: "Learn how your mind works. Use it today. Remember it next week.",
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
  /** "Picture it" line from copy v3. Optional until v3 is synced; the card skips it when empty. */
  picture?: string;
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
        'Write the thought in one sentence. Under it, write "7pm." Close the notebook and go back to what you were doing. At 7pm, give it 10 minutes. If it still matters, write one next step. If it doesn\'t, cross it out.',
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
      doNow: "Think of what you want and clench your fist. Feel how tight that is. Now open your hand and keep thinking about it. You still want it. You just stopped strangling it. Now do one thing today that moves you toward it.",
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
  image: { src: "/images/landing/quote.png", alt: "" },
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

export type MapNode = { slug: string; label: string; core?: boolean };

export const how = {
  eyebrow: "how it works",
  heading: "Watch your mind connect.",
  tabsLabel: "Steps",
  /** One per step, in order. alt describes the map at that step for screen readers. */
  steps: [
    {
      label: "Learn it",
      body: "One knot, one short lesson. A new neuron appears.",
      alt: "A map of fifteen lessons drawn as neurons. Everything is faint except overthinking, the one you just learned.",
    },
    {
      label: "Use it",
      body: "Do the action and write it in your own words. The neuron lights up.",
      alt: "Overthinking lights up in lavender and connects to thoughts aren't facts, the observer and the future.",
    },
    {
      label: "Recall it",
      body: "wrrapd asks you again in a few days. Every time you remember, the connection gets stronger.",
      alt: "The connections from overthinking grow stronger, and new links reach presence, purpose in the moment, the loop and holding back.",
    },
  ],
  footnote: {
    quote: '"Neurons that fire together wire together."',
    source: "Hebb's rule, as summarized by Carla Shatz.",
  },
  nodes: [
    { slug: "overthinking", label: "overthinking", core: true },
    { slug: "the-future", label: "the future", core: true },
    { slug: "presence", label: "presence" },
    { slug: "the-observer", label: "the observer" },
    { slug: "thoughts-arent-facts", label: "thoughts aren't facts" },
    { slug: "attachment", label: "attachment", core: true },
    { slug: "wanting-vs-needing", label: "wanting vs needing" },
    { slug: "enough", label: "enough" },
    { slug: "holding-back", label: "holding back", core: true },
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
  sub: "Get each new lesson first, and vote on what we learn next.",
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
