/* Everything on the About page. Voice: curious, precise, a little funny — never a résumé. */

export const aboutIntro = {
  kicker: 'About · the person behind the commits',
  lines: ['A curious mind', 'that happens to', 'build with technology.'],
  sub: "I'm Kashyap — a Computer Science student in Semester 05 at CHARUSAT who treats every interesting question as an invitation to take something apart, understand it, and build a better version of it.",
};

/* Chapter 01 — "The brain, in tabs": each tab is a real kind of rabbit hole */
export const brainTabs = [
  {
    id: 'vision',
    tab: 'how does YOLO actually see?',
    domain: 'Computer vision',
    title: 'Started with "how". Ended up building VIGINT.',
    body: 'One question about how a detector draws a box turned into anchor-free heads, tracking, embeddings, evidence hashing — and a system that cleared the SIH university round.',
    tags: ['YOLOv8', 'ByteTrack', 'CLIP', 'pgvector'],
  },
  {
    id: 'money',
    tab: 'psychology of money ch. 4',
    domain: 'Finance & behaviour',
    title: 'Why smart people make odd money decisions.',
    body: 'Read on a flight, argued with in my head for a week. It changed how I think about products: people rarely act on the spreadsheet — they act on the story.',
    tags: ['Behaviour', 'Products', 'Reading at 35,000 ft'],
  },
  {
    id: 'cars',
    tab: 'why do EVs feel so fast?',
    domain: 'Automobiles',
    title: 'Engineering + design + software, on four wheels.',
    body: 'Instant torque, battery thermals, sensor fusion, driver-assist vision stacks. Cars are where mechanical, electrical and intelligent systems stop being separate subjects.',
    tags: ['Powertrains', 'ADAS', 'Design'],
  },
  {
    id: 'health',
    tab: 'can AI read an X-ray?',
    domain: 'Healthcare',
    title: 'The most useful place for a model to be right.',
    body: "Healthcare is where accuracy stops being a leaderboard number and becomes someone's afternoon. It's the reason I care about grounding, evaluation and explainability.",
    tags: ['Grounding', 'Evaluation', 'Trust'],
  },
  {
    id: 'cities',
    tab: 'how does Leadenhall hold up?',
    domain: 'Architecture & cities',
    title: 'I travel and end up staring at ceilings.',
    body: "Ironwork, load paths, how a station roof spreads its weight, why some streets feel alive. Half my camera roll is roofs. The other half is me standing in front of them.",
    tags: ['Structure', 'Cities', 'Travel'],
  },
  {
    id: 'agents',
    tab: 'new model dropped (again)',
    domain: 'AI tools',
    title: 'I test new models the way people test new cars.',
    body: 'Agents, multimodal models, dev tools, automation platforms — I try them on real work, keep what earns its place, and bin the rest.',
    tags: ['Agents', 'Multimodal', 'Automation'],
  },
];

/* Chapter 02 — intersections: AI in the middle, the rest around it */
export const domains = [
  { name: 'Healthcare', q: 'How can AI transform healthcare without asking anyone to trust a black box?' },
  { name: 'Cities', q: 'How can computer vision make campuses and cities safer — and still respect privacy?' },
  { name: 'Business', q: 'Which boring, repetitive workflow could disappear entirely with the right system?' },
  { name: 'Automobiles', q: 'What happens when mechanical, electrical and software engineering share one dashboard?' },
  { name: 'Design', q: 'How do engineering and design meet to make something feel exceptional, not just work?' },
  { name: 'Finance', q: 'Why do markets move on stories, and can a grounded model tell the story honestly?' },
  { name: 'Research', q: "What's already known, what's missing — and what happens if two papers meet?" },
  { name: 'Psychology', q: 'Why do people use one product daily and abandon another that is objectively better?' },
  { name: 'Sustainability', q: 'Where can smarter systems waste less — energy, material, time?' },
  { name: 'Travel', q: 'Why does every city have a personality, and can you see it in its streets?' },
  { name: 'Entrepreneurship', q: 'Could this become a product? Would people actually use it?' },
  { name: 'Engineering', q: 'What is the simplest architecture that will still be correct at 100× scale?' },
];

/* Chapter 03 — how a project actually goes */
export const pipeline = [
  { step: 'Idea', note: 'Usually a question asked at the wrong time of night.' },
  { step: 'Research', note: 'Papers, repos, docs, forty tabs.' },
  { step: 'Experiment', note: 'Small, ugly, fast. Truth over polish.' },
  { step: 'Architecture', note: 'Boxes and arrows until the boxes stop arguing.' },
  { step: 'Build', note: 'The part everyone thinks is the whole job.' },
  { step: 'Break', note: 'Intentionally. Mostly.', glitch: true },
  { step: 'Debug', note: 'console.log("here"), console.log("here 2")…' },
  { step: 'Refine', note: 'Now make it fast, honest and beautiful.' },
  { step: 'Present', note: 'A jury, a client, or you — reading this.' },
];

/* Chapter 04 — a spec sheet, because I like cars */
export const specSheet = [
  ['Model', 'Kashyap Nasit · Semester 05 edition'],
  ['Powertrain', 'Curiosity, naturally aspirated'],
  ['Transmission', 'Idea → Build, no manual mode'],
  ['0 → rabbit hole', 'about three clicks'],
  ['Drive modes', 'Deep focus · Creative · Conversation'],
  ['Sensors', 'Camera always on (see: Field of View)'],
  ['Known quirk', 'Opens many tabs to answer one question'],
  ['Service interval', 'Every time a new model ships'],
  ['Languages', 'English · Hindi · Gujarati · Java · Python · TypeScript'],
  ['Warranty', "Lifetime of learning, non-transferable"],
];

export const manifesto = ['Stay curious.', 'Explore widely.', 'Understand deeply.', 'Build relentlessly.', 'Connect unexpected ideas.'];

export const learning = ['Curiosity', 'Deep dive', 'Experiment', 'Build', 'Question', 'Iterate', 'Master'];
