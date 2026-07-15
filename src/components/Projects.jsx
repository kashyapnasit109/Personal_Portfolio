import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects, categories } from '../data/projects';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const filteredProjects = projects.filter(
    (p) => filter === 'All' || p.category === filter
  );

  return (
    <section id="projects" className="relative py-32 border-t border-surface-border bg-primary-darker" ref={ref}>
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted">Projects</span>
            </div>
            <h2 className="heading-section text-white mb-0">
              Technical <br /> <span className="text-surface-border stroke-text" style={{ WebkitTextStroke: '1px #A1A1AA', color: 'transparent' }}>Archive.</span>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-mono text-[10px] uppercase tracking-widest px-4 py-2 border transition-colors ${
                  filter === cat
                    ? 'bg-text-primary text-primary-dark border-text-primary'
                    : 'bg-surface border-surface-border text-text-muted hover:text-white hover:border-text-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-1"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
