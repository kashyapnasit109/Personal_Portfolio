import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { flagships } from '../data/projects';
import { gsap, ScrollTrigger, revealWords, revealChars, prefersReduced } from '../lib/motion';
import RollText from './RollText';
import Roll from './Roll';
import Scramble from './Scramble';

const TONES = {
  lime: { accent: '#C6F135', soft: 'rgba(198,241,53,0.12)' },
  cyan: { accent: '#00E5FF', soft: 'rgba(0,229,255,0.10)' },
  brass: { accent: '#D4A64A', soft: 'rgba(212,166,74,0.12)' },
  ivory: { accent: '#ECE7DD', soft: 'rgba(236,231,221,0.08)' },
};

/* A magnifier that follows the cursor over dense dashboard screenshots. */
function Loupe({ src, alt }) {
  const wrap = useRef(null);
  const lens = useRef(null);
  const [on, setOn] = useState(false);
  const move = (e) => {
    const b = wrap.current.getBoundingClientRect();
    const x = e.clientX - b.left;
    const y = e.clientY - b.top;
    const Z = 2.4;
    const L = lens.current;
    L.style.transform = `translate(${x - 90}px, ${y - 90}px)`;
    L.style.backgroundSize = `${b.width * Z}px ${b.height * Z}px`;
    L.style.backgroundPosition = `${-(x * Z - 90)}px ${-(y * Z - 90)}px`;
  };
  const fine = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  return (
    <div
      ref={wrap}
      className="relative"
      onPointerEnter={() => fine && setOn(true)}
      onPointerLeave={() => setOn(false)}
      onPointerMove={fine ? move : undefined}
      data-cursor="Inspect"
    >
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
      <div
        ref={lens}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[180px] w-[180px] rounded-full border-2 border-[var(--accent)] bg-no-repeat shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] transition-opacity duration-300"
        style={{ backgroundImage: `url(${src})`, opacity: on ? 1 : 0 }}
      />
    </div>
  );
}

function Shots({ p }) {
  const [a, b, c] = p.shots;
  return (
    <div className="fan-group relative h-full min-h-[320px] w-full" data-cursor="Fan out">
      <div data-par="0.06" className="absolute inset-x-0 top-0 overflow-hidden rounded-[10px] border border-white/10 bg-ink-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-3 truncate font-mono text-[10px] text-white/40">{p.live ? p.live.replace('https://', '') : `${p.id} · local build`}</span>
        </div>
        <Loupe src={a} alt={`${p.title} — main interface`} />
      </div>
      {b && (
        <img
          data-par="-0.08"
          data-fan="b"
          src={b}
          alt={`${p.title} — secondary view`}
          loading="lazy"
          className="absolute -bottom-6 -left-6 hidden w-[46%] rounded-[8px] border border-white/10 shadow-2xl md:block"
        />
      )}
      {c && (
        <img
          data-par="-0.14"
          data-fan="c"
          src={c}
          alt={`${p.title} — detail view`}
          loading="lazy"
          className="absolute -bottom-10 right-[-3%] hidden w-[40%] rounded-[8px] border border-white/10 shadow-2xl lg:block"
        />
      )}
    </div>
  );
}

function SatvaVisual({ p }) {
  return (
    <div className="grid h-full min-h-[320px] grid-cols-6 grid-rows-6 gap-3">
      <img data-par="0.05" src={p.shots[0]} alt="Satva Laser — brass jaali partition in a living room" loading="lazy" className="col-span-4 row-span-6 h-full w-full rounded-[8px] object-cover" />
      <img data-par="-0.06" src={p.shots[1]} alt="Satva Laser — illuminated tree-of-life mural" loading="lazy" className="col-span-2 row-span-3 h-full w-full rounded-[8px] object-cover" />
      <img data-par="-0.1" src={p.shots[2]} alt="Satva Laser — galloping horses metal mural" loading="lazy" className="col-span-2 row-span-3 h-full w-full rounded-[8px] object-cover" />
    </div>
  );
}

/* Illustrative attendance grid with an OCR scan line — explains what Nexus does. */
function NexusVisual() {
  const subjects = ['DSA', 'DBMS', 'COA', 'CN', 'MATHS', 'JAVA'];
  const days = 22;
  const cells = subjects.map((_, r) =>
    Array.from({ length: days }, (_, c) => (Math.sin(r * 7.3 + c * 2.1) + Math.cos(c * 0.7 + r) > -1.25 ? 1 : 0)),
  );
  return (
    <div className="relative flex h-full min-h-[320px] flex-col justify-center overflow-hidden rounded-[10px] border border-white/10 bg-ink-2 p-5 md:p-8">
      <div className="mb-5 flex items-center justify-between">
        <span className="label text-ivory/60">Register → records</span>
        <span className="label text-mute">Illustration</span>
      </div>
      <div className="relative space-y-2" style={{ containerType: 'inline-size' }}>
        {subjects.map((s, r) => {
          const pct = Math.round((cells[r].reduce((a, b) => a + b, 0) / days) * 100);
          return (
            <div key={s} className="grid grid-cols-[64px_1fr_44px] items-center gap-3">
              <span className="font-mono text-[10px] text-ivory/60">{s}</span>
              <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${days}, minmax(0,1fr))` }}>
                {cells[r].map((v, c) => (
                  <span key={c} className={`aspect-square rounded-[2px] ${v ? 'bg-ivory/80' : 'bg-white/[0.07]'}`} />
                ))}
              </div>
              <span className={`text-right font-mono text-[11px] ${pct < 75 ? 'text-[#ff8a7a]' : 'text-ivory'}`}>{pct}%</span>
            </div>
          );
        })}
        <div className="nexus-scan pointer-events-none absolute inset-y-[-8px] left-[70px] w-[2px] bg-glass shadow-[0_0_24px_6px_rgba(157,184,255,0.45)]" />
      </div>
      <style>{`
        .nexus-scan{ animation: nexusScan 3.6s cubic-bezier(.65,0,.35,1) infinite alternate; }
        @keyframes nexusScan{ from{ transform: translateX(0) } to{ transform: translateX(calc(100cqw - 140px)) } }
        @media (prefers-reduced-motion: reduce){ .nexus-scan{ animation:none } }
      `}</style>
    </div>
  );
}

function Card({ p, i, total }) {
  const t = TONES[p.tone];
  return (
    <article
      data-card
      id={`case-${p.id}`}
      className="work-card relative flex min-h-[100svh] items-center border-t border-white/10 bg-ink py-16 lg:py-10"
      style={{ zIndex: i + 1, '--accent': t.accent }}
      aria-labelledby={`${p.id}-title`}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(60% 50% at 80% 30%, ${t.soft}, transparent 70%)` }} />
      <div className="frame relative grid w-full gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col lg:col-span-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12px] text-ivory/50">
              {p.index} <span className="text-ivory/25">/ 0{total}</span>
            </span>
            <span className="label rounded-full border px-3 py-1.5" style={{ borderColor: `${t.accent}55`, color: t.accent }}>
              <Scramble text={p.badge} />
            </span>
          </div>

          <h3 id={`${p.id}-title`} data-chars className="roll-group display mt-8 cursor-default text-[clamp(56px,8.4vw,132px)]" style={{ '--roll-color': t.accent }}>
            <RollText text={p.title} />
          </h3>
          <p className="mt-3 font-serif text-[clamp(20px,1.8vw,26px)] italic leading-snug text-ivory/80">{p.kicker}</p>

          <p className="mt-6 max-w-[54ch] text-[15px] leading-relaxed text-ivory/70">{p.summary}</p>

          <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {p.problems.map((q) => (
              <div key={q.name} className="group/q relative grid grid-cols-[120px_1fr] gap-4 py-3.5 transition-[padding] duration-500 ease-expo hover:pl-4 md:grid-cols-[140px_1fr]">
                <span aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-[3px] origin-top scale-y-0 rounded transition-transform duration-500 ease-expo group-hover/q:scale-y-100" style={{ background: t.accent }} />
                <dt className="font-display text-[15px] font-semibold" style={{ color: t.accent }}>{q.name}</dt>
                <dd className="text-[13.5px] leading-relaxed text-ivory/65">{q.text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
            {p.stack.map((s) => (
              <span key={s} className="cursor-default font-mono text-[11px] text-ivory/45 transition-colors duration-300 hover:text-[var(--accent)]">{s}</span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn-pill bg-ivory text-ink hover:bg-[var(--accent)]" data-cursor="Open live">
                <Roll>Visit live</Roll> <FiArrowUpRight aria-hidden="true" />
              </a>
            )}
            {p.code && (
              <a href={p.code} target="_blank" rel="noopener noreferrer" className="btn-pill border border-ivory/25 text-ivory hover:border-ivory" data-cursor="Source">
                <FiGithub aria-hidden="true" /> <Roll>Code</Roll>
              </a>
            )}
            <span className="label ml-1 text-mute">{p.role} · {p.year} · {p.status}</span>
          </div>
        </div>

        <div className="relative lg:col-span-7 lg:pl-6">
          {p.id === 'satva' ? <SatvaVisual p={p} /> : p.id === 'nexus' ? <NexusVisual /> : <Shots p={p} />}
        </div>
      </div>
    </article>
  );
}

export default function Work({ bare = false }) {
  const root = useRef(null);
  const title = useRef(null);
  const [stack, setStack] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 760px)');
    const f = () => setStack(mq.matches && !prefersReduced());
    f();
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);

  useEffect(() => {
    if (title.current) revealWords(title.current);
    root.current.querySelectorAll('[data-chars]').forEach((el) => revealChars(el, { stagger: 0.035 }));
  }, []);

  useEffect(() => {
    const cards = [...root.current.querySelectorAll('[data-card]')];
    let setTops = null;
    const ctx = gsap.context(() => {
      // parallax inside visuals
      root.current.querySelectorAll('[data-par]').forEach((el) => {
        const k = parseFloat(el.dataset.par);
        gsap.fromTo(el, { yPercent: k * 100 }, {
          yPercent: -k * 100,
          ease: 'none',
          scrollTrigger: { trigger: el.closest('[data-card]'), start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
      if (!stack) return;
      // tall cards scroll through fully before sticking at their bottom edge
      setTops = () => {
        cards.forEach((card) => {
          if (card.parentElement) card.parentElement.style.top = `${Math.min(0, window.innerHeight - card.offsetHeight)}px`;
        });
      };
      setTops();
      window.addEventListener('resize', setTops);
      ScrollTrigger.addEventListener('refreshInit', setTops);
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const inner = card.querySelector('.frame');
        gsap.to(inner, {
          scale: 0.92,
          autoAlpha: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true },
        });
      });
    }, root);
    ScrollTrigger.refresh();
    return () => {
      if (setTops) {
        window.removeEventListener('resize', setTops);
        ScrollTrigger.removeEventListener('refreshInit', setTops);
      }
      ctx.revert();
      cards.forEach((c) => { if (c.parentElement) c.parentElement.style.top = ''; });
    };
  }, [stack]);

  return (
    <section id="work" ref={root} className="relative bg-ink" aria-label="Selected work">
      {!bare && (
      <div className="frame pb-10 pt-[clamp(96px,12vw,180px)]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 id="work-title" ref={title} className="display text-[clamp(64px,11vw,176px)]">
            Selected <span className="serif-i text-glass" data-nosplit>work</span>
          </h2>
          <p className="max-w-[40ch] pb-2 text-[15px] leading-relaxed text-ivory/60">
            Four core projects: a hackathon winner, a system in the national SIH pipeline, a site running for a real client, and the tool that started it all.
          </p>
        </div>
      </div>
      )}
      <div>
        {flagships.map((p, i) => (
          <div key={p.id} className={stack ? 'sticky' : ''}>
            <Card p={p} i={i} total={flagships.length} />
          </div>
        ))}
      </div>
    </section>
  );
}
