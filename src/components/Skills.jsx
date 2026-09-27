import { useEffect, useRef } from 'react';
import { skillGroups } from '../data/skills';
import { revealBlocks, revealWords } from '../lib/motion';

export default function Skills() {
  const root = useRef(null);
  const title = useRef(null);
  useEffect(() => {
    revealWords(title.current);
    revealBlocks(root.current);
  }, []);
  const added = skillGroups.flatMap((g) => g.skills).filter((s) => s.n).length;

  return (
    <section id="skills" ref={root} className="bg-ink py-[clamp(96px,12vw,180px)]" aria-labelledby="skills-title">
      <div className="frame grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="skills-title" ref={title} className="display text-[clamp(56px,8vw,128px)]">
              Tool<span className="serif-i text-glass" data-nosplit>kit</span>
            </h2>
            <p data-reveal className="mt-6 max-w-[34ch] text-[15px] leading-relaxed text-ivory/60">
              The foundations from four semesters, plus {added} tools and techniques picked up this semester while shipping AUREX, VIGINT, Hawk-i and Satva.
            </p>
            <div data-reveal className="mt-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-glass" />
              <span className="label text-ivory/60">New in Semester 05</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          {skillGroups.map((g, i) => (
            <div key={g.id} data-reveal className="grid gap-5 border-t hairline py-8 md:grid-cols-[220px_1fr]">
              <div>
                <span className="font-mono text-[11px] text-ivory/40">0{i + 1}</span>
                <h3 className="mt-2 font-display text-[26px] font-semibold tracking-[-0.02em]">{g.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-ivory/50">{g.note}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-2">
                {g.skills.map((s) => (
                  <li
                    key={s.name}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition-colors duration-500 ${
                      s.n ? 'border-glass/35 bg-glass/[0.06] text-ivory' : 'border-white/12 text-ivory/75 hover:border-white/30'
                    }`}
                    style={{ borderColor: s.n ? undefined : 'rgba(236,231,221,0.14)' }}
                  >
                    {s.n && <span className="h-1.5 w-1.5 rounded-full bg-glass" aria-label="new this semester" />}
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
