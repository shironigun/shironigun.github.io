// Product decisions and research, told end to end (round 2, 11 Nov 2026). Company work: methods, rules and
// reasoning only; no plan or tier names, packs, module names, prices, customers or counts from the product.
// Ownership words follow the sources: he analysed and specified the feature-access rules, built the
// decision tool (AI agents built it to his design), and commissioned and directed the research (AI research
// agents wrote it for him). No workshops, no packaging model, no "small trial": the research recommends a
// measurement spike on existing data. The July decision-card prototype (merged.md §3) is described, not
// named; it is v0.1 and not deployed. Sources: docs/private/artifacts/product-docs.md (the access deck and the
// email decision tool), docs/private/artifacts/ai-products.md §5, docs/private/chat-exports/merged.md §2, §3,
// §5, §6, §10 (C18, C19).
export default {
  updated: 'November 2026',
  body: [
    { p: 'The morning subscription plans go live, Dana, a rep at a dealership, opens her menu and something she used yesterday has gone. Is it broken? Did someone remove it? Nothing on the screen says.' },
    { p: 'Some product questions have to be settled before anyone builds the answer. As the team’s business analyst, the person who turns a fuzzy need into rules a team can build and test, I frame the question, lay out the options, recommend one, and check the result against what ships. Here are three: feature-access rules I analysed and specified, a decision tool I built for a new email channel, and research I commissioned and directed on measuring rep performance without a score.' },

    { h2: 'At a glance' },
    { ol: [
      'I analysed what subscription plans would mean for every module, and specified access as two nested gates.',
      'I replaced “hide what’s locked” with “show it and explain”, and kept everything for customers without a plan.',
      'I built a decision tool for a new email channel: one question per page, with options and a recommendation.',
      'I commissioned research on measuring rep performance, asked for my hypothesis to be challenged, and had the thresholds fixed before any data was seen.',
    ] },
    { numbers: [['2', 'gates: the customer’s plan, then the user’s role'], ['1', 'recommendation for every open question'], ['0', 'scores that rank a person, in any outcome']] },

    { h2: 'Three questions, no answers yet' },
    { p: 'Worse, a link a colleague sent her opens “page not found”. That is what the first acceptance criterion would have done: a locked module simply vanished. A module is a part of the product with its own menu entry, such as reports or messaging.' },
    { p: 'A new email channel with several people in one conversation raised its own questions: what a newly added person sees of the history, what an opt-out actually stops. And measuring a rep’s performance from conversations is easy to get wrong: unfair, unstable, easy to game and exposed in law.' },

    { h2: 'Two gates, one inside the other' },
    { p: 'Subscription plans were arriving in a product where every customer had always had everything. I mapped every place each module appears, not just its own screen, and specified access as two gates.' },
    { p: 'Gate one asks whether the customer’s plan includes the module. Gate two asks whether the user’s role has been granted it. A role can only ever hold part of what the plan allows, and the plan is checked first, so the upgrade message wins over the administrator message. Follow Dana’s click: it can stop at either gate, and each stop shows her a different screen.' },
    {
      graph: {
        lanes: [{ name: 'Dana', note: 'the user' }, { name: 'The dealership', note: 'its plan' }, { name: 'Her administrator', note: 'her role' }, { name: 'Product', note: 'what she sees' }],
        nodes: [
          { id: 'open', name: 'Dana opens a module', sub: 'from the menu or a link', lane: 0, row: 0, kind: 'human', detail: 'A menu entry or a colleague’s link. Either way, one verdict decides what happens.' },
          { id: 'legacy', name: 'No plan yet?', sub: 'existing customers', lane: 1, row: 1, kind: 'check', detail: 'A customer not yet on a plan passes the plan gate automatically, so existing customers keep everything.' },
          { id: 'plan', name: 'Gate 1: in the plan?', lane: 1, row: 2, kind: 'check', detail: 'Does the dealership’s plan include this module? Checked first, so the upgrade message wins.' },
          { id: 'upgrade', name: 'Not in your plan', sub: 'upgrade contact', lane: 3, row: 3, kind: 'output', detail: 'The entry stays in the menu, greyed with a padlock. Opening it explains why and offers a contact for upgrading.' },
          { id: 'role', name: 'Gate 2: granted?', lane: 2, row: 3, kind: 'check', detail: 'Has her administrator granted this module to her role? A role can never hold more than the plan allows.' },
          { id: 'admin', name: 'Ask your administrator', sub: 'no sales message', lane: 3, row: 4, kind: 'output', detail: 'The same padlocked entry. Opening it says an administrator restricted it, with no upgrade pitch.' },
          { id: 'works', name: 'The module works', lane: 3, row: 5, kind: 'output', detail: 'Both gates said yes, so the module opens as normal.' },
        ],
        edges: [
          { from: 'open', to: 'legacy', label: 'request' },
          { from: 'legacy', to: 'plan', label: 'on a plan' },
          { from: 'legacy', to: 'role', label: 'no plan: passes' },
          { from: 'plan', to: 'upgrade', label: 'not in the plan' },
          { from: 'plan', to: 'role', label: 'in the plan' },
          { from: 'role', to: 'admin', label: 'not granted' },
          { from: 'role', to: 'works', label: 'granted' },
        ],
      },
      caption: 'One request, two gates, three outcomes. The plan is checked first, so its message wins.',
    },
    { p: 'Both locks look the same in the menu; the difference shows only when Dana opens one. Elsewhere in the product, references to a locked module, such as a button or a column, are hidden. Inside a module, access can reach down to a tab, a card, a field or a single control.' },
    { p: 'Two more rules protect customers. Anyone without a plan keeps everything, so rollout could start with new customers only. And the suggested upgrade is the smallest plan that covers what a customer already has and what they need. On a ladder that branches, the next plan up can be a sideways step that drops something they pay for today.' },
    { p: 'AI agents turned the model into an interactive walkthrough to my specification, with a gate simulator and a module-impact explorer.' },

    { h2: 'Checked against what shipped' },
    { p: 'Kickoff decisions are guesses until the code ships. Then I re-checked every one against it and recorded its status with evidence: resolved, partly resolved, superseded or open. Where the walkthrough’s earlier framing was wrong, the rebuilt version says so.' },
    { p: 'What stayed unresolved sits on an honest list, each item with an owner: a product decision still to make, work deferred to a later phase, a QA sign-off, and a place where the build diverged from my specification.' },

    { h2: 'A recommendation on every card' },
    { p: 'The email channel’s stories couldn’t be finished until its open questions had answers. So I built a decision tool: one question per page, with short context, three concrete options, a write-in and my recommendation.' },
    { p: 'Each option is compared with a reference product and with today’s build, and plays as a small animated scene, so a non-technical decider sees the consequence. A summary page copies the picks as text for the user stories.' },
    { p: 'The same card format runs through a decision-card prototype I designed in July 2026 for reviewing stories: a busy stakeholder clears a deck in about three minutes, from a link, with no login. It is at version 0.1, not deployed. Watch the fork at the end: agreement closes a card, disagreement becomes the meeting agenda.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'AI agents' }, { name: 'Deciders' }, { name: 'Team' }],
        nodes: [
          { id: 'frame', name: 'Frame the question', sub: 'one per card', lane: 0, row: 0, kind: 'human', detail: 'One open question, with just enough context to decide it. For the email channel: what does an opt-out actually stop?' },
          { id: 'opts', name: 'Write three options', sub: 'plus a write-in', lane: 0, row: 1, kind: 'human', detail: 'Three concrete options, always with an escape hatch: write a different answer.' },
          { id: 'lean', name: 'Mark my recommendation', sub: 'a badge on one option', lane: 0, row: 2, kind: 'human', detail: 'My lean carries a badge. In the July prototype it is never pre-selected, so nobody agrees by default.' },
          { id: 'scene', name: 'Show the consequence', sub: 'a scene per option', lane: 1, row: 3, kind: 'ai', detail: 'AI agents built the tool to my design. Each option plays as a small scene.' },
          { id: 'pick', name: 'Pick, or write in', lane: 2, row: 4, kind: 'gate', detail: 'The decider chooses. The decision is theirs; the card makes it quick and clear.' },
          { id: 'match', name: 'Do the picks agree?', lane: 1, row: 5, kind: 'check', detail: 'In the July prototype, answers come back structured: matches my lean, differs, or a suggestion of their own.' },
          { id: 'agenda', name: 'On the agenda', sub: 'only the disagreements', lane: 2, row: 6, kind: 'output', detail: 'When reviewers differ, the card goes on the meeting agenda, so the meeting is spent only on real disagreements.' },
          { id: 'stories', name: 'Into the stories', sub: 'copied summary', lane: 3, row: 7, kind: 'output', detail: 'Agreed cards close themselves. In the email tool, a summary page copies every pick as text, ready for the user stories.' },
        ],
        edges: [
          { from: 'frame', to: 'opts', label: 'the question' },
          { from: 'opts', to: 'lean', label: 'three options' },
          { from: 'lean', to: 'scene', label: 'my lean' },
          { from: 'scene', to: 'pick', label: 'the card' },
          { from: 'pick', to: 'match', label: 'answers' },
          { from: 'match', to: 'agenda', label: 'they differ' },
          { from: 'match', to: 'stories', label: 'they agree' },
        ],
      },
      caption: 'The decision-card format. The agree-or-agenda split is from the July prototype; the copied summary from the email tool.',
    },
    { p: 'My recommendations for the email channel followed one principle: don’t try to control what you can’t.' },
    { cards: [
      { title: 'Don’t guard their inbox', tag: 'control', body: 'If a customer adds someone, or drops our address from a thread, accept it. We can’t control their inbox anyway.' },
      { title: 'Keep consent narrow', tag: 'opt-out', body: 'Opting out removes someone from bulk sends and surveys. One-to-one email still works.' },
      { title: 'Link as little as possible', tag: 'identity', body: 'If an added address belongs to another customer, it joins this thread only. The two customer records stay apart.' },
    ], columns: 3, caption: 'The principle behind my recommendations. They are recommendations; the tool records no outcomes.' },

    { h2: 'Performance without a score' },
    { p: 'The third question followed the customer-sentiment prototype that also led to Promise Tracker. Could we measure how well a rep is doing from their conversations, without building something unfair or easy to game?' },
    { p: 'I wrote down my own answer first: performance should be read mainly from conversations. Then I commissioned research and asked for that hypothesis to be challenged. AI research agents searched industry products, the measurement science and the law, and wrote the brief for me.' },
    { p: 'Follow the packet. The amber gate comes before the data, not after it, and that order is the whole trick.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'AI research agents' }, { name: 'Product', note: 'the scope it allows' }],
        nodes: [
          { id: 'q', name: 'Ask, and guess first', sub: 'my hypothesis, written down', lane: 0, row: 0, kind: 'human', detail: 'Should performance be read mainly from conversations? I wrote my answer down, then asked for a challenge.' },
          { id: 'search', name: 'Search and weigh', sub: 'products, science, law', lane: 1, row: 1, kind: 'ai', detail: 'Industry products, measurement research and the law, each claim tagged by strength of evidence.' },
          { id: 'inject', name: 'Hidden instruction', sub: 'flagged, not obeyed', lane: 1, row: 2, kind: 'check', detail: 'One web page carried an instruction aimed at the AI. It was flagged and ignored.' },
          { id: 'brief', name: 'The brief', sub: 'conclusion kept, reasoning changed', lane: 1, row: 3, kind: 'output', detail: 'My conclusion held; my reasoning didn’t. It recommends a coaching tool that explains rather than rates.' },
          { id: 'fix', name: 'Fix the thresholds', sub: 'before any data', lane: 0, row: 4, kind: 'gate', detail: 'The rule that turns a measurement into a scope is written before anyone sees a number.' },
          { id: 'spike', name: 'Measurement spike', sub: 'recommended next', lane: 2, row: 5, kind: 'external', detail: 'A short analysis of existing data: how much of the variation belongs to the person, not their customers or queue. Recommended, not yet run.' },
          { id: 'none', name: 'Under 10%', sub: 'no per-person product', lane: 2, row: 6, kind: 'output', detail: 'If the person explains too little, there is nothing fair to show about them.' },
          { id: 'self', name: '10% to 25%', sub: 'own baseline only', lane: 2, row: 7, kind: 'output', detail: 'Each person compared only with their own recent self.' },
          { id: 'peer', name: 'Over 25%', sub: 'peers, as a second view', lane: 2, row: 8, kind: 'output', detail: 'Peer comparison as a secondary view, adjusted for case mix. Still no score, no leaderboard.' },
        ],
        edges: [
          { from: 'q', to: 'search', label: 'question + hypothesis' },
          { from: 'search', to: 'inject', label: 'sources' },
          { from: 'inject', to: 'brief', label: 'tagged evidence' },
          { from: 'brief', to: 'fix', label: 'recommendation' },
          { from: 'fix', to: 'spike', label: 'thresholds' },
          { from: 'spike', to: 'none', label: 'share of variation' },
          { from: 'spike', to: 'self' },
          { from: 'spike', to: 'peer' },
        ],
      },
      caption: 'The research path. The thresholds come before the spike, so its result can’t be argued afterwards.',
    },
    { lead: 'My conclusion held; my reasoning didn’t.', p: 'Credit has to follow who sent each message, not who holds the conversation, because assignment changes and overwrites its own history.' },
    { lead: 'Sentiment points; it doesn’t score.', p: 'Across the industry, sentiment routes attention and a rubric produces any number. Common sentiment models are also weaker on negative text, the messages that matter most. So sentiment picks which conversations a manager should review. No arrow runs from sentiment to a person’s number; that missing arrow is the design.' },
    { lead: 'Why no ranking.', p: 'In the closest well-studied comparison, teachers’ value-added scores, the individual explains between 1% and 14% of the variation, and more data doesn’t remove the effect of who they serve. A ranking would reward the queue, not the person.' },
    { p: 'What the brief recommends instead, in two lists:' },
    { pair: [
      { title: 'Measure, each on its own', items: ['How quickly and how widely someone responds, as two numbers', 'Persistence with each lead', 'Replies earned', 'Topic coverage', 'Consistency'] },
      { title: 'Never measure', items: ['Volume or handle time', 'Any composite score or leaderboard', 'Sentiment as a scored input', 'Anything people type in about themselves', 'The employee’s own emotional state'] },
    ] },
    { p: 'It also suggests measuring the manager too, and using the tool for recognition: showing the conversation where someone turned an unhappy customer around.' },

    { h2: 'My role and the team' },
    { table: {
      columns: ['Stage', 'Me', 'AI agents', 'Team'],
      rows: [
        ['Access', 'Mapped where every module appears; specified the gates, verdicts and “show it and explain”', 'Traced the code; built the walkthrough', 'Developers built the enforcement'],
        ['Re-check', 'Re-checked each kickoff decision against the shipped code', 'Read the shipped code', 'Each open item has an owner'],
        ['Email channel', 'Designed the decision tool; framed each question and a recommendation', 'Built the tool to my design', ''],
        ['Research', 'Set the question and my hypothesis; asked to be challenged', 'Searched, weighed the evidence and wrote the brief', ''],
      ],
    }, caption: 'Who did what. I framed and decided; AI agents read, traced, built and wrote up; developers built the product.' },

    { h2: 'How I approached it' },
    { stages: [
      { name: 'Frame', part: 'The question, and my own answer, written first', by: 'me' },
      { name: 'Evidence', part: 'Where each module surfaces; what research says', by: 'ai' },
      { name: 'Options', part: 'Concrete options, a recommendation each', by: 'me' },
      { name: 'Re-check', part: 'Every decision against the code that shipped', by: 'proved' },
      { name: 'Open list', part: 'What is still open, each with an owner', by: 'me', now: true },
    ], caption: 'How a question moves from framing to a checked decision, with who carried each stage.' },

    { h2: 'Key decisions' },
    { decisions: [
      {
        q: 'What should a locked module do?',
        options: ['Disappear from the menu', 'Stay visible and explain why it’s locked'],
        chose: 'Stay visible and explain why it’s locked',
        why: 'A module that vanishes looks like a fault. A padlocked entry that explains itself says what happened and who can change it.',
      },
      {
        q: 'What happens to existing customers?',
        options: ['Move everyone onto a plan at launch', 'Customers without a plan keep everything'],
        chose: 'Customers without a plan keep everything',
        why: 'Existing customers behave exactly as before until they move onto a plan, so rollout could start with new customers only.',
      },
      {
        q: 'Which plan should an upgrade suggest?',
        options: ['The next plan up', 'The smallest plan that covers what they have and what they need'],
        chose: 'The smallest plan that covers what they have and what they need',
        why: 'On a branching ladder, the next plan up can drop something the customer already has. An upgrade should never take anything away.',
      },
      {
        q: 'Should a decision card pre-select my recommendation?',
        options: ['Pre-select it to save time', 'Badge it, and make them choose'],
        chose: 'Badge it, and make them choose',
        why: 'A pre-selected answer turns review into agreement by default. A badge shows my lean and still asks for a real choice.',
      },
    ], caption: 'The decisions, in my words.' },
    { call: {
      saw: 'I believed rep performance should be read mainly from conversations, and I wanted that tested before I wrote a single requirement.',
      decided: 'I asked for my hypothesis to be challenged and accepted the result: my conclusion held, my reasoning didn’t. Then I had the thresholds that decide the scope written down before anyone looked at the data.',
      why: 'A threshold chosen after the data is seen can be argued to fit any result. Written first, it settles the question.',
    } },

    { h2: 'Rules from the research' },
    { list: [
      'Measure what the system records, such as message times, never what people report about themselves: those fields get gamed.',
      'No composite score, no ranking, never linked to pay. Coaching only.',
      'Uncertainty on every figure, and “not enough data” as a real answer.',
      'The law is a design input. Human oversight, logs and telling staff what is measured are features, not afterthoughts.',
    ] },

    { h2: 'How we knew it was right' },
    { list: [
      'Every access decision was re-checked against the shipped code.',
      'The thresholds were fixed before any data was seen.',
      'The research tagged each claim by strength of evidence and listed its gaps.',
      'A web page carrying a hidden instruction was flagged, not obeyed.',
    ] },

    { h2: 'Where it is now' },
    { p: 'Developers built the access rules in phases, with rollout planned to start with new customers. The research recommends one step before any requirement: a measurement spike on existing data, judged by the thresholds already fixed. Its principles already shaped the performance view in the customer-sentiment prototype: no composite score, no ranking, no figure without enough data.' },

    { h2: 'What I learned' },
    { quote: 'Write the threshold down before you see the number.' },
    { p: 'Asking to be proved wrong was the most useful thing I did. My conclusion survived and my reasoning didn’t, and the reasoning is what the requirements would have been built on.' },
    { p: 'And a decision isn’t finished when it’s made. It’s finished when it has been checked against what shipped.' },
    { link: { to: '/case-studies/ai-prototyping', text: 'The prototype the research grew out of' } },
    { link: { to: '/case-studies/promise-tracker', text: 'How a customer-sentiment idea became Promise Tracker' } },
    { link: { to: '/case-studies/product-documentation', text: 'How I document a subsystem so others can act on it' } },
  ],
};
