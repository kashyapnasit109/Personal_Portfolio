import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function FeaturedProject({ project, onViewDetails }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  if (!project) return null;

  return (
    <section className="relative py-32 border-t border-surface-border bg-primary-dark" ref={ref}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-2 h-2 bg-accent animate-pulse rounded-full"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted">Currently Building</span>
            </div>
            <h2 className="heading-section text-white mb-0">
              Flagship <br /> <span className="text-surface-border stroke-text" style={{ WebkitTextStroke: '1px #A1A1AA', color: 'transparent' }}>Project.</span>
            </h2>
          </div>
          
          <button onClick={onViewDetails} className="btn-outline flex-shrink-0 group">
            Full Case Study
            <FiArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Massive Featured Area */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full border border-surface-border bg-primary-darker overflow-hidden"
        >
          {/* Accent Background Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-accent"></div>

          <div className="grid lg:grid-cols-12 gap-0">
            
            {/* Project Details (Left) */}
            <div className="lg:col-span-5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-surface-border flex flex-col justify-between relative z-10 bg-primary-darker">
              <div>
                <div className="chip mb-8 text-accent border-accent/30">{project.category}</div>
                <h3 className="font-heading font-black text-4xl md:text-5xl text-white uppercase leading-none tracking-tight mb-4">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-8 border-b border-surface-border pb-8">
                  {project.subtitle}
                </p>

                <div className="space-y-4 text-text-secondary text-sm font-light leading-relaxed">
                  <p>
                    A personalized business management and monitoring platform for a construction firm, converting daily site updates, material usage, transactions, and work progress into an intelligent queryable system.
                  </p>
                  <p>
                    Uses an AI chat-based interface where daily reports are queried. Example: <br/>
                    <span className="font-mono text-white/80 bg-surface px-2 py-1 mt-2 inline-block text-[11px]">
                      &gt; "How much material was used on site X this week?"
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-3">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-surface border border-surface-border text-xs text-text-secondary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture / Visuals (Right) */}
            <div className="lg:col-span-7 relative bg-surface p-8 md:p-12 overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
              {/* Background Blueprint Grid */}
              <div className="bg-grid absolute inset-0 opacity-20 pointer-events-none"></div>
              
              <div className="relative z-10 w-full max-w-lg">
                <div className="font-mono text-xs text-accent uppercase tracking-widest mb-8 text-center bg-primary-darker/80 backdrop-blur-sm border border-surface-border py-2 px-4 inline-block mx-auto">
                  System Architecture Flow
                </div>

                <div className="space-y-4 w-full">
                  {project.architecture.nodes.map((node, i) => (
                    <div key={i} className="flex items-center group">
                      <div className="w-12 h-12 bg-primary-dark border border-surface-border flex items-center justify-center font-mono text-xs text-text-muted group-hover:border-accent group-hover:text-accent transition-colors">
                        0{i+1}
                      </div>
                      <div className="flex-1 bg-primary-darker border border-surface-border p-4 ml-4 font-mono text-xs text-white uppercase tracking-widest group-hover:bg-accent group-hover:text-primary-dark transition-colors">
                        {node}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
