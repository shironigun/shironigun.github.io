// The 2025 division-wide AI hackathon, rewritten end to end (round 2, 11 Nov 2026). Sources: his own record
// (docs/private/working-notes/context/ACHIEVEMENTS.md: "Led requirements, UI/UX prototyping, final
// presentation … 1st out of 11 teams"; PROJECTS.md: customer retention and employee performance monitoring,
// semantic analysis), docs/content/about-mahmood.md (Product Owner, Scrum Master and QA lead; May 2025) and
// the ledger (merged.md §5 C3, §6, §11). Always "1st of 11 teams", never "a team of 11".
// The record is short. Depth here comes from explaining the roles and terms and from the structure of the
// work, never from invented detail: no team members, no judging criteria, no build specifics beyond the
// record. Cells and nodes say nothing the record doesn't.
export default {
  updated: 'November 2026',
  body: [
    { p: 'Eleven teams from across our division. One AI hackathon. One deadline that doesn’t move.' },
    { p: 'In May 2025 our team placed 1st of 11 teams. I held three roles on it: Product Owner, Scrum Master and QA lead. I led the requirements, designed the UI and UX prototypes for both of our solutions, kept delivery on track against the clock, and delivered the final presentation to the judges.' },
    { photo: '/images/events/hackathon-first-prize.jpg', width: 1280, height: 673, alt: 'The winning team holding the First Prize card at the AI hackathon. Mahmood is second from the left.', caption: 'Receiving first prize with the team, May 2025.' },

    { h2: 'At a glance' },
    { ol: [
      'As Product Owner, I finalised the requirements and aligned the team on clear goals.',
      'I designed the UI and UX prototypes for both solutions.',
      'As Scrum Master, I kept delivery on track against the clock.',
      'I prepared and delivered the final presentation. We placed 1st of 11 teams.',
    ] },
    { numbers: [['1st', 'of 11 teams, division-wide'], ['2', 'AI solutions on one shared foundation'], ['3', 'roles: Product Owner, Scrum Master, QA lead']] },

    { h2: 'Ava drifts away' },
    { p: 'Picture Ava, a fictional customer who has bought from the same dealership for years. Nothing in any single conversation looks like a warning, and by the time anyone notices she has drifted away, she is buying somewhere else.' },
    { p: 'Customer retention was the problem our first solution took on. The second took on a related one, employee performance, with the same kind of analysis: language models, text analysers and semantic analysers.' },
    { p: 'The team had a problem of its own: the clock. The idea starts broad, the deadline doesn’t move, and two solutions had to be scoped, designed, built and presented in the time the event allowed.' },

    { h2: 'Three hats, one team' },
    { p: 'A hackathon team needs the same jobs as a product team, squeezed into the time the event allows. Someone decides what gets built. Someone keeps the work moving. Someone owns whether it works. On our team, those three were me.' },
    { cards: [
      { title: 'Product Owner', tag: 'what we build, and why', body: 'Owns the requirements and the goals. I finalised the requirements and aligned the team on clear goals, so everyone built towards the same two solutions.' },
      { title: 'Scrum Master', tag: 'how we work', body: 'Owns the way the team works and keeps the work moving. I kept delivery on track against the clock.' },
      { title: 'QA lead', tag: 'does it work?', body: 'Owns quality: whether what the team builds does what it set out to do. On our team, that was my call too.' },
      { title: 'Prototypes', tag: 'what it looks like', body: 'Not a role but a deliverable. I designed the UI and UX prototypes for both solutions.' },
      { title: 'The pitch', tag: 'why it matters', body: 'The last deliverable. I prepared and delivered the final presentation to the judges and the other participants.' },
    ], columns: 3, caption: 'What I held on the team: three roles and two deliverables.' },

    { h2: 'From requirements to the winning pitch' },
    { p: 'Here is the team’s path, lane by lane. Watch my lane: it opens the work with the requirements, shapes it with the prototypes, and closes it in front of the judges.' },
    {
      graph: {
        lanes: [
          { name: 'Me', note: 'PO, Scrum Master, QA lead' },
          { name: 'The team' },
          { name: 'The judges' },
        ],
        phases: [
          { name: 'Define', row: 0 },
          { name: 'Design', row: 2 },
          { name: 'Build', row: 3 },
          { name: 'Pitch', row: 5 },
        ],
        nodes: [
          { id: 'reqs', name: 'Finalise requirements', sub: 'as Product Owner', lane: 0, row: 0, kind: 'human', detail: 'My first job as Product Owner: finalise the requirements for two solutions, one for customer retention and one for employee performance.' },
          { id: 'goals', name: 'Agree the goals', sub: 'one finish line', lane: 1, row: 1, kind: 'human', detail: 'I aligned the team on clear goals, so everyone built towards the same two solutions.' },
          { id: 'protos', name: 'Design the prototypes', sub: 'UI and UX, both solutions', lane: 0, row: 2, kind: 'human', detail: 'I designed the UI and UX prototypes for both solutions: something concrete to build towards, and something the judges could see rather than imagine.' },
          { id: 'track', name: 'Keep delivery on track', sub: 'as Scrum Master', lane: 0, row: 3, kind: 'human', detail: 'While the team built, I ran the team as Scrum Master, keeping delivery on track against the clock.' },
          { id: 'build', name: 'Build on one foundation', sub: 'language and semantic analysis', lane: 1, row: 3, kind: 'human', detail: 'The team built both AI solutions on one foundation of language models, text analysers and semantic analysers.' },
          { id: 'two', name: 'Two AI solutions', sub: 'retention and performance', lane: 1, row: 4, kind: 'output', detail: 'One helps a dealership with customer retention. The other monitors employee performance with the same language and semantic analysis.' },
          { id: 'pitch', name: 'Final presentation', sub: 'prepared and delivered', lane: 0, row: 5, kind: 'human', detail: 'I prepared and delivered the final presentation to the judges and the other participants.' },
          { id: 'judges', name: 'The judges decide', sub: 'division-wide', lane: 2, row: 6, kind: 'gate', detail: '11 teams from across the division competed, and the judges decided the placings.' },
          { id: 'first', name: '1st of 11 teams', sub: 'May 2025', lane: 1, row: 7, kind: 'output', detail: 'Our team placed 1st of 11 teams and received first prize: the card in the photo at the top of this page.' },
        ],
        edges: [
          { from: 'reqs', to: 'goals', label: 'requirements' },
          { from: 'goals', to: 'protos', label: 'agreed goals' },
          { from: 'protos', to: 'build', label: 'prototypes' },
          { from: 'track', to: 'build', label: 'the schedule' },
          { from: 'build', to: 'two', label: 'working builds' },
          { from: 'two', to: 'pitch', label: 'two solutions' },
          { from: 'pitch', to: 'judges', label: 'the pitch' },
          { from: 'judges', to: 'first', label: 'the result' },
        ],
      },
      caption: 'The team’s path from the first requirements to the result, with my roles in my lane.',
    },

    { h2: 'One foundation, two solutions' },
    { p: 'We built two AI-powered solutions on one foundation of language models, text analysers and semantic analysers. The first helps a dealership with customer retention. The second monitors employee performance with the same language and semantic analysis.' },
    { p: 'Three terms, in plain words. A language model is software trained on large amounts of text, so it can read and write language. A text analyser turns free text into parts a program can count and compare. A semantic analyser works with meaning rather than exact words, so two messages that say the same thing differently are recognised as alike.' },
    { p: 'Here is what we built, as a map. Notice the middle: one shared layer feeds both solutions, so the analysis was built once and used twice.' },
    {
      graph: {
        trace: false,
        lanes: [
          { name: 'Solution one', note: 'customer retention' },
          { name: 'Shared', note: 'built once' },
          { name: 'Solution two', note: 'employee performance' },
        ],
        nodes: [
          { id: 'lm', name: 'Language models', sub: 'read and write text', lane: 0, row: 0, kind: 'ai', detail: 'Software trained on large amounts of text, so it can read and write language.' },
          { id: 'ta', name: 'Text analysers', sub: 'text into countable parts', lane: 1, row: 0, kind: 'ai', detail: 'Tools that turn free text into parts a program can count and compare.' },
          { id: 'sa', name: 'Semantic analysers', sub: 'meaning, not just words', lane: 2, row: 0, kind: 'ai', detail: 'Tools that work with meaning, so differently worded messages about the same thing are recognised as alike.' },
          { id: 'found', name: 'One foundation', sub: 'shared by both solutions', lane: 1, row: 1, kind: 'store', detail: 'The three kinds of analysis form one foundation that both solutions stand on.' },
          { id: 'protos', name: 'My prototypes', sub: 'UI and UX for both', lane: 1, row: 2, kind: 'human', detail: 'I designed the UI and UX prototypes for both solutions, so the team had something concrete to build towards.' },
          { id: 'ret', name: 'Customer retention', sub: 'solution one', lane: 0, row: 3, kind: 'output', detail: 'Helps a dealership with customer retention: the problem Ava stands for.' },
          { id: 'perf', name: 'Employee performance', sub: 'solution two', lane: 2, row: 3, kind: 'output', detail: 'Monitors employee performance with the same language and semantic analysis.' },
        ],
        edges: [
          { from: 'lm', to: 'found', label: 'language' },
          { from: 'ta', to: 'found', label: 'structure' },
          { from: 'sa', to: 'found', label: 'meaning' },
          { from: 'found', to: 'ret', label: 'analysis' },
          { from: 'found', to: 'perf', label: 'analysis' },
          { from: 'protos', to: 'ret', label: 'the screens' },
          { from: 'protos', to: 'perf', label: 'the screens' },
        ],
      },
      caption: 'What we built, as a map: one foundation of analysis serving two solutions, with the prototypes I designed on top of both.',
    },
    { p: 'One foundation meant one body of analysis served two problems.' },

    { h2: 'My role and the team' },
    { p: 'I held the product, process and quality roles at once. As Product Owner I owned the requirements and the goals. As Scrum Master I owned how we worked against the clock. As QA lead I owned quality. I also designed the prototypes and gave the final presentation. The team built the two solutions together.' },
    { table: {
      columns: ['Stage', 'Me', 'AI agents', 'Team'],
      rows: [
        ['Requirements', 'Finalised the requirements; aligned the team on clear goals', '', ''],
        ['Design', 'Designed the UI and UX prototypes for both solutions', '', ''],
        ['Build', 'Ran the team as Scrum Master to keep delivery on track', '', 'Built the two AI solutions'],
        ['Quality', 'QA lead for the team', '', ''],
        ['Presentation', 'Prepared and delivered the final presentation', '', ''],
        ['Result', '', '', '1st of 11 teams'],
      ],
      note: 'Cells are left empty where the record doesn’t say who did the work.',
    }, caption: 'Who did what at the 2025 hackathon.' },

    { h2: 'How I approached it' },
    { stages: [
      { name: 'Requirements', part: 'Finalised the scope; aligned the team on goals', by: 'me' },
      { name: 'Prototypes', part: 'Designed the UI and UX for both solutions', by: 'me' },
      { name: 'Build', part: 'The team built; I kept delivery on track' },
      { name: 'Presentation', part: 'Prepared and delivered the final pitch', by: 'me' },
      { name: 'Result', part: '1st of 11 teams, division-wide', by: 'proved' },
    ], caption: 'From the first requirements to the result, with my part at each stage.' },
    { lead: 'Requirements first.', p: 'My first job as Product Owner was to finalise the requirements and align the team on clear goals, so everyone built towards the same two solutions. Against a clock, a team that disagrees about the finish line loses time it can’t get back.' },
    { lead: 'Prototypes next.', p: 'I designed the UI and UX prototypes for both solutions. A prototype gives a team something concrete to build towards, and gives judges something they can see rather than imagine.' },
    { lead: 'Then the build.', p: 'As Scrum Master, I ran the team to keep delivery on track against the clock, while the team built both solutions on the shared foundation.' },
    { lead: 'The pitch last.', p: 'I prepared and delivered the final presentation to the judges and the other participants. A pitch is where the requirements, the prototypes and the build have to come together in one story.' },
    { photo: '/images/events/hackathon-final-presentation.jpg', width: 1600, height: 901, alt: 'Mahmood presenting with a microphone at the AI hackathon, his team standing behind him.', caption: 'Presenting our solution to the judges and participants, with the team behind me.' },

    { h2: 'The result' },
    { p: 'We placed 1st of 11 teams in a division-wide AI hackathon, with two AI solutions for customer retention and employee performance.' },
    { numbers: [['1st', 'of 11 teams, division-wide']] },
    { photo: '/images/events/hackathon-presenting.jpg', width: 800, height: 800, alt: 'Collage from the hackathon: Mahmood presenting with a microphone, a group photo of the participants, and the audience in the session room.', caption: 'The day in three photos: the pitch, the participants and the session room.' },

    { h2: 'What I learned' },
    { quote: 'A hackathon is a product problem with an unforgiving deadline.' },
    { p: 'Holding three roles at once showed me how closely product, process and quality depend on each other. The requirements shape the schedule, and the schedule decides what you can show at the end.' },
    { p: 'My work today still mixes those roles: product definition, design collaboration, Scrum and QA leadership. In 2026 I organised a hackathon of my own, and started it the same way, with every participant’s requirements written down before anyone built anything.' },
    { p: 'A related problem came back a year later. Promise Tracker, the AI feature whose product definition I led, began as a customer-sentiment prototype meant to surface unhappy customers, before it became a list of what a dealership still owes them.' },
    { link: { to: '/case-studies/ai-foundations-hackathon', text: 'The AI Foundations hackathon I organised in 2026' } },
    { link: { to: '/case-studies/promise-tracker', text: 'Promise Tracker, the AI feature I led' } },
  ],
};
