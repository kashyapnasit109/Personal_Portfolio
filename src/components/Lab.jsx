import { useEffect, useRef } from 'react';
import { FiGithub } from 'react-icons/fi';
import { lab } from '../data/projects';
import { revealBlocks, revealWords, gsap, prefersReduced } from '../lib/motion';
import RollText from './RollText';

const family = [
  { name: 'SentinelVision', role: 'Smart India Hackathon track', state: 'University round cleared · advancing', tone: '#00E5FF' },
  { name: 'Sentinel', role: 'Government-facing edition', state: 'Separate build, same core', tone: '#9DB8FF' },
  { name: 'Hawk-i', role: 'Enterprise & client product', state: 'In active build', tone: '#ECE7DD' },
];

export default function Lab() {
  const root = useRef(null);
  const title = useRef(null);
  const scan = useRef(null);

  useEffect(() => {
    revealWords(title.current);
    revealBlocks(root.current);
    if (prefersReduced()) return;
    const t = gsap.fromTo(scan.current, { yPercent: -100 }, { yPercent: 1000, duration: 3.2, ease: 'none', repeat: -1 });
    return () => t.kill();
  }, []);

  return (
    <section id="lab" ref={root} className="relative overflow-hidden bg-ink-2 py-[clamp(96px,12vw,180px)]" aria-labelledby="lab-title">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" style={{ backgroundImage: 'linear-gradient(rgba(157,184,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(157,184,255,0.06) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(70% 60% at 50% 40%, #000, transparent)' }} />

      <div className="frame relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div data-reveal className="mb-6 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffb454] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ffb454]" />
              </span>
              <span className="label text-[#ffb454]">In the lab · {lab.status}</span>
            </div>
            <h2 id="lab-title" ref={title} className="display text-[clamp(64px,11vw,176px)]">
              {lab.title}
            </h2>
            <p data-reveal className="mt-3 font-serif text-[clamp(20px,1.8vw,26px)] italic text-ivory/80">{lab.kicker}</p>
          </div>
          <p data-reveal className="max-w-[46ch] text-[15px] leading-relaxed text-ivory/65">{lab.relation}</p>
        </div>

        <div data-reveal className="relative mt-14 overflow-hidden rounded-[12px] border border-white/10 bg-ink shadow-[0_60px_160px_-40px_rgba(0,0,0,0.9)]">
          <img src={lab.shot} alt="Hawk-i command center: detections, alerts, module processing and live camera grid status" loading="lazy" className="block max-h-[78vh] w-full object-cover object-top" />
          <div ref={scan} className="pointer-events-none absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-transparent via-glass/10 to-glass/25" style={{ borderBottom: '1px solid rgba(157,184,255,0.5)' }} />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="label rounded-full bg-ink/70 px-3 py-1.5 text-ivory backdrop-blur-md">Pre-release build</span>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[10px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {lab.modules.map((m) => (
            <div key={m.n} data-reveal data-spot className="roll-group group bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink md:p-8">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[12px] text-glass">M{m.n}</span>
                <span className="label text-mute">Module</span>
              </div>
              <h3 className="mt-8 font-display text-[26px] font-semibold tracking-[-0.02em]"><RollText text={m.name} /></h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ivory/60">{m.text}</p>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          {lab.platform.map((x) => (
            <span key={x} className="font-mono text-[11px] text-ivory/45">{x}</span>
          ))}
          <a href={lab.code} target="_blank" rel="noopener noreferrer" className="link-u ml-auto inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ivory">
            <FiGithub aria-hidden="true" /> Repository
          </a>
        </div>

        {/* one core, three editions */}
        <div className="mt-[clamp(80px,10vw,150px)]">
          <div data-reveal className="flex items-center justify-between border-b hairline pb-4">
            <span className="label text-mute">How the vision projects relate</span>
            <span className="label text-mute">One core · three editions</span>
          </div>
          <div className="relative mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div data-reveal className="lg:col-span-4">
              <div className="relative rounded-[12px] border border-glass/30 bg-glass/[0.05] p-7">
                <span className="label text-glass">Main system</span>
                <h3 className="display mt-4 text-[64px]">VIGINT</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ivory/65">
                  Visual Intelligence &amp; Incident Detection Network — the shared perception, fusion and evidence core.
                </p>
              </div>
            </div>
            <div className="relative lg:col-span-8">
              <div className="absolute bottom-6 left-[-2.5rem] top-6 hidden w-px bg-gradient-to-b from-transparent via-glass/50 to-transparent lg:block" />
              <ul className="space-y-3">
                {family.map((f) => (
                  <li key={f.name} data-reveal className="relative grid grid-cols-[1fr_auto] items-center gap-4 rounded-[10px] border border-white/10 bg-ink/60 px-6 py-5">
                    <span className="absolute left-[-2.5rem] top-1/2 hidden h-px w-10 bg-glass/40 lg:block" />
                    <div>
                      <h4 className="font-display text-[24px] font-semibold tracking-[-0.02em]" style={{ color: f.tone }}>{f.name}</h4>
                      <p className="text-[14px] text-ivory/60">{f.role}</p>
                    </div>
                    <span className="label text-right text-ivory/70">{f.state}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
