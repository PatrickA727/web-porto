import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export type Project = {
  slug: string;
  title: string;
  year: string;
  shortDescription: string;
  longDescription: string;
  tech: string[];
  images: string[];
  repo?: string;
  liveUrl?: string;
};

const projects: Project[] = [
  {
    slug: 'notegarden',
    title: 'Notegarden',
    year: '2026',
    shortDescription:
      'A guitar notes memorization app that utilizes an adaptive learning algorithm and 4 learning modes.',
    longDescription:
      'A guitar notes memorization app that utilizes an adaptive learning algorithm and 4 different learning modes to help users efficiently memorize the positions of notes on the guitar fretboard.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Caddy'],
    images: [
      '/projects/notegarden/notegarden_home.png',
      '/projects/notegarden/notegarden_modes.png',
      '/projects/notegarden/notegarden_recog.png',
      '/projects/notegarden/notegarden_locate.png',
      '/projects/notegarden/notegarden_sweep.png',
      '/projects/notegarden/notegarden_collect.png',
    ],
    repo: 'https://github.com/PatrickA727/Notegarden',
    liveUrl: 'https://notegardenmusic.com/',
  },
  {
    slug: 'project-two',
    title: 'Project Name',
    year: '2024',
    shortDescription:
      'Brief description of what this project does and why it matters. Replace with real content.',
    longDescription:
      'Longer write-up about the project — the problem it solves, what you built, the architectural decisions, and anything notable about the implementation. Replace with real content.',
    tech: ['Python', 'PostgreSQL', 'Docker'],
    images: [],
  },
  {
    slug: 'project-three',
    title: 'Project Name',
    year: '2023',
    shortDescription:
      'Brief description of what this project does and why it matters. Replace with real content.',
    longDescription:
      'Longer write-up about the project — the problem it solves, what you built, the architectural decisions, and anything notable about the implementation. Replace with real content.',
    tech: ['Rust', 'WebAssembly'],
    images: [],
  },
];

function parseHash(): string | null {
  const m = window.location.hash.match(/^#project\/(.+)$/);
  return m ? m[1] : null;
}

export default function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const slug = parseHash();
      setOpenSlug(slug && projects.some((p) => p.slug === slug) ? slug : null);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const openProject = (slug: string) => {
    window.location.hash = `project/${slug}`;
  };

  const closeProject = () => {
    history.pushState(null, '', window.location.pathname + window.location.search);
    setOpenSlug(null);
  };

  const active = openSlug ? projects.find((p) => p.slug === openSlug) ?? null : null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="section-heading">
        <span className="prompt">&gt;</span> data://projects
      </h2>
      <div className="section-divider" />

      <div className="project-grid">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={openProject} />
        ))}
      </div>

      {active && <ProjectModal project={active} onClose={closeProject} />}
    </section>
  );
}
