# Site guide

How the portfolio is built and how to change it. For why things are the way they are, see the [decision log](../decisions.md).

## Run, build, deploy

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/, plus dist/404.html for GitHub Pages
```

GitHub Pages serves the `main` branch: every push to `main` runs the **Deploy to GitHub Pages** workflow, and the site is live a minute or two later. Work locally on any branch and push it to `main` to publish.

Pushing as the `shironigun` GitHub account when the machine has several `gh` accounts:

```bash
GH_TOKEN="$(gh auth token --user shironigun)" git -c credential.helper= -c "credential.helper=!gh auth git-credential" push origin HEAD:main
```

`.claude/launch.json` holds the dev-server entry (`dev`, port 5173) for previewing in the Claude desktop app.

## Design tokens

Defined in `src/styles/base.css`.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#FAFAF7` | Page background |
| `--ink` | `#14161B` | Text, outlines |
| `--cobalt` | `#2446DB` | The only brand colour: links, markers, accents |
| `--night` | `#14161B` | Dark bands: journey timeline, call to action, footer |
| `--cobalt-on-night` | `#A9B8F8` | Accent on dark |
| `--c-product`, `--c-design`, `--c-ai`, `--c-quality`, `--c-personal` | `#2446DB`, `#7A3FD1`, `#0B7A6E`, `#A35C00`, `#5B6070` | Discipline colours: project cards, tags, the project popup and the event tickets (`laneVar` in `board/model.js` picks one) |
| `--font-display` | Schibsted Grotesk | Headings |
| `--font-body` | Inter | Text |

Dark mode redefines the tokens under `:root[data-theme='dark']` in the same file. Use `--cobalt-text` for cobalt text (it lightens in dark mode), `--on-ink` for text on an ink-coloured chip, and `--dot` for dot grids. The theme helper is `src/lib/theme.js`; the toggle lives in `Nav`.

Layout: `.container` is 1240 px wide plus gutters (`clamp(20px, 3vw, 40px)`). Inner pages alternate band colours by section.

## Pages

| Route | Header illustration | What it holds |
|---|---|---|
| `/` | none (the rope agent is the visual) | Hero with his cut-out photo, recognition, highlights, Selected work (the diagram carousel with its slide list), talks and events band (event tickets that open their project in the project popup), six roles, journey timeline, featured case studies, achievements glance, operating model, testimonials |
| `/projects` (old `/work` links redirect) | Sprint board, one card moving | A full-width projects board: kanban columns by workflow state, cards with a headline number, owner, tags and a quarter strip; a Roadmap tab with lanes by discipline and quarters by year. Any card opens the project in a popup (arrow keys step through, `/projects#slug` links straight to one) |
| `/case-studies` | Case files under a magnifier | Long-form case studies, filterable |
| `/case-studies/:slug` | By first tag: AI neural network, Quality gates, Design wireframe, Product roadmap | An article: headline, standfirst, the documents it produced (first thing a reader can open), byline with role, period and reading time, then prose sections with figures, photos (open full size), tables and pull quotes. From 1,200 px the chapter list sticks beside the story; from 1,500 px it reads in three columns: every case study, the story, and the illustration with its chapters |
| `/journey` (old `/achievements` links redirect) | Winding path with milestones | Recognition (undated awards), then every typed node since 2021, filterable: roles, projects, achievements, certifications, talks, workshops, events and courses |
| `/about` | Skills radar | A profile record: a sticky panel (avatar, title, key fields, open-to-roles status, discipline tags, email, LinkedIn, résumé) and tabs: Overview (summary, headline numbers, product, activity from the journey highlights), Experience (career bar, expandable role records), Roles and skills (four pillars, skill and tool chips), Recognition (awards, certifications, education). The tab is kept in the hash (`/about#experience`). Testimonials follow below |
| `/how-i-work` | Pipeline lighting stage by stage | Operating model, requirements example, design review, AI practice, principles, articles |
| `/contact` | Signal ripples | Contact options and a hiring-manager panel |
| `/writing/:slug` | Lines of text | Articles |
| anything else | Disconnected nodes | Not found |

Every page except Contact ends with the call-to-action band, then the footer.

## Components

| Component | Notes |
|---|---|
| `Nav` | Sticky header with a reading-progress bar; résumé opens in the viewer |
| `PageHeader` | Breadcrumbs, title, lead, optional `art` illustration |
| `HeaderArt` | The per-page illustrations; paused off screen, still under reduced motion |
| `WorkCarousel` | Node diagrams, 3 s auto-advance, pause on hover, AI agents slide first (`src/content/workSlides.js`); takes `index`, `onIndexChange` and `hold` so the Selected work list on the home page can drive it |
| `Testimonials` | Every verbatim quote side by side from 1,440 px; below that, one per slide, 8 s, pause on hover |
| `CareerTimeline` | Journey highlights on Home |
| `OperatingModel` | The six-stage model on How I work |
| `ArticleBody` | Renders a case study article: sections at each h2, paragraphs, lists, figures, photos, tables, quotes |
| `ProjectBoard` + `board/` | The Projects page: kanban board and quarter roadmap (`board/model.js`), card parts and quarter strips (`board/parts.jsx`), the project popup (`board/ProjectDialog.jsx`, also opened by the home page's event tickets) |
| `DocumentViewer` + `PdfStage` | In-site viewer for every PDF and image document (`DocButton`) |
| `CtaBand`, `Footer` | Closing call to action and the dark footer |
| `RopeAgent` + `AgentFigure` | The rope agent (below) |

## Motion rules

- One scroll reveal for sections (`src/lib/reveal.js`); add `data-reveal="off"` to opt out.
- Illustrations pause when off screen.
- Everything respects `prefers-reduced-motion`.
- Text is not selectable anywhere (`user-select: none` on `body`); form fields are the exception.

## Document viewer

`DocButton` opens any PDF or image in a dialog. PDFs use react-pdf 11 (pdf.js 6.3):

- Reading mode scrolls every page and draws only those near the screen.
- Contents panel (from the PDF outline), page-number box, zoom from 50% to 200%, Present mode, and Download when `download` is set.
- Keys: arrows and Page Up/Down change page, Home/End jump, +/− zoom, Escape closes (or leaves Present).
- The worker, character maps, fonts and decoders are self-hosted. In development a Vite middleware serves them from `node_modules/pdfjs-dist`; at build they are copied to `dist/pdfjs/`.

## The rope agent

Lives in the app shell (`src/App.jsx`), so it appears on every page. Code: `src/components/RopeAgent.jsx` (behaviour), `AgentFigure.jsx` (drawing), `RopeAgent.module.css`. Lines: `src/content/agent.js`.

**Placement.** It hangs in the free strip left of the content. Its size comes from the strip width, and it is hidden when the strip is too narrow (below 1,100 px). The rope runs from under the header; its length follows scroll progress, from 24% to 60% of the window height.

**Always-on behaviour.**

| Trigger | Reaction |
|---|---|
| Page load | Drops in, waves, says “Hi!” |
| Scrolling | Rappels with the page; swings when the scroll speeds up or stops; “whee” on a fast scroll down, surprised on a fast scroll up |
| Pointer | Eyes follow it; star eyes over any button |
| Hover | Happy face, lets go with one hand to wave (in dark mode: a “Boo!”, at most every 12 s) |
| 15 s idle | Falls asleep (z’s); wakes with a start. In dark mode every other quiet spell is a scare instead |
| Theme switch | To dark: “Who turned off the lights?”, hides to just his eyes, jumps out with “BOO!”. To light: squints, “Ah! Too bright!” |
| Dark background | Outline, limbs and rope turn light over any dark section or in dark mode; eyes glow in dark mode |
| Scroll settles beside a section | Says that section’s line, once per section per visit, at most one line every 5 s |

**His break.** Left alone for 3 s (no pointer movement, scrolling or typing) while on his rope, he says he is off ("Stretch break!"), swings onto the left wall, climbs down hand over hand and hops to the floor at the bottom of the window. His rope stays hanging where he left it. Then he does 4 to 6 activities, each picked at random and never twice in a row, before climbing back up on his own; after that he stays on the rope for at least 25 s.

| Activity | What he does |
|---|---|
| Directing agents | Three mini AI agents pop up and trail behind him as he walks, then hop when he stops ("I direct. The agents build.") |
| Roadmap | Puts up three sticky notes above his head, left to right: Now, Next, Later ("Now, next, later. Sorted.") |
| Sketch | Reaches out and a wireframe draws itself beside him ("Sketch it before we build it.") |
| Promo film | Raises a clapperboard, claps it ("Action!"), walks a slow tracking shot ("Cut! That's the one.") |
| Handbook | Sits down with an open book whose pages turn ("Page 92 of 183. Good handbook.") |
| Trophy | Raises the hackathon trophy with star eyes and two hops ("First of eleven teams!") |
| Stroll | Walks 180 to 520 px towards the side with more room, sometimes with a line ("Walking the roadmap.") |
| Hop, dance | Two hops ("Promoted in under two years. Boing!"); a side-to-side dance with arms up ("Launch day dance!") |
| Sit, nap | Sits for a few seconds; after 30 s without pointer movement he may nap instead ("Five more minutes…") |
| Peek | Climbs the nearer wall to 42% of the window height for the big picture, then jumps down |
| Away | Walks off the right edge "to check the other screens" and comes back in from the left |

His games act out Mahmood's current work (directing AI agents, roadmaps, design first, the promo films, the Claude handbook, the hackathon win), never QA chores. In development, `window.__rope.play('crew')` runs any one of them on demand (`crew`, `roadmap`, `sketch`, `film`, `read`, `trophy`, `stroll`, `hop`, `dance`, `sit`, `peek`, `away`, `comment`).

| While on his break | Reaction |
|---|---|
| A fast swipe of the pointer near him (over 1.4 px/ms within 120 px) | Dodges 180 px, laughing ("Can't catch me!"); at most every 2.5 s |
| A slow approach, hovering him | Waves from the floor ("Hi down here!"), at most every 8 s |
| A click | "Break's over? Fine.", walks to the left wall, climbs up and grabs his rope again |
| Scrolling | Someone is reading: he walks into the nearest side lane, sits, and carries on 6 s after the scrolling stops |
| A page change | Carries on where he is ("New page! Let's look around."); the jump to the top of the new page doesn't count as scrolling |
| A reload in the same tab | Starts on the floor where he was ("Still down here. Hi again!"); his state is kept in `sessionStorage` for 30 minutes |

While walking, kicking or climbing a wall he is drawn side-on, a three-quarter view facing where he is going (his face screen turned that way, an ear bolt on the far side of his head, a near and a far arm and leg; mirrored to face left). Climbing, he faces the wall with his hands on it. Standing, sitting, waving, hopping and dancing he faces the viewer.

Reduced motion, or a window too narrow for him, keeps him on his rope.

**Clicks.** Every part of him is clickable. On the head, one unhurried click waits 300 ms and then he says a fact about Mahmood (`facts` in `src/content/agent.js`); clicks under 300 ms apart count towards the animations below. A pause of 3.5 s ends a streak.

| Part | Reaction |
|---|---|
| Hand | Lets go with that hand and shakes it, wincing; three quick clicks and he falls (“No hands? Bad idea!”) |
| Legs | Ticklish kicks and a swing; four quick clicks leave him dizzy |
| Belly | “Hehe!”, then “Haha, stop!”, then laughing so hard one hand slips; a fourth quick tickle and he falls laughing |

Head clicks:

| Click | Reaction |
|---|---|
| 1, unhurried | A short, funny fact about Mahmood |
| 2 quick | Heart eyes and a sweet line; a little hop |
| 3–5 quick | One hand slips off and flails, shaking, stressed brows and sweat; slides down the rope a bit each time; “Hey! Watch it!”, “I’m slipping!”, “Seriously, stop!”. After a pause: “Phew.” |
| 6 quick | Falls (“Waaah!”), catches the left wall (“Got the wall!”), climbs, regrabs the rope and climbs back up (“Made it. Please don’t do that again.”) |
| Click while on the wall | Drops to the floor (“Nooo!”), stunned for 2 s (X eyes, cracked flickering screen, circling stars), self-repair scan (“Running self-repair…”), then sits with arms crossed and a band-aid: “You’re not very nice.” |
| Clicks while sulking | “Not talking to you.”, “Hmph.”, “Still mad.”, “…” Each click restarts the 12 s sulk |
| 12 s without clicks | “Fine. I forgive you.”, walks under the rope, the rope lowers, he is pulled back up: “Back to work!” |

**Speech timing.** Lines type out at a talking pace while his mouth moves, then stay up for 50 ms per character (1.4 to 4.2 s). Section comments wait 2.5 s after his last line.

**Adding a section line.** In `src/content/agent.js`, add the section’s `aria-labelledby` id under its route in `PAGES` (`header` for a page header). Case studies and unlabelled sections match `HEADINGS`, a list of patterns tested against the section heading. Keep lines short, kind and true.

**Reduced motion.** It stays still at one height, never swings or falls; clicks still change its face and lines.

## Adding content

| What | Where |
|---|---|
| Name, title, headline, highlights, 2026 log, tools | `src/content/site.js` |
| Experience, certifications, education, testimonials | `src/content/profile.js` (each role has `start`/`end` months, a `track`, its `org` and `promoted`; About works out durations and the career bar from them) |
| Projects and case studies | `src/content/projects.js` for the record (add the slug to `ORDER`; give it `quarters`, a `kpi` and `delivered` for the board; a `page` with `lead` and `facts` makes it a case study), and the article itself in `src/content/case-studies/<slug>.js` |
| Journey nodes | `src/content/journey.js` (template in `docs/content/journey-inputs.md`) |
| Talks, events, achievements (Home and footer) | `src/content/achievements.js`; the Journey timeline is `src/content/journey.js` |
| Operating model, principles, AI practice | `src/content/method.js` |
| Agent lines | `src/content/agent.js` |
| Documents and images | `public/documents/`, `public/certifications/`, `public/images/` (event photos in `events/`, his hero cut-out in `portrait/`) |
| Interactive exhibits (open in the viewer) | `public/labs/`: self-contained HTML, scrubbed of product names before it is added |

## Résumés

`node resume/build.mjs` rebuilds every résumé from `src/content` (experience, skills, tools, certifications, recognition and the live hours), so they never drift from the site:

- `public/resumes/Mahmood_Ahmad_Resume_Light.pdf` and `_Dark.pdf`: A4, two pages, printed by headless Chrome (or Edge; set `CHROME_PATH` if neither is found). `Mahmood_Ahmad_Resume.pdf` is a copy of the light one for older links.
- `resume/Mahmood_Ahmad_Resume.tex`: one page on Jake's Resume template. Its bullets are shorter than the site's and live in the script. Compile it in Overleaf (New Project, Upload Project) with pdfLaTeX.

Rebuild after changing the experience, and never add a phone number or a location.

## Quality checks

`scripts/qa-sweep.browser.js` checks every route at five widths (360, 768, 1100, 1440 and 1920 px). With the dev server running, open the site, paste the script into the browser console, and wait for `QA sweep` to print. It reports page overflow, h1 count, heading order, duplicate ids, missing alt text, unnamed controls, text under 12 px, raw document links, and any word listed in `docs/private/blocked-words.txt` (kept out of the public repo, one per line).
