import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'power3.out', duration: 0.9 });

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;

export function initSmoothScroll() {
  if (prefersReduced() || lenis) return lenis;
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function getLenis() {
  return lenis;
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth' });
}

/* Split an element's text into masked words (keeps inline <em>/<a> children as single units). */
export function splitWords(el) {
  if (!el || el.dataset.split) return el?.querySelectorAll('.word-mask > span') || [];
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
          else {
            const m = document.createElement('span');
            m.className = 'word-mask';
            const i = document.createElement('span');
            i.textContent = part;
            m.appendChild(i);
            frag.appendChild(m);
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && !child.classList.contains('word-mask')) {
        if (child.dataset.nosplit !== undefined) {
          const m = document.createElement('span');
          m.className = 'word-mask';
          child.replaceWith(m);
          const i = document.createElement('span');
          i.appendChild(child);
          m.appendChild(i);
        } else walk(child);
      }
    });
  };
  walk(el);
  el.dataset.split = '1';
  return el.querySelectorAll('.word-mask > span');
}

/*
  Run `fn` once when an element becomes visible. Uses IntersectionObserver, which the browser
  keeps up to date through layout shifts, lazy pages and late images — unlike cached scroll
  positions. Elements already above the viewport run immediately.
*/
export function whenVisible(targets, fn, { margin = '0px 0px -10% 0px' } = {}) {
  const list = !targets ? [] : targets.length !== undefined ? [...targets] : [targets];
  if (!list.length) return () => {};
  const io = new IntersectionObserver((entries) => {
    const hits = entries.filter((e) => e.isIntersecting || e.boundingClientRect.bottom < 0).map((e) => e.target);
    if (!hits.length) return;
    hits.forEach((t) => io.unobserve(t));
    fn(hits);
  }, { rootMargin: margin, threshold: 0 });
  list.forEach((t) => io.observe(t));
  return () => io.disconnect();
}

/* Heading reveal: masked words rise in reading order when the element enters. */
export function revealWords(el, { delay = 0, stagger = 0.045 } = {}) {
  const words = splitWords(el);
  if (prefersReduced() || !words.length) return () => {};
  gsap.set(words, { yPercent: 110 });
  return whenVisible(el, () => gsap.to(words, { yPercent: 0, duration: 1.05, ease: 'expo.out', stagger, delay }));
}

/* Generic fade-up for blocks marked [data-reveal] inside a root. */
export function revealBlocks(root) {
  if (!root) return () => {};
  const items = root.querySelectorAll('[data-reveal]');
  if (!items.length || prefersReduced()) return () => {};
  gsap.set(items, { autoAlpha: 0, y: 28 });
  return whenVisible(items, (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.95, ease: 'power3.out', stagger: 0.07 }), { margin: '0px 0px -8% 0px' });
}

export { gsap, ScrollTrigger };

/* Buttons lean toward the pointer (desktop only). Applies to .btn-pill and [data-magnetic]. */
export function initMagnetic() {
  if (prefersReduced() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};
  const onMove = (e) => {
    const el = e.target.closest?.('.btn-pill, [data-magnetic]');
    document.querySelectorAll('[data-mag-active]').forEach((a) => {
      if (a !== el) {
        a.removeAttribute('data-mag-active');
        gsap.to(a, { x: 0, y: 0, duration: 0.7, ease: 'expo.out' });
      }
    });
    if (!el) return;
    const b = el.getBoundingClientRect();
    const dx = e.clientX - (b.left + b.width / 2);
    const dy = e.clientY - (b.top + b.height / 2);
    el.setAttribute('data-mag-active', '');
    gsap.to(el, { x: dx * 0.28, y: dy * 0.38, duration: 0.45, ease: 'power3.out' });
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  return () => window.removeEventListener('pointermove', onMove);
}

/* Letters of a RollText rise from their own baseline mask when it scrolls into view. */
export function revealChars(el, { stagger = 0.03, delay = 0 } = {}) {
  if (!el) return () => {};
  const inner = el.querySelectorAll('.rc-in');
  if (!inner.length || prefersReduced()) return () => {};
  gsap.set(inner, { '--ry': '110%' });
  return whenVisible(el, () => gsap.to(inner, { '--ry': '0%', duration: 1.1, ease: 'expo.out', stagger, delay }), { margin: '0px' });
}

/* Ivory chapters open out from a rounded card as they scroll in. */
export function cardReveal(el) {
  if (!el || prefersReduced()) return null;
  gsap.set(el, { '--ci': '6vh', '--cx': '4vw', '--cr': '36px' });
  return gsap.to(el, {
    '--ci': '0vh',
    '--cx': '0vw',
    '--cr': '0px',
    ease: 'none',
    scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 25%', scrub: 0.6 },
  });
}

/* Cards marked [data-tilt] lean toward the pointer in 3D (desktop only). */
export function initTilt() {
  if (prefersReduced() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};
  let active = null;
  const onMove = (e) => {
    const el = e.target.closest?.('[data-tilt]');
    if (active && active !== el) {
      gsap.to(active, { rotationX: 0, rotationY: 0, duration: 0.8, ease: 'expo.out' });
      active = null;
    }
    if (!el) return;
    active = el;
    const b = el.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    gsap.to(el, { rotationY: px * 7, rotationX: -py * 7, transformPerspective: 900, duration: 0.6, ease: 'power3.out' });
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  return () => window.removeEventListener('pointermove', onMove);
}

/* Cards marked [data-spot] carry a soft light that follows the pointer (desktop only). */
export function initSpotlight() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};
  const onMove = (e) => {
    const el = e.target.closest?.('[data-spot]');
    if (!el) return;
    const b = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - b.left}px`);
    el.style.setProperty('--my', `${e.clientY - b.top}px`);
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  return () => window.removeEventListener('pointermove', onMove);
}
