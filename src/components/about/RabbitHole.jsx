import HoverList from '../HoverList';

const DOMAINS = [
  { title: 'Artificial Intelligence', meta: 'home base', note: 'What happens when a model can see, not just read? (Answer so far: VIGINT, Hawk-i, and a lot of GPU fans.)', img: '/img/vigint-home.webp' },
  { title: 'Healthcare', meta: 'AI ×', note: 'How much of the waiting in a waiting room is just bad software? Probably most of it.' },
  { title: 'Business', meta: 'product brain', note: 'Every problem gets the same interview: could this be a product — and would anyone actually use it?', img: '/img/lens/c06.webp' },
  { title: 'Automobiles', meta: 'weakness', note: 'Mechanical engineering, electronics, software and design, all in one object you can drive. Unfair to resist.' },
  { title: 'Architecture', meta: 'walks', note: 'Why do some buildings feel like they are thinking? Leadenhall Market has a theory.', img: '/img/lens/c14.webp' },
  { title: 'Design', meta: 'non-optional', note: 'Great technology should work well — and feel exceptional. Otherwise it is just a spreadsheet with ambition.', img: '/img/lens/c11.webp' },
  { title: 'Finance', meta: 'mostly psychology', note: 'Money is mostly behaviour. Morgan Housel made the case; I read it at thirty thousand feet.', img: '/img/lens/c07.webp' },
  { title: 'Research', meta: 'what is missing?', note: "What's already known, what's missing, and what happens if two unrelated ideas are forced to meet.", img: '/img/lens/c29.webp' },
  { title: 'Travel', meta: 'field work', note: 'Every city is a system with a personality. I like watching both run.', img: '/img/lens/c19.webp' },
  { title: 'Psychology', meta: 'why people click', note: 'Why do people use what they use — and ignore what they should? The answer shapes every interface.', img: '/img/lens/c09.webp' },
  { title: 'Sustainability', meta: 'argument by whale', note: 'A whale made of plastic makes the case better than any slide deck ever will.', img: '/img/fov-canary.webp' },
  { title: 'Engineering', meta: 'respect', note: 'Somebody calculated every one of these beams. I think about that a normal amount.', img: '/img/lens/c20.webp' },
  { title: 'Entrepreneurship', meta: 'can this be automated?', note: 'Can this be solved better, cheaper, without the repetitive human part? Should it be?', img: '/img/lens/c15.webp' },
];

export default function RabbitHole() {
  return (
    <section className="bg-ink py-[clamp(96px,12vw,180px)]" aria-labelledby="rabbit-title">
      <div className="frame">
        <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="label text-glass">Chapter 03 · The rabbit hole</span>
            <h2 id="rabbit-title" className="display mt-5 text-[clamp(56px,8vw,140px)]">
              One question, <span className="serif-i font-normal text-glass">thirteen</span> tabs.
            </h2>
          </div>
          <p className="max-w-[42ch] text-[15px] leading-relaxed text-ivory/65 md:col-span-4 md:col-start-9">
            I rarely stay inside one field. It usually starts with something small — and ends at the intersection of two things that had no business meeting. Hover a field to see where it took me.
          </p>
        </div>
        <HoverList items={DOMAINS.map((d, i) => ({ ...d, n: String(i + 1).padStart(2, '0'), cursor: 'Rabbit hole' }))} size="md" />
      </div>
    </section>
  );
}
