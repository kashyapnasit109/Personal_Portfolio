import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-md bg-primary-dark/90"
        >
          {/* Backdrop click target */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-surface border-2 border-surface-border shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex-shrink-0 p-6 md:p-8 border-b-2 border-surface-border bg-primary-dark relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="chip bg-primary-darker text-white border-surface-border">
                      {project.category}
                    </span>
                    <span
                      className={`chip ${
                        project.status === 'In Progress'
                          ? 'border-accent text-accent'
                          : 'border-white text-white'
                      }`}
                    >
                      {project.status}
                    </span>
                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                      {project.semester}
                    </span>
                  </div>
                  <h2 className="font-heading font-black text-3xl md:text-5xl text-white uppercase tracking-tight leading-none mb-2">
                    {project.title}
                  </h2>
                  <p className="font-mono text-xs text-text-secondary uppercase tracking-widest">{project.subtitle}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 bg-surface border border-surface-border text-white hover:bg-accent hover:text-primary-dark transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-12 bg-primary-darker">
              
              <div className="grid md:grid-cols-2 gap-12">
                {/* Problem */}
                <div>
                  <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4 border-b border-surface-border pb-2">
                    Problem
                  </h3>
                  <p className="text-text-secondary font-sans font-light text-sm leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Approach */}
                <div>
                  <h3 className="font-mono text-xs text-white uppercase tracking-widest mb-4 border-b border-surface-border pb-2">
                    Approach
                  </h3>
                  <p className="text-text-secondary font-sans font-light text-sm leading-relaxed">
                    {project.approach}
                  </p>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h3 className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">
                  Deep Dive
                </h3>
                <div className="space-y-4">
                  {project.description.split('\n\n').map((para, i) => (
                    <p key={i} className="text-white font-sans font-light text-base leading-relaxed border-l-2 border-surface-border pl-4">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Architecture Diagram */}
              {project.architecture && (
                <div>
                  <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
                    Architecture Flow
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 p-6 border border-surface-border bg-surface">
                    {project.architecture.nodes.map((node, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-primary-dark border border-surface-border font-mono text-[10px] text-white uppercase tracking-widest">
                          {node}
                        </div>
                        {i < project.architecture.nodes.length - 1 && (
                          <FiArrowRight className="text-accent" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack & Highlights */}
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border border-surface-border text-white bg-primary-dark"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">
                    Key Highlights
                  </h3>
                  <div className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-1 h-1 bg-accent mt-2 flex-shrink-0"></span>
                        <span className="text-sm font-sans font-light text-text-secondary">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="flex-shrink-0 p-6 md:p-8 border-t-2 border-surface-border bg-primary-dark flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex items-center gap-2"
                >
                  <FiGithub className="text-lg" />
                  View Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent flex items-center gap-2"
                >
                  <FiExternalLink className="text-lg" />
                  Live System
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
