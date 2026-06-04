import type { Project } from './Projects';

interface Props {
  project: Project;
  onOpen: (slug: string) => void;
}

export default function ProjectCard({ project, onOpen }: Props) {
  return (
    <button
      type="button"
      className="terminal-card project-card"
      onClick={() => onOpen(project.slug)}
    >
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.shortDescription}</p>
      <div className="project-tech">
        {project.tech.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </button>
  );
}
