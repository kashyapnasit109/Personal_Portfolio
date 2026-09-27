import { useCallback, useEffect, useRef, useState } from 'react';
import { PiMouseScrollDuotone, PiCursorClickDuotone } from 'react-icons/pi';
import { byId } from '../../data/clicks';
import { ScrollTrigger, prefersReduced } from '../../lib/motion';
import { Lightbox } from './Collections';
import KMark from '../KMark';

/*
  Lens opener — "The orbit".
  Eighteen photographs stand on a ring. Scrolling turns the ring one frame at a time;
  the room takes on the colours of whichever photo is facing you, so the page is lit by
  the pictures rather than sitting in the dark. The pointer tilts the whole orbit.
*/
const PICKS = ['k13', 'k06', 'm5', 'k09', 'k07', 'k12', 'k08', 'k15', 'm6', 'k04', 'k14', 'k11', 'k01', 'k03', 'm1', 'k02', 'k10', 'k16'];

export default function LensOrbit() {
  const root = useRef(null);
  const ring = useRef(null);
  const items = PICKS.map(byId);
  const N = items.length;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(-1);
  const [reduced] = useState(() => prefersReduced());
  const state = useRef({ p: 0, tx: 0, ty: 0, cx: 0, cy: 0, R: 1000 });

  useEffect(() => {
    if (reduced) return undefined;
    const el = root.current;
    const cards = [...ring.current.children];
    const step = 360 / N;
    const st = state.current;

    const layout = () => {
      const w = cards[0].offsetWidth;
      st.R = (w / 2 / Math.tan(Math.PI / N)) * 1.1;
      cards.forEach((c, i) => { c.style.transform = `rotateY(${i * step}deg) translateZ(${st.R}px)`; });
    };

    const render = () => {
      const rot = -st.p * (N - 1) * step;
      ring.current.style.transform = `translateZ(${-st.R}px) rotateX(${-7 + st.cy}deg) rotateY(${rot + st.cx}deg)`;
      cards.forEach((c, i) => {
        let d = (((i * step + rot) % 360) + 540) % 360 - 180; // -180..180, 0 = facing us
        d = Math.abs(d);
        c.style.opacity = String(d > 110 ? 0 : 1 - Math.max(0, d - 18) / 110);
        c.dataset.front = d < step / 2 ? '1' : '0';
      });
    };

    layout();
    render();
    let raf = null;
    const loop = () => {
      st.cx += (st.tx - st.cx) * 0.07;
      st.cy += (st.ty - st.cy) * 0.07;
      render();
      raf = Math.abs(st.tx - st.cx) + Math.abs(st.ty - st.cy) > 0.01 ? requestAnimationFrame(loop) : null;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const trig = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: `+=${N * 26}%`,
      pin: true,
      scrub: 0.8,
      refreshPriority: 10,
      snap: { snapTo: 1 / (N - 1), duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: 'power2.inOut' },
      onUpdate: (self) => {
        st.p = self.progress;
        setActive(Math.round(self.progress * (N - 1)));
        render();
      },
    });
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const move = (e) => {
      st.tx = (e.clientX / window.innerWidth - 0.5) * 16;
      st.ty = -(e.clientY / window.innerHeight - 0.5) * 8;
      kick();
    };
    if (fine) window.addEventListener('pointermove', move, { passive: true });
    const onResize = () => { layout(); render(); };
    window.addEventListener('resize', onResize);
    return () => {
      trig.kill();
      if (raf) cancelAnimationFrame(raf);
      if (fine) window.removeEventListener('pointermove', move);
      window.removeEventListener('resize', onResize);
    };
  }, [N, reduced]);

  const onClose = useCallback(() => setOpen(-1), []);
  const onStep = useCallback((d) => setOpen((v) => (v + d + N) % N), [N]);

  if (reduced) {
    return (
      <header className="bg-ink pb-16 pt-40">
        <div className="frame">
          <h1 className="display text-[clamp(64px,12vw,200px)]">Through my <span className="serif-i font-normal text-glass">lens.</span></h1>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {items.map((c) => <img key={c.id} src={c.thumb} alt={c.title} className="aspect-[3/4] w-full rounded-[6px] object-cover" />)}
          </div>
        </div>
      </header>
    );
  }

  const cur = items[active];
  return (
    <div className="pin-host">
      <section ref={root} className="relative h-[100svh] overflow-hidden bg-ink" aria-label="Through my lens — a ring of photographs">
        {/* the room is lit by the photograph facing you */}
        <div className="absolute inset-0" aria-hidden="true">
          {items.map((c, i) => (
            <div
              key={c.id}
              className="absolute inset-[-10%] bg-cover bg-center transition-opacity duration-[1200ms] ease-out"
              style={{ backgroundImage: `url(${c.thumb})`, filter: 'blur(70px) saturate(1.9) brightness(1.05)', opacity: i === active ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-ink/25" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(80% 70% at 50% 55%, transparent 0%, rgba(6,8,13,0.25) 65%, rgba(6,8,13,0.7) 100%)' }} />
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-ink to-transparent" />
        </div>

        {/* the orbit */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1500px', perspectiveOrigin: '50% 42%' }}>
          <div ref={ring} className="relative h-0 w-0 translate-y-[4vh]" style={{ transformStyle: 'preserve-3d' }}>
            {items.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setOpen(i)}
                className="orbit-card group absolute left-0 top-0 -ml-[calc(var(--cw)/2)] -mt-[calc(var(--cw)*0.66)] w-[var(--cw)] text-left [backface-visibility:hidden] [--cw:min(52vw,250px)] md:[--cw:clamp(220px,19vw,320px)]"
                aria-label={`Open photo: ${c.title}`}
                data-cursor="Open"
              >
                <span className="block overflow-hidden rounded-[12px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/15 transition-transform duration-700 ease-expo group-hover:-translate-y-3">
                  <img src={c.src} alt="" loading={i < 5 ? 'eager' : 'lazy'} className="aspect-[3/4] w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-105" draggable="false" />
                </span>
                {/* reflection on the floor */}
                <span aria-hidden="true" className="mt-2 block h-[70px] overflow-hidden rounded-[12px] opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]">
                  <img src={c.thumb} alt="" className="aspect-[3/4] w-full scale-y-[-1] object-cover object-bottom blur-[2px]" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* type & HUD */}
        <div className="pointer-events-none absolute inset-x-0 top-[96px] z-10">
          <div className="frame flex items-start justify-between gap-6">
            <div>
              <span className="label flex items-center gap-2 text-ivory/70"><KMark size={18} ring={false} className="text-glass" /> Lens · photographs by Kashyap</span>
              <h1 className="display mt-3 text-[clamp(44px,6.4vw,112px)] text-ivory [text-shadow:0_10px_40px_rgba(0,0,0,0.35)]">
                Through my <span className="serif-i font-normal text-glass">lens.</span>
              </h1>
            </div>
            <div className="hidden text-right md:block">
              <span className="label flex items-center justify-end gap-2 text-ivory/60"><PiMouseScrollDuotone className="text-[16px]" aria-hidden="true" /> Scroll to turn the orbit</span>
              <span className="label mt-2 flex items-center justify-end gap-2 text-ivory/60"><PiCursorClickDuotone className="text-[16px]" aria-hidden="true" /> Click a frame to open it</span>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="frame flex items-end justify-between gap-6 pb-7">
            <div className="min-w-0">
              <span className="label text-glass">{String(active + 1).padStart(2, '0')} / {N} · {cur.meta}</span>
              <p key={cur.id} className="display mt-2 truncate text-[clamp(30px,4.2vw,72px)] text-ivory" style={{ animation: 'orbitTitle .7s cubic-bezier(.16,1,.3,1)' }}>{cur.title}</p>
            </div>
            <div className="hidden shrink-0 items-center gap-1.5 md:flex" aria-hidden="true">
              {items.map((c, i) => (
                <span key={c.id} className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-glass' : 'w-2 bg-white/25'}`} />
              ))}
            </div>
          </div>
        </div>
        <style>{'@keyframes orbitTitle { from { opacity: 0; transform: translateY(40%); filter: blur(6px); } }'}</style>
      </section>
      {open >= 0 && <Lightbox list={items} i={open} onClose={onClose} onStep={onStep} />}
    </div>
  );
}
