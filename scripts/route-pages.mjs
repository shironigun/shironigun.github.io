// Runs after `vite build`. GitHub Pages only knows the files in dist/, so a deep link like
// /case-studies/promise-tracker used to be answered by 404.html: the page still rendered, but with a
// 404 status and the home page's preview tags, so LinkedIn and other sites showed a broken card.
// This writes a real page for each route, each with its own title, description and preview image
// (public/images/previews/<slug>.png, made by scripts/og-images.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

const SITE = 'https://shironigun.github.io';
const VERSION = '2026-11-21f'; // bump when the preview images change, so LinkedIn fetches them again
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

// Share pages for things LinkedIn can only link to as a file (a certificate image, a PDF): each is a
// small page with its own preview tags that opens the file, so the link shows a real preview
// instead of a blank card. Linked from his LinkedIn experience media.
const shares = [
  { id: 'manager-essentials', title: 'Manager Essentials Training certificate', description: 'Six-month leadership programme at Perseus Group, built on DDI’s frontline-leader curriculum: coaching, delegation and developing people.', image: '/certifications/manager-essentials-certificate.jpg', to: '/certifications/manager-essentials-certificate.jpg' },
  { id: 'csm', title: 'Certified ScrumMaster® (CSM®)', description: 'Scrum Alliance certification, December 2024.', image: '/certifications/CSM.jpeg', to: '/certifications/CSM.jpeg' },
  { id: 'istqb-ctfl', title: 'ISTQB® Certified Tester Foundation Level', description: 'ISTQB® foundation certification in software testing, July 2024.', image: '/certifications/ISTQB-Certificate.jpeg', to: '/certifications/ISTQB-Certificate.jpeg' },
  { id: 'selenium-csharp-notes', title: 'Selenium WebDriver notes in C#', description: 'A 13-page guide to browser automation with Selenium WebDriver in C#, written for other automation testers.', image: `/images/previews/selenium-csharp-notes.png?v=${VERSION}`, to: '/documents/selenium-csharp-notes.pdf' },
  { id: 'hackathon-first-prize', title: 'First prize, division-wide AI hackathon', description: 'The winning team with the First Prize card: 1st of 11 teams, 2025.', image: '/images/events/hackathon-first-prize.jpg', to: '/images/events/hackathon-first-prize.jpg' },
  { id: 'hackathon-final-pitch', title: 'Presenting the final pitch', description: 'Presenting the team’s AI solution to the judges at the division-wide AI hackathon, 2025.', image: '/images/events/hackathon-final-presentation.jpg', to: '/images/events/hackathon-final-presentation.jpg' },
  { id: 'ai-foundations-organiser', title: 'Certificate of appreciation: AI Foundations', description: 'For organising and delivering AI Foundations: Powering Work with AI Orchestration, August 2026.', image: '/certifications/ai-foundations-organiser-certificate.jpg', to: '/certifications/ai-foundations-organiser-certificate.jpg' },
  { id: 'dis-ai-foundations', title: 'AI Foundations: From Developer to Orchestrator', description: 'Certificate of completion for the five-day cross-division AI hackathon, July 2026.', image: '/certifications/dis-ai-foundations-certificate.jpg', to: '/certifications/dis-ai-foundations-certificate.jpg' },
  { id: 'postman-evaluation-doc', title: 'Postman API testing evaluation (10 pages)', description: 'The written evaluation: features, plans, strengths, limits and the recommendation.', image: `/images/previews/doc-postman-evaluation.png?v=${VERSION}`, to: '/documents/postman-api-testing-evaluation.pdf' },
  { id: 'postman-presentation', title: 'Postman proof of concept (35 slides)', description: 'The presentation given to the whole division in May 2025.', image: `/images/previews/doc-postman-presentation.png?v=${VERSION}`, to: '/documents/postman-poc-presentation.pdf' },
  { id: 'how-to-standard', title: 'How-to guide standard (8 pages)', description: 'A public copy of the standard for writing a feature how-to guide for dealers.', image: `/images/previews/doc-how-to-standard.png?v=${VERSION}`, to: '/documents/how-to-guide-standard.pdf' },
];
// Tile-shaped versions for LinkedIn projects with more than one attachment: LinkedIn shows those
// as two portrait tiles cropped from the centre, so these images keep everything in the middle.
const tiles = [
  ['feature-guides', 'Case study: feature guides for dealers', 'A how-to standard, a build tool that checks every guide against it, and the first complete guide.', '/case-studies/feature-guides'],
  ['how-to-standard', 'How-to guide standard (8 pages)', 'A public copy of the standard for writing a feature how-to guide for dealers.', '/documents/how-to-guide-standard.pdf'],
  ['postman-evaluation', 'Case study: Postman API testing evaluation', 'How a proof of concept led 5+ teams to adopt Postman as their API testing standard.', '/case-studies/postman-evaluation'],
  ['postman-doc', 'Postman API testing evaluation (10 pages)', 'The written evaluation: features, plans, strengths, limits and the recommendation.', '/documents/postman-api-testing-evaluation.pdf'],
  ['postman-slides', 'Postman proof of concept (35 slides)', 'The presentation given to the whole division in May 2025.', '/documents/postman-poc-presentation.pdf'],
  ['ai-qa-workbench', 'Case study: the AI QA Workbench', '16 AI agents that take a user story to test cases, automation, pipeline runs and structured bug reports.', '/case-studies/ai-qa-workbench'],
  ['dis-cert', 'AI Foundations: From Developer to Orchestrator', 'Certificate of completion for the five-day cross-division AI hackathon, July 2026.', '/certifications/dis-ai-foundations-certificate.jpg'],
  ['ai-foundations', 'Case study: the AI Foundations hackathon', '9 real-world briefs for 10 participants, 10 working demos and a 183-page handbook on working with Claude.', '/case-studies/ai-foundations-hackathon'],
  ['foundations-cert', 'Certificate of appreciation: AI Foundations', 'For organising and delivering AI Foundations: Powering Work with AI Orchestration, August 2026.', '/certifications/ai-foundations-organiser-certificate.jpg'],
  ['hackathon-2025', 'Case study: first place of 11 teams', 'AI solutions for customer retention and employee performance analysis, as Product Owner, Scrum Master and QA lead.', '/case-studies/hackathon-2025'],
  ['first-prize', 'First prize, division-wide AI hackathon', 'The winning team with the First Prize card: 1st of 11 teams, 2025.', '/images/events/hackathon-first-prize.jpg'],
  ['final-pitch', 'Presenting the final pitch', 'Presenting the team’s AI solution to the judges at the division-wide AI hackathon, 2025.', '/images/events/hackathon-final-presentation.jpg'],
];
for (const [slug, title, description, to] of tiles) {
  shares.push({ id: `tile-${slug}`, title, description, image: `/images/previews/tiles/${slug}.png?v=${VERSION}`, to });
}
for (const s of shares) {
  const url = `${SITE}/share/${s.id}`;
  write(`share/${s.id}.html`, `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(s.title)}: Mahmood Ahmad</title>
<meta name="description" content="${esc(s.description)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(s.title)}">
<meta property="og:description" content="${esc(s.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}${s.image}">
<meta property="og:image:alt" content="${esc(s.title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${s.to}">
<link rel="canonical" href="${url}">
</head>
<body style="font-family: system-ui, sans-serif; padding: 2rem;">
<p>Opening <a href="${s.to}">${esc(s.title)}</a>…</p>
</body>
</html>
`);
}
console.log(`✓ ${shares.length} share pages`);
