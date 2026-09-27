/*
  Every fact below is taken from the project's own repository, documentation or live build.
  Flagships = core projects. Lab = in active build. Archive = earlier work.
*/

export const flagships = [
  {
    id: 'aurex',
    index: '01',
    title: 'AUREX',
    kicker: 'Enterprise Intelligence Platform',
    badge: 'Winner — GDG × DezAI Hackathon',
    tone: 'lime',
    year: '2026',
    role: 'Team build · full-stack & architecture',
    status: 'Live · standalone deployment',
    summary:
      'Large enterprises run their quant desks, BI dashboards and customer AI as three disconnected silos. AUREX fuses them into one closed loop — data → analysis → intelligence → decision → action — and it won the GDG × DezAI hackathon it was built for.',
    problems: [
      {
        name: 'Quant Studio',
        text: 'Strategy backtesting with walk-forward isolation that structurally prevents look-ahead bias; Sharpe, Sortino, Calmar, drawdown and stress tests.',
      },
      {
        name: 'DataMart',
        text: 'DuckDB in-memory OLAP over 1M+ transactional rows with sub-second queries, z-score anomaly detection and natural-language → SQL.',
      },
      {
        name: 'Aiden AI',
        text: 'A grounded retail assistant that answers only from warehouse catalog tables and stamps every reply with a SHA-256 lineage hash — no hallucinated stock.',
      },
    ],
    stack: ['React 19', 'TypeScript', 'FastAPI', 'DuckDB', 'NumPy / Pandas', 'RAG', 'Recharts', 'Pub/Sub event bus'],
    shots: ['/img/aurex-ov.webp', '/img/aurex-quant.webp', '/img/aurex-dm.webp'],
    live: 'https://aurexaiden.vercel.app/app/overview',
    code: 'https://github.com/kashyapnasit109/AUREX/tree/main6',
  },
  {
    id: 'vigint',
    index: '02',
    title: 'VIGINT',
    kicker: 'SentinelVision · Sentinel — Visual Intelligence Network',
    badge: 'SIH — selected at university level',
    tone: 'cyan',
    year: '2026',
    role: 'Core system architect',
    status: 'Advancing to further SIH rounds',
    summary:
      'Our main system. VIGINT turns passive CCTV and isolated IoT sensors into a live incident-intelligence operating system: it perceives, fuses evidence across sensors, scores risk and coordinates response — with a cryptographic chain of custody for every clip.',
    problems: [
      {
        name: 'SentinelVision',
        text: 'The Smart India Hackathon track: AI forensic search over hours of footage by natural-language keyword or reference image, with timestamped, exportable, hash-sealed results.',
      },
      {
        name: 'Sentinel',
        text: 'The government-facing edition of the same unified system, kept as a separate build so both tracks evolve without conflicts.',
      },
      {
        name: 'Fusion core',
        text: 'YOLOv8 perception, CLIP embeddings in pgvector for search, multi-sensor evidence fusion to suppress false alarms, and SHA-256 sealed evidence dossiers.',
      },
    ],
    stack: ['Next.js', 'FastAPI', 'PyTorch', 'YOLOv8', 'FaceNet', 'CLIP + pgvector', 'MQTT', 'Docker'],
    shots: ['/img/vigint-home.webp', '/img/vigint-incidents.webp', '/img/vigint-verify.webp'],
    live: null,
    code: null,
  },
  {
    id: 'satva',
    index: '03',
    title: 'Satva Laser',
    kicker: 'Client project — precision laser-cut metal, Ahmedabad',
    badge: 'Delivered to client',
    tone: 'brass',
    year: '2026',
    role: 'Design & engineering, end to end',
    status: 'In production',
    summary:
      'A cinematic, multi-page site for a laser-cutting studio in Gota, Ahmedabad that makes architectural jaali screens, murals and bespoke metal fittings. Built to feel like the craft itself — and to turn browsing into enquiries.',
    problems: [
      {
        name: 'Brand as motion',
        text: 'The diamond mark draws itself edge by edge behind a glowing spark, and every page transition replays the same gesture.',
      },
      {
        name: 'Scroll cinema',
        text: 'A frame-by-frame canvas sequence with glass HUD overlays walks visitors through the cutting process.',
      },
      {
        name: 'Inquiry cart',
        text: 'Visitors collect pieces into a list and send it straight to the studio on WhatsApp — the shortest path from interest to order.',
      },
    ],
    stack: ['Vite multi-page', 'Vanilla JS', 'GSAP + ScrollTrigger', 'Canvas sequence', 'Design tokens'],
    shots: ['/img/satva-jaali-partition.webp', '/img/satva-tree-mural.webp', '/img/satva-horse-mural.webp'],
    live: 'https://satva-laser.vercel.app/',
    code: 'https://github.com/kashyapnasit109/SATVA',
  },
  {
    id: 'nexus',
    index: '04',
    title: 'Nexus Command',
    kicker: 'OCR-powered attendance intelligence',
    badge: 'Core project',
    tone: 'ivory',
    year: '2025',
    role: 'Solo build',
    status: 'Live',
    summary:
      'Attendance tracking without the spreadsheet. Nexus reads attendance straight from images with OCR, cleans it into structured records and gives every student a dashboard of where they stand — with Google sign-in and profile onboarding.',
    problems: [
      { name: 'Capture', text: 'Upload a photo of the register or portal; OCR extracts the rows.' },
      { name: 'Structure', text: 'Records are cleaned and stored per subject, per day.' },
      { name: 'Decide', text: 'A dashboard shows standing and what it takes to stay above the line.' },
    ],
    stack: ['React.js', 'OCR engine', 'REST APIs', 'Google auth'],
    shots: [],
    live: 'https://temp-app-delta.vercel.app/',
    code: null,
  },
];

export const lab = {
  id: 'hawk-i',
  title: 'Hawk-i',
  kicker: 'Unified AI-powered CCTV intelligence',
  status: 'In active build — preparing client & enterprise deployment',
  relation:
    'Hawk-i is the productised derivative of VIGINT: the same perception core, packaged as a security command center that a campus, society or enterprise can install and run.',
  modules: [
    { n: '01', name: 'ANPR', text: 'YOLOv8 plate detection + EasyOCR, matched against the registered-vehicle database.' },
    { n: '02', name: 'Object misplacement', text: 'Reference-vs-current frame differencing flags new or missing objects.' },
    { n: '03', name: 'Semantic search', text: 'MiniLM embeddings let operators search event history in plain language.' },
    { n: '04', name: 'Velocity', text: 'ByteTrack tracking with perspective calibration estimates vehicle speed live.' },
    { n: '05', name: 'Unauthorized entry', text: 'Perimeter polygons correlated with gate logs to separate visitors from intruders.' },
    { n: '06', name: 'Threat & anomaly', text: 'Rule heuristics over detections — loitering at night, weapon classes, crowding.' },
  ],
  platform: ['JWT RBAC — Admin / Operator / Viewer', 'Node + Express gateway', 'Python FastAPI ML service', 'MySQL with offline fallback', 'Live alert lifecycle'],
  shot: '/img/hawki-dash.webp',
  code: 'https://github.com/kashyapnasit109/CS030_HAWK-I',
};

export const archive = [
  {
    id: 'construction-ai',
    title: 'Construction Intelligence Platform',
    tag: 'AI & automation',
    period: 'Sem 04 → now',
    text: 'Daily site reports, material use and transactions for our family construction firm, queryable in natural language ("how much steel went to site X this week?").',
    stack: ['React', 'Node.js', 'NoSQL', 'NLP'],
    live: 'https://docqa-henna.vercel.app/',
    code: 'https://github.com/kashyapnasit109/DOQ_KB',
  },
  {
    id: 'saludecare',
    title: 'Saludecare',
    tag: 'Database systems',
    period: 'Sem 04',
    text: 'Team hospital-management system; I owned the data layer — patients, doctors, appointments and records modelled with clean entity relationships.',
    stack: ['SQL', 'Entity modelling', 'Backend logic'],
    live: 'https://saludecare.vercel.app',
    code: null,
  },
  {
    id: 'silicon-lottery',
    title: 'Silicon Lottery',
    tag: 'Educational web',
    period: 'Sem 04',
    text: 'An interactive explainer that turns wafer fabrication and chip binning — dry COA theory — into something you can explore.',
    stack: ['React', 'Vite', 'CSS'],
    live: 'https://silicon-lottery.vercel.app',
    code: null,
  },
  {
    id: 'algo-lab',
    title: 'Algorithmic Thinking Lab',
    tag: 'Computer science',
    period: 'Ongoing',
    text: 'A running practice of implementing, analysing and comparing DSA/DAA approaches — why an algorithm works and how it scales, not just that it passes.',
    stack: ['Java', 'C++', 'Complexity analysis'],
    live: null,
    code: null,
  },
  {
    id: 'voice-car',
    title: 'Voice-Controlled Robotic Car',
    tag: 'Hardware & IoT',
    period: 'Sem 01',
    text: 'Team build: Arduino car driven by voice commands with ultrasonic obstacle avoidance — my first taste of software moving the physical world.',
    stack: ['Arduino', 'C/C++', 'Sensors'],
    live: null,
    code: null,
  },
];
