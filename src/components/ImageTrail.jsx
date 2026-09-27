import { useEffect, useRef } from 'react';
import { gsap, prefersReduced } from '../lib/motion';

/*
  Moving the pointer across the area leaves a trail of photographs.
  Emits by distance travelled (not by time) so fast and slow gestures leave the same rhythm.
*/
export default function ImageTrail({ images, children, className = '', step = 110 }) {
  const root = useRef(null);
  const layer = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReduced() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const pool = images.map((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.decoding = 'async';
      img.className = 'pointer-events-none absolute left-0 top-0 w-[clamp(120px,11vw,190px)] rounded-[4px] object-cover opacity-0 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]';
      img.style.aspectRatio = '3 / 4';
      layer.current.appendChild(img);
      return img;
    });
    let i = 0;
    let z = 1;
    let last = null;
    const move = (e) => {
      const b = el.getBoundingClientRect();
      const x = e.clientX - b.left;
      const y = e.clientY - b.top;
      if (!last) { last = { x, y }; return; }
      const d = Math.hypot(x - last.x, y - last.y);
      if (d < step) return;
      const img = pool[i % pool.length];
      i += 1;
      const w = img.offsetWidth || 160;
      const h = w * (4 / 3);
      gsap.killTweensOf(img);
      gsap.set(img, { x: last.x - w / 2, y: last.y - h / 2, opacity: 1, scale: 0.6, rotate: (Math.random() - 0.5) * 12, zIndex: z++ });
      gsap.to(img, { x: x - w / 2, y: y - h / 2, scale: 1, duration: 0.9, ease: 'expo.out' });
      gsap.to(img, { opacity: 0, scale: 0.85, duration: 0.8, delay: 0.55, ease: 'power2.in' });
      last = { x, y };
    };
    const leave = () => { last = null; };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      pool.forEach((p) => p.remove());
    };
  }, [images, step]);

  return (
    <div ref={root} className={`relative ${className}`}>
      <div ref={layer} className="pointer-events-none absolute inset-0 z-0 overflow-visible" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
