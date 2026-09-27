import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, prefersReduced } from '../../lib/motion';

/*
  About opener: a scattered stack of photos that drift with the pointer at different depths.
  Hovering one lifts it forward and tells the story behind it.
*/
const PICS = [
  { src: '/img/portrait-kelpies.webp', cap: 'Between two 30-metre steel horses, acting normal. Falkirk.', x: 6, y: 16, w: 15, r: -6, d: 1.4 },
  { src: '/img/portrait-boat.webp', cap: 'Tie-dye jacket, grey sky, lake. Main-character energy.', x: 70, y: 12, w: 21, r: 5, d: 0.8, land: true },
  { src: '/img/portrait-sea.webp', cap: 'Sunglasses: non-negotiable, regardless of weather.', x: 79, y: 52, w: 13, r: -4, d: 1.8 },
  { src: '/img/portrait-edinburgh.webp', cap: 'Red scarf, castle, zero itinerary. Edinburgh.', x: 3, y: 58, w: 13, r: 4, d: 1.1 },
  { src: '/img/portrait-mirror.webp', cap: 'Pre-demo mirror check. The code was not checked this carefully.', x: 23, y: 70, w: 11, r: -3, d: 2.1 },
  { src: '/img/portrait-bridge.webp', cap: "Millennium Bridge. St Paul's photobombed.", x: 67, y: 69, w: 10, r: 6, d: 1.6 },
];

export default function Opener() {
  const root = useRef(null);
  const [hover, setHover] = useState(-1);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    gsap.set(root.current.querySelectorAll('[data-rise]'), { yPercent: 115 });
    gsap.set(root.current.querySelectorAll('[data-pic]'), { autoAlpha: 0 });
  }, []);

  useEffect(() => {
    const el = root.current;
    const reduced = prefersReduced();
    const cards = [...el.querySelectorAll('[data-pic]')];
    if (!reduced) {
      gsap.fromTo(cards, { y: 80, autoAlpha: 0, scale: 0.9 }, { y: 0, autoAlpha: 1, scale: 1, duration: 1.4, ease: 'expo.out', stagger: 0.08, delay: 0.6 });
      gsap.fromTo(el.querySelectorAll('[data-rise]'), { yPercent: 115 }, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.08, delay: 0.45 });
    }
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const move = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      cards.forEach((c) => {
        const d = parseFloat(c.dataset.depth);
        gsap.to(c, { x: -nx * 40 * d, y: -ny * 30 * d, duration: 1.2, ease: 'power3.out', overwrite: 'auto' });
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-ink" aria-labelledby="about-hi">
      <div className="absolute inset-0 hidden md:block">
        {PICS.map((p, i) => (
          <figure
            key={p.src}
            data-pic
            data-depth={p.d}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}vw`, zIndex: hover === i ? 30 : 5 }}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(-1)}
            data-cursor="Story"
          >
            <div
              className="overflow-hidden rounded-[5px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition-[transform,filter] duration-700 ease-expo"
              style={{
                transform: `rotate(${hover === i ? 0 : p.r}deg) scale(${hover === i ? 1.12 : 1})`,
                filter: hover >= 0 && hover !== i ? 'grayscale(1) brightness(0.45)' : 'none',
                aspectRatio: p.land ? '4 / 3' : '3 / 4',
              }}
            >
              <img src={p.src} alt={p.cap} className="h-full w-full object-cover" loading="eager" />
            </div>
            <figcaption
              className={`absolute left-0 top-full mt-3 w-[max(100%,240px)] font-serif text-[17px] italic leading-snug text-ivory transition-all duration-500 ease-expo ${hover === i ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
            >
              {p.cap}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="pointer-events-none relative z-20 flex min-h-[100svh] flex-col items-center justify-center px-[var(--gutter)] pt-24 text-center">
        <span className="word-mask"><span data-rise className="label block text-glass">About — the person behind the commits</span></span>
        <h1 id="about-hi" className="mt-6">
          <span className="word-mask"><span data-rise className="display block text-[clamp(72px,13vw,220px)]">Hi. I'm</span></span>
          <span className="word-mask"><span data-rise className="serif-i block text-[clamp(80px,14vw,240px)] leading-[0.85] text-glass">Kashyap.</span></span>
        </h1>
        <span className="word-mask mt-8">
          <span data-rise className="block max-w-[34ch] font-serif text-[clamp(20px,2vw,28px)] italic text-ivory/80">
            Engineer by degree, explorer by habit, comedian by accident.
          </span>
        </span>
      </div>

      {/* mobile: a swipeable strip of the same photos */}
      <div className="no-scrollbar relative z-20 -mt-16 flex snap-x gap-3 overflow-x-auto px-[var(--gutter)] pb-16 md:hidden">
        {PICS.map((p) => (
          <figure key={p.src} className="w-[62vw] shrink-0 snap-center">
            <img src={p.src} alt={p.cap} className="aspect-[3/4] w-full rounded-[5px] object-cover" />
            <figcaption className="mt-2 font-serif text-[15px] italic text-ivory/75">{p.cap}</figcaption>
          </figure>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 hidden border-t hairline md:block">
        <div className="frame flex justify-between py-4">
          {['Semester 05 · CHARUSAT', 'Gujarat, India', 'English · Hindi · Gujarati', 'Status: curious (chronic)'].map((t) => (
            <span key={t} className="label text-ivory/55">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
