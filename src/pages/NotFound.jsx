import { TLink } from '../lib/transition';

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-ink px-[var(--gutter)] text-center">
      <span className="label text-glass">404 · no detections</span>
      <h1 className="display mt-6 text-[clamp(80px,16vw,260px)]">Lost?</h1>
      <p className="mt-4 max-w-[40ch] font-serif text-[22px] italic text-ivory/70">This page went down a rabbit hole and didn't come back. Happens to me too.</p>
      <TLink to="/" className="btn-pill mt-8 bg-ivory text-ink">Back to the index</TLink>
    </section>
  );
}
