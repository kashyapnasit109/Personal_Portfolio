import { useEffect, useRef, useState } from 'react';
import { PiSignpostDuotone } from 'react-icons/pi';
import { routePath, routePins } from '../../data/journey';
import { gsap, prefersReduced, revealChars } from '../../lib/motion';
import RollText from '../RollText';

/*
  Journey opener: the route I planned (a tidy dashed diagonal) versus the route I actually
  took (a scribble with a loop and a detour). The real line draws itself; pins pop as it
  reaches them. Hover or tap a pin for the one-line version of that chapter.
*/
export default function RouteMap() {
  const root = useRef(null);
  const path = useRef(null);
  const [active, setActive] = useState(null);
  const [shown, setShown] = useState(() => (prefersReduced() ? routePins.length : 0));

  useEffect(() => {
    revealChars(root.current.querySelector('[data-chars]'), { stagger: 0.035, start: 'top 95%', delay: 0.45 });
    const el = path.current;
    const len = el.getTotalLength();
    // arc length at which each pin sits
    const at = routePins.map((p) => {
      let best = 0;
      let bd = Infinity;
      for (let l = 0; l <= len; l += 3) {
        const q = el.getPointAtLength(l);
        const d = (q.x - p.x) ** 2 + (q.y - p.y) ** 2;
        if (d < bd) { bd = d; best = l; }
      }
      return best / len;
    });
    if (prefersReduced()) return;
    gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    gsap.set(root.current.querySelectorAll('[data-fade]'), { autoAlpha: 0, y: 18 });
    const prog = { p: 0 };
    const tl = gsap.timeline({ delay: 0.7 });
    tl.to(root.current.querySelectorAll('[data-fade]'), { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08 }, 0);
    tl.to(prog, {
      p: 1,
      duration: 3.2,
      ease: 'power1.inOut',
      onUpdate: () => {
        el.style.strokeDashoffset = String(len * (1 - prog.p));
        setShown(at.filter((a) => a <= prog.p + 0.004).length);
      },
    }, 0.2);
    tl.fromTo(root.current.querySelector('[data-plan]'), { strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.out' }, 0);
    return () => tl.kill();
  }, []);

  const pin = routePins.find((p) => p.id === active);

  return (
    <header ref={root} className="relative overflow-hidden bg-ink pb-[clamp(56px,7vw,110px)] pt-[clamp(130px,17vh,190px)]">
      <div className="frame">
        <div data-fade className="flex items-center justify-between border-b hairline pb-4">
          <span className="label text-glass">Journey · Class 10 → Semester 05</span>
          <span className="label hidden text-ivory/50 sm:inline">Route recalculated: several times</span>
        </div>
        <h1 data-chars className="roll-group display mt-10 cursor-default text-[clamp(60px,10vw,180px)]" style={{ '--roll-color': '#9db8ff' }}>
          <RollText text="Not a straight" /> <span className="serif-i font-normal text-glass">line.</span>
        </h1>
        <div className="mt-8 grid gap-6 md:grid-cols-12">
          <p data-fade className="font-serif text-[clamp(20px,2vw,30px)] italic leading-[1.25] text-ivory/80 md:col-span-6">
            Learning, detours, setbacks, experiments and a lot of “let’s try that again”. Here is the route I planned — and the one I actually took.
          </p>
          <div data-fade className="flex items-end gap-6 md:col-span-5 md:col-start-8 md:justify-end">
            <span className="label flex items-center gap-2 text-ivory/50"><span className="inline-block w-8 border-t border-dashed border-ivory/50" /> Planned</span>
            <span className="label flex items-center gap-2 text-glass"><span className="inline-block h-[2px] w-8 rounded bg-glass" /> Actual</span>
            <span className="label hidden text-ivory/40 lg:inline">Hover the pins</span>
          </div>
        </div>

        <div className="relative mt-6 md:mt-4">
          <svg viewBox="0 0 1200 420" className="w-full overflow-visible" role="img" aria-label="A planned straight route compared with the real, winding route from Class 10 to Semester 5">
            <path data-plan d="M40,360 L1160,55" stroke="rgba(236,231,221,0.35)" strokeWidth="1.5" strokeDasharray="6 9" fill="none" style={{ strokeDashoffset: 0 }} />
            <text x="700" y="232" fill="rgba(236,231,221,0.35)" className="font-mono" fontSize="11" letterSpacing="2" transform="rotate(-15.2 700 232)">THE PLAN (ADORABLE)</text>
            <path ref={path} d={routePath} stroke="#9db8ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {routePins.map((p, i) => (
              <g
                key={p.id}
                transform={`translate(${p.x} ${p.y})`}
                className="cursor-pointer"
                style={{ opacity: i < shown ? 1 : 0, transition: 'opacity .3s' }}
                onPointerEnter={() => setActive(p.id)}
                onPointerLeave={() => setActive(null)}
                onClick={() => setActive((a) => (a === p.id ? null : p.id))}
                tabIndex={0}
                onFocus={() => setActive(p.id)}
                onBlur={() => setActive(null)}
                role="button"
                aria-label={`${p.label}: ${p.note}`}
              >
                <circle r="22" fill="transparent" />
                <circle r={active === p.id ? 11 : 7} fill={p.detour ? '#FFB36B' : active === p.id ? '#9db8ff' : '#ece7dd'} stroke="#06080d" strokeWidth="3" style={{ transition: 'r .35s cubic-bezier(.16,1,.3,1), fill .3s' }} />
                <text y={p.y > 300 ? 34 : -18} textAnchor="middle" fill={active === p.id ? '#9db8ff' : 'rgba(236,231,221,0.6)'} fontSize="12" className="font-mono" letterSpacing="1.5">
                  {p.short.toUpperCase()}
                </text>
              </g>
            ))}
          </svg>
          {pin && (
            <div
              className="pointer-events-none absolute z-10 w-[min(280px,70vw)] rounded-xl border border-white/15 bg-ink-2/90 p-4 backdrop-blur-md"
              style={{ left: `${Math.min(Math.max((pin.x / 1200) * 100, 14), 86)}%`, top: `${(pin.y / 420) * 100}%`, transform: `translate(-50%, ${pin.y > 250 ? 'calc(-100% - 26px)' : '26px'})`, animation: 'routein .4s ease' }}
            >
              <span className={`label flex items-center gap-2 ${pin.detour ? 'text-[#FFB36B]' : 'text-glass'}`}>
                {pin.detour && <PiSignpostDuotone aria-hidden="true" />} {pin.label}
              </span>
              <p className="mt-1.5 font-serif text-[17px] italic leading-snug text-ivory/90">{pin.note}</p>
            </div>
          )}
        </div>
      </div>
      <style>{'@keyframes routein { from { opacity: 0; } }'}</style>
    </header>
  );
}
