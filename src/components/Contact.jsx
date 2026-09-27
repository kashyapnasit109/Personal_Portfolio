import { useEffect, useMemo, useRef, useState } from 'react';
import { FiArrowUpRight, FiCopy, FiCheck, FiRotateCcw } from 'react-icons/fi';
import { PiBriefcaseDuotone, PiHandshakeDuotone, PiLightningDuotone, PiSparkleDuotone, PiHandWavingDuotone, PiPaperPlaneTiltDuotone, PiPencilSimpleLineDuotone, PiEnvelopeOpenDuotone, PiChatCircleDotsDuotone } from 'react-icons/pi';
import { site } from '../data/site';
import { gsap, prefersReduced, revealBlocks, revealWords } from '../lib/motion';

const INTENTS = [
  { id: 'internship', label: 'Internship', icon: PiBriefcaseDuotone, quip: 'Excellent taste. I will bring curiosity and very organised architecture diagrams.', ph: 'The role, the team, and what you would want me to own…' },
  { id: 'client', label: 'Client project', icon: PiHandshakeDuotone, quip: 'Satva Laser went live. Yours could be next — deadlines welcome, scope creep less so.', ph: 'What you want built, who it is for, and any deadline…' },
  { id: 'hackathon', label: 'Hackathon team-up', icon: PiLightningDuotone, quip: 'Last one ended in a win. You bring snacks; I bring the system design.', ph: 'The event, the problem statement, and the team so far…' },
  { id: 'collab', label: 'Collaboration', icon: PiSparkleDuotone, quip: 'Two curious people, one idea, far too many browser tabs. I’m in.', ph: 'The idea and where you think I fit in…' },
  { id: 'hello', label: 'Just saying hi', icon: PiHandWavingDuotone, quip: 'Hi back. Bonus points for questions about cars, cameras or computer vision.', ph: 'Say hello — questions about AUREX, VIGINT or Hawk-i welcome…' },
];

const STEPS = [
  { icon: PiPencilSimpleLineDuotone, k: 'You write', v: 'Pick a topic, add a few honest lines.' },
  { icon: PiEnvelopeOpenDuotone, k: 'Your mail app opens', v: 'The message arrives already drafted and addressed. Nothing is stored here.' },
  { icon: PiChatCircleDotsDuotone, k: 'I reply', v: 'I read everything. Interesting subject lines get read first.' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MSG = 20;

function buildDraft({ intent, name, email, org, message }) {
  const it = INTENTS.find((i) => i.id === intent)?.label || 'Hello';
  const who = org ? `${name.trim()} (${org.trim()})` : name.trim();
  const subject = `[Portfolio] ${it} — ${who || 'New inquiry'}`;
  const body = [
    'Hi Kashyap,',
    '',
    message.trim(),
    '',
    `— ${name.trim()}`,
    org.trim() ? org.trim() : null,
    email.trim(),
    '',
    `Topic: ${it} · sent from your portfolio`,
  ]
    .filter((l) => l !== null)
    .join('\n');
  return { subject, body };
}

export default function Contact() {
  const root = useRef(null);
  const title = useRef(null);
  const [form, setForm] = useState({ intent: 'internship', name: '', email: '', org: '', message: '' });
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    revealWords(title.current);
    revealBlocks(root.current);
  }, []);

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = 'Tell me who you are.';
    if (!EMAIL_RE.test(form.email.trim())) e.email = 'I need a valid email to reply to.';
    if (form.message.trim().length < MIN_MSG) e.message = `A little more context — at least ${MIN_MSG} characters.`;
    return e;
  }, [form]);

  const draft = useMemo(() => buildDraft(form), [form]);
  const intent = INTENTS.find((i) => i.id === form.intent);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const show = (k) => touched[k] && errors[k];

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;

  const submit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) {
      const first = ['name', 'email', 'message'].find((k) => errors[k]);
      root.current.querySelector(`#f-${first}`)?.focus();
      return;
    }
    const plane = root.current.querySelector('[data-plane]');
    const fly = () => { window.location.href = mailto; setSent(true); };
    if (prefersReduced() || !plane) { fly(); return; }
    gsap.timeline({ onComplete: fly })
      .to(plane, { x: -6, y: 4, rotation: -8, duration: 0.18, ease: 'power2.out' })
      .to(plane, { x: 420, y: -260, rotation: 18, scale: 0.4, autoAlpha: 0, duration: 0.75, ease: 'power3.in' });
  };

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(''), 1800);
    } catch {
      /* clipboard blocked — the text is still visible to select */
    }
  };

  const field =
    'peer w-full bg-transparent border-b border-white/15 pb-3 pt-1 text-[17px] text-ivory placeholder:text-ivory/25 outline-none transition-colors duration-500 focus:border-glass';

  return (
    <section id="contact" ref={root} className="relative overflow-hidden bg-ink pb-[clamp(56px,6vw,90px)] pt-[clamp(72px,9vw,130px)]" aria-labelledby="contact-title">
      <div className="pointer-events-none absolute -right-[20%] top-[10%] h-[70vw] w-[70vw] rounded-full opacity-60" style={{ background: 'radial-gradient(closest-side, rgba(61,111,224,0.22), transparent)' }} />
      <div className="frame relative grid gap-16 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-5">
          <span data-reveal className="label text-glass">Contact · inbox open</span>
          <h2 id="contact-title" ref={title} className="display mt-6 text-[clamp(60px,9vw,150px)]">
            Leave a <span className="serif-i text-glass" data-nosplit>message.</span>
          </h2>
          <p data-reveal className="mt-8 max-w-[40ch] text-[15px] leading-relaxed text-ivory/65">
            Internships, client builds, hackathon team-ups or a question about the work — pick a topic, write a few lines, and your mail app opens with the message already drafted to me.
          </p>

          <ol data-reveal className="mt-auto space-y-0 pt-12">
            {STEPS.map((st, k) => (
              <li key={st.k} className="group relative flex gap-5 border-t hairline py-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-[20px] text-glass transition-all duration-500 ease-expo group-hover:scale-110 group-hover:border-glass group-hover:bg-glass group-hover:text-ink">
                  <st.icon aria-hidden="true" />
                </span>
                <span>
                  <span className="label text-ivory/40">Step 0{k + 1}</span>
                  <span className="mt-1 block font-display text-[20px] font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-glass">{st.k}</span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-ivory/55">{st.v}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div data-reveal data-spot className="relative rounded-[18px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl md:p-10" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 40px 120px -40px rgba(0,0,0,0.8)' }}>
            {!sent ? (
              <form onSubmit={submit} noValidate aria-describedby="form-note">
                <fieldset>
                  <legend className="label mb-4 text-ivory/60">I'm reaching out about</legend>
                  <div className="flex flex-wrap gap-2" role="radiogroup">
                    {INTENTS.map((i) => {
                      const on = form.intent === i.id;
                      return (
                        <label key={i.id} className={`group/chip inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition-all duration-500 ease-expo has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-glass ${on ? 'border-glass bg-glass text-ink' : 'border-white/15 text-ivory/75 hover:-translate-y-0.5 hover:border-white/40'}`}>
                          <input type="radio" name="intent" value={i.id} checked={on} onChange={set('intent')} className="sr-only-f" />
                          <i.icon aria-hidden="true" className="text-[17px] transition-transform duration-500 ease-expo group-hover/chip:rotate-[-14deg] group-hover/chip:scale-125" />
                          {i.label}
                        </label>
                      );
                    })}
                  </div>
                  <p key={form.intent} className="mt-4 min-h-[1.5em] font-serif text-[18px] italic text-ivory/70" style={{ animation: 'quipin .5s cubic-bezier(.16,1,.3,1)' }}>{intent?.quip}</p>
                </fieldset>

                <div className="mt-9 grid gap-8 md:grid-cols-2">
                  <div>
                    <label htmlFor="f-name" className="label text-ivory/50">Your name *</label>
                    <input id="f-name" autoComplete="name" value={form.name} onChange={set('name')} onBlur={blur('name')} className={field} placeholder="Priya Sharma" aria-invalid={!!show('name')} aria-describedby="e-name" />
                    <p id="e-name" className="mt-2 min-h-[16px] text-[12px] text-[#ff9a8a]">{show('name') || ''}</p>
                  </div>
                  <div>
                    <label htmlFor="f-email" className="label text-ivory/50">Email *</label>
                    <input id="f-email" type="email" autoComplete="email" value={form.email} onChange={set('email')} onBlur={blur('email')} className={field} placeholder="you@company.com" aria-invalid={!!show('email')} aria-describedby="e-email" />
                    <p id="e-email" className="mt-2 min-h-[16px] text-[12px] text-[#ff9a8a]">{show('email') || ''}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="f-org" className="label text-ivory/50">Company / college <span className="normal-case tracking-normal text-ivory/30">(optional)</span></label>
                  <input id="f-org" autoComplete="organization" value={form.org} onChange={set('org')} className={field} placeholder="Where you're writing from" />
                </div>

                <div className="mt-8">
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="f-message" className="label text-ivory/50">Message *</label>
                    <span className={`font-mono text-[11px] ${form.message.trim().length >= MIN_MSG ? 'text-glass' : 'text-ivory/35'}`}>
                      {form.message.trim().length}/{MIN_MSG}+
                    </span>
                  </div>
                  <textarea id="f-message" rows={4} value={form.message} onChange={set('message')} onBlur={blur('message')} className={`${field} resize-none`} placeholder={intent?.ph} aria-invalid={!!show('message')} aria-describedby="e-message" />
                  <p id="e-message" className="mt-2 min-h-[16px] text-[12px] text-[#ff9a8a]">{show('message') || ''}</p>
                </div>

                <div className="mt-4 rounded-[10px] border border-white/10 bg-ink/50 px-4 py-3 font-mono text-[11.5px] leading-relaxed text-ivory/55" aria-live="polite">
                  <div className="truncate"><span className="text-ivory/35">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{site.email}</div>
                  <div className="truncate"><span className="text-ivory/35">Subject </span>{draft.subject}</div>
                </div>

                <div className="mt-8 flex flex-col-reverse items-start justify-between gap-5 sm:flex-row sm:items-center">
                  <p id="form-note" className="max-w-[30ch] text-[12.5px] leading-relaxed text-ivory/40">
                    Opens your email app with this draft. Nothing is stored on this site.
                  </p>
                  <button type="submit" className="group btn-pill bg-ivory text-ink hover:bg-glass">
                    Send transmission
                    <span data-plane className="inline-block text-[18px] transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:rotate-12"><PiPaperPlaneTiltDuotone aria-hidden="true" /></span>
                  </button>
                </div>
              </form>
            ) : (
              <div role="status" className="flex min-h-[420px] flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-glass text-ink">
                  <FiCheck aria-hidden="true" className="text-xl" />
                </div>
                <h3 className="mt-8 font-display text-[34px] font-semibold leading-tight tracking-[-0.02em]">
                  Draft ready, {form.name.trim().split(' ')[0]}.
                </h3>
                <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-ivory/65">
                  Your mail app should now be open with the message addressed to me. Press send there and I'll get back to you.
                </p>
                <div className="mt-8 rounded-[10px] border border-white/10 bg-ink/50 p-4">
                  <p className="label mb-3 text-ivory/45">Nothing opened? Use one of these</p>
                  <div className="flex flex-wrap gap-2">
                    <a href={gmail} target="_blank" rel="noopener noreferrer" className="btn-pill border border-white/15 py-2.5 text-ivory hover:border-ivory">
                      Open in Gmail <FiArrowUpRight aria-hidden="true" />
                    </a>
                    <button onClick={() => copy(`To: ${site.email}\nSubject: ${draft.subject}\n\n${draft.body}`, 'draft')} className="btn-pill border border-white/15 py-2.5 text-ivory hover:border-ivory">
                      {copied === 'draft' ? <><FiCheck aria-hidden="true" /> Copied</> : <><FiCopy aria-hidden="true" /> Copy message</>}
                    </button>
                    <a href={mailto} className="btn-pill border border-white/15 py-2.5 text-ivory hover:border-ivory">Try mail app again</a>
                  </div>
                </div>
                <button onClick={() => setSent(false)} className="label mt-auto inline-flex items-center gap-2 pt-8 text-ivory/50 hover:text-ivory">
                  <FiRotateCcw aria-hidden="true" /> Edit message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{'@keyframes quipin { from { opacity: 0; transform: translateY(8px); } }'}</style>
    </section>
  );
}
