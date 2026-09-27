import { useEffect, useRef } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import Opener from '../components/about/Opener';
import BrainTabs from '../components/about/BrainTabs';
import SpecSheet from '../components/about/SpecSheet';
import RabbitHole from '../components/about/RabbitHole';
import BuilderRail from '../components/about/BuilderRail';
import LearningLoop from '../components/about/LearningLoop';
import TwoWorlds from '../components/about/TwoWorlds';
import CarEquation from '../components/about/CarEquation';
import Monologue from '../components/about/Monologue';
import LetMe from '../components/about/LetMe';
import Manifesto from '../components/about/Manifesto';
import RollText from '../components/RollText';
import { TLink } from '../lib/transition';
import { gsap, splitWords, prefersReduced, cardReveal } from '../lib/motion';

function Thesis() {
  const root = useRef(null);
  const p = useRef(null);
  useEffect(() => {
    const cr = cardReveal(root.current);
    const words = splitWords(p.current);
    if (prefersReduced()) return () => cr?.scrollTrigger?.kill();
    gsap.set(words, { opacity: 0.14 });
    const t = gsap.to(words, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: p.current, start: 'top 75%', end: 'bottom 45%', scrub: 0.8 } });
    return () => { t.scrollTrigger?.kill(); cr?.scrollTrigger?.kill(); };
  }, []);
  return (
    <section ref={root} className="clip-card bg-ivory py-[clamp(96px,12vw,180px)] text-ink" aria-labelledby="thesis-title">
      <div className="frame">
        <span id="thesis-title" className="label text-glass-deep">Chapter 01 · The thesis</span>
        <p ref={p} className="mt-10 max-w-[22ch] font-display text-[clamp(40px,6vw,104px)] font-semibold leading-[1] tracking-[-0.04em]" style={{ fontStretch: '84%' }}>
          This isn't a student who knows some technologies. It's a <em data-nosplit className="serif-i font-normal text-glass-deep">curious mind</em> that happens to build with them.
        </p>
        <div className="mt-16 grid gap-8 border-t hairline-ink pt-8 md:grid-cols-3">
          {[
            ['Deeply technical', 'when a problem needs it — vision pipelines, OLAP engines, RAG that cites its sources.'],
            ['Highly creative', 'when something needs designing — interfaces, motion, stories, this website.'],
            ['Completely informal', 'the rest of the time. Ask me about cars and clear your afternoon.'],
          ].map(([h, t]) => (
            <div key={h}>
              <h3 className="font-display text-[26px] font-semibold tracking-[-0.02em]">{h}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/65">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Outro() {
  return (
    <section className="bg-ink py-[clamp(96px,12vw,180px)]" aria-label="Where to next">
      <div className="frame">
        <p className="font-serif text-[clamp(26px,2.6vw,40px)] italic text-ivory/75">Now you've met the person.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            { to: '/work', a: 'See the', b: 'work', img: '/img/aurex-ov.webp' },
            { to: '/lens', a: 'See through the', b: 'lens', img: '/img/lens/c26.webp' },
          ].map((l) => (
            <TLink key={l.to} to={l.to} className="roll-group group relative block overflow-hidden rounded-[8px] border border-white/12 p-8 md:p-10" data-cursor="Go">
              <img src={l.img} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-1000 ease-expo group-hover:scale-100 group-hover:opacity-40" />
              <div className="relative flex items-end justify-between">
                <span className="display text-[clamp(48px,6vw,104px)]">
                  {l.a} <span className="serif-i font-normal text-glass"><RollText text={l.b} /></span>
                </span>
                <FiArrowUpRight className="text-4xl text-glass transition-transform duration-700 ease-expo group-hover:-translate-y-2 group-hover:translate-x-2" aria-hidden="true" />
              </div>
            </TLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <Opener />
      <Thesis />
      <BrainTabs />
      <RabbitHole />
      <BuilderRail />
      <LearningLoop />
      <TwoWorlds />
      <CarEquation />
      <SpecSheet />
      <Monologue />
      <LetMe />
      <Manifesto />
      <Outro />
    </>
  );
}
