// Design phase, UI revamp and design system, told end to end (round 2, 11 Nov 2026). Sources:
// docs/private/chat-exports/me.md (E17: the functional-requirements partner in twice-weekly sessions,
// Mondays and Thursdays), docs/private/chat-exports/merged.md (§7; §8: the revamp; §10 and C17),
// docs/private/artifacts/platform-design-learning.md §4 (the design system: extracted from the shipped
// theme, contrast on every colour, failing colours flagged, roles, migration map, "not synced" list,
// content rules) and §5 (three list layouts), method.js (the six design-review checks) and
// docs/content/about-mahmood.md (2024 start, the April 2026 revamp). Company rule: what he did and the
// problem it solved; no internal names, per-feature counts, contrast ratios or sample data. Never say
// that anyone tried the design phase before him. Designs are reviewed against the component library
// (in Figma; he confirmed it on 11 Nov 2026) and the design system, which sits beside it. The
// library's components and screens are company property: never show, recreate or link them.
export default {
  updated: 'November 2026',
  body: [
    { p: 'Wednesday, mid-sprint. A developer is halfway through building a new screen and has three questions that nobody wrote the answers to. Each one costs a message, a meeting or a guess, and one of the guesses comes back from testing as a bug.' },
    { p: 'Designs are cheapest to fix before anyone builds them. So I introduced a short design step that settles those questions first, and tied it to how the team decides a story is ready. In 2026 I used the same discipline to lead a revamp of seven areas of our dealership CRM, and to direct a design system taken from the product exactly as it ships.' },

    { h2: 'At a glance' },
    { ol: [
      'I introduced a design step between requirements and development: a functional brief before design, and a review before any build.',
      'I made a referenced design part of “ready”, which is what turned the step into part of how the team works.',
      'I led the revamp of seven product areas in three languages, with AI agents writing the code under my direction.',
      'I directed a design system extracted from the shipped theme, with contrast measured on every colour, so new screens start from the same tokens and rules.',
    ] },
    { numbers: [['7', 'product areas revamped'], ['3', 'languages: English, Spanish and French'], ['Embedded', 'the design phase is now part of delivery']] },

    { h2: 'Three questions on a Wednesday' },
    { p: 'Picture a story for a new screen that lists a dealership’s customer groups. The mock-up shows a tidy list. Sam, the developer, starts on Monday. By Wednesday the questions arrive.' },
    { ol: [
      'What does the screen show when a dealership has no groups yet?',
      'Are customers who opted out of texts still counted?',
      'Where does the “New group” button go on a phone?',
    ] },
    { p: 'Each answer costs a message, a meeting or a guess. In testing, the empty screen turns out to be blank, and the story goes back.' },
    { p: 'That was the pattern. Without a dedicated design step, business rules, edge cases and design standards were settled late, during development and testing. That is exactly when changes cost the most: screens were reworked after they were built, and testing turned up gaps a design review would have caught much earlier.' },
    { p: 'None of those three questions is hard. They were simply asked at the most expensive moment.' },

    { h2: 'A short step before the build' },
    { p: 'The fix is a short, repeatable step between requirements and development. It has four parts, always in the same order.' },
    { lead: 'The brief.', p: 'Every screen begins with a functional brief: the business rules, the users and the edge cases it has to handle. I write it before the designer draws anything.' },
    { lead: 'The sessions.', p: 'Twice a week, on Mondays and Thursdays, I sit with the UX designer as the functional-requirements partner. Questions about the rules get answered while the design is still a drawing, when changing it costs minutes.' },
    { lead: 'The review.', p: 'Before any developer starts, I review the design against the story, the component library and the design system. The library is the designers’ set of ready-made parts, kept in Figma; the system is the product’s colours, type and spacing, written down with rules. Anything that fails goes back to design, not on to development.' },
    { lead: 'The rule.', p: 'The Definition of Ready is the checklist a story must pass before it can enter a sprint. I added one line to it: a story isn’t ready for development until its design is referenced, or explicitly marked as not needed. That one rule is what made the step stick.' },
    { p: 'Here is one story making the whole trip. Watch the loops on the right: a failed review sends the design back up to the designer, and the packet meets two of my gates before a developer sees it.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'Designer' }, { name: 'Developers' }],
        phases: [
          { name: 'Requirements', row: 0 },
          { name: 'Design', row: 2 },
          { name: 'Delivery', row: 5 },
        ],
        nodes: [
          { id: 'story', name: 'A story arrives', sub: 'a new screen is needed', lane: 0, row: 0, kind: 'human', detail: 'The story says what the user wants, but not yet what happens at the edges.' },
          { id: 'brief', name: 'Write the brief', sub: 'rules, users, edge cases', lane: 0, row: 1, kind: 'human', detail: 'Before anyone draws, I write down the business rules, who uses the screen and the edge cases it must handle: empty, loading, error, opted out, on a phone.' },
          { id: 'session', name: 'Design session', sub: 'Mondays and Thursdays', lane: 0.5, row: 2, kind: 'human', detail: 'I sit with the designer as the requirements partner. A question about a rule is answered here, on a drawing, not in code weeks later.' },
          { id: 'design', name: 'Design the screens', sub: 'every state, web and mobile', lane: 1, row: 3, kind: 'human', detail: 'The designer draws every state the brief asks for, on a phone as well as the web.' },
          { id: 'review', name: 'Design review', sub: 'six checks, before any build', lane: 0, row: 4, kind: 'gate', detail: 'I check the design against the story, the component library and the design system. One failed check and it goes back to the designer, not on to a developer.' },
          { id: 'ready', name: 'Ready gate', sub: 'design referenced', lane: 0, row: 5, kind: 'gate', detail: 'The story can enter a sprint only with its approved design referenced, or marked as not needed. No reference, no development.' },
          { id: 'build', name: 'Build the screen', sub: 'to the approved design', lane: 2, row: 6, kind: 'human', detail: 'The developer builds from a design whose rules and states are already settled.' },
          { id: 'done', name: 'Done gate', sub: 'shipped matches design', lane: 0, row: 7, kind: 'gate', detail: 'A story is done only when what shipped matches the approved design. If it doesn’t, it goes back to the build.' },
          { id: 'shipped', name: 'Screen shipped', sub: 'rules and states included', lane: 1.5, row: 8, kind: 'output', detail: 'The screen reaches users with its empty state, its business rule and its phone layout, each decided on paper first.' },
        ],
        edges: [
          { from: 'story', to: 'brief', label: 'story' },
          { from: 'brief', to: 'session', label: 'functional brief' },
          { from: 'session', to: 'design', label: 'answered rules' },
          { from: 'design', to: 'review', label: 'draft design' },
          { from: 'review', to: 'design', label: 'fix before build' },
          { from: 'review', to: 'ready', label: 'approved design' },
          { from: 'ready', to: 'build', label: 'ready story' },
          { from: 'build', to: 'done', label: 'built screen' },
          { from: 'done', to: 'build', label: 'mismatch' },
          { from: 'done', to: 'shipped', label: 'done story' },
        ],
      },
      caption: 'One story, from brief to shipped screen. The amber gates are mine; the loops are work going back before it can cost more.',
    },
    { p: 'And here is the customer-groups story once it has been through the brief. The rules and the states are in the criteria before design begins, so the designer draws every one of them.' },
    { story: {
      persona: 'Sales manager',
      status: 'Ready for design',
      title: 'See my customer groups',
      text: 'As a sales manager, I want to see my customer groups and how many customers each one holds, so that I can choose the right audience for a broadcast.',
      criteria: [
        'Given I have customer groups, when I open the list, then each group shows its name and how many customers it holds.',
        'Given a group includes customers who opted out of texts, when I view the list, then the screen says they are left out when a broadcast is sent.',
        'Given I have no groups yet, when I open the list, then I see why it is empty and how to create the first group.',
        'Given the list is loading or fails to load, when I wait, then I see a loading state, or an error with a way to try again.',
        'Given I am on a phone, when I open the list, then I can see every group and create a new one.',
      ],
    }, caption: 'The story after the brief: rules and states written down before anyone designs. Recreation, fictional data.' },
    { p: 'Each criterion reads: given a situation, when someone acts, then this should happen. All three of Sam’s questions are answered before the design exists.' },

    { h2: 'Six checks before any code' },
    { p: 'The review asks the same six questions every time, and each one stops a different late surprise.' },
    { p: 'One term first: a design token is a named value, such as “primary colour” or “small spacing”. Everyone uses the name, never the raw value, so the product stays consistent.' },
    { table: {
      columns: ['Check', 'What it asks', 'What it catches, for example'],
      rows: [
        ['Components', 'Does it use components from the library, not one-off variants?', 'A button that looks almost like the standard one, and has to be built from scratch'],
        ['Tokens', 'Do spacing, type and colour follow the design tokens?', 'A grey that is nearly the right grey, about to live in the code for years'],
        ['States', 'Is every state designed: empty, loading, error, success?', 'The blank screen Sam found on Wednesday'],
        ['Business rules', 'Is each rule visible where the user needs it?', 'Opted-out customers missing from a count, with nothing on screen saying why'],
        ['Mobile', 'Does it work on a phone as well as on the web?', 'A “New group” button that falls off a small screen'],
        ['Accessibility', 'Contrast, labels, keyboard and focus?', 'An icon button that a screen reader can only call “button”'],
      ],
    }, caption: 'The design-review checklist, with the kind of problem each check stops. Examples are fictional.' },
    { p: 'In the review below, everything passes except the empty state, which the story asked for and the design missed. It goes back to the designer, not on to a developer.' },
    { figure: 'designReview', caption: 'A design review of the same screen: each check passes, or goes back to design before the build. Recreation, fictional data.' },

    { h2: 'My role and the team' },
    { p: 'I introduced the design phase: I write the briefs, work through the rules with the designer and review every design before development. The UX designer designs the screens. For the revamp and the design system, I directed the work and reviewed it, and AI agents wrote the code and the documentation. My name is in the design system’s change record.' },
    { table: {
      columns: ['Stage', 'Me', 'AI agents', 'Team'],
      rows: [
        ['Brief', 'Wrote the functional brief', '', ''],
        ['Design', 'Joined the designer twice a week as the requirements partner', '', 'The UX designer designed the screens'],
        ['Review', 'Reviewed every design before development', '', ''],
        ['Ready', 'Made a referenced design part of “ready”', '', 'Works to the rule'],
        ['Revamp', 'Led seven product areas; reviewed and tested what shipped', 'Wrote the code under my direction', ''],
        ['Design system', 'Directed it; set the rules for contrast, roles and approval', 'Extracted the tokens from the shipped theme', 'Approves new colours'],
        ['New screens', 'Asked for options, not one answer', 'Drew three layouts on the system', ''],
      ],
    }, caption: 'Who did what. I briefed, decided and reviewed; the designer designed; AI agents wrote code and documentation under my direction.' },

    { h2: 'How it grew' },
    { p: 'Seven stages over three years. The label on each says who carried it.' },
    { stages: [
      { name: 'Brief', part: 'Rules, users and edge cases before design', by: 'me' },
      { name: 'Design sessions', part: 'Twice a week with the designer', by: 'me' },
      { name: 'Review', part: 'Every design checked before development', by: 'proved' },
      { name: 'Ready', part: 'No design reference, no development', by: 'me' },
      { name: 'Revamp', part: 'Seven product areas, three languages', by: 'ai' },
      { name: 'Design system', part: 'The shipped theme, written down as tokens', by: 'ai' },
      { name: 'New screens', part: 'Options drawn on the system', by: 'ai', now: true },
    ], caption: 'From the first brief to new screens drawn on the design system, with who carried each stage.' },
    { lead: 'Brief.', p: 'I first used the step in 2024, to lead the design phase for the dealership mobile app with the UX designer. Every screen began with a functional brief.' },
    { lead: 'Design sessions.', p: 'I set two sessions a week. A fixed rhythm means a question about the rules always has a place to go within days.' },
    { lead: 'Ready.', p: 'The design reference went into the Definition of Ready, and its partner went into the Definition of Done: what ships must match the approved design.' },

    { h2: 'Seven areas, three languages' },
    { p: 'In April 2026 I started a full revamp of our dealership CRM: seven product areas rebuilt on the newer design. I led it. AI agents wrote the code under my direction. I reviewed each area against the design and the business rules, and tested what shipped in English, Spanish and French.' },
    { p: 'It is the design phase at a larger scale, with one difference: the builder is an AI agent, and an agent builds exactly what it is told, gaps included. So the specification and the review carry even more weight.' },
    { p: 'Follow one area through, and watch the loop: nothing reaches users until my review passes, and a failed review goes back to the agents with a fix list.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'AI agents' }, { name: 'Users' }],
        nodes: [
          { id: 'spec', name: 'Specify the area', sub: 'design + business rules', lane: 0, row: 0, kind: 'human', detail: 'For each area I set what has to be true: the approved design to match and the business rules the screens must keep.' },
          { id: 'code', name: 'Rebuild the screens', sub: 'on the newer design', lane: 1, row: 1, kind: 'ai', detail: 'AI agents write the code under my direction. They build; I decide what “right” means.' },
          { id: 'review', name: 'Review the area', sub: 'design and business rules', lane: 0, row: 2, kind: 'gate', detail: 'I review the area against the design and the business rules. Anything off goes back to the agents with a fix list.' },
          { id: 'live', name: 'Area shipped', sub: 'on the newer design', lane: 2, row: 3, kind: 'output', detail: 'The area reaches users on the newer design, with its business rules intact.' },
          { id: 'test', name: 'Test what shipped', sub: 'English, Spanish, French', lane: 0, row: 4, kind: 'human', detail: 'I test what shipped in all three of the product’s languages. A screen can pass in one and break in another.' },
        ],
        edges: [
          { from: 'spec', to: 'code', label: 'specification' },
          { from: 'code', to: 'review', label: 'rebuilt area' },
          { from: 'review', to: 'code', label: 'fix list' },
          { from: 'review', to: 'live', label: 'approved area' },
          { from: 'live', to: 'test', label: 'shipped screens' },
        ],
      },
      caption: 'One revamped area, from specification to tested release. The agents write the code; the amber gate is my review.',
    },
    { p: 'The revamp also added new work, a performance dashboard, which I contributed to. And I had a Claude plugin made that turns a Figma design into code and grades the result pass or fail against the design system.' },

    { h2: 'The theme, written down honestly' },
    { p: 'Our standards lived only in the code. Colours and spacing were hardcoded, and nothing written said which colour was for what. A reviewer could say a screen looked wrong, but not which rule it broke.' },
    { p: 'In October 2026 I directed a design system taken from the product as it ships, with every value traced to the code. It sits beside the component library our designers work from: the library holds the components, and the system holds the values and rules behind the product as it ships.' },
    { p: 'Its most important habit is honesty. Watch the contrast check in the diagram: colours that fail are not quietly fixed but flagged, and colours nobody has named wait on a list instead of sneaking in.' },
    {
      graph: {
        lanes: [{ name: 'Me' }, { name: 'AI agents' }, { name: 'Team' }],
        nodes: [
          { id: 'brief', name: 'Set the brief', sub: 'the theme as it ships', lane: 0, row: 0, kind: 'human', detail: 'Take the theme exactly as the product ships it. No new palette, no tidying, every value traced to the code.' },
          { id: 'code', name: 'The shipped code', sub: 'colours, type, spacing', lane: 2, row: 0, kind: 'store', detail: 'The real theme, hardcoded values and all.' },
          { id: 'extract', name: 'Extract every value', sub: 'traced to the code', lane: 1, row: 1, kind: 'ai', detail: 'AI agents copy each colour, type style, spacing step and layer with its exact value and where in the code it lives.' },
          { id: 'contrast', name: 'Measure contrast', sub: 'every colour, white text', lane: 1, row: 2, kind: 'check', detail: 'Every colour gets its contrast ratio against white text, written into its usage note. Several status colours fail.' },
          { id: 'flag', name: 'Flag, don’t fix', sub: 'kept as shipped + a rule', lane: 1, row: 3, kind: 'ai', detail: 'A failing colour stays exactly as shipped and is marked as failing. A usage rule routes around it: the darker step for filled buttons, status colours only as indicators or with dark text.' },
          { id: 'waiting', name: '“Not synced” list', sub: 'colours without a name', lane: 2, row: 2, kind: 'store', detail: 'Colours in the code that the team hasn’t approved stay out of the system and on this list.' },
          { id: 'roles', name: 'Set roles and rules', sub: 'what each colour is for', lane: 0, row: 4, kind: 'human', detail: 'I set the rules: which colour is for primary actions, which only for indicators, which never for states.' },
          { id: 'approve', name: 'Approve a name', sub: 'the team decides', lane: 2, row: 3, kind: 'human', detail: 'A waiting colour joins the system only when the team approves a name for it. Until then it stays hardcoded.' },
          { id: 'check', name: 'Review the system', sub: 'against code and rules', lane: 0, row: 5, kind: 'gate', detail: 'I review the system against the code and the rules before anyone builds from it.' },
          { id: 'system', name: 'The design system', sub: 'beside the component library', lane: 1, row: 6, kind: 'output', detail: 'Values and rules here; components in the designers’ library. New screens start from both.' },
          { id: 'screens', name: 'Draw new screens', sub: 'three layouts, one system', lane: 1, row: 7, kind: 'ai', detail: 'A list screen drawn three ways, each on the system’s tokens and rules from the first draft.' },
        ],
        edges: [
          { from: 'brief', to: 'extract', label: 'brief' },
          { from: 'code', to: 'extract', label: 'theme values' },
          { from: 'extract', to: 'contrast', label: 'colour tokens' },
          { from: 'contrast', to: 'flag', label: 'ratio per colour' },
          { from: 'extract', to: 'waiting', label: 'unnamed colours' },
          { from: 'flag', to: 'roles', label: 'flagged tokens' },
          { from: 'waiting', to: 'approve', label: 'waiting colours' },
          { from: 'roles', to: 'check', label: 'tokens with roles' },
          { from: 'approve', to: 'check', label: 'approved names' },
          { from: 'check', to: 'system', label: 'reviewed system' },
          { from: 'system', to: 'screens', label: 'tokens + rules' },
        ],
      },
      caption: 'How the shipped theme became a design system. The automatic check measures every colour; failing colours are flagged, not hidden.',
    },
    { p: 'Here is what the system holds, part by part.' },
    { cards: [
      { title: 'Exact values', tag: 'from the code', body: 'Every colour, type style, spacing step and layer, copied from the shipped theme with its exact value. Nothing invented, nothing tidied.' },
      { title: 'Contrast and flags', tag: 'every colour', body: 'Each colour carries its contrast ratio against white text. Failing colours stay as shipped, flagged, with rules that route around them.' },
      { title: 'Roles', tag: 'not just values', body: 'Which colour is for primary actions, which only for indicators, and which never for states. Brand colours are for brand moments only.' },
      { title: 'Migration map', tag: 'hardcoded to token', body: 'Hardcoded colours in the code map to tokens, so a migration replaces values without changing the look. Odd spacing values are recorded as they are, not snapped to the grid.' },
      { title: '“Not synced” list', tag: 'waiting for a name', body: 'Colours the team hasn’t approved stay out until they get a name. The system records what it left out.' },
      { title: 'Content rules', tag: 'how the interface speaks', body: 'Title case for actions, sentence case for helper text, “you” as the subject, and no emoji in the interface itself.' },
    ], caption: 'The parts of the design system, in generic words.' },

    { h2: 'Three layouts, not one' },
    { p: 'A standard earns its keep on the next screen. For a list of upcoming appointments, I had three layouts drawn on the system, so the team could compare densities instead of debating one mock-up.' },
    { cards: [
      { title: 'Compact list', tag: 'option A', body: 'One row per appointment, grouped by when it falls, with a count beside each group.' },
      { title: 'Agenda by day', tag: 'option B', body: 'Appointments in day blocks, each led by a date tile showing the month and the day.' },
      { title: 'Dense table', tag: 'option C', body: 'The most rows on one screen, with proper column headers and a hidden “Actions” header for screen readers.' },
    ], caption: 'Three densities for the same data, all drawn on the design system. Described in words; the drawings stay private.' },
    { p: 'All three follow the system from the first draft: colour roles, contrast-safe chips and the spacing grid. Small decisions are drawn in too: near dates read as “Tomorrow”, icon buttons carry labels and touch targets are comfortable.' },

    { h2: 'Key decisions' },
    { p: 'Most of the work was deciding where a question should be answered, and what a standard should and shouldn’t hold.' },
    { decisions: [
      {
        q: 'Where should design questions get answered?',
        options: ['During development, as they come up', 'In a short step before development'],
        chose: 'In a short step before development',
        why: 'A question answered on a drawing costs minutes. The same question answered in code costs a rebuild and a second round of testing.',
      },
      {
        q: 'What should the design system hold?',
        options: ['A new, ideal set of styles', 'The theme exactly as it ships'],
        chose: 'The theme exactly as it ships',
        why: 'A system that matches the product can be used on the next screen without changing the look of the last one. Every token is traced to the code, so nobody has to trust a guess.',
      },
      {
        q: 'What happens to colours that fail contrast?',
        options: ['Fix them quietly in the system', 'Keep them as shipped, flag them and add usage rules'],
        chose: 'Keep them as shipped, flag them and add usage rules',
        why: 'Changing a shipped colour is a product decision, not a documentation one. Flagging keeps the gap visible, and the usage rules route around it.',
      },
      {
        q: 'What about colours nobody has named?',
        options: ['Add every colour found in the code', 'Keep them out until the team approves a name'],
        chose: 'Keep them out until the team approves a name',
        why: 'A system that absorbs every one-off colour stops being a standard. Unapproved colours go on a “not synced” list, so the system records what it left out.',
      },
      {
        q: 'One mock-up for a new screen, or several?',
        options: ['One design to approve or reject', 'Three layouts drawn on the system'],
        chose: 'Three layouts drawn on the system',
        why: 'Side by side, the team sees what each density gives up. And since all three follow the system, the talk is about density, not colours.',
      },
    ], caption: 'The decisions behind the design phase and the design system, in my words.' },
    { call: {
      saw: 'Designs reached development with the business rules and edge cases still open, and the answers arrived as rework.',
      decided: 'I made a referenced design part of “ready”: no story enters development until its design is referenced, or marked as not needed.',
      why: 'A step people have to remember fades in a busy sprint. A rule inside the Definition of Ready is checked every time a story is accepted.',
    } },

    { h2: 'How we knew it was right' },
    { p: 'A design phase works when questions stop reaching development. These are the checks that hold it to that.' },
    { list: [
      'Anything marked “Fix before build” goes back to design, never on to development.',
      'No story enters development without its design referenced, or marked as not needed.',
      'A story is done only when what shipped matches the approved design.',
      'Every value in the design system traces back to the code, and every colour carries its contrast ratio.',
      'Design-to-code output is graded pass or fail against the design system.',
    ] },

    { h2: 'Where it is now' },
    { p: 'The design phase is part of how the team works, and design sits inside both the Definition of Ready and the Definition of Done. The design system is the reference new screens start from, and its “not synced” list keeps track of what still needs a decision.' },

    { h2: 'What I learned' },
    { quote: 'A design phase doesn’t need to be heavy to work.' },
    { p: 'It moves a handful of decisions to the point where they are cheapest to make. Once “ready” included a design, the step became part of how the team works.' },
    { p: 'A standard also has to be written down, and honest about its gaps, before anyone can review against it. Once each colour had a role and a contrast ratio, a review could point to the rule a screen broke, not just say it looked wrong.' },
    { p: 'And the clearer the standard, the more safely an AI agent can build to it: with agents, the specification and the review are where the quality comes from.' },
    { link: { to: '/case-studies/quality-gates', text: 'Quality Gates: where “ready” and “done” are defined' } },
    { link: { to: '/case-studies/ai-prototyping', text: 'Prototypes the team can click before we build' } },
  ],
};
