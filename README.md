# Mahmood Ahmad — Portfolio v3

Personal portfolio at [shironigun.github.io](https://shironigun.github.io). React 19 + Vite, no UI library, deployed to GitHub Pages. Designed and built by directing AI agents with Claude Code.

## Run locally

```bash
npm install --legacy-peer-deps
npm run dev
```

Opens at http://localhost:5173.

## Build

```bash
npm run build
```

Outputs to `dist/` and copies `index.html` to `404.html`, so GitHub Pages serves deep links such as `/case-studies/promise-tracker`. Pushing to `main` deploys via `.github/workflows/deploy.yml`.

## Where things live

```
src/
├── content/          All copy and data: site, projects, profile, method, writing
├── components/       Nav, Footer, PageHeader, CtaBand, Blocks, WorkIndex, PromisePanel, Status, Icons
│   └── visuals/      Animated explainers: QA loop, idea-to-launch journey, audit switch, agent pipeline, design review
├── pages/            Home, Work, CaseStudies, Project, Journey, About, Achievements, HowIWork, Article, Contact, NotFound
├── lib/              Router and hooks (in-view, reduced motion)
└── styles/base.css   Design tokens and base styles
public/               Résumés, certificates, testimonial photos, llms.txt
docs/private/         Working notes and personal files (git-ignored, never pushed)
```

**Pages:** `/`, `/work` (all projects), `/case-studies`, `/case-studies/:slug` (one per project with a `page` in `src/content/projects.js`; old `/work/:slug` links still resolve), `/journey`, `/achievements`, `/about`, `/how-i-work`, `/writing/:slug` (articles, linked from How I work), `/contact`.

**Adding a project:** add an entry to `src/content/projects.js`. Give it a `page` with `blocks` (text, visual, steps, checks, cards, stats, who, code, insights, related) to get a full case study, or `details` for an index-only entry. No layout code is needed.

Content rules (no invented numbers, exact ownership and status words, nothing confidential) are at the top of each content file. The design principles and their audit are in [docs/redesign/design-principles.md](docs/redesign/design-principles.md).
