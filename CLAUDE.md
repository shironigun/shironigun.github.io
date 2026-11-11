# Mahmood Ahmad's portfolio

The portfolio at [shironigun.github.io](https://shironigun.github.io): React 19, Vite 6, CSS Modules and a small history-API router. GitHub Pages serves `main`.

## Read first

1. [docs/memory.md](docs/memory.md): what earlier sessions learned (how to describe him, the content and LinkedIn rules, his design taste, how he works, open items).
2. [docs/content/content-rules.md](docs/content/content-rules.md) before writing any copy.
3. [docs/decisions.md](docs/decisions.md) for why things are the way they are, and the [site guide](docs/design/site-guide.md) for how the site is built and where content lives.

If `docs/private/memory-full.md` exists on this machine, read it too. It is the unedited memory and is git-ignored.

## Rules that are easy to break

- **The repo is public.** Never commit personal information or anything from `docs/private/`.
- **Never say where he is based**: no city, country, region, time zone or local clock.
- **Never name the product,** except where he has approved it. Say "enterprise dealership SaaS at Perseus Group, part of Constellation Software". Two exceptions: the verbatim testimonials, and the promo films and their pages, which show **TargetCRM** and say it is also offered as **Notify360** (approved 11 Nov 2026).
- **He is a product person.** Lead with product, then design, then AI, then quality. Use product voice: he decides, specifies and reviews, and AI agents write the code. Never list programming languages as his skills.
- **No overclaims.** Check every verb against [docs/content/about-mahmood.md](docs/content/about-mahmood.md). For example, he contributed to the public knowledge base; he did not write it.
- **Testimonials stay verbatim and complete.**
- **Commit or push only when he asks.** "Push to main" means commit and publish.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173 (also ".claude/launch.json", entry "dev")
npm run build    # dist/, plus dist/404.html for GitHub Pages
```

Publish by pushing to `main`; the **Deploy to GitHub Pages** workflow runs on every push. With several `gh` accounts on the machine, push as `shironigun`:

```bash
GH_TOKEN="$(gh auth token --user shironigun)" git -c credential.helper= -c "credential.helper=!gh auth git-credential" push origin HEAD:main
```

Before publishing, check changes in the browser at desktop and phone widths, in light and dark mode, and run the production build. For a full sweep, see `scripts/qa-sweep.browser.js` (described in the site guide).

## Keep the docs current

When content changes, update [docs/content/about-mahmood.md](docs/content/about-mahmood.md). Record new decisions in [docs/decisions.md](docs/decisions.md) with the reason. When you learn something new about how he wants things done, add it to [docs/memory.md](docs/memory.md), keeping that file public-safe.
