/* Label that rolls to a copy of itself on hover of its button/link. */
export default function Roll({ children }) {
  return (
    <span className="roll">
      <span className="roll-in" data-text={children}>{children}</span>
    </span>
  );
}
