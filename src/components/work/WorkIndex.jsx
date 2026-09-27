import { useEffect, useRef } from 'react';
import { FiArrowDownRight } from 'react-icons/fi';
import { PiTrophyDuotone, PiEyeDuotone, PiHandshakeDuotone, PiCubeDuotone, PiCodeDuotone } from 'react-icons/pi';
import { flagships, lab } from '../../data/projects';
import { gsap, prefersReduced, revealChars, getLenis } from '../../lib/motion';
import RollText from '../RollText';

const ACCENT = { lime: '#C6F135', cyan: '#00E5FF', brass: '#D4A64A', ivory: '#ECE7DD' };

const STATS = [
  { n: 1, k: 'hackathon won', icon: PiTrophyDuotone },
  { n: 1, k: 'SIH university round cleared', icon: PiEyeDuotone },
  { n: 1, k: 'client site in production', icon: PiHandshakeDuotone },
  { n: 6, k: 'Hawk-i modules in build', icon: PiCubeDuotone },
  { n: 1204, k: 'console.logs (since deleted)', icon: PiCodeDuotone },
];

const ROWS = [
  ...flagships.map((p) => ({ id: p.id, title: p.title, kicker: p.kicker.split('—')[0].trim(), badge: p.badge, img: p.shots[0] || '/img/lens/k03.webp', accent: ACCENT[p.tone], target: `case-${p.id}` })),
  { id: 'hawki', title: lab.title, kicker: lab.kicker, badge: 'In the lab', img: lab.shot, accent: '#FFB454', target: 'lab' },
];

function Row({ r, i }) {
  const ref = useRef(null);
  const media = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (prefersReduced() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    gsap.set(media.current, { xPercent: -50, yPercent: -50, scale: 0.85 });
    const xTo = gsap.quickTo(media.current, 'x', { duration: 0.7, ease: 'power3.out' });
    const rTo = gsap.quickTo(media.current, 'rotation', { duration: 0.7, ease: 'power3.out' });
    let lx = 0;
    const move = (e) => {
      const b = el.getBoundingClientRect();
      xTo(e.clientX - b.left);
      rTo(Math.max(-8, Math.min(8, (e.clientX - lx) * 0.4)));
      lx = e.clientX;
    };
    const enter = (e) => {
      const b = el.getBoundingClientRect();
      gsap.set(media.current, { x: e.clientX - b.left });
      gsap.to(media.current, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'expo.out' });
    };
    const leave = () => gsap.to(media.current, { autoAlpha: 0, scale: 0.85, duration: 0.35, ease: 'power2.in' });
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); };
  }, []);

  const go = () => {
    const t = document.getElementById(r.target);
    if (!t) return;
    getLenis() ? getLenis().scrollTo(t, { offset: -20, duration: 1.6 }) : t.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <li ref={ref} className="roll-group group relative border-t hairline last:border-b" style={{ '--roll-color': '#06080d' }}>
      <button type="button" onClick={go} className="relative flex w-full items-center gap-4 overflow-hidden py-5 text-left md:gap-8 md:py-6" data-cursor="Open case">
        <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-expo group-hover:scale-x-100" style={{ background: r.accent }} />
        <span className="relative w-8 font-mono text-[12px] text-ivory/40 transition-colors duration-500 group-hover:text-ink/60">0{i + 1}</span>
        <span className="display relative text-[clamp(40px,6.4vw,112px)] transition-colors duration-500 group-hover:text-ink"><RollText text={r.title} /></span>
        <span className="relative ml-auto hidden max-w-[26ch] text-right text-[14px] leading-snug text-ivory/55 transition-colors duration-500 group-hover:text-ink/70 lg:block">{r.kicker}</span>
        <span className="label relative hidden rounded-full border px-3 py-1.5 transition-colors duration-500 group-hover:border-ink/30 group-hover:text-ink md:inline" style={{ borderColor: `${r.accent}55`, color: r.accent }}>{r.badge}</span>
        <FiArrowDownRight className="relative text-3xl text-ivory/40 transition-all duration-700 ease-expo group-hover:-rotate-45 group-hover:text-ink" aria-hidden="true" />
      </button>
      <div ref={media} aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 z-20 hidden w-[min(340px,26vw)] opacity-0 md:block" style={{ visibility: 'hidden' }}>
        <div className="overflow-hidden rounded-[10px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ring-1 ring-black/20">
          <img src={r.img} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
        </div>
      </div>
    </li>
  );
}

export default function WorkIndex() {
  const root = useRef(null);
  const nums = useRef([]);
  useEffect(() => {
    revealChars(root.current.querySelector('[data-chars]'), { stagger: 0.04, start: 'top 95%', delay: 0.45 });
    if (prefersReduced()) return;
    gsap.fromTo(root.current.querySelectorAll('[data-in]'), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.7 });
    const tws = STATS.map((s, i) => {
      const o = { v: 0 };
      return gsap.to(o, {
        v: s.n, duration: s.n > 100 ? 2.4 : 1.2, ease: 'power3.out', delay: 1 + i * 0.1,
        onUpdate: () => { if (nums.current[i]) nums.current[i].textContent = Math.round(o.v).toLocaleString('en-IN'); },
      });
    });
    return () => tws.forEach((t) => t.kill());
  }, []);

  return (
    <header ref={root} className="relative bg-ink pb-[clamp(56px,7vw,110px)] pt-[clamp(130px,17vh,190px)]">
      <div className="frame">
        <div data-in className="flex items-center justify-between border-b hairline pb-4">
          <span className="label text-glass">Work · 2024 → now</span>
          <span className="label hidden text-ivory/50 sm:inline">10 projects · 1 trophy · 0 regrets</span>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <h1 data-chars className="roll-group display cursor-default text-[clamp(72px,13vw,230px)] md:col-span-8" style={{ '--roll-color': '#9db8ff' }}>
            <RollText text="Work" />
            <span className="serif-i ml-[0.12em] inline-block whitespace-nowrap align-baseline text-[0.42em] font-normal text-glass">that shipped.</span>
          </h1>
          <p data-in className="font-serif text-[clamp(19px,1.7vw,26px)] italic leading-[1.25] text-ivory/75 md:col-span-4">
            A hackathon winner, a system in the SIH pipeline, a site running for a real client, and the tool that started it all. Hover a name — it will show you its face.
          </p>
        </div>

        <ul data-in className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border hairline bg-white/10 md:grid-cols-5">
          {STATS.map((s, i) => (
            <li key={s.k} data-spot className="group bg-ink p-5 md:p-6">
              <s.icon className="text-[22px] text-glass transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:rotate-12" aria-hidden="true" />
              <p className="display mt-4 text-[clamp(40px,4vw,64px)]"><span ref={(el) => { nums.current[i] = el; }}>{prefersReduced() ? s.n.toLocaleString('en-IN') : 0}</span></p>
              <p className="mt-1 text-[13px] leading-snug text-ivory/55">{s.k}</p>
            </li>
          ))}
        </ul>

        <ol data-in className="mt-16">
          {ROWS.map((r, i) => <Row key={r.id} r={r} i={i} />)}
        </ol>
      </div>
    </header>
  );
}
