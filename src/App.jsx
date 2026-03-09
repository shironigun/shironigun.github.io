import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import theme from './theme/theme';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Tools from './components/Tools';
import Experience from './components/Experience';
import Products from './components/Products';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import CaseStudies from './components/CaseStudies';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import Articles from './components/Articles';

import Resume from './components/Resume';
import Connect from './components/Connect';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  return (
    <>
      <div className="skip-link" style={{ position: 'absolute', left: '-999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        <a href="#home" onFocus={e => { e.target.parentNode.style.position = 'static'; e.target.parentNode.style.left = '0'; e.target.parentNode.style.width = 'auto'; e.target.parentNode.style.height = 'auto'; }}>Skip to main content</a>
      </div>
      <ThemeProvider theme={theme} defaultMode="dark">
        <InitColorSchemeScript defaultMode="dark" />
        <CssBaseline />
        <ThemeToggle />
        <CustomCursor />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Tools />
        <Experience />
        <Products />
        <Certifications />
        <Projects />
        <CaseStudies />
        <Achievements />
        <Testimonials />
        <Articles />
        <Resume />
        <Connect />
        <Footer />
      </ThemeProvider>
    </>
  );
}
