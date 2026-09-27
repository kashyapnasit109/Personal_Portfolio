import { useEffect, useMemo, useRef, useState } from 'react';
import { revealWords } from '../../lib/motion';

/*
  Stack X-ray. Hover (or tap) a tool to light up every project it shipped in; hover a project
  to see what it is made of. Mappings come straight from each project's own stack list.
*/
const TECH = [
  ['React', ['AUREX', 'Nexus Command', 'Construction AI', 'Silicon Lottery', 'This portfolio']],
  ['TypeScript', ['AUREX']],
  ['Python', ['AUREX', 'VIGINT', 'Hawk-i']],
  ['FastAPI', ['AUREX', 'VIGINT', 'Hawk-i']],
  ['DuckDB / OLAP', ['AUREX']],
  ['Grounded RAG', ['AUREX']],
  ['YOLOv8', ['VIGINT', 'Hawk-i']],
  ['PyTorch', ['VIGINT']],
  ['Embeddings + vector search', ['VIGINT', 'Hawk-i']],
  ['OCR', ['Nexus Command', 'Hawk-i']],
  ['ByteTrack', ['Hawk-i']],
  ['Next.js', ['VIGINT']],
  ['Node + Express', ['Hawk-i', 'Construction AI']],
  ['SQL', ['Saludecare', 'Hawk-i']],
  ['MQTT / IoT', ['VIGINT']],
  ['Docker', ['VIGINT']],
  ['GSAP + ScrollTrigger', ['Satva Laser', 'This portfolio']],
  ['Canvas / WebGL', ['Satva Laser', 'This portfolio']],
  ['Vanilla JS', ['Satva Laser']],
  ['NLP querying', ['Construction AI', 'AUREX']],
  ['Java · C++', ['Algorithmic Thinking Lab']],
  ['Arduino · sensors', ['Voice-controlled car']],
];
const PROJECTS = ['AUREX', 'VIGINT', 'Hawk-i', 'Satva Laser', 'Nexus Command', 'Construction AI', 'Saludecare', 'Silicon Lottery', 'Algorithmic Thinking Lab', 'Voice-controlled car', 'This portfolio'];

export default function StackXray() {
  const [tech, setTech] = useState(null);
  const [proj, setProj] = useState(null);
  const title = useRef(null);
  useEffect(() => { revealWords(title.current); }, []);

  const litProjects = useMemo(() => (tech ? new Set(TECH.find((t) => t[0] === tech)[1]) : null), [tech]);
  const litTech = useMemo(() => (proj ? new Set(TECH.filter((t) => t[1].includes(proj)).map((t) => t[0])) : null), [proj]);

  const caption = tech
    ? `${tech} → ${litProjects.size} project${litProjects.size > 1 ? 's' : ''}${litProjects.size >= 4 ? '. Clearly overworked.' : '.'}`
    : proj
      ? `${proj} ← ${litTech.size} tool${litTech.size > 1 ? 's' : ''} inside.`
      : 'Hover a tool to see where it shipped. Hover a project to see its insides.';

  return (
    <section className="bg-ink py-[clamp(90px,11vw,170px)]" aria-labelledby="xray-title">
      <div className="frame">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="label text-glass">Stack X-ray</span>
            <h2 id="xray-title" ref={title} className="display mt-5 text-[clamp(52px,7vw,120px)]">
              What’s <span data-nosplit className="serif-i font-normal text-glass">inside.</span>
            </h2>
          </div>
          <p className="label min-h-[2.8em] text-ivory/60 md:col-span-4 md:col-start-9 md:text-right" aria-live="polite">{caption}</p>
        </div>

        <div className="mt-12 grid gap-10 rounded-[18px] border hairline bg-ink-2/60 p-6 md:p-10 lg:grid-cols-12">
          <ul className="flex flex-wrap content-start gap-2 lg:col-span-7" aria-label="Tools">
            {TECH.map(([t]) => {
              const on = tech === t || (litTech && litTech.has(t));
              const dim = (tech && tech !== t) || (litTech && !litTech.has(t));
              return (
                <li key={t}>
                  <button
                    type="button"
                    onPointerEnter={() => { setProj(null); setTech(t); }}
                    onPointerLeave={() => setTech(null)}
                    onFocus={() => { setProj(null); setTech(t); }}
                    onBlur={() => setTech(null)}
                    onClick={() => setTech((v) => (v === t ? null : t))}
                    className={`rounded-full border px-4 py-2 text-[14px] transition-all duration-300 ${on ? 'scale-105 border-glass bg-glass text-ink' : 'border-white/15 text-ivory/80 hover:border-white/40'} ${dim && !on ? 'opacity-30' : ''}`}
                  >
                    {t}
                  </button>
                </li>
              );
            })}
          </ul>
          <ul className="lg:col-span-5" aria-label="Projects">
            {PROJECTS.map((p) => {
              const on = proj === p || (litProjects && litProjects.has(p));
              const dim = (proj && proj !== p) || (litProjects && !litProjects.has(p));
              return (
                <li key={p}>
                  <button
                    type="button"
                    onPointerEnter={() => { setTech(null); setProj(p); }}
                    onPointerLeave={() => setProj(null)}
                    onFocus={() => { setTech(null); setProj(p); }}
                    onBlur={() => setProj(null)}
                    onClick={() => setProj((v) => (v === p ? null : p))}
                    className={`flex w-full items-center justify-between border-b hairline py-2.5 text-left font-display text-[clamp(20px,2vw,28px)] font-semibold tracking-[-0.02em] transition-all duration-300 ${on ? 'translate-x-2 text-glass' : 'text-ivory'} ${dim && !on ? 'opacity-25' : ''}`}
                  >
                    {p}
                    <span className={`h-2 w-2 rounded-full transition-all duration-300 ${on ? 'scale-150 bg-glass' : 'bg-white/15'}`} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
