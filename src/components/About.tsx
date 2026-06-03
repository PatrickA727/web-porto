export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="section-heading">
        <span className="prompt">&gt;</span> sys://about
      </h2>
      <div className="section-divider" />

      <p className="section-header mb-4 text-xl font-bold">
        Hi I'm Patrick Arthur
      </p>

      <p className="section-body mb-2">
        A software Engineer based in Jakarta, Indonesia specializing in web development and AI-driven applications and solutions. With 3+ years of experience, 
        I build scalable systems, APIs, and intelligent software focused on performance, reliability, and clean architecture.
      </p>

      <p className="section-body mb-8">
        In my free time, I love exploring new technologies and creating personal projects of subjects i am interested in such as music or other fields 
        that piqued my interest at that time. 
      </p>

      <div className="terminal-card">
        <div className="corner-tag">sys://stack</div>
        <div className="kv-grid">
          <span className="kv-key">Languages</span>
          <span className="kv-val">JS/TS, Go, Python, Java</span>
          <span className="kv-key">Databases</span>
          <span className="kv-val">PostgreSQL, MongoDB, MySQL, Firebase</span>
          <span className="kv-key">Deploy</span>
          <span className="kv-val">Docker, NGINX, Caddy, GitHub Actions</span>
          <span className="kv-key">VCS</span>
          <span className="kv-val">GitHub, GitLab, SVN</span>
        </div>
      </div>
    </section>
  );
}
