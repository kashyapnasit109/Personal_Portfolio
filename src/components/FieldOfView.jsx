import { useEffect, useRef, useState } from 'react';
import { frames, trailImages } from '../data/frames';
import ImageTrail from './ImageTrail';
import { gsap, ScrollTrigger, prefersReduced, revealWords } from '../lib/motion';

function Box({ box, label, tone = 'glass', delay = 0 }) {
  const [x0, y0, x1, y1] = box;
  const style = {
    left: `${x0 * 100}%`,
    top: `${y0 * 100}%`,
    width: `${(x1 - x0) * 100}%`,
    height: `${(y1 - y0) * 100}%`,
    '--d': `${delay}ms`,
  };
  return (
    <div className={`fov-box fov-box--${tone}`} style={style}>
      <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
        <rect x="0" y="0" width="100" height="100" pathLength="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="fov-corner tl" />
      <span className="fov-corner tr" />
      <span className="fov-corner bl" />
      <span className="fov-corner br" />
      <span className="fov-tag">{label}</span>
    </div>
  );
}

function Frame({ f, i, total, active, onHover }) {
  return (
    <figure
      className="fov-frame relative aspect-[3/4] h-full shrink-0 overflow-hidden rounded-[6px] bg-ink-2"
      data-active={active}
      onPointerEnter={() => onHover(i)}
      data-cursor="Scan"
    >
      <img src={f.src} alt="" aria-hidden="true" loading="lazy" className="fov-mono absolute inset-0 h-full w-full object-cover" />
      <img src={f.src} alt={f.alt} loading="lazy" className="fov-color absolute inset-0 h-full w-full object-cover" />
      <div className="fov-scan" aria-hidden="true" />

      <div className="absolute inset-0" aria-hidden="true">
        <Box box={f.person} label="person · kashyap" delay={250} />
        {f.marks.map((m, k) => (
          <Box key={m.label} box={m.box} label={m.label} tone="ivory" delay={500 + k * 150} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
        <span className="label rounded-full bg-ink/55 px-2.5 py-1 text-ivory backdrop-blur-md">
          F{String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span className="label fov-coord rounded-full bg-ink/55 px-2.5 py-1 text-ivory/80 backdrop-blur-md">{f.coord}</span>
      </div>
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-5 pt-16">
        <span className="display block text-[clamp(38px,3.6vw,64px)]">{f.place}</span>
        <span className="mt-1 block font-serif text-[18px] italic text-ivory/80">{f.detail}</span>
      </figcaption>
    </figure>
  );
}

export default function FieldOfView() {
  const section = useRef(null);
  const track = useRef(null);
  const title = useRef(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 680px)');
    const f = () => setPinned(mq.matches && !prefersReduced());
    f();
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);

  useEffect(() => {
    revealWords(title.current);
  }, []);

  // desktop: vertical scroll drives the horizontal track
  useEffect(() => {
    if (!pinned) return;
    const t = track.current;
    const items = [...t.querySelectorAll('.fov-frame')];
    const ctx = gsap.context(() => {
      const dist = () => t.scrollWidth - window.innerWidth;
      gsap.to(t, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          refreshPriority: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const c = window.innerWidth / 2;
            let best = 0;
            let bd = Infinity;
            items.forEach((el, k) => {
              const r = el.getBoundingClientRect();
              const d = Math.abs(r.left + r.width / 2 - c);
              if (d < bd) { bd = d; best = k; }
            });
            setActive((a) => (a === best ? a : best));
          },
        },
      });
    }, section);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pinned]);

  // touch / narrow: native horizontal scroll with snap
  useEffect(() => {
    if (pinned) return;
    const t = track.current;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(Number(e.target.dataset.i));
      }),
      { root: t, threshold: 0.6 },
    );
    t.querySelectorAll('[data-i]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pinned]);

  return (
    <div className="pin-host">
      <section ref={section} className="relative overflow-hidden bg-ink" aria-labelledby="fov-title">
      <div
        ref={track}
        className={`flex items-center gap-6 ${pinned ? 'h-[100svh] w-max pl-[var(--gutter)] pr-[12vw]' : 'no-scrollbar snap-x snap-mandatory overflow-x-auto px-[var(--gutter)] py-24'}`}
      >
        <ImageTrail images={trailImages} className={`shrink-0 ${pinned ? 'flex h-[78vh] w-[46vw] flex-col justify-between' : 'w-[86vw] snap-start sm:w-[60vw]'}`}>
          <div>
            <span className="label text-glass">Field of view · off the keyboard</span>
            <h2 id="fov-title" ref={title} className="display mt-6 text-[clamp(64px,10vw,180px)]">
              Field of <span data-nosplit className="serif-i text-glass">view.</span>
            </h2>
          </div>
          <div className="mt-8 max-w-[44ch]">
            <p className="text-[15px] leading-relaxed text-ivory/70">
              Vision systems are what I build, so here are frames from my travels — seen the way my models see them. Each photo is segmented, boxed and located; hover one and the colour comes back.
            </p>
            <p className="label mt-6 text-mute">{pinned ? 'Scroll to travel · move the cursor here' : 'Swipe to travel'} →</p>
          </div>
        </ImageTrail>

        {frames.map((f, i) => (
          <div key={f.id} data-i={i} className={pinned ? 'h-[78vh]' : 'h-[64vh] snap-center'}>
            <Frame f={f} i={i} total={frames.length} active={active === i} onHover={setActive} />
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
