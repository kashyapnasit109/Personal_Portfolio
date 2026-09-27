/* Build Map — each semester is a structural layer. `now: true` marks where we are today. */
export const timelineData = [
  {
    year: '2024',
    label: 'Hardware Automation',
    semester: 'Semester 1',
    description:
      'First exposure to embedded systems, electronics and sensor-based automation through a voice-controlled, obstacle-avoiding robotic car.',
    projects: ['Voice-Controlled Car'],
  },
  {
    year: '2025',
    label: 'Core Programming + DSA',
    semester: 'Semester 2–3',
    description:
      'Built strong foundations in C, C++, Java, data structures and algorithmic thinking — reasoning about why an approach works and how it scales.',
    projects: ['Algorithmic Thinking Lab'],
  },
  {
    year: '2025–26',
    label: 'Web Systems + Database',
    semester: 'Semester 4',
    description:
      'Applied programming to real systems — OCR attendance tracking, a hospital data layer, an interactive COA explainer, and the first version of this portfolio.',
    projects: ['Nexus Command', 'Saludecare', 'Silicon Lottery', 'Construction AI'],
  },
  {
    year: '2026',
    label: 'Shipping to the Real World',
    semester: 'Semester 5 · now',
    now: true,
    description:
      'Delivered a production site to a real client, and won the GDG × DezAI hackathon with AUREX — an enterprise platform unifying quant, analytics and grounded AI.',
    projects: ['Satva Laser', 'AUREX — Winner'],
  },
  {
    year: '2026',
    label: 'Vision Intelligence',
    semester: 'Semester 5 · now',
    now: true,
    description:
      'Architecting VIGINT, our unified visual-intelligence system: SentinelVision cleared the SIH university round and advances; Sentinel serves the government track; Hawk-i productises the core for enterprises.',
    projects: ['VIGINT / SentinelVision', 'Sentinel', 'Hawk-i'],
  },
  {
    year: 'Next',
    label: 'Edge AI + Scale',
    semester: 'Pathways ahead',
    description:
      'Taking Hawk-i to its first client and enterprise deployments, pushing VIGINT through the next SIH rounds, and going deeper into edge inference, vector search and distributed, event-driven systems.',
    projects: ['Hawk-i rollout', 'SIH next rounds', 'Construction AI v2'],
  },
];

/* What I am learning next — shown with the Journey */
export const pathways = [
  { area: 'Edge inference', detail: 'ONNX / TensorRT INT8 quantisation so vision models run on modest field hardware.' },
  { area: 'Retrieval systems', detail: 'Embeddings, pgvector HNSW indexes and grounded RAG that can prove its sources.' },
  { area: 'Distributed systems', detail: 'Event buses, MQTT telemetry and services that stay correct under load and failure.' },
  { area: 'Creative engineering', detail: 'WebGL, shaders and motion systems — interfaces that explain, not just decorate.' },
];
