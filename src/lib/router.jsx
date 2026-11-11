import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';

// A tiny history-API router. GitHub Pages serves 404.html (a copy of index.html)
// for deep links, so every route renders from the same bundle.

const RouterContext = createContext({ path: '/', hash: '', navigate: () => {} });

// Pages that moved. An old address is replaced with the new one, keeping its hash.
const MOVED = { '/work': '/projects', '/achievements': '/journey' };

function readLocation() {
  let path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (MOVED[path]) {
    path = MOVED[path];
    window.history.replaceState(window.history.state, '', path + window.location.search + window.location.hash);
  }
  return { path, hash: window.location.hash, smooth: false };
}

// A new page jumps straight to its target; a link within the same page glides,
// unless the visitor prefers reduced motion.
function scrollToHash(hash, smooth) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = smooth && !reduce ? 'smooth' : 'instant';
  if (!hash) {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (el) el.scrollIntoView({ block: 'start', behavior });
}

export function Router({ children }) {
  const [loc, setLoc] = useState(readLocation);

  useEffect(() => {
    const onPop = () => setLoc(readLocation());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // After each navigation, land on the hash target or the top of the page,
  // before the browser paints the new page at the old scroll position.
  useLayoutEffect(() => {
    scrollToHash(loc.hash, loc.smooth);
  }, [loc]);

  const navigate = useCallback((to) => {
    const url = new URL(to, window.location.origin);
    const trimmed = url.pathname.replace(/\/+$/, '') || '/';
    const path = MOVED[trimmed] || trimmed;
    url.pathname = path;
    const samePage = path === (window.location.pathname.replace(/\/+$/, '') || '/');
    const next = url.pathname + url.hash;
    if (next !== window.location.pathname + window.location.hash) {
      window.history.pushState({}, '', next);
    }
    setLoc({ path, hash: url.hash, smooth: samePage });
  }, []);

  return (
    <RouterContext.Provider value={{ ...loc, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRoute() {
  return useContext(RouterContext);
}

export function Link({ to, onClick, children, ...rest }) {
  const { navigate } = useRoute();
  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
