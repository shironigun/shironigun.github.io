// Identity, navigation and homepage copy. Single source of truth.
// Rules: no invented numbers; ownership words are exact (led / built / assisted);
// no internal URLs, partner names, ticket numbers, dealer data, pricing or security findings.
import { hoursText } from './hours';

export const person = {
  name: 'Mahmood Ahmad',
  title: 'AI Product Analyst',
  officialTitle: 'Product Quality Analyst',
  company: 'Perseus Group, Constellation Software',
  product: 'Enterprise dealership SaaS',
  available: true,
  availability: 'Open to Product Owner, Product Analyst and AI Product Manager roles.',
};

export const contact = {
  email: 'mehmood4129@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shironigun',
  whatsapp: 'https://wa.me/923147369673',
  github: 'https://github.com/shironigun',
  pluginRepo: 'https://github.com/shironigun/claude-marketplace',
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
    'AI Product Analyst at Perseus Group, Constellation Software. I lead enterprise dealership SaaS work across discovery, requirements, design direction, AI prototyping, delivery and quality.',
  now: 'Leading AI feature definition and prototyping for dealership SaaS, alongside the QA function.',
};

// Time since joining on 14 December 2023, worked out when the page loads: whole tenths of a
// year, rounded down, so the figure never overstates.
export const joined = new Date(2023, 11, 14);
export const tenureYears = Math.floor(((Date.now() - joined.getTime()) / (365.2425 * 86400000)) * 10) / 10;
export const tenure = `${tenureYears}+`;

export const highlights = [
  { value: tenure, label: 'years in enterprise dealership SaaS, from QA to product analysis' },
  { value: hoursText.total, label: 'hours of domain training and contribution' },
  { value: '3', label: 'teams adopted my Quality Gates framework' },
  { value: '1st', label: 'of 11 teams in a division-wide AI hackathon' },
];

// The idea-to-launch journey, shown on Home and on the Promise Tracker page.
export const journey = [
  { stage: 'Discovery', artifact: 'Why do promises to customers slip in a busy inbox?' },
  { stage: 'Requirements', artifact: 'Stories with acceptance criteria and edge cases' },
  { stage: 'Design', artifact: 'Manager view reviewed against the component library' },
  { stage: 'Prototype', artifact: 'Working prototype built by directing AI agents' },
  { stage: 'Evaluation', artifact: 'Agreed quality criteria, met before every release' },
  { stage: 'Launch', artifact: 'Developer support and the launch film' },
];

export const recognition = [
  { title: 'VP Award', detail: 'Contributions tied to multimillion-dollar business goals', icon: 'award' },
  { title: 'AI Innovator of the Month', icon: 'spark' },
  { title: '1st of 11 teams, AI hackathon', detail: 'As Product Owner, Scrum Master and QA lead', icon: 'trophy' },
  { title: 'Division All-Hands Recognition', icon: 'megaphone' },
  { title: 'Annual Special Thanks', icon: 'heart' },
];

// One title, six roles, grouped under four pillars.
export const pillars = [
  {
    name: 'Product',
    icon: 'layers',
    roles: ['Business analyst', 'Operator and strategist'],
    body: 'I run discovery, turn the product vision into a roadmap, epics and user stories, and work through product decisions with the Product Owner.',
    proof: '70 user stories and the 2026 roadmap structure this year; covered a three-month BA vacancy with no gap in delivery.',
    link: { to: '/how-i-work#requirements', text: 'How I write requirements' },
  },
  {
    name: 'Design',
    icon: 'pen',
    roles: ['Design collaborator'],
    body: 'I brief the designer on the business rules, review every design against the component library before development, and prototype ideas that people can click.',
    proof: 'Introduced a structured design phase into delivery; revamped seven product areas.',
    link: { to: '/case-studies/design-phase', text: 'Design phase and UI revamp' },
  },
  {
    name: 'AI',
    icon: 'chip',
    roles: ['AI prototyper'],
    body: 'I design AI features, write the AI skills behind them, and build working software by directing AI agents with Claude Code.',
    proof: 'AI prototypes such as Promise Tracker; an open-source Claude Code marketplace with 30 skills.',
    link: { to: '/case-studies/ai-prototyping', text: 'AI product prototyping' },
  },
  {
    name: 'Quality and delivery',
    icon: 'shield',
    roles: ['QA lead', 'Scrum master'],
    body: 'I lead the QA team, run the sprint board and ceremonies, and set the quality bar every feature ships with.',
    proof: 'Quality Gates adopted by 3 teams: about 40% less defect leakage, zero critical defects across 6 sprints.',
    link: { to: '/case-studies/quality-gates', text: 'Quality Gates' },
  },
];

// Dated, verifiable milestones.
export const log2026 = [
  { date: 'Nov', text: 'Led an AI feature from concept to production readiness.' },
  { date: 'Oct', text: 'Published the QA Engineering Plugin marketplace as open source.' },
  { date: 'Aug', text: 'Organised and led the AI Foundations hackathon, opened it with “AI Foundations: From Doing to Directing”, and wrote a 183-page Claude handbook for the division.' },
  { date: 'Jul', text: 'Completed the DIS AI Foundations program and built the AI QA Workbench in four days.' },
  { date: 'Apr', text: 'Started a full UI and UX revamp of our dealership CRM through agentic coding.' },
  { date: 'Jan', text: 'Promoted to Product Quality Analyst.' },
];

export const teaching = [
  { title: 'AI Foundations: From Doing to Directing', detail: 'Opening session of the AI Foundations hackathon I organised.' },
  { title: 'AI Foundations hackathon', detail: 'Organised and led it for the QA and design team, with a project brief for every participant.' },
  { title: 'Skills Evals Lab', detail: 'A 14-module interactive course I wrote on how to test AI skills.' },
  { title: 'Domain training', detail: `${hoursText.total} hours across development, QA, operations and business analysis, with knowledge transfer into the public product knowledge base.` },
  { title: 'People', detail: 'Trained two QA hires from non-IT backgrounds and onboarded three new QA analysts.' },
];

export const tools = [
  { group: 'Product', items: ['Azure DevOps', 'Jira', 'Aha!', 'draw.io'] },
  { group: 'Design', items: ['Figma Make', 'Claude Design', 'Claude Motion'] },
  { group: 'AI and agentic development', items: ['Claude Code', 'Claude Skills and Plugins', 'Claude Artifacts', 'MCP servers'] },
  { group: 'Testing', items: ['Playwright', 'Selenium', 'Postman', 'TestRail', 'Burp Suite'] },
];
