import { useEffect, useRef, useState } from 'react';
import { FiPlus, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { archive } from '../data/projects';
import { revealBlocks } from '../lib/motion';
import RollText from './RollText';
import Roll from './Roll';

export default function Archive() {
  const root = useRef(null);
  const [open, setOpen] = useState(null);
  useEffect(() => revealBlocks(root.current), []);

  return (
    <section ref={root} className="bg-ink pb-[clamp(96px,12vw,180px)] pt-[clamp(64px,8vw,120px)]" aria-labelledby="archive-title">
      <div className="frame">
        <div data-reveal className="flex items-end justify-between border-b hairline pb-5">
          <h2 id="archive-title" className="font-display text-[clamp(32px,4vw,56px)] font-semibold tracking-[-0.03em]">
            More from the <span className="serif-i font-normal text-glass">archive</span>
          </h2>
          <span className="label hidden text-mute md:block">{archive.length} projects</span>
        </div>

        <ul>
          {archive.map((a, i) => {
            const isOpen = open === a.id;
            return (
              <li key={a.id} data-reveal className="group/row relative border-b hairline">
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-glass/[0.06] transition-transform duration-700 ease-expo group-hover/row:scale-x-100" />
                <button
                  onClick={() => setOpen(isOpen ? null : a.id)}
                  aria-expanded={isOpen}
                  aria-controls={`arc-${a.id}`}
                  className="roll-group group relative grid w-full grid-cols-[32px_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[48px_1fr_200px_140px_40px] md:py-7"
                >
                  <span className="font-mono text-[12px] text-ivory/40">0{i + 1}</span>
                  <span className="font-display text-[clamp(22px,2.6vw,36px)] font-semibold tracking-[-0.025em] transition-transform duration-700 ease-expo group-hover:translate-x-3">
                    <RollText text={a.title} />
                  </span>
                  <span className="label hidden text-ivory/50 md:block">{a.tag}</span>
                  <span className="label hidden text-ivory/50 md:block">{a.period}</span>
                  <FiPlus aria-hidden="true" className={`justify-self-end text-xl transition-transform duration-500 ease-expo ${isOpen ? 'rotate-45 text-glass' : ''}`} />
                </button>
                <div
                  id={`arc-${a.id}`}
                  className="grid transition-[grid-template-rows] duration-700 ease-expo"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pb-8 md:grid-cols-[48px_1fr_380px] md:gap-4">
                      <span />
                      <p className="max-w-[60ch] text-[15px] leading-relaxed text-ivory/70">{a.text}</p>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          {a.stack.map((s) => (
                            <span key={s} className="font-mono text-[11px] text-ivory/45">{s}</span>
                          ))}
                        </div>
                        <div className="flex gap-5">
                          {a.live && (
                            <a href={a.live} target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.14em]">
                              <Roll>Live</Roll> <FiArrowUpRight aria-hidden="true" />
                            </a>
                          )}
                          {a.code && (
                            <a href={a.code} target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.14em]">
                              <FiGithub aria-hidden="true" /> <Roll>Code</Roll>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
