import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReduced } from '../lib/motion';
import RollText from './RollText';
import { TLink } from '../lib/transition';

/*
  A typographic index whose rows summon a floating image that trails the cursor.
  The image leans with the pointer's velocity and cross-fades between rows.
  Rows can link (to), open externally (href) or just reveal (note).
*/
export default function HoverList({ items, tone = 'dark', size = 'lg', aspect = '4 / 5' }) {
  const root = useRef(null);
  const float = useRef(null);
  const [active, setActive] = useState(-1);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, vx: 0 });
  const fine = useRef(false);

  useEffect(() => {
    fine.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReduced();
    if (!fine.current) return;
    const el = root.current;
    const p = pos.current;
    let raf;
    const tick = () => {
      const px = p.x;
      p.x += (p.tx - p.x) * 0.14;
      p.y += (p.ty - p.y) * 0.14;
      p.vx += ((p.x - px) - p.vx) * 0.2;
      if (float.current) float.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${Math.max(-12, Math.min(12, p.vx * 0.6))}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const move = (e) => {
      const b = el.getBoundingClientRect();
      p.tx = e.clientX - b.left;
      p.ty = e.clientY - b.top;
    };
    el.addEventListener('pointermove', move);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointermove', move); };
  }, []);

  useEffect(() => {
    if (!float.current) return;
    gsap.to(float.current.querySelector('[data-float-in]'), { scale: active >= 0 && items[active]?.img ? 1 : 0, duration: 0.6, ease: 'expo.out' });
  }, [active, items]);

  const dark = tone === 'dark';
  const line = dark ? 'border-white/12' : 'border-ink/15';
  const titleSize = size === 'lg' ? 'text-[clamp(40px,7vw,120px)]' : 'text-[clamp(30px,4.4vw,72px)]';

  return (
    <div ref={root} className="relative" onPointerLeave={() => setActive(-1)}>
      <ul className={`border-t ${line}`}>
        {items.map((it, i) => {
          const inner = (
            <div className="relative grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-5 md:gap-8 md:py-7">
              <span className={`w-[64px] font-mono text-[11px] uppercase tracking-[0.12em] ${dark ? 'text-ivory/40' : 'text-ink/45'}`}>{it.n || String(i + 1).padStart(2, '0')}</span>
              <span className={`display ${titleSize} transition-[color,transform] duration-700 ease-expo md:group-hover:translate-x-4`}>
                <RollText text={it.title} />
              </span>
              <span className={`label hidden text-right md:block ${dark ? 'text-ivory/55' : 'text-ink/55'}`}>{it.meta}</span>
              {it.note && (
                <span className={`col-span-3 max-w-[60ch] pl-[calc(12px+1rem)] text-[14.5px] leading-relaxed transition-all duration-700 ease-expo md:pl-[calc(24px+2rem)] ${
                  active === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 md:max-h-0'
                } overflow-hidden ${dark ? 'text-ivory/65' : 'text-ink/65'}`}>
                  {it.note}
                </span>
              )}
            </div>
          );
          const cls = `roll-group group relative block border-b ${line}`;
          const props = {
            onPointerEnter: () => setActive(i),
            onFocus: () => setActive(i),
            'data-cursor': it.cursor || (it.to || it.href ? 'Open' : 'Look'),
            style: { '--roll-color': it.accent || (dark ? '#9db8ff' : '#3D6FE0') },
          };
          return (
            <li key={it.title}>
              {it.to ? (
                <TLink to={it.to} className={cls} {...props}>{inner}</TLink>
              ) : it.href ? (
                <a href={it.href} target="_blank" rel="noopener noreferrer" className={cls} {...props}>{inner}</a>
              ) : (
                <div className={cls} tabIndex={0} {...props} onClick={() => setActive(active === i ? -1 : i)}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>

      {/* floating preview (pointer devices) */}
      <div ref={float} className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block" aria-hidden="true">
        <div data-float-in className="relative w-[clamp(200px,20vw,320px)] overflow-hidden rounded-[6px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]" style={{ aspectRatio: aspect, transform: 'scale(0)' }}>
          {items.map((it, i) => (
            it.img && (
              <img
                key={it.title}
                src={it.img}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-expo"
                style={{ opacity: active === i ? 1 : 0, transform: active === i ? 'scale(1)' : 'scale(1.15)' }}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
}
