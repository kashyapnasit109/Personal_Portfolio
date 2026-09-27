import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, prefersReduced } from '../../lib/motion';

const LOOP = [
  { w: 'Curiosity', t: 'Something small refuses to make sense.' },
  { w: 'Deep dive', t: 'Docs, papers, source code, a whiteboard, snacks.' },
  { w: 'Experiment', t: 'Poke it until it does something unexpected.' },
  { w: 'Build', t: 'Turn the understanding into a thing that runs.' },
  { w: 'Question', t: 'Why does it work? Where does it break?' },
  { w: 'Iterate', t: 'Again, but less wrong.' },
  { w: 'Master', t: '…which is just a better question. Back to curiosity.' },
];

export default function LearningLoop() {
  const sec = useRef(null);
  const [i, setI] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 680px)');
    const f = () => setPinned(mq.matches && !prefersReduced());
    f();
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);

  useEffect(() => {
    if (!pinned) {
      if (prefersReduced()) return;
      const id = setInterval(() => setI((v) => (v + 1) % LOOP.length), 2200);
      return () => clearInterval(id);
    }
    const st = ScrollTrigger.create({
      trigger: sec.current, start: 'top top', end: '+=180%', pin: true, scrub: true, refreshPriority: 1,
      onUpdate: (s) => setI(Math.min(LOOP.length - 1, Math.floor(s.progress * LOOP.length))),
    });
    ScrollTrigger.refresh();
    return () => st.kill();
  }, [pinned]);

  const R = 42;
  const ang = (k) => (k / LOOP.length) * Math.PI * 2 - Math.PI / 2;
  return (
    <div className="pin-host">
      <section ref={sec} className="relative overflow-hidden bg-ink" aria-labelledby="loop-title">
      <div className="frame grid min-h-[100svh] items-center gap-10 py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="label text-glass">Chapter 05 · How I learn</span>
          <h2 id="loop-title" className="display mt-5 text-[clamp(52px,6.4vw,112px)]">
            It's a <span className="serif-i font-normal text-glass">loop</span>, not a ladder.
          </h2>
          <p className="mt-6 max-w-[38ch] text-[15px] leading-relaxed text-ivory/65">
            I don't memorise things I don't understand. Every new subject gets wired into something I already know — which is why my knowledge is interdisciplinary and my bookmarks are a crime scene.
          </p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[min(78vw,70vh)] lg:col-span-7 lg:col-start-6">
          <svg viewBox="-50 -50 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <circle r={R} fill="none" stroke="rgba(236,231,221,0.12)" strokeWidth="0.25" />
            <circle
              r={R}
              fill="none"
              stroke="#9db8ff"
              strokeWidth="0.45"
              strokeDasharray={`${((i + 1) / LOOP.length) * 2 * Math.PI * R} ${2 * Math.PI * R}`}
              transform="rotate(-90)"
              style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.16,1,0.3,1)' }}
            />
            {LOOP.map((s, k) => {
              const x = Math.cos(ang(k)) * R;
              const y = Math.sin(ang(k)) * R;
              const on = k <= i;
              return (
                <g key={s.w} transform={`translate(${x} ${y})`}>
                  <circle r={k === i ? 2.2 : 1.1} fill={on ? '#9db8ff' : '#06080d'} stroke={on ? '#9db8ff' : 'rgba(236,231,221,0.35)'} strokeWidth="0.3" style={{ transition: 'all 0.6s' }} />
                  <text
                    x={Math.cos(ang(k)) * 7}
                    y={Math.sin(ang(k)) * 7 + 1.2}
                    textAnchor={Math.abs(Math.cos(ang(k))) < 0.2 ? 'middle' : Math.cos(ang(k)) > 0 ? 'start' : 'end'}
                    fontSize="3"
                    fontFamily="JetBrains Mono Variable, monospace"
                    fill={k === i ? '#ECE7DD' : 'rgba(236,231,221,0.45)'}
                    style={{ letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'fill 0.5s' }}
                  >
                    {s.w}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="absolute inset-[22%] flex flex-col items-center justify-center text-center">
            <span className="label text-ivory/45">{String(i + 1).padStart(2, '0')} / 07</span>
            <div className="relative mt-3 h-[1.1em] w-full overflow-hidden text-[clamp(40px,5vw,84px)]">
              {LOOP.map((s, k) => (
                <span
                  key={s.w}
                  className="display absolute inset-x-0 top-0 transition-transform duration-700 ease-quart"
                  style={{ transform: `translateY(${k === i ? 0 : k < i ? -110 : 110}%)` }}
                >
                  {s.w}
                </span>
              ))}
            </div>
            <p className="mt-3 max-w-[26ch] font-serif text-[clamp(17px,1.5vw,22px)] italic text-ivory/75">{LOOP[i].t}</p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
