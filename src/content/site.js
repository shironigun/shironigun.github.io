// Identity, navigation and homepage copy. Single source of truth.
// Rules: no invented numbers; ownership words are exact (led / built / assisted);
// no internal URLs, partner names, ticket numbers, dealer data, pricing or security findings.

export const person = {
  name: 'Mahmood Ahmad',
  title: 'AI Product Analyst',
  officialTitle: 'Product Quality Analyst',
  company: 'Perseus Group, Constellation Software',
  product: 'Enterprise dealership CRM',
  available: false,
  availability: 'Happy to talk about AI product work, quality and agentic delivery.',
};

export const contact = {
  email: 'mehmood4129@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shironigun',
  github: 'https://github.com/shironigun',
  pluginRepo: 'https://github.com/shironigun/marketplace',
  resumeLight: '/resumes/Mahmood_Ahmad_Resume_Light.pdf',
  resumeDark: '/resumes/Mahmood_Ahmad_Resume_Dark.pdf',
};

export const nav = [
  { to: '/projects', label: 'Projects' },
  { to: '/case-studies', label: 'Case studies' },
  { to: '/journey', label: 'Journey' },
  { to: '/about', label: 'About' },
  { to: '/how-i-work', label: 'How I work' },
  { to: '/contact', label: 'Contact' },
];

export const hero = {
  headline: 'I shape AI products from idea to launch.',
  support:
    'I connect AI product definition, design direction, agent-led prototyping, evaluation and QA leadership, turning business problems into clear requirements and AI features that hold up after launch.',
  now: 'Leading AI feature definition, prototyping and evaluation, alongside the QA team.',
};

// Time since joining on 12 December 2023, worked out when the page loads: whole tenths of a
// year, rounded down, so the figure never overstates.
export const joined = new Date(2023, 11, 12);
export const tenureYears = Math.floor(((Date.now() - joined.getTime()) / (365.2425 * 86400000)) * 10) / 10;
export const tenure = `${tenureYears}+`;

export const highlights = [
  { value: tenure, label: 'years on an enterprise dealership CRM, from QA to product analysis', viz: 'years', to: '/journey' },
  { value: '120+', label: 'live domain training sessions delivered', viz: 'dots', to: '/case-studies/domain-knowledge-base' },
  { value: '3', label: 'teams adopted the Quality Gates framework I designed', viz: 'teams', to: '/case-studies/quality-gates' },
  { value: '1st', label: 'of 11 teams in a division-wide AI hackathon', viz: 'rank', to: '/case-studies/hackathon-2025' },
];

// The idea-to-launch journey, shown on Home and on the Promise Tracker page.
export const journey = [
  { stage: 'Discovery', artifact: 'Why do promises to customers slip in a busy inbox?' },
  { stage: 'Requirements', artifact: 'Stories with acceptance criteria and edge cases' },
  { stage: 'Design', artifact: 'Manager view reviewed against the component library' },
  { stage: 'Prototype', artifact: 'Working prototype built by directing AI agents' },
  { stage: 'Evaluation', artifact: 'Agreed quality criteria, set as the release bar' },
  { stage: 'Launch', artifact: 'Developer support and the launch film' },
];

export const recognition = [
  { title: 'VP Award', detail: 'Tied to multimillion-dollar business goals', icon: 'award' },
  { title: 'AI Innovator of the Month', detail: 'For a UI revamp delivered with AI agents', icon: 'spark' },
  { title: '1st of 11 teams, AI hackathon', detail: 'Product Owner, Scrum Master and QA lead', icon: 'trophy' },
  { title: 'Division All-Hands Recognition', detail: 'For quality and process improvement work', icon: 'megaphone' },
  { title: 'Annual Special Thanks', detail: 'Recognised for the second year running', icon: 'badge' },
];

// One title, six roles: each role with its area and one proof, for the Home page's role map.
export const roleMap = [
  { role: 'Business analyst', area: 'Product', icon: 'layers', proof: '70 user stories', to: '/how-i-work#requirements' },
  { role: 'Operator and strategist', area: 'Product', icon: 'trend', proof: '2026 roadmap structure', to: '/projects#product-decisions' },
  { role: 'Design collaborator', area: 'Design', icon: 'pen', proof: '7 product areas revamped', to: '/case-studies/design-phase' },
  { role: 'AI prototyper', area: 'AI', icon: 'chip', proof: '38 skills published', to: '/case-studies/ai-prototyping' },
  { role: 'QA lead', area: 'Quality', icon: 'shield', proof: '~40% less defect leakage', to: '/case-studies/quality-gates' },
  { role: 'Scrum master', area: 'Delivery', icon: 'users', proof: 'Certified ScrumMaster', to: '/how-i-work' },
];

// One title, six roles, grouped under four pillars.
export const pillars = [
  {
    name: 'Product',
    icon: 'layers',
    metric: '70',
    metricLabel: 'user stories this year',
    roles: ['Business analyst', 'Operator and strategist'],
    body: 'I run discovery, turn the product vision into a roadmap, epics and user stories, and work through product decisions with the Product Owner.',
    proof: '70 user stories and the 2026 roadmap structure this year.',
    link: { to: '/how-i-work#requirements', text: 'How I write requirements' },
  },
  {
    name: 'Design',
    icon: 'pen',
    metric: '7',
    metricLabel: 'product areas revamped',
    roles: ['Design collaborator'],
    body: 'I brief the designer on the business rules, review each design against the component library before development, and prototype ideas that people can click.',
    proof: 'Introduced a structured design phase into delivery; revamped seven product areas.',
    link: { to: '/case-studies/design-phase', text: 'Design phase and UI revamp' },
  },
  {
    name: 'AI',
    icon: 'chip',
    metric: '30',
    metricLabel: 'skills in a public marketplace',
    roles: ['AI prototyper'],
    body: 'I design AI features, write the AI skills behind them, and build working software by directing AI agents with Claude Code.',
    proof: 'AI prototypes such as Promise Tracker; a public Claude Code marketplace with 38 skills.',
    link: { to: '/case-studies/ai-prototyping', text: 'AI product prototyping' },
  },
  {
    name: 'Quality and delivery',
    icon: 'shield',
    metric: '~40%',
    metricLabel: 'less defect leakage, by my tracking',
    roles: ['QA lead', 'Scrum master'],
    body: 'I lead the QA team, run the sprint board and ceremonies, and set the quality bar features ship against.',
    proof: 'Quality Gates adopted by 3 teams: about 40% less defect leakage, zero critical defects across 6 sprints.',
    link: { to: '/case-studies/quality-gates', text: 'Quality Gates' },
  },
];

// Dated, verifiable milestones.
export const log2026 = [
  { date: 'Nov', text: 'Led an AI feature’s product definition from concept to pilot. Wrote a how-to standard and the first complete feature guide for dealers, revised with the support team.' },
  { date: 'Oct', text: 'Published a Claude Code marketplace on GitHub.' },
  { date: 'Aug', text: 'Organised and led the AI Foundations hackathon, opened it with “AI Foundations: From Doing to Directing”, and wrote a 183-page Claude handbook for the division.' },
  { date: 'Jul', text: 'Completed the DIS AI Foundations program and built the AI QA Workbench in the cohort.' },
  { date: 'Apr', text: 'Started a full UI and UX revamp of our dealership CRM through agentic coding.' },
  { date: 'Jan', text: 'Promoted to Product Quality Analyst.' },
];

export const teaching = [
  { title: 'AI Foundations: From Doing to Directing', detail: 'Opening session of the AI Foundations hackathon I organised.' },
  { title: 'AI Foundations hackathon', detail: 'Organised and led it for the QA and design team, with nine project briefs for ten participants.' },
  { title: 'Skills Evals Lab', detail: 'A 17-lesson beginner course I wrote on how to test AI skills.' },
  { title: 'Domain training', detail: '120+ live sessions across development, QA, operations and business analysis, and contributions to the public product knowledge base.' },
  { title: 'People', detail: 'Trained two QA hires to independent sprint work and onboarded new QA analysts.' },
];

export const tools = [
  { group: 'Product', items: ['Azure DevOps', 'Jira', 'Aha!', 'draw.io'] },
  { group: 'Design', items: ['Figma Make', 'Claude Design', 'Claude Motion'] },
  { group: 'AI and agentic development', items: ['Claude Code', 'Claude Skills and Plugins', 'Claude Artifacts', 'MCP servers'] },
  { group: 'Testing', items: ['Playwright', 'Selenium', 'Postman', 'TestRail', 'Burp Suite'] },
];
