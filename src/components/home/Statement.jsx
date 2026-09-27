import { useEffect, useRef } from 'react';
import { gsap, splitWords, prefersReduced, whenVisible } from '../../lib/motion';

/*
  An editorial paragraph with small photographs set inline between the words.
  Words brighten as you scroll; the inline pictures open out from a sliver.
*/
function Pic({ src, alt }) {
  return (
    <span data-nosplit className="inline-pic mx-[0.12em] inline-block h-[0.82em] w-[1.6em] overflow-hidden rounded-full align-[-0.08em]">
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    </span>
  );
}

export default function Statement() {
  const p = useRef(null);
  useEffect(() => {
    const words = splitWords(p.current);
    const pics = p.current.querySelectorAll('.inline-pic');
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.14 });
      gsap.to(words, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: p.current, start: 'top 78%', end: 'bottom 40%', scrub: 0.8 } });
      gsap.set(pics, { width: '0.2em' });
    });
    const off = whenVisible(p.current, () => gsap.to(pics, { width: '1.6em', ease: 'expo.out', duration: 1.2, stagger: 0.12 }), { margin: '0px 0px -25% 0px' });
    return () => { off(); ctx.revert(); };
  }, []);

  return (
    <section className="bg-ink py-[clamp(96px,14vw,220px)]" aria-label="Introduction statement">
      <div className="frame">
        <span className="label text-glass">Hello — the short version</span>
        <p ref={p} className="mt-8 max-w-[26ch] font-display text-[clamp(34px,5.2vw,86px)] font-semibold leading-[1.04] tracking-[-0.035em]" style={{ fontStretch: '86%' }}>
          I'm Kashyap. I build <Pic src="/img/vigint-home.webp" alt="VIGINT interface" /> systems that see, platforms that
          <em data-nosplit className="serif-i font-normal text-glass"> refuse to hallucinate</em>, and websites clients put their name on. Off the keyboard I walk cities
          <Pic src="/img/lens/t14.webp" alt="Leadenhall Market" /> to see how they work, read about money
          <Pic src="/img/lens/t07.webp" alt="The Psychology of Money on a flight" /> at thirty thousand feet, and lose whole evenings to rabbit holes — on purpose.
        </p>
      </div>
    </section>
  );
}
