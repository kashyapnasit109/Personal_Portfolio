import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { clicks } from '../../data/clicks';
import { TLink } from '../../lib/transition';
import { revealWords } from '../../lib/motion';
import Roll from '../Roll';

/*
  A hover gallery of photographs Kashyap took. Panels sit as thin slivers; the one under the
  cursor opens wide, gains its colour and tells you what it is. Click through to the full roll.
*/
const PICK = ['14', '18', '19', '20', '25', '26', '21', '05', '07', '23'];

export default function LensAccordion() {
  const items = PICK.map((n) => clicks.find((c) => c.n === n)).filter(Boolean);
  const [open, setOpen] = useState(2);
  const title = useRef(null);
  useEffect(() => { revealWords(title.current); }, []);

  return (
    <section className="bg-ink py-[clamp(96px,12vw,180px)]" aria-labelledby="lensacc-title">
      <div className="frame">
        <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="label text-glass">Through my lens · the camera roll</span>
            <h2 id="lensacc-title" ref={title} className="display mt-5 text-[clamp(56px,8vw,140px)]">
              Things I <span data-nosplit className="serif-i font-normal text-glass">stopped</span> for.
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="max-w-[40ch] text-[15px] leading-relaxed text-ivory/65">
              I travel to see how places work. Ceilings, clocks, lanterns, one very serious library sign — hover a sliver to open it.
            </p>
            <TLink to="/lens" className="btn-pill mt-6 border border-ivory/25 text-ivory hover:border-ivory">
              <Roll>Open the full roll</Roll> <FiArrowUpRight aria-hidden="true" />
            </TLink>
          </div>
        </div>

        {/* desktop accordion */}
        <div className="hidden h-[72vh] min-h-[460px] gap-2 md:flex" onPointerLeave={() => setOpen(2)}>
          {items.map((c, i) => {
            const on = open === i;
            return (
              <TLink
                key={c.n}
                to="/lens"
                onPointerEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                className="group relative block overflow-hidden rounded-[8px] bg-ink-2 transition-[flex-grow] duration-[900ms] ease-expo"
                style={{ flexGrow: on ? 7 : 1, flexBasis: 0 }}
                data-cursor="Open roll"
                aria-label={`${c.title} — ${c.meta}`}
              >
                <img
                  src={c.src}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-[1200ms] ease-expo"
                  style={{ filter: on ? 'none' : 'grayscale(1) brightness(0.55)', transform: on ? 'scale(1)' : 'scale(1.15)' }}
                />
                <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6 pt-20 transition-all duration-700 ease-expo ${on ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                  <span className="label text-glass">{c.n} / {clicks.length}</span>
                  <p className="display mt-2 whitespace-nowrap text-[clamp(32px,3vw,52px)]">{c.title}</p>
                  <p className="mt-1 whitespace-nowrap font-serif text-[18px] italic text-ivory/80">{c.meta}</p>
                </div>
                <span className={`label absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap text-ivory/60 transition-opacity duration-500 [writing-mode:vertical-rl] ${on ? 'opacity-0' : 'opacity-100'}`}>
                  {c.title}
                </span>
              </TLink>
            );
          })}
        </div>

        {/* mobile: swipe row */}
        <div className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] md:hidden">
          {items.map((c) => (
            <TLink key={c.n} to="/lens" className="relative w-[72vw] shrink-0 snap-center overflow-hidden rounded-[8px]">
              <img src={c.thumb} alt={c.title} loading="lazy" className="aspect-[3/4] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-12">
                <p className="display text-[30px]">{c.title}</p>
                <p className="font-serif text-[15px] italic text-ivory/80">{c.meta}</p>
              </div>
            </TLink>
          ))}
        </div>
      </div>
    </section>
  );
}
