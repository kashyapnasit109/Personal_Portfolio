import { useEffect, useRef, useState } from 'react';
import { PiAtomDuotone, PiBooksDuotone, PiSignpostDuotone, PiArrowsCounterClockwiseDuotone } from 'react-icons/pi';
import { school } from '../../data/journey';
import { gsap, prefersReduced, revealWords, whenVisible } from '../../lib/motion';

const ICONS = { books: PiBooksDuotone, atom: PiAtomDuotone, detour: PiSignpostDuotone };

/* The school years as marksheet cards: the number on the front, the story on the back. */
function Card({ c, i }) {
  const [flip, setFlip] = useState(false);
  const num = useRef(null);
  const Icon = ICONS[c.icon];
  const detour = c.stat === null;

  useEffect(() => {
    if (!c.stat || !num.current) return;
    if (prefersReduced()) { num.current.textContent = c.stat; return; }
    const o = { v: 0 };
    return whenVisible(num.current, () => gsap.to(o, {
      v: c.stat,
      duration: 1.8,
      ease: 'power3.out',
      onUpdate: () => { if (num.current) num.current.textContent = Math.round(o.v); },
    }));
  }, [c.stat]);

  return (
    <div
      data-card
      className="group relative h-[clamp(430px,42vw,520px)] [perspective:1400px]"
      onPointerEnter={() => setFlip(true)}
      onPointerLeave={() => setFlip(false)}
    >
      <button
        type="button"
        onClick={() => setFlip((f) => !f)}
        aria-pressed={flip}
        aria-label={`${c.grade}: show ${flip ? 'score' : 'story'}`}
        className="relative block h-full w-full text-left transition-transform duration-[1000ms] ease-expo [transform-style:preserve-3d]"
        style={{ transform: flip ? 'rotateY(180deg)' : 'none' }}
        data-cursor="Flip"
      >
        {/* front */}
        <div className={`absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[18px] border p-7 [backface-visibility:hidden] ${detour ? 'border-[#FFB36B]/30 bg-[#FFB36B]/[0.05]' : 'hairline bg-ink-2'}`}>
          <div className="flex items-start justify-between">
            <span className="label text-ivory/55">{c.grade}</span>
            <Icon className={`text-[40px] transition-transform duration-700 ease-expo group-hover:rotate-[-12deg] group-hover:scale-110 ${detour ? 'text-[#FFB36B]' : 'text-glass'}`} aria-hidden="true" />
          </div>
          <div>
            <p className="label text-ivory/45">{c.front}</p>
            {detour ? (
              <p className="display mt-3 text-[clamp(56px,6.2vw,104px)] text-[#FFB36B]">{c.statText}</p>
            ) : (
              <p className="display mt-3 flex items-start text-[clamp(96px,11vw,190px)]">
                <span ref={num} className="tabular-nums">0</span>
                <span className="serif-i mt-[0.1em] text-[0.4em] font-normal text-glass">{c.suffix}</span>
              </p>
            )}
          </div>
          <div className="flex items-end justify-between border-t hairline pt-4">
            <span className="font-display text-[22px] font-semibold uppercase tracking-[0.12em]">{c.word}</span>
            <span className="label flex items-center gap-1.5 text-ivory/40"><PiArrowsCounterClockwiseDuotone aria-hidden="true" /> Flip</span>
          </div>
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-4 font-display text-[200px] font-bold leading-none text-white/[0.025]">{String(i + 10)}</span>
        </div>
        {/* back */}
        <div className={`absolute inset-0 flex flex-col justify-between rounded-[18px] p-7 [backface-visibility:hidden] [transform:rotateY(180deg)] ${detour ? 'bg-[#FFB36B] text-ink' : 'bg-ivory text-ink'}`}>
          <span className="label text-ink/55">{c.grade} · the story</span>
          <p className="text-[clamp(16px,1.35vw,19px)] leading-relaxed">{c.back}</p>
          <blockquote className="border-t border-ink/15 pt-4 font-serif text-[clamp(20px,1.8vw,26px)] italic leading-snug">“{c.lesson}”</blockquote>
        </div>
      </button>
    </div>
  );
}

export default function SchoolCards() {
  const root = useRef(null);
  const title = useRef(null);
  useEffect(() => {
    revealWords(title.current);
    if (prefersReduced()) return;
    const cards = root.current.querySelectorAll('[data-card]');
    gsap.set(cards, { y: 90, rotate: (i) => (i - 1) * 4, autoAlpha: 0 });
    return whenVisible(root.current.querySelector('[data-cards]'), () => gsap.to(cards, { y: 0, rotate: 0, autoAlpha: 1, duration: 1.3, ease: 'expo.out', stagger: 0.12 }));
  }, []);
  return (
    <section ref={root} className="bg-ink py-[clamp(80px,10vw,150px)]" aria-labelledby="school-title">
      <div className="frame">
        <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="label text-glass">Chapter one · The school arc</span>
            <h2 id="school-title" ref={title} className="display mt-5 text-[clamp(52px,7.4vw,128px)]">
              Three report cards, <span data-nosplit className="serif-i font-normal text-glass">one plot twist.</span>
            </h2>
          </div>
          <p className="max-w-[38ch] text-[15px] leading-relaxed text-ivory/60 md:col-span-4 md:col-start-9">
            The fronts show the numbers. The backs show what the numbers were really about. Hover to flip, or tap on a phone.
          </p>
        </div>
        <div data-cards className="grid gap-5 md:grid-cols-3">
          {school.map((c, i) => <Card key={c.grade} c={c} i={i} />)}
        </div>
      </div>
    </section>
  );
}
