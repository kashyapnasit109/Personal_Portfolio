export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-surface-border bg-primary-dark">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="font-heading font-black text-2xl uppercase text-white">
            Kashyap Nasit.
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-8 justify-center">
            <a href="https://github.com/kashyapnasit109/" target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-accent transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-accent transition-colors">
              LinkedIn
            </a>
            <a href="https://wa.me/916355702811" target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-accent transition-colors">
              WhatsApp
            </a>
            <a href="mailto:Kashyapnasit12345@gmail.com" className="font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-accent transition-colors">
              Gmail
            </a>
          </div>

          <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest w-full lg:w-auto mt-4 lg:mt-0">
            {new Date().getFullYear()} — Intelligent Systems
          </div>
        </div>
      </div>
    </footer>
  );
}
