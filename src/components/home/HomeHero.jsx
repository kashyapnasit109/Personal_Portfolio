import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import { gsap, prefersReduced, getLenis } from '../../lib/motion';
import { TLink } from '../../lib/transition';
import Roll from '../Roll';
import VFWordmark from '../VFWordmark';
import PreviewWord from '../PreviewWord';
import KMark, { K_PATH, K_BOX, kTransform } from '../KMark';
import { startReveal } from '../../lib/alterReveal';

/*
  Home hero — "Signed, k."
  Loader: the k signature (the same k as the logo) draws itself inside its orbit while the
  count runs. The golden-hour portrait then appears *inside* the letter, and the camera
  dives through the k's stem until the letter becomes the whole screen — the hero.
  After landing, nothing ever sits on the photograph: the name slides in behind him,
  hand-drawn field notes point at him from the margins, the letters of KASHYAP are an
  acrostic, and a spinning k-badge waits in the corner.
*/

const LAYOUT = {
  w: { bg: '/img/hero-comp-w.webp', cut: '/img/hero-cut-w.webp', W: 2400, H: 1500, pos: [0.66, 0.3], face: [1712, 540] },
  t: { bg: '/img/hero-comp-t.webp', cut: '/img/hero-cut-t.webp', W: 1200, H: 1600, pos: [0.47, 0.26], face: [686, 690] },
};

const ACROSTIC = [
  'Kinetic — rarely sits still.',
  'Architect of boxes and arrows.',
  'Systems thinker, certified overthinker.',
  'Hackathon winner. Once. So far.',
  'Yes, another tab.',
  'AI — the useful kind.',
  'Photographer, when the light cooperates.',
];

// field notes: arrow tips sit just outside the silhouette, never on it
const NOTES = [
  { id: 'brain', tip: [0.797, 0.198], dx: 70, dy: 30, align: 'left', k: 'Fig. 1 — the processor', v: '47 tabs open in here. All of them important.' },
  { id: 'light', tip: [0.646, 0.262], dx: -84, dy: -84, align: 'right', k: 'Fig. 2 — the lighting', v: 'Golden hour. Not planned. Still taking full credit.' },
];

// alternate lives, each placed so his eyes land exactly where the photograph's eyes are
const VISIONS = [
  { id: 'racer', label: 'Alter ego · The Gentleman Racer', title: 'The Gentleman Racer', where: 'Riviera, 1962', next: 'the photographer' },
  { id: 'photographer', label: 'Alter ego · The Travelling Photographer', title: 'The Travelling Photographer', where: 'Florence, golden hour', next: 'the racer' },
];

const QUIPS = ['Signing the portfolio', 'Closing 46 of 47 tabs', 'Finding golden hour', 'Calibrating curiosity'];

let introPlayed = false;

function mapPt(cw, ch, L, u, v) {
  const s = Math.max(cw / L.W, ch / L.H);
  const iw = L.W * s;
  const ih = L.H * s;
  return [(cw - iw) * L.pos[0] + u * iw, (ch - ih) * L.pos[1] + v * ih];
}

function arrowPath(sx, sy, tx, ty) {
  const c1x = sx + (tx - sx) * 0.15;
  const c1y = sy - 46;
  const c2x = tx + (sx - tx) * 0.4;
  const c2y = ty - 38;
  const a = Math.atan2(ty - c2y, tx - c2x);
  const h = 11;
  const l = [tx - h * Math.cos(a - 0.5), ty - h * Math.sin(a - 0.5)];
  const r = [tx - h * Math.cos(a + 0.5), ty - h * Math.sin(a + 0.5)];
  return {
    body: `M${sx},${sy} C${c1x},${c1y} ${c2x},${c2y} ${tx},${ty}`,
    head: `M${l[0]},${l[1]} L${tx},${ty} L${r[0]},${r[1]}`,
  };
}

function Clock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }));
    f();
    const id = setInterval(f, 20000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t}</span>;
}

/* Rotating type-ring with the k at its heart. Spins faster while hovered. */
function KBadge() {
  const ring = useRef(null);
  const tw = useRef(null);
  useEffect(() => {
    if (prefersReduced()) return;
    tw.current = gsap.to(ring.current, { rotation: 360, duration: 20, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
    return () => tw.current?.kill();
  }, []);
  const speed = (v) => tw.current && gsap.to(tw.current, { timeScale: v, duration: 0.6, ease: 'power2.out' });
  return (
    <TLink
      to="/about"
      data-fade
      className="k-badge group absolute bottom-[112px] right-[var(--gutter)] z-30 hidden h-[128px] w-[128px] md:block"
      onPointerEnter={() => speed(5)}
      onPointerLeave={() => speed(1)}
      aria-label="About Kashyap"
      data-cursor="Meet him"
    >
      <span className="absolute inset-0 rounded-full border border-white/10 bg-ink/35 backdrop-blur-md transition-colors duration-500 group-hover:border-glass/50 group-hover:bg-glass/10" />
      <svg ref={ring} viewBox="0 0 200 200" className="absolute inset-0 h-full w-full text-ivory/70 transition-colors duration-500 group-hover:text-glass" aria-hidden="true">
        <defs>
          <path id="kbadge-circle" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text fontSize="13" letterSpacing="3.4" fill="currentColor" className="font-mono uppercase">
          <textPath href="#kbadge-circle">Engineer · Explorer · Occasional comedian ·</textPath>
        </text>
      </svg>
      <KMark size={52} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-ivory transition-all duration-700 ease-expo group-hover:rotate-[-28deg] group-hover:scale-110 group-hover:text-glass" />
    </TLink>
  );
}

export default function HomeHero() {
  const root = useRef(null);
  const stage = useRef(null);
  const nameLayer = useRef(null);
  const hole = useRef(null);
  const outline = useRef(null);
  const ringG = useRef(null);
  const ringE = useRef(null);
  const [first] = useState(() => !introPlayed);
  const [tall] = useState(() => window.innerWidth / window.innerHeight < 0.95);
  const L = tall ? LAYOUT.t : LAYOUT.w;
  const [box, setBox] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [n, setN] = useState(first ? 0 : 100);
  const [quip, setQuip] = useState(0);
  const [live, setLive] = useState(!first);
  const [ready, setReady] = useState(false);
  const [cap, setCap] = useState(null);
  const [hoverNote, setHoverNote] = useState(null);
  const [vision, setVision] = useState(0);
  const [lensOn, setLensOn] = useState(false);
  const [fullOn, setFullOn] = useState(false);
  const chip = useRef(null);
  const canvasA = useRef(null);
  const canvasB = useRef(null);
  const counter = useRef({ v: 0 });
  const zoom = useRef(null);

  const measure = useCallback(() => {
    const r = root.current?.getBoundingClientRect();
    if (r) setBox({ w: r.width, h: r.height });
  }, []);
  useLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // loader geometry: the k sits centred, about half the screen tall
  const cx = box.w / 2;
  const cy = box.h / 2;
  const kh = Math.min(box.h * 0.5, 440);
  const s0 = kh / K_BOX.h;
  if (!zoom.current) zoom.current = { s: s0, ax: K_BOX.cx, ay: K_BOX.cy };

  // initial hidden states (JS only, so the page is complete without it)
  useLayoutEffect(() => {
    const el = root.current;
    if (prefersReduced()) return;
    gsap.set(el.querySelectorAll('.vf-char'), { yPercent: 105 });
    gsap.set(el.querySelectorAll('[data-fade]'), { autoAlpha: 0, y: 22 });
    gsap.set(el.querySelectorAll('[data-note-draw]'), { strokeDasharray: 600, strokeDashoffset: 600 });
    gsap.set(el.querySelectorAll('[data-note-text]'), { autoAlpha: 0, y: 10 });
    if (first) gsap.set(stage.current, { scale: 1.14 });
  }, [first]);

  useEffect(() => {
    let left = 2;
    const done = () => { left -= 1; if (!left) setReady(true); };
    [L.bg, L.cut].forEach((src) => { const im = new Image(); im.onload = im.onerror = done; im.src = src; });
  }, [L.bg, L.cut]);

  // loading: the orbit draws and turns, the k is signed stroke by stroke with the count
  useEffect(() => {
    if (!first) return;
    document.documentElement.classList.add('is-loading');
    getLenis()?.stop();
    const reduced = prefersReduced();
    const q = setInterval(() => setQuip((v) => (v + 1) % QUIPS.length), 720);
    const len = outline.current.getTotalLength();
    gsap.set(outline.current, { strokeDasharray: len, strokeDashoffset: len });
    const ringLen = ringE.current.getTotalLength();
    gsap.fromTo(ringE.current, { strokeDasharray: ringLen, strokeDashoffset: ringLen }, { strokeDashoffset: 0, duration: reduced ? 0.01 : 1.6, ease: 'power3.inOut' });
    const spin = reduced ? null : gsap.to(ringG.current, { rotation: 360, svgOrigin: `${cx} ${cy}`, duration: 16, ease: 'none', repeat: -1 });
    const t = gsap.to(counter.current, {
      v: 88,
      duration: reduced ? 0.01 : 2.4,
      ease: 'power2.out',
      onUpdate: () => {
        const v = counter.current.v;
        setN(Math.round(v));
        if (outline.current) outline.current.style.strokeDashoffset = String(len * (1 - Math.min(1, v / 84)));
      },
    });
    return () => { t.kill(); spin?.kill(); clearInterval(q); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first]);

  const [minDone, setMinDone] = useState(!first);
  useEffect(() => {
    if (!first) return;
    const t = setTimeout(() => setMinDone(true), prefersReduced() ? 0 : 2400);
    return () => clearTimeout(t);
  }, [first]);

  // finish: the photo appears inside the k, then we dive through its stem
  useEffect(() => {
    if (!first || !ready || !minDone || live) return;
    const reduced = prefersReduced();
    const d = (x) => (reduced ? 0.01 : x);
    const z = zoom.current;
    const s1 = (2.6 * Math.max(box.w, box.h)) / K_BOX.stem.w;
    const apply = () => {
      const tr = kTransform(cx, cy, z.s, z.ax, z.ay);
      hole.current?.setAttribute('transform', tr);
      outline.current?.setAttribute('transform', tr);
    };
    const tl = gsap.timeline({
      onComplete: () => {
        introPlayed = true;
        document.documentElement.classList.remove('is-loading');
        getLenis()?.start();
        setLive(true);
      },
    });
    tl.to(counter.current, { v: 100, duration: d(0.45), ease: 'power2.inOut', onUpdate: () => setN(Math.round(counter.current.v)) });
    tl.set(outline.current, { strokeDashoffset: 0 }, '<');
    tl.to(hole.current, { attr: { 'fill-opacity': 1 }, duration: d(0.7), ease: 'power2.inOut' }, '>-0.1');
    tl.to(root.current.querySelectorAll('[data-hud]'), { autoAlpha: 0, y: -10, duration: d(0.4), stagger: 0.03 }, '<0.2');
    tl.to(ringG.current, { autoAlpha: 0, scale: 1.4, svgOrigin: `${cx} ${cy}`, duration: d(0.7), ease: 'power2.in' }, '<');
    tl.to(outline.current, { autoAlpha: 0, duration: d(0.35) }, '+=0.25');
    tl.to(z, { s: s1, ax: K_BOX.stem.x, ay: K_BOX.stem.y, duration: d(1.5), ease: 'expo.inOut', onUpdate: apply }, '<');
    tl.to(stage.current, { scale: 1, duration: d(2), ease: 'expo.out' }, '<0.35');
    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first, ready, minDone, live]);

  // live: name rises behind him, notes are drawn, copy settles
  useEffect(() => {
    if (!live) return;
    introPlayed = true;
    const el = root.current;
    const reduced = prefersReduced();
    if (reduced) {
      gsap.set(el.querySelectorAll('.vf-char, [data-fade], [data-note-text]'), { clearProps: 'opacity,visibility,transform' });
      gsap.set(el.querySelectorAll('[data-note-draw]'), { strokeDashoffset: 0 });
      return;
    }
    gsap.to(el.querySelectorAll('.vf-char'), { yPercent: 0, duration: 1.25, ease: 'expo.out', stagger: 0.055, delay: first ? 0 : 0.2 });
    gsap.to(el.querySelectorAll('[data-fade]'), { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.07, delay: 0.3 });
    gsap.to(el.querySelectorAll('[data-note-draw]'), { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.25, delay: 0.9 });
    gsap.to(el.querySelectorAll('[data-note-text]'), { autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.3, delay: 1.1 });
    if (!first) gsap.fromTo(stage.current, { scale: 1.06, autoAlpha: 0.3 }, { scale: 1, autoAlpha: 1, duration: 1.4, ease: 'expo.out' });

    // the name drifts against the pointer; the photograph never moves under the cursor
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const xTo = gsap.quickTo(nameLayer.current, 'x', { duration: 1.1, ease: 'power3.out' });
    const yTo = gsap.quickTo(nameLayer.current, 'y', { duration: 1.1, ease: 'power3.out' });
    const move = (e) => {
      xTo(-(e.clientX / window.innerWidth - 0.5) * 26);
      yTo(-(e.clientY / window.innerHeight - 0.5) * 14);
    };
    if (fine) window.addEventListener('pointermove', move, { passive: true });

    const ctx = gsap.context(() => {
      const st = { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.5 };
      gsap.to(stage.current, { scale: 1.08, ease: 'none', scrollTrigger: st });
      gsap.to('[data-namewrap]', { yPercent: -45, ease: 'none', scrollTrigger: st });
      gsap.to('[data-shade]', { opacity: 0.8, ease: 'none', scrollTrigger: st });
      gsap.to('[data-notes]', { autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: '30% top', scrub: true } });
    }, el);
    return () => {
      ctx.revert();
      if (fine) window.removeEventListener('pointermove', move);
    };
  }, [live, first]);

  // the alter-ego reveal: the pointer paints another version of him in, with a liquid trail
  useEffect(() => {
    if (!live || prefersReduced()) return undefined;
    const el = root.current;
    const k = tall ? 't' : 'w';
    const fx = startReveal({
      root: el,
      canvasA: canvasA.current,
      canvasB: canvasB.current,
      layout: L,
      hero: { bg: L.bg, cut: L.cut },
      modes: VISIONS.map((v) => ({ bg: `/img/alter-${v.id}-${k}.webp`, cut: `/img/alter-${v.id}-cut-${k}.webp` })),
      onChange: setVision,
      onFull: setFullOn,
    });
    const inPhoto = (t) => t && t.closest && t.closest('[data-stage]') && !t.closest('[data-no-lens]');
    const place = (x, y) => {
      if (!chip.current) return;
      const w = chip.current.firstChild?.offsetWidth || 300;
      const flip = x + w + 40 > el.clientWidth;
      chip.current.style.transform = `translate(${flip ? x - w - 48 : x}px, ${y}px)`;
    };
    const move = (e) => {
      if (e.pointerType === 'touch') return;
      const b = el.getBoundingClientRect();
      const x = e.clientX - b.left;
      const y = e.clientY - b.top;
      const ok = inPhoto(e.target) && window.scrollY < b.height * 0.3;
      if (ok) { fx.move(x, y); place(x, y); setLensOn(true); } else { fx.leave(); setLensOn(false); }
    };
    const leave = () => { fx.leave(); setLensOn(false); };
    const at = (e) => {
      const b = el.getBoundingClientRect();
      return [e.clientX - b.left, e.clientY - b.top];
    };
    const coarse = () => !window.matchMedia('(hover: hover)').matches;
    // single click switches lives; a double click opens (or closes) the full transformation.
    // The single-click action waits a beat so a double click never also triggers it.
    let pending = null;
    const click = (e) => {
      if (!inPhoto(e.target)) return;
      const [x, y] = at(e);
      if (e.pointerType === 'touch' || coarse()) {
        // touch: tap transforms into the racer, tap again becomes the photographer, then home
        if (!fx.full) { fx.setMode(0, x, y); fx.toggleFull(x, y); return; }
        if (fx.mode === 0) { fx.setMode(1, x, y); return; }
        fx.toggleFull(x, y);
        return;
      }
      if (e.detail > 1) return;
      clearTimeout(pending);
      pending = setTimeout(() => fx.setMode((fx.mode + 1) % VISIONS.length, x, y), 240);
    };
    const dbl = (e) => {
      if (!inPhoto(e.target) || coarse()) return;
      clearTimeout(pending);
      e.preventDefault();
      window.getSelection?.()?.removeAllRanges();
      const [x, y] = at(e);
      fx.toggleFull(x, y);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    el.addEventListener('click', click);
    el.addEventListener('dblclick', dbl);
    const tease = setTimeout(() => { if (window.scrollY < 40) fx.demo(); }, 1400);
    return () => {
      clearTimeout(tease);
      clearTimeout(pending);
      fx.destroy();
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      el.removeEventListener('click', click);
      el.removeEventListener('dblclick', dbl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, tall]);

  const notes = tall
    ? []
    : NOTES.map((nt) => {
      const [tx, ty] = mapPt(box.w, box.h, L, ...nt.tip);
      const sx = tx + nt.dx + (nt.align === 'left' ? -10 : 10);
      const sy = ty + nt.dy + 12;
      return { ...nt, tx, ty, sx, sy, ...arrowPath(sx, sy, tx, ty) };
    });

  return (
    <section ref={root} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink" aria-label="Introduction">
      <h1 className="sr-only-f">Kashyap Nasit — engineer, explorer, occasional comedian</h1>

      {/* stage: photograph, name, cut-out — scaled together so they never drift apart */}
      <div ref={stage} data-stage className="absolute inset-0 origin-[70%_32%] will-change-transform">
        <img src={L.bg} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: `${L.pos[0] * 100}% ${L.pos[1] * 100}%` }} draggable="false" />
        <canvas ref={canvasA} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(6,8,13,0.72) 0%, rgba(6,8,13,0.3) 26%, rgba(6,8,13,0) 44%)' }} />

        <div data-namewrap className="absolute inset-x-0 z-[2]" style={{ top: tall ? '21%' : '29%' }}>
          <div ref={nameLayer} className="frame">
            <div className="overflow-hidden pb-[0.04em]">
              <VFWordmark text="KASHYAP" onChar={setCap} className="text-[clamp(88px,21.5vw,440px)] text-ivory" />
            </div>
            <p data-fade className="label mt-4 hidden h-4 items-center gap-3 md:flex" aria-live="polite">
              {cap === null ? (
                <span className="text-ivory/45">↑ Hover the letters — it’s an acrostic</span>
              ) : (
                <span key={cap} className="text-glass" style={{ animation: 'acro .45s cubic-bezier(.16,1,.3,1)' }}>
                  <span className="mr-2 inline-grid h-5 w-5 place-items-center rounded-full bg-glass font-display text-[12px] font-bold text-ink">{'KASHYAP'[cap]}</span>
                  {ACROSTIC[cap]}
                </span>
              )}
            </p>
          </div>
        </div>

        <img src={L.cut} alt="" className="pointer-events-none absolute inset-0 z-[3] h-full w-full object-cover" style={{ objectPosition: `${L.pos[0] * 100}% ${L.pos[1] * 100}%` }} draggable="false" />
        <canvas ref={canvasB} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] h-full w-full" />
      </div>

      <div data-shade className="pointer-events-none absolute inset-0 z-[5] bg-ink opacity-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[42%] bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      {/* when the other world takes over, keep the nav and captions legible against its sky */}
      <div className={`pointer-events-none absolute inset-x-0 top-0 z-[5] h-[34%] bg-gradient-to-b from-ink/75 via-ink/30 to-transparent transition-opacity duration-1000 ${fullOn ? 'opacity-100' : 'opacity-0'}`} />

      {/* a small caption that travels with the pointer */}
      <div ref={chip} aria-hidden="true" className={`pointer-events-none absolute left-0 top-0 z-[9] transition-opacity duration-300 ${lensOn ? 'opacity-100' : 'opacity-0'}`}>
        <span className="lens-chip label absolute left-6 top-6 whitespace-nowrap">
          <span className="text-glass">● {VISIONS[vision].label}</span>
          <span className="ml-2 text-ivory/70">— {VISIONS[vision].where}</span>
          <span className="ml-2 text-ivory/45">{fullOn ? '· click to switch · double-click to come back' : `· click for ${VISIONS[vision].next} · double-click to step inside`}</span>
        </span>
      </div>

      {/* title card for the full transformation */}
      <div aria-live="polite" className={`pointer-events-none absolute left-[4vw] z-[9] max-w-[80vw] transition-all duration-[900ms] ease-expo ${tall ? 'top-[9.5%]' : 'top-[12%]'} ${fullOn ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-4 opacity-0 blur-sm'}`}>
        {fullOn && (
          <div key={vision} className="alter-card">
            <span className="label text-glass">Alter ego {String(vision + 1).padStart(2, '0')} / {String(VISIONS.length).padStart(2, '0')}</span>
            <p className="mt-2 font-serif text-[clamp(26px,3.4vw,54px)] italic leading-[0.95] text-ivory drop-shadow-[0_4px_30px_rgba(0,0,0,0.55)]">{VISIONS[vision].title}</p>
            <p className="label mt-3 text-ivory/70">{VISIONS[vision].where}</p>
            <p className="label mt-5 hidden text-ivory/45 sm:block">Click — switch lives · Double-click — come back</p>
          </div>
        )}
      </div>

      {/* hand-drawn field notes, pointing at him from the margins */}
      {notes.length > 0 && (
        <div data-notes className="pointer-events-none absolute inset-0 z-[8]">
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            {notes.map((nt) => (
              <g key={nt.id} className={`note-arrow ${hoverNote === nt.id ? 'is-hot' : ''}`} style={{ transformOrigin: `${nt.tx}px ${nt.ty}px` }}>
                <path data-note-draw d={nt.body} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path data-note-draw d={nt.head} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ))}
          </svg>
          {notes.map((nt) => (
            <div
              key={nt.id}
              data-note-text
              onPointerEnter={() => setHoverNote(nt.id)}
              onPointerLeave={() => setHoverNote(null)}
              className={`pointer-events-auto absolute w-[230px] cursor-default ${nt.align === 'right' ? 'text-right' : ''}`}
              style={{ left: nt.align === 'left' ? nt.tx + nt.dx : undefined, right: nt.align === 'right' ? box.w - (nt.tx + nt.dx) : undefined, top: nt.ty + nt.dy }}
            >
              <span className={`label transition-colors duration-300 ${hoverNote === nt.id ? 'text-glass' : 'text-ivory/50'}`}>{nt.k}</span>
              <p className={`mt-1 font-serif text-[19px] italic leading-snug transition-colors duration-300 ${hoverNote === nt.id ? 'text-ivory' : 'text-ivory/80'}`}>{nt.v}</p>
            </div>
          ))}
        </div>
      )}

      {/* meta */}
      <div className="pointer-events-none absolute inset-x-0 top-[88px] z-20">
        <div className="frame flex justify-between">
          <span data-fade className="label text-ivory/55"><span className={`transition-opacity duration-500 ${fullOn ? 'opacity-0' : 'opacity-100'}`}>Portfolio — Edition 05</span></span>
          <span data-fade className="label flex items-center gap-2 text-ivory/60 sm:hidden"><span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#ff9a4d]" /> Tap the photo</span>
          <span data-fade className="label hidden items-center gap-2 text-right text-ivory/60 sm:flex"><span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#ff9a4d]" /> Hover the photo — meet my alter egos · double-click to step inside</span>
        </div>
      </div>

      <KBadge />

      {/* copy */}
      <div data-no-lens className="absolute inset-x-0 bottom-0 z-20">
        <div className="frame pb-6 md:pb-8">
          <p data-fade className="max-w-[31ch] font-serif text-[clamp(22px,2.35vw,38px)] italic leading-[1.18] text-ivory/80">
            I build{' '}
            <PreviewWord img="/img/vigint-home.webp" caption="VIGINT · SIH, cleared the university round" to="/work">systems that see</PreviewWord>{' '}
            and{' '}
            <PreviewWord img="/img/aurex-ov.webp" caption="AUREX · won GDG × DezAI" to="/work">enterprise AI</PreviewWord>, ship{' '}
            <PreviewWord img="/img/satva-jaali-partition.webp" caption="Satva Laser · live for a real client" to="/work">sites for real clients</PreviewWord>, and travel mostly to stare at{' '}
            <PreviewWord img="/img/lens/k07.webp" caption="Evidence #1 · a very good roof" to="/lens">ceilings</PreviewWord>.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-5 border-t hairline pt-5">
            <div data-fade className="flex items-center gap-3">
              <TLink to="/about" className="btn-pill bg-ivory text-ink hover:bg-glass">
                <Roll>Meet the person</Roll> <FiArrowUpRight aria-hidden="true" />
              </TLink>
              <TLink to="/work" className="btn-pill hidden border border-ivory/30 text-ivory hover:border-ivory sm:inline-flex">
                <Roll>See the work</Roll>
              </TLink>
            </div>
            <div data-fade className="hidden items-center gap-6 md:flex md:pr-16">
              <span className="label flex items-center gap-2 text-ivory/55">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glass opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-glass" /></span>
                Building Hawk-i
              </span>
              <span className="label text-ivory/55">IST <Clock /></span>
              <span className="label flex items-center gap-2 text-ivory/55">Scroll, it gets weirder <FiArrowDown className="animate-bounce" aria-hidden="true" /></span>
            </div>
          </div>
        </div>
      </div>

      {/* loader: an ink sheet with a k-shaped window, signed then dived through (first visit only) */}
      {first && !live && (
        <div className="pointer-events-none absolute inset-0 z-40" aria-hidden="true">
          <svg className="absolute inset-0 h-full w-full" width={box.w} height={box.h}>
            <defs>
              <mask id="k-hole" maskUnits="userSpaceOnUse" x="0" y="0" width={box.w} height={box.h}>
                <rect width={box.w} height={box.h} fill="white" />
                <path ref={hole} d={K_PATH} fill="black" fillOpacity="0" transform={kTransform(cx, cy, s0)} />
              </mask>
              <radialGradient id="k-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#9db8ff" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#9db8ff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width={box.w} height={box.h} fill="#06080d" mask="url(#k-hole)" />
            <g data-hud><circle cx={cx} cy={cy} r={kh * 0.9} fill="url(#k-glow)" /></g>
            <g ref={ringG}>
              <ellipse ref={ringE} cx={cx} cy={cy} rx={kh * 1.02} ry={kh * 0.39} fill="none" stroke="#ece7dd" strokeOpacity="0.55" strokeWidth="1.2" transform={`rotate(-28 ${cx} ${cy})`} />
              <circle cx={cx + kh * 1.02 * Math.cos(-0.49)} cy={cy + kh * 1.02 * Math.sin(-0.49)} r="3.5" fill="#9db8ff" />
            </g>
            <path ref={outline} d={K_PATH} fill="none" stroke="#ece7dd" strokeWidth={1.5 / s0} strokeLinejoin="round" transform={kTransform(cx, cy, s0)} />
          </svg>
          <div data-hud className="absolute left-[var(--gutter)] top-8 flex items-center gap-3">
            <KMark size={22} className="text-ivory/70" />
            <span className="label text-ivory/60">Kashyap Nasit — Portfolio, Ed. 05</span>
          </div>
          <span data-hud className="label absolute right-[var(--gutter)] top-8 hidden text-ivory/50 md:block">Engineer · Explorer · Occasional comedian</span>
          <div data-hud className="absolute bottom-8 left-[var(--gutter)]">
            <span className="label block text-glass">{n >= 100 ? 'Signed.' : `${QUIPS[quip]}…`}</span>
          </div>
          <span data-hud className="display absolute bottom-6 right-[var(--gutter)] tabular-nums text-[clamp(64px,9vw,150px)] leading-[0.8] text-ivory">{String(n).padStart(3, '0')}</span>
          <div data-hud className="absolute bottom-0 left-0 h-px bg-glass" style={{ width: `${n}%`, transition: 'width 0.2s linear' }} />
        </div>
      )}
      <style>{`
        @keyframes acro { from { opacity: 0; transform: translateY(6px); } }
        .note-arrow { color: rgba(236,231,221,0.7); transition: color .3s, transform .6s cubic-bezier(.16,1,.3,1); }
        .note-arrow.is-hot { color: #9db8ff; transform: scale(1.06) rotate(-2deg); }
      `}</style>
    </section>
  );
}
