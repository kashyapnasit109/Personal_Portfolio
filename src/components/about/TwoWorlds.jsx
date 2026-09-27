import { useEffect, useRef, useState } from 'react';

/*
  Drag the seam: the complexity of technology on one side, the simplicity of nature on the other.
  Keyboard: arrow keys move the seam.
*/
export default function TwoWorlds() {
  const box = useRef(null);
  const [x, setX] = useState(50);
  const drag = useRef(false);

  useEffect(() => {
    const move = (e) => {
      if (!drag.current) return;
      const b = box.current.getBoundingClientRect();
      setX(Math.max(4, Math.min(96, ((e.clientX - b.left) / b.width) * 100)));
    };
    const up = () => { drag.current = false; };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  }, []);

  return (
    <section className="bg-ink py-[clamp(96px,12vw,180px)]" aria-labelledby="worlds-title">
      <div className="frame">
        <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <span className="label text-glass">Chapter 06 · Two worlds</span>
            <h2 id="worlds-title" className="display mt-5 text-[clamp(52px,7vw,124px)]">
              I need <span className="serif-i font-normal text-glass">both</span>.
            </h2>
          </div>
          <p className="max-w-[40ch] text-[15px] leading-relaxed text-ivory/65 md:col-span-4">
            Glass towers and a quiet coast. One trains the brain, the other resets it. Drag the seam.
          </p>
        </div>

        <div
          ref={box}
          className="relative aspect-[4/5] w-full touch-none select-none overflow-hidden rounded-[8px] md:aspect-[16/8]"
          onPointerDown={(e) => { drag.current = true; const b = box.current.getBoundingClientRect(); setX(Math.max(4, Math.min(96, ((e.clientX - b.left) / b.width) * 100))); }}
          data-cursor="Drag"
        >
          <img src="/img/lens/c22.webp" alt="A quiet coastal gorge with a footbridge and the sea beyond" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
            <img src="/img/lens/c16.webp" alt="The Gherkin between glass towers in the City of London" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="absolute inset-y-0" style={{ left: `${x}%` }}>
            <div className="absolute inset-y-0 -left-px w-[2px] bg-ivory" />
            <button
              className="absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory font-mono text-[13px] text-ink shadow-xl"
              aria-label="Move the divider between technology and nature"
              onKeyDown={(e) => { if (e.key === 'ArrowLeft') setX((v) => Math.max(4, v - 4)); if (e.key === 'ArrowRight') setX((v) => Math.min(96, v + 4)); }}
            >
              ⟷
            </button>
          </div>
          <div className="pointer-events-none absolute left-5 top-5 max-w-[46%]">
            <span className="label rounded-full bg-ink/60 px-3 py-1.5 text-ivory backdrop-blur-md">The complexity of technology</span>
          </div>
          <div className="pointer-events-none absolute right-5 top-5 max-w-[46%] text-right">
            <span className="label rounded-full bg-ink/60 px-3 py-1.5 text-ivory backdrop-blur-md">The simplicity of nature</span>
          </div>
        </div>
      </div>
    </section>
  );
}
