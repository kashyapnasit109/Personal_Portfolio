import { useRef, useState } from 'react';
import { PiInstagramLogoDuotone, PiLinkedinLogoDuotone, PiGithubLogoDuotone, PiPhoneCallDuotone, PiEnvelopeSimpleDuotone, PiArrowsCounterClockwiseDuotone } from 'react-icons/pi';
import { site } from '../../data/site';
import { gsap, prefersReduced } from '../../lib/motion';
import KMark from '../KMark';

/*
  A digital visiting card. It leans toward the cursor with a foil highlight that follows the
  light; click (or tap) to flip it and every way to reach me is on the back.
*/
export default function ContactCard() {
  const card = useRef(null);
  const [flip, setFlip] = useState(false);
  const fine = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const move = (e) => {
    if (!fine || prefersReduced()) return;
    const b = card.current.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width;
    const py = (e.clientY - b.top) / b.height;
    card.current.style.setProperty('--gx', `${px * 100}%`);
    card.current.style.setProperty('--gy', `${py * 100}%`);
    gsap.to(card.current, { rotationY: (px - 0.5) * 22 + (flip ? 180 : 0), rotationX: -(py - 0.5) * 16, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
  };
  const leave = () => gsap.to(card.current, { rotationY: flip ? 180 : 0, rotationX: 0, duration: 0.9, ease: 'expo.out', overwrite: 'auto' });
  const toggle = (e) => {
    if (e.target.closest('a')) return;
    const next = !flip;
    setFlip(next);
    gsap.to(card.current, { rotationY: next ? 180 : 0, rotationX: 0, duration: prefersReduced() ? 0.01 : 1.1, ease: 'expo.inOut', overwrite: 'auto' });
  };

  const links = [
    { href: `mailto:${site.email}`, icon: PiEnvelopeSimpleDuotone, v: site.email },
    { href: site.phoneHref, icon: PiPhoneCallDuotone, v: site.phone },
    { href: site.instagram, icon: PiInstagramLogoDuotone, v: site.instagramHandle },
    { href: site.linkedin, icon: PiLinkedinLogoDuotone, v: 'in/kashyap-nasit' },
    { href: site.github, icon: PiGithubLogoDuotone, v: 'github/kashyapnasit109' },
  ];

  return (
    <div className="[perspective:1600px]" onPointerMove={move} onPointerLeave={leave}>
      <div
        ref={card}
        role="button"
        tabIndex={0}
        aria-pressed={flip}
        aria-label={flip ? 'Business card, back: contact details. Activate to flip.' : 'Business card, front. Activate to flip for contact details.'}
        onClick={toggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); } }}
        className="biz-card relative aspect-[1.6/1] w-full cursor-pointer [transform-style:preserve-3d]"
        data-cursor={flip ? 'Flip back' : 'Flip'}
      >
        {/* front */}
        <div className="biz-face absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[22px] border border-white/15 bg-[linear-gradient(135deg,#10172a,#06080d_60%)] p-[6%] [backface-visibility:hidden]">
          <div className="biz-foil pointer-events-none absolute inset-0" />
          <div className="relative flex items-start justify-between">
            <KMark size={64} className="text-ivory" />
            <span className="label text-ivory/45">Ed. 05 · 1 of 1</span>
          </div>
          <div className="relative">
            <p className="display text-[clamp(34px,3.6vw,60px)]">Kashyap Nasit</p>
            <p className="mt-2 font-serif text-[clamp(16px,1.4vw,21px)] italic text-ivory/70">Engineer · Explorer · Occasional comedian</p>
          </div>
          <div className="relative flex items-end justify-between">
            <span className="label text-ivory/45">{site.location}</span>
            <span className="label flex items-center gap-1.5 text-glass"><PiArrowsCounterClockwiseDuotone aria-hidden="true" /> Click to flip</span>
          </div>
        </div>
        {/* back */}
        <div className="biz-face absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[22px] bg-ivory p-[6%] text-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex items-center justify-between">
            <span className="label text-ink/55">Every way to reach me</span>
            <KMark size={34} className="text-ink" />
          </div>
          <ul className="space-y-[2.2%]">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="group/l flex items-center gap-3 text-[clamp(14px,1.25vw,18px)] font-medium transition-colors hover:text-glass-deep">
                  <l.icon className="text-[1.3em] text-glass-deep transition-transform duration-500 ease-expo group-hover/l:-rotate-12 group-hover/l:scale-125" aria-hidden="true" />
                  <span className="truncate">{l.v}</span>
                </a>
              </li>
            ))}
          </ul>
          <span className="label text-ink/45">Replies faster to good subject lines</span>
        </div>
      </div>
    </div>
  );
}
