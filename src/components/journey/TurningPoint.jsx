import { useEffect, useRef } from 'react';
import { gsap, prefersReduced } from '../../lib/motion';

/*
  The turning point, told straight. Pinned; scroll brings each word up to full strength, then
  one option gets crossed out and the other gets chosen.
*/
const W = (t, cls = '') => t.split(' ').map((w, i) => (
  <span key={i} data-w className={`inline-block ${cls}`}>{w}&nbsp;</span>
));

export default function TurningPoint() {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current;
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.set('[data-w]', { opacity: 0.1 });
      gsap.set('[data-strike]', { scaleX: 0 });
      gsap.set('[data-pick]', { scaleX: 0 });
      gsap.set('[data-late]', { autoAlpha: 0, y: 30 });
      gsap.set('[data-opt]', { autoAlpha: 0, y: 20 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top top', end: '+=240%', pin: true, scrub: 0.8 },
      });
      tl.to('[data-w]', { opacity: 1, stagger: 0.12, ease: 'none', duration: 0.6 });
      tl.to('[data-opt]', { autoAlpha: 1, y: 0, stagger: 0.2, duration: 0.6 }, '+=0.2');
      tl.to('[data-strike]', { scaleX: 1, duration: 0.6, ease: 'none' }, '+=0.2');
      tl.to('[data-opt-a]', { opacity: 0.35, duration: 0.4 }, '<0.3');
      tl.to('[data-pick]', { scaleX: 1, duration: 0.6, ease: 'none' });
      tl.to('[data-opt-b]', { color: '#06080d', duration: 0.3 }, '<0.2');
      tl.to('[data-late]', { autoAlpha: 1, y: 0, duration: 0.7 }, '+=0.2');
      tl.to({}, { duration: 0.6 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div className="pin-host">
      <section ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink py-24" aria-labelledby="turn-title">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60" style={{ background: 'radial-gradient(60% 50% at 50% 55%, rgba(255,179,107,0.10), transparent 70%)' }} />
        <div className="frame relative">
          <span className="label text-[#FFB36B]">Chapter two · The turning point</span>
          <h2 id="turn-title" className="display mt-6 max-w-[15ch] text-[clamp(46px,7.6vw,132px)]">
            {W('Sometimes life doesn’t ask whether you’re')}
            <span data-w className="serif-i inline-block font-normal text-[#FFB36B]">ready.</span>
          </h2>
          <p className="mt-6 max-w-[40ch] font-serif text-[clamp(20px,2vw,30px)] italic text-ivory/80">
            {W('It just changes the circumstances. Then it hands you two options:')}
          </p>

          <div className="mt-10 flex flex-col gap-4 md:flex-row md:gap-6">
            <div data-opt data-opt-a className="relative inline-flex items-center gap-4 self-start rounded-full border border-white/15 px-6 py-4">
              <span className="label text-ivory/50">A</span>
              <span className="font-display text-[clamp(20px,2.2vw,32px)] font-semibold tracking-[-0.02em]">Let the situation define you</span>
              <span data-strike aria-hidden="true" className="absolute left-4 right-4 top-1/2 h-[3px] origin-left rounded bg-[#FFB36B]" />
            </div>
            <div data-opt className="relative inline-flex items-center gap-4 self-start overflow-hidden rounded-full border border-glass/50 px-6 py-4">
              <span data-pick aria-hidden="true" className="absolute inset-0 origin-left bg-glass" />
              <span data-opt-b className="relative flex items-center gap-4 text-ivory">
                <span className="label">B</span>
                <span className="font-display text-[clamp(20px,2.2vw,32px)] font-semibold tracking-[-0.02em]">Redefine yourself around it</span>
                <span className="label">✓ chosen</span>
              </span>
            </div>
          </div>

          <div data-late className="mt-14 grid gap-8 border-t hairline pt-8 md:grid-cols-12">
            <p className="display text-[clamp(34px,4.4vw,72px)] md:col-span-7">
              The marks changed. <span className="serif-i font-normal text-glass">The person changed more.</span>
            </p>
            <ul className="space-y-2 text-[15px] leading-relaxed text-ivory/70 md:col-span-4 md:col-start-9">
              <li>→ More determined.</li>
              <li>→ Far more comfortable with setbacks.</li>
              <li>→ Learned that a setback can redirect you, not just stop you.</li>
              <li>→ Stopped letting one number describe a whole person.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
