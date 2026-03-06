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

export default function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="dark">
      <InitColorSchemeScript defaultMode="dark" />
      <CssBaseline />
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
  );
}
