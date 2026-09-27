import { useRef, useState } from 'react';
import { PiPlayDuotone, PiArrowsCounterClockwiseDuotone, PiTerminalWindowDuotone } from 'react-icons/pi';
import { buildLog } from '../../data/journey';
import { gsap, prefersReduced } from '../../lib/motion';

/* Semester 4 as a terminal session you can actually run. Ends in a small confetti burst. */
const COLORS = { cmd: 'text-ivory', dim: 'text-ivory/45', err: 'text-[#ff8a8a]', warn: 'text-[#FFB36B]', ok: 'text-[#7ee2a8]' };

export default function BuildToy() {
  const [lines, setLines] = useState([]);
  const [state, setState] = useState('idle'); // idle | running | done
  const box = useRef(null);
  const timers = useRef([]);

  const burst = () => {
    if (prefersReduced() || !box.current) return;
    const b = box.current;
    const colors = ['#9db8ff', '#7ee2a8', '#FFB36B', '#ece7dd'];
    for (let i = 0; i < 46; i++) {
      const p = document.createElement('span');
      p.className = 'pointer-events-none absolute rounded-[2px]';
      p.style.cssText = `left:70%;bottom:38px;width:${4 + Math.random() * 6}px;height:${6 + Math.random() * 8}px;background:${colors[i % 4]}`;
      b.appendChild(p);
      gsap.to(p, {
        x: (Math.random() - 0.5) * 520,
        y: -(120 + Math.random() * 260),
        rotation: Math.random() * 720 - 360,
        duration: 1.1 + Math.random() * 0.6,
        ease: 'power3.out',
      });
      gsap.to(p, { autoAlpha: 0, y: '+=120', duration: 0.9, delay: 1.1, ease: 'power1.in', onComplete: () => p.remove() });
    }
  };

  const run = () => {
    timers.current.forEach(clearTimeout);
    setLines([]);
    setState('running');
    let t = 0;
    buildLog.forEach((l, i) => {
      t += l.t === 'cmd' ? 150 : l.t === 'err' ? 650 : l.t === 'ok' ? 850 : 520;
      timers.current.push(setTimeout(() => {
        setLines((ls) => [...ls, l]);
        if (i === buildLog.length - 1) { setState('done'); burst(); }
      }, prefersReduced() ? 0 : t));
    });
  };

  return (
    <section className="bg-ink py-[clamp(80px,10vw,150px)]" aria-labelledby="toy-title">
      <div className="frame grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <span className="label text-glass">Interlude · Semester 4, reproduced</span>
          <h2 id="toy-title" className="display mt-5 text-[clamp(46px,6vw,100px)]">
            “Why isn’t this <span className="serif-i font-normal text-glass">working?”</span>
          </h2>
          <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-ivory/65">
            The most important sentence of my fourth semester, usually followed by a second one: “Okay. Let’s figure it out.” Go on — run it and see how the semester went.
          </p>
          <button
            type="button"
            onClick={run}
            disabled={state === 'running'}
            className="btn-pill mt-8 bg-glass text-ink hover:bg-ivory disabled:cursor-wait disabled:opacity-60"
          >
            {state === 'done' ? <PiArrowsCounterClockwiseDuotone aria-hidden="true" /> : <PiPlayDuotone aria-hidden="true" />}
            {state === 'idle' ? 'Run semester 4' : state === 'running' ? 'Compiling…' : 'Run it again'}
          </button>
        </div>
        <div className="lg:col-span-7">
          <div ref={box} className="relative overflow-hidden rounded-[16px] border border-white/12 bg-[#05070b] shadow-[0_60px_120px_-50px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" /><span className="h-3 w-3 rounded-full bg-[#febc2e]" /><span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="label ml-3 flex items-center gap-2 text-ivory/45"><PiTerminalWindowDuotone aria-hidden="true" /> kashyap@charusat — sem-04</span>
            </div>
            <div className="min-h-[340px] p-5 font-mono text-[13px] leading-7 md:p-6 md:text-[14px]" aria-live="polite">
              {lines.length === 0 && <p className="text-ivory/35">$ <span className="animate-pulse">▍</span> press “Run semester 4”</p>}
              {lines.map((l, i) => (
                <p key={i} className={COLORS[l.t]} style={{ animation: 'termin .35s ease' }}>{l.s}</p>
              ))}
              {state === 'running' && <p className="text-ivory/40"><span className="animate-pulse">▍</span></p>}
            </div>
          </div>
        </div>
      </div>
      <style>{'@keyframes termin { from { opacity: 0; transform: translateX(-6px); } }'}</style>
    </section>
  );
}
