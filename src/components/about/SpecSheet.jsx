import { useEffect, useRef } from 'react';
import { specSheet } from '../../data/about';
import { gsap, prefersReduced, whenVisible } from '../../lib/motion';

/* The spec sheet I'd get if I were a car brochure. Rows draw in like a printout. */
export default function SpecSheet() {
  const root = useRef(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const rows = root.current.querySelectorAll('[data-row]');
    const badge = root.current.querySelector('[data-badge]');
    gsap.set(rows, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set(badge, { rotate: -18, scale: 0.6, autoAlpha: 0 });
    return whenVisible(root.current, () => {
      gsap.to(rows, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'expo.out', stagger: 0.07 });
      gsap.to(badge, { rotate: -8, scale: 1, autoAlpha: 1, duration: 1.2, ease: 'expo.out', delay: 0.2 });
    }, { margin: '0px 0px -25% 0px' });
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-ink py-[clamp(96px,12vw,180px)]" aria-labelledby="spec-title">
      <div className="frame grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="label text-glass">Chapter 08 · Technical data</span>
          <h2 id="spec-title" className="display mt-5 text-[clamp(56px,7vw,120px)]">
            KN<span className="serif-i font-normal text-glass">-05</span>
          </h2>
          <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-ivory/60">
            I like cars enough to describe myself as one. Figures are approximate; the test driver was very biased.
          </p>
          <div data-badge className="mt-10 inline-flex h-36 w-36 items-center justify-center rounded-full border-2 border-dashed border-glass/60 text-center">
            <span className="label leading-relaxed text-glass">Limited<br />edition<br />· 1 of 1 ·</span>
          </div>
        </div>
        <dl className="lg:col-span-8">
          {specSheet.map(([k, v]) => (
            <div key={k} data-row className="group grid grid-cols-[minmax(120px,38%)_1fr] items-baseline gap-4 border-t border-white/10 py-4 transition-colors duration-500 hover:bg-white/[0.03] md:py-5">
              <dt className="label text-mute transition-colors duration-500 group-hover:text-glass">{k}</dt>
              <dd className="font-display text-[clamp(18px,1.8vw,26px)] font-medium tracking-[-0.015em]">{v}</dd>
            </div>
          ))}
          <div className="border-t border-white/10" />
        </dl>
      </div>
    </section>
  );
}
