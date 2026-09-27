/*
  The journey, retold. Facts come from Kashyap's own account; the voice is lighter, but the
  12th-grade chapter is told straight — the humour never lands on it.
*/

// pins sit exactly on segment end-points of the "actual route" path in RouteMap
export const routePins = [
  { id: 'c10', short: '10th', x: 200, y: 290, label: 'Class 10', note: '90%. Discovered consistency. Boring superpower, works every time.' },
  { id: 'c11', short: '11th', x: 320, y: 235, label: 'Class 11', note: '87%. Science enters the chat; "why" beats "what".' },
  { id: 'c12', short: '12th', x: 430, y: 370, label: 'Class 12', note: 'The detour. An accident mid-boards; wrote the rest with a scribe.', detour: true },
  { id: 's1', short: 'Sem 1', x: 560, y: 190, label: 'Semester 1', note: 'Hello, world — the real one.' },
  { id: 's2', short: 'Sem 2', x: 680, y: 220, label: 'Semester 2', note: 'Studying → applying.' },
  { id: 's3', short: 'Sem 3', x: 840, y: 180, label: 'Semester 3', note: 'Everything is secretly connected.' },
  { id: 's4', short: 'Sem 4', x: 1000, y: 130, label: 'Semester 4', note: '"Why isn\'t this working?" → "Okay. Let\'s figure it out."' },
  { id: 's5', short: 'Sem 5', x: 1100, y: 70, label: 'Semester 5', note: 'A hackathon win, an SIH round, a live client.' },
  { id: 'now', short: 'Now', x: 1160, y: 55, label: 'Now', note: 'Still learning. Still building. Still becoming.' },
];

export const routePath =
  'M40,360 C120,340 150,300 200,290 C250,280 270,240 320,235 C380,228 400,300 390,340 C380,390 300,400 300,360 C300,320 380,330 430,370 C480,410 520,330 540,300 C570,250 520,210 560,190 C600,170 640,230 680,220 C720,210 700,150 750,140 C800,130 790,200 840,180 C880,165 860,110 910,100 C960,90 950,150 1000,130 C1050,110 1060,70 1100,70 C1130,70 1150,60 1160,55';

export const school = [
  {
    grade: 'Class 10',
    stat: 90,
    suffix: '%',
    word: 'Discipline',
    icon: 'books',
    front: 'The foundation',
    back: "Found the least glamorous cheat code there is: consistency. Show up, do the work, repeat — especially when nobody's watching.",
    lesson: "A strong foundation doesn't decide how far you'll go. It gives you the nerve to start.",
  },
  {
    grade: 'Class 11',
    stat: 87,
    suffix: '%',
    word: 'Curiosity',
    icon: 'atom',
    front: 'Science enters the chat',
    back: 'Physics, chemistry and maths arrived — and "why does this work?" turned out to be far more fun than "what\'s the answer?". Science stopped being subjects and became a language.',
    lesson: "Don't just learn the answer. Learn the mechanism behind it.",
  },
  {
    grade: 'Class 12',
    stat: null,
    statText: 'Plot twist',
    word: 'Resilience',
    icon: 'detour',
    front: 'The unexpected chapter',
    back: 'Two board papers in, a serious accident put me in hospital. I wrote the remaining papers with a scribe — dictating what you know is an exam of its own. The marks took a hit. The person got an upgrade.',
    lesson: "A marksheet describes one moment. It doesn't get to define a person.",
  },
];

export const semesters = [
  {
    n: '01',
    word: 'Discover',
    icon: 'compass',
    title: 'Hello, world. The real one.',
    body: 'New campus, new people, first real programs. Learned there is a huge gap between knowing something and building something with it — and that the gap is where the fun lives.',
    ships: ['Voice-controlled robot car — it listened better than some people'],
    diff: ['+ programming, for real', '+ new people, new ideas', '- comfort zone'],
  },
  {
    n: '02',
    word: 'Apply',
    icon: 'wrench',
    title: 'From "what do I study?" to "what can I build?"',
    body: 'Programming got practical and concepts started holding hands. C, C++ and Java, and my first long arguments with a compiler. The compiler won most of them.',
    ships: ['C · C++ · Java foundations', 'Algorithmic Thinking Lab begins'],
    diff: ['+ hands-on everything', '+ compiler arguments (lost most)', '- learning by rote'],
  },
  {
    n: '03',
    word: 'Connect',
    icon: 'graph',
    title: 'Everything is secretly connected.',
    body: 'AI, ML, data structures, networks, the web — they stopped looking like separate subjects. A data structure becomes part of an intelligent system; a web page becomes the front door to a whole stack.',
    ships: ['Data structures, properly', 'First ML experiments', 'Systems thinking: unlocked'],
    diff: ['+ systems thinking', '+ 40 new browser tabs', '- subjects in silos'],
  },
  {
    n: '04',
    word: 'Build',
    icon: 'hammer',
    title: 'Bigger projects, braver bugs.',
    body: 'Real problem statements, architectures that had to be redrawn, and ideas that sounded brilliant right up until they met reality. The real skill I picked up: building with uncertainty.',
    ships: ['Nexus Command', 'Saludecare', 'Silicon Lottery', 'Construction Intelligence'],
    diff: ['+ building with uncertainty', '+ architectures, redesigned (plural)', '- fear of a red build'],
  },
  {
    n: '05',
    word: 'Evolve',
    icon: 'rocket',
    title: 'Engineering the bigger picture.',
    body: 'AI × research × software × business × design. Projects stopped being assignments and became questions: can it be smarter, can it scale, can these work together, can it solve something real?',
    ships: ['AUREX — won GDG × DezAI', 'VIGINT — cleared SIH university round', 'Satva Laser — live for a client', 'Hawk-i — in build'],
    diff: ['+ product thinking', '+ one hackathon trophy', '- "it\'s just an assignment"'],
  },
];

export const evolution = [
  ['Discipline', 'Class 10'],
  ['Curiosity', 'Class 11'],
  ['Resilience', 'Class 12'],
  ['Discover', 'Sem 1'],
  ['Apply', 'Sem 2'],
  ['Connect', 'Sem 3'],
  ['Build', 'Sem 4'],
  ['Evolve', 'Sem 5'],
  ['Create', 'Next'],
];

export const teachers = [
  ['The accident', 'resilience'],
  ['Science', 'curiosity'],
  ['Engineering', 'application'],
  ['Projects', 'persistence'],
  ['Research', 'to question'],
  ['Technology', 'to build'],
];

export const buildLog = [
  { t: 'cmd', s: '$ npm run semester-4' },
  { t: 'dim', s: '> compiling ideas…' },
  { t: 'err', s: '✖ TypeError: idea.meetsReality is not a function' },
  { t: 'err', s: '✖ ArchitectureError: the boxes are still arguing' },
  { t: 'warn', s: '⚠ 1,204 × console.log("here") detected' },
  { t: 'dim', s: '> "why isn\'t this working?"' },
  { t: 'dim', s: '> "okay. let\'s figure it out." — retrying with persistence, coffee, one more tab' },
  { t: 'ok', s: '✓ architecture redesigned (v3_final_FINAL)' },
  { t: 'ok', s: '✓ built in 1 semester · 0 errors · several lessons' },
];
