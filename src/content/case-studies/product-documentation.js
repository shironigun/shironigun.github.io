// Product documentation, told end to end (round 2, 11 Nov 2026): the method only. Company work, so no
// subsystem, system, vendor, customer or document names, no counts, no product rules and no defects. Every
// example is a fictional subsystem (a shop and a courier) or a fictional admin tool. Ownership words follow
// the sources: he directed the reference manuals (no byline; AI agents read the code and wrote them under his
// direction; one was written as a course for him while he worked a real ticket) and wrote the support
// runbook (his byline). The runbook is described as designed; nothing claims how often support uses it.
// Sources: docs/private/artifacts/product-docs.md, docs/private/chat-exports/merged.md §5 (support
// runbooks) and §10 (product documentation method).
export default {
  updated: 'November 2026',
  body: [
    { p: 'Every product has a document that was true once. People still act on it: they place a ticket, plan a test, change a customer’s setting. Nobody can tell which lines still hold, and the real answer sits in the code and in a few developers’ heads.' },
    { p: 'Since August 2026 I have documented subsystems with one method, so people who don’t read code can act on them. I directed reference manuals built from a dated, read-only reading of the code, and wrote a step-by-step runbook for our support team. The documents hold internal detail, so every example here is fictional.' },

    { h2: 'At a glance' },
    { ol: [
      'I set one method: the model in one sentence first, a layer per audience, and a tag on every claim.',
      'I directed reference manuals read from the code, each dated, with sections on what does not exist.',
      'I wrote a runbook for support staff working in an admin tool where almost every click saves at once.',
      'When the code moved on, I had it read again and replaced my own older manual.',
    ] },
    { numbers: [['1', 'sentence to explain the model before any detail'], ['3', 'tags on every claim: verified, not built, inferred'], ['0', 'actions run on a live system to write them']] },

    { h2: 'Documents that were true once' },
    { p: 'Picture Maya, a business analyst, on a Monday. A ticket says: “The customer says the parcel arrived, but the order still shows In transit.” Is delivery broken? Is our app wrong? The only document is a year old. She can wait for a developer, or guess.' },
    { p: 'Meanwhile Jordan in support has to change a customer’s settings in an internal admin tool. Almost every switch saves the moment it is clicked, and a few affect every customer at once. Nothing tells him which.' },
    { p: 'The example is fictional; the shape is real. Testers and product people had no single, honest source for what the product does, and non-technical staff needed a safe way to operate an internal tool.' },

    { h2: 'From code to a page you can act on' },
    { p: 'Here is the whole method as a pipeline. Watch two things: field reports enter boxed, not trusted, and the loop at the bottom sends the work back to the code when the code moves on.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'AI agents' }, { name: 'Readers', note: 'product, QA, support' }, { name: 'Team' }],
        nodes: [
          { id: 'job', name: 'Name the reader’s job', sub: 'what must they do after?', lane: 0, row: 0, kind: 'human', detail: 'Place a ticket in the flow, name the part that failed, know the one question to ask. The manual is built backwards from that.' },
          { id: 'code', name: 'Read the code', sub: 'dated, read-only', lane: 1, row: 1, kind: 'ai', detail: 'AI agents read the code and trace each flow. Nothing runs on a live system, and the page records which code was read, and when.' },
          { id: 'field', name: 'Field reports', sub: 'what people say happens', lane: 2, row: 1, kind: 'store', detail: 'Tickets and what support hears. Useful, but boxed as unverified until the code confirms them.' },
          { id: 'model', name: 'Write the model', sub: 'one sentence first', lane: 0, row: 2, kind: 'human', detail: 'The sentence everything else hangs on: “the shop doesn’t deliver parcels; it asks a courier to, then waits to be told.”' },
          { id: 'draft', name: 'Draft in layers', sub: 'plain words, QA, developers', lane: 1, row: 3, kind: 'ai', detail: 'One page for three readers: a plain line, what QA should take from it, then developer detail, hidden from the team view.' },
          { id: 'tag', name: 'Every claim tagged?', sub: 'verified, not built, inferred', lane: 1, row: 4, kind: 'check', detail: 'Every claim carries a tag, and every status says live or built but not live. An untagged line doesn’t ship.' },
          { id: 'review', name: 'I check it', sub: 'against the reader’s job', lane: 0, row: 5, kind: 'gate', detail: 'Does it let the reader do the job? On the first manual, I worked a real ticket through it.' },
          { id: 'act', name: 'Act on it', sub: 'triage, tests, watch-list', lane: 2, row: 6, kind: 'output', detail: 'The page ends in action: a decision tree, test ideas and a regression watch-list.' },
          { id: 'ask', name: 'Decide the open ones', sub: 'each with my recommendation', lane: 3, row: 7, kind: 'gate', detail: 'The manual decides nothing. Each open question says what was found and what I recommend, and the team decides.' },
          { id: 'again', name: 'Read it again', sub: 'when the code moves on', lane: 0, row: 8, kind: 'human', detail: 'Two months after the first manual on one feature, a fresh read found where it was wrong. A dated replacement took its place.' },
        ],
        edges: [
          { from: 'job', to: 'code', label: 'scope' },
          { from: 'code', to: 'model', label: 'traced flows' },
          { from: 'model', to: 'draft', label: 'the model' },
          { from: 'field', to: 'draft', label: 'reports, boxed' },
          { from: 'draft', to: 'tag', label: 'claims' },
          { from: 'tag', to: 'review', label: 'tagged draft' },
          { from: 'review', to: 'act', label: 'the manual' },
          { from: 'act', to: 'ask', label: 'open questions' },
          { from: 'ask', to: 'again', label: 'time passes' },
          { from: 'again', to: 'code', label: 'a fresh read' },
        ],
      },
      caption: 'How a subsystem becomes a reference people can act on. The amber gates are me and the team; the loop is the manual staying true.',
    },

    { h2: 'One sentence before anything else' },
    { p: 'Each manual follows the same order: the model in one sentence, then a map, then the mechanics. In our fictional shop the sentence is: “The shop never moves a parcel. It asks a courier to, then waits to be told.”' },
    { p: 'That sentence changes how Maya reads the ticket. The question stops being “did delivery fail?” and becomes “did the two systems stay in sync?”. It calms the room too: if the courier says delivered, the customer has the parcel, and what’s wrong is our copy.' },
    { p: 'An ownership table then says which system holds the truth for each fact, and so whose fix it is.' },
    { table: {
      columns: ['Fact', 'Who holds the truth', 'If it looks wrong, start with'],
      rows: [
        ['Where the parcel is', 'The courier', 'The courier’s own tracking'],
        ['What the order page shows', 'The shop, as a copy', 'Whether the courier’s update reached us'],
        ['The delivery fee charged', 'The shop', 'The shop’s own settings'],
      ],
    }, caption: 'An ownership table. Recreation, fictional subsystem.' },

    { h2: 'A layer for each reader, a tag on each claim' },
    { p: 'Every page speaks in layers: a line in plain words, then what QA should take from it, then the developer detail, hidden from the non-technical view by a switch. And every claim carries a tag saying how sure we are.' },
    { table: {
      columns: ['Claim', 'Tag', 'What a reader does with it'],
      rows: [
        ['The shop never moves a parcel. It asks a courier to, then waits to be told.', 'Verified in code', 'Start here: is our copy out of date, or did the courier fail?'],
        ['If the courier’s update never arrives, the order stays In transit.', 'Verified in code', 'Ask when it was delivered before calling it a defect.'],
        ['The courier resends an update that fails.', 'Inferred', 'Confirm with developers before quoting it.'],
        ['Expired tracking links are cleaned up every night.', 'Not built', 'The code exists, but nothing calls it. Don’t test for it.'],
      ],
    }, caption: 'A page from a reference manual: every claim carries its tag, and the page says which code it was read from and when. Recreation, fictional subsystem and data.' },
    { p: 'Two habits sit beside the tags. What people report is boxed as unverified, with the likely cause named, until the code confirms it. And a likely defect is flagged “confirm, then raise”, never asserted.' },

    { h2: 'The section nobody writes' },
    { p: 'Most documents describe what a product does. Mine give whole sections to what it doesn’t: features that were never built, code that looks like a feature but has no way in, and statuses that are “built but not live”.' },
    { p: 'It turned out to be the most useful section for a product person. Each absence explains a pattern of tickets, and some are product decisions waiting to be made. A status that quietly holds several different real-world outcomes isn’t a coding error. It’s a product gap.' },

    { h2: 'Every manual ends in action' },
    { p: 'A manual that only explains leaves the reader where they started. Each one ends with something to do:' },
    { list: [
      'A triage decision tree, whose first steps need no developer.',
      'One ready-to-send question for developers, instead of several round trips.',
      'Rules written as checks, with the exact message the user sees, so each doubles as a test. Some tests are designed to answer an open question.',
      'A regression watch-list: “try this, expect that” for the team, named fault lines for developers.',
      'Open questions, each with what was found and my recommended answer.',
    ] },
    { p: 'Failures are grouped by where in the flow they happen, not by what the ticket says. A slow update and a lost one can read the same in a ticket and mean very different things.' },

    { h2: 'Writing for support' },
    { p: 'The runbook is the one document I wrote myself, under my own name. It opens with the one rule that prevents damage: almost every click saves at once, with no undo. It explains the model in plain rules before any steps, keeps routine tasks apart from rare configuration tasks, and gives every task one template.' },
    { code: [
      'Pause weekend deliveries for one store',
      'Path: Admin › Stores › (store) › Delivery',
      '1. Note the current settings, in case this has to be reversed.',
      '2. Turn off Weekend delivery. It saves the moment you click.',
      '3. Fill in Reason with the ticket reference, even though it says optional.',
      'Check: the store’s history shows “Weekend delivery off”, dated today.',
      'Warning: Cancel does not undo this switch.',
    ], caption: 'The runbook’s task template: where to go, numbered steps, a Check line saying what success looks like, and a warning beside the irreversible click. Recreation, fictional admin tool.' },
    { p: 'Follow Jordan’s request through the runbook. It can stop twice before anything changes: once at the scope line, once at the escalation gate.' },
    {
      graph: {
        lanes: [{ name: 'Support agent' }, { name: 'The runbook', note: 'mine' }, { name: 'Admin tool' }, { name: 'Escalation' }],
        nodes: [
          { id: 'ticket', name: 'A change is asked for', sub: 'pause weekend deliveries', lane: 0, row: 0, kind: 'human', detail: 'Jordan has a ticket asking for a change to one customer’s settings.' },
          { id: 'scope', name: 'Inside the line?', sub: 'verified tasks only', lane: 1, row: 1, kind: 'check', detail: 'The runbook covers only what was checked. Outside that line, the rule is simple: stop.' },
          { id: 'task', name: 'Find the task', sub: 'path, steps, Check, warning', lane: 1, row: 2, kind: 'store', detail: 'Every task has the same shape, so Jordan always knows where the warning will be.' },
          { id: 'big', name: 'Hits every customer?', lane: 3, row: 3, kind: 'gate', detail: 'A few actions change every customer at once. They say “escalate first”, and each points to a narrower tool that does the job.' },
          { id: 'note', name: 'Note what’s there now', sub: 'in case it must be reversed', lane: 0, row: 3, kind: 'human', detail: 'Before any change, write down the current state. Cancel won’t bring it back.' },
          { id: 'rehearse', name: 'Rehearse first', sub: 'practice environment', lane: 2, row: 4, kind: 'external', detail: 'A task he hasn’t run before gets practised away from real customers first.' },
          { id: 'doit', name: 'Make the change', sub: 'saves on click', lane: 2, row: 5, kind: 'external', detail: 'The switch saves the moment it is clicked, with the ticket reference in the reason field.' },
          { id: 'check', name: 'The Check line', sub: 'what success looks like', lane: 1, row: 6, kind: 'check', detail: 'A row, a date, a history entry: the runbook says exactly what Jordan should see.' },
          { id: 'err', name: 'An error?', sub: 'read the state again', lane: 0, row: 7, kind: 'human', detail: 'A failure message doesn’t mean nothing happened. Read the state again before retrying; the runbook translates each error message into its cause.' },
          { id: 'done', name: 'Done, on record', lane: 0, row: 8, kind: 'output', detail: 'Changed, checked and logged with its reason.' },
        ],
        edges: [
          { from: 'ticket', to: 'scope', label: 'the request' },
          { from: 'scope', to: 'task', label: 'in scope' },
          { from: 'task', to: 'big', label: 'high impact' },
          { from: 'task', to: 'note', label: 'routine' },
          { from: 'big', to: 'note', label: 'approved' },
          { from: 'note', to: 'rehearse', label: 'the old state' },
          { from: 'rehearse', to: 'doit', label: 'practised' },
          { from: 'doit', to: 'check', label: 'the change' },
          { from: 'check', to: 'err', label: 'doesn’t match' },
          { from: 'err', to: 'doit', label: 'retry, after re-reading' },
          { from: 'check', to: 'done', label: 'matches' },
        ],
      },
      caption: 'How the runbook walks a support agent through one change. Recreation, fictional admin tool.',
    },
    { p: 'One more rule, in plain words: a change that narrows what a customer can use needs a business decision behind it, never tidying up.' },

    { h2: 'My role and the team' },
    { p: 'I chose what to document, for whom, and the rules every page follows. AI agents read the code and drafted the manuals under my direction. One manual began because I asked to be taught a subsystem from a product person’s view, and I worked a real ticket through it.' },
    { table: {
      columns: ['Stage', 'Me', 'AI agents', 'Team'],
      rows: [
        ['Scope', 'Chose the subsystem, the readers and what they must be able to do', '', ''],
        ['Reading', 'Set the rules: read-only, dated, nothing run live', 'Read the code and traced each flow', ''],
        ['Drafting', 'Directed the manuals; wrote the support runbook', 'Drafted the manuals to my structure', ''],
        ['Decisions', 'Listed open questions with a recommended answer', '', 'Decides the open questions'],
        ['Upkeep', 'Had the code read again; replaced my older manual', 'Listed the corrections', ''],
      ],
    }, caption: 'Who did what. I set the method and directed the manuals, I wrote the runbook, and the team decides the open questions.' },

    { h2: 'How I approached it' },
    { stages: [
      { name: 'Question', part: 'What must each reader be able to do afterwards?', by: 'me' },
      { name: 'Read the code', part: 'Dated, read-only, nothing run live', by: 'ai' },
      { name: 'Model first', part: 'One sentence everything hangs on', by: 'me' },
      { name: 'Layers and tags', part: 'A layer per audience, a tag per claim', by: 'me' },
      { name: 'End in action', part: 'Triage steps, tests, questions with answers', by: 'me' },
      { name: 'Keep it true', part: 'Read again; replace, don’t patch', by: 'proved', now: true },
    ], caption: 'How a subsystem becomes a reference people can act on, with who carried each stage.' },

    { h2: 'Key decisions' },
    { decisions: [
      {
        q: 'Where should the truth come from?',
        options: ['Existing documents and what people remember', 'A fresh, read-only reading of the code, dated'],
        chose: 'A fresh, read-only reading of the code, dated',
        why: 'Documents drift and memories differ. A date tells the reader exactly how old the truth is.',
      },
      {
        q: 'What about things that don’t exist?',
        options: ['Leave them out', 'Give them their own section'],
        chose: 'Give them their own section',
        why: 'Testers plan around behaviour they assume exists. A section on what isn’t built, including code that looks like a feature but has no way in, stops that.',
      },
      {
        q: 'Should a manual settle the open questions?',
        options: ['Decide them in the document', 'Say what was found and recommend an answer'],
        chose: 'Say what was found and recommend an answer',
        why: 'A document that decides quietly takes the decision from the people who own it. A recommendation keeps it fast without taking it away.',
      },
      {
        q: 'What happens when an old manual is wrong?',
        options: ['Patch it', 'Read the code again and publish a dated replacement'],
        chose: 'Read the code again and publish a dated replacement',
        why: 'A patch leaves readers unsure which parts were checked. A dated replacement says exactly which code it describes.',
      },
    ], caption: 'The decisions behind the method, in my words.' },
    { call: {
      saw: 'People trusted documents about our own product as if every line had been checked. Some lines described things that were never built, or no longer worked that way.',
      decided: 'Every claim carries a tag: verified in code, not built, or inferred. Every page is dated against the code it was read from.',
      why: 'A reader can act on a verified line, check an inferred one, and stop planning around one that isn’t built. Without the tag, all three look the same.',
    } },

    { h2: 'How we knew it was right' },
    { list: [
      'No untagged claims, and every page carries its provenance: which code, and when.',
      'Reported is kept apart from verified until the code confirms it.',
      'One reference was re-verified by a separate multi-agent AI audit.',
      'Where two screens for the same record apply different rules, that becomes a regression check, not a footnote.',
      'Every rule has its exact on-screen message, so it can be tested.',
    ] },

    { h2: 'Where it is now' },
    { p: 'This is how I document a subsystem now. The references so far cover a payments feature, how a customer’s main contact is created and kept across the dealer-management systems we integrate with, and subscription operations for support.' },
    { timeline: [
      { when: 'Aug 2026', title: 'The first manual', detail: 'A payments feature, read from the code and written as a course for a business analyst, with a real ticket worked through it.' },
      { when: 'Sep 2026', title: 'The contact reference', detail: 'A main contact across every integrated system, laid out to grow one module at a time.' },
      { when: 'Sep 2026', title: 'The support runbook', detail: 'Subscription operations for support, under my own name.' },
      { when: 'Oct 2026', title: 'Read again, replaced', detail: 'Two months on, a fresh read of the code found where the first manual was wrong. A dated replacement took its place.' },
    ], caption: 'How the method grew, one document at a time.' },

    { h2: 'What I learned' },
    { quote: 'Say how sure you are, and say how old the truth is.' },
    { p: 'A document is only as useful as the reader’s trust in each line, and tags and dates earn that trust.' },
    { p: 'Writing down what doesn’t exist turned out to be the most useful section for a product person. Each gap explains a pattern of tickets, and some are product decisions waiting to be made.' },
    { link: { to: '/case-studies/domain-knowledge-base', text: 'How I turned months of shadowing into a training programme' } },
    { link: { to: '/case-studies/product-decisions', text: 'How I frame product decisions' } },
    { link: { to: '/case-studies/feature-intelligence', text: 'Feature Intelligence: an evidence status on every statement' } },
  ],
};
