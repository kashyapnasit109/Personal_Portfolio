import { useEffect, useRef } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { evolution, teachers } from '../../data/journey';
import { gsap, prefersReduced, whenVisible } from '../../lib/motion';
import { TLink } from '../../lib/transition';
import RollText from '../RollText';
import Roll from '../Roll';

/* The whole arc in nine words, then who taught what, then the next step. */
export default function Evolution() {
  const root = useRef(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-evo]', { opacity: 0.12 }, {
        opacity: 1, stagger: 0.15, ease: 'none',
        scrollTrigger: { trigger: '[data-evochain]', start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
      });
      gsap.set('[data-teach]', { xPercent: -6, autoAlpha: 0 });
    }, root);
    const off = whenVisible(root.current.querySelector('[data-teachers]'), () => gsap.to(root.current.querySelectorAll('[data-teach]'), { xPercent: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', stagger: 0.08 }));
    return () => { off(); ctx.revert(); };
  }, []);

  return (
    <section ref={root} className="bg-ink pb-[clamp(90px,11vw,170px)] pt-[clamp(60px,8vw,120px)]" aria-labelledby="evo-title">
      <div className="frame">
        <span id="evo-title" className="label text-glass">Chapter four · The evolution, compressed</span>
        <p data-evochain className="hw-group mt-8 font-display text-[clamp(40px,6.4vw,112px)] font-bold leading-[0.95] tracking-[-0.04em]" style={{ fontStretch: '78%' }}>
          {evolution.map(([w, stage], i) => (
            <span key={w} className="inline-block">
              <span data-evo className="hw group/evo relative inline-block cursor-default">
                <span className="label pointer-events-none absolute -top-6 left-1 whitespace-nowrap rounded-full bg-glass px-2 py-0.5 text-ink opacity-0 transition-all duration-300 group-hover/evo:-translate-y-1 group-hover/evo:opacity-100">{stage}</span>
                {w}
                {i === evolution.length - 1 && <span className="ml-1 inline-block animate-pulse text-glass">_</span>}
              </span>
              {i < evolution.length - 1 && <span className="serif-i mx-[0.18em] font-normal text-ivory/25">→</span>}
            </span>
          ))}
        </p>

        <div data-teachers className="mt-[clamp(80px,10vw,150px)] grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="display text-[clamp(40px,4.6vw,76px)]">
              Who taught <span className="serif-i font-normal text-glass">what.</span>
            </h3>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-ivory/60">Not a perfectly planned path. A set of chapters that kept changing the person writing the next one.</p>
          </div>
          <ul className="lg:col-span-8">
            {teachers.map(([who, what]) => (
              <li key={who} data-teach className="roll-group group relative flex items-baseline justify-between gap-6 overflow-hidden border-t hairline py-5 last:border-b" style={{ '--roll-color': '#06080d' }}>
                <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-glass transition-transform duration-700 ease-expo group-hover:scale-y-100" />
                <span className="relative font-display text-[clamp(22px,2.4vw,38px)] font-semibold tracking-[-0.02em] transition-colors duration-500 group-hover:text-ink">
                  {who} <span className="serif-i font-normal text-ivory/40 transition-colors duration-500 group-hover:text-ink/60">taught me</span>
                </span>
                <span className="serif-i relative text-[clamp(24px,2.6vw,42px)] text-glass transition-colors duration-500 group-hover:text-ink">
                  <RollText text={what} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[clamp(90px,11vw,170px)] text-center">
          <p className="mx-auto max-w-[22ch] font-serif text-[clamp(30px,4vw,64px)] italic leading-[1.1] text-ivory/90">
            You don’t need to know exactly where the road leads. You need just enough curiosity to take the <span className="text-glass">next step.</span>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <TLink to="/contact" className="btn-pill bg-ivory text-ink hover:bg-glass"><Roll>Take the next step</Roll> <FiArrowUpRight aria-hidden="true" /></TLink>
            <TLink to="/work" className="btn-pill border border-ivory/30 text-ivory hover:border-ivory"><Roll>See what got built</Roll></TLink>
          </div>
          <p className="label mt-12 text-ivory/40">
            This isn’t the finished story · <span className="text-glass">v5.0-beta</span> · the version currently in progress
          </p>
        </div>
      </div>
    </section>
  );
}
