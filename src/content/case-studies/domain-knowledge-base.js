// Domain training and knowledge transfer, told end to end (round 2, 11 Nov 2026). Sources: the
// programme facts already on the site (sessions, SOPs, walkthroughs, office hours, the knowledge audit
// and the curriculum), his own case-study notes (docs/private/working-notes/context/CASE_STUDIES.md)
// and docs/private/chat-exports/merged.md (§7, §9, question 13: he contributed to the public product
// knowledge base; he did not write it). Hours come from hours.js, never hard-coded. The curriculum
// map's example topics are generic and drawn from the product areas already public on the site.
import { hoursText } from '../hours';

export default {
  updated: 'November 2026',
  body: [
    { p: 'Second week on the job. Dana, a new tester, is checking a broadcast and can’t tell whether one customer should have received it. Had the customer opted out? Does the dealer group share its settings across rooftops?' },
    { p: 'She asks a senior engineer, who stops what he is doing to explain. The next day a new developer asks him the same question.' },
    { p: `When I joined, domain knowledge lived in the heads of three senior engineers who were also responsible for delivery. I turned it into a structured programme of live sessions, SOPs and walkthroughs, and delivered ${hoursText.junior} hours of training as a Junior SQA Analyst.` },
    { p: 'I started the programme myself, designed it and delivered it. It reached operations, development, QA, stakeholders and customers, and the knowledge transfer around it fed the public product knowledge base, which I contributed to.' },

    { h2: 'At a glance' },
    { ol: [
      'I shadowed the senior engineers for three weeks and wrote down processes that had never been written down.',
      'I mapped what people needed to know into 14 knowledge domains, then into modules of increasing depth.',
      'I ran the live sessions and weekly office hours, and wrote the SOPs and video walkthroughs.',
      'I kept the material current through feedback after every cohort and updates every quarter.',
    ] },
    { numbers: [['~90%', 'less time spent on domain training'], [hoursText.junior, 'training hours delivered'], ['60+', 'SOPs and guides written'], ['5+', 'audiences, from operations to customers']] },

    { h2: 'Knowledge by osmosis' },
    { p: 'Dana’s afternoon was the everyday reality. New hires learned by osmosis over months. They asked the same questions again and again, and every question pulled a senior engineer away from their own work. There was no single source of truth.' },
    { p: 'The domain makes it harder. Our product sits on top of the systems dealerships already run, so understanding it means understanding dealerships too: how they are organised, how their systems behave and which business rules apply.' },
    { p: 'Take Dana’s second question. A rooftop is one dealership, and a dealer group can own several. Whether a setting is shared across them is exactly the kind of detail that lived in someone’s head.' },

    { h2: 'From three heads to every team' },
    { p: 'The programme turned that knowledge into something people could learn without interrupting anyone. Watch the packet travel from the senior engineers to the learners, then back to me as feedback before it reaches the result.' },
    {
      graph: {
        lanes: [{ name: 'Senior engineers' }, { name: 'Me' }, { name: 'Learners' }, { name: 'Product' }],
        phases: [
          { name: 'Capture', row: 0 },
          { name: 'Teach', row: 4 },
          { name: 'Improve', row: 6 },
        ],
        nodes: [
          { id: 'heads', name: 'What they knew', sub: 'in three heads', lane: 0, row: 0, kind: 'store', detail: 'Processes, rules and history that existed nowhere else, held by three senior engineers who were also responsible for delivery.' },
          { id: 'shadow', name: 'Shadow for 3 weeks', sub: 'write the unwritten', lane: 1, row: 1, kind: 'human', detail: 'I spent three weeks shadowing the senior engineers and documenting processes that had never been written down.' },
          { id: 'map', name: 'Map 14 domains', sub: 'the knowledge audit', lane: 1, row: 2, kind: 'human', detail: 'The audit surfaced 14 critical knowledge domains, across dealership systems, the CRM, business rules and testing workflows.' },
          { id: 'design', name: 'Design the modules', sub: 'theory, exercise, check', lane: 1, row: 3, kind: 'human', detail: 'I structured the domains into a modular path of increasing depth, adding up to 80 hours of structured content.' },
          { id: 'teach', name: 'Teach and write', sub: 'sessions, SOPs, walkthroughs', lane: 1, row: 4, kind: 'human', detail: 'Live sessions taught it, SOPs set out the steps, walkthroughs could be watched again, and weekly office hours caught the rest.' },
          { id: 'learn', name: 'Learn, then show it', sub: 'module by module', lane: 2, row: 5, kind: 'human', detail: 'Learners work through the modules, and finish each one by showing they can do it.' },
          { id: 'kb', name: 'Public knowledge base', sub: 'contributed to, not written', lane: 3, row: 5, kind: 'external', detail: 'The sessions and the knowledge transfer around them fed the public product knowledge base. I contributed to it; I didn’t write it.' },
          { id: 'feedback', name: 'Give feedback', sub: 'after every cohort', lane: 2, row: 6, kind: 'human', detail: 'Every cohort gives feedback on the material, so the next one gets better material.' },
          { id: 'update', name: 'Update the material', sub: 'every quarter', lane: 1, row: 7, kind: 'human', detail: 'I update the material every quarter, as the product changes and the feedback comes in.' },
          { id: 'productive', name: 'Productive sooner', sub: 'time to productivity tracked', lane: 2, row: 8, kind: 'output', detail: 'About 90% less time spent on domain training, and time to productivity tracked for the people who took the programme.' },
          { id: 'timeback', name: 'Time back', sub: 'fewer interruptions', lane: 0, row: 8, kind: 'output', detail: 'The senior engineers got back the hours that the same questions, asked by every new hire, used to take.' },
        ],
        edges: [
          { from: 'heads', to: 'shadow', label: 'unwritten know-how' },
          { from: 'shadow', to: 'map', label: 'audit notes' },
          { from: 'map', to: 'design', label: '14 domains' },
          { from: 'design', to: 'teach', label: 'modules' },
          { from: 'teach', to: 'learn', label: 'sessions + material' },
          { from: 'teach', to: 'kb', label: 'knowledge transfer' },
          { from: 'learn', to: 'feedback', label: 'experience' },
          { from: 'feedback', to: 'update', label: 'feedback' },
          { from: 'update', to: 'productive', label: 'current material' },
          { from: 'productive', to: 'timeback', label: 'fewer questions' },
        ],
      },
      caption: 'How knowledge moved, from three heads to every team, and how feedback kept it current. The knowledge base is the product’s, not mine: I contributed to it.',
    },
    { p: 'Four formats did four different jobs. Watch the tags: each one says how much of it there was.' },
    { cards: [
      { title: 'Live sessions', tag: '120+', body: 'Where the knowledge is taught, questions and all. More than 120 of them over 18 months.' },
      { title: 'SOPs', tag: '60+', body: 'Standard operating procedures: the steps for one task, written down so anyone can follow them without asking.' },
      { title: 'Video walkthroughs', tag: '30', body: 'The same tasks shown on screen, to watch again whenever they are needed.' },
      { title: 'Office hours', tag: 'weekly', body: 'A weekly Q&A slot for whatever the material doesn’t cover yet.' },
    ], caption: 'The four formats of the programme, and the job each one does.' },

    { h2: 'Four areas, fourteen domains' },
    { p: 'Underneath sits a curriculum built from the knowledge audit. The 14 knowledge domains fell into four areas, each taught in modules of increasing depth. Here is the map, with the kind of topic each area covers.' },
    { table: {
      columns: ['Area', 'What a learner comes away with', 'Example topics'],
      rows: [
        ['Dealership systems', 'How a dealership works, and how the systems it already runs feed the product', 'Departments and roles; how customer and sales records arrive; what changes from one system to another'],
        ['The CRM', 'What each part of the product does, and for whom', 'Customers and messaging; broadcasts and customer groups; automations; surveys and reviews; deals, payments and inventory; the mobile app'],
        ['Business rules', 'The rules that decide what should happen, and when', 'Opt-outs and consent; dealer groups with several rooftops; what each role may see and do'],
        ['Testing workflows', 'How to prove the product does what the rules say', 'Acceptance criteria; edge cases; release checks'],
      ],
    }, caption: 'The curriculum map, in generic words: the four areas the 14 knowledge domains fell into. Example topics are illustrative.' },
    { p: 'Every module had the same three parts: theory, a hands-on exercise and a competency check. Watch the loop at the check: a learner who can’t show the skill yet goes back to practise, and only one who can moves a level deeper.' },
    {
      graph: {
        lanes: [{ name: 'Learner' }, { name: 'Me' }],
        nodes: [
          { id: 'start', name: 'A learner starts', sub: 'new hire or any team', lane: 0, row: 0, kind: 'human', detail: 'A new hire, or someone from operations, development or QA. Everyone starts with the first module.' },
          { id: 'theory', name: 'Theory', sub: 'live session or SOP', lane: 1, row: 1, kind: 'human', detail: 'The idea first: how the dealership works, what the rule is and why it exists. Taught live, and written down to read again.' },
          { id: 'exercise', name: 'Hands-on exercise', sub: 'do it, don’t watch it', lane: 0, row: 2, kind: 'human', detail: 'The learner does the task themselves, so what gets checked next is doing, not remembering.' },
          { id: 'check', name: 'Competency check', sub: 'show, don’t attend', lane: 1, row: 3, kind: 'gate', detail: 'A module is finished when the learner can show what they learned, not when the session ends. Not yet means more practice, with office hours for the questions.' },
          { id: 'deeper', name: 'Next module', sub: 'one level deeper', lane: 0, row: 4, kind: 'human', detail: 'Pass, and the next module goes one level deeper, through the same three parts: theory, exercise, check.' },
          { id: 'done', name: 'Doing the job', sub: 'the path complete', lane: 0, row: 5, kind: 'output', detail: 'For a new hire, the end of the path is doing the work without pulling a senior engineer away from theirs.' },
        ],
        edges: [
          { from: 'start', to: 'theory', label: 'first module' },
          { from: 'theory', to: 'exercise', label: 'the concept' },
          { from: 'exercise', to: 'check', label: 'their work' },
          { from: 'check', to: 'exercise', label: 'not yet' },
          { from: 'check', to: 'deeper', label: 'passed' },
          { from: 'deeper', to: 'done', label: 'every module passed' },
        ],
      },
      caption: 'One module, and the path from new joiner to doing the job. The amber gate is the competency check: attendance alone never passes it.',
    },

    { h2: 'My role and the team' },
    { p: 'The programme was mine from start to finish: I started it, designed it and delivered it while I was a Junior SQA Analyst. The senior engineers were my main source, and every cohort shaped the material through its feedback. The public product knowledge base is not mine: I contributed to it through the sessions and the knowledge transfer around them.' },
    { table: {
      columns: ['Stage', 'Me', 'AI agents', 'Team'],
      rows: [
        ['Knowledge audit', 'Shadowed the senior engineers for three weeks; wrote down undocumented processes', '', 'The senior engineers let me shadow their work'],
        ['Curriculum', 'Mapped 14 knowledge domains into modules of increasing depth', '', ''],
        ['Delivery', 'Ran more than 120 live sessions and weekly Q&A office hours', '', ''],
        ['Material', 'Wrote over 60 SOPs and 30 video walkthroughs', '', ''],
        ['Iteration', 'Updated the material every quarter; tracked time to productivity', '', 'Every cohort gave feedback'],
        ['Knowledge base', 'Contributed through the sessions and knowledge transfer', '', ''],
      ],
    }, caption: 'Who did what. I designed and delivered the programme; the public knowledge base is not mine, and I contributed to it.' },

    { h2: 'Shadow first, teach second' },
    { p: 'Six stages, in the order they happened. The label on each says who carried it.' },
    { stages: [
      { name: 'Shadow', part: 'Three weeks with the senior engineers', by: 'me' },
      { name: 'Map', part: '14 knowledge domains, written down', by: 'me' },
      { name: 'Design', part: 'Modules: theory, exercise, competency check', by: 'me' },
      { name: 'Deliver', part: 'Sessions, SOPs, walkthroughs and office hours', by: 'me' },
      { name: 'Improve', part: 'Feedback every cohort, updates every quarter', by: 'proved' },
      { name: 'Share', part: 'Contributed to the public knowledge base', by: 'me' },
    ], caption: 'From shadowing to a programme for every team, with who carried each stage.' },
    { lead: 'Shadow.', p: 'Most of what the senior engineers knew existed nowhere else, so the first job was to write it down, not to teach it.' },
    { lead: 'Map.', p: 'The audit showed what people actually needed, before I decided what to teach: 14 critical knowledge domains.' },
    { lead: 'Design.', p: 'I structured the domains into a modular path of increasing depth, 80 hours of structured content in all.' },
    { lead: 'Deliver.', p: 'Over 18 months I ran more than 120 live sessions, wrote over 60 SOPs and 30 video walkthroughs, and held weekly Q&A office hours. The programme reached well beyond new hires: operations, development, QA, stakeholders and customers all used it.' },
    { lead: 'Improve.', p: 'I collected feedback after every cohort, updated the material every quarter, and tracked time to productivity.' },
    { lead: 'Share.', p: 'The sessions and the knowledge transfer around them fed the public product knowledge base. I contributed to it; I didn’t write it.' },

    { h2: 'Key decisions' },
    { p: 'Five calls shaped the programme. Most of them were about what happens after the first session.' },
    { decisions: [
      {
        q: 'Where should the programme start?',
        options: ['Start teaching from what I had picked up', 'Shadow the experts and write it down first'],
        chose: 'Shadow the experts and write it down first',
        why: 'What the senior engineers knew had never been written down. An audit showed what people actually needed before I decided what to teach.',
      },
      {
        q: 'One long induction, or modules?',
        options: ['A single induction for everyone', 'Modules of increasing depth'],
        chose: 'Modules of increasing depth',
        why: 'Modules can be taken in order, repeated and updated one at a time, without rewriting the whole course.',
      },
      {
        q: 'How do we know someone has learned it?',
        options: ['They attended the session', 'They pass a competency check at the end of each module'],
        chose: 'They pass a competency check at the end of each module',
        why: 'Sitting through a session proves little. A hands-on exercise and a check show whether someone can do the work.',
      },
      {
        q: 'Teach live, or write it down?',
        options: ['Live sessions only', 'Live sessions, plus SOPs, walkthroughs and weekly office hours'],
        chose: 'Live sessions, plus SOPs, walkthroughs and weekly office hours',
        why: 'Sessions teach. Written SOPs and recorded walkthroughs answer the same question the hundredth time without interrupting anyone, and office hours catch what the material doesn’t cover yet.',
      },
      {
        q: 'Write it once, or keep it current?',
        options: ['Finish the material and move on', 'Feedback every cohort and updates every quarter'],
        chose: 'Feedback every cohort and updates every quarter',
        why: 'The product changes every sprint. Material that doesn’t change with it starts teaching the wrong thing.',
      },
    ], caption: 'The decisions behind the programme, in my words.' },
    { call: {
      saw: 'Every question a new hire asked pulled a senior engineer away from delivery, and the same questions came back with every new hire.',
      decided: 'I turned what the senior engineers knew into a programme anyone could take, instead of answering the same questions one at a time.',
      why: 'An answer written once keeps working. An answer given in person costs someone’s focus every time it is asked.',
    } },

    { h2: 'How we knew it was right' },
    { p: 'A training programme works when people can do the job sooner and the experts get their time back. I held it to that, not to attendance.' },
    { list: [
      'Every module ends in a competency check, not a sign-in sheet.',
      'Feedback after every cohort, so the next cohort gets better material.',
      'The material updated every quarter, as the product changed.',
      'Time to productivity tracked for the people who took it.',
    ] },

    { h2: 'Where it landed' },
    { p: `The programme is complete. It ran from 2024 to 2025 and delivered ${hoursText.junior} hours of training, with more than 120 live sessions, over 60 SOPs, 30 video walkthroughs and weekly office hours. It reached operations, development, QA, stakeholders and customers, and what we documented fed the public product knowledge base, which I contributed to.` },
    { p: 'By the end, a question like Dana’s had somewhere to go that wasn’t a senior engineer’s desk.' },

    { h2: 'What I learned' },
    { quote: 'Writing the knowledge down showed the senior engineers how much context they had been carrying.' },
    { p: 'The real return wasn’t only faster onboarding: it freed them from hours of interruptions every day.' },
    { p: 'Training material is never finished while the product keeps changing. Feedback from every cohort and an update every quarter were what kept it true.' },
    { p: 'And a check beats a sign-in sheet: attendance says who was in the room, not who can do the work.' },
    { link: { to: '/case-studies/quality-gates', text: 'Quality Gates and the QA team I lead' } },
    { link: { to: '/case-studies/ai-foundations-hackathon', text: 'Teaching again: the AI Foundations hackathon' } },
  ],
};
