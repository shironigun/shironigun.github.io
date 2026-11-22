# Working memory

What Claude has learned while building this portfolio with Mahmood: how to describe him, the rules for content, his design taste, how he likes to work, and what is still open. **A new session should read this first**, then [decisions.md](decisions.md) for the full decision log.

> **Public repo.** This is the public-safe version. The product's name, private personal notes and recruiter-only details are left out on purpose. The complete version is `docs/private/memory-full.md`, which git ignores; copy it across with the rest of `docs/private/`.

## How to describe him

- **A product person.** He does the team's business analysis and product work alongside the Product Owner; "AI Product Analyst" is the public title. **Never claim a title he doesn't hold** (his rule, 21 Nov 2026): no "associate product owner", and "business analyst" only as the work ("business analysis"), never as his title. His 2025 hackathon roles (Product Owner, Scrum Master, QA lead) are facts of that event and stay. The HR title, Product Quality Analyst, appears only in experience. Leading the QA team is one of his responsibilities, not his identity. Say "leading the QA team": never "report to me" and never the team size (his rule, 21 Nov 2026; he found it rude and self-centred).
- **Order of emphasis:** product, then design, then AI, then quality.
- **One title, six roles:** business analyst, operator and strategist, design collaborator, AI prototyper, QA lead, Scrum master.
- **Open to:** Product Owner, Product Analyst and AI Product Manager roles (this is public on the site).
- **Employer:** Perseus Group, part of Constellation Software, on every company line, and no other company name (his instruction, 21 Nov 2026). The product is "enterprise dealership CRM" (never "SaaS", 22 Nov 2026): customer engagement, messaging, a mobile app and AI features for automotive, agricultural and equipment dealerships, in a 200+ person division. **Never name the product**; it makes him look like a one-product person.
- **He builds by directing AI agents.** He decides, specifies and reviews; Claude Code writes the code. Never list programming languages or frameworks as his skills. Tools to credit: Claude Code, Claude Skills and Plugins, Claude Artifacts, MCP, Figma Make, Playwright (as a tool he directs).
- **Product voice, not developer voice.** Use "led", "introduced", "shaped", "specified", "had AI agents build". Avoid "I build", "coded", "rebuilt through agentic coding".
- **Exact ownership:** led Promise Tracker’s product definition (heading to production; the developers build it); assisted on an AI campaign-planning feature; introduced the design phase; led the UI revamp of 7 product areas; designed Quality Gates; created the QA Engineering Plugin; organised the AI Foundations hackathon. He **contributed to** the public knowledge base through training and knowledge transfer; he did **not** write it. He took over QA mid-release when the senior QA left; he shaped the 2026 roadmap structure with the Product Owner.

## Content rules

The full list is [content/content-rules.md](content/content-rules.md). The ones that matter most:

- **Never say where he is based**: no city, country, region, time zone or local clock, anywhere (site, docs, alt text, meta tags). The university name stays as a credential.
- **No internal detail:** version numbers, test or dev environments, internal counts, ticket IDs, partner or integration names, dealer data, pricing, security findings, and colleagues' names (except the verbatim testimonials).
- **Testimonials are verbatim and complete.** Never trim or reword them.
- **Professional, plain wording.** Real numbers matter, rounded down. Check every verb against what he actually did.
- **Spell it "resume", in plain letters, never with accents** (his call, 20 Nov 2026, repeated 21 Nov): on the site, on LinkedIn, in the docs, in code comments and in chat.
- **Copy style:** no em dashes, no AI stock words; LinkedIn drafts are checked with the humanizer (PASS at 70+).

## LinkedIn

Drafts are in `docs/private/linkedin/` (not in git), including `profile-update.md`.

- The headline and the opening of the About never label him QA. His QA history elsewhere (experience, "I moved from QA into product") is true and fine.
- The headline isn't tied to one feature, one tool or QA.
- "User stories" reads dated; keep it out of the headline and About.
- Company projects: say only what he did and the problem it solved, nothing further. No feature internals, per-feature numbers, data volumes, architecture or defects. His own open-source work is his to describe in full.
- Hours are his working hours: Monday to Friday, 8 hours a day, weekends off. Each title at Perseus Group has its own live figure, plus an overall total (`src/content/hours.js`). Never hardcode an hours figure.
- Numbers matter: ~40% less defect leakage, the live training hours, 1st of 11 teams, 30 skills across 7 plugins, 9 briefs for 10 participants and 10 demos, a 183-page handbook.
- The About is enterprise-level and selling, and covers the whole journey (UX intern 2021, WordPress designer, SQA, then product and AI), the projects, wins and current interests, within 2,600 characters.
- **Never notify his network** (21 Nov 2026): keep "Notify network" off on every edit form and check it before each save; the account setting "Share profile updates" is off. He doesn't want a string of update notices. After saving a role, LinkedIn may open a "Post now" share page: always click Dismiss.
- **Each experience shows the full scope of his work** (21 Nov 2026): every verified fact that fits, strongest first, with a verified result in each bullet. LinkedIn counts a Unicode-bold letter as 2 characters, so count UTF-16 length before pasting. What doesn't fit in 2,000 characters goes on a media card for that role.
- **About stays concise and structured** (21 Nov 2026): the version with bold section headings and short bullets is the one he likes. Improve it by making lines concrete (what a feature does, how many, what changed), not by adding sections; a story-led rewrite with the whole career in it read "like the whole resume" and was rolled back.
- **Blank lines on LinkedIn:** the About and Highlights editors drop empty lines from pasted text. Paste one section at a time and press Enter twice between sections; reopen the form to check the empty paragraphs were kept.
- **Company on LinkedIn:** all three Perseus roles sit under the "Perseus Group, Constellation Software" company page, and the honors are issued by Perseus Group.

## Resume

Built by `node resume/build.mjs` from `src/content`; never edit the PDFs or the `.tex` by hand. The [site guide](design/site-guide.md) has the details.

- **Template:** Jake's Resume (Overleaf), generated as `resume/Mahmood_Ahmad_Resume.tex` and compiled with Tectonic. Every Resume button opens that PDF. The dark PDF is still printed from HTML.
- **ATS first:** one column; standard headings in this order: Summary, Experience, Projects, Skills, Certifications, Awards, Talks and Events, Education. Contact details go in the body. No tables for alignment, no small caps, no icons. Keep ligatures off so words like "official" extract letter by letter.
- **Summary uses the public title only:** "AI Product Analyst", never the official title in brackets (his call, 20 Nov 2026, repeated 22 Nov). The official title, Product Quality Analyst, is the role name in Experience.
- **The summary sells him** (22 Nov 2026): why a company should hire him, covering everything he can do. Never the current company, never "I"; action words and adverbs. It sells results in implied first person, past tense ("Delivered AI features…", never "Consistently delivers"), opening with the most eye-catching result of his own work; no awards or competition wins in the summary, and never says "SaaS", years of experience, "AI Product Analyst" or certifications.
- **Experience is plain bullets** (22 Nov 2026): no bold label before each bullet. One or two lines, a strong verb first, past tense, written in `BULLETS` in `resume/build.mjs`. The site's About page keeps its labelled highlights.
- **Action words** (22 Nov 2026): every bullet, project line and summary sentence opens with a different word from his 100 action words list (Interviewology), never repeated; build.mjs fails on a repeat. Skip list words that would overclaim (Transformed, Maximized, Lobbied). Date ranges use a plain hyphen, "Jan 2026 - Present".
- **Dates are right-aligned everywhere, in one format** ("Mon YYYY", "Mon YYYY – Present"), including certifications, awards and talks. Nothing is repeated across sections. British spelling throughout.
- **External audits** (ChatGPT, Gemini, Resume Worded) are useful for consistency and phrasing, but they overclaim ("reduced defect leakage by 40%", "deterministic", "open-source", "drove adoption"). Apply only what `docs/content/about-mahmood.md` supports.
- **Talks and Events** come from `events` in `src/content/achievements.js`, newest first, one line each with his role in brackets (Speaker, Presenter, Organiser). Participation, and sessions already in Experience, are left off. The hackathon win is in Experience only.
- **Two pages, not one.** The resume keeps a focused skills list and the professional certifications (the site keeps the full lists). Don't cut it to fit one page.
- **Project preview images** (21 Nov 2026): every project has a 1200x627 card at `public/images/previews/<slug>.png`, rendered from the hidden `/og/<slug>` page (`src/pages/OgCard.jsx`) by `node scripts/og-images.mjs` with the dev server running. `npm run build` then writes a real page per case study (`scripts/route-pages.mjs`) carrying its own title, description and preview, so links return 200 and LinkedIn shows the card. After changing a project's name, summary, number or picture, re-run the script and bump `VERSION` in route-pages.mjs. Never put a figure on a card that isn't that project's own. Previews are glanced at: name, one number and the picture only, the project's own distinct colour fading in from the right (his feedback, 21 Nov 2026). After pushing new images, re-run LinkedIn's Post Inspector on each linked page; Beacon's card is an uploaded image and must be replaced by hand. The same images are the pictures on the portfolio's project cards (Home, Case studies) and in the Projects board popup (`previewOf` in `ProjectCard.jsx`; bump its `?v=` with the others).
- **LinkedIn preview of the resume link:** `public/resume/index.html` sets the preview tags. LinkedIn caches the image by its address, so bump the `?v=` date on `og:image` whenever the resume changes, push, run LinkedIn's Post Inspector on https://shironigun.github.io/resume/, then re-add the Featured card.
- **Experience starts at SQA Trainee.** The resume leaves out the UX internship and the WordPress role. The portfolio keeps the whole journey.
- **Never a phone number or a location.** Keep Power BI, Visio, SQL and Python off the tool lists.
- **Bullets lead with an action and an outcome**, backed by a real number where there is one.
- **Check what a parser sees** after every change, with `pdftotext -enc UTF-8 -layout public/resumes/Mahmood_Ahmad_Resume.pdf -`.

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
- Dates still needed in [content/journey-inputs.md](content/journey-inputs.md): several approximate months. (The four honors got their dates from his LinkedIn on 20 Nov 2026.)
- The public knowledge base link points at a domain that contains the product's name.
- Deep links such as `/projects` are served with HTTP 404 by the GitHub Pages fallback, although they render normally.
- His LinkedIn may still list tools he asked to keep off the portfolio (Visio, Power BI, SQL, Python); he may want to update it.
- **Professional, never self-centred** (21 Nov 2026): no "my team", "the team I lead", "report to me" or headcounts; never describe colleagues as manual testers, non-IT hires, hesitant or careless; no "solo" credit or superlatives ranking colleagues' products. Credit the work ("How Quality Gates cut…"), not "How I…". He calls any of these a red flag.
- **Show strengths, not stopgaps** (21 Nov 2026): never list covering a vacancy, taking over after someone left, or "no handover" as achievements. They expose internal gaps and colleagues. Prefer real counts (120+ sessions) over calculated hours as a headline.
- **Recruiter and HR read** (21 Nov 2026): tell a hard situation as opportunity, action, result, never as the company or colleagues failing; never describe colleagues by skill level; soften every claim to what about-mahmood.md supports (in pilot, by my own tracking, adopted on his recommendation); no absolutes like every, first, best, never.
- **Colour taste** (21 Nov 2026): enterprise and calm. Avoid pastel pinks, magentas and violets together on one page (he called it "colory in a feminine way"); prefer blues, steel, teal and green, with amber for awards; low saturation, faint washes.
