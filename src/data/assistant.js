export const assistantResponses = {
  greeting:
    "Hi — I'm the guide to Kashyap's work. Ask about his projects, the hackathon win, SIH, what he's building now, or how to reach him.",
  questions: [
    {
      patterns: ['project', 'built', 'work', 'portfolio', 'made'],
      answer:
        'Core projects: AUREX (enterprise intelligence platform — won the GDG × DezAI hackathon), VIGINT / SentinelVision (visual-intelligence system, selected at SIH university level), Satva Laser (a client site delivered to production) and Nexus Command (OCR attendance intelligence). In the lab: Hawk-i, an AI CCTV command center heading to enterprise deployment. Earlier work includes Saludecare, Silicon Lottery and a Construction Intelligence platform.',
    },
    {
      patterns: ['aurex', 'hackathon', 'win', 'gdg', 'dezai', 'enterprise'],
      answer:
        'AUREX solves three enterprise silos at once: Quant Studio (walk-forward backtesting that prevents look-ahead bias), DataMart (DuckDB OLAP over 1M+ rows with anomaly detection) and Aiden AI (a retail assistant grounded in warehouse tables, every answer stamped with a SHA-256 lineage hash). It won the GDG × DezAI hackathon and is deployed standalone at aurexaiden.vercel.app.',
    },
    {
      patterns: ['sih', 'vigint', 'sentinel', 'smart india', 'cctv', 'vision'],
      answer:
        'VIGINT is the main unified system. SentinelVision is its Smart India Hackathon track — AI forensic search across CCTV footage by keyword or reference image — and it was selected at the university level for further SIH rounds. Sentinel is the government-facing edition, kept as a separate build to avoid conflicts. Hawk-i is the derivative product for enterprises.',
    },
    {
      patterns: ['hawk', 'current', 'now', 'building', 'working on'],
      answer:
        'Right now Kashyap is building Hawk-i — a unified CCTV intelligence platform with six modules (ANPR, object misplacement, semantic search, velocity, unauthorized entry, threat detection), RBAC and a live alert lifecycle — and preparing it for client and enterprise deployment. In parallel, VIGINT is advancing through SIH.',
    },
    {
      patterns: ['satva', 'client', 'freelance', 'laser'],
      answer:
        'Satva Laser is a precision laser-cutting studio in Ahmedabad. Kashyap designed and built their site end to end — a self-drawing logo loader, scroll-driven canvas cinema and an inquiry cart that sends straight to WhatsApp. It is live at satva-laser.vercel.app.',
    },
    {
      patterns: ['nexus', 'attendance', 'ocr'],
      answer:
        'Nexus Command reads attendance from images using OCR, structures the records and shows each student where they stand. It is live at temp-app-delta.vercel.app.',
    },
    {
      patterns: ['skill', 'tech', 'stack', 'language', 'know'],
      answer:
        'Languages: Java, C, C++, JavaScript, TypeScript, Python, SQL. Interfaces: React 19, Next.js, Tailwind, GSAP, Three.js. Backend & data: Node/Express, FastAPI, MySQL, PostgreSQL + pgvector, DuckDB. AI & vision: YOLOv8, EasyOCR, ByteTrack, OpenCV, embeddings, grounded RAG. Plus DSA, DAA, networks, COA, MQTT and Docker.',
    },
    {
      patterns: ['education', 'study', 'college', 'university', 'semester', 'charusat'],
      answer:
        'Kashyap is a B.Tech Computer Science student at CHARUSAT University, currently in Semester 5.',
    },
    {
      patterns: ['contact', 'hire', 'intern', 'collaborate', 'email', 'reach', 'phone', 'call', 'instagram', 'linkedin', 'number'],
      answer:
        'Use the inquiry form on the Contact page — it drafts an email to kashyapnasit12345@gmail.com for you. You can also call +91 63557 02811, or find him on LinkedIn (kashyap-nasit-5240b3341) and Instagram (@kashyap__nasit). He is open to internships, client builds, hackathon team-ups and collaborations.',
    },
  ],
  fallback:
    "I don't have a precise answer for that — the fastest route is the inquiry form on the Contact page, which drafts a mail straight to Kashyap.",
};

export const suggestedQuestions = [
  'What did AUREX win?',
  'What is VIGINT / SentinelVision?',
  'What are you building now?',
  'Tell me about the client project',
  'What is your stack?',
];
