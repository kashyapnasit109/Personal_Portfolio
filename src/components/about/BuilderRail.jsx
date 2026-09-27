import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReduced } from '../../lib/motion';

const STEPS = [
  { w: 'Idea', t: 'Usually arrives around 1 a.m., uninvited and very confident.' },
  { w: 'Research', t: 'Papers, repos, and the fourth page of search results nobody visits.' },
  { w: 'Experiment', t: 'Ten small prototypes. Nine exist to teach me what not to do.' },
  { w: 'Architecture', t: 'Boxes and arrows until the arrows finally make sense. See: VIGINT.' },
  { w: 'Building', t: 'The part people think is the whole job. It is roughly a third.' },
  { w: 'Breaking', t: 'On purpose — before a jury, a client or production does it for me.' },
  { w: 'Debugging', t: 'Also on purpose. Mostly. The rubber duck has seen things.' },
  { w: 'Refinement', t: 'Where "it works" slowly becomes "it feels right".' },
  { w: 'Presentation', t: 'Delivery is a feature. AUREX won its hackathon on this step.' },
];

export default function BuilderRail() {
  const sec = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 680px)');
    const f = () => setPinned(mq.matches && !prefersReduced());
    f();
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const ctx = gsap.context(() => {
      const dist = () => track.current.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: sec.current, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, refreshPriority: 1,
          onUpdate: (s) => { bar.current.style.transform = `scaleX(${s.progress})`; },
        },
      });
    }, sec);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pinned]);

  return (
    <div className="pin-host">
      <section ref={sec} className="relative overflow-hidden bg-ivory text-ink" aria-labelledby="rail-title">
      <div className={pinned ? 'flex h-[100svh] flex-col justify-center' : 'py-24'}>
        <div className="frame mb-10 flex items-end justify-between">
          <div>
            <span className="label text-glass-deep">Chapter 04 · How things get built here</span>
            <h2 id="rail-title" className="display mt-4 text-[clamp(52px,7vw,120px)]">
              Nine steps, <span className="serif-i font-normal text-glass-deep">two</span> of them fun.
            </h2>
          </div>
          <span className="label hidden text-ink/50 md:block">Actually all nine</span>
        </div>
        <div ref={track} className={`flex gap-4 px-[var(--gutter)] ${pinned ? 'w-max' : 'no-scrollbar snap-x overflow-x-auto'}`}>
          {STEPS.map((s, i) => (
            <article
              key={s.w}
              className="roll-group group relative flex h-[46vh] min-h-[320px] w-[min(80vw,380px)] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[8px] border border-ink/15 bg-ivory-2/50 p-7 transition-colors duration-700 hover:bg-ink hover:text-ivory"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-ink/50 group-hover:text-ivory/50">{String(i + 1).padStart(2, '0')} / 09</span>
                {(s.w === 'Breaking' || s.w === 'Debugging') && <span className="label rounded-full bg-glass px-2.5 py-1 text-ink">the fun part</span>}
              </div>
              <div>
                <h3 className="display text-[clamp(44px,4vw,68px)]">{s.w}</h3>
                <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-ink/65 group-hover:text-ivory/70">{s.t}</p>
              </div>
              <span className="pointer-events-none absolute -bottom-8 -right-3 font-display text-[180px] font-bold leading-none text-ink/[0.04] group-hover:text-ivory/[0.06]">{i + 1}</span>
            </article>
          ))}
          <div className="w-[8vw] shrink-0" />
        </div>
        <div className="frame mt-10">
          <div className="h-px w-full bg-ink/15"><div ref={bar} className="h-px origin-left bg-ink" style={{ transform: 'scaleX(0)' }} /></div>
        </div>
      </div>
    </section>
    </div>
  );
}
