// The AI Foundations hackathon, rewritten end to end (round 2, 11 Nov 2026). Sources: the ledger
// (docs/private/chat-exports/merged.md §2, §5 C7 and C9, §6, §8 C15, §11), his planning memory
// (docs/private/claude-memory/career-os/sqa-ai-hackathon.md: the format, one project per QA, the shared
// constraint that tools work on artifacts rather than source code, the keynote widened to the whole
// division, and the follow-on support committed in the pitch), the organiser certificate (13 Aug 2026,
// public/certifications/ai-foundations-organiser-certificate.jpg) and the handbook PDF itself (183 pages,
// version 1.0, August 2026; its cover reads "Created and compiled by Mahmood Ahmad"; chapters 5 to 15 share
// one nine-part structure). His decisions (11 Nov 2026): keep "organised and led"; the handbook is "created
// and compiled". Follow-on support is described as committed in the pitch, never as delivered: no source
// records it. Company rule: no participant, team, product-area or colleague names.
export default {
  updated: 'November 2026',
  documents: [
    { title: 'Working with Claude: The Eleven Building Blocks', meta: 'Practical handbook, 183 pages', href: '/documents/working-with-claude-eleven-building-blocks.pdf', action: 'Read the handbook', primary: true },
  ],
  body: [
    { p: 'Nine people, four days, and one rule: nobody writes code by hand. Each of them would direct AI agents to build a tool for a problem from their own week.' },
    { p: 'That was the AI Foundations hackathon. In August 2026 I organised and led it for the QA team, with the design team alongside. I designed the format, wrote a brief for every participant, taught the foundations, mentored each team to a working demonstration, and created and compiled a handbook so the learning would continue.' },
    { p: 'AI was changing how software gets built, and in our QA team there was still hesitation about using it in our own work. I wanted every QA in the division to get past that the practical way.' },

    { h2: 'At a glance' },
    { ol: [
      'I proposed the hackathon to the line managers, with the R&D director as sponsor, and designed a four-day format.',
      'I wrote a brief for each of the nine participants, tied to a real problem in their own work.',
      'I taught the foundations, then mentored every team through the build days to a working demonstration.',
      'I created and compiled a 183-page handbook, so the learning continues after the event.',
    ] },
    { numbers: [['9', 'project briefs, one per participant'], ['4', 'days, from keynote to team demos'], ['183', 'pages in the handbook']] },

    { h2: 'Sam’s least favourite chore' },
    { p: 'Picture Sam, a fictional QA engineer. Every release, Sam reads the new stories and writes a regression checklist by hand, then checks each item against the screens. Sam has heard AI could take on part of that, tried a chat window once, and went back to doing it by hand.' },
    { p: 'A talk about AI doesn’t change Sam’s week. Building something for that exact chore, with help close by, does. So every participant would direct AI agents to build a tool for a problem they actually have, with no hand-coding.' },

    { h2: 'Where it came from' },
    { p: 'The idea grew out of a cross-division AI Foundations program that July, where people learned to build by directing AI agents. There was no QA presence. I asked for QA to be included, and took along a tool I had been building for a month: the AI QA Workbench.' },
    { p: 'It showed what one QA could build by directing AI. The next question was whether every QA in the division could, and that became my proposal in late July.' },

    { h2: 'Four days, end to end' },
    { p: 'The format ran over four days: a half-day idea keynote, a half-day project handover where each participant received their brief, then build days ending with every team presenting its work.' },
    { p: 'Here is the whole program, lane by lane. Follow the briefs: written before day one, handed over on day one, carried into the build days.' },
    {
      graph: {
        lanes: [
          { name: 'Me', note: 'organiser and mentor' },
          { name: 'Leadership', note: 'managers and sponsor' },
          { name: 'Participants', note: 'QA and design' },
          { name: 'AI agents' },
        ],
        phases: [
          { name: 'Before', row: 0 },
          { name: 'Day one', row: 4 },
          { name: 'Build days', row: 6 },
          { name: 'After', row: 9 },
        ],
        nodes: [
          { id: 'pitch', name: 'Propose it', sub: 'a short pitch deck', lane: 0, row: 0, kind: 'human', detail: 'I pitched it to the line managers: every QA builds an AI tool for a real problem by directing AI agents.' },
          { id: 'yes', name: 'Sponsor says yes', sub: 'the R&D director', lane: 1, row: 1, kind: 'gate', detail: 'With the R&D director as sponsor, the proposal became a plan with dates.' },
          { id: 'pains', name: 'Bring a real problem', sub: 'from their own week', lane: 2, row: 2, kind: 'human', detail: 'We brainstormed the projects together. Each participant brought a pain point from their own work.' },
          { id: 'briefs', name: 'Write a brief each', sub: 'mission to roadmap', lane: 0, row: 3, kind: 'human', detail: 'One full specification per person, from the mission to a phased roadmap.' },
          { id: 'keynote', name: 'Keynote', sub: '“From Doing to Directing”', lane: 0, row: 4, kind: 'human', detail: 'Half a day on the foundations, co-presented with a peer and open to the whole division.' },
          { id: 'handover', name: 'Receive the brief', sub: 'the handover', lane: 2, row: 5, kind: 'human', detail: 'Every participant gets their brief, and starts the build days knowing what done looks like.' },
          { id: 'mentor', name: 'Mentor and unblock', sub: 'every team', lane: 0, row: 6, kind: 'human', detail: 'I guided every team from idea to a minimum viable product, and unblocked them when they got stuck.' },
          { id: 'direct', name: 'Direct the build', sub: 'no hand-coding', lane: 2, row: 6, kind: 'human', detail: 'Participants describe what they want, review what comes back and decide what changes.' },
          { id: 'code', name: 'Write the code', sub: 'to each participant’s direction', lane: 3, row: 7, kind: 'ai', detail: 'AI agents write the code, and rework it when the participant says it is wrong.' },
          { id: 'demo', name: 'Working demos', sub: 'all nine', lane: 2, row: 8, kind: 'output', detail: 'Each team presented what it did and learned, its challenges, and the future of its tool.' },
          { id: 'book', name: 'The handbook', sub: '183 pages, for afterwards', lane: 0, row: 9, kind: 'store', detail: 'Created and compiled so the learning continues after the event.' },
          { id: 'cert', name: 'Certificate', sub: '13 August 2026', lane: 1, row: 9, kind: 'output', detail: 'The R&D director recognised the initiative with a certificate of appreciation for organising and delivering it.' },
          { id: 'follow', name: 'Follow-on support', sub: 'about two months, as pitched', lane: 0, row: 10, kind: 'human', detail: 'The pitch committed to about two months of hands-on support, to grow each tool into a full automation framework.' },
        ],
        edges: [
          { from: 'pitch', to: 'yes', label: 'pitch deck' },
          { from: 'yes', to: 'pains', label: 'go-ahead' },
          { from: 'pains', to: 'briefs', label: 'pain points' },
          { from: 'briefs', to: 'handover', label: 'a brief each' },
          { from: 'keynote', to: 'handover', label: 'the foundations' },
          { from: 'handover', to: 'direct', label: 'the brief' },
          { from: 'mentor', to: 'direct', label: 'unblocks' },
          { from: 'direct', to: 'code', label: 'directions' },
          { from: 'code', to: 'direct', label: 'draft, rework' },
          { from: 'code', to: 'demo', label: 'working tool' },
          { from: 'demo', to: 'cert', label: 'nine demos' },
          { from: 'demo', to: 'follow', label: 'tools to grow' },
          { from: 'book', to: 'follow', label: 'the reference' },
        ],
      },
      caption: 'The hackathon end to end, with who did what. The amber gate is the sponsor’s yes.',
    },

    { h2: 'A brief for every person' },
    { p: 'Each brief was a full specification, so every participant would start the build days knowing what to make: the mission, the architecture, functional requirements, deliverables with acceptance criteria, guardrails and a phased roadmap.' },
    { p: 'The nine projects spanned several product areas: five on testing and quality, three on knowledge and delivery insight, and one on design. Briefs took on problems like flagging gaps in a story before testing starts, spotting likely duplicate defects, and turning a support report into a defect a developer can reproduce.' },
    { story: {
      persona: 'Sam, QA engineer (fictional)',
      status: 'Recreation, fictional brief',
      title: 'Turn a release’s stories into a regression checklist',
      text: 'Mission: a tool that reads the stories in a release and drafts a regression checklist, so Sam reviews and approves it instead of writing it from scratch.',
      criteria: [
        'Nothing is written back to the team’s tools until Sam approves it.',
        'Every checklist item cites the story it came from.',
        'Counts and coverage are calculated, not left to the model.',
        'It works end to end for one module before the scope widens.',
      ],
    }, caption: 'The shape of a participant brief, with the shared rules as acceptance criteria. Recreation, fictional brief.' },
    { p: 'Here is that brief in motion. Watch the amber gate near the end: the tool drafts, but Sam decides.' },
    {
      graph: {
        lanes: [
          { name: 'Sam', note: 'participant, fictional' },
          { name: 'Me', note: 'organiser' },
          { name: 'AI agents' },
        ],
        nodes: [
          { id: 'chore', name: 'A chore every release', sub: 'checklists by hand', lane: 0, row: 0, kind: 'human', detail: 'Every release, Sam writes a regression checklist from scratch. It is the chore Sam would most like a tool to take over.' },
          { id: 'brief', name: 'Write the brief', sub: 'mission to roadmap', lane: 1, row: 1, kind: 'human', detail: 'I turn the chore into a full specification, with deliverables, acceptance criteria and the shared guardrails.' },
          { id: 'doc', name: 'Sam’s brief', sub: 'with the shared rules', lane: 1, row: 2, kind: 'store', detail: 'Mission: draft the checklist so Sam reviews it instead of writing it, under the shared rules.' },
          { id: 'slice', name: 'Start with one module', sub: 'the thin slice', lane: 0, row: 3, kind: 'human', detail: 'Sam picks one module and takes it end to end before widening the scope, as the roadmap says.' },
          { id: 'build', name: 'Build to the brief', sub: 'Sam directs, agents write', lane: 2, row: 4, kind: 'ai', detail: 'Sam describes each step, AI agents write the code, and Sam checks it against the acceptance criteria.' },
          { id: 'stuck', name: 'Unblock', sub: 'mentoring on build days', lane: 1, row: 5, kind: 'human', detail: 'When the build stalls, I help Sam get it moving, then step back. Sam keeps directing.' },
          { id: 'check', name: 'Counts in code', sub: 'not left to the model', lane: 2, row: 6, kind: 'check', detail: 'Coverage and counts come from code, and every item carries the story it came from.' },
          { id: 'approve', name: 'Sam approves', sub: 'nothing written back without it', lane: 0, row: 7, kind: 'gate', detail: 'The tool drafts; Sam decides. Nothing goes back into the team’s tools without Sam’s yes.' },
          { id: 'demo', name: 'Working demo', sub: 'one module, end to end', lane: 0, row: 8, kind: 'output', detail: 'Sam presents what was built and learned, the hardest problem, and where the tool goes next.' },
        ],
        edges: [
          { from: 'chore', to: 'brief', label: 'the pain point' },
          { from: 'brief', to: 'doc', label: 'the specification' },
          { from: 'doc', to: 'slice', label: 'the brief' },
          { from: 'slice', to: 'build', label: 'first slice' },
          { from: 'build', to: 'stuck', label: 'a blocker' },
          { from: 'stuck', to: 'build', label: 'a way forward' },
          { from: 'build', to: 'check', label: 'draft checklist' },
          { from: 'check', to: 'approve', label: 'cited checklist' },
          { from: 'approve', to: 'demo', label: 'approved checklist' },
        ],
      },
      caption: 'One brief, from a release-day chore to a working demo. Recreation, fictional brief.',
    },

    { h2: 'Rules every brief shared' },
    { p: 'Every brief carried the same guardrails: the rules I hold AI features to, scaled down for a four-day build.' },
    { list: [
      'AI recommends, a person approves: nothing is written back to the team’s tools without an explicit approval.',
      'Every finding shows its evidence: the story, defect or code it came from.',
      'Compute what can be computed: counts are calculated, not left to the model.',
      'A thin slice first: build one module end to end before widening the scope.',
      'Work from what QA already handles, such as work items, logs, release data, documents, live pages and APIs, not the product’s source code.',
    ] },

    { h2: 'From doing to directing' },
    { p: 'The keynote, “AI Foundations: From Doing to Directing”, covered Claude Projects, Skills, MCP servers, connectors, agents and workflows, with a live example on Azure DevOps MCP servers. An MCP server is what lets an AI agent read and act in a real tool, such as the team’s tracker.' },
    { p: 'I opened it to the whole division: product owners, business analysts, design teams and other non-developers. I also shared a skill I had created that drafts test cases in my own style, as a worked example.' },
    { p: 'The title names the shift: you describe the outcome clearly enough for AI to do the steps, and keep ownership of the result.' },
    { table: {
      columns: ['Role', 'Doing: every step by hand', 'Directing: describe it, AI does the steps'],
      rows: [
        ['QA', 'Map test cases from the spec by hand', '“Here are the acceptance criteria: draft the test suite in our template.”'],
        ['Product and BA', 'Write the sprint retro from memory', '“Here’s the board export: draft the retro summary.”'],
        ['Design', 'Write annotations for every component', '“Here’s the component: write the handoff spec.”'],
      ],
    }, caption: 'The shift the keynote was named for, role by role, from the handbook.' },

    { h2: 'A handbook for afterwards' },
    { p: 'A four-day event ends; the questions don’t. So I created and compiled “Working with Claude: The Eleven Building Blocks”, a 183-page handbook for every role. You can read it from the top of this page.' },
    { tree: [
      { name: 'Working with Claude', note: '183 pages, version 1.0, August 2026', depth: 0 },
      { name: 'Getting oriented', note: 'the big picture and the core ideas', depth: 1 },
      { name: 'The eleven building blocks', note: 'one chapter each, every chapter in the same nine parts', depth: 1 },
      { name: 'Start here', note: 'Projects, Instructions, Skills, Connectors, Artifacts: usable in minutes, in a browser', depth: 2 },
      { name: 'Needs setup', note: 'MCP servers: real configuration first', depth: 2 },
      { name: 'Prerequisite', note: 'Marketplace: needed before plugins', depth: 2 },
      { name: 'Advanced', note: 'Plugins, Routines, Agents, Workflows: they package, schedule or run the rest', depth: 2 },
      { name: 'Putting it together', note: '“which one should I use?”, examples by role, troubleshooting, security, a cheat sheet', depth: 1 },
    ], caption: 'The handbook’s shape. The labels say how much stands between you and using each block, not how powerful it is.' },
    { p: 'Every building-block chapter answers the same nine questions in the same order, from “what is it?” and “when should I use it?” to examples for each role and the official resources, so a reader can jump straight to the part they need.' },
    { p: 'It points to the official documentation rather than copying it, and four reading paths mean nobody has to read 183 pages in order.' },

    { h2: 'My role and the team' },
    { p: 'I organised and led the hackathon: the proposal, the format, the briefs, the teaching, the mentoring and the handbook. The R&D director sponsored it, and I co-presented the opening keynote with a peer. The participants built their own tools by directing AI agents.' },
    { table: {
      columns: ['Stage', 'Me', 'AI agents', 'Team'],
      rows: [
        ['Proposal', 'Proposed it to the line managers; made the pitch deck', '', 'The R&D director sponsored it'],
        ['Briefs', 'Brainstormed the projects with the team; wrote a brief per participant', '', 'Brought the problems from their own work'],
        ['Keynote', 'Co-presented “From Doing to Directing”; opened it to the whole division', '', 'A peer co-presented'],
        ['Build days', 'Mentored every team and unblocked them', 'Wrote the code each participant directed', 'Built their tools by directing AI agents'],
        ['Presentations', 'Set what each presentation should cover', '', 'Presented working demonstrations'],
        ['Handbook', 'Created and compiled the 183-page handbook', '', ''],
        ['Afterwards', 'Committed about two months of hands-on support in the pitch', '', 'Each team to grow its tool into a full framework'],
      ],
    }, caption: 'Who did what. I organised, taught and mentored; the participants directed AI agents to build their own tools.' },

    { h2: 'How I approached it' },
    { stages: [
      { name: 'Proposal', part: 'Pitched to the line managers, with a sponsor', by: 'me' },
      { name: 'Briefs', part: 'One per participant, tied to a real problem', by: 'me' },
      { name: 'Keynote', part: '“From Doing to Directing”, open to the division', by: 'me' },
      { name: 'Build', part: 'Participants directed AI agents; I mentored', by: 'ai' },
      { name: 'Demos', part: 'Every team presented a working tool', by: 'proved' },
    ], caption: 'From the proposal to the team demonstrations, with who carried each stage.' },
    { lead: 'Build days.', p: 'I guided every team through ideation, implementation and delivery of a minimum viable product, and unblocked them along the way.' },
    { lead: 'Demos.', p: 'Each team presented its challenges and how it overcame them, not just its wins. All nine reached a working demonstration.' },

    { h2: 'The calls I made' },
    { decisions: [
      {
        q: 'What should each participant build?',
        options: ['One shared challenge for everyone', 'A brief per person, tied to their own pain point'],
        chose: 'A brief per person, tied to their own pain point',
        why: 'A tool for a problem someone meets every week still has a use the week after the event.',
      },
      {
        q: 'How should people build?',
        options: ['Teach coding first', 'Direct AI agents, with no hand-coding'],
        chose: 'Direct AI agents, with no hand-coding',
        why: 'The point was to get past the hesitation about AI, not to turn testers into developers. Directing an agent and judging what it produces is the shift the keynote was named for.',
      },
      {
        q: 'Who should the keynote be for?',
        options: ['The QA team only', 'The whole division'],
        chose: 'The whole division',
        why: 'Directing AI isn’t a tester skill or a developer skill. Product owners, analysts and designers face the same shift, so the examples span every role.',
      },
      {
        q: 'What happens after the demos?',
        options: ['End with the presentations', 'Commit to support after the event'],
        chose: 'Commit to support after the event',
        why: 'A demo is a start, not a framework. The pitch committed to about two months of hands-on support to grow each tool into a full automation framework, so nobody was left to sink or swim.',
      },
    ], caption: 'The decisions behind the format, in my words.' },
    { call: {
      saw: 'There was hesitation about using AI in our own work, and a talk on its own wouldn’t change anyone’s week.',
      decided: 'I made it a build event: every participant got a brief for a real problem of their own, and build days to make a working tool by directing AI agents.',
      why: 'A working tool for your own problem is something you can show, use and keep improving. That is what turns an AI concept into a habit.',
    } },

    { h2: 'How we knew it was right' },
    { p: 'I set the bar in the briefs, before anyone built anything.' },
    { list: [
      'Done meant a working demonstration, not slides about one.',
      'Every brief had deliverables with acceptance criteria, so done meant the same thing to the participant and to me.',
      'Every team presented its challenges and how it overcame them, not just its wins.',
    ] },

    { h2: 'Where it is now' },
    { p: 'The hackathon ran in August 2026, and the handbook stays available to the division. The R&D director recognised the initiative with a certificate of appreciation for organising and delivering it “through presentations, hands-on demonstrations, and end-to-end participant support”.' },
    { photo: '/certifications/ai-foundations-organiser-certificate.jpg', width: 1600, height: 1131, alt: 'Certificate of appreciation certifying that Mahmood Ahmad successfully organised AI Foundations: Powering work with AI Orchestration, dated 13 August 2026.', caption: 'Certificate of appreciation for organising and delivering the AI Foundations initiative, 13 August 2026.' },

    { h2: 'What I learned' },
    { quote: 'People learn to direct AI by building something they need.' },
    { p: 'A clear brief is the most useful thing an organiser can hand over. It tells a participant what done looks like before they start.' },
    { p: 'And the rules I hold AI features to belong in learning projects too.' },
    { link: { to: '/case-studies/ai-qa-workbench', text: 'The AI QA Workbench, and the program that led to this hackathon' } },
    { link: { to: '/case-studies/hackathon-2025', text: 'The 2025 hackathon, where we placed 1st of 11 teams' } },
  ],
};
