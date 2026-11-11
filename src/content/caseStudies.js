// Case studies, written as articles. One file per case study in ./case-studies, named by the
// project's slug; the project record (name, role, dates, status) stays in projects.js.
//
// Each file exports { body, documents?, documentsNote? }. The body blocks are listed in
// components/ArticleBody.jsx. `documents` render at the top of the article, before the story:
//   { title, meta, href, action, primary? }
//
// Facts only from the project record (docs/content/about-mahmood.md). Product voice: Mahmood
// decides, specifies and reviews; AI agents write the code under his direction.

const modules = import.meta.glob('./case-studies/*.js', { eager: true });

export const caseStudies = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path.split('/').pop().replace(/\.js$/, ''), mod.default])
);
