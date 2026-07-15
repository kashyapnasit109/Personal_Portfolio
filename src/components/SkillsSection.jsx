import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillGroups } from '../data/skills';

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="skills" className="relative py-32 border-t border-surface-border bg-primary-dark" ref={ref}>
      <div className="container-custom">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">Technical Mastery</span>
          </div>
          <h2 className="heading-section text-white mb-6">
            Skills & <span className="text-surface-border stroke-text" style={{ WebkitTextStroke: '1px #A1A1AA', color: 'transparent' }}>Expertise.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-surface-border border border-surface-border">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="bg-primary-dark p-8 md:p-10 group hover:bg-surface transition-colors duration-500"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-12">
                <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
                  {group.title}
                </h3>
                <span className="font-mono text-xs text-accent">0{gi + 1}</span>
              </div>

              {/* Description */}
              <p className="text-sm font-sans font-light text-text-secondary leading-relaxed mb-8 h-16">
                {group.description}
              </p>

              {/* Skills Data-Vis */}
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <div key={skill.name} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-white uppercase tracking-wider">{skill.name}</span>
                      <span className="font-mono text-[10px] text-text-muted">{skill.level}%</span>
                    </div>
                    {/* Brutalist Progress Bar */}
                    <div className="w-full h-1 bg-surface-border relative overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.3 + (gi * 0.1) + (si * 0.1), ease: "circOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
