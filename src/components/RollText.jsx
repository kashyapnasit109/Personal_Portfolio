/*
  Per-letter roll: on hover of any `roll-group` ancestor each letter slides up and its twin
  rolls in from below, staggered left to right. Letters can also rise into view on scroll
  (see revealChars in lib/motion), which drives the same element through a CSS variable.
  Words stay unbreakable; lines may wrap between words.
*/
export default function RollText({ text, className = '' }) {
  let n = 0;
  const words = text.split(' ');
  const out = [];
  words.forEach((w, wi) => {
    out.push(
      <span key={`w${wi}`} className="roll-word" aria-hidden="true">
        {[...w].map((c) => {
          const i = n++;
          return (
            <span key={i} className="roll-char" style={{ '--i': i }}>
              <span className="rc-in" data-c={c}>{c}</span>
            </span>
          );
        })}
      </span>,
    );
    if (wi < words.length - 1) out.push(' ');
  });
  return (
    <span className={`roll-text ${className}`} aria-label={text}>
      {out}
    </span>
  );
}
