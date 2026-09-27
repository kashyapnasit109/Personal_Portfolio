import { useEffect, useRef } from 'react';
import { gsap, prefersReduced } from '../../lib/motion';

const TERMS = ['engineering', 'design', 'performance', 'technology', 'comfort', 'human experience'];

export default function CarEquation() {
  const root = useRef(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      const parts = root.current.querySelectorAll('[data-term]');
      gsap.set(parts, { autoAlpha: 0.08 });
      gsap.to(parts, { autoAlpha: 1, stagger: 0.5, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="bg-ivory py-[clamp(96px,12vw,180px)] text-ink" aria-labelledby="car-title">
      <div className="frame">
        <span className="label text-glass-deep">Chapter 07 · A weakness for automobiles</span>
        <h2 id="car-title" className="sr-only-f">What a car is, to me</h2>
        <p className="mt-10 font-display text-[clamp(40px,6.2vw,108px)] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ fontStretch: '82%' }}>
          {TERMS.map((t, i) => (
            <span key={t}>
              <span data-term className="group relative inline-block cursor-default transition-colors duration-500 hover:text-glass-deep">
                {t}
                <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-glass-deep transition-transform duration-500 ease-expo group-hover:scale-x-100" />
              </span>
              {i < TERMS.length - 1 && <span data-term className="serif-i font-normal text-ink/35"> + </span>}
            </span>
          ))}
          <span data-term className="serif-i font-normal text-glass-deep"> = a car</span>
        </p>
        <p data-term className="mt-8 max-w-[48ch] font-serif text-[clamp(20px,1.8vw,26px)] italic text-ink/70">
          …and my attention for the next three hours. Mechanics, electronics, software and safety are converging into one object — which is exactly my kind of intersection.
        </p>
      </div>
    </section>
  );
}
