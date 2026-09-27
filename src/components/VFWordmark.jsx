import { useEffect, useRef } from 'react';
import { prefersReduced } from '../lib/motion';

/*
  A wordmark set in a variable font whose letters react to the pointer:
  near the cursor they thin out and widen (wght 800→200, wdth 75%→100%) — the type "breathes".
*/
export default function VFWordmark({ text, className = '', onChar }) {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReduced() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const chars = [...el.querySelectorAll('.vf-char')];
    let rects = [];
    const measure = () => { rects = chars.map((c) => c.getBoundingClientRect()); };
    measure();
    let raf = null;
    let mx = -9999;
    let my = -9999;
    const apply = () => {
      raf = null;
      const rad = Math.max(window.innerWidth * 0.16, 180);
      chars.forEach((c, i) => {
        const r = rects[i];
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
        const k = Math.max(0, 1 - d / rad);
        const e = k * k * (3 - 2 * k);
        c.style.setProperty('--w', String(Math.round(800 - 600 * e)));
        c.style.setProperty('--s', `${75 + 25 * e}%`);
        c.style.color = e > 0.55 ? '#9db8ff' : '';
      });
    };
    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => { mx = -9999; my = -9999; if (!raf) raf = requestAnimationFrame(apply); };
    const onScroll = () => measure();
    el.addEventListener('pointerenter', measure);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('pointerenter', measure);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div ref={root} className={`select-none whitespace-nowrap font-display leading-[0.8] ${className}`} aria-label={text} onPointerLeave={onChar ? () => onChar(null) : undefined}>
      {[...text].map((c, i) => (
        <span key={i} className="vf-char" aria-hidden="true" onPointerEnter={onChar ? () => onChar(i) : undefined}>{c === ' ' ? ' ' : c}</span>
      ))}
    </div>
  );
}
