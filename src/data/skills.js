/* `n: true` = picked up during Semester 5 */
export const skillGroups = [
  {
    id: 'lang',
    title: 'Languages',
    note: 'Structured, object-oriented and memory-level thinking.',
    skills: [
      { name: 'Java' }, { name: 'C' }, { name: 'C++' }, { name: 'JavaScript' },
      { name: 'TypeScript', n: true }, { name: 'Python', n: true }, { name: 'SQL' },
    ],
  },
  {
    id: 'ui',
    title: 'Interfaces',
    note: 'Component systems, motion and 3D that carry meaning.',
    skills: [
      { name: 'React 19' }, { name: 'Next.js', n: true }, { name: 'Tailwind CSS' },
      { name: 'GSAP + ScrollTrigger', n: true }, { name: 'Three.js / WebGL', n: true }, { name: 'Framer Motion' }, { name: 'Recharts', n: true },
    ],
  },
  {
    id: 'data',
    title: 'Backend & Data',
    note: 'APIs and data layers that stay correct.',
    skills: [
      { name: 'Node + Express', n: true }, { name: 'FastAPI', n: true }, { name: 'MySQL' }, { name: 'PostgreSQL + pgvector', n: true },
      { name: 'DuckDB (OLAP)', n: true }, { name: 'NoSQL' }, { name: 'REST · WebSockets' }, { name: 'JWT · RBAC', n: true },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Vision',
    note: 'Models wired into systems people can trust.',
    skills: [
      { name: 'YOLOv8', n: true }, { name: 'EasyOCR', n: true }, { name: 'ByteTrack', n: true }, { name: 'OpenCV', n: true },
      { name: 'CLIP / MiniLM embeddings', n: true }, { name: 'Grounded RAG', n: true }, { name: 'OCR pipelines' }, { name: 'NL querying' },
    ],
  },
  {
    id: 'sys',
    title: 'Systems & CS',
    note: 'The fundamentals underneath everything else.',
    skills: [
      { name: 'Data Structures' }, { name: 'DAA' }, { name: 'Computer Networks' }, { name: 'Computer Organization' },
      { name: 'MQTT / IoT', n: true }, { name: 'Docker', n: true }, { name: 'Vercel · Render', n: true }, { name: 'Git' },
    ],
  },
];
