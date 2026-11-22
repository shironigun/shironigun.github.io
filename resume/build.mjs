// Builds the resumes from the site's own content, so they never drift from it.
//
//   node resume/build.mjs
//
// Writes:
//   resume/Mahmood_Ahmad_Resume.tex                 the full resume on Jake's Resume template, for Overleaf
//   public/resumes/Mahmood_Ahmad_Resume_Light.pdf   that .tex compiled: the resume every button opens
//   public/resumes/Mahmood_Ahmad_Resume.pdf         a copy of it, for older links
//   public/resumes/Mahmood_Ahmad_Resume_Dark.pdf    A4, dark, printed from HTML (no Jake's equivalent)
//
// The main resume is the Jake's-template .tex compiled with Tectonic (scoop install tectonic), the
// same output Overleaf gives. The dark PDF is printed by Chrome (or Edge) in headless mode; no dev
// server is needed. The experience,
// skills, tools, certifications and recognition come from src/content; only the short summary and
// the one-page LaTeX bullets are written here. Never add a phone number or a location: the site
// doesn't say where he is based, and neither may the resume.
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
const { experience, education, certifications } = await vite.ssrLoadModule('/src/content/profile.js');
const { person, contact, recognition, tools } = await vite.ssrLoadModule('/src/content/site.js');
// The resume lists a focused set of skills, each backed by the experience below (the site keeps the
// full LinkedIn list); then the tool groups, named "Product tools" and so on.
const resumeSkills = [
  { group: 'Product', items: ['Product discovery', 'Requirements elicitation', 'Functional requirements', 'User stories', 'Acceptance criteria', 'Prioritisation', 'Product roadmapping', 'Business analysis', 'Stakeholder management'] },
  { group: 'AI product work', items: ['AI feature definition', 'AI agent workflows', 'LLM evaluation', 'Evaluation methodology', 'Grading criteria', 'Prompt engineering', 'Agent-led prototyping', 'AI cost modelling'] },
  { group: 'Design', items: ['Product design', 'User experience (UX)', 'User interface prototyping', 'Design direction', 'Design review'] },
  { group: 'Quality', items: ['Release readiness', 'Quality gates', 'Test strategy', 'Test automation', 'API testing', 'Regression testing', 'User acceptance testing', 'Defect triage'] },
  { group: 'Leadership and delivery', items: ['Team coaching', 'Mentoring', 'Cross-functional collaboration', 'Scrum (CSM®)', 'Sprint planning', 'Workshop facilitation'] },
];
// Tool names as a recruiter would search for them.
const RESUME_TOOLS = { 'Claude Skills and Plugins': ['Claude Skills', 'Claude Plugins'], 'MCP servers': ['Model Context Protocol (MCP)'], Selenium: ['Selenium WebDriver'] };
const resumeTools = tools.map((g) => ({ group: g.group === 'AI and agentic development' ? 'AI' : g.group, items: g.items.flatMap((i) => RESUME_TOOLS[i] || [i]) }));
const skillGroups = [...resumeSkills, ...resumeTools.map((g) => ({ ...g, group: `${g.group} tools` }))];
const { recentEvents } = await vite.ssrLoadModule('/src/content/achievements.js');
await vite.close();

// ── Resume rules (his, Nov 2026) ──
//   - The summary says why a company should hire him: no "I", no current company, no official title
//     (the official title is the first role under Experience). Action words and adverbs.
//   - Experience is plain bullets: no bold label before each one. One or two lines each, a strong
//     verb first, past tense throughout, a number wherever the facts have one. Every bullet, project and
//     summary sentence opens with a different word from his 100 action words list (Interviewology); no repeats.
//   - Every date sits right-aligned, in one format: "Mon YYYY" or "Mon YYYY - Present" (a plain hyphen: some viewers and ATS mangle the en dash).
//   - Nothing repeats across sections: a fact lives in Experience, Projects or Awards, not two.
// The bullets live in src/content/profile.js (`bullets`), shared with the About page and LinkedIn.
// The resume starts at SQA Trainee (Dec 2023): only the Perseus Group roles. The site's Journey and
// About still show the earlier design roles.
const resumeRoles = experience.filter((r) => r.start >= '2023-12');

// Certifications: the professional ones, newest first, each with its month. The introductory courses
// stay on the site, and the organiser's certificate of appreciation is listed under Awards.
const CERT_DATES = { 'Manager Essentials Training': 'Nov 2026', 'AI Foundations: From Developer to Orchestrator': 'Jul 2026', 'Business Analysis Fundamentals': 'Feb 2026', 'Certified ScrumMaster® (CSM®)': 'Dec 2024', 'Certified Tester Foundation Level': 'Jul 2024' };
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const sortKey = (d) => `${d.slice(-4)}-${String(MONTHS.indexOf(d.slice(0, 3)) + 1).padStart(2, '0')}`;
const newestFirst = (a, b) => sortKey(b.when).localeCompare(sortKey(a.when));
const resumeCerts = certifications
  .filter((c) => CERT_DATES[c.title])
  .map((c) => ({ ...c, when: CERT_DATES[c.title] }))
  .sort(newestFirst);
// Awards with their dates, newest first. The hackathon win is in Experience, so it is not repeated here.
const AWARD_DATES = { 'VP Award': 'Jan 2025', 'AI Innovator of the Month': 'Jun 2026', 'Division All-Hands Recognition': 'Jan 2025', 'Annual Special Thanks': 'Jun 2025' };
const AWARD_DETAILS = { 'VP Award': 'Contributions to multimillion-dollar business goals', 'AI Innovator of the Month': 'UI redesign delivered with AI agents', 'Division All-Hands Recognition': 'Quality and process improvement', 'Annual Special Thanks': 'Second consecutive year' };
const awards = [
  ...recognition.filter((r) => AWARD_DATES[r.title]).map((r) => ({ title: r.title, detail: AWARD_DETAILS[r.title] || r.detail, when: AWARD_DATES[r.title] })),
  { title: 'Certificate of Appreciation', detail: 'AI Foundations hackathon leadership', when: 'Aug 2026' },
].sort(newestFirst);

const links = [
  { text: contact.email, href: `mailto:${contact.email}` },
  { text: 'linkedin.com/in/shironigun', href: contact.linkedin },
  { text: 'github.com/shironigun', href: contact.github },
  { text: 'shironigun.github.io', href: 'https://shironigun.github.io' },
];
// The headline matches his LinkedIn headline.
const headline = 'AI Product Analyst | AI product definition, design direction, agent-led prototyping, evaluation and QA leadership';
// The summary sells results (his call, 22 Nov 2026): it opens with an adverb and an action, and never
// names a title, years of experience, the sector, the company, certifications or "I".
const summary = `Consistently delivers clear requirements and AI features that teams can build with confidence, from business problem to release. Spearheaded an AI feature from discovery to pilot, directed AI agents to redesign 7 product areas, and built the method that decides when an AI feature is ready to release. Strengthened release quality with a Quality Gates framework that 3 other teams adopted, followed by about 40% less defect leakage and zero critical defects over 6 sprints. Unified API testing across 5+ teams, placed first among 11 teams in a division-wide AI hackathon, and now leads the QA team into AI-assisted testing.`;
// Projects, newest first by start date; each one sentence or two, a verb first. No product name.
const projects = [
  { name: 'Feature Guides for Dealers', note: 'Customer Documentation', when: 'Nov 2026 - Present', text: 'Structured an 8-page documentation standard and the first complete AI feature guide with the support team; specified a tool that checks each guide against it.' },
  { name: 'Product Promo Films', note: 'Product Marketing', when: 'Nov 2026', text: 'Planned 3 product films for sales and marketing, scripting and art-directing each; 2 released, including a version for an industry expo.' },
  { name: 'Skills Evals Lab', note: 'AI Evaluation Course', when: 'Sep 2026 - Present', text: 'Taught AI evaluation through a 17-lesson course with 6 practical labs; its method scored a QA plugin at 83.3% across 9 evaluations.' },
  { name: 'Subsystem Documentation', note: 'Business Analysis', when: 'Aug 2026 - Present', text: 'Gathered subsystem knowledge into reference manuals and a support runbook, classifying each claim as verified, not yet built or inferred.' },
  { name: 'Claude Code Marketplace', note: 'AI Product and QA Workflows', when: 'Jul 2026 - Present', text: 'Published 7 plugins and 30 skills for QA and product workflows, with approval controls before every write; introduced them to QA analysts in a hands-on workshop.' },
  { name: 'AI QA Workbench', note: 'Cross-Division AI Hackathon', when: 'Jul 2026', text: 'Coordinated 16 specialised AI agents that turn user stories into test cases, automation, pipeline runs and bug reports, in a five-day hackathon.' },
];
// No two bullets, projects or summary sentences may open with the same word.
{
  const openers = [...resumeRoles.flatMap((r) => r.bullets), ...projects.map((p) => p.text), ...summary.split(/(?<=\.) /)].map((t) => t.split(' ')[0].toLowerCase());
  const repeats = openers.filter((w, i) => openers.indexOf(w) !== i);
  if (repeats.length) throw new Error(`Repeated opening words: ${[...new Set(repeats)].join(', ')}`);
}
const dates = (period) => period.replace(' to present', ' - Present').replace(' to ', ' - ');
// Talks and events from the site, newest first, with his role in each. Participation, and the sessions
// already in Experience (domain training, Quality Gates), are left off.
const ROLE = { Talk: 'Speaker', Workshop: 'Presenter', Organised: 'Organiser' };
const TALK_DATES = { 'Postman API testing: proof of concept': 'May 2025' };
const TALK_TITLES = { 'AI workshop on Claude skills': 'AI Workshop on Claude Skills', 'The Lift: Why AI isn’t about 10x': 'The Lift: Why AI Isn’t About 10x', 'Postman API testing: proof of concept': 'Postman API Testing: Proof of Concept' };
const talks = recentEvents
  .filter((e) => ROLE[e.label] && !/Domain training|Quality Gates sessions/.test(e.title))
  .map((e) => ({ title: TALK_TITLES[e.title] || e.title, role: ROLE[e.label], when: TALK_DATES[e.title] || e.when }));
for (const t of talks) if (!/^[A-Z][a-z]{2} \d{4}$/.test(t.when)) throw new Error(`Talk date not "Mon YYYY": ${t.title} (${t.when})`);

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
      <ul class="points">${r.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
    </article>`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Mahmood Ahmad, resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=block" rel="stylesheet">
<style>
@page { size: A4; margin: 10mm 0 9mm; background: ${t.bg}; }
* { box-sizing: border-box; }
html, body { margin: 0; background: ${t.bg}; color: ${t.body}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font: 400 8.9pt/1.35 Inter, system-ui, sans-serif; }
.sheet { padding: 0 12mm; }
a { color: inherit; text-decoration: none; }
h1, h2, h3 { margin: 0; color: ${t.ink}; font-family: 'Schibsted Grotesk', Inter, sans-serif; }
header { display: grid; grid-template-columns: 1fr auto; gap: 6mm; align-items: end; padding-bottom: 4.5mm; border-bottom: 1.5pt solid ${t.accent}; }
h1 { font-size: 25pt; font-weight: 700; line-height: 1.02; letter-spacing: -0.02em; }
.title { margin: 2.2mm 0 0; font: 600 12pt/1.25 'Schibsted Grotesk', sans-serif; color: ${t.accent}; }
.where { margin: 0.8mm 0 0; color: ${t.body}; }
.links { margin: 0; padding: 0; list-style: none; text-align: right; font-size: 8.8pt; line-height: 1.62; }
.links a { color: ${t.ink}; }
.summary { margin: 4.2mm 0 0; font-size: 9.8pt; line-height: 1.55; color: ${t.ink}; }
section { margin-top: 2.4mm; }
h2 { break-after: avoid; display: flex; align-items: center; gap: 3mm; margin-bottom: 1.2mm; font-size: 11.5pt; font-weight: 650; letter-spacing: -0.005em; }
h2::after { content: ''; flex: 1; border-top: 0.75pt solid ${t.line}; }
.role { margin-top: 2mm; }
.roleHead { display: flex; justify-content: space-between; align-items: baseline; gap: 6mm; break-after: avoid; }
h3 { font-size: 10.6pt; font-weight: 650; }
.period { flex: none; font-size: 8.8pt; color: ${t.quiet}; font-variant-numeric: tabular-nums; }
.company { margin: 0.3mm 0 0; font-size: 9pt; font-weight: 500; color: ${t.accent}; break-after: avoid; }
.points { margin: 1.2mm 0 0; padding-left: 4mm; }
.points li { margin: 0.4mm 0; padding-left: 0.6mm; break-inside: avoid; }
.points li::marker { color: ${t.accent}; }
.points strong { font-weight: 600; color: ${t.ink}; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 2mm 9mm; margin-top: 1.4mm; }
.group { break-inside: avoid; }
/* Skills flow down two balanced columns, so a short group never sits beside a tall one's empty space. */
.cols { column-count: 2; column-gap: 9mm; margin-top: 1.4mm; }
.cols .group { margin-bottom: 1.4mm; }
.group b { display: block; font-weight: 600; color: ${t.ink}; }
.list { margin: 1.2mm 0 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5mm 7mm; }
.list.wide { grid-template-columns: 1fr 1fr; }
.list li { display: grid; gap: 0.2mm; padding-top: 0.7mm; border-top: 0.5pt solid ${t.line}; break-inside: avoid; }
.rows { margin: 1.2mm 0 0; padding: 0; list-style: none; }
.rows li { display: flex; justify-content: space-between; gap: 6mm; padding: 0.5mm 0; break-inside: avoid; }
.rows li b { color: ${t.ink}; font-weight: 600; }
.rows .period { flex: none; }
.proj { margin-top: 1.4mm; break-inside: avoid; }
.proj .roleHead b { color: ${t.ink}; font-weight: 600; }
.proj p { margin: 0.3mm 0 0; }
.list li span:first-child { color: ${t.ink}; font-weight: 500; line-height: 1.35; }
.list li span:last-child { color: ${t.quiet}; font-size: 8.4pt; line-height: 1.35; }
.edu { display: flex; justify-content: space-between; align-items: baseline; margin-top: 1.4mm; }
.edu b { color: ${t.ink}; font-weight: 600; }
</style></head>
<body><div class="sheet">
<header>
  <div>
    <h1>${esc(person.name)}</h1>
    <p class="title">${esc(person.title)}</p>
    <p class="where">${esc(headline.split(' | ')[1])}</p>
  </div>
  <ul class="links">${links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.text)}</a></li>`).join('')}</ul>
</header>
<p class="summary">${esc(summary)}</p>

<section><h2>Experience</h2>${resumeRoles.map(role).join('')}</section>

<section><h2>Projects</h2>
  ${projects.map((p) => `<div class="proj"><div class="roleHead"><span><b>${esc(p.name)}</b> | <em>${esc(p.note)}</em></span><span class="period">${esc(p.when)}</span></div><p>${esc(p.text)}</p></div>`).join('')}
</section>

<section><h2>Skills</h2>
  <div class="cols">${skillGroups.map((g) => `<div class="group"><b>${esc(g.group)}</b>${esc(g.items.join(', '))}</div>`).join('')}</div>
</section>

<section><h2>Certifications</h2>
  <ul class="rows">${resumeCerts.map((c) => `<li><span><b>${esc(c.title)}</b>, ${esc(c.issuer)}</span><span class="period">${esc(c.when)}</span></li>`).join('')}</ul>
</section>

<section><h2>Awards</h2>
  <ul class="rows">${awards.map((r) => `<li><span><b>${esc(r.title)}</b>: ${esc(r.detail || '')}</span><span class="period">${esc(r.when)}</span></li>`).join('')}</ul>
</section>

<section><h2>Talks and Events</h2>
  <ul class="rows">${talks.map((e) => `<li><span><b>${esc(e.title)}</b> (${esc(e.role)})</span><span class="period">${esc(e.when)}</span></li>`).join('')}</ul>
</section>

<section><h2>Education</h2>
  <div class="edu"><span><b>${esc(education.degree)}</b>, ${esc(education.school)}</span><span class="period">${esc(dates(education.period))}</span></div>
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
// The light resume is compiled from the LaTeX further down; only the dark one is printed here.
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
// The full resume (two pages is fine). Facts match src/content. Tuned for applicant tracking systems (Nov 2026 research):
//   - single column, standard headings in the usual order: Summary, Experience, Projects, Skills,
//     Certifications, Awards, Talks and Events, Education;
//   - no tables for alignment (title and dates sit on one line with \hfill), no small caps, no icons;
//   - Unicode mapping on pdfLaTeX (glyphtounicode), so the text layer reads back as written;
//   - bullets lead with an action and an outcome backed by a real number;
//   - the summary uses the public title only; the official title is the role name in Experience.
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

// The full lists from src/content: every skill group, every tool group, every certification and award.
const skillTex = skillGroups
  .map((g) => `     \\textbf{${tex(g.group)}}{: ${tex(g.items.join(', '))}}`).join(' \\\\\n');
const certTex = resumeCerts.map((c) => `      \\resumeItem{\\textbf{${tex(c.title)}}, ${tex(c.issuer)} \\hfill ${tex(c.when)}}`).join('\n');
const awardTex = awards.map((r) => `      \\resumeItem{\\textbf{${tex(r.title)}}${r.detail ? `: ${tex(r.detail)}` : ''} \\hfill ${tex(r.when)}}`).join('\n');

const latex = String.raw`%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------
% Mahmood Ahmad's full resume on Jake's template, tuned for applicant tracking systems (single column,
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
\newcommand{\resumeItem}[1]{\item\small{#1 \vspace{-3.5pt}}}
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
\small{${tex(summary)}}

%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart
${resumeRoles.map((r) => `
    \\resumeSubheading
      {${tex(r.role)}}{${range(r.period)}}
      {${tex(r.company)}}{}
      \\resumeItemListStart
${r.bullets.map((b) => `        \\resumeItem{${tex(b)}}`).join('\n')}
      \\resumeItemListEnd`).join('\n')}
  \resumeSubHeadingListEnd

%-----------PROJECTS-----------
\section{Projects}
    \resumeSubHeadingListStart
${projects.map((p) => `      \\resumeProjectHeading
          {\\textbf{${tex(p.name)}} $|$ \\emph{${tex(p.note)}}}{${tex(p.when)}}
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

%-----------TALKS AND EVENTS-----------
\section{Talks and Events}
  \resumeSubHeadingListStart
    \item
    \resumeItemListStart
${talks.map((e) => `      \\resumeItem{\\textbf{${tex(e.title)}} (${tex(e.role)}) \\hfill ${tex(e.when)}}`).join('\n')}
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

// ── The main resume: that .tex compiled with Tectonic, so the site serves Jake's template ──
const texOut = path.join(tmp, 'tex');
fs.mkdirSync(texOut, { recursive: true });
execFileSync('tectonic', ['-X', 'compile', '--outdir', texOut, 'resume/Mahmood_Ahmad_Resume.tex'], { stdio: 'inherit' });
fs.copyFileSync(path.join(texOut, 'Mahmood_Ahmad_Resume.pdf'), 'public/resumes/Mahmood_Ahmad_Resume_Light.pdf');
fs.copyFileSync(path.join(texOut, 'Mahmood_Ahmad_Resume.pdf'), 'public/resumes/Mahmood_Ahmad_Resume.pdf');
console.log('✓ public/resumes/Mahmood_Ahmad_Resume_Light.pdf and Mahmood_Ahmad_Resume.pdf (Jake\'s template)');
fs.rmSync(tmp, { recursive: true, force: true });
