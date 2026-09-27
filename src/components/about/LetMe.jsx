import { useEffect, useRef } from 'react';
import { gsap, prefersReduced } from '../../lib/motion';

const LINES = [
  ['Let me', 'understand', 'this.'],
  ['Let me figure out', 'how it', 'works.'],
  ['Let me see if I can build', 'something', 'better.'],
];

/* Three sentences that describe the whole method; each lights up as it crosses the centre. */
export default function LetMe() {
  const root = useRef(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      root.current.querySelectorAll('[data-line]').forEach((el) => {
        gsap.fromTo(el, { opacity: 0.12, x: -30 }, { opacity: 1, x: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 45%', scrub: 0.6 } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="bg-ink pb-[clamp(96px,12vw,180px)]" aria-labelledby="letme-title">
      <div className="frame">
        <span id="letme-title" className="label text-glass">Chapter 10 · The whole method, in three sentences</span>
        <div className="mt-12 space-y-8">
          {LINES.map(([a, b, c]) => (
            <p key={b} data-line className="font-display text-[clamp(44px,7.4vw,132px)] font-semibold leading-[0.95] tracking-[-0.04em]" style={{ fontStretch: '80%' }}>
              {a} <span className="serif-i font-normal text-glass">{b}</span> {c}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
