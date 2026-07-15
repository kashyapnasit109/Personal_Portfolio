import { FiArrowUpRight, FiGithub } from 'react-icons/fi';

export default function ProjectCard({ project, onClick, index }) {
  // Use index to create a slight varied background color for brutalist checkerboard effect
  const isAlt = index % 2 === 0;

  return (
    <div 
      onClick={onClick}
      className={`group relative h-full flex flex-col p-8 border border-surface-border cursor-pointer overflow-hidden transition-all duration-500 hover:border-accent ${isAlt ? 'bg-surface' : 'bg-primary-dark'}`}
    >
      {/* Brutalist Reveal Background */}
      <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>

      <div className="relative z-10 flex flex-col h-full group-hover:text-primary-dark transition-colors duration-500">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div className={`chip transition-colors duration-500 ${isAlt ? 'bg-primary-darker' : 'bg-surface'} group-hover:bg-primary-dark group-hover:text-accent group-hover:border-primary-dark`}>
            {project.category}
          </div>
          <div className="w-10 h-10 flex items-center justify-center border border-surface-border rounded-full group-hover:border-primary-dark group-hover:bg-primary-dark transition-colors duration-500">
            <FiArrowUpRight className="text-text-secondary group-hover:text-accent transition-colors" />
          </div>
        </div>

        {/* Content */}
        <div className="mt-auto">
          <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-white group-hover:text-primary-dark mb-4 transition-colors">
            {project.title}
          </h3>
          <p className="font-sans text-sm font-light text-text-secondary group-hover:text-primary-darker leading-relaxed mb-8 transition-colors line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-surface-border group-hover:border-primary-dark/20 transition-colors">
          <div className="flex gap-2">
            {project.techStack.slice(0, 2).map((tech) => (
              <span key={tech} className="font-mono text-[10px] uppercase text-text-muted group-hover:text-primary-darker transition-colors">
                {tech}
              </span>
            ))}
            {project.techStack.length > 2 && (
              <span className="font-mono text-[10px] uppercase text-text-muted group-hover:text-primary-darker transition-colors">
                +{project.techStack.length - 2}
              </span>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              if (project.githubUrl) {
                e.stopPropagation();
                window.open(project.githubUrl, '_blank');
              }
            }}
            className="text-text-muted hover:text-white group-hover:text-primary-darker transition-colors"
          >
            <FiGithub size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
