import { useEffect, useRef, useState } from 'react';
import { prefersReduced } from '../lib/motion';

const GLYPHS = '▯▮◇◆/\\|—_+=<>01XY#';

/*
  Decodes text like a model resolving a label: characters settle left to right.
  play: start when true (or when scrolled into view if play is undefined).
*/
export default function Scramble({ text, play, delay = 0, duration = 0.9, className = '' }) {
  const [out, setOut] = useState(text);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    if (prefersReduced()) { setOut(text); return; }
    const run = () => {
      if (done.current) return;
      done.current = true;
      const start = performance.now() + delay * 1000;
      const total = duration * 1000;
      let raf;
      const tick = (now) => {
        const t = Math.max(0, (now - start) / total);
        const settled = Math.floor(t * text.length);
        let s = '';
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          if (i < settled || c === ' ') s += c;
          else s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        setOut(s);
        if (t < 1) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    };
    if (play === undefined) {
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.6 });
      io.observe(ref.current);
      return () => io.disconnect();
    }
    if (play) return run();
    setOut(text.replace(/\S/g, ' '));
  }, [play, text, delay, duration]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
