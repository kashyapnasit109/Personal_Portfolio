import { useEffect, useRef } from 'react';
import { K_PATH, kTransform } from './KMark';
import { gsap, prefersReduced, whenVisible } from '../lib/motion';

/*
  The k, signed large. As it scrolls into view the orbit and the letter are drawn in one
  continuous stroke, then the ink fills. Hover and the orbit spins up; the k turns blue.
*/
export default function Signature({ className = '' }) {
  const root = useRef(null);
  const ring = useRef(null);
  const glyph = useRef(null);
  const spin = useRef(null);

  useEffect(() => {
    const g = glyph.current;
    const r = ring.current;
    const gl = g.getTotalLength();
    const rl = r.getTotalLength();
    if (prefersReduced()) { gsap.set(g, { fillOpacity: 1 }); return undefined; }
    const dot = root.current.querySelector('[data-dot]');
    gsap.set(g, { strokeDasharray: gl, strokeDashoffset: gl, fillOpacity: 0 });
    gsap.set(r, { strokeDasharray: rl, strokeDashoffset: rl });
    gsap.set(dot, { autoAlpha: 0 });
    spin.current = gsap.to(root.current.querySelector('[data-orbit]'), { rotation: 360, svgOrigin: '300 300', duration: 24, ease: 'none', repeat: -1 });
    let tl = null;
    const off = whenVisible(root.current, () => {
      tl = gsap.timeline();
      tl.to(r, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' })
        .to(dot, { autoAlpha: 1, duration: 0.3 }, '-=0.2')
        .to(g, { strokeDashoffset: 0, duration: 1.8, ease: 'power1.inOut' }, 0.35)
        .to(g, { fillOpacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2');
    }, { margin: '0px 0px -20% 0px' });
    return () => { off(); tl?.kill(); spin.current?.kill(); };
  }, []);

  const speed = (v) => spin.current && gsap.to(spin.current, { timeScale: v, duration: 0.8 });

  return (
    <svg
      ref={root}
      viewBox="0 0 600 600"
      className={`signature group overflow-visible ${className}`}
      onPointerEnter={() => speed(6)}
      onPointerLeave={() => speed(1)}
      role="img"
      aria-label="Kashyap's k signature"
    >
      <g data-orbit>
        <ellipse ref={ring} cx="300" cy="300" rx="330" ry="126" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" transform="rotate(-28 300 300)" />
        <circle data-dot cx={300 + 330 * Math.cos(-0.489)} cy={300 + 330 * Math.sin(-0.489)} r="5" fill="#9db8ff" />
      </g>
      <path
        ref={glyph}
        d={K_PATH}
        transform={kTransform(305, 292, 0.5)}
        className="fill-ivory transition-[fill] duration-500 group-hover:fill-[#9db8ff]"
        stroke="#ece7dd"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
