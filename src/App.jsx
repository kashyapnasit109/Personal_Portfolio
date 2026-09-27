import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import CommandPalette from './components/CommandPalette';
import AIAssistant from './components/AIAssistant';
import { TransitionProvider } from './lib/transition';
import { initSmoothScroll, initMagnetic, initTilt, initSpotlight, ScrollTrigger } from './lib/motion';
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const Lens = lazy(() => import('./pages/Lens'));
const JourneyPage = lazy(() => import('./pages/JourneyPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const TITLES = {
  '/': 'Kashyap Nasit — A curious mind that builds with technology',
  '/about': 'About — Kashyap Nasit',
  '/work': 'Work — Kashyap Nasit',
  '/lens': 'Lens — Kashyap Nasit',
  '/journey': 'Journey — Kashyap Nasit',
  '/contact': 'Contact — Kashyap Nasit',
};

function Shell() {
  const [palette, setPalette] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    initSmoothScroll();
    const a = initMagnetic();
    const b = initTilt();
    const c = initSpotlight();
    return () => { a(); b(); c(); };
  }, []);

  useEffect(() => {
    document.title = TITLES[pathname] || 'Kashyap Nasit';
    // re-measure every scroll-linked effect once the new page has actually laid out
    const ts = [250, 900, 2200].map((ms) => setTimeout(() => ScrollTrigger.refresh(), ms));
    return () => ts.forEach(clearTimeout);
  }, [pathname]);

  // whenever the page height changes (lazy pages, late images, fonts) positions are refreshed
  useEffect(() => {
    let last = document.documentElement.scrollHeight;
    let t = null;
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (Math.abs(h - last) < 4) return;
      last = h;
      clearTimeout(t);
      t = setTimeout(() => ScrollTrigger.refresh(), 220);
    });
    ro.observe(document.body);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    document.fonts?.ready?.then(onLoad);
    return () => { ro.disconnect(); clearTimeout(t); window.removeEventListener('load', onLoad); };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="grain relative">
      <Cursor />
      <Navbar onCommand={() => setPalette(true)} />
      <main>
        <Suspense fallback={<div className="min-h-[100svh] bg-ink" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/lens" element={<Lens />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <AIAssistant />
      <CommandPalette open={palette} onClose={() => setPalette(false)} />
    </div>
  );
}

export default function App() {
  return (
    <TransitionProvider>
      <Shell />
    </TransitionProvider>
  );
}
