// Quality Gates and the QA team, told end to end (round 2, 11 Nov 2026). Sources:
// docs/private/chat-exports/me.md (E17: the BA/QA operating framework with a 7-check Definition of
// Ready, a 6-check Definition of Done, the six edge-case groups, the story-to-release workflow, the
// stakeholder rules), docs/private/chat-exports/merged.md (§7, §11 and C4: the self-reported numbers
// stay worded exactly as the site had them), method.js (the criteria rules and the worked story with
// its checklist) and docs/content/about-mahmood.md (the four sessions, the mid-cycle release, 2025
// adoption). Company rule: what he did and the problem it solved; no internal or integration names.
// Never say why QA changed hands on the mid-cycle release.
import { requirementExample } from '../method';

export default {
  updated: 'November 2026',
  body: [
    { p: 'Picture a manager sending a broadcast to a customer group. For one minute the messaging service is down. The broadcast fails without a word, and the manager goes home believing it went out.' },
    { p: 'Nobody did anything wrong. Nobody had written down what should happen when the service is down, so nobody built it and nobody tested it. When I joined the CRM product team, defects like that were reaching production, causing client escalations and unplanned sprint interruptions.' },
    { p: 'So I designed a quality framework to fix the cause rather than the symptoms: two gates every story has to pass, one before it enters a sprint and one before it leaves. Within two quarters defect leakage, meaning defects that slip through to production, was down by about 40%. Three other teams went on to adopt the framework. Today I lead the QA team that holds the bar.' },

    { h2: 'At a glance' },
    { ol: [
      'I traced escaped defects to where they began: most started with incomplete acceptance criteria.',
      'I designed two gates, a Definition of Ready and a Definition of Done, with criteria written as Given, When, Then.',
      'I built the gates into the sprint with the Product Owner and the engineering lead, trained the team and added automated gate checks.',
      'I measured the result every week, refined the framework every two sprints, and now lead the QA team.',
    ] },
    { numbers: [['~40%', 'less defect leakage, by my own tracking'], ['0', 'critical defects across 6 consecutive sprints'], ['3', 'other teams adopted the framework']] },

    { h2: 'Where defects were born' },
    { p: 'The broadcast story had one criterion: “The manager can send a broadcast to a group.” The developer built exactly that, and testing passed it. The failure lived in everything the criterion didn’t say.' },
    { p: 'That was the pattern. The team was shipping features with ambiguous acceptance criteria, so business stakeholders and developers expected different things. Defects were caught late, or in production, which derailed sprints and cost client trust.' },
    { p: 'The product made it harder. It sits on top of several dealership-management systems, the software a dealership already runs its business on, and a feature could behave differently on each in ways nobody had agreed to test.' },
    { p: 'Before changing anything, I ran a two-week root-cause analysis of the defects that had escaped. I used 5 Whys: ask why a defect happened, then why that happened, and keep going until you reach a cause you can fix. I also mapped the defect lifecycle in Azure DevOps. Here is the method on the broadcast failure.' },
    { table: {
      columns: ['Why?', 'Because'],
      rows: [
        ['Why did the manager think the broadcast went out?', 'It failed without telling anyone.'],
        ['Why did it fail silently?', 'Nothing handled the messaging service being down.'],
        ['Why was nothing built for that?', 'The story never said what should happen then.'],
        ['Why didn’t the story say?', 'Its criteria covered only the happy path.'],
        ['Why only the happy path?', 'Nothing in refinement asked for edge cases before a story was accepted.'],
      ],
    }, caption: 'Five whys on the broadcast failure, ending at a cause a process can fix. Recreation, fictional data.' },
    { p: 'Across the defects that had really escaped, the answer was clear: 68% of production bugs traced back to incomplete acceptance criteria. Most defects began before anyone wrote a line of code.' },
    { p: 'So the fix had to start before development too.' },

    { h2: 'Two gates, thirteen checks' },
    { p: 'I called the framework “Strict Quality Gates”: a mandatory Definition of Ready and Definition of Done. Ready asks whether a story can be built and tested without guessing. Done asks whether what was built is what was agreed, on every integration it touches. Work can’t enter a sprint, or leave it, without passing its gate.' },
    { p: 'Here is a story’s whole path through both. Watch the three loops on the right: gaps send a story back to refinement, a failed pipeline check sends the build back, and an open defect stops it at Done.' },
    {
      graph: {
        lanes: [{ name: 'Product Owner' }, { name: 'Me and QA' }, { name: 'Developers' }],
        phases: [
          { name: 'Refinement', row: 0 },
          { name: 'Sprint', row: 4 },
          { name: 'Release', row: 8 },
        ],
        nodes: [
          { id: 'story', name: 'A story is written', sub: 'what the user needs', lane: 0, row: 0, kind: 'human', detail: 'A story says what a user needs and why. At this point its criteria may still cover only the happy path.' },
          { id: 'checklist', name: 'Edge-case checklist', sub: 'six groups of questions', lane: 1, row: 1, kind: 'human', detail: 'Refinement runs the story through the checklist. Each answer becomes a criterion or a written decision.' },
          { id: 'review', name: 'QA reviews criteria', sub: 'testable? two edge cases?', lane: 1, row: 2, kind: 'gate', detail: 'QA checks that every criterion can be tested, with the happy path, at least two edge cases and a negative scenario. Gaps send the story back.' },
          { id: 'ready', name: 'Ready gate', sub: 'scope signed off', lane: 0, row: 3, kind: 'gate', detail: 'The Product Owner signs off the scope. With the design referenced, dependencies known and integration impact assessed, the story meets all seven checks.' },
          { id: 'build', name: 'Build', sub: 'to the reviewed criteria', lane: 2, row: 4, kind: 'human', detail: 'Developers build to criteria that already name the edge cases, so the awkward questions were settled in refinement.' },
          { id: 'pipe', name: 'Pipeline gate checks', sub: 'automated', lane: 2, row: 5, kind: 'check', detail: 'Automated gate checks run in the pipeline, so passing a gate doesn’t depend on anyone remembering it.' },
          { id: 'verify', name: 'Verify every criterion', sub: 'on every integration', lane: 1, row: 6, kind: 'human', detail: 'QA proves each criterion, edge cases included, on every dealership-management system the feature touches, and writes down where they differ.' },
          { id: 'done', name: 'Done gate', sub: 'six checks', lane: 1, row: 7, kind: 'gate', detail: 'Every criterion verified, every integration tested, no critical or high defects open, the design matched, release notes drafted, differences written down. One miss and it goes back.' },
          { id: 'release', name: 'Released', sub: 'notes and differences on record', lane: 1.5, row: 8, kind: 'output', detail: 'The story ships with its release notes drafted and its integration differences written down for the next person.' },
        ],
        edges: [
          { from: 'story', to: 'checklist', label: 'story' },
          { from: 'checklist', to: 'review', label: 'criteria' },
          { from: 'review', to: 'story', label: 'gaps' },
          { from: 'review', to: 'ready', label: 'reviewed criteria' },
          { from: 'ready', to: 'build', label: 'ready story' },
          { from: 'build', to: 'pipe', label: 'build' },
          { from: 'pipe', to: 'build', label: 'failed check' },
          { from: 'pipe', to: 'verify', label: 'passing build' },
          { from: 'verify', to: 'done', label: 'evidence' },
          { from: 'done', to: 'build', label: 'open defect' },
          { from: 'done', to: 'release', label: 'done story' },
        ],
      },
      caption: 'One story through both gates. The amber gates are people; the black check is automatic; every loop is work going back before it can escape.',
    },
    { p: 'Every check is there for a reason. These are the seven that make a story ready.' },
    { table: {
      columns: ['Ready check', 'Why it is there'],
      rows: [
        ['The story is clear and unambiguous', 'If two people can read a story two ways, they will build and test two different things.'],
        ['Criteria cover the happy path and at least two edge cases', 'Incomplete criteria were where most escaped defects began. Two edge cases is a floor, and the checklist makes it quick to reach.'],
        ['The design is referenced, or marked not needed', 'Nobody builds a screen from the memory of a meeting. This is where the design phase plugs in.'],
        ['Dependencies are known', 'A story that waits on someone else halfway through the sprint is a story that slips.'],
        ['Integration impact is assessed', 'A change can behave differently on each dealership-management system, so the question is asked before the build.'],
        ['QA has reviewed the criteria before development', '“Can this be tested?” is cheapest to ask before anything exists.'],
        ['The Product Owner has signed off the scope', 'The business confirms this is what it wants before the team spends a sprint on it.'],
      ],
    }, caption: 'The Definition of Ready: seven checks before a story can enter a sprint.' },
    { p: 'And these are the six that let it leave.' },
    { table: {
      columns: ['Done check', 'Why it is there'],
      rows: [
        ['Every acceptance criterion is verified', 'Built is not the same as done. Each criterion is proved, not assumed.'],
        ['Tested on every relevant integration', 'Working on one system is not the same as working.'],
        ['No critical or high defects open', 'A hard bar, not a judgement call made on release day.'],
        ['Matches the approved design', 'What ships is what was reviewed, so the design review counts.'],
        ['Release notes are drafted', 'The people who meet the change next are told what changed.'],
        ['Differences between integrations are written down', 'The next person doesn’t rediscover them in production.'],
      ],
    }, caption: 'The Definition of Done: six checks before a story can leave the sprint.' },

    { h2: 'Six groups of awkward questions' },
    { p: 'Acceptance criteria are the conditions a story must meet to count as working. Mine follow three rules.' },
    { list: [
      'Given, When, Then for features with several paths, or that depend on an integration.',
      'A checklist for single-path or interface-only changes.',
      'Always at least one negative scenario: something goes wrong, and the product has to cope.',
    ] },
    { p: 'Given, When, Then is a simple shape: given a starting situation, when someone acts, then this is the result. It forces the writer to name the situation, which is exactly where edge cases hide.' },
    { p: 'To make “at least two edge cases” quick to meet, I wrote an edge-case checklist in six groups. Each group holds the questions a story has to answer before it is ready. One term first: a rooftop is a single dealership, and a dealer group can own several.' },
    { table: {
      columns: ['Group', 'Questions it asks, for example'],
      rows: [
        ['Integrations and data', 'Integration offline, slow or mid-sync? Data missing or malformed? Same on every integration?'],
        ['Customer state', 'Customer opted out, or opted out after it was scheduled?'],
        ['Dealership structure', 'A dealer group with several rooftops? Whose settings apply?'],
        ['Automations', 'Could a scheduled automation conflict?'],
        ['Communication', 'Opt-out enforced at the moment of sending? A channel that needs a rollback plan?'],
        ['Platform', 'Empty, loading and error states? Mobile and web the same? Permissions?'],
      ],
    }, caption: 'The edge-case checklist: six groups, with examples of the questions in each, in generic words.' },
    { p: 'Here is the broadcast story again, written to pass the gate. The checklist turned the edge cases into criteria, including the one the first version missed.' },
    { story: {
      persona: requirementExample.persona,
      title: requirementExample.title,
      text: requirementExample.story,
      criteria: requirementExample.criteria.map((c) => c.text),
    }, caption: 'A story that meets the Definition of Ready: the happy path, edge cases from the checklist and a negative scenario. Recreation, fictional data.' },
    { p: 'And here is where each criterion came from. Every question on the checklist became a criterion or got a written answer. The silent failure from the opening is AC4.' },
    { table: {
      columns: ['Checklist question', 'What it became'],
      rows: requirementExample.checks.map((c) => [c.q, c.ac ? `Criterion ${c.ac}` : c.note]),
    }, caption: 'The checklist at work on the broadcast story. Recreation, fictional data.' },

    { h2: 'My role and the team' },
    { p: 'I designed the framework, led its rollout and measured the results. The Product Owner and the engineering lead worked with me to build the gates into the sprint, and I now lead the QA team that works to them.' },
    { table: {
      columns: ['Stage', 'Me', 'AI agents', 'Team'],
      rows: [
        ['Root cause', 'Ran a two-week analysis with 5 Whys', '', ''],
        ['Gates', 'Designed both gates and the criteria templates', '', ''],
        ['Workflow', 'Built the gates into the sprint', '', 'The Product Owner and the engineering lead shaped it with me'],
        ['Training', 'Ran four facilitated sessions; added pipeline gate checks', '', 'The team learned the gates'],
        ['Measurement', 'Tracked escape rates weekly', '', 'Refined it with me in retrospectives'],
        ['Adoption', '', '', 'Three other teams adopted the framework'],
        ['QA team', 'Lead it; trained two hires and onboarded three analysts', '', ''],
        ['Tester tools', 'Turned my queries into a read-only catalog', 'Built the searchable catalog from them', ''],
      ],
    }, caption: 'Who did what. I designed and measured the framework; the Product Owner, the engineering lead and the team made it part of the sprint.' },

    { h2: 'From analysis to habit' },
    { p: 'Seven stages, and the label on each says who carried it.' },
    { stages: [
      { name: 'Root cause', part: 'Two weeks of 5 Whys on escaped defects', by: 'me' },
      { name: 'Gates', part: 'Ready and Done, with criteria templates', by: 'me' },
      { name: 'Workflow', part: 'Built into the sprint with the Product Owner', by: 'me' },
      { name: 'Training', part: 'Four facilitated sessions, then pipeline checks', by: 'me' },
      { name: 'Measure', part: 'Escape rates weekly, refined every two sprints', by: 'proved' },
      { name: 'Spread', part: 'Three other teams adopted it', by: 'proved' },
      { name: 'QA team', part: 'Leading the team that holds the bar', by: 'me', now: true },
    ], caption: 'From the first root-cause analysis to the QA team I lead, with who carried each stage.' },
    { lead: 'Root cause.', p: 'The 68% finding decided where the fix had to go: refinement, not the end of the sprint.' },
    { lead: 'Gates.', p: 'I designed the two gates and the criteria templates, so a ready story starts from a shape, not a blank page.' },
    { lead: 'Workflow.', p: 'A framework only matters if the team uses it. I worked with the Product Owner and the engineering lead to build the gates into the sprint workflow, so passing a gate is part of moving a story, not an extra step. I later wrote the whole path down as a ten-step workflow from story to release, with two design sessions a week built in.' },
    { lead: 'Training.', p: 'I trained the team over four facilitated sessions, and added automated gate checks to the Azure DevOps pipeline, so the gates didn’t depend on anyone remembering them.' },
    { lead: 'Measure and spread.', p: 'Weekly tracking and a retrospective every two sprints kept it honest, as the next section shows. Three other teams across the division have since adopted it.' },

    { h2: 'Key decisions' },
    { p: 'These five calls shaped the framework.' },
    { decisions: [
      {
        q: 'Fix the symptoms, or the cause?',
        options: ['Add more testing at the end of the sprint', 'Find where escaped defects begin, and fix that'],
        chose: 'Find where escaped defects begin, and fix that',
        why: 'More testing at the end would still find defects late, when they cost a sprint. The analysis pointed to the criteria, so the fix had to start before development.',
      },
      {
        q: 'Guidance or gates?',
        options: ['Guidelines the team can skip when busy', 'Mandatory gates at both ends of the sprint'],
        chose: 'Mandatory gates at both ends of the sprint',
        why: 'Busy sprints are exactly when a guideline gets skipped. A gate holds even then, because work can’t move without passing it.',
      },
      {
        q: 'How much must a story cover before it is ready?',
        options: ['The happy path', 'The happy path and at least two edge cases'],
        chose: 'The happy path and at least two edge cases',
        why: 'Incomplete criteria were where most escaped defects began. Two edge cases is a floor, and the checklist makes it quick to reach.',
      },
      {
        q: 'Who checks a story before development?',
        options: ['The developer, when picking it up', 'QA reviews the criteria, and the Product Owner signs off the scope'],
        chose: 'QA reviews the criteria, and the Product Owner signs off the scope',
        why: 'Two questions need two people. QA asks whether it can be tested; the Product Owner confirms it is what the business wants.',
      },
      {
        q: 'When is a feature done?',
        options: ['When it works in one setup', 'When it is tested on every relevant integration, with the differences written down'],
        chose: 'When it is tested on every relevant integration, with the differences written down',
        why: 'A feature can behave differently on each dealership-management system. Writing the differences down stops the next person rediscovering them in production.',
      },
    ], caption: 'The decisions behind the gates, in my words.' },
    { call: {
      saw: 'The root-cause analysis showed that 68% of production bugs traced back to incomplete acceptance criteria. Most defects started in refinement, not in the code.',
      decided: 'I moved quality to the front of the sprint: no story enters development without complete criteria that QA has reviewed, and none leaves without meeting the Definition of Done.',
      why: 'A gap found in refinement costs a conversation. The same gap found in production costs a sprint and a client’s trust.',
    } },

    { h2: 'Measured, not assumed' },
    { p: 'I held the framework to the same standard as the work it gates: rules that are checked, not good intentions. Watch the loop in the middle: every two sprints, the evidence can change the gates themselves.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'Team' }, { name: 'Other teams' }],
        nodes: [
          { id: 'teach', name: 'Teach the gates', sub: 'four facilitated sessions', lane: 0, row: 0, kind: 'human', detail: 'Four facilitated sessions, so everyone knew what each check asks and why.' },
          { id: 'sprint', name: 'Stories cross the gates', sub: 'every sprint', lane: 1, row: 1, kind: 'human', detail: 'The team works to Ready and Done, with the automated checks in the pipeline behind them.' },
          { id: 'track', name: 'Escapes tracked', sub: 'every week', lane: 0, row: 2, kind: 'store', detail: 'Every week I tracked the defect escape rate, by my own measurement.' },
          { id: 'retro', name: 'Retrospective', sub: 'every two sprints', lane: 1, row: 3, kind: 'human', detail: 'Every two sprints, a retrospective reviews the framework itself, so a check that isn’t working can change.' },
          { id: 'refine', name: 'Refine the gates', sub: 'evidence first', lane: 0, row: 4, kind: 'human', detail: 'I change the framework where the evidence points, and the next sprint runs on the new version.' },
          { id: 'result', name: '~40% less leakage', sub: 'within two quarters', lane: 1, row: 5, kind: 'output', detail: 'By my own tracking, leakage fell by about 40% within two quarters, and the team went six consecutive sprints without a critical defect.' },
          { id: 'spread', name: 'Adopted by 3 teams', sub: 'across the division', lane: 2, row: 6, kind: 'output', detail: 'Three other teams across the division adopted the framework.' },
        ],
        edges: [
          { from: 'teach', to: 'sprint', label: 'trained team' },
          { from: 'sprint', to: 'track', label: 'escaped defects' },
          { from: 'track', to: 'retro', label: 'weekly rates' },
          { from: 'retro', to: 'refine', label: 'what to change' },
          { from: 'refine', to: 'sprint', label: 'updated gates' },
          { from: 'refine', to: 'result', label: 'measured result' },
          { from: 'result', to: 'spread', label: 'the framework' },
        ],
      },
      caption: 'Measure, review, refine. The loop sends an updated framework back into the next sprint.',
    },
    { list: [
      'Defect escape rates tracked every week.',
      'The framework reviewed in a retrospective every two sprints, so a check that wasn’t working could change.',
      'Automated gate checks in the pipeline, so passing a gate didn’t depend on memory.',
      'A hard bar in the Definition of Done: no critical or high defects open.',
    ] },
    { p: 'The numbers on this page come from that weekly tracking. They are my own measurements.' },

    { h2: 'Risks, framed for the reader' },
    { p: 'Some risks still need someone else’s decision, so I frame each update for the person who has to make it. Follow the packet: one risk, three readers, three different shapes, and one written record at the end.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'Dev manager' }, { name: 'Product Owner' }, { name: 'Initiative manager' }],
        nodes: [
          { id: 'risk', name: 'Spot a risk', sub: 'someone else decides', lane: 0, row: 0, kind: 'human', detail: 'Some risks need a decision that isn’t mine. Before I write a word, I ask who has to make it.' },
          { id: 'dm', name: 'Status + confidence', sub: 'delivery first', lane: 1, row: 1, kind: 'human', detail: 'A development manager gets the delivery status and how confident I am in it.' },
          { id: 'po', name: 'The question', sub: 'my reading first', lane: 2, row: 1, kind: 'human', detail: 'A product owner gets the question, with my own reading of it first, so there is something concrete to agree or disagree with.' },
          { id: 'im', name: 'Observation first', sub: 'then meaning, then action', lane: 3, row: 1, kind: 'human', detail: 'An initiative manager gets what I observed, what it means and what I recommend.' },
          { id: 'record', name: 'Written down', sub: 'the same day', lane: 0, row: 2, kind: 'store', detail: 'Whoever the reader, a decision reached in conversation is written down the same day, so nobody has to rely on memory later.' },
        ],
        edges: [
          { from: 'risk', to: 'dm', label: 'status update' },
          { from: 'risk', to: 'po', label: 'question' },
          { from: 'risk', to: 'im', label: 'observation' },
          { from: 'dm', to: 'record', label: 'decision' },
          { from: 'po', to: 'record', label: 'decision' },
          { from: 'im', to: 'record', label: 'decision' },
        ],
      },
      caption: 'One risk, framed three ways. Every decision ends in a written record.',
    },

    { h2: 'Holding the bar' },
    { p: 'The gates are part of how the team works, and three other teams across the division have adopted them. I now lead the QA team. I trained two QA hires from non-IT backgrounds to independent sprint work, and onboarded three new analysts in 2026.' },
    { h3: 'Mid-cycle, no handover' },
    { p: 'The gates also held under pressure. I took over QA for a critical release mid-cycle, without a handover, and it shipped on time with no drop in quality.' },
    { h3: 'Tools for testers' },
    { p: 'I turned my own diagnostic queries into a shared catalog, organised by the question a tester is asking. Every query is read-only by design, so a tester can check what happened behind the screen without risk to live data. The same story and criteria rules now live in a Claude skill written to my house style, so AI-drafted stories start from the same bar.' },
        { p: 'The whole journey on one line. Watch the order: the results came first, and the other teams adopted it after.' },
    { timeline: [
      { when: '2024', title: 'The root cause', detail: 'Two weeks of 5 Whys: 68% of production bugs traced back to incomplete acceptance criteria.' },
      { when: '2024', title: 'Two gates', detail: 'Ready and Done designed, and built into the sprint with the Product Owner and the engineering lead.' },
      { when: '2024 to 2025', title: 'Four facilitated sessions', detail: 'The team learned the gates, and automated gate checks went into the pipeline.' },
      { when: 'Within two quarters', title: 'About 40% less leakage', detail: 'By my own weekly tracking, with the framework refined every two sprints.' },
      { when: '2024 to 2025', title: 'A release taken over mid-cycle', detail: 'QA for a critical release, with no handover. It shipped on time with no drop in quality.' },
      { when: '2025', title: 'Three more teams', detail: 'Three other teams across the division adopted the framework.' },
      { when: '2026', title: 'Leading the QA team', detail: 'I lead the team that works to the gates, and onboarded three new analysts.' },
    ], caption: 'From root cause to the QA team I lead.' },

    { h2: 'What I learned' },
    { quote: 'Quality is a communication problem as much as a technical one.' },
    { p: 'Once acceptance criteria became something the whole team owned, people started thinking about edge cases earlier, before a line of code was written.' },
    { p: 'Measuring it mattered as much as designing it. Weekly tracking and a retrospective every two sprints turned the framework from an opinion into something the team could check and change.' },
    { p: 'And a gate is only as strong as the reason behind it. A check that can say why it exists is a check a busy team keeps.' },
    { link: { to: '/case-studies/ai-test-suite-audit', text: 'Related: how I audited our AI-built test suite' } },
    { link: { to: '/case-studies/design-phase', text: 'How design became part of “ready”' } },
  ],
};
