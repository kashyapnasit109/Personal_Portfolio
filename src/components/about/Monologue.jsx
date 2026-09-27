import { useEffect, useRef, useState } from 'react';
import { prefersReduced } from '../../lib/motion';

const LINES = [
  { me: true, t: 'Can this be solved better?' },
  { me: true, t: 'Can this be automated?' },
  { me: true, t: 'Could technology make this simpler?' },
  { me: true, t: 'Could this become a product?' },
  { me: true, t: 'Would people actually use it?' },
  { me: false, t: '…ok. Opening a new repo.' },
];

/* The entrepreneurial reflex, rendered as a chat with myself. Bubbles arrive as you scroll in. */
export default function Monologue() {
  const root = useRef(null);
  const [n, setN] = useState(prefersReduced() ? LINES.length : 0);
  useEffect(() => {
    if (prefersReduced()) return;
    let timer;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let k = 0;
      const next = () => { k += 1; setN(k); if (k < LINES.length) timer = setTimeout(next, k === LINES.length - 1 ? 1300 : 700); };
      timer = setTimeout(next, 300);
    }, { threshold: 0.4 });
    io.observe(root.current);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);
  return (
    <section ref={root} className="bg-ink py-[clamp(96px,12vw,180px)]" aria-labelledby="mono-title">
      <div className="frame grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="label text-glass">Chapter 09 · The reflex</span>
          <h2 id="mono-title" className="display mt-5 text-[clamp(52px,6.4vw,112px)]">
            Every problem gets <span className="serif-i font-normal text-glass">interviewed</span>.
          </h2>
          <p className="mt-6 max-w-[38ch] text-[15px] leading-relaxed text-ivory/65">
            Users, business models, scale, practicality, how it feels to use. The internal conversation goes roughly like this.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-6 lg:col-start-7" aria-live="polite">
          {LINES.map((l, i) => (
            <div
              key={l.t}
              className={`max-w-[80%] rounded-[22px] px-5 py-3.5 text-[17px] transition-all duration-700 ease-expo ${
                l.me ? 'self-end rounded-br-[6px] bg-glass text-ink' : 'self-start rounded-bl-[6px] bg-white/[0.07] text-ivory'
              } ${i < n ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
            >
              {l.t}
            </div>
          ))}
          <span className={`label mt-1 self-start text-mute transition-opacity duration-700 ${n >= LINES.length ? 'opacity-100' : 'opacity-0'}`}>Also me · read 1:07 a.m.</span>
          <div className={`flex gap-1 self-end px-4 py-3 ${n > 0 && n < LINES.length ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
            {[0, 1, 2].map((d) => <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ivory/50" style={{ animationDelay: `${d * 120}ms` }} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
