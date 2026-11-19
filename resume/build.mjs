// Builds the résumés from the site's own content, so they never drift from it.
//
//   node resume/build.mjs
//
// Writes:
//   resume/Mahmood_Ahmad_Resume.tex                 one page on Jake's Resume template, for Overleaf
//   public/resumes/Mahmood_Ahmad_Resume_Light.pdf   that .tex compiled: the résumé every button opens
//   public/resumes/Mahmood_Ahmad_Resume.pdf         a copy of it, for older links
//   public/resumes/Mahmood_Ahmad_Resume_Dark.pdf    A4, dark, printed from HTML (no Jake's equivalent)
//
// The main résumé is the Jake's-template .tex compiled with Tectonic (scoop install tectonic), the
// same output Overleaf gives. The dark PDF is printed by Chrome (or Edge) in headless mode; no dev
// server is needed. The experience,
// skills, tools, certifications and recognition come from src/content; only the short summary and
// the one-page LaTeX bullets are written here. Never add a phone number or a location: the site
// doesn't say where he is based, and neither may the résumé.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createServer } from 'vite';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);

// ── Content, loaded through Vite so the site's own modules resolve as they do in the browser ──
const vite = await createServer({ root, server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' });
const { experience, skills, education, certifications } = await vite.ssrLoadModule('/src/content/profile.js');
const { person, contact, recognition, tools, tenure } = await vite.ssrLoadModule('/src/content/site.js');
const { hoursText } = await vite.ssrLoadModule('/src/content/hours.js');
await vite.close();
// The résumé starts at SQA Trainee (Dec 2023): only the Perseus Group roles. The site's Journey and
// About still show the earlier design roles.
const resumeRoles = experience.filter((r) => r.start >= '2023-12');

const links = [
  { text: contact.email, href: `mailto:${contact.email}` },
  { text: 'linkedin.com/in/shironigun', href: contact.linkedin },
  { text: 'github.com/shironigun', href: contact.github },
  { text: 'shironigun.github.io', href: 'https://shironigun.github.io' },
];
const summary = 'Business analyst and associate product owner on enterprise dealership SaaS. I define and prototype AI features, run the sprint as Scrum Master and lead the QA team. I build working software by directing AI agents, and the tools I build wait for a person’s approval before they write.';
const dates = (period) => period.replace(' to present', ' – Present').replace(' to ', ' – ');

// ── The PDFs ──
// Straight apostrophes in the PDFs: some applicant-tracking systems misread the curly one.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/[‘’]/g, "'");
const THEMES = {
  light: { bg: '#FFFFFF', ink: '#15171C', body: '#3F4552', quiet: '#6B7281', accent: '#2446DB', soft: '#EEF1FD', line: '#E2E5EB' },
  dark: { bg: '#0E1015', ink: '#EEF0F4', body: '#B9BFCB', quiet: '#8B92A0', accent: '#9FB0FF', soft: '#1A1F33', line: '#272B36' },
};

function html(theme) {
  const t = THEMES[theme];
  const role = (r) => `
    <article class="role">
      <div class="roleHead">
        <h3>${esc(r.role)}</h3>
        <span class="period">${esc(dates(r.period))}</span>
      </div>
      <p class="company">${esc(r.company)}</p>
      <ul class="points">${r.highlights.map((h) => `<li><strong>${esc(h.label)}.</strong> ${esc(h.text)}</li>`).join('')}</ul>
    </article>`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Mahmood Ahmad, résumé</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=block" rel="stylesheet">
<style>
@page { size: A4; margin: 13mm 0 12mm; background: ${t.bg}; }
* { box-sizing: border-box; }
html, body { margin: 0; background: ${t.bg}; color: ${t.body}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font: 400 9.1pt/1.46 Inter, system-ui, sans-serif; }
.sheet { padding: 0 15mm; }
a { color: inherit; text-decoration: none; }
h1, h2, h3 { margin: 0; color: ${t.ink}; font-family: 'Schibsted Grotesk', Inter, sans-serif; }
header { display: grid; grid-template-columns: 1fr auto; gap: 6mm; align-items: end; padding-bottom: 4.5mm; border-bottom: 1.5pt solid ${t.accent}; }
h1 { font-size: 25pt; font-weight: 700; line-height: 1.02; letter-spacing: -0.02em; }
.title { margin: 2.2mm 0 0; font: 600 12pt/1.25 'Schibsted Grotesk', sans-serif; color: ${t.accent}; }
.where { margin: 0.8mm 0 0; color: ${t.body}; }
.links { margin: 0; padding: 0; list-style: none; text-align: right; font-size: 8.8pt; line-height: 1.62; }
.links a { color: ${t.ink}; }
.summary { margin: 4.2mm 0 0; font-size: 9.8pt; line-height: 1.55; color: ${t.ink}; }
section { margin-top: 4.4mm; }
h2 { display: flex; align-items: center; gap: 3mm; margin-bottom: 1.2mm; font-size: 11.5pt; font-weight: 650; letter-spacing: -0.005em; }
h2::after { content: ''; flex: 1; border-top: 0.75pt solid ${t.line}; }
.role { margin-top: 2.9mm; }
.roleHead { display: flex; justify-content: space-between; align-items: baseline; gap: 6mm; break-after: avoid; }
h3 { font-size: 10.6pt; font-weight: 650; }
.period { flex: none; font-size: 8.8pt; color: ${t.quiet}; font-variant-numeric: tabular-nums; }
.company { margin: 0.3mm 0 0; font-size: 9pt; font-weight: 500; color: ${t.accent}; break-after: avoid; }
.points { margin: 1.2mm 0 0; padding-left: 4mm; }
.points li { margin: 0.6mm 0; padding-left: 0.6mm; break-inside: avoid; }
.points li::marker { color: ${t.accent}; }
.points strong { font-weight: 600; color: ${t.ink}; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 2.4mm 9mm; margin-top: 1.4mm; }
.group { break-inside: avoid; }
.group b { display: block; font-weight: 600; color: ${t.ink}; }
.list { margin: 1.2mm 0 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.6mm 7mm; }
.list li { display: grid; gap: 0.2mm; padding-top: 1.4mm; border-top: 0.5pt solid ${t.line}; break-inside: avoid; }
.list li span:first-child { color: ${t.ink}; font-weight: 500; line-height: 1.35; }
.list li span:last-child { color: ${t.quiet}; font-size: 8.4pt; line-height: 1.35; }
.certs { margin: 1.2mm 0 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.9mm 9mm; }
.certs li { break-inside: avoid; }
.certs li span:first-child { color: ${t.ink}; font-weight: 500; }
.certs li span:last-child { color: ${t.quiet}; font-size: 8.4pt; }
.edu { display: flex; justify-content: space-between; align-items: baseline; margin-top: 1.4mm; }
.edu b { color: ${t.ink}; font-weight: 600; }
</style></head>
<body><div class="sheet">
<header>
  <div>
    <h1>${esc(person.name)}</h1>
    <p class="title">${esc(person.title)}</p>
    <p class="where">${esc(person.product)} at ${esc(person.company)}</p>
  </div>
  <ul class="links">${links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.text)}</a></li>`).join('')}</ul>
</header>
<p class="summary">${esc(summary)}</p>

<section><h2>Experience</h2>${resumeRoles.map(role).join('')}</section>

<section><h2>Recognition</h2>
  <ul class="list">${recognition.map((r) => `<li><span>${esc(r.title)}</span><span>${esc(r.detail || '')}</span></li>`).join('')}</ul>
</section>

<section><h2>Skills</h2>
  <div class="two">${skills.map((g) => `<div class="group"><b>${esc(g.group)}</b>${esc(g.items.join(', '))}</div>`).join('')}</div>
</section>

<section><h2>Tools</h2>
  <div class="two">${tools.map((g) => `<div class="group"><b>${esc(g.group)}</b>${esc(g.items.join(', '))}</div>`).join('')}</div>
</section>

<section><h2>Education</h2>
  <div class="edu"><span><b>${esc(education.degree)}</b>, ${esc(education.school)}</span><span class="period">${esc(dates(education.period))}</span></div>
</section>

<section><h2>Certifications</h2>
  <ul class="certs">${certifications.map((c) => `<li><span>${esc(c.title)}</span> <span>${esc(c.issuer)}, ${esc(c.year)}</span></li>`).join('')}</ul>
</section>
</div></body></html>`;
}

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter(Boolean);
  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) throw new Error('Chrome or Edge not found; set CHROME_PATH.');
  return found;
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'resume-'));
const browser = findBrowser();
fs.mkdirSync('public/resumes', { recursive: true });
// The light résumé is compiled from the LaTeX further down; only the dark one is printed here.
for (const theme of ['dark']) {
  const page = path.join(tmp, `${theme}.html`);
  fs.writeFileSync(page, html(theme));
  const out = path.resolve('public/resumes/Mahmood_Ahmad_Resume_Dark.pdf');
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--disable-extensions', '--no-first-run', '--no-pdf-header-footer',
    `--user-data-dir=${path.join(tmp, 'profile')}`, '--virtual-time-budget=10000',
    `--print-to-pdf=${out}`, pathToFileURL(page).href,
  ], { stdio: 'ignore' });
  console.log(`✓ ${path.relative(root, out)}`);
}

// ── LaTeX, on Jake's Resume template (github.com/jakegut/resume, MIT), for Overleaf ──
// The full résumé (two pages is fine). Facts match src/content. Tuned for applicant tracking systems (Nov 2026 research):
//   - single column, standard headings in the usual order: Summary, Experience, Projects, Skills,
//     Certifications and Awards, Education;
//   - no tables for alignment (title and dates sit on one line with \hfill), no small caps, no icons;
//   - Unicode mapping on pdfLaTeX (glyphtounicode), so the text layer reads back as written;
//   - bullets lead with an action and an outcome backed by a real number;
//   - the official title appears next to the public one, so either matches a recruiter's search.
// Check the text layer after a change:  pdftotext -layout public/resumes/Mahmood_Ahmad_Resume.pdf -
const tex = (s) => String(s)
  .replace(/\\/g, '\\textbackslash{}')
  .replace(/([&%$#_{}])/g, '\\$1')
  .replace(/~/g, '\\textasciitilde{}')
  .replace(/\^/g, '\\textasciicircum{}')
  .replace(/®/g, '\\textsuperscript{\\textregistered}')
  .replace(/[‘’]/g, "'")
  .replace(/“/g, '``')
  .replace(/”/g, "''")
  .replace(/ – /g, ' -- ')
  .replace(/–/g, '--');
const range = (period) => tex(dates(period));

const headline = 'AI Product Analyst | Business Analysis | Product Ownership | AI Product Development';
const summaryTex = `AI Product Analyst (official title: Product Quality Analyst) with ${tenure} years on enterprise dealership SaaS at Perseus Group, part of Constellation Software. Business analyst and associate product owner: discovery, requirements, the roadmap and AI feature definition. Certified ScrumMaster and QA lead; I prototype by directing AI agents with Claude Code.`;

const projects = [
  {
    name: 'Claude Code marketplace', note: 'public on GitHub', when: 'Jul 2026 -- Present',
    text: '7 plugins and 30 skills for QA and product work; every plugin asks a person before it writes.',
  },
  {
    name: 'AI evaluation and the Skills Evals Lab', note: 'AI quality', when: 'Sep 2026 -- Present',
    text: 'A repeatable AI test (3 runs, counted only if all pass) and a 17-lesson course on evaluating AI skills.',
  },
  {
    name: 'AI QA Workbench', note: 'DIS AI Foundations program', when: 'Jul 2026',
    text: '16 specialised AI agents take a user story to test cases, automation, pipeline runs and bug reports.',
  },
];
// The full lists from src/content: every skill group, every tool group, every certification and award.
const skillTex = [...skills, ...tools.map((g) => ({ ...g, group: `${g.group} tools` }))]
  .map((g) => `     \\textbf{${tex(g.group)}}{: ${tex(g.items.join(', '))}}`).join(' \\\\\n');
const certTex = certifications.map((c) => `      \\resumeItem{${tex(c.title)}, ${tex(c.issuer)}, ${tex(c.year)}}`).join('\n');
const awardTex = recognition.map((r) => `      \\resumeItem{\\textbf{${tex(r.title)}}${r.detail ? `: ${tex(r.detail)}` : ''}}`).join('\n');

const latex = String.raw`%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------
% Mahmood Ahmad's full résumé on Jake's template, tuned for applicant tracking systems (single column,
% standard headings, no tables or small caps). Generated by resume/build.mjs from the portfolio's
% content: edit the content there and rebuild, rather than editing this file by hand.
% Open it in Overleaf (New Project, Upload Project) and compile with pdfLaTeX.

\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage[usenames,dvipsnames]{color}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
% Unicode mapping so the text layer reads back as written. pdfLaTeX only (Overleaf); XeTeX, which
% Tectonic uses, maps Unicode itself.
\ifdefined\pdfgentounicode\input{glyphtounicode}\pdfgentounicode=1\fi
% On XeTeX (Tectonic): the same Latin Modern look, with ligatures off, so words such as
% official extract letter by letter and match a keyword search.
\ifdefined\XeTeXrevision\usepackage{fontspec}\setmainfont{lmroman10-regular.otf}[BoldFont=lmroman10-bold.otf, ItalicFont=lmroman10-italic.otf, BoldItalicFont=lmroman10-bolditalic.otf, Ligatures={NoCommon}]\fi

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.55in}
\addtolength{\textheight}{1.1in}

\urlstyle{same}
\raggedbottom
\raggedright

% Sections: plain bold headings (no small caps), with Jake's rule underneath.
\titleformat{\section}{\vspace{-5pt}\bfseries\raggedright\large}{}{0em}{}[\color{black}\titlerule \vspace{-6pt}]

%-------------------------
% Custom commands. Title and dates share one line with \hfill instead of a table, so parsers read
% title, dates, organisation, then the bullets, in that order.
\newcommand{\resumeItem}[1]{\item\small{#1 \vspace{-2.5pt}}}
\newcommand{\resumeSubheading}[4]{%
  \vspace{-2pt}\item \textbf{#1} \hfill #2 \\
  \textit{\small #3} \hfill \textit{\small #4} \vspace{-6pt}}
\newcommand{\resumeProjectHeading}[2]{\item \small #1 \hfill #2 \vspace{-6pt}}
\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}[topsep=3pt]}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-4pt}}

%-------------------------------------------
\begin{document}

%----------HEADING----------
\begin{center}
    {\Huge \textbf{${tex(person.name)}}} \\ \vspace{3pt}
    \small ${tex(headline)} \\ \vspace{2pt}
    \small ${links.map((l) => `\\href{${l.href}}{\\underline{${tex(l.text)}}}`).join(' $|$ ')}
\end{center}

%-----------SUMMARY-----------
\section{Summary}
\small{${tex(summaryTex)}}

%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart
${resumeRoles.map((r) => `
    \\resumeSubheading
      {${tex(r.role)}}{${range(r.period)}}
      {${tex(r.company)}}{}
      \\resumeItemListStart
${r.highlights.map((h) => `        \\resumeItem{\\textbf{${tex(h.label)}:} ${tex(h.text)}}`).join('\n')}
      \\resumeItemListEnd`).join('\n')}
  \resumeSubHeadingListEnd

%-----------PROJECTS-----------
\section{Projects}
    \resumeSubHeadingListStart
${projects.map((p) => `      \\resumeProjectHeading
          {\\textbf{${tex(p.name)}} $|$ \\emph{${tex(p.note)}}}{${p.when}}
          \\resumeItemListStart
            \\resumeItem{${tex(p.text)}}
          \\resumeItemListEnd`).join('\n')}
    \resumeSubHeadingListEnd

%-----------SKILLS-----------
\section{Skills}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
${skillTex}
    }}
 \end{itemize}

%-----------CERTIFICATIONS-----------
\section{Certifications}
  \resumeSubHeadingListStart
    \item
    \resumeItemListStart
${certTex}
    \resumeItemListEnd
  \resumeSubHeadingListEnd

%-----------AWARDS-----------
\section{Awards}
  \resumeSubHeadingListStart
    \item
    \resumeItemListStart
${awardTex}
    \resumeItemListEnd
  \resumeSubHeadingListEnd

%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart
    \resumeSubheading
      {${tex(education.school)}}{${range(education.period)}}
      {${tex(education.degree)}}{}
  \resumeSubHeadingListEnd

\end{document}
`;
fs.writeFileSync('resume/Mahmood_Ahmad_Resume.tex', latex);
console.log('✓ resume/Mahmood_Ahmad_Resume.tex');

// ── The main résumé: that .tex compiled with Tectonic, so the site serves Jake's template ──
const texOut = path.join(tmp, 'tex');
fs.mkdirSync(texOut, { recursive: true });
execFileSync('tectonic', ['-X', 'compile', '--outdir', texOut, 'resume/Mahmood_Ahmad_Resume.tex'], { stdio: 'inherit' });
fs.copyFileSync(path.join(texOut, 'Mahmood_Ahmad_Resume.pdf'), 'public/resumes/Mahmood_Ahmad_Resume_Light.pdf');
fs.copyFileSync(path.join(texOut, 'Mahmood_Ahmad_Resume.pdf'), 'public/resumes/Mahmood_Ahmad_Resume.pdf');
console.log('✓ public/resumes/Mahmood_Ahmad_Resume_Light.pdf and Mahmood_Ahmad_Resume.pdf (Jake\'s template)');
fs.rmSync(tmp, { recursive: true, force: true });
