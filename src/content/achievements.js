// Achievements, and the hackathons, talks, workshops and sessions Mahmood won, organised or delivered.
// Used on Home and in the footer; every item is also on the Journey timeline (dated) or in the
// Journey recognition section (undated), and project results are on the Projects board.
// Sources: his original portfolio, his LinkedIn profile and confirmed 2026 work. Nothing here is inferred.
import { hoursText } from './hours';

// The training programme ran in the Junior SQA title, so it carries that title's hours. Home
// picks this achievement by its title, so the title is exported.
export const domainLeadership = `${hoursText.junior} hours of domain leadership`;

export const achievements = [
  { icon: 'trophy', title: '1st place, division-wide AI hackathon', detail: 'Product Owner, Scrum Master and QA lead: I led the requirements, the UI prototypes and the final pitch. We placed 1st of 11 teams.', year: '2025', to: '/case-studies/hackathon-2025' },
  { icon: 'award', title: 'VP Award', detail: 'For contributions tied to multimillion-dollar business goals across a 200+ person division.' },
  { icon: 'shield', title: 'Quality framework adopted by 3 teams', detail: 'The Strict Quality Gates framework I designed: about 40% less defect leakage and zero critical defects across 6 sprints.', year: '2025', to: '/case-studies/quality-gates' },
  { icon: 'book', title: domainLeadership, detail: 'A self-initiated training programme, the most comprehensive in the division’s history, with knowledge transfer that fed the public knowledge base.', year: '2024–2025', to: '/case-studies/domain-knowledge-base' },
  { icon: 'pen', title: 'Introduced the design phase', detail: 'A structured design step in delivery, now part of how the team works.', to: '/case-studies/design-phase' },
  { icon: 'rocket', title: 'Shipped a release solo', detail: 'Took over QA of a critical release mid-cycle, without a handover, and shipped it on time with no drop in quality.' },
  { icon: 'briefcase', title: 'Covered a 3-month BA vacancy', detail: 'Wrote the user stories and acceptance criteria with the Product Owner, with no gap in delivery.' },
  { icon: 'trend', title: 'Promoted to Product Quality Analyst', detail: 'From Junior SQA Analyst in under two years, into a product-analyst role.', year: '2026' },
  { icon: 'users', title: 'Built QA talent from the ground up', detail: 'Trained two QA hires from non-IT backgrounds to independent sprint work, and onboarded three new analysts in 2026.' },
  { icon: 'spark', title: 'AI Innovator of the Month' },
  { icon: 'plug', title: 'Published a Claude Code marketplace', detail: '7 plugins and 30 skills, each built for one real job.', year: '2026', to: '/case-studies/claude-marketplace' },
  { icon: 'calendar', title: 'Organised the AI Foundations hackathon', detail: 'Briefed, taught and mentored the QA and design team to working demonstrations, and was recognised with a certificate of appreciation.', year: '2026', to: '/case-studies/ai-foundations-hackathon' },
  { icon: 'badge', title: 'Completed the DIS AI Foundations program', detail: 'Took the AI QA Workbench I had started a month earlier to a five-day, cross-division AI hackathon and extended it there.', year: '2026', to: '/case-studies/ai-qa-workbench' },
  { icon: 'badge', title: 'Certified ScrumMaster® at 24', detail: 'Alongside ISTQB® CTFL and Microsoft Business Analysis Fundamentals.', year: '2024' },
];

// Grouped by what Mahmood did at each event. `date` (YYYY-MM) orders them; where only the year is
// known it is an approximate position, matching the Journey page.
export const events = [
  {
    group: 'Won',
    label: 'Award',
    icon: 'trophy',
    items: [
      { title: 'Division-wide AI hackathon, 1st of 11 teams', when: '2025', date: '2025-05', photo: '/images/events/hackathon-first-prize.jpg', photoAlt: 'The winning team holding the First Prize card. Mahmood is second from the left.', detail: 'AI solutions for customer retention and employee performance monitoring. I was Product Owner, Scrum Master and QA lead, and delivered the final presentation.', to: '/case-studies/hackathon-2025' },
    ],
  },
  {
    group: 'Organised',
    label: 'Organised',
    icon: 'calendar',
    items: [
      { title: 'AI Foundations hackathon', when: 'Aug 2026', date: '2026-08', detail: 'Organised and led an AI hackathon for the QA and design team: foundations sessions, a real-world project brief for each of the nine participants, and mentoring through to working demonstrations.', to: '/case-studies/ai-foundations-hackathon', links: [{ text: 'View certificate', href: '/certifications/ai-foundations-organiser-certificate.jpg' }] },
    ],
  },
  {
    group: 'Participated',
    label: 'Participated',
    icon: 'badge',
    items: [
      { title: 'DIS AI Foundations program: From Developer to Orchestrator', when: 'Jul 2026', date: '2026-07', detail: 'A five-day AI hackathon run jointly by our division and other Perseus Group divisions: a day of sessions, then four days to frame a problem, design a solution and build a working prototype. I brought the AI QA Workbench, started a month earlier, and extended it.', to: '/case-studies/ai-qa-workbench', links: [{ text: 'View certificate', href: '/certifications/dis-ai-foundations-certificate.jpg' }] },
    ],
  },
  {
    group: 'Talks',
    label: 'Talk',
    icon: 'mic',
    items: [
      { title: 'Postman API testing: proof of concept', when: '2025', date: '2025-04', detail: 'Presented a 35-slide evaluation of Postman to the QA and engineering teams: the capabilities, plan limits, strengths and limitations, and a recommendation adopted by 5+ teams.', to: '/case-studies/postman-evaluation', links: [{ text: 'Present the slides', href: '/documents/postman-poc-presentation.pdf' }, { text: 'Read the evaluation', href: '/documents/postman-api-testing-evaluation.pdf' }] },
      { title: 'AI Foundations: From Doing to Directing', when: 'Aug 2026', date: '2026-08', detail: 'Opening session of the AI Foundations hackathon: Claude Projects, Skills, MCP servers, connectors, agents and workflows, with activities for each role and a live example on Azure DevOps MCP servers.', to: '/case-studies/ai-foundations-hackathon' },
    ],
  },
  {
    group: 'Workshops and sessions',
    label: 'Workshop',
    icon: 'users',
    items: [
      { title: 'Domain training programme', when: '2024–2025', date: '2024-07', detail: `120+ live sessions and ${hoursText.junior} hours of training for development, QA, operations and business analysts, with weekly Q&A office hours.`, to: '/case-studies/domain-knowledge-base' },
      { title: 'Quality Gates sessions', when: '2024–2025', date: '2024-08', detail: 'Four facilitated sessions that introduced the framework to the team.', to: '/case-studies/quality-gates' },
      { title: 'AI workshop on Claude skills', when: 'Oct 2026', date: '2026-10', detail: 'A hands-on workshop with our division’s R&D director, who presented skills for reverse-engineering the context of our products. I led the QA and product part: I presented my QA Engineering plugin, and every QA in the room, most of them manual testers, tried it on their own day-to-day work.', to: '/case-studies/qa-plugin' },
    ],
  },
  {
    group: 'Courses I wrote',
    label: 'Course',
    icon: 'book',
    items: [
      { title: 'Working with Claude: The Eleven Building Blocks', when: 'Aug 2026', date: '2026-08', detail: 'A 183-page practical handbook I created for continued learning across the division, from Projects and Skills to MCP servers, agents and workflows.', links: [{ text: 'Read the handbook', href: '/documents/working-with-claude-eleven-building-blocks.pdf' }] },
      { title: 'Skills Evals Lab', when: 'Oct 2026', date: '2026-10', detail: 'A 14-module interactive course on how to test AI skills, from what makes a good skill to graders and live labs.', to: '/case-studies/ai-evaluation' },
      { title: 'Playwright course in the QA plugin', when: '2026', date: '2026-09', detail: 'A self-paced automation course that remembers where each learner stopped.', to: '/case-studies/qa-plugin' },
    ],
  },
];

// Talks, workshops, events and awards, newest first. Courses are on the Journey page.
export const recentEvents = events
  .filter((g) => g.group !== 'Courses I wrote')
  .flatMap((g) => g.items.map((e) => ({ ...e, label: g.label, icon: g.icon })))
  .sort((a, b) => b.date.localeCompare(a.date));
