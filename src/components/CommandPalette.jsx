import { useEffect, useMemo, useRef, useState } from 'react';
import { site } from '../data/site';
import { flagships, lab } from '../data/projects';
import { getLenis } from '../lib/motion';
import { useGo } from '../lib/transition';
import { nav } from '../data/site';

export default function CommandPalette({ open, onClose }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const input = useRef(null);
  const go = useGo();

  const actions = useMemo(
    () => [
      { group: 'Go to', label: 'Index', run: () => go('/') },
      ...nav.map((n) => ({ group: 'Go to', label: n.label, run: () => go(n.to) })),
      ...flagships.filter((p) => p.live).map((p) => ({ group: 'Open live', label: p.title, run: () => window.open(p.live, '_blank', 'noopener') })),
      ...[...flagships, lab].filter((p) => p.code).map((p) => ({ group: 'Source', label: `${p.title} on GitHub`, run: () => window.open(p.code, '_blank', 'noopener') })),
      { group: 'Contact', label: 'Copy email address', run: () => navigator.clipboard?.writeText(site.email) },
      { group: 'Contact', label: 'Write an inquiry', run: () => go('/contact') },
      { group: 'Contact', label: 'GitHub profile', run: () => window.open(site.github, '_blank', 'noopener') },
      { group: 'Contact', label: 'Instagram', run: () => window.open(site.instagram, '_blank', 'noopener') },
      { group: 'Contact', label: 'LinkedIn', run: () => window.open(site.linkedin, '_blank', 'noopener') },
      { group: 'Contact', label: `Call ${site.phone}`, run: () => { window.location.href = site.phoneHref; } },
    ],
    [go],
  );

  const list = actions.filter((a) => `${a.group} ${a.label}`.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    if (!open) return;
    setQ('');
    setIdx(0);
    getLenis()?.stop();
    setTimeout(() => input.current?.focus(), 30);
    return () => getLenis()?.start();
  }, [open]);

  if (!open) return null;

  const run = (a) => {
    onClose();
    setTimeout(a.run, 60);
  };

  const onKey = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, list.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && list[idx]) run(list[idx]);
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-start justify-center bg-ink/70 px-4 pt-[14vh] backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="w-full max-w-[560px] overflow-hidden rounded-[14px] border border-white/10 bg-ink-2 shadow-2xl" onClick={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <input
          ref={input}
          value={q}
          onChange={(e) => { setQ(e.target.value); setIdx(0); }}
          placeholder="Jump to a section, open a project…"
          className="w-full border-b border-white/10 bg-transparent px-5 py-4 text-[16px] text-ivory outline-none placeholder:text-ivory/30"
          aria-label="Search commands"
        />
        <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox" data-lenis-prevent>
          {list.map((a, i) => (
            <li key={a.group + a.label} role="option" aria-selected={i === idx}>
              <button
                onMouseEnter={() => setIdx(i)}
                onClick={() => run(a)}
                className={`flex w-full items-center justify-between rounded-[8px] px-3 py-2.5 text-left text-[14px] ${i === idx ? 'bg-white/[0.07] text-ivory' : 'text-ivory/70'}`}
              >
                {a.label}
                <span className="label text-mute">{a.group}</span>
              </button>
            </li>
          ))}
          {!list.length && <li className="px-3 py-6 text-center text-[14px] text-ivory/40">No match.</li>}
        </ul>
        <div className="flex justify-between border-t border-white/10 px-5 py-2.5">
          <span className="label text-mute">↑↓ move · Enter run</span>
          <span className="label text-mute">Esc close</span>
        </div>
      </div>
    </div>
  );
}
