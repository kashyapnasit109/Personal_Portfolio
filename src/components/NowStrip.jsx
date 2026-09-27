import { useEffect, useRef } from 'react';
import { nowSignals } from '../data/site';
import { revealBlocks } from '../lib/motion';

export default function NowStrip() {
  const ref = useRef(null);
  useEffect(() => revealBlocks(ref.current), []);
  return (
    <section ref={ref} aria-label="Current status" className="relative border-y hairline bg-ink">
      <div className="frame grid grid-cols-2 lg:grid-cols-4">
        {nowSignals.map((s, i) => (
          <div
            key={s.v}
            data-reveal
            className={`flex flex-col gap-2 py-7 pr-4 md:py-9 ${i % 2 ? 'pl-4 md:pl-8' : ''} ${i > 0 ? 'lg:border-l lg:pl-8' : ''} ${i === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 3 ? 'border-l' : ''} hairline`}
          >
            <span className="label text-mute">{s.k}</span>
            <span className="font-display text-[clamp(24px,2.6vw,38px)] font-semibold leading-none tracking-[-0.03em]">{s.v}</span>
            <span className="text-[13px] text-ivory/60">{s.d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
