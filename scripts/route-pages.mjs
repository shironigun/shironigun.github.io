// Runs after `vite build`. GitHub Pages only knows the files in dist/, so a deep link like
// /case-studies/promise-tracker used to be answered by 404.html: the page still rendered, but with a
// 404 status and the home page's preview tags, so LinkedIn and other sites showed a broken card.
// This writes a real page for each route, each with its own title, description and preview image
// (public/images/previews/<slug>.png, made by scripts/og-images.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

const SITE = 'https://shironigun.github.io';
const VERSION = '2026-11-21d'; // bump when the preview images change, so LinkedIn fetches them again
const dist = path.resolve('dist');
const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' });
const { projectPages } = await vite.ssrLoadModule('/src/content/projects.js');
await vite.close();

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
function page({ title, description, url, image, alt }) {
  let html = shell;
  const meta = (attr, key, value) => {
    const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, 's');
    html = html.replace(re, `$1${esc(value)}$2`);
  };
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  meta('name', 'description', description);
  meta('property', 'og:title', title);
  meta('property', 'og:description', description);
  meta('property', 'og:url', url);
  if (image) meta('property', 'og:image', image);
  if (alt) meta('property', 'og:image:alt', alt);
  return html;
}
function write(rel, html) {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// Top-level pages keep the home page's preview; they just answer with 200 now.
const pages = {
  'projects.html': ['Projects: Mahmood Ahmad', '/projects'],
  'about.html': ['About: Mahmood Ahmad', '/about'],
  'journey.html': ['Career journey: Mahmood Ahmad', '/journey'],
  'how-i-work.html': ['How I work: Mahmood Ahmad', '/how-i-work'],
  'contact.html': ['Contact: Mahmood Ahmad', '/contact'],
  'case-studies/index.html': ['Case studies: Mahmood Ahmad', '/case-studies'],
};
const homeDescription = shell.match(/name="description"\s+content="([^"]*)"/s)[1];
for (const [rel, [title, route]] of Object.entries(pages)) {
  write(rel, page({ title, description: homeDescription, url: SITE + route }));
}

let n = 0;
for (const p of projectPages) {
  const image = `${SITE}/images/previews/${p.slug}.png?v=${VERSION}`;
  if (!fs.existsSync(path.resolve('public/images/previews', `${p.slug}.png`))) {
    console.warn(`! no preview image for ${p.slug}; run scripts/og-images.mjs`);
  }
  write(`case-studies/${p.slug}.html`, page({
    title: `${p.name}: Mahmood Ahmad`,
    description: p.summary,
    url: `${SITE}/case-studies/${p.slug}`,
    image,
    alt: `${p.name}: ${p.summary}`,
  }));
  n += 1;
}
console.log(`✓ ${Object.keys(pages).length} pages and ${n} case-study pages with their own preview tags`);
