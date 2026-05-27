export default function Projects() {
  return (
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
  );
}
