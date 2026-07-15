import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="about" className="relative py-32 border-t border-surface-border bg-primary-darker overflow-hidden" ref={ref}>
      
      {/* Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-heading font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        MINDSET
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Big Statement */}
          <motion.div style={{ y: y1 }} className="lg:col-span-5">
            <h2 className="heading-section text-white mb-6">
              Not Just <br />
              <span className="text-surface-border stroke-text" style={{ WebkitTextStroke: '1px #A1A1AA', color: 'transparent' }}>Syntax.</span>
            </h2>
            <div className="w-16 h-1 bg-accent mb-8"></div>
            <p className="font-mono text-sm text-text-secondary leading-relaxed uppercase tracking-widest border-l border-accent pl-6 py-2">
              Semester 4 / Focus: Systems, Algorithms, & Intelligent Apps.
            </p>
          </motion.div>

          {/* Right Column: Detailed Editorial Text */}
          <motion.div style={{ y: y2 }} className="lg:col-span-7">
            <div className="editorial-card relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150"></div>
              
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-surface-border">
                <span className="text-5xl font-heading font-bold text-white">01</span>
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest">Philosophy</span>
              </div>
              
              <div className="space-y-6 text-text-secondary text-base leading-relaxed font-sans font-light">
                <p>
                  I am actively building a strong foundation in <span className="text-white font-medium">software development, data structures, algorithms, database systems,</span> and intelligent application design. 
                </p>
                <p>
                  My learning approach is not limited to syntax or tools; I focus on understanding how systems behave, how data flows, how algorithms make decisions, and how technology can be shaped into meaningful real-world solutions.
                </p>
                <p className="pt-4 border-t border-surface-border border-dashed">
                  I am especially interested in building applications where <span className="text-accent">structured logic, clean interfaces, and intelligent automation</span> come together to reduce manual effort and improve decision-making.
                </p>
              </div>

              {/* Data points */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-surface-border">
                {[
                  { l: 'LANGUAGES', v: 'Java, C++, JS' },
                  { l: 'FRONTEND', v: 'React.js' },
                  { l: 'DATA', v: 'NoSQL, SQL' },
                  { l: 'CORE', v: 'DSA, DAA' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="font-mono text-[10px] text-text-muted mb-1">{stat.l}</div>
                    <div className="font-sans text-sm font-semibold text-white">{stat.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
