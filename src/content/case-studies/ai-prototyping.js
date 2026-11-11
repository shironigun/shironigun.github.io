// AI product prototyping, told end to end (round 2, 11 Nov 2026). Sources: docs/private/chat-exports/merged.md
// §2 (prototyping, product decisions), §3, §5, §6 (the Customer Sentiment prototype: five sources, one at-risk
// list, "a metric type that cannot show a number without context"), §8 (E18: "assisted the Product Owner"
// on campaigns), §10 (the campaign AI audit; keep "assisted"), docs/private/artifacts/ai-products.md §3
// (rules sorted by who enforces them) and §5, and the broadcast analytics notes in the E1/E2 exports.
// Company rule: what he did and the problem it solved, in generic words; no internal names, data, rules
// or counts. Campaign planning was colleagues' idea and build: he assisted and built the evaluation.
// The sentiment pivot: a real-data check refuted sentiment scoring as the central mechanism.
export default {
  updated: 'November 2026',
  body: [
    { p: 'A product meeting. Someone says, “What if the AI told us which customers are unhappy?” Every head nods. Nobody in the room can say whether the score would be right, whether a manager would act on it, or what happens on the day it’s wrong.' },
    { p: 'That is where I come in. I turn AI ideas into prototypes people can click, grounded in real dealership workflows, and I check each one against reality before anyone builds it. Sometimes the prototype says yes. The most useful one said no, and that no became Promise Tracker.' },
    { p: 'I shape the idea and the workflow, specify the prototype and judge how it behaves. AI agents build it with Figma Make and Claude Code; developers build what moves forward. On campaign planning the idea and the build were colleagues’: I assisted the Product Owner and built the evaluation.' },

    { h2: 'At a glance' },
    { ol: [
      'I specify each prototype criterion by criterion; AI agents build it with Figma Make and Claude Code.',
      'I check each idea against reality: a dealer set the scope of one prototype, and real conversations changed the direction of another.',
      'I build measurement honesty into anything that shows a number: no composite score, no ranking, no number without context.',
      'On AI campaign planning I assisted the Product Owner, and built the evaluation that audits the AI’s rules against live answers.',
    ] },
    { numbers: [['3', 'prototypes of my own so far'], ['Pilot', 'Promise Tracker, which began on this shelf'], ['0', 'composite scores or rankings of people']] },

    { h2: 'Easy to like, hard to judge' },
    { p: 'A slide can’t answer those questions. They usually surface after developers have started, when changing course is expensive.' },
    { p: 'AI features also fail in ways a mockup hides: a rule nobody checks, a number with too little data behind it. I want each idea to meet those questions while changing course is still cheap.' },

    { h2: 'The prototype shelf' },
    { p: 'A prototype is a stand-in for a feature: real enough to click through, fake underneath. Three here are mine; the fourth is a colleague’s that I assisted on.' },
    { table: {
      columns: ['Prototype', 'The question', 'My part', 'Where it went'],
      rows: [
        ['Broadcast analytics, June 2026', 'Did a broadcast pay off?', 'My own feature idea; agreed the first scope with a dealer; specified the prototype', 'A demo on representative data, with a handover brief for the developers'],
        ['Customer sentiment, Aug to Sep 2026', 'Which customers are at risk, and why?', 'Specified it criterion by criterion; led the check against real conversations', 'Changed direction; its best parts became Promise Tracker'],
        ['Promise Tracker, Sep to Nov 2026', 'What does the dealership still owe each customer?', 'Led its product definition', 'In pilot, ahead of its production release'],
        ['AI campaign planning, Sep to Nov 2026', 'What should a dealer send, to whom, and when?', 'Assisted the Product Owner; built the evaluation', 'Built by colleagues; open questions with the team, each with its evidence'],
      ],
    }, caption: 'The prototype shelf so far. Campaign planning was colleagues’ work that I assisted on.' },

    { h2: 'One loop for every idea' },
    { p: 'Every prototype of mine goes round the same loop. Watch the amber gate: there an idea either earns a handover or goes back round with a better question.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'AI agents' }, { name: 'Dealers and data' }, { name: 'Developers' }],
        nodes: [
          { id: 'q', name: 'Start from a decision', sub: 'what must this settle?', lane: 0, row: 0, kind: 'human', detail: 'Every prototype begins with the decision it has to inform, such as “would a manager act on this list?”.' },
          { id: 'spec', name: 'Specify it', sub: 'criterion by criterion', lane: 0, row: 1, kind: 'human', detail: 'I write what it must do, acceptance criterion by acceptance criterion: the screens, the flows, what each one shows.' },
          { id: 'build', name: 'Build the prototype', sub: 'Figma Make, Claude Code', lane: 1, row: 2, kind: 'ai', detail: 'AI agents build it from my specification, away from the live product and with representative data.' },
          { id: 'click', name: 'Click through it', sub: 'every flow', lane: 0, row: 3, kind: 'human', detail: 'I use it the way a manager or a dealer would, and send back what is wrong.' },
          { id: 'real', name: 'Meet reality', sub: 'real data or a real dealer', lane: 2, row: 4, kind: 'external', detail: 'A read-only check against real conversations, or a dealer choosing what goes in. The step a slide can’t fake.' },
          { id: 'gate', name: 'Keep or pivot?', lane: 0, row: 5, kind: 'gate', detail: 'I read the evidence and decide. A no means the prototype did its job, and the loop starts again with a better question.' },
          { id: 'brief', name: 'Write the handover', sub: 'what it fakes, what must be real', lane: 0, row: 6, kind: 'human', detail: 'A brief for the developers: what the prototype fakes, what the real build must get right, and the open decisions.' },
          { id: 'dev', name: 'Developers build it', lane: 3, row: 7, kind: 'output', detail: 'The developers build what moves forward, and I support them through the build.' },
        ],
        edges: [
          { from: 'q', to: 'spec', label: 'the decision' },
          { from: 'spec', to: 'build', label: 'acceptance criteria' },
          { from: 'build', to: 'click', label: 'working prototype' },
          { from: 'click', to: 'real', label: 'my questions' },
          { from: 'real', to: 'gate', label: 'evidence' },
          { from: 'gate', to: 'spec', label: 'pivot: a better question' },
          { from: 'gate', to: 'brief', label: 'keep' },
          { from: 'brief', to: 'dev', label: 'handover brief' },
        ],
      },
      caption: 'The prototype loop. The wire back up is a pivot; only a kept idea reaches the developers.',
    },

    { h2: 'The dealer gets the last word' },
    { p: 'Broadcast analytics was my own feature idea. A broadcast is one message sent to many customers at once, and the question was: did it pay off? I agreed the first version’s scope with a dealer, item by item.' },
    { p: 'To credit a sale to a broadcast, you count the days after it went out. The research recommended a longer window; the dealer preferred a shorter one. The prototype exists to show dealers the feature, so it uses the dealer’s default and keeps the window adjustable.' },
    { p: 'Each result is compared with the dealer’s own previous broadcast of the same type, not an industry average, and reads improved, declined or first of its kind. The prototype never writes to the product, and its brief lists what the real build must still get right.' },

    { h2: 'The prototype that said no' },
    { p: 'The customer sentiment prototype asked “which customers are at risk, and why?”. It pulled five sources into one at-risk list: conversations, surveys, a website form, email and lost deals.' },
    { p: 'An early build had the dashboard and the flagged list counting from different places, so they disagreed. I had both rebuilt on one shared list behind every screen. It covered every acceptance criterion in its story, with the later ideas behind a switch.' },
    { p: 'By the criteria, it was done. So I asked for a read-only check against real conversations. Follow the packet to the fork: one branch dies, one lives, and a colleague’s work joins the survivor.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'AI agents' }, { name: 'Colleagues' }, { name: 'Product' }],
        nodes: [
          { id: 'ask', name: 'The brief: sentiment', sub: 'who is unhappy, and why?', lane: 0, row: 0, kind: 'human', detail: 'Score how customers feel and surface the unhappy ones. I specified it criterion by criterion.' },
          { id: 'proto', name: 'One at-risk list', sub: 'five sources', lane: 1, row: 1, kind: 'ai', detail: 'AI agents built it to my specification, and it met every acceptance criterion.' },
          { id: 'check', name: 'Real-data check', sub: 'read-only queries', lane: 1, row: 2, kind: 'ai', detail: 'At my request, read-only queries ran against real dealer conversations.' },
          { id: 'turn', name: 'Ask a better question', sub: 'what would a dealer pay for?', lane: 0, row: 3, kind: 'human', detail: 'The check refuted sentiment scoring as the central mechanism. I set the story aside and asked what a dealer would actually pay for.' },
          { id: 'drop', name: 'Dropped: mood as score', lane: 3, row: 4, kind: 'output', detail: 'Scoring how customers feel stopped being the heart of the feature.' },
          { id: 'keep', name: 'Kept: performance view', sub: 'measurement honesty', lane: 3, row: 5, kind: 'output', detail: 'The same check backed the performance angle, so the honest performance view stayed.' },
          { id: 'queue', name: 'A colleague’s queue', sub: 'promises not yet kept', lane: 2, row: 5, kind: 'human', detail: 'A colleague had built a queue of promises reps hadn’t kept. I directed the merge of its best parts.' },
          { id: 'pt', name: 'Promise Tracker', sub: 'what we still owe', lane: 3, row: 6, kind: 'output', detail: 'First a “we owe” queue, then Promise Tracker: what the dealership still owes each customer. Now in pilot.' },
        ],
        edges: [
          { from: 'ask', to: 'proto', label: 'acceptance criteria' },
          { from: 'proto', to: 'check', label: 'the idea' },
          { from: 'check', to: 'turn', label: 'evidence' },
          { from: 'turn', to: 'drop', label: 'refuted' },
          { from: 'turn', to: 'keep', label: 'backed' },
          { from: 'keep', to: 'pt', label: 'performance view' },
          { from: 'queue', to: 'pt', label: 'the promise queue' },
        ],
      },
      caption: 'The sentiment pivot as a fork: what the real-data check refuted, and what it backed.',
    },
    { p: 'What hurt dealers wasn’t a customer’s mood. It was commitments nobody kept. And speed isn’t keeping your word: a fast reply that promises something and then goes quiet looks good on a speed board and bad on a list of what we owe.' },

    { h2: 'A number never travels alone' },
    { p: 'The performance view shows how responsive each person is, and a number about a person reads as a verdict. So I set three rules: no composite score, no ranking, and no number without context.' },
    { p: 'The third rule lives in the data, not the screen. Every measure travels as one package: value, sample size, whether that sample is enough, likely range and previous value. It is a metric type that cannot show a number without context. Below a minimum sample, the screen says there isn’t enough data yet.' },
    { table: {
      columns: ['Measure', 'Value', 'Based on', 'Likely range', 'Before', 'On screen'],
      rows: [
        ['Median first reply', '14 min', '61 conversations', '11 to 19 min', '17 min', 'The figure, with its range'],
        ['Answered the same day', '82%', '61 conversations', '71% to 89%', '78%', 'The figure, with its range'],
        ['Customers who replied', '', '6 conversations', '', '', '“Not enough data yet”'],
      ],
    }, caption: 'One person’s performance view: a figure arrives with its sample, range and previous value, or not at all. Recreation, fictional data.' },
    { p: 'Credit follows whoever sent each message, not whoever holds the conversation. Where a flag comes from a fixed rule rather than the AI, as with a lost deal, the screen says so.' },

    { h2: 'Checking an AI I didn’t build' },
    { p: 'AI campaign planning suggests what a dealer should send, to whom and when. The idea and the build were colleagues’. I assisted the Product Owner: I had the prototype’s screens ported into the product, chose the layouts, specified a guided send flow, and had a developer-heavy explainer rewritten for QA and product.' },
    { p: 'The evaluation is mine. Each AI helper gets a must-pass format test, which checks the answer’s shape, then one test per rule it can get wrong, and a hidden-instruction test, where text inside the input tries to give the AI orders. That test blocks a release on its own, and a case counts only after three passing runs.' },
    { p: 'Then the audit, read-only, across the whole chain: instructions, the product’s checks, the code that calls the AI, and live answers. Watch where each rule lands. The third stop is where problems hide.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'AI agents' }, { name: 'Product' }, { name: 'Team' }],
        nodes: [
          { id: 'gather', name: 'Collect every rule', sub: 'instructions, checks, docs', lane: 0, row: 0, kind: 'human', detail: 'The rules lived in places that didn’t agree. I gathered them into one list.' },
          { id: 'inv', name: 'Map what really runs', sub: 'from the code', lane: 1, row: 1, kind: 'ai', detail: 'Which AI helpers the product calls, which are switched off, and which nothing calls. From the code, not the documents.' },
          { id: 'rej', name: 'Product rejects it?', lane: 2, row: 2, kind: 'check', detail: 'The strongest kind of rule: break it and the product refuses the answer and asks again.' },
          { id: 'rep', name: 'Product repairs it?', lane: 2, row: 3, kind: 'check', detail: 'A softer kind: the product fixes a small slip in place.' },
          { id: 'only', name: 'Only the AI is asked', sub: 'nothing checks it', lane: 2, row: 4, kind: 'output', detail: 'The rule is only a request in the AI’s instructions. Nothing enforces it, so this is where I looked hardest.' },
          { id: 'live', name: 'Capture live answers', sub: 'a Postman collection', lane: 1, row: 5, kind: 'ai', detail: 'Real answers from the test environment, not just examples.' },
          { id: 'verdict', name: 'Same rules, real answers', lane: 1, row: 6, kind: 'check', detail: 'Every live answer runs against the same rule list, so every rule gets a verdict.' },
          { id: 'cards', name: 'Write decision cards', sub: 'evidence and options', lane: 0, row: 7, kind: 'human', detail: 'Where the code, the instructions and the documents disagreed, I wrote a card with the evidence and the options, none decided in advance.' },
          { id: 'team', name: 'The team decides', lane: 3, row: 8, kind: 'gate', detail: 'The decisions belong to the team that owns the feature.' },
        ],
        edges: [
          { from: 'gather', to: 'inv', label: 'every rule' },
          { from: 'inv', to: 'rej', label: 'rules in use' },
          { from: 'rej', to: 'rep', label: 'not rejected' },
          { from: 'rep', to: 'only', label: 'not repaired' },
          { from: 'only', to: 'live', label: 'the sorted rules' },
          { from: 'live', to: 'verdict', label: 'live answers' },
          { from: 'verdict', to: 'cards', label: 'a verdict per rule' },
          { from: 'cards', to: 'team', label: 'decision cards' },
        ],
      },
      caption: 'The campaign AI audit: every rule sorted by who enforces it, then checked on live answers.',
    },
    { p: 'The audit also records the team’s guardrails for the AI: it only writes words, code picks the customers, every figure comes from the dealer’s own data, and nothing sends until the dealer schedules it.' },

    { h2: 'My role and the team' },
    { table: {
      columns: ['Stage', 'Me', 'AI agents', 'Team'],
      rows: [
        ['Idea and scope', 'Framed the questions; specified each prototype', '', 'A dealer chose one scope; colleagues had the campaign idea'],
        ['Prototype', 'Specified screens and flows; set the UX direction', 'Built them with Figma Make and Claude Code', 'A colleague’s coaching work, merged at my direction'],
        ['Reality check', 'Asked the question; judged the answer', 'Ran the read-only analysis', ''],
        ['Campaign planning', 'Had the screens ported, chose layouts, specified the send flow', 'Made the code changes I directed', 'Colleagues built the feature and its AI'],
        ['Evaluation', 'Designed the tests and audit; judged every result', 'Ran the tests; captured live answers', 'Decide the open questions'],
        ['Build', 'Wrote the handover briefs; support the build', '', 'Developers build what moves forward'],
      ],
    }, caption: 'Who did what. On my own prototypes I decided and specified; on campaign planning I assisted.' },

    { h2: 'How I approached it' },
    { stages: [
      { name: 'Question and scope', part: 'The decision to inform, criterion by criterion', by: 'me' },
      { name: 'Prototype', part: 'Clickable, with Figma Make and Claude Code', by: 'ai' },
      { name: 'Reality check', part: 'Real conversations or a real dealer', by: 'proved' },
      { name: 'Evaluation', part: 'Every AI rule tested against live answers', by: 'proved' },
      { name: 'Handover', part: 'A brief for the developers, then support', by: 'me', now: true },
    ], caption: 'Reality, then evaluation, then a handover: nothing reaches a developer on the strength of a demo.' },

    { h2: 'Key decisions' },
    { decisions: [
      {
        q: 'How should a person’s performance be shown?',
        options: ['One score and a leaderboard', 'Separate measures with context, and no ranking'],
        chose: 'Separate measures with context, and no ranking',
        why: 'A single number invites ranking people on thin data. Each measure stands alone and says “not enough data” when that is the truth.',
      },
      {
        q: 'Who gets the credit for a reply?',
        options: ['Whoever the conversation is assigned to', 'Whoever sent the message'],
        chose: 'Whoever sent the message',
        why: 'Assignment changes on transfer and keeps no history, so it credits the wrong person. Who sent each message is a fact.',
      },
      {
        q: 'How should a dealer send an AI-planned campaign?',
        options: ['Approve the whole plan in one click', 'A guided flow, one step at a time'],
        chose: 'A guided flow, one step at a time',
        why: 'The dealer goes through each step so they understand what will go out. Nothing sends until they accept and schedule it.',
      },
    ], caption: 'The calls behind the prototypes, in my words. The last was made while assisting on campaign planning.' },
    { call: {
      saw: 'The sentiment prototype met every acceptance criterion in its story, but a real-data check refuted sentiment scoring as its central mechanism.',
      decided: 'I stopped polishing it and changed direction: its best parts became Promise Tracker, a list of what the dealership still owes each customer.',
      why: 'A prototype exists to answer a question. Once the answer is no, more polish is waste, and changing course is never cheaper than before development starts.',
    } },

    { h2: 'How we knew it was right' },
    { list: [
      'Every prototype meets reality before handover: real conversations, read-only, or a real dealer.',
      'A number about a person appears with its context, or not at all.',
      'Every AI rule is checked on live answers, and a test counts only after three passing runs.',
      'Where the documents and the code disagree, the code and live answers win.',
    ] },

    { h2: 'Where it is now' },
    { p: 'Promise Tracker, which began on this shelf, is in pilot ahead of its production release. Campaign planning’s open questions are with the team. Broadcast analytics is a demo on representative data, with its handover brief.' },

    { h2: 'What I learned' },
    { quote: 'A prototype that disproves an idea has done its job.' },
    { p: 'The most useful thing the sentiment prototype did was show us we were about to build the wrong feature.' },
    { p: 'A number on a screen gets read as a verdict, however thin the data behind it, so measurement honesty has to be designed in from the first screen.' },
    { p: 'And evaluating an AI someone else built taught me to look past the documents: problems hid in the rules nobody enforced.' },
    { link: { to: '/case-studies/promise-tracker', text: 'Read the Promise Tracker case study' } },
    { link: { to: '/case-studies/product-decisions', text: 'The research behind “performance without a score”' } },
    { link: { to: '/case-studies/ai-evaluation', text: 'How I evaluate AI features' } },
  ],
};
