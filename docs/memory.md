# Working memory

What Claude has learned while building this portfolio with Mahmood: how to describe him, the rules for content, his design taste, how he likes to work, and what is still open. **A new session should read this first**, then [decisions.md](decisions.md) for the full decision log.

> **Public repo.** This is the public-safe version. The product's name, private personal notes and recruiter-only details are left out on purpose. The complete version is `docs/private/memory-full.md`, which git ignores; copy it across with the rest of `docs/private/`.

## How to describe him

- **A product person.** Business analyst, associate product owner and "AI Product Analyst" (the public title). The HR title, Product Quality Analyst, appears only in experience. Leading the QA team is one of his responsibilities, not his identity.
- **Order of emphasis:** product, then design, then AI, then quality.
- **One title, six roles:** business analyst, operator and strategist, design collaborator, AI prototyper, QA lead, Scrum master.
- **Open to:** Product Owner, Product Analyst and AI Product Manager roles (this is public on the site).
- **Employer:** Perseus Group, part of Constellation Software (Contour Software where a company line needs it). The product is "enterprise dealership SaaS": customer engagement, messaging, a mobile app and AI features for automotive, agricultural and equipment dealerships, in a 200+ person division. **Never name the product**; it makes him look like a one-product person.
- **He builds by directing AI agents.** He decides, specifies and reviews; Claude Code writes the code. Never list programming languages or frameworks as his skills. Tools to credit: Claude Code, Claude Skills and Plugins, Claude Artifacts, MCP, Figma Make, Playwright (as a tool he directs).
- **Product voice, not developer voice.** Use "led", "introduced", "shaped", "specified", "had AI agents build". Avoid "I build", "coded", "rebuilt through agentic coding".
- **Exact ownership:** led Promise Tracker’s product definition (heading to production; the developers build it); assisted on an AI campaign-planning feature; introduced the design phase; led the UI revamp of 7 product areas; designed Quality Gates; created the QA Engineering Plugin; organised the AI Foundations hackathon. He **contributed to** the public knowledge base through training and knowledge transfer; he did **not** write it. He took over QA mid-release when the senior QA left; he shaped the 2026 roadmap structure with the Product Owner.

## Content rules

The full list is [content/content-rules.md](content/content-rules.md). The ones that matter most:

- **Never say where he is based**: no city, country, region, time zone or local clock, anywhere (site, docs, alt text, meta tags). The university name stays as a credential.
- **No internal detail:** version numbers, test or dev environments, internal counts, ticket IDs, partner or integration names, dealer data, pricing, security findings, and colleagues' names (except the verbatim testimonials).
- **Testimonials are verbatim and complete.** Never trim or reword them.
- **Professional, plain wording.** Real numbers matter, rounded down. Check every verb against what he actually did.
- **Copy style:** no em dashes, no AI stock words; LinkedIn drafts are checked with the humanizer (PASS at 70+).

## LinkedIn

Drafts are in `docs/private/linkedin/` (not in git), including `profile-update.md`.

- The headline and the opening of the About never label him QA. His QA history elsewhere (experience, "I moved from QA into product") is true and fine.
- The headline isn't tied to one feature, one tool or QA.
- "User stories" reads dated; keep it out of the headline and About.
- Company projects: say only what he did and the problem it solved, nothing further. No feature internals, per-feature numbers, data volumes, architecture or defects. His own open-source work is his to describe in full.
- Hours are his working hours: Monday to Friday, 8 hours a day, weekends off. Each title at Perseus Group has its own live figure, plus an overall total (`src/content/hours.js`). Never hardcode an hours figure.
- Numbers matter: ~40% less defect leakage, the live training hours, 1st of 11 teams, 30 skills across 7 plugins, 9 briefs and 9 demos, a 183-page handbook.
- The About is enterprise-level and selling, and covers the whole journey (UX intern 2021, WordPress designer, SQA, then product and AI), the projects, wins and current interests, within 2,600 characters.

## Design taste

- **Wants rich, experience-led pages.** Rejects plain listings and tables, walls of text, and generic card-heavy layouts.
- **What landed:** product-tool metaphors (Projects as a full-width kanban board with a ticket popup and a quarter roadmap; About as a profile record with a sticky panel and tabs), case studies as real articles, documents at the top of a page, clearly separated categories.
- **Rejected:** dark backgrounds with neon and terminal styling (July 2026); the "Quiet Gallery" serif direction (superseded); a card-heavy About redesign (November 2026).
- **Current direction, "Launch":** warm near-white, one cobalt accent (#2446DB), Schibsted Grotesk and Inter, a dark mode, and the rope agent on every page.
- When a design misses, offer two or three distinct directions with previews and let him pick.
- Take inspiration from tools he uses (Azure DevOps boards, for example) but never copy their content or any employer data.

## How he works

- Short, direct requests. "Push to main" means commit and publish; otherwise don't commit or push.
- Check changes in the browser (desktop, phone, light and dark) before calling them done.
- Prefers action to questions, except for genuine taste decisions.
- Keep the docs current: [decisions.md](decisions.md), [content/about-mahmood.md](content/about-mahmood.md) and the [site guide](design/site-guide.md).

## Open items

- Confirm two inferred quarter ranges on the Projects board: product decisions (Q1 to Q4 2026) and promo films (Q3 to Q4 2026).
- Dates still needed in [content/journey-inputs.md](content/journey-inputs.md): VP Award, AI Innovator of the Month, Division All-Hands Recognition, Annual Special Thanks, and several approximate months.
- The public knowledge base link points at a domain that contains the product's name.
- Deep links such as `/projects` are served with HTTP 404 by the GitHub Pages fallback, although they render normally.
- His LinkedIn may still list tools he asked to keep off the portfolio (Visio, Power BI, SQL, Python); he may want to update it.
