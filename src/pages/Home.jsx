import HomeHero from '../components/home/HomeHero';
import Statement from '../components/home/Statement';
import HoverList from '../components/HoverList';
import NowStrip from '../components/NowStrip';
import VelocityMarquee from '../components/VelocityMarquee';
import { flagships } from '../data/projects';
import FieldOfView from '../components/FieldOfView';
import LensAccordion from '../components/home/LensAccordion';

const chapters = [
  { title: 'About', meta: 'The story, the rabbit holes', to: '/about', img: '/img/portrait-kelpies.webp', n: 'Person' },
  { title: 'Work', meta: 'AUREX · VIGINT · Satva · Nexus', to: '/work', img: '/img/aurex-ov.webp', n: 'Proof' },
  { title: 'Lens', meta: 'An orbit, a detector, 52 frames', to: '/lens', img: '/img/lens/k07.webp', n: 'Eye' },
  { title: 'Journey', meta: 'Not a straight line', to: '/journey', img: '/img/fov-oxford.webp', n: 'Route' },
  { title: 'Contact', meta: 'Say something interesting', to: '/contact', img: '/img/portrait-boat.webp', n: 'Inbox' },
];

export default function Home() {
  const work = flagships.map((p) => ({
    title: p.title,
    meta: p.badge,
    to: '/work',
    img: p.shots[0] || '/img/lens/c18.webp',
    accent: { lime: '#C6F135', cyan: '#00E5FF', brass: '#D4A64A', ivory: '#9db8ff' }[p.tone],
  }));
  return (
    <>
      <HomeHero />
      <NowStrip />
      <Statement />
      <FieldOfView />
      <section className="bg-ink pt-[clamp(96px,12vw,180px)] pb-[clamp(96px,12vw,180px)]" aria-labelledby="chapters-title">
        <div className="frame">
          <div className="mb-10 flex items-end justify-between">
            <h2 id="chapters-title" className="font-display text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.03em]">
              Five <span className="serif-i font-normal text-glass">chapters</span>
            </h2>
            <span className="label text-mute">Hover · then pick one</span>
          </div>
          <HoverList items={chapters} />
        </div>
      </section>
      <LensAccordion />
      <VelocityMarquee />
      <section className="bg-ink py-[clamp(96px,12vw,180px)]" aria-labelledby="teaser-title">
        <div className="frame">
          <div className="mb-10 flex items-end justify-between">
            <h2 id="teaser-title" className="font-display text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.03em]">
              Selected <span className="serif-i font-normal text-glass">work</span>
            </h2>
            <span className="label text-mute">04 core projects</span>
          </div>
          <HoverList items={work} size="md" aspect="16 / 10" />
        </div>
      </section>
    </>
  );
}
