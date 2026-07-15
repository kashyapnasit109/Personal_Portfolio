import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiArrowRight } from 'react-icons/fi';

const commands = [
  { label: 'Go to Projects', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'View Skills', action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Open GitHub', action: () => window.open('https://github.com/kashyapnasit109/', '_blank') },
  { label: 'Download Resume', action: () => { const a = document.createElement('a'); a.href = '/resume.pdf'; a.download = 'Kashyap_Nasit_Resume.pdf'; a.click(); } },
  { label: 'Contact Kashyap', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, filtered, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center pt-[20vh] px-4 backdrop-blur-sm bg-primary-dark/80"
        >
          <motion.div
            className="fixed inset-0"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-surface border-2 border-white shadow-2xl overflow-hidden z-10"
          >
            {/* Search input */}
            <div className="flex items-center gap-4 px-6 py-5 border-b-2 border-surface-border">
              <FiSearch className="text-white text-xl" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="TYPE A COMMAND..."
                className="flex-1 bg-transparent text-white font-heading font-bold text-xl placeholder-text-muted focus:outline-none uppercase"
              />
              <kbd className="px-2 py-1 bg-primary-dark text-white font-mono text-[10px] uppercase border border-surface-border">
                ESC
              </kbd>
            </div>

            {/* Commands list */}
            <div className="py-2 max-h-[400px] overflow-y-auto">
              {filtered.length === 0 && (
                <p className="px-6 py-8 text-center text-text-muted font-mono text-sm uppercase tracking-widest">No commands found</p>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.label}
                  onClick={() => { cmd.action(); onClose(); }}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors font-mono text-sm uppercase tracking-widest ${
                    i === selectedIndex
                      ? 'bg-accent text-primary-dark'
                      : 'text-text-secondary hover:bg-surface-border hover:text-white'
                  }`}
                >
                  <span>{cmd.label}</span>
                  {i === selectedIndex && <FiArrowRight className="text-lg" />}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
