import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Collaboration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="relative py-32 border-t border-surface-border bg-accent text-primary-dark" ref={ref}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-6">
              LET'S BUILD <br /> SOMETHING <br /> REAL.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border-l-2 border-primary-dark pl-8 py-4"
          >
            <p className="font-sans text-lg md:text-xl font-medium leading-relaxed mb-8">
              I am open to internships, collaborative technical projects, research-based learning opportunities, and practical software development work.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Internships', 'Collaborative Projects', 'Research', 'Software Development'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-primary-dark text-accent font-mono text-xs uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
