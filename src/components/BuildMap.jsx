import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { timelineData } from '../data/timeline';

export default function BuildMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="buildmap" className="relative py-32 border-t border-surface-border bg-primary-dark" ref={ref}>
      <div className="container-custom">
        <div className="mb-20 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">Journey</span>
          </div>
          <h2 className="heading-section text-white mb-6">
            Build <span className="text-surface-border stroke-text" style={{ WebkitTextStroke: '1px #A1A1AA', color: 'transparent' }}>Map.</span>
          </h2>
          <p className="font-mono text-xs text-text-secondary max-w-xl mx-auto md:mx-0 uppercase tracking-widest leading-relaxed">
            My technical evolution mapped like an architectural blueprint. <br />
            Every semester represents a new structural layer.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Architectural Center Line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px bg-surface-border md:-translate-x-1/2">
            <div className="absolute top-0 bottom-0 left-0 w-full bg-accent scale-y-0 origin-top transition-transform duration-1000" style={{ transform: isInView ? 'scaleY(1)' : 'scaleY(0)' }}></div>
          </div>

          <div className="space-y-16 md:space-y-24">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.year + item.label}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-primary-dark border-2 border-accent z-10 rounded-none shadow-[0_0_0_8px_#050505]">
                    <span className="font-mono text-[10px] text-white uppercase">{item.year.substring(2)}</span>
                  </div>

                  {/* Content Box */}
                  <div className={`w-full pl-16 md:pl-0 md:w-[45%] ${
                    isEven ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'
                  }`}>
                    <div className="editorial-card group hover:bg-surface-border">
                      <div className={`flex flex-col gap-2 mb-4 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                        <span className="font-heading font-black text-4xl text-white">{item.year}</span>
                        <span className="chip text-accent border-accent/30">{item.semester}</span>
                      </div>
                      
                      <h3 className="font-sans font-bold text-lg text-white mb-3 uppercase tracking-tight">
                        {item.label}
                      </h3>
                      
                      <p className="font-sans text-sm text-text-secondary leading-relaxed mb-6 font-light">
                        {item.description}
                      </p>

                      <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        {item.projects?.map((t) => (
                          <span key={t} className="font-mono text-[10px] text-text-muted uppercase border border-surface-border px-2 py-1 bg-primary-darker">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
