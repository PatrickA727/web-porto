export default function Contact() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 pb-32">
      <h2 className="section-heading">
        <span className="prompt">&gt;</span> navi://connect
      </h2>
      <div className="section-divider" />

      <p className="section-body mb-8">
        Always open to opportunities, collaborations, or just open discussions.
      </p>

      <div className="terminal-card">
        <div className="corner-tag">routes</div>
        <div className="kv-grid">
          <span className="kv-key">Email</span>
          <a href="mailto:patrick.a7787@gmail.com" className="kv-val kv-link">
            patrick.a7787@gmail.com
          </a>
          <span className="kv-key">GitHub</span>
          <a
            href="https://github.com/PatrickA727"
            target="_blank"
            rel="noreferrer noopener"
            className="kv-val kv-link"
          >
            PatrickA727
          </a>
          <span className="kv-key">LinkedIn</span>
          <a
            href="https://linkedin.com/in/patrick-arthur-sahalaraja-0b1330237"
            target="_blank"
            rel="noreferrer noopener"
            className="kv-val kv-link"
          >
            Patrick Arthur Sahalaraja
          </a>
        </div>
      </div>
    </section>
  );
}
