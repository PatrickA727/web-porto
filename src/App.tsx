import WiredBackground from './components/WiredBackground';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

export default function App() {
  return (
    <>
      <WiredBackground />

      <main className="relative z-10">
        <section className="h-screen" aria-label="Intro" />

        <div className="content-fade">
          <About />
          <Projects />
          <Contact />
        </div>
      </main>
    </>
  );
}
