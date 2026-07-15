import { motion } from 'framer-motion';
import { BiCommand } from 'react-icons/bi';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#projects' },
  { name: 'Expertise', href: '#skills' },
  { name: 'Contact', href: '#contact' },
  { name: 'Resume', href: '/resume.pdf', download: 'Kashyap_Nasit_Resume.pdf' },
];

export default function Navbar({ onCommandPalette }) {
  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-6 mix-blend-difference"
    >
      <div className="flex items-center justify-between">
        {/* Brand */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-heading font-bold text-2xl tracking-tighter uppercase text-white"
        >
          Kashyap <br /> <span className="text-accent">Nasit</span>
        </a>

        {/* Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => link.href.startsWith('#') ? handleClick(e, link.href) : null}
              target={link.href.startsWith('#') ? '_self' : (link.download ? '_self' : '_blank')}
              download={link.download}
              rel={link.href.startsWith('#') ? '' : 'noopener noreferrer'}
              className="font-mono text-xs uppercase tracking-widest text-white/80 hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Command Palette Hint */}
        <button
          onClick={onCommandPalette}
          className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-white/80 hover:text-primary-dark hover:bg-accent hover:border-accent transition-colors duration-300 font-mono text-xs uppercase tracking-widest"
        >
          <BiCommand className="text-base" />
          <span className="hidden sm:inline">Menu</span>
        </button>
      </div>
    </motion.nav>
  );
}
