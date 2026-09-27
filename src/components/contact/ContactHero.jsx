import { useEffect, useRef, useState } from 'react';
import { PiCopyDuotone, PiCheckCircleDuotone, PiGithubLogoDuotone, PiEnvelopeSimpleDuotone, PiClockDuotone, PiArrowUpRightBold, PiInstagramLogoDuotone, PiLinkedinLogoDuotone, PiPhoneCallDuotone } from 'react-icons/pi';
import { site } from '../../data/site';
import ContactCard from './ContactCard';
import { gsap, prefersReduced } from '../../lib/motion';

/*
  Contact opener. The greeting changes language every time you hover or tap it (English,
  Hindi, Gujarati — the three I actually speak — plus a couple of show-offs). A live status
  card guesses what I'm doing from the time in India.
*/
const HELLOS = [
  ['Hello', 'English'],
  ['Namaste', 'Hindi'],
  ['Kem cho', 'Gujarati'],
  ['Hola', 'Spanish (I know three words)'],
  ['console.log("hi")', 'JavaScript'],
];
const GLYPHS = '▯▮◇◆/\\|—_+=<>01XY#';

function statusFor(h) {
  if (h < 6) return ['Probably asleep', 'Or pretending, with 12 tabs open.'];
  if (h < 9) return ['Loading coffee', 'Replies may contain typos until 9.'];
  if (h < 13) return ['In class or building', 'Possibly both, respectfully.'];
  if (h < 14) return ['lunch.exe running', 'Back after the break.'];
  if (h < 19) return ['Building something', 'Most likely Hawk-i. Possibly a bug.'];
  if (h < 23) return ['Deep-focus mode', 'The best time to send an interesting problem.'];
  return ['One more commit', 'It is never one more commit.'];
}

function useIST() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
  const hour = Number(now.toLocaleString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', hour12: false }));
  return { time, hour };
}

export default function ContactHero() {
  const root = useRef(null);
  const [i, setI] = useState(0);
  const [text, setText] = useState(HELLOS[0][0]);
  const [copied, setCopied] = useState(false);
  const { time, hour } = useIST();
  const [st, stNote] = statusFor(hour);
  const busy = useRef(false);

  const next = () => {
    if (busy.current) return;
    const k = (i + 1) % HELLOS.length;
    setI(k);
    const target = HELLOS[k][0];
    if (prefersReduced()) { setText(target); return; }
    busy.current = true;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 520);
      const settled = Math.floor(t * target.length);
      let s = '';
      for (let c = 0; c < target.length; c++) s += c < settled ? target[c] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      setText(s);
      if (t < 1) requestAnimationFrame(tick);
      else busy.current = false;
    };
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (prefersReduced()) return;
    const t = gsap.fromTo(root.current.querySelectorAll('[data-in]'), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: 0.5 });
    return () => t.progress(1).kill();
  }, []);

  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email); } catch { /* still visible to select */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const long = text.length > 9;

  return (
    <header ref={root} className="relative overflow-hidden bg-ink pb-10 pt-[clamp(130px,17vh,190px)]">
      <div className="frame">
        <div data-in className="flex items-center justify-between border-b hairline pb-4">
          <span className="label text-glass">Contact · inbox open</span>
          <span className="label hidden text-ivory/50 sm:inline">{site.status}</span>
        </div>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
        <button
          type="button"
          data-in
          onPointerEnter={next}
          onClick={next}
          className="group block w-full text-left lg:col-span-7"
          aria-label={`Greeting: ${HELLOS[i][0]} (${HELLOS[i][1]}). Activate for another language.`}
          data-cursor="Again"
        >
          <span className={`display block whitespace-nowrap transition-[font-size] duration-500 ${long ? 'text-[clamp(38px,5.2vw,96px)]' : 'text-[clamp(80px,13vw,240px)]'}`}>
            {text}<span className="text-glass">.</span>
          </span>
          <span className="label mt-3 flex items-center gap-3 text-ivory/45">
            <span className="rounded-full border border-glass/40 px-2.5 py-1 text-glass">{HELLOS[i][1]}</span>
            hover again — I have {HELLOS.length - 1} more
          </span>
        </button>
        <div data-in className="lg:col-span-5">
          <ContactCard />
        </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {/* live status */}
          <div data-in data-spot className="rounded-[16px] border hairline bg-ink-2/70 p-6">
            <div className="flex items-center justify-between">
              <span className="label flex items-center gap-2 text-ivory/50"><PiClockDuotone className="text-[16px] text-glass" aria-hidden="true" /> {site.location} · IST {time}</span>
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7ee2a8] opacity-60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7ee2a8]" /></span>
            </div>
            <p className="mt-6 font-display text-[28px] font-semibold tracking-[-0.02em]">{st}</p>
            <p className="mt-1 font-serif text-[18px] italic text-ivory/65">{stNote}</p>
          </div>

          {/* email */}
          <div data-in data-spot className="group flex flex-col justify-between rounded-[16px] border hairline bg-ink-2/70 p-6">
            <span className="label flex items-center gap-2 text-ivory/50"><PiEnvelopeSimpleDuotone className="text-[16px] text-glass" aria-hidden="true" /> The direct line</span>
            <a href={`mailto:${site.email}`} className="u-link mt-6 break-all font-display text-[clamp(18px,1.6vw,22px)] font-semibold">{site.email}</a>
            <button type="button" onClick={copy} className="label mt-5 inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-3 py-2 text-ivory/70 transition-colors hover:border-glass hover:text-glass" aria-live="polite">
              {copied ? <><PiCheckCircleDuotone aria-hidden="true" /> Copied. My inbox is bracing itself.</> : <><PiCopyDuotone aria-hidden="true" /> Copy address</>}
            </button>
          </div>

          {/* phone */}
          <a href={site.phoneHref} data-in data-spot className="group flex flex-col justify-between rounded-[16px] border hairline bg-ink-2/70 p-6 transition-colors hover:border-glass/50">
            <span className="label flex items-center gap-2 text-ivory/50"><PiPhoneCallDuotone className="text-[16px] text-glass transition-transform duration-500 group-hover:rotate-[-18deg] group-hover:scale-125" aria-hidden="true" /> Old-fashioned, still works</span>
            <span className="mt-6 block font-display text-[clamp(22px,2vw,28px)] font-semibold tabular-nums tracking-[-0.01em]">{site.phone}</span>
            <span className="mt-2 flex items-center justify-between text-[13px] text-ivory/50">
              Tap to call · Gujarat, IST
              <PiArrowUpRightBold className="text-xl text-ivory/40 transition-all duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-glass" aria-hidden="true" />
            </span>
          </a>
        </div>

        {/* elsewhere */}
        <div data-in className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { href: site.instagram, icon: PiInstagramLogoDuotone, k: 'Instagram', v: site.instagramHandle, note: 'Mostly ceilings and cars.' },
            { href: site.linkedin, icon: PiLinkedinLogoDuotone, k: 'LinkedIn', v: 'Kashyap Nasit', note: 'The professional one.' },
            { href: site.github, icon: PiGithubLogoDuotone, k: 'GitHub', v: 'kashyapnasit109', note: 'Where the commits live.' },
          ].map((l) => (
            <a key={l.k} href={l.href} target="_blank" rel="noopener noreferrer" data-spot className="social-card group relative flex items-center justify-between overflow-hidden rounded-[16px] border hairline bg-ink-2/70 p-6 transition-colors duration-500 hover:border-glass/50">
              <span className="relative z-[2] flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-[24px] text-glass transition-all duration-500 ease-expo group-hover:rotate-[-10deg] group-hover:scale-110 group-hover:border-glass group-hover:bg-glass group-hover:text-ink"><l.icon aria-hidden="true" /></span>
                <span>
                  <span className="label block text-ivory/45">{l.k}</span>
                  <span className="mt-1 block font-display text-[18px] font-semibold">{l.v}</span>
                  <span className="block font-serif text-[15px] italic text-ivory/55">{l.note}</span>
                </span>
              </span>
              <PiArrowUpRightBold className="relative z-[2] text-2xl text-ivory/40 transition-all duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-glass" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
