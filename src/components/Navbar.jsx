import { useEffect, useState } from 'react';
import { nav, site } from '../data/site';
import { useLocation } from 'react-router-dom';
import { getLenis } from '../lib/motion';
import KMark from './KMark';
import { useGo, TLink } from '../lib/transition';
import Roll from './Roll';

function useClock(tz) {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz, hour12: false }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Navbar({ onCommand }) {
  const time = useClock(site.timezone);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();
  const route = useGo();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const l = getLenis();
    if (open) { l?.stop(); document.body.style.overflow = 'hidden'; }
    else { l?.start(); document.body.style.overflow = ''; }
  }, [open]);

  const go = (to) => {
    setOpen(false);
    setTimeout(() => route(to), open ? 350 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] text-white mix-blend-difference transition-transform duration-700 ease-expo ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="frame flex h-[72px] items-center justify-between">
          <button onClick={() => go('/')} className="group flex items-center gap-3" aria-label="Kashyap Nasit — home">
            <KMark size={30} className="transition-transform duration-700 ease-expo group-hover:rotate-[28deg]" />
            <span className="font-display text-[15px] font-semibold tracking-[-0.01em]">Kashyap Nasit</span>
          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <TLink key={item.to} to={item.to} className="relative flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.14em]" aria-current={pathname === item.to ? 'page' : undefined}>
                <span className={`h-1 w-1 rounded-full bg-white transition-transform duration-500 ${pathname === item.to ? 'scale-100' : 'scale-0'}`} />
                <Roll>{item.label}</Roll>
              </TLink>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <span className="hidden font-mono text-[12px] tabular-nums tracking-[0.1em] lg:inline" title="Local time in India">
              IST {time}
            </span>
            <button
              onClick={onCommand}
              className="hidden items-center gap-1.5 rounded-md border border-white/40 px-2 py-1 font-mono text-[11px] tracking-[0.08em] md:inline-flex"
              aria-label="Open command palette (Ctrl + K)"
            >
              Ctrl K
            </button>
            <button
              onClick={() => go('/contact')}
              className="hidden rounded-full border border-white px-4 py-2 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-500 hover:bg-white hover:text-black md:inline-block"
            >
              <Roll>Let's talk</Roll>
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative h-10 w-10 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span className={`absolute left-2 right-2 top-[15px] h-px bg-white transition-transform duration-500 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
              <span className={`absolute left-2 right-2 top-[25px] h-px bg-white transition-transform duration-500 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[70] flex flex-col justify-end bg-ink px-[var(--gutter)] pb-10 pt-24 transition-[clip-path] duration-700 ease-quart md:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)]'
        }`}
        aria-hidden={!open}
      >
        <ul className="space-y-1">
          {nav.map((item, i) => (
            <li key={item.to} className="overflow-hidden">
              <button
                tabIndex={open ? 0 : -1}
                onClick={() => go(item.to)}
                className={`display flex w-full items-baseline justify-between text-[17vw] transition-transform duration-700 ease-expo ${open ? 'translate-y-0' : 'translate-y-full'}`}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
              >
                {item.label}
                <span className="label text-mute">{item.n}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 border-t hairline pt-5">
          <div className="flex items-center justify-between">
            <a href={`mailto:${site.email}`} className="font-mono text-[12px] text-ivory/80">{site.email}</a>
            <span className="label text-mute">IST {time}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[['Instagram', site.instagram], ['LinkedIn', site.linkedin], ['GitHub', site.github], ['Call', site.phoneHref]].map(([k, h]) => (
              <a key={k} href={h} target={h.startsWith('tel') ? undefined : '_blank'} rel="noopener noreferrer" className="rounded-full border border-white/15 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ivory/75">{k}</a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
