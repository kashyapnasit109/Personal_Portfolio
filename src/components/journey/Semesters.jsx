import { useEffect, useRef, useState } from 'react';
import { PiCompassDuotone, PiWrenchDuotone, PiGraphDuotone, PiHammerDuotone, PiRocketLaunchDuotone, PiGitDiffDuotone } from 'react-icons/pi';
import { semesters } from '../../data/journey';
import { prefersReduced, revealWords } from '../../lib/motion';

const ICONS = { compass: PiCompassDuotone, wrench: PiWrenchDuotone, graph: PiGraphDuotone, hammer: PiHammerDuotone, rocket: PiRocketLaunchDuotone };
const GLYPHS = '▯▮◇◆/\\|—_+=<>01XY#';

function useScramble(text) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (prefersReduced()) { setOut(text); return; }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 650);
      const settled = Math.floor(t * text.length);
      let s = '';
      for (let i = 0; i < text.length; i++) s += i < settled ? text[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      setOut(s);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);
  return out;
}

function SemCard({ s, on }) {
  const Icon = ICONS[s.icon];
  return (
    <article
      data-sem
      data-spot
      className={`group relative rounded-[18px] border p-7 transition-[border-color,background-color,opacity] duration-700 md:p-9 ${on ? 'border-glass/50 bg-glass/[0.05] shadow-[0_30px_90px_-40px_rgba(157,184,255,0.35)]' : 'hairline bg-ink-2/60'}`}
    >
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-[24px] text-glass transition-transform duration-700 ease-expo group-hover:rotate-[20deg] group-hover:scale-110">
          <Icon aria-hidden="true" />
        </span>
        <span className="label text-ivory/55">Semester {s.n}</span>
        <span className="label ml-auto text-glass lg:hidden">{s.word}</span>
      </div>
      <h3 className="mt-6 font-display text-[clamp(26px,2.6vw,40px)] font-semibold leading-[1.05] tracking-[-0.03em]">{s.title}</h3>
      <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-ivory/70">{s.body}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {s.ships.map((x) => (
          <li key={x} className="rounded-full border border-white/12 px-3.5 py-1.5 text-[13px] text-ivory/75 transition-colors duration-300 hover:border-glass hover:text-glass">{x}</li>
        ))}
      </ul>
      {/* git diff — opens on hover (always open on touch) */}
      <div className="mt-6 grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-expo lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-[13px] leading-7">
            <span className="text-ivory/40">$ git diff sem-{Number(s.n) - 1 || 'school'}..sem-{Number(s.n)}</span>
            {s.diff.map((d) => (
              <div key={d} className={d.startsWith('+') ? 'text-[#7ee2a8]' : 'text-[#ff8a8a]'}>{d}</div>
            ))}
          </div>
        </div>
      </div>
      <span className="label mt-5 hidden items-center gap-2 text-ivory/35 transition-opacity duration-500 group-hover:opacity-0 lg:flex">
        <PiGitDiffDuotone aria-hidden="true" /> Hover for the diff
      </span>
    </article>
  );
}

export default function Semesters() {
  const root = useRef(null);
  const title = useRef(null);
  const [active, setActive] = useState(0);
  const word = useScramble(semesters[active].word.toUpperCase());
  const Icon = ICONS[semesters[active].icon];

  useEffect(() => {
    revealWords(title.current);
    const cards = [...root.current.querySelectorAll('[data-sem]')];
    // the card crossing the middle band of the screen is the active one
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(cards.indexOf(e.target)); });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} className="bg-ink py-[clamp(80px,10vw,150px)]" aria-labelledby="sem-title">
      <div className="frame">
        <span className="label text-glass">Chapter three · College, compiled</span>
        <h2 id="sem-title" ref={title} className="display mt-5 max-w-[16ch] text-[clamp(52px,7.4vw,128px)]">
          Five semesters, <span data-nosplit className="serif-i font-normal text-glass">five verbs.</span>
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="flex items-center gap-4">
                <span className="label text-ivory/50">Semester {semesters[active].n} / theme</span>
              </div>
              <p className="display mt-4 whitespace-nowrap text-[clamp(64px,7.4vw,132px)] text-ivory" aria-live="polite">{word}</p>
              <Icon key={active} className="mt-8 text-[88px] text-glass" style={{ animation: 'semicon .8s cubic-bezier(.16,1,.3,1)' }} aria-hidden="true" />
              <div className="mt-10 flex gap-2">
                {semesters.map((s, i) => (
                  <span key={s.n} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= active ? 'bg-glass' : 'bg-white/10'}`} />
                ))}
              </div>
              <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-ivory/50">
                Each semester swapped one question for a better one. The diffs are honest; the commit messages are mostly jokes.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-[18vh] lg:py-[8vh]">
            {semesters.map((s, i) => <SemCard key={s.n} s={s} on={i === active} />)}
          </div>
        </div>
      </div>
      <style>{'@keyframes semicon { from { opacity: 0; transform: rotate(-30deg) scale(.6); } }'}</style>
    </section>
  );
}
