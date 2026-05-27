import WiredBackground from './components/WiredBackground';
import './App.css';

export default function App() {
  return (
    <>
      <WiredBackground />

      <main className="relative z-10">
        <section className="h-screen" aria-label="Intro" />

        <div className="content-fade">
          {/* About */}
          <section className="mx-auto max-w-3xl px-6 py-24">
            <h2 className="section-heading">
              <span className="prompt">&gt;</span> sys://about
            </h2>
            <div className="section-divider" />

            <p className="section-body mb-8">
              Software engineer focused on building things that feel intentional.
              Drawn to systems that sit at the intersection of design and
              engineering — where the details matter and the craft shows.
            </p>

            <div className="terminal-card">
              <div className="corner-tag">identity</div>
              <div className="kv-grid">
                <span className="kv-key">Identity</span>
                <span className="kv-val">Patrick</span>
                <span className="kv-key">Role</span>
                <span className="kv-val">Software Engineer</span>
                <span className="kv-key">Focus</span>
                <span className="kv-val">Full-Stack &middot; Systems &middot; UI</span>
                <span className="kv-key">Status</span>
                <span className="kv-val kv-online">AVAILABLE</span>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="mx-auto max-w-5xl px-6 py-24">
            <h2 className="section-heading">
              <span className="prompt">&gt;</span> data://projects
            </h2>
            <div className="section-divider" />

            <div className="project-grid">
              <article className="terminal-card project-card">
                <div className="corner-tag">01</div>
                <h3 className="project-title">Project Name</h3>
                <p className="project-desc">
                  Brief description of what this project does and why it matters.
                  Replace with real content.
                </p>
                <div className="project-tech">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>Node.js</span>
                </div>
              </article>

              <article className="terminal-card project-card">
                <div className="corner-tag">02</div>
                <h3 className="project-title">Project Name</h3>
                <p className="project-desc">
                  Brief description of what this project does and why it matters.
                  Replace with real content.
                </p>
                <div className="project-tech">
                  <span>Python</span>
                  <span>PostgreSQL</span>
                  <span>Docker</span>
                </div>
              </article>

              <article className="terminal-card project-card">
                <div className="corner-tag">03</div>
                <h3 className="project-title">Project Name</h3>
                <p className="project-desc">
                  Brief description of what this project does and why it matters.
                  Replace with real content.
                </p>
                <div className="project-tech">
                  <span>Rust</span>
                  <span>WebAssembly</span>
                </div>
              </article>
            </div>
          </section>

          {/* Contact */}
          <section className="mx-auto max-w-3xl px-6 py-24 pb-32">
            <h2 className="section-heading">
              <span className="prompt">&gt;</span> navi://connect
            </h2>
            <div className="section-divider" />

            <p className="section-body mb-8">
              Open to opportunities, collaborations, or just talking shop.
            </p>

            <div className="terminal-card">
              <div className="corner-tag">routes</div>
              <div className="kv-grid">
                <span className="kv-key">Email</span>
                <a href="mailto:patrick.a7787@gmail.com" className="kv-val kv-link">
                  patrick.a7787@gmail.com
                </a>
                <span className="kv-key">GitHub</span>
                <a href="#" className="kv-val kv-link">github.com/username</a>
                <span className="kv-key">LinkedIn</span>
                <a href="#" className="kv-val kv-link">linkedin.com/in/username</a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
