import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FiX, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { PiEngineDuotone, PiArrowFatUpDuotone, PiMaskHappyDuotone, PiForkKnifeDuotone, PiMoonStarsDuotone, PiMapTrifoldDuotone, PiCameraDuotone, PiSquaresFourDuotone } from 'react-icons/pi';
import { Flip } from 'gsap/Flip';
import { clicks, collections } from '../../data/clicks';
import { gsap, prefersReduced, getLenis, ScrollTrigger, revealWords } from '../../lib/motion';

gsap.registerPlugin(Flip);

const ICONS = { all: PiSquaresFourDuotone, engines: PiEngineDuotone, up: PiArrowFatUpDuotone, museum: PiMaskHappyDuotone, food: PiForkKnifeDuotone, night: PiMoonStarsDuotone, places: PiMapTrifoldDuotone, me: PiCameraDuotone };
const WIDE = new Set(['c05', 'c09', 'm5']);

export function Lightbox({ list, i, onClose, onStep }) {
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', k);
    getLenis()?.stop();
    return () => { window.removeEventListener('keydown', k); getLenis()?.start(); };
  }, [onClose, onStep]);
  const c = list[i];
  return (
    <div className="fixed inset-0 z-[170] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={c.title} onClick={onClose}>
      <figure className="relative flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img key={c.src} src={c.src} alt={c.title} className="max-h-[80vh] w-auto max-w-[92vw] rounded-[6px] object-contain" style={{ animation: 'lbIn 0.7s cubic-bezier(0.16,1,0.3,1)' }} />
        <figcaption className="mt-4 flex w-full items-baseline justify-between gap-6">
          <span className="font-serif text-[22px] italic">{c.title}</span>
          <span className="label text-ivory/50">{i + 1} / {list.length} · {c.meta}</span>
        </figcaption>
      </figure>
      <button onClick={onClose} className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-glass hover:text-glass" aria-label="Close"><FiX /></button>
      <button onClick={(e) => { e.stopPropagation(); onStep(-1); }} className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-glass hover:text-glass" aria-label="Previous photo"><FiArrowLeft /></button>
      <button onClick={(e) => { e.stopPropagation(); onStep(1); }} className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-glass hover:text-glass" aria-label="Next photo"><FiArrowRight /></button>
      <style>{'@keyframes lbIn{from{opacity:0;transform:scale(.96) translateY(10px)}to{opacity:1;transform:none}}'}</style>
    </div>
  );
}

export default function Collections() {
  const root = useRef(null);
  const title = useRef(null);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(-1);
  const pending = useRef(null);
  const list = filter === 'all' ? clicks : clicks.filter((c) => c.cat === filter);
  const col = collections.find((c) => c.id === filter);

  useEffect(() => { revealWords(title.current); }, []);

  const pick = (id) => {
    if (id === filter) return;
    if (!prefersReduced()) pending.current = Flip.getState(root.current.querySelectorAll('[data-item]'));
    setFilter(id);
  };

  useLayoutEffect(() => {
    if (!pending.current) return;
    Flip.from(pending.current, {
      duration: 0.85,
      ease: 'expo.inOut',
      absolute: true,
      stagger: 0.012,
      scale: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'expo.out', delay: 0.25 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
    pending.current = null;
  }, [filter]);

  const onClose = useCallback(() => setOpen(-1), []);
  const onStep = useCallback((d) => setOpen((v) => (v + d + list.length) % list.length), [list.length]);

  return (
    <section ref={root} className="bg-ink pb-[clamp(96px,12vw,180px)] pt-[clamp(80px,10vw,140px)]" aria-labelledby="coll-title">
      <div className="frame">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="label text-glass">The camera roll · {clicks.length} frames</span>
            <h2 id="coll-title" ref={title} className="display mt-5 text-[clamp(56px,8vw,140px)]">
              Things I <span data-nosplit className="serif-i font-normal text-glass">stopped</span> for.
            </h2>
          </div>
          <p className="max-w-[40ch] text-[15px] leading-relaxed text-ivory/60 md:col-span-4 md:col-start-9">
            Filed into collections, because apparently I have <em className="serif-i text-[18px] text-ivory/85">themes</em>. Pick one, then hover a photo to develop it.
          </p>
        </div>

        <div className="no-scrollbar -mx-[var(--gutter)] mt-10 flex gap-2 overflow-x-auto px-[var(--gutter)] md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Collections">
          {collections.map((c) => {
            const Icon = ICONS[c.id];
            const n = c.id === 'all' ? clicks.length : clicks.filter((x) => x.cat === c.id).length;
            const on = filter === c.id;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={on}
                onClick={() => pick(c.id)}
                className={`group inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[14px] transition-all duration-500 ease-expo ${on ? 'border-glass bg-glass text-ink' : 'border-white/15 text-ivory/75 hover:-translate-y-0.5 hover:border-white/40'}`}
              >
                <Icon className="text-[17px] transition-transform duration-500 ease-expo group-hover:scale-125 group-hover:rotate-[-10deg]" aria-hidden="true" />
                {c.label}
                <span className={`font-mono text-[11px] ${on ? 'text-ink/60' : 'text-ivory/35'}`}>{n}</span>
              </button>
            );
          })}
        </div>
        <p key={filter} className="mt-5 min-h-[1.6em] font-serif text-[clamp(18px,1.6vw,22px)] italic text-ivory/70" style={{ animation: 'collin .5s cubic-bezier(.16,1,.3,1)' }}>{col.note}</p>

        <div className="mt-8 grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {clicks.map((c) => {
            const shown = filter === 'all' || c.cat === filter;
            const wide = WIDE.has(c.id);
            return (
              <button
                key={c.id}
                data-item
                data-flip-id={c.id}
                data-spot
                onClick={() => setOpen(list.indexOf(c))}
                className={`dev group relative block overflow-hidden rounded-[8px] text-left ${shown ? '' : 'hidden'} ${wide ? 'col-span-2' : ''}`}
                data-cursor="Open"
                aria-label={`Open photo: ${c.title}`}
              >
                <img src={c.thumb} alt="" loading="lazy" className={`block w-full object-cover grayscale brightness-[0.62] ${wide ? 'aspect-[3/2]' : 'aspect-[3/4]'}`} />
                <img src={c.thumb} alt={c.title} loading="lazy" className={`dev-color absolute inset-0 h-full w-full object-cover ${wide ? 'aspect-[3/2]' : 'aspect-[3/4]'}`} />
                <span className="absolute inset-x-0 bottom-0 z-[2] translate-y-2 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-12 opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <span className="block font-serif text-[18px] italic leading-tight">{c.title}</span>
                  <span className="label mt-1 block text-ivory/55">{c.meta}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {open >= 0 && <Lightbox list={list} i={open} onClose={onClose} onStep={onStep} />}
      <style>{'@keyframes collin { from { opacity: 0; transform: translateY(8px); } }'}</style>
    </section>
  );
}
