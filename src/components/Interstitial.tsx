/**
 * Transitional "navi" beat between the hero/boot sequence and the page content.
 * Static Lain artwork.
 */
export default function Interstitial() {
  return (
    <section className="interstitial" aria-label="navi">
      <img
        className="interstitial-art"
        src="/assets/the-coolest-removebg.png"
        alt="Lain"
        loading="lazy"
        draggable={false}
      />
    </section>
  );
}
