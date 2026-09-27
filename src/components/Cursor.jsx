import { useEffect, useRef, useState } from 'react';

/* A lagging ring that names what a hover will do (Open live, Source, Look closer). Pointer devices only. */
export default function Cursor() {
  const ring = useRef(null);
  const [label, setLabel] = useState('');
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setOn(true);
    const p = { x: -100, y: -100, tx: -100, ty: -100 };
    let raf;
    const tick = () => {
      p.x += (p.tx - p.x) * 0.2;
      p.y += (p.ty - p.y) * 0.2;
      if (ring.current) ring.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const move = (e) => {
      p.tx = e.clientX;
      p.ty = e.clientY;
      const t = e.target.closest?.('[data-cursor]');
      setLabel(t ? t.dataset.cursor : '');
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  if (!on) return null;
  return (
    <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[150]" aria-hidden="true">
      <div
        className={`-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-glass font-mono text-[11px] uppercase tracking-[0.12em] text-ink transition-all duration-500 ease-expo ${
          label ? 'scale-100 px-3.5 py-2 opacity-100' : 'scale-0 px-0 py-0 opacity-0'
        }`}
        style={{ transformOrigin: 'center' }}
      >
        {label}
      </div>
    </div>
  );
}
