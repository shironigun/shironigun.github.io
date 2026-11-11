# Portfolio docs

Everything behind the portfolio at [shironigun.github.io](https://shironigun.github.io): what was decided, how the site works, and the full career record the site draws from.

> **This repository is public.** Anything committed here can be read on GitHub, even if the site never shows it. Keep personal information in `docs/private/`, which git ignores.

| Document | What it holds |
|---|---|
| [memory.md](memory.md) | Claude's working memory, public-safe: how to describe him, content and LinkedIn rules, design taste, how he works, open items. Read first in a new session |
| [decisions.md](decisions.md) | Every design, content and engineering decision, with the reason |
| [content/about-mahmood.md](content/about-mahmood.md) | The full career record: roles, projects and ownership, events, recognition, certifications, testimonials |
| [content/content-rules.md](content/content-rules.md) | What may and may not appear on the site or in this repo |
| [content/journey-inputs.md](content/journey-inputs.md) | Journey dates and entries still to collect, with the entry template |
| [design/site-guide.md](design/site-guide.md) | How the site is built: tokens, pages, components, the document viewer, the rope agent, adding content, QA |
| `private/working-notes/` (not in git) | The old site content (`context/`) and the November 2026 redesign brief and R&D notes. Kept on his machine only, because they hold internal detail; the decision log is current |
| `private/` (not in git) | Personal information and private notes; also `blocked-words.txt` (the words the QA sweep must never find), the LinkedIn drafts, and `memory-full.md` (the unedited working memory) |

## Continuing on another machine

1. Clone the repo and run `npm install`, then `npm run dev` (http://localhost:5173). Run, build, deploy and the push command are in the [site guide](design/site-guide.md#run-build-deploy).
2. **Copy `docs/private/` across by hand** (a USB drive or private cloud folder, never git: the repo is public). It holds the LinkedIn drafts and videos (`docs/private/linkedin/`), `blocked-words.txt` (which the QA sweep needs) and `memory-full.md`, the unedited working memory.
3. Read this folder in order: [memory.md](memory.md) first (Claude Code picks it up through the root `CLAUDE.md`), then [decisions.md](decisions.md) for what was decided and why, [content/content-rules.md](content/content-rules.md) before writing anything, then the [site guide](design/site-guide.md).

### Where things stand (November 2026)

- **Pages:** Home, Projects (kanban board, quarter roadmap and project popup at `/projects`; `/work` redirects), Case studies (each one an article, documents at the top), Journey (Recognition, then a timeline filtered by Roles, Projects, Achievements, Certifications, Talks, Workshops, Courses and Events; `/achievements` redirects here), About (a profile record with tabs), How I work, Contact.
- **Content voice:** product person, not developer. He decides, specifies and reviews; AI agents write the code. He contributed to the public knowledge base through training and knowledge transfer; he did not write it.
- **Dates:** project periods and quarters come from the pre-redesign codebase (commit 7eb3a5a) and his project repos' commit history. Two quarter ranges are inferred and still need his confirmation: product decisions (Q1 to Q4 2026) and promo films (Q3 to Q4 2026).
- **Open items:** the dates in [content/journey-inputs.md](content/journey-inputs.md) (VP Award, AI Innovator of the Month, Division All-Hands Recognition, Annual Special Thanks, and several approximate months); the public knowledge base link points at a domain that contains the product name; deep links such as `/projects` are served with HTTP 404 by the GitHub Pages fallback, although they render normally.

## Keeping the docs current

- When content changes on the site, update `content/about-mahmood.md` too, so the docs stay the complete record.
- When a decision changes, add it to `decisions.md` with the reason, rather than editing history away.
