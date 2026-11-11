import { useEffect, useRef, useState } from 'react';
import { Link, useRoute } from '../lib/router';
import { contact, nav, person } from '../content/site';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons';
import { useTheme } from '../lib/theme';
import { DocButton } from './DocumentViewer';
import styles from './Nav.module.css';

const isCurrent = (path, to) => path === to || path.startsWith(`${to}/`);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { path } = useRoute();
  const [theme, toggleTheme] = useTheme();
  const themeButton = (
    <button
      type="button"
      className={styles.themeButton}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? <SunIcon width="18" height="18" /> : <MoonIcon width="18" height="18" />}
    </button>
  );

  // Close the mobile menu whenever the page changes.
  useEffect(() => setOpen(false), [path]);

  // Reading progress along the bottom edge of the header, and a raised header once the page moves.
  const headerRef = useRef(null);
  const barRef = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      headerRef.current?.toggleAttribute('data-scrolled', doc.scrollTop > 8);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.progress} aria-hidden="true"><span ref={barRef} /></div>
      <div className={`container ${styles.bar}`}>
        <Link to="/" className={styles.brand} aria-label={`${person.name}, home`}>
          <span className={styles.mark} aria-hidden="true">MA</span>
          <span className={styles.brandText}>
            <span>{person.name}</span>
            <span className={styles.brandRole}>{person.title}</span>
          </span>
        </Link>

        <nav aria-label="Main" className={styles.desktop}>
          {nav.map((l) => (
            <Link key={l.to} to={l.to} className={styles.link} aria-current={isCurrent(path, l.to) ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
          {themeButton}
          <DocButton src={contact.resumeLight} title="Résumé" download className={`btn btn-secondary ${styles.resume}`}>
            Résumé
          </DocButton>
        </nav>

        <div className={styles.mobileTools}>{themeButton}</div>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon width="22" height="22" /> : <MenuIcon width="22" height="22" />}
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className={styles.mobile}>
          <div className="container">
            <Link to="/" className={styles.mobileLink} aria-current={path === '/' ? 'page' : undefined} onClick={() => setOpen(false)}>Home</Link>
            {nav.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={styles.mobileLink}
                aria-current={isCurrent(path, l.to) ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <DocButton src={contact.resumeLight} title="Résumé" download className={styles.mobileLink} onClick={() => setOpen(false)}>Résumé</DocButton>
            {person.available && (
              <p className={styles.mobileAvailable}>
                <span className={styles.dot} aria-hidden="true" />
                {person.availability}
              </p>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
