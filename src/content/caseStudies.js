import { useEffect, useState } from 'react';

// Case studies, written as articles. One file per case study in ./case-studies, named by the
// project's slug; the project record (name, role, dates, status) stays in projects.js.
//
// Each file exports { body, documents?, documentsNote?, updated? }. The body blocks are listed in
// components/ArticleBody.jsx. `documents` render at the top of the article, before the story:
//   { title, meta, href, action, primary? }
//
// Facts only from the project record (docs/content/about-mahmood.md). Product voice: Mahmood
// decides, specifies and reviews; AI agents write the code under his direction.
//
// Every case study is its own chunk, loaded when someone opens it (or a board card that shows it),
// so the first page a visitor sees doesn't carry every story on the site. A loaded study is kept,
// so going back to it is instant.

const loaders = Object.fromEntries(
  Object.entries(import.meta.glob('./case-studies/*.js')).map(([path, load]) => [path.split('/').pop().replace(/\.js$/, ''), load]),
);
const loaded = new Map();
const pending = new Map();
const failed = new Set();

export const hasStudy = (slug) => Boolean(loaders[slug]);

export function loadStudy(slug) {
  if (!loaders[slug]) return Promise.resolve(null);
  if (loaded.has(slug)) return Promise.resolve(loaded.get(slug));
  if (!pending.has(slug)) {
    failed.delete(slug);
    pending.set(slug, loaders[slug]()
      .then((m) => { loaded.set(slug, m.default); return m.default; })
      .catch((err) => { failed.add(slug); throw err; })
      .finally(() => pending.delete(slug)));
  }
  return pending.get(slug);
}

// The study for one slug: undefined until it arrives. Pass null to load nothing.
export function useStudy(slug) {
  const [, rerender] = useState(0);
  useEffect(() => {
    if (!slug || loaded.has(slug) || !loaders[slug]) return undefined;
    let live = true;
    const done = () => { if (live) rerender((n) => n + 1); };
    loadStudy(slug).then(done, done);
    return () => { live = false; };
  }, [slug]);
  return {
    study: slug ? loaded.get(slug) : undefined,
    loading: Boolean(slug && loaders[slug] && !loaded.has(slug) && !failed.has(slug)),
    failed: Boolean(slug && failed.has(slug)),
  };
}
