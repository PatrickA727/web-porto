export default function Interstitial() {
  return (
    <section className="interstitial" aria-label="navi">
      <img
        className="interstitial-art"
        src="/assets/the-coolest-removebg-up.png"
        alt="Lain"
        loading="lazy"
        draggable={false}
      />
      <p className="interstitial-quote">
        &ldquo;No matter where you are, everyone&rsquo;s connected.&rdquo;
      </p>
    </section>
  );
}
