import HoverList from '../HoverList';

const LINES = [
  { title: 'Stay curious.', img: '/img/lens/c18.webp', note: 'The Corpus Clock eats time on purpose. Curiosity is how I make mine worth eating.' },
  { title: 'Explore widely.', img: '/img/lens/c25.webp', note: 'Cities, museums, papers, codebases — the input decides the output.' },
  { title: 'Understand deeply.', img: '/img/lens/c26.webp', note: 'Know why it works, not just that it works.' },
  { title: 'Build relentlessly.', img: '/img/lens/c20.webp', note: 'Understanding is only proven when something runs.' },
  { title: 'Connect unexpected ideas.', img: '/img/lens/c03.webp', note: 'The interesting things live where two fields collide.' },
  { title: 'Stay fascinated.', img: '/img/lens/c01.webp', note: 'With the world, mostly. Occasionally with fireworks.' },
];

export default function Manifesto() {
  return (
    <section className="bg-ivory py-[clamp(96px,12vw,180px)] text-ink" aria-labelledby="manifesto-title">
      <div className="frame">
        <div className="mb-10 flex items-end justify-between">
          <h2 id="manifesto-title" className="font-display text-[clamp(28px,3vw,44px)] font-semibold tracking-[-0.03em]">
            The <span className="serif-i font-normal text-glass-deep">philosophy</span>, such as it is
          </h2>
          <span className="label text-ink/50">Chapter 11</span>
        </div>
        <HoverList tone="light" size="md" items={LINES.map((l, i) => ({ ...l, n: String(i + 1).padStart(2, '0'), meta: '', cursor: 'Look' }))} />
      </div>
    </section>
  );
}
