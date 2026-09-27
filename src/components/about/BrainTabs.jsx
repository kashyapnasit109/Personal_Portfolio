import { useEffect, useRef, useState } from 'react';
import { brainTabs } from '../../data/about';
import { prefersReduced, revealBlocks } from '../../lib/motion';

/*
  "The brain, in tabs" — a browser window where every tab is a rabbit hole that actually
  went somewhere. Tabs cycle on their own until you click one. The close buttons don't work;
  that's the point.
*/
export default function BrainTabs() {
  const root = useRef(null);
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [nope, setNope] = useState(-1);
  const t = brainTabs[i];
  const strip = useRef(null);
  useEffect(() => {
    const s = strip.current; const el = s?.children[i];
    if (!s || !el) return;
    const x = el.offsetLeft - (s.clientWidth - el.offsetWidth) / 2;
    s.scrollTo({ left: Math.max(0, x), behavior: 'smooth' });
  }, [i]);

  useEffect(() => revealBlocks(root.current), []);
  useEffect(() => {
    if (!auto || prefersReduced()) return;
    const id = setInterval(() => setI((v) => (v + 1) % brainTabs.length), 5200);
    return () => clearInterval(id);
  }, [auto]);

  const pick = (k) => { setAuto(false); setI(k); };
  const close = (e, k) => {
    e.stopPropagation();
    setNope(k);
    setTimeout(() => setNope(-1), 2200);
  };

  return (
    <section ref={root} className="bg-ink py-[clamp(96px,12vw,180px)]" aria-labelledby="tabs-title">
      <div className="frame">
        <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="label text-glass">Chapter 02 · The brain, in tabs</span>
            <h2 id="tabs-title" className="display mt-5 text-[clamp(52px,7.4vw,128px)]">
              Currently <span className="serif-i font-normal text-glass">open</span> in my head.
            </h2>
          </div>
          <p className="max-w-[40ch] text-[15px] leading-relaxed text-ivory/65 md:col-span-4 md:col-start-9">
            Every tab started as a small question. A few of them turned into systems, a few into opinions, and all of them are still open. Try closing one.
          </p>
        </div>

        <div data-reveal className="overflow-hidden rounded-[14px] border border-white/10 bg-ink-2 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.9)]">
          {/* window chrome */}
          <div className="flex items-center gap-3 border-b border-white/10 px-4 pt-3">
            <div className="mb-3 flex gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div ref={strip} className="no-scrollbar flex min-w-0 flex-1 gap-1 overflow-x-auto" role="tablist" aria-label="Open tabs">
              {brainTabs.map((b, k) => (
                <button
                  key={b.id}
                  role="tab"
                  aria-selected={k === i}
                  onClick={() => pick(k)}
                  className={`group relative flex max-w-[230px] shrink-0 items-center gap-2 rounded-t-[10px] px-3.5 py-2.5 text-left text-[13px] transition-colors duration-300 ${
                    k === i ? 'bg-ink text-ivory' : 'text-ivory/50 hover:bg-white/[0.04] hover:text-ivory/80'
                  } ${nope === k ? 'animate-[tabnope_0.45s_ease-in-out_2]' : ''}`}
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${k === i ? 'bg-glass' : 'bg-white/25'}`} />
                  <span className="truncate">{b.tab}</span>
                  <span
                    role="button"
                    tabIndex={-1}
                    aria-label="Close tab (it won't)"
                    onClick={(e) => close(e, k)}
                    className="ml-1 rounded px-1 text-ivory/40 hover:bg-white/10 hover:text-ivory"
                  >
                    ×
                  </span>
                </button>
              ))}
            </div>
            <span className="label mb-3 hidden shrink-0 text-mute lg:block">{brainTabs.length} of too many</span>
          </div>

          {/* address bar */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-ink px-4 py-2.5">
            <span className="font-mono text-[12px] text-ivory/35">⟵ ⟶ ↻</span>
            <div className="flex-1 truncate rounded-full bg-white/[0.05] px-4 py-1.5 font-mono text-[12px] text-ivory/60">
              {nope >= 0 ? <span className="text-glass">error: tab.close() refused — still curious about "{brainTabs[nope].tab}"</span> : <>kashyap://rabbit-holes/{t.id}</>}
            </div>
          </div>

          {/* page */}
          <div key={t.id} className="grid gap-10 bg-ink p-7 md:grid-cols-12 md:p-12" style={{ animation: 'tabin 0.7s cubic-bezier(0.16,1,0.3,1)' }} role="tabpanel">
            <div className="md:col-span-7">
              <span className="label text-glass">{t.domain}</span>
              <h3 className="display mt-5 text-[clamp(38px,4.4vw,76px)]">{t.title}</h3>
            </div>
            <div className="flex flex-col justify-end md:col-span-5">
              <p className="text-[16px] leading-relaxed text-ivory/75">{t.body}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {t.tags.map((g) => (
                  <span key={g} className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[11px] text-ivory/60">{g}</span>
                ))}
              </div>
            </div>
          </div>
          {auto && !prefersReduced() && (
            <div className="h-[2px] bg-white/5">
              <div key={i} className="h-full bg-glass" style={{ animation: 'tabbar 5.2s linear' }} />
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes tabin { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes tabbar { from { width: 0% } to { width: 100% } }
        @keyframes tabnope { 0%,100% { transform: translateX(0) } 25% { transform: translateX(-5px) } 75% { transform: translateX(5px) } }
      `}</style>
    </section>
  );
}
