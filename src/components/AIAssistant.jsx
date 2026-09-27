import { useEffect, useRef, useState } from 'react';
import { FiMessageCircle, FiX, FiArrowUp } from 'react-icons/fi';
import { assistantResponses, suggestedQuestions } from '../data/assistant';

/* A scripted guide over the portfolio's own facts — no network calls, no invented answers. */
export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: 'a', text: assistantResponses.greeting }]);
  const [input, setInput] = useState('');
  const end = useRef(null);

  useEffect(() => end.current?.scrollIntoView({ block: 'end' }), [msgs, open]);

  const answer = (q) => {
    const l = q.toLowerCase();
    return assistantResponses.questions.find((x) => x.patterns.some((p) => l.includes(p)))?.answer || assistantResponses.fallback;
  };

  const send = (text) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: 'u', text: q }]);
    setInput('');
    setTimeout(() => setMsgs((m) => [...m, { role: 'a', text: answer(q) }]), 420);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`ai-fab fixed bottom-5 right-5 z-[120] flex h-14 w-14 items-center justify-center rounded-full border shadow-2xl transition-colors duration-500 md:bottom-8 md:right-8 ${
          open ? 'border-white/20 bg-ink-2 text-ivory' : 'border-glass bg-glass text-ink hover:bg-ivory'
        }`}
        aria-expanded={open}
        aria-label={open ? 'Close portfolio guide' : 'Ask about my work'}
      >
        {open ? <FiX className="text-xl" /> : <FiMessageCircle className="text-xl" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 z-[120] flex h-[520px] max-h-[70vh] w-[380px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[16px] border border-white/10 bg-ink-2/95 shadow-2xl backdrop-blur-xl md:right-8 md:bottom-28" role="dialog" aria-label="Portfolio guide">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <span className="font-display text-[17px] font-semibold">Ask about the work</span>
            <span className="label text-mute">Guide</span>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" data-lenis-prevent>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'u' ? 'justify-end' : ''}`}>
                <p className={`max-w-[88%] rounded-[12px] px-3.5 py-2.5 text-[13.5px] leading-relaxed ${m.role === 'u' ? 'bg-glass text-ink' : 'bg-white/[0.05] text-ivory/85'}`}>{m.text}</p>
              </div>
            ))}
            {msgs.length <= 2 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestedQuestions.map((q) => (
                  <button key={q} onClick={() => send(q)} className="rounded-full border border-white/15 px-3 py-1.5 text-[12.5px] text-ivory/70 hover:border-glass hover:text-ivory">
                    {q}
                  </button>
                ))}
              </div>
            )}
            <div ref={end} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2 border-t border-white/10 p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about AUREX, SIH, Hawk-i…" className="flex-1 bg-transparent px-2 text-[14px] text-ivory outline-none placeholder:text-ivory/30" aria-label="Your question" />
            <button type="submit" className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-ink" aria-label="Send question">
              <FiArrowUp />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
