// "How I work": the operating model behind the work. Each stage names the artifact it produces,
// the gate it has to pass and where it can be seen in practice. Worked examples are illustrative
// and contain no customer, partner or internal data.

export const operatingModel = [
  {
    id: 'discover',
    name: 'Discover',
    summary: 'Frame the right problem with the people who have it.',
    what: 'I map how the work happens today, who it affects and what a better outcome looks like, working with the Product Owner and the people who do the job.',
    artifact: 'problem',
    gate: 'The problem, the users and the success measure are agreed with the Product Owner.',
    tools: ['Stakeholder interviews', 'Process mapping', 'Decision workshops'],
    proof: { text: 'Product decisions and research', to: '/projects#product-decisions' },
  },
  {
    id: 'define',
    name: 'Define',
    summary: 'Write requirements that can be tested before anyone builds.',
    what: 'I turn the problem into epics and user stories with acceptance criteria, named personas and the edge cases answered up front.',
    artifact: 'story',
    gate: 'The story meets the definition of ready: criteria complete, edge cases answered, dependencies known.',
    tools: ['Azure DevOps', 'Aha!', 'Given / When / Then'],
    proof: { text: 'Requirements in practice', to: '/how-i-work#requirements' },
  },
  {
    id: 'design',
    name: 'Design',
    summary: 'Review every design before development starts.',
    what: 'I brief the designer on the business rules, then review every screen and state against the component library before it reaches development.',
    artifact: 'review',
    gate: 'Every state is designed and the review passes. Anything marked Fix goes back to design.',
    tools: ['Figma Make', 'Claude Design', 'Component library'],
    proof: { text: 'Design phase and UI revamp', to: '/case-studies/design-phase' },
  },
  {
    id: 'prototype',
    name: 'Prototype',
    summary: 'Let people use the idea before we commit to building it.',
    what: 'I build working prototypes by directing AI agents, so the team can test an idea before committing development time to it.',
    artifact: 'prototype',
    gate: 'The team has used the prototype and its feedback is reflected in the requirements.',
    tools: ['Figma Make', 'Claude Code', 'Claude Skills'],
    proof: { text: 'AI product prototyping', to: '/case-studies/ai-prototyping' },
  },
  {
    id: 'deliver',
    name: 'Deliver',
    summary: 'Keep the sprint predictable and the risks visible.',
    what: 'As Scrum Master I run planning, refinement and the board, and raise risks and cross-team dependencies before they turn into delays.',
    artifact: 'board',
    gate: 'Built to the acceptance criteria, with the automated gate checks passing in the pipeline.',
    tools: ['Azure DevOps', 'Scrum', 'Pipeline gate checks'],
    proof: { text: 'Quality Gates', to: '/case-studies/quality-gates' },
  },
  {
    id: 'release',
    name: 'Release',
    summary: 'Ship only what meets the agreed criteria.',
    what: 'I hold release readiness: quality criteria agreed in advance, consistent results across repeated runs, and a critical failure stops the release.',
    artifact: 'gate',
    gate: 'Release readiness is signed off against the criteria agreed at the start.',
    tools: ['Release gate', 'Playwright', 'Postman'],
    proof: { text: 'An AI feature release gate', to: '/case-studies/promise-tracker' },
  },
];

// The six stages in brief, for the Home page.
export const stages = operatingModel.map((s) => ({ name: s.name, body: s.summary }));

// A worked example: one story, its acceptance criteria and the edge-case check that shaped them.
export const requirementExample = {
  title: 'Broadcast to a customer group',
  persona: 'Sales manager',
  story: 'As a sales manager, I want to send a broadcast to a customer group, so that I can reach the customers who have agreed to hear from us.',
  criteria: [
    { id: 'AC1', text: 'Given a customer group, when I send a broadcast, then only customers who opted in to that channel receive it.' },
    { id: 'AC2', text: 'Given a customer opts out after the broadcast is scheduled, when it sends, then that customer is excluded.' },
    { id: 'AC3', text: 'Given the group spans several rooftops, when I send, then each rooftop’s own settings apply.' },
    { id: 'AC4', text: 'Given the messaging service is unavailable, when I send, then the broadcast is queued and I am told why.' },
    { id: 'AC5', text: 'Given the group is empty, when I open the broadcast, then I see why and how to add customers.' },
  ],
  checks: [
    { q: 'Integration offline, slow or mid-sync?', ac: 'AC4' },
    { q: 'Data null or malformed?', note: 'Validation rule agreed with the Product Owner' },
    { q: 'Consistent across every integration?', note: 'Added to the test scope' },
    { q: 'Empty states?', ac: 'AC5' },
    { q: 'Customer opted out?', ac: 'AC1' },
    { q: 'Dealer group with several rooftops?', ac: 'AC3' },
    { q: 'Permission implications?', note: 'Sending limited to managers' },
    { q: 'Could an automation conflict?', note: 'Checked against scheduled automations' },
    { q: 'Mobile and web behave the same?', note: 'Verified on both' },
    { q: 'Opt-out enforced at the point of sending?', ac: 'AC2' },
    { q: 'Channel dependency that needs a rollback plan?', ac: 'AC4' },
  ],
};

export const requirementRules = [
  'Given / When / Then for multi-path or integration-dependent features',
  'A checklist for single-path or UI-only changes',
  'Always at least one negative scenario',
];

export const personas = ['Dealer admin', 'Sales rep', 'BDC agent', 'Service advisor', 'Dealer principal', 'Super admin'];

export const designReview = [
  'Uses components from the library, not one-off variants',
  'Spacing, type and colour follow the design tokens',
  'Every state is designed: empty, loading, error, success',
  'Business rules are visible where the user needs them',
  'Works on mobile as well as web',
  'Accessible: contrast, labels, keyboard and focus',
];

export const aiPractice = [
  { title: 'I decide; agents build', body: 'I own the problem, the requirements, the architecture trade-offs and what ships. AI agents write the code from my specifications.' },
  { title: 'AI output is tested like software', body: 'Everything an agent produces is reviewed and tested. My own audit found tests in an AI-built suite that passed with the backend switched off.' },
  { title: 'Every write needs a yes', body: 'The tools I build show a dry run first and wait for explicit approval before writing to a team’s tracker.' },
  { title: 'Results come from real runs', body: 'A result counts only when a real run produced it, never because an agent reported success.' },
  { title: 'Clear ownership', body: 'Every project separates what I decided, what AI built and what the team delivered.' },
];

export const skillsWritten = [
  { title: 'Test-case drafting skill', body: 'Drafts test cases in my house style, learned from hundreds of test cases I had written.' },
  { title: 'QA Engineering Plugin', body: '30 skills across seven plugins, from story analysis to filed bugs.' },
  { title: 'AI feature behaviour', body: 'The rules an AI feature follows: what it detects, when it acts and what it must never say.' },
  { title: 'Skills Evals Lab', body: 'A 14-module interactive course on evaluating AI skills.' },
  { title: 'Working with Claude handbook', body: 'A 183-page practical guide to the eleven building blocks of Claude, written for the division.' },
];

// Principles, each backed by a result on this site.
export const principles = [
  { title: 'Settle edge cases before the build', value: '68%', label: 'of leaked defects traced to incomplete acceptance criteria, before Quality Gates', to: '/case-studies/quality-gates' },
  { title: 'Review the design before development', value: '7', label: 'product areas revamped through the design phase', to: '/case-studies/design-phase' },
  { title: 'Make knowledge reusable', value: '60+', label: 'SOPs and guides written for every team', to: '/case-studies/domain-knowledge-base' },
  { title: 'Test AI output like any software', value: '4', label: 'rules set to rebuild an AI-built test suite after auditing it', to: '/case-studies/ai-test-suite-audit' },
  { title: 'Keep a person in control', value: '30', label: 'AI skills that ask before they write', to: '/case-studies/qa-plugin' },
  { title: 'Standardise what works', value: '5+', label: 'teams adopted the API testing approach I evaluated', to: '/case-studies/postman-evaluation' },
];
