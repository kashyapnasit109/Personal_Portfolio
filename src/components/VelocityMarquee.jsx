import { useEffect, useRef } from 'react';
import { getLenis, prefersReduced } from '../lib/motion';

/*
  Two rows of huge type drifting in opposite directions. Scrolling pushes them faster
  and skews them in the direction of travel; at rest they drift slowly.
  Row one is filled with a photograph of London seen from The Shard.
*/
const WORDS = ['See', 'Reason', 'Ship'];

function Row({ rowRef, variant, words }) {
  const items = [...words, ...words, ...words, ...words];
  return (
    <div className="flex w-max will-change-transform" ref={rowRef}>
      {[0, 1].map((dup) => (
        <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
          {items.map((w, i) => (
            <span key={`${dup}-${i}`} className="flex items-center">
              <span
                className={`display px-[2vw] text-[clamp(88px,15vw,260px)] leading-[0.95] ${variant === 'photo' ? 'marquee-photo' : 'marquee-stroke'}`}
                style={{ fontStretch: '75%' }}
              >
                {w}
              </span>
              <span className={`font-serif text-[clamp(48px,7vw,120px)] italic ${variant === 'photo' ? 'text-glass' : 'text-ivory/30'}`}>✳</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function VelocityMarquee({ words = WORDS }) {
  const a = useRef(null);
  const b = useRef(null);
  const wrap = useRef(null);

  useEffect(() => {
    if (prefersReduced()) return;
    let raf;
    let xa = 0;
    let xb = 0;
    let skew = 0;
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: '200px' });
    io.observe(wrap.current);
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const v = getLenis()?.velocity ?? 0;
      const boost = Math.min(Math.abs(v) * 0.9, 40);
      const dir = v < 0 ? -1 : 1;
      const speed = 0.6 + boost;
      xa -= speed * dir;
      xb += speed * dir;
      const wa = a.current.scrollWidth / 2;
      const wb = b.current.scrollWidth / 2;
      if (xa <= -wa) xa += wa;
      if (xa > 0) xa -= wa;
      if (xb >= 0) xb -= wb;
      if (xb < -wb) xb += wb;
      skew += (Math.max(-8, Math.min(8, v * 0.35)) - skew) * 0.1;
      a.current.style.transform = `translate3d(${xa}px,0,0) skewX(${-skew}deg)`;
      b.current.style.transform = `translate3d(${xb}px,0,0) skewX(${skew}deg)`;
    };
    xb = -(b.current.scrollWidth / 2);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  return (
    <section ref={wrap} className="relative overflow-hidden border-y hairline bg-ink py-[clamp(40px,6vw,90px)]" aria-label="See, reason, ship">
      <p className="sr-only-f">See. Reason. Ship.</p>
      <Row words={words} rowRef={a} variant="photo" />
      <div className="-mt-[2vw]">
        <Row words={words} rowRef={b} variant="stroke" />
      </div>
    </section>
  );
}
