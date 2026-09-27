import { useEffect, useRef } from 'react';
import { FiArrowUp, FiArrowUpRight } from 'react-icons/fi';
import { nav, site } from '../data/site';
import { revealBlocks, getLenis } from '../lib/motion';
import { TLink } from '../lib/transition';
import VFWordmark from './VFWordmark';
import RollText from './RollText';
import Roll from './Roll';
import Signature from './Signature';
import { PiInstagramLogoDuotone, PiLinkedinLogoDuotone, PiGithubLogoDuotone, PiPhoneCallDuotone, PiEnvelopeSimpleDuotone } from 'react-icons/pi';

export default function Footer() {
  const root = useRef(null);
  useEffect(() => revealBlocks(root.current), []);

  return (
    <footer ref={root} className="relative overflow-hidden border-t hairline bg-ink pt-[clamp(72px,9vw,140px)]">
      <div className="frame">
        <div data-reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[20ch] font-serif text-[clamp(28px,3vw,44px)] italic leading-[1.05] text-ivory/80">
            Have a problem worth building for?
          </p>
          <TLink
            to="/contact"
            className="roll-group group inline-flex items-center gap-4 text-[clamp(56px,9vw,150px)]"
            data-cursor="Write to me"
          >
            <span className="display">
              <RollText text="Let's talk" />
            </span>
            <FiArrowUpRight aria-hidden="true" className="text-glass transition-transform duration-700 ease-expo group-hover:-translate-y-2 group-hover:translate-x-2" />
          </TLink>
        </div>

        <div className="mt-[clamp(56px,7vw,100px)] grid items-center gap-10 border-t hairline pt-[clamp(40px,6vw,80px)] md:grid-cols-12">
          <div className="flex justify-center md:col-span-5">
            <Signature className="w-[min(78vw,380px)] text-ivory" />
          </div>
          <div data-reveal className="md:col-span-6 md:col-start-7">
            <span className="label text-glass">Signed, k.</span>
            <p className="mt-4 max-w-[26ch] font-serif text-[clamp(24px,2.4vw,36px)] italic leading-[1.15] text-ivory/85">
              Same k as the logo, same k as my actual signature. Everything on this site was built, broken and rebuilt by the hand that signs it.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                { href: site.instagram, icon: PiInstagramLogoDuotone, k: 'Instagram', v: site.instagramHandle },
                { href: site.linkedin, icon: PiLinkedinLogoDuotone, k: 'LinkedIn', v: 'Kashyap Nasit' },
                { href: site.github, icon: PiGithubLogoDuotone, k: 'GitHub', v: 'kashyapnasit109' },
                { href: site.phoneHref, icon: PiPhoneCallDuotone, k: 'Call', v: site.phone },
              ].map((l) => (
                <li key={l.k}>
                  <a href={l.href} target={l.href.startsWith('tel') ? undefined : '_blank'} rel="noopener noreferrer" data-spot className="group flex items-center gap-3 rounded-full border hairline px-4 py-3 transition-colors duration-500 hover:border-glass/60">
                    <l.icon className="relative z-[2] text-[20px] text-glass transition-transform duration-500 ease-expo group-hover:rotate-[-12deg] group-hover:scale-125" aria-hidden="true" />
                    <span className="relative z-[2] label text-ivory/45">{l.k}</span>
                    <span className="relative z-[2] ml-auto truncate text-[14px] text-ivory/85 transition-colors group-hover:text-glass">{l.v}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(56px,7vw,100px)] grid gap-10 border-t hairline pt-10 md:grid-cols-12">
          <div data-reveal className="md:col-span-4">
            <span className="label text-mute">Say hello</span>
            <a href={`mailto:${site.email}`} className="u-link mt-3 flex items-center gap-2 text-[17px] text-ivory/85"><PiEnvelopeSimpleDuotone className="text-glass" aria-hidden="true" />{site.email}</a>
            <a href={site.phoneHref} className="u-link mt-2 flex items-center gap-2 text-[17px] text-ivory/85"><PiPhoneCallDuotone className="text-glass" aria-hidden="true" />{site.phone}</a>
            <p className="mt-6 max-w-[34ch] text-[14px] leading-relaxed text-ivory/50">
              Designed and engineered by Kashyap in Semester 05 — between SIH rounds and the Hawk-i build.
            </p>
          </div>
          <nav data-reveal className="grid grid-cols-2 gap-8 md:col-span-5 md:col-start-6" aria-label="Footer">
            <ul className="space-y-2.5">
              <li className="label mb-4 text-mute">Index</li>
              {nav.map((n) => (
                <li key={n.to}>
                  <TLink to={n.to} className="text-[16px] text-ivory/75 hover:text-ivory"><Roll>{n.label}</Roll></TLink>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5">
              <li className="label mb-4 text-mute">Live work</li>
              <li><a className="text-[16px] text-ivory/75 hover:text-ivory" href="https://aurexaiden.vercel.app/app/overview" target="_blank" rel="noopener noreferrer"><Roll>AUREX</Roll></a></li>
              <li><a className="text-[16px] text-ivory/75 hover:text-ivory" href="https://satva-laser.vercel.app/" target="_blank" rel="noopener noreferrer"><Roll>Satva Laser</Roll></a></li>
              <li><a className="text-[16px] text-ivory/75 hover:text-ivory" href="https://temp-app-delta.vercel.app/" target="_blank" rel="noopener noreferrer"><Roll>Nexus Command</Roll></a></li>
            </ul>
          </nav>
          <div data-reveal className="flex md:col-span-2 md:col-start-11 md:justify-end">
            <button onClick={() => getLenis() ? getLenis().scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/20 transition-colors duration-500 hover:border-glass hover:bg-glass hover:text-ink" aria-label="Back to top" data-magnetic>
              <FiArrowUp aria-hidden="true" className="transition-transform duration-500 ease-expo group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[clamp(48px,6vw,90px)] px-[var(--gutter)]">
        <VFWordmark text="KASHYAP NASIT" className="text-center text-[15.4vw] text-ivory" />
        <p className="label mt-3 hidden text-center text-mute md:block">Move across the name — it's set in a variable font</p>
      </div>

      <div className="frame mt-6 flex flex-col justify-between gap-2 border-t hairline py-6 md:flex-row">
        <span className="label text-mute">© 2026 Kashyap Nasit</span>
        <span className="label text-mute">{site.location} · Built with curiosity</span>
      </div>
    </footer>
  );
}
