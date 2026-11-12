# Decision log

Every choice behind the current portfolio, with the reason, so the site can be changed later without re-arguing what was already settled. Newest decisions are at the end of each section. All dates are 2026.

Related: [content rules](content/content-rules.md), [site guide](design/site-guide.md), [about Mahmood](content/about-mahmood.md).

## 1. Direction and positioning

| Decision | Why |
|---|---|
| **Design direction:** Direction A “Launch” with Direction B’s index and log patterns. Supersedes the earlier “Quiet Gallery” direction. | Chosen in November from the redesign R&D (`docs/redesign/rd/`). Enterprise, multi-page, easy to scan. |
| **Public title:** AI Product Analyst. The official HR title, Product Quality Analyst, is stated once on About. | The work is business analysis, associate product ownership, design collaboration and AI prototyping. QA leadership is one duty among several. |
| **Order of emphasis:** product, then design, then AI, then quality. | It leads with where his career is heading, not with testing. |
| **Headline:** “I shape AI products from idea to launch.” | His words. The career direction is AI and agentic product work. |
| **Building credit:** he builds by directing AI agents (Claude Code). Never list programming languages or frameworks as his skills. | Accurate: decisions, specifications and accountability are his; AI writes the code. |
| **No single-product framing:** say “enterprise dealership SaaS at Perseus Group, Constellation Software”, not a product name. | Naming one product made him look like a one-product specialist. Verbatim testimonials are the only exception. |
| **No location anywhere** (9 Nov): no city, country, time zone or local clock, on the site or in repo docs. | His request. The university name stays as a credential. The hackathon collage was cropped to remove a printed city banner (10 Nov). Still showing it: the résumé PDFs (need replacing) and the ISTQB certificate, whose issuing board is named after the country (a credential, left unedited). |

## 2. Content

| Decision | Why |
|---|---|
| Professional wording everywhere; general, not internal, detail. | The site shows value as a product person without exposing employer internals. |
| Testimonials are verbatim, never trimmed or reworded. | His explicit rule. |
| Ownership words are exact: led, built, introduced, assisted. Status words are exact: “Heading to production” is not “Released”. | Credibility. Confirmed roles: led Promise Tracker (shown as “Led product definition”); assisted on AI campaign planning; design direction; AI prototyping. |
| No invented numbers. Tenure is worked out live from 14 December 2023, rounded down to a tenth of a year (“2.9+”). | Figures must never overstate. |
| Interactive exhibits (courses, explainers) are hosted as self-contained pages in `public/labs/` and open in the document viewer in a sandboxed frame, with present mode and a new-tab link. Each public copy is made from his export with product and platform names removed, any production prompt swapped for a neutral stand-in, and a check that fails if a banned term remains. The first is the Skills Evals Lab. | He wants artifacts shown as proof without sharing internals. Hosting a scrubbed copy keeps it viewable on the site, unlike a private claude.ai link. |
| AI evaluation is one case study (`/case-studies/ai-evaluation`): the problem, what he did, the method, what it solved, his own plugin's evals, the Lab, and what he is still learning. It replaces the standalone Skills Evals Lab project entry. No feature names or per-feature figures. | Evaluation is the AI skill he is building towards. It is company work, so it follows the company-projects rule below. |
| The promo films are published as they are, with the TargetCRM brand, and their pages say the product is also offered as Notify360. The two exported films (enterprise promo, Promise Tracker) live in `public/videos/` and play inline through a `{ video }` article block that downloads nothing until pressed; a small poster still from each title card stands in. The 28-second app-store cut follows once it is exported. | His call (11 Nov 2026): "Showing the name is no issue." The films use a fictional dealership and demo data, and the real-data hook from the Promise Tracker R&D is not in the film. |
| **Company projects say only what he did and the problem it solved.** No internal feature or skill names beyond those already public, no per-feature test counts, data volumes, architecture, API or schema details, defects found, or who owns which feature. Exhibits made from company work use fictional examples and invented field names. | His rule (10 Nov 2026): "this is company projects, so mention only what I did and what problem solved, and around that, do not reveal any info further." |
| Domain training and contribution hours are worked out live from his working week, Monday to Friday at 8 hours a day (`src/lib/workHours.js`, dates in `src/content/hours.js`). Each title at Perseus Group shows its own hours on About (Trainee, 14 Dec 2023 to 14 Feb 2024; Junior SQA Analyst, 15 Feb 2024 to Dec 2025; Product Quality Analyst, Jan 2026 to yesterday). The 2024 to 2025 training programme carries the Junior SQA hours; the undated headline figures carry the overall Perseus total. Rounded down. | His rule: the hours are his working hours in each title. The old fixed figures (360+, 2,000+) went stale; the trainee dates reproduce the original 360 exactly. |
| Journey timeline keeps a data template for future entries (`docs/content/journey-inputs.md`). | He will supply more dates and entries later. |
| The AI QA Workbench came from the DIS AI Foundations cohort (July), a five-day cross-division build. | Corrected origin. |
| The AI Foundations hackathon (August) is its own case study: he organised it, wrote a brief per participant, taught the opening session and wrote the handbook. | Corrected and expanded from his notes. Participant names are not published. |
| The Postman case study is rebuilt from current official Postman documentation, with native content, not slide images. | His request; plans are as of November. |
| Case studies are articles, not styled block pages: a reading column of prose with figures. Documents a case study produced sit at the top, under the standfirst. | His request: the block layout read like a styled page, and the Postman documents were buried at the bottom. |
| The Work page is called Projects, at `/projects`; old `/work` links redirect, hash included. | His request: “projects” says what the page holds. |
| No Achievements page. Its talks, events, courses and results are on the Journey timeline, undated awards are in Journey’s Recognition section, and project results are on the Projects board. `/achievements` redirects to Journey. | His request: one place for the record, not three. |
| About is a profile record (sticky profile panel and tabs), styled to sit alongside the Projects board, after a card-heavy redesign was rejected. | His choice from three directions: profile record, editorial story, bento grid. |
| The original, unblurred first-prize photo is used. | He rejected the blurred version. |
| The organiser certificate image, logos included, is approved for publication. | His call (9 Nov). |

## 3. Pages and structure

| Decision | Why |
|---|---|
| Pages: Home, Work (every project, filterable), Case studies (long reads; replaced Writing, and `/writing` still opens it), Journey, Achievements, About, How I work, Contact. | Separate, scannable pages instead of one long scroll. |
| Achievements has its own page and a glance on Home. Talks and events get a prominent band on Home. | Talks and events matter to him and should be easy to find. |
| How I work is specific: a six-stage operating model (Discover, Define, Design, Prototype, Deliver, Release), each with its artifact and gate. | Generic process copy was rejected. |
| The closing call to action appears on every page except Contact. | The next step is always one click away. |
| Smaller type scale. | “The whole portfolio is too zoomed.” |
| **No text selection** (10 Nov): nothing on the site can be selected, by dragging, double or triple clicks, or Select All (`user-select: none` on `body` in `base.css`). Form fields stay selectable. | His request. Visitors cannot copy text, so the email address must stay one click away (the Email buttons open a mail client). |
| **Parent and child projects** (11 Nov): the Claude Code marketplace is a parent project, and each plugin is its own project and case study with `parent` set. A plugin page shows the parent in its breadcrumb and header, and lists its sibling plugins after the story; the case studies page groups the plugins under the marketplace instead of mixing them into the grid. | His words: the marketplace is the parent that owns all of it; every plugin was built alone, then combined. |
| **Data-flow diagrams** (11 Nov; left to right since 12 Nov): the `graph` block (`DataFlow.jsx`) draws who acts as lanes (rows, named in a column that stays put), time across the page, and wires labelled with the data they carry, set in the bands between lanes. Columns share the width, but each gets enough for its nodes' longest words, and a node widens into empty cells beside it, so no name breaks inside a word. When a flow is still wider than its column (long flows on laptops, most flows on phones) it scrolls sideways and follows the step being played. A trace plays once when it scrolls into view: a packet moves along each wire, the next node lights up, approval gates hold it in amber until they turn green, and a readout explains the step and what comes in and goes out. Readers can pause, step or pick any node; reduced motion keeps it still. | He found the box-list diagrams unimpressive: they showed no data flow, nodes or pipeline. Then the vertical version took too much scrolling; every flow should fit one screen's height (the tallest is 558 px), and at 1,920 px none scrolls sideways. |
| **Case-study voice** (11 Nov): every case study opens with a hook, uses short paragraphs and headings with personality, explains each term once, and puts one sentence before each diagram saying what to watch for. No hype words. | He asked for articles that are fun, exciting and easy to read. |
| **Case-study layout** (12 Nov): phones read one column (header, chapter list, story). From 1,200 px the chapter list sticks beside the story and marks the chapter in view. From 1,700 px the page reads in three columns: every case study (plugins under the marketplace) on the left, the story with its title in the middle, and the illustration and chapters on the right; both side columns stick. Prose keeps its reading width (720 px, 780 px with larger type) on the title's left edge; diagrams, tables, films and plugin cards fill the middle column. | He asked to use the empty space on every screen. A story has 12 to 20 chapters but only a few short asides, so a margin column for notes would sit mostly empty; navigation fills both sides with something useful while lines of prose stay readable. |

## 4. Visual system

| Decision | Why |
|---|---|
| Tokens: paper `#FAFAF7`, ink `#14161B`, cobalt `#2446DB` (the only brand colour), night bands; Schibsted Grotesk for display, Inter for text. | Enterprise, calm, one accent. |
| Home hero: a carousel of node diagrams, the AI agents slide always first, auto-advancing every 3 seconds, pausing on hover. No top padding. | His request, modelled on the agents plugin PDF. |
| Testimonials: a plain single-card carousel, one per slide, 8-second interval, pause on hover. | Two fancier designs were rejected (“nothing fancy”). |
| Backgrounds went: grid boxes, then an agentic network background (rejected), then **one illustration per page** in the header. | “Every page should have a different one” that fits its surroundings. Each illustration comes from the page’s subject (see the site guide). |
| **Home is the exception:** no background illustration; the rope agent is its visual. | The orbits behind the carousel were rejected (9 Nov). |
| **Dark mode** (10 Nov): a sun and moon toggle in the header. The first visit follows the system setting; a choice is saved. Cobalt splits into a fill colour and a lighter text colour so links stay readable; illustrations switch to a lighter stroke. | His request. An inline script applies the theme before the first paint, so there is no flash. |
| Footer: dark, continuing the call to action. Brand block with social buttons, three link columns, a facts row (experience, latest event, credentials, now), the idea-to-launch track, and Back to top. No colophon. | The plain footer was “so empty”. The “designed and built by directing AI agents” line was removed at his request. |

## 5. Documents

| Decision | Why |
|---|---|
| No raw PDF links anywhere. Every PDF, certificate and résumé opens in the in-site viewer. | His request. |
| The viewer uses **react-pdf 11.0.0** (pdf.js 6.3), styled to the site: a scrolling reader that draws only the pages near the screen, a contents panel from the PDF outline, a page-number box, zoom, Present mode, and Download where allowed. | The old pdf.js 3.11 could not render the handbook’s gradients (“Unsupported ShadingType: 1”). react-pdf is the most widely used free React PDF library. |
| The pdf.js worker, character maps, fonts and decoders are served from the site (a Vite plugin copies them into `dist/pdfjs/`), not a CDN. | Reliability. |
| Present mode uses full screen where allowed, and fills the window where the browser blocks full screen. | Some embedded browsers block the Fullscreen API. |

## 6. The rope agent

| Decision | Why |
|---|---|
| A small robot on a rope in the free strip left of the content, on every page. | He loved it on Home and asked for it everywhere, keeping each page’s illustration. |
| It rappels down as you scroll, swings when scrolling speeds up or stops, follows the cursor with its eyes, blinks, naps after 15 quiet seconds, and gets star eyes over buttons. | Personality without getting in the way. |
| **Click timing** (10 Nov): one unhurried click on his head waits 300 ms, then he says a short, funny, true fact about Mahmood. Clicks under 300 ms apart count towards the animations instead: 2 affection; 3–5 one hand slips (“Watch it!”); 6 he falls, catches the wall, climbs back. A click while on the wall drops him to the floor, stunned; he repairs himself, sulks (“You’re not very nice.”) and forgives after 12 quiet seconds. | His brainstorm (9 and 10 Nov). |
| **His whole body is clickable** (10 Nov): a hand lets go and shakes (three quick clicks and he falls); legs kick, ticklish (four quick clicks make him dizzy); the belly makes him laugh harder with each quick tickle until he falls laughing into the same fall. | His request. |
| **Dark sections and dark mode** (10 Nov): over any dark background his outline and rope turn light. In dark mode his eyes glow, and he plays at scaring you: switching to dark gets “Who turned off the lights?”, then he hides with only his eyes showing and jumps out with “BOO!”. He does it again on hover (at most every 12 s) and on every other quiet spell. Switching back to light: “Ah! Too bright!” | His request. |
| **Talk timing** (10 Nov): lines type out at a talking pace (faster for long lines, never over about a second) while his mouth moves, then stay up long enough to read (50 ms per character, 1.4 to 4.2 s). Section comments wait 2.5 s after his last line and come at most every 5 s. | Lines vanishing before they could be read, or stepping on each other, felt broken. |
| It says something relevant about the section beside it, once per section per visit, when scrolling settles. Lines live in `src/content/agent.js`. | His request. Lines are short and never claim anything the site does not. |
| **Full-width layout** (11 Nov): from 1,100 px wide the content takes the whole width except a 96 px strip each side (`--rope` in `base.css`), just enough for the agent at full size. Below 1,100 px it hides. Reduced motion keeps it still and skips the falls. | He asked for as much space from the sides as possible, just enough for the rope agent. It must never cover content or move for people who opted out of motion. |
| **Wide screens elsewhere** (12 Nov): from 1,440 px the three recommendations show side by side instead of rotating; from 1,280 px a timeline card with a photo puts it beside the text (home and Journey); from 1,280 px a perspective essay has the illustration and the other perspectives beside it. | The same request: one centred card, or text with a photo underneath, left most of a wide screen empty. Quotes stay verbatim and complete in both layouts. |
| **Three columns from 1,700 px, not 1,500 px** (12 Nov): between 1,200 and 1,699 px a case study keeps the chapter list beside the story; the side columns of the three-column layout are narrower (200 to 300 px). | The left-to-right diagrams need the width: on a 1,536 px laptop the two-column story is about 270 px wider, and only the 15-step QA plugin loop scrolls. |
| **Résumés built from the site** (12 Nov): `node resume/build.mjs` prints the light and dark A4 PDFs with headless Chrome from `src/content` (experience, skills, tools, certifications, recognition, the live hours) and writes `resume/Mahmood_Ahmad_Resume.tex` on Jake's Resume template for Overleaf. No phone number and no location in any of them; the old pdfkit generator is gone. | He asked for the résumés to match the updated experience and for a LaTeX version on Jake's template. One source keeps them from drifting apart; the phone number gave away the country code. |
| **No WhatsApp** (12 Nov): the WhatsApp link is gone from the contact page, the footer and the contact data. Email, LinkedIn and GitHub remain. | He asked for it to be removed. |
| **Full-width chapters** (12 Nov): when the story column is at least 880 px wide (a container query, so laptops in the two-column layout get it too), every chapter fills the column: its number and heading above, the text across the whole width, a hairline between chapters. The type steps up with the column (18 px from 880 px, 19 px from 1,040 px) so the longer lines stay comfortable. In a narrower column the text keeps its 720 px reading width. | He wanted the middle column filled with the content itself. A rail beside the text left an empty block under every heading, which he disliked; full-width text was his call over a narrower reading measure. |
| **The rope agent takes breaks** (12 Nov): left alone for 3 s he climbs down the wall and plays along the bottom of the window (strolls, a ball, hops, a dance, sitting and napping, climbing a wall to look around, walking off one edge and back in from the other), dodges fast swipes, waves at slow approaches, steps into a side lane while someone scrolls, and goes back up his rope when clicked or after a few activities. He keeps his state across page changes and reloads in the tab. | He asked for him to be continuously interactive and not to reset between pages. On his break he can cross the content at the bottom of the window, so scrolling (reading) always sends him into a side lane, and a click always sends him home. |
| **Side view while moving** (12 Nov): walking, kicking and wall climbs use a three-quarter side view of the agent that faces the way he is going; he faces the viewer only when he stops. | He pointed out that a figure walking sideways while facing the screen looks unnatural. Mirroring the front view only flipped it. |
| **His games show the work, not QA** (12 Nov): the rope agent's floor games act out Mahmood's current role and initiatives: a line of mini AI agents following him, a now-next-later roadmap of sticky notes, a wireframe sketch, a clapperboard for the promo films, the 183-page Claude handbook, the hackathon trophy. The ball and every testing joke ("bug kicked out of production", "test passed") are gone. | He asked for the agent's fun to showcase his current role and initiatives rather than QA chores. |
| **Hero balance on wide screens** (12 Nov): from 1,280 px the headline grows with the screen (56 px at 1,280, about 80 px at 1,920, at most 88 px), the support line and status follow, the text column takes its full share (columns 1 : 1.12), the gap between text and carousel is 56 to 96 px, and the carousel is exactly as tall as the text beside it: its diagram stage flexes (nodes sit at percentages and the wires stretch with the stage, strokes keeping their width). | On a 1,920 px screen the text sat small with a wide gap before a large carousel, and then the carousel ran well below the text. |

## 7. Engineering and delivery

| Decision | Why |
|---|---|
| React 19, Vite 6, CSS Modules, a small custom router; GitHub Pages serves `main`, with `404.html` as the single-page fallback. | Simple and free to host. |
| Work happens on `redesign/enterprise-portfolio` and is pushed to `main` when he asks. | Main deploys straight to the live site. |
| Pushes use the `shironigun` GitHub account for that one command (`GH_TOKEN="$(gh auth token --user shironigun)" …`). The default `gh` account has no access. | Avoids changing global git configuration. |
| Every change is checked with a sweep of 22 routes at 360, 768, 1100 and 1440 px: overflow, one h1, heading order, duplicate ids, alt text, unnamed controls, small text, raw document links, location mentions. | Keeps the quality floor. |
| This repository is public. Personal information goes in `docs/private/`, which git ignores. | The docs are public on GitHub even though the site does not show them. |
