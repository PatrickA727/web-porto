import WiredBackground from './components/WiredBackground';

/**
 * The WiredBackground is position:fixed at z-index -1, so it stays put while
 * your page content scrolls over it. Drop your sections below the hero spacer.
 *
 * Tailwind handles the structural/content layout here; the bespoke Wired
 * visuals live in WiredBackground.css.
 */
export default function App() {
  return (
    <>
      <WiredBackground />

      <main className="relative z-10">
        {/* Hero: full viewport so the login sits centered and alone first */}
        <section className="h-screen" aria-label="Intro" />

      </main>
    </>
  );
}
