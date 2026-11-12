// Builds the résumés from the site's own content, so they never drift from it.
//
//   node resume/build.mjs
//
// Writes:
//   public/resumes/Mahmood_Ahmad_Resume_Light.pdf   A4, light
//   public/resumes/Mahmood_Ahmad_Resume_Dark.pdf    A4, dark
//   public/resumes/Mahmood_Ahmad_Resume.pdf         a copy of the light one, for older links
//   resume/Mahmood_Ahmad_Resume.tex                 one page on Jake's Resume template, for Overleaf
//
// The PDFs are printed by Chrome (or Edge) in headless mode; no dev server is needed. The experience,
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
const { person, contact, recognition, tools } = await vite.ssrLoadModule('/src/content/site.js');
const { hoursText } = await vite.ssrLoadModule('/src/content/hours.js');
await vite.close();

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

<section><h2>Experience</h2>${experience.map(role).join('')}</section>

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
for (const theme of ['light', 'dark']) {
  const page = path.join(tmp, `${theme}.html`);
  fs.writeFileSync(page, html(theme));
  const out = path.resolve(`public/resumes/Mahmood_Ahmad_Resume_${theme === 'light' ? 'Light' : 'Dark'}.pdf`);
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--disable-extensions', '--no-first-run', '--no-pdf-header-footer',
    `--user-data-dir=${path.join(tmp, 'profile')}`, '--virtual-time-budget=10000',
    `--print-to-pdf=${out}`, pathToFileURL(page).href,
  ], { stdio: 'ignore' });
  console.log(`✓ ${path.relative(root, out)}`);
}
fs.copyFileSync('public/resumes/Mahmood_Ahmad_Resume_Light.pdf', 'public/resumes/Mahmood_Ahmad_Resume.pdf');
console.log('✓ public/resumes/Mahmood_Ahmad_Resume.pdf (copy of the light one)');

// ── LaTeX, on Jake's Resume template (github.com/jakegut/resume, MIT), for Overleaf ──
// One page, so the bullets are shorter than the site's. Facts match src/content/profile.js.
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
const range = (period) => tex(dates(period)).replace(' -- Present', ' -- Present');

// About one line each, so the whole résumé fits one page on Jake's template.
const bullets = {
  'Product Quality Analyst': [
    'Lead AI feature definition for the most successful product in a 200+ person division; took Promise Tracker, an AI feature, from concept to production readiness.',
    'Led the rebuild of 7 product areas by directing Claude Code agents, each reviewed against the component library and business rules.',
    'Shape the roadmap and AI feature decisions with the Product Owner in Aha! and Azure DevOps, backed by quantitative analysis.',
    'Organised the AI Foundations hackathon (9 participants, 9 working demos) and wrote a 183-page handbook on working with Claude.',
    'Own release readiness; introduced the API automation framework and onboarded 3 analysts.',
  ],
  'Junior SQA Analyst': [
    'Designed the Strict Quality Gates framework, adopted by 3 other teams: about 40% less defect leakage, zero critical defects in 6 sprints.',
    'Took over QA of a critical release mid-cycle without a handover and shipped it on time; covered a 3-month BA vacancy.',
    `Delivered ${hoursText.junior} hours of domain training and trained 2 non-technical hires to independent sprint work.`,
    'Ran the Postman proof of concept adopted across 5+ teams; 1st of 11 teams in a division-wide AI hackathon.',
  ],
  'SQA Trainee': ["Initiated and wrote the organisation's first global UI standards document."],
  'WordPress Designer': ['Built responsive WordPress websites from client brand requirements, turning PSD designs into Elementor builds.'],
  'UX Designer, intern': ['Refined the web interface and prototyped UI concepts for stakeholder review before engineering started.'],
};
const projects = [
  {
    name: 'Claude Code marketplace', note: 'public on GitHub', when: 'Jul 2026 -- Present',
    text: 'A public marketplace of 7 plugins and 30 skills for QA and product work; every plugin asks a person before it writes.',
  },
  {
    name: 'AI evaluation and the Skills Evals Lab', note: 'AI quality', when: 'Sep 2026 -- Present',
    text: 'A repeatable way to test AI features (each case run 3 times, counted only when all 3 pass), and a course on evaluating AI skills.',
  },
  {
    name: 'AI QA Workbench', note: 'DIS AI Foundations program', when: 'Jul 2026',
    text: 'Takes a user story to test cases, automation, pipeline runs and structured bug reports.',
  },
];
// Shorter than the site's lists, for the same reason.
const skillLines = [
  ['Product', 'Discovery and definition, user stories and acceptance criteria, stakeholder management (RACI/RASCI), roadmapping'],
  ['AI product work', 'AI feature design, AI skill writing, evaluating AI output, agentic workflows, prototyping with AI'],
  ['Quality', 'Test strategy, functional, API and acceptance testing, quality gates, release readiness, defect management'],
  ['Ways of working', 'Scrum (CSM®), Kanban, workshop facilitation, root-cause analysis (5 Whys), risk and escalation management'],
  ['Tools', 'Azure DevOps, Jira, Aha!, Figma Make, Claude Code, MCP servers, Playwright, Postman, TestRail'],
  ['Certifications', 'Certified ScrumMaster® (CSM®); ISTQB® CTFL; Business Analysis Fundamentals, Microsoft; AI Foundations: From Developer to Orchestrator, Dealer Information Systems'],
  ['Recognition', recognition.slice(0, 3).map((r) => r.title).join('; ')],
];
const skillTex = skillLines.map(([k, v]) => `     \\textbf{${tex(k)}}{: ${tex(v)}}`).join(' \\\\\n');

const latex = String.raw`%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------
% Mahmood Ahmad's résumé on Jake's template. Generated by resume/build.mjs from the portfolio's
% content: edit the content there and rebuild, rather than editing this file by hand.
% Open it in Overleaf (New Project, Upload Project) and compile with pdfLaTeX.

\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\input{glyphtounicode}

\pagestyle{fancy}
\fancyhf{} % clear all header and footer fields
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\pdfgentounicode=1

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & #2 \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\begin{document}

%----------HEADING----------
\begin{center}
    \textbf{\Huge \scshape ${tex(person.name)}} \\ \vspace{1pt}
    \small ${tex(person.title)}, ${tex(person.product.replace(/^Enterprise/, 'enterprise'))} at ${tex(person.company)} \\ \vspace{1pt}
    \small ${links.map((l) => `\\href{${l.href}}{\\underline{${tex(l.text)}}}`).join(' $|$ ')}
\end{center}


%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart
${experience.map((r) => `
    \\resumeSubheading
      {${tex(r.role)}}{${range(r.period)}}
      {${tex(r.company)}}{}
      \\resumeItemListStart
${(bullets[r.role] || []).map((b) => `        \\resumeItem{${tex(b)}}`).join('\n')}
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


%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart
    \resumeSubheading
      {${tex(education.school)}}{}
      {${tex(education.degree)}}{${range(education.period)}}
  \resumeSubHeadingListEnd


%-----------SKILLS-----------
\section{Skills}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
${skillTex}
    }}
 \end{itemize}

\end{document}
`;
fs.writeFileSync('resume/Mahmood_Ahmad_Resume.tex', latex);
console.log('✓ resume/Mahmood_Ahmad_Resume.tex');
fs.rmSync(tmp, { recursive: true, force: true });
