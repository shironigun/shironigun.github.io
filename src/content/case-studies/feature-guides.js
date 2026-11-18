// Feature guides for dealers, told end to end (18 Nov 2026). Company work, so no product name, no
// reviewer's name, no version numbers, no product behaviour and no gaps found in the product. The
// support team's quotes are private and stay off the page. Every example is the fictional shop from the
// product documentation case study, or a fictional AI feature in it. Ownership words follow the source:
// he wrote the standard and the first guide, directed the research, and specified the build tool, which
// Claude Code built. The guide is a draft in review; nothing here says it is published.
// Its three parts (how-to-standard, guide-build-tool, promise-tracker-guide) are board cards with
// `parent: 'feature-guides'` and no case study of their own; this story tells all three.
// Source: docs/private/chat-exports/crm-project-how-to-guides.md.
// The standard is shown as a public copy (public/documents/how-to-guide-standard.pdf), built from the
// current revision with the brand theme, logo and help line removed and the product, its systems,
// feature names and internal sources replaced with general wording. Source and build:
// docs/private/working-notes/how-to-standard-public/. The record lives in projects.js, so the standard's
// own board card shows the same document.
import { howToStandardPdf } from '../projects';

export default {
  updated: 'November 2026',
  documents: [{ ...howToStandardPdf, primary: true }],
  documentsNote: 'A public copy. The product’s name, the dealer management systems it connects to, its feature names and its internal sources are replaced with general wording; the rules are as written.',
  body: [
    { p: 'A dealer who wants to learn a feature finds short help articles, each answering one question, and sales material that introduces it at a high level. Neither shows the whole feature in one place: what it does, how to use it, what to expect, and what to do when something looks wrong.' },
    { p: 'In November 2026 I set out to close that gap. I wrote a standard for complete feature guides, had a build tool made that turns a written guide into a branded PDF and checks it against the standard, and wrote the first guide, for an AI feature. Then I asked the support team, who write our knowledge base, to review it. The guides hold internal detail, so every example here is fictional.' },

    { h2: 'At a glance' },
    { ol: [
      'I wrote a how-to standard that joins global documentation practice with our own house voice.',
      'I specified a build tool that prints every guide the same way and flags where a draft breaks the standard.',
      'I wrote the first complete guide, for an AI feature, using screens from demo data only.',
      'I asked support to review it, answered their product questions from the code, and cut the guide from 18 pages to 12.',
    ] },
    { numbers: [['8', 'pages in the standard'], ['12', 'pages in the first guide, down from 18'], ['22', 'cover designs to choose from']] },
    { p: 'The work has three parts, each with its own card on the projects board. This story tells them together, because each one shaped the others.' },
    { family: 'feature-guides' },

    { h2: 'One standard, from the world and from home' },
    { p: 'A guide written to one person’s taste reads differently from the next. So before writing any guide, I directed research into how the best documentation teams write task help, and set it beside how we already speak to dealers.' },
    { pair: [
      { title: 'Global practice', items: [
        'Task topics: one goal, the steps to reach it, the result',
        'The Microsoft and Google writing style guides',
        'Diátaxis: a tutorial, a how-to and a reference are different documents',
        'Minimalism: let people act sooner, and help them recover from errors',
      ] },
      { title: 'Our house voice', items: [
        'Our public knowledge base',
        'The house style of our release notes',
        'How our sales team describes features to dealers',
        'The support team’s own style guide, added after their review',
      ] },
    ], caption: 'The two sources of the standard: how the best teams write task help, and how we already speak to dealers.' },
    { p: 'The standard sets the sections every guide must have, how a step is written, how to cover a feature that works differently with each dealer-management system, how to write about AI features, which screenshots are allowed, which words to use, and a checklist before publishing. It is 8 pages long.' },
    { p: 'Its smallest unit is the step. Every step has three parts: what to do, what you’ll see, and why it matters. The second part is the one most guides leave out, and it is the one that tells a dealer they are on track.' },
    { code: [
      'Pause weekend deliveries',
      'Before you begin: you need the Store manager role.',
      '',
      '1. Select Settings, then Delivery.',
      '   You’ll see: the delivery options for your store.',
      '2. Turn off Weekend delivery.',
      '   You’ll see: Saved, beside the switch.',
      '   Why: customers can no longer choose Saturday or Sunday at checkout.',
    ], caption: 'A task written to the standard: each step says what to do, what you’ll see and why. Recreation, fictional shop.' },
    { table: {
      columns: ['Use', 'Instead of', 'Why'],
      rows: [
        ['Select', 'Click, tap', 'It works for a mouse, a touch screen and a keyboard'],
        ['Must, or can', 'Should', '“Should” leaves the reader guessing whether it is required'],
        ['The gear at the top right of the page', 'See above', 'A dealer reads the screen, not the page of the guide'],
        ['You', 'The user', 'A guide speaks to the person reading it'],
      ],
    }, caption: 'From the standard’s table of words to use. Recreation.' },

    { h2: 'Saying plainly what the AI does' },
    { p: 'An AI feature needs one more thing from a guide. A dealer has to know what the AI does on its own, what it never does, and which decisions stay with a person. If the guide is vague, people either trust the feature too much or stop using it.' },
    { table: {
      columns: ['The AI does this on its own', 'It never does this', 'A person decides'],
      rows: [
        ['Reads new customer reviews each night', 'Publishes or replies to a review', 'Whether to reply, and what to say'],
        ['Drafts a summary of what customers mention most', 'Changes a product listing', 'Which issues to act on first'],
      ],
    }, caption: 'How the standard asks a guide to describe an AI feature. Recreation, a fictional review-summary feature.' },

    { h2: 'A build tool that checks as it builds' },
    { p: 'Every PDF used to be formatted by hand, so no two looked alike. I specified a build tool and Claude Code built it. One command turns a guide written in plain text into a branded PDF, tagged for screen readers, with a cover, a contents page, numbered figures, callouts, and headers and footers on every page.' },
    { p: 'As it builds, it reads the guide against the standard. A reviewer’s time then goes on what matters, not on counting steps or catching banned words.' },
    { code: [
      'Building pause-weekend-deliveries',
      'Sections: every required section is present',
      'Warning: “Change delivery days” has 12 steps. The limit is 10; split the task.',
      'Warning: Figure 4 has no caption.',
      'Warning: line 88 says “click”. Use “select”.',
      'Warning: line 102 says “see above”. Say where it is on screen.',
      'Built: pause-weekend-deliveries.pdf, 9 pages',
    ], caption: 'The style check, as the tool reports it while building a guide. Recreation, fictional shop.' },
    { p: 'A catalog mode prints every cover side by side, so reviewers choose from real pages, not descriptions. The first covers were plain white with patterns. I then asked for brochure-style covers drawn around a product screen in our brand colours, and put them first: 22 designs, with the final choice left to the reviewers.' },

    { h2: 'The first guide: an AI feature' },
    { p: 'I chose Promise Tracker, the AI feature whose product definition I led, for the first guide. It needed a complete reference more than most: dealers have to understand how the AI decides what is urgent before they can trust its list.' },
    { list: [
      'Before you begin: who can use it, and where it is available.',
      'How it works, in plain words.',
      'Each task, written step by step to the standard.',
      'Tips from how dealers really work.',
      'Questions dealers ask.',
      'If something goes wrong: a table of what you see, why, and what to do.',
    ] },
    { p: 'Every screen in it comes from the demo-data version of the product made for the promo films. No real dealer or customer appears.' },

    { h2: 'Asking the people who write the knowledge base' },
    { p: 'The support team write our knowledge base and answer dealers every day, so I asked them to review the standard and the guide before anyone else saw them. Their review was direct.' },
    { list: [
      'At 18 pages, dealers might not read it.',
      'A few lines described what everyone believed the product does. They asked whether that was true.',
      'My standard banned phrases like “at the top right”, to stop “see above”. Dealers need to know where things are on screen.',
      'One reference in my standard pointed at something in the knowledge base that its authors didn’t recognise.',
    ] },
    { p: 'I took the changes. I cut the guide to 12 pages, with a target of about 10 after the cover. A button with no text is now described by its shape and where it sits, with a screenshot that circles it and an arrow pointing to it. The examples now cover more of the ways dealers work. Several ideas came across from the team’s own style guide, and the reference that didn’t exist came out. It was my mistake.' },
    { call: {
      saw: 'My standard banned every phrase about position, to stop guides saying “see above”. Support pointed out that a dealer needs to know where a button is on screen.',
      decided: 'Position on screen is allowed. Only “see above” and “see below” are flagged, and I changed the style check to match.',
      why: 'Their rule served the dealer better than mine. A standard that the people who write the knowledge base believe in is worth more than one I am right about.',
    } },

    { h2: 'Checking the guide against the code' },
    { p: 'Where a line in the guide described what everyone assumed, I checked it against the code instead of against what people remembered. The code answered three of support’s product questions.' },
    { p: 'It also showed where the product itself still has a decision to make. Those questions go to Product, and the guide is published only once they are settled. Writing a guide turned out to be one more way to test a feature.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'AI agents' }, { name: 'Support team', note: 'write the knowledge base' }, { name: 'Product' }],
        nodes: [
          { id: 'research', name: 'Gather the practice', sub: 'global and our house voice', lane: 1, row: 0, kind: 'ai', detail: 'Research agents gathered how the best documentation teams write task help. Our knowledge base, release notes and sales material gave the house voice.' },
          { id: 'standard', name: 'Write the standard', sub: 'sections, steps, words', lane: 0, row: 1, kind: 'human', detail: 'The sections every guide needs, the three-part step, rules for AI features and screenshots, words to use and a checklist.' },
          { id: 'tool', name: 'The build tool', sub: 'plain text in, PDF out', lane: 1, row: 2, kind: 'ai', detail: 'I specified it and Claude Code built it: cover, contents, numbered figures, callouts, headers and footers.' },
          { id: 'guide', name: 'Write the first guide', sub: 'an AI feature, demo data', lane: 0, row: 3, kind: 'human', detail: 'Promise Tracker, end to end: how it works, each task, tips, questions dealers ask, and what to do when something goes wrong.' },
          { id: 'check', name: 'Meets the standard?', sub: 'sections, steps, captions, words', lane: 1, row: 4, kind: 'check', detail: 'Missing sections, tasks over 10 steps, figures with no caption and banned words are flagged as the PDF builds.' },
          { id: 'review', name: 'Support reviews it', sub: 'the people who answer dealers', lane: 2, row: 5, kind: 'gate', detail: 'Too long, a few assumptions, one rule that hid where things are on screen, one reference that didn’t exist.' },
          { id: 'code', name: 'Check the code', sub: 'not what people remember', lane: 1, row: 6, kind: 'ai', detail: 'The code answered three of support’s product questions, and showed where the product still has a decision to make.' },
          { id: 'revise', name: 'Revise both', sub: '18 pages to 12', lane: 0, row: 7, kind: 'human', detail: 'The guide cut to 12 pages; the standard and the style check changed to take support’s rules.' },
          { id: 'decide', name: 'Product decides', sub: 'what the code left open', lane: 3, row: 8, kind: 'gate', detail: 'The open questions go to Product. The guide doesn’t answer them for Product.' },
          { id: 'publish', name: 'Publish', sub: 'once approved', lane: 2, row: 9, kind: 'output', detail: 'Support publishes the guide once Product has decided and they approve it. It isn’t published yet.' },
        ],
        edges: [
          { from: 'research', to: 'standard', label: 'sources' },
          { from: 'standard', to: 'tool', label: 'the rules' },
          { from: 'standard', to: 'guide', label: 'the structure' },
          { from: 'guide', to: 'check', label: 'the draft' },
          { from: 'check', to: 'review', label: 'the PDF' },
          { from: 'review', to: 'code', label: 'their questions' },
          { from: 'code', to: 'revise', label: 'answers' },
          { from: 'revise', to: 'decide', label: 'open questions' },
          { from: 'decide', to: 'publish', label: 'decisions' },
          { from: 'revise', to: 'standard', label: 'rules changed' },
        ],
      },
      caption: 'How a feature guide is written, checked and reviewed. The amber gates are people: the support team and Product.',
    },

    { h2: 'My role and the team' },
    { table: {
      columns: ['Stage', 'Me', 'AI agents', 'Team'],
      rows: [
        ['Standard', 'Directed the research; wrote the standard', 'Gathered global practice', 'Support reviewed it; their style guide fed it'],
        ['Build tool', 'Specified it and its checks', 'Built it (Claude Code)', ''],
        ['First guide', 'Wrote it; chose the feature and the screens', 'Checked its claims against the code', 'Support reviewed it'],
        ['Revision', 'Cut it to 12 pages; changed the standard', '', 'Support’s changes and ideas'],
        ['Decisions', 'Passed the open questions on', '', 'Product decides'],
      ],
    }, caption: 'Who did what. I wrote the standard and the guide, Claude Code built the tool to my specification, and the team reviews and decides.' },

    { h2: 'How I approached it' },
    { stages: [
      { name: 'Research', part: 'Global practice and our house voice', by: 'ai' },
      { name: 'The standard', part: 'Sections, the three-part step, words', by: 'me' },
      { name: 'The tool', part: 'Print every guide alike and check it', by: 'ai' },
      { name: 'The first guide', part: 'An AI feature, end to end', by: 'me' },
      { name: 'Review', part: 'Support first, then the code', by: 'proved', now: true },
    ], caption: 'How the guides came together, with who carried each stage.' },

    { h2: 'Key decisions' },
    { decisions: [
      {
        q: 'How much should one guide cover?',
        options: ['One short article per task', 'The whole feature in one guide'],
        chose: 'The whole feature in one guide',
        why: 'Short articles already exist. What dealers lacked was one complete reference. After review it is held to about 10 pages after the cover, so it stays readable.',
      },
      {
        q: 'Where does the truth about the product come from?',
        options: ['What the team believes it does', 'The code'],
        chose: 'The code',
        why: 'A few lines were assumptions everyone shared. The code settled them, and showed which questions only Product can answer.',
      },
      {
        q: 'Whose rule wins when the reviewers disagree with the standard?',
        options: ['Keep my rule', 'Take theirs where it serves the dealer'],
        chose: 'Take theirs where it serves the dealer',
        why: 'They write the knowledge base and hear from dealers every day. I changed the standard and the style check to match.',
      },
      {
        q: 'How should a guide point to a button with no text?',
        options: ['Name it by what it does', 'Describe its shape and where it sits, and circle it on a screenshot'],
        chose: 'Describe its shape and where it sits, and circle it on a screenshot',
        why: 'A dealer looks for what they can see on screen, not for a name the screen never shows.',
      },
    ], caption: 'The decisions behind the guides, in my words.' },

    { h2: 'Where it is now' },
    { timeline: [
      { when: '17 Nov 2026', title: 'The standard and the tool', detail: 'Researched and wrote the standard, and had the build tool made.' },
      { when: '17 Nov 2026', title: 'The first guide', detail: 'A complete guide for Promise Tracker, 18 pages, sent to the reviewers.' },
      { when: '18 Nov 2026', title: 'Brochure covers', detail: 'Four covers drawn around a product screen, first in a catalog of 22.' },
      { when: '18 Nov 2026', title: 'The review', detail: 'Support’s review: the standard revised, the guide cut to 12 pages, their product questions answered from the code.' },
    ], caption: 'Two days from the first draft to a reviewed standard.' },
    { p: 'The guide is a draft. It will be published once Product settles the open questions and support approves it, and the reviewers will choose the cover. The standard and the tool are ready for the next feature.' },

    { h2: 'What I learned' },
    { quote: 'Writing a guide is one more way to test a feature.' },
    { p: 'To explain a feature plainly, every sentence has to be true, and checking each one against the code finds what nobody had written down.' },
    { p: 'And a standard is only as good as the trust of the people who use it. Asking the team who write our knowledge base to review mine cost me a rule, and made the standard theirs as well as mine.' },
    { link: { to: '/case-studies/product-documentation', text: 'How I document a subsystem for people who don’t read code' } },
    { link: { to: '/case-studies/promise-tracker', text: 'Promise Tracker, the AI feature in the first guide' } },
    { link: { to: '/case-studies/release-notes-suite', text: 'The release notes house style the guides speak in' } },
  ],
};
