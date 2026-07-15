import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import BuildMap from './components/BuildMap';
import FeaturedProject from './components/FeaturedProject';
import Projects from './components/Projects';
import SkillsSection from './components/SkillsSection';
import AlgorithmSection from './components/AlgorithmSection';
import GitHubPresence from './components/GitHubPresence';
import Collaboration from './components/Collaboration';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import AIAssistant from './components/AIAssistant';
import ProjectModal from './components/ProjectModal';
import { projects } from './data/projects';

function App() {
  const [loading, setLoading] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [featuredModalOpen, setFeaturedModalOpen] = useState(false);

  const featuredProject = projects.find((p) => p.featured);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    let lenis;
    const initLenis = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (e) {
        console.log('Lenis not available, using native scroll');
      }
    };

    if (!loading) {
      initLenis();
    }

    return () => {
      lenis?.destroy();
    };
  }, [loading]);

  // Ctrl+K command palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="relative">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Loader */}
      <AnimatePresence>
        {loading && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {/* Main content */}
      {!loading && (
        <>
          <Navbar onCommandPalette={() => setCommandPaletteOpen(true)} />

          <main>
            <Hero />
            <About />
            <BuildMap />
            <FeaturedProject
              project={featuredProject}
              onViewDetails={() => setFeaturedModalOpen(true)}
            />
            <Projects />
            <SkillsSection />
            <AlgorithmSection />
            <GitHubPresence />
            <Collaboration />
            <Contact />
          </main>

          <Footer />

          {/* Floating components */}
          <AIAssistant />

          {/* Command Palette */}
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
          />

          {/* Featured project modal */}
          <ProjectModal
            project={featuredProject}
            isOpen={featuredModalOpen}
            onClose={() => setFeaturedModalOpen(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;
