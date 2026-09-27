import { useEffect } from 'react';
import { gsap, prefersReduced } from '../lib/motion';
import { TLink } from '../lib/transition';

/*
  Inline words that summon a floating image card which trails the cursor with a little
  lag and tilts with speed. One card is shared by every PreviewWord on the page.
*/
let card = null;
let img = null;
let cap = null;
let follow = null;
let hideT = null;

function ensure() {
  if (card) return;
  card = document.createElement('div');
  card.className = 'pv-card';
  card.setAttribute('aria-hidden', 'true');
  card.innerHTML = '<div class="pv-clip"><img alt="" /></div><span class="pv-cap label"></span>';
  document.body.appendChild(card);
  img = card.querySelector('img');
  cap = card.querySelector('.pv-cap');
  gsap.set(card, { xPercent: -50, yPercent: -115, autoAlpha: 0 });
  const xTo = gsap.quickTo(card, 'x', { duration: 0.55, ease: 'power3.out' });
  const yTo = gsap.quickTo(card, 'y', { duration: 0.55, ease: 'power3.out' });
  const rTo = gsap.quickTo(card, 'rotation', { duration: 0.6, ease: 'power3.out' });
  let lx = 0;
  follow = (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
    rTo(Math.max(-9, Math.min(9, (e.clientX - lx) * 0.35)));
    lx = e.clientX;
  };
}

function show(e, src, caption) {
  if (prefersReduced() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  ensure();
  clearTimeout(hideT);
  img.src = src;
  cap.textContent = caption || '';
  gsap.set(card, { x: e.clientX, y: e.clientY });
  gsap.to(card, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'expo.out', overwrite: 'auto' });
  gsap.fromTo(card.firstChild, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'expo.out' });
  window.addEventListener('pointermove', follow);
}

function hide() {
  if (!card) return;
  window.removeEventListener('pointermove', follow);
  gsap.to(card, { autoAlpha: 0, scale: 0.92, duration: 0.3, ease: 'power2.in', overwrite: 'auto' });
}

export default function PreviewWord({ img: src, caption, to, children, className = '' }) {
  useEffect(() => () => hide(), []);
  const props = {
    className: `pv-word ${className}`,
    onPointerEnter: (e) => show(e, src, caption),
    onPointerLeave: hide,
    onClick: hide,
  };
  if (to) return <TLink to={to} {...props}>{children}</TLink>;
  return <span {...props}>{children}</span>;
}
