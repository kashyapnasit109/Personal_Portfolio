import { createContext, useCallback, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap, prefersReduced, getLenis, ScrollTrigger } from './motion';
import KMark from '../components/KMark';

/*
  Page transitions: a panel rises over the page carrying the destination's name,
  the route changes underneath it, then the panel leaves through the top.
*/
const Ctx = createContext({ go: () => {} });

export const PAGE_NAMES = {
  '/': 'Index',
  '/about': 'About',
  '/work': 'Work',
  '/lens': 'Through my lens',
  '/journey': 'Journey',
  '/contact': 'Contact',
};

export function nameFor(path) {
  if (path.startsWith('/work/')) return 'Case study';
  return PAGE_NAMES[path] || 'Page';
}

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const panel = useRef(null);
  const label = useRef(null);
  const busy = useRef(false);

  const go = useCallback(
    (to) => {
      const [path, hash] = to.split('#');
      if (busy.current) return;
      if (path === location.pathname) {
        if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        else getLenis() ? getLenis().scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      busy.current = true;
      const reduced = prefersReduced();
      label.current.textContent = nameFor(path);
      const tl = gsap.timeline({ onComplete: () => { busy.current = false; } });
      tl.set(panel.current, { display: 'flex', clipPath: 'inset(100% 0 0 0)' });
      tl.fromTo(label.current, { yPercent: 110 }, { yPercent: 0, duration: reduced ? 0.01 : 0.7, ease: 'expo.out' }, 0.25);
      tl.fromTo(panel.current.querySelector('[data-curtain-k]'), { rotation: -120, scale: 0.4 }, { rotation: 0, scale: 1, duration: reduced ? 0.01 : 0.9, ease: 'expo.out' }, 0.2);
      tl.to(panel.current, { clipPath: 'inset(0% 0 0 0)', duration: reduced ? 0.01 : 0.75, ease: 'expo.inOut' }, 0);
      tl.add(() => {
        getLenis()?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
        navigate(to);
      });
      tl.to({}, { duration: reduced ? 0.01 : 0.25 });
      tl.add(() => ScrollTrigger.refresh());
      tl.to(label.current, { yPercent: -110, duration: reduced ? 0.01 : 0.5, ease: 'expo.in' });
      tl.to(panel.current, { clipPath: 'inset(0 0 100% 0)', duration: reduced ? 0.01 : 0.85, ease: 'expo.inOut' }, '-=0.2');
      tl.set(panel.current, { display: 'none' });
    },
    [location.pathname, navigate],
  );

  return (
    <Ctx.Provider value={{ go }}>
      {children}
      <div
        ref={panel}
        className="pointer-events-none fixed inset-0 z-[190] hidden items-end justify-between bg-ivory px-[var(--gutter)] pb-8 text-ink"
        aria-hidden="true"
      >
        <div className="overflow-hidden">
          <span ref={label} className="display block text-[clamp(64px,13vw,220px)]" />
        </div>
        <span className="mb-4 hidden items-center gap-3 md:flex">
          <span data-curtain-k className="inline-block"><KMark size={44} className="text-ink" /></span>
          <span className="label text-ink/50">Kashyap Nasit — Portfolio</span>
        </span>
      </div>
    </Ctx.Provider>
  );
}

export const useGo = () => useContext(Ctx).go;

/* Anchor that transitions instead of hard-navigating. */
export function TLink({ to, children, className = '', onClick, ...rest }) {
  const go = useGo();
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onClick?.(e);
        go(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
