import { useEffect, useState } from 'react';

// Light or dark, set as data-theme on <html>. An inline script in index.html applies it before
// the first paint: the saved choice, or the system setting on a first visit. Until the visitor
// chooses, the site follows the system setting as it changes.

const KEY = 'theme';
const COLORS = { light: '#FAFAF7', dark: '#0F1115' };

export const currentTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

function apply(theme, save) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[theme]);
  if (save) {
    try { localStorage.setItem(KEY, theme); } catch { /* storage blocked: the choice lasts this visit */ }
  }
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

export function useTheme() {
  const [theme, setTheme] = useState(currentTheme);
  useEffect(() => {
    const onChange = () => setTheme(currentTheme());
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystem = (e) => {
      let saved = null;
      try { saved = localStorage.getItem(KEY); } catch { /* ignore */ }
      if (!saved) apply(e.matches ? 'dark' : 'light', false);
    };
    window.addEventListener('themechange', onChange);
    media.addEventListener('change', onSystem);
    return () => {
      window.removeEventListener('themechange', onChange);
      media.removeEventListener('change', onSystem);
    };
  }, []);
  return [theme, () => apply(theme === 'dark' ? 'light' : 'dark', true)];
}
