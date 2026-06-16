import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export type LinkItem = { url: string; label?: string };

export type Project = {
  slug: string;
  title: string;
  year: string;
  shortDescription: string;
  longDescription: string;
  tech: string[];
  images: string[];
  repos?: LinkItem[];
  liveUrls?: LinkItem[];
};

const projects: Project[] = [
  {
    slug: 'notegarden',
    title: 'Notegarden',
    year: '2026',
    shortDescription:
      'A guitar notes memorization app with an adaptive learning algorithm and 4 learning modes.',
    longDescription:
      'A guitar notes memorization app that utilizes an adaptive learning algorithm and 4 different learning modes to help users efficiently memorize the positions of notes on the guitar fretboard. This was a passion project of mine that i built to help me learn and memorize every note on the fretboard, the adaptive algorithm was heavily inspired by the algorithm used by keybr.com which focuses on letter combinations, in my case i adapted it to focus on fret and string combinations.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Caddy'],
    images: [
      '/projects/notegarden/notegarden_home.webp',
      '/projects/notegarden/notegarden_modes.webp',
      '/projects/notegarden/notegarden_recog.webp',
      '/projects/notegarden/notegarden_locate.webp',
      '/projects/notegarden/notegarden_sweep.webp',
      '/projects/notegarden/notegarden_collect.webp',
    ],
    repos: [{ url: 'https://github.com/PatrickA727/Notegarden' }],
    liveUrls: [{ url: 'https://notegardenmusic.com/' }],
  },
  {
    slug: 'inventory-management',
    title: 'Inventory Management System',
    year: '2025',
    shortDescription:
      'An end to end inventory management system for an online shop selling networking components.',
    longDescription:
      `An end to end inventory solution for an online shop that sells networking components, it includes a web app for managing inventory, invoices, and products, it also includes a QR and RFID scanner hooked together with an ESP32 for retrieving product information which will be transmitted to the mobile app via bluetooth.
      This was quite a big project with 2 applications and a custom hardware solution where i worked on the backend and mobile app while my colleague worked on the web frontend and firmware. We worked on the hardware together and decided to use this project as our final year project in university.`,
    tech: ['React.js', 'Golang', 'PostgreSQL', 'ESP32', 'Flutter', 'Docker', 'Nginx'],
    images: [
      '/projects/inventory_mgmt/login.webp',
      '/projects/inventory_mgmt/main.webp',
      '/projects/inventory_mgmt/serialnum.webp',
      '/projects/inventory_mgmt/mobile.webp',
      '/projects/inventory_mgmt/schematic.webp',
    ],
    repos: [
      { url: 'https://github.com/PatrickA727/RFID-mikrotik-db', label: 'Backend code' },
      { url: 'https://github.com/PatrickA727/flutter_inventory', label: 'Mobile app' }
    ],
  },
  {
    slug: 'university-foundation-website',
    title: 'University Scholarship Website',
    year: '2025',
    shortDescription:
      'Created an admin website and marketing web design for a university scholarship foundation.',
    longDescription:
      `Designed the inital figma mockups and UI/UX for the marketing website, and developed the backend and database design for the admin dashboard which included features for managing student and alumni information and status. Also worked with S3 compatible object storage to handle file uploads for student and alumni documents and photos. The frontend was developed by a colleague and deployment was a collaborative effort.`,
    tech: ['React.js', 'Typescript', 'Golang', 'PostgreSQL', 'Docker', 'Nginx', 'Figma'],
    images: [
      '/projects/tskt/home.webp',
      '/projects/tskt/admin_login.webp',
      '/projects/tskt/admin_option.webp',
      '/projects/tskt/input.webp',
      '/projects/tskt/preview.webp',
    ],
    repos: [{ url: 'https://github.com/PatrickA727/trisakti_backend' }],
    liveUrls: [{ url: 'https://www.figma.com/proto/qLycE1fZ3VcBSZlK3Xj2YU/landing?node-id=3-5&p=f&t=uNH3lVYR9iqYPVpw-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A5', label: 'Figma design' }],
  },

    {
    slug: 'offline-document-translator',
    title: 'Offline Document Translator',
    year: '2026',
    shortDescription:
      'Created an offline word and excel document translator utilizing AI translation models that can be run on consumer hardware.',
    longDescription:
      `Designed the inital figma mockups and UI/UX for the marketing website, and developed the backend and database design for the admin dashboard which included features for managing student and alumni information and status. Also worked with S3 compatible object storage to handle file uploads for student and alumni documents and photos. The frontend was developed by a colleague and deployment was a collaborative effort.`,
    tech: ['React.js', 'Typescript', 'Python', 'FastAPI'],
    images: [
      '/projects/translator/home.webp',
      '/projects/translator/lang.webp',
      '/projects/translator/batch-translate.webp',
      '/projects/translator/finished.webp',
    ],
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
    <section className="mx-auto max-w-6xl px-6 py-24">
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
