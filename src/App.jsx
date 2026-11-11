import { Router, useRoute } from './lib/router';
import { useScrollReveal } from './lib/reveal';
import { ViewerProvider } from './components/DocumentViewer';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CtaBand from './components/CtaBand';
import RopeAgent from './components/RopeAgent';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Project from './pages/Project';
import About from './pages/About';
import Journey from './pages/Journey';
import HowIWork from './pages/HowIWork';
import CaseStudies from './pages/CaseStudies';
import Article from './pages/Article';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function Routes() {
  const { path } = useRoute();

  if (path === '/') return <Home />;
  if (path === '/projects') return <Projects />;
  if (path === '/about') return <About />;
  if (path === '/journey') return <Journey />;
  if (path === '/how-i-work') return <HowIWork />;
  if (path === '/case-studies' || path === '/writing') return <CaseStudies />;
  if (path === '/contact') return <Contact />;

  // Case studies moved from /work/:slug; the old links still open them.
  const study = path.match(/^\/(?:case-studies|work)\/([\w-]+)$/);
  if (study) return <Project key={study[1]} slug={study[1]} />;

  const writing = path.match(/^\/writing\/([\w-]+)$/);
  if (writing) return <Article key={writing[1]} slug={writing[1]} />;

  return <NotFound />;
}

function Shell() {
  const { path } = useRoute();
  useScrollReveal(path);
  return (
    <ViewerProvider>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Nav />
      <RopeAgent />
      <main id="main" tabIndex={-1} className={path === '/' ? 'is-home' : 'is-inner'}>
        <Routes />
      </main>
      {path !== '/contact' && <CtaBand />}
      <Footer />
    </ViewerProvider>
  );
}

export default function App() {
  return (
    <Router>
      <Shell />
    </Router>
  );
}
