export default function Contact() {
  return (
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
  );
}
