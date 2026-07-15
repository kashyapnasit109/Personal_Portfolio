import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';

const repos = [
  {
    name: 'DOQ_KB',
    description: 'Document Intelligence Model for Immersively Introspecting Kashyap Builders',
    language: 'TypeScript',
    url: 'https://github.com/kashyapnasit109/DOQ_KB',
    featured: true,
  },
  {
    name: 'forage-midas',
    description: 'JPMC Advanced Software Engineering Forage program project',
    language: 'Java',
    url: 'https://github.com/kashyapnasit109/forage-midas',
    featured: false,
  },
  {
    name: 'kashyap-portfolio',
    description: 'Immersive personal portfolio — this website',
    language: 'React',
    url: 'https://github.com/kashyapnasit109/',
    featured: false,
  },
  {
    name: 'nexus-command-tracker',
    description: 'OCR-powered attendance intelligence platform',
    language: 'JavaScript',
    url: 'https://github.com/kashyapnasit109/',
    featured: false,
  },
];

export default function GitHubPresence() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="github" className="relative py-32 border-t border-surface-border bg-primary-dark" ref={ref}>
      <div className="container-custom">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">Open Source</span>
          </div>
          <h2 className="heading-section text-white mb-6">
            Public <span className="text-surface-border stroke-text" style={{ WebkitTextStroke: '1px #A1A1AA', color: 'transparent' }}>Code.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* GitHub Profile (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4"
          >
            <div className="editorial-card h-full bg-surface">
              <FiGithub className="text-5xl text-white mb-8" />
              <h3 className="font-heading font-black text-3xl uppercase tracking-tight text-white mb-2">kashyapnasit109</h3>
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-6 border-b border-surface-border pb-6">Kashyap Nasit</p>
              <p className="text-sm font-sans font-light text-text-secondary leading-relaxed mb-8">
                Building in public, learning through contribution, and maintaining clean, documented repositories.
              </p>
              <a
                href="https://github.com/kashyapnasit109/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full"
              >
                View Profile <FiExternalLink className="ml-2" />
              </a>
            </div>
          </motion.div>

          {/* Repositories (Right) */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group block border border-surface-border bg-primary-dark p-6 md:p-8 hover:border-accent transition-colors"
              >
                <div className="flex justify-between items-start mb-6">
                  <h4 className="font-mono text-sm text-white group-hover:text-accent transition-colors">
                    {repo.name}
                  </h4>
                  {repo.featured && <FiStar className="text-accent" />}
                </div>
                <p className="text-sm font-sans font-light text-text-secondary leading-relaxed mb-8 h-10 line-clamp-2">
                  {repo.description}
                </p>
                <div className="flex items-center gap-2 border-t border-surface-border pt-4">
                  <span className="w-2 h-2 bg-text-secondary group-hover:bg-accent transition-colors"></span>
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">{repo.language}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
