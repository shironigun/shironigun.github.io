// Career journey: every dated step since the first UI/UX role. Feeds the Journey page and the
// highlights timeline on Home (entries marked highlight: true).
//
// To add an entry, copy one below; the list is sorted by date when it loads. Fields:
//   date       'YYYY' or 'YYYY-MM', used for ordering and grouping by year
//   when       how the date reads on the page, e.g. 'Jun 2026' or '2024 to 2025'
//   type       one of the keys in nodeTypes
//   title      short and specific
//   org        optional: company, issuer or event
//   detail     one or two sentences on the value delivered
//   from       promotions only: the previous title
//   metric     optional: { value: '3', label: 'teams adopted it' }
//   to         optional: link to a case study, e.g. '/case-studies/quality-gates'
//   file       optional: certificate or document file (fileLabel names the link)
//   photo      optional: a photo under /images, shown on the card
//   highlight  optional: also show on the Home timeline
// The information still needed is listed in docs/content/journey-inputs.md.
import { hoursText } from './hours';

export const nodeTypes = {
  role: { label: 'Role', icon: 'briefcase', group: 'roles' },
  promotion: { label: 'Promotion', icon: 'trend', group: 'roles' },
  project: { label: 'Project', icon: 'layers', group: 'work' },
  initiative: { label: 'Initiative', icon: 'spark', group: 'work' },
  achievement: { label: 'Achievement', icon: 'trophy', group: 'achievements' },
  certification: { label: 'Certification', icon: 'badge', group: 'learning' },
  exam: { label: 'Exam passed', icon: 'badge', group: 'learning' },
  education: { label: 'Education', icon: 'book', group: 'learning' },
  workshop: { label: 'Workshop', icon: 'users', group: 'workshops' },
  talk: { label: 'Talk', icon: 'mic', group: 'talks' },
  event: { label: 'Event organised', icon: 'calendar', group: 'events' },
  participated: { label: 'Event attended', icon: 'calendar', group: 'events' },
  course: { label: 'Course authored', icon: 'book', group: 'courses' },
};

export const nodeGroups = [
  { id: 'roles', label: 'Roles' },
  { id: 'work', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'learning', label: 'Certifications' },
  { id: 'talks', label: 'Talks' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'courses', label: 'Courses' },
  { id: 'events', label: 'Events' },
];

export const journey = [
  { date: '2021-10', when: 'Oct 2021', type: 'role', title: 'UX Designer, intern', org: 'Arfa Software Technology Park', detail: 'Interface concepts, prototypes and client materials, reviewed with stakeholders before engineering began.', highlight: true },
  { date: '2022-09', when: 'Sep 2022', type: 'certification', title: 'Programming with JavaScript', org: 'Meta', file: '/certifications/Programming-with-Javascript.pdf' },
  { date: '2022-10', when: 'Oct 2022', type: 'certification', title: 'Version Control', org: 'Meta', file: '/certifications/Version-Control.pdf' },
  { date: '2022-09', when: 'Sep 2022', type: 'role', title: 'WordPress Designer', org: 'Media Solutions', detail: 'Designed and delivered responsive client websites from brand requirements.', highlight: true },
  { date: '2023-04', when: 'Apr 2023', type: 'certification', title: 'Foundations of Project Management', org: 'Google', file: '/certifications/Foundations-of-Project-Management.pdf' },
  { date: '2023-08', when: 'Aug 2023', type: 'certification', title: 'Agile with Atlassian Jira', org: 'Atlassian', file: '/certifications/Agile-with-Atlassian-Jira.pdf' },
  { date: '2023-06', when: '2023', type: 'education', title: 'B.S. Information Technology', org: 'University of the Punjab', detail: 'Completed the degree, 2019 to 2023.' },
  { date: '2023-12', when: 'Dec 2023', type: 'role', title: 'SQA Trainee', org: 'Contour Software, Perseus Group', detail: 'Joined enterprise dealership SaaS at Constellation Software.', highlight: true },
  { date: '2023-12', when: 'Dec 2023', type: 'initiative', title: 'First organisation-wide UI standards', detail: 'Audited the product UI and authored the shared standard for components, interaction patterns and accessibility.', metric: { value: '200+', label: 'inconsistencies identified' } },
  { date: '2024-02', when: 'Feb 2024', type: 'promotion', from: 'SQA Trainee', title: 'Junior SQA Analyst', org: 'Contour Software, Perseus Group', detail: 'Took ownership of quality for an enterprise dealership CRM.', highlight: true },
  { date: '2024-07', when: 'Jul 2024', type: 'certification', title: 'Certified Tester Foundation Level', org: 'ISTQB®', file: '/certifications/ISTQB-Certificate.jpeg' },
  { date: '2024-12', when: 'Dec 2024', type: 'certification', title: 'Certified ScrumMaster® (CSM®)', org: 'Scrum Alliance', detail: 'Certified at 24.', file: '/certifications/CSM.jpeg', highlight: true },
  { date: '2024-08', when: 'Aug 2024', type: 'certification', title: 'Introduction to SQL Server', org: 'DataCamp', file: '/certifications/Introduction-to-SQL-Server.pdf' },
  { date: '2024-06', when: '2024', type: 'initiative', title: 'Introduced a design phase into delivery', detail: 'Led the design phase for the mobile app with the UX designer, so business rules were settled before development.', to: '/case-studies/design-phase', highlight: true },
  { date: '2024-07', when: '2024 to 2025', type: 'initiative', title: 'Domain training programme', detail: 'A self-initiated programme for development, QA, operations and business analysts, the most comprehensive in the division’s history: 120+ live sessions, weekly Q&A office hours, and knowledge transfer that fed the public product knowledge base.', metric: { value: hoursText.junior, label: 'hours of training' }, to: '/case-studies/domain-knowledge-base', highlight: true },
  { date: '2024-08', when: '2024 to 2025', type: 'workshop', title: 'Quality Gates sessions', detail: 'Four facilitated sessions that introduced the framework to the team.', to: '/case-studies/quality-gates' },
  { date: '2025-01', when: 'Q1 2025', type: 'project', title: 'Postman API testing evaluation', detail: 'A proof of concept that standardised API testing across teams.', metric: { value: '5+', label: 'teams adopted it' }, file: '/documents/postman-api-testing-evaluation.pdf', fileLabel: 'Read the evaluation', to: '/case-studies/postman-evaluation' },
  { date: '2025-04', when: '2025', type: 'talk', title: 'Postman proof-of-concept presentation', detail: 'Presented a 35-slide evaluation to the QA and engineering teams: the capabilities, plan limits, strengths and limitations, and a recommendation adopted by 5+ teams.', file: '/documents/postman-poc-presentation.pdf', fileLabel: 'Present the slides', to: '/case-studies/postman-evaluation' },
  { date: '2025-02', when: '2024 to 2025', type: 'achievement', title: 'Shipped a critical release solo', detail: 'Took over QA mid-cycle without a handover and delivered the release on time.' },
  { date: '2025-03', when: '2024 to 2025', type: 'achievement', title: 'Covered a three-month BA vacancy', detail: 'Owned user stories and acceptance criteria with the Product Owner, with no gap in delivery.' },
  { date: '2025-03', when: 'Mar 2025', type: 'certification', title: 'Introduction to Python', org: 'DataCamp', file: '/certifications/Introduction-to-Python.pdf' },
  { date: '2025-04', when: 'Apr 2025', type: 'certification', title: 'Intermediate Python', org: 'DataCamp', file: '/certifications/Intermediate-Python.pdf' },
  { date: '2025-06', when: '2025', type: 'achievement', title: 'Quality Gates adopted by three teams', detail: 'A framework built on root-cause analysis: zero critical defects across six sprints.', metric: { value: '~40%', label: 'less defect leakage' }, to: '/case-studies/quality-gates', highlight: true },
  { date: '2025-07', when: '2024 to 2025', type: 'achievement', title: 'Built QA talent from the ground up', detail: 'Trained two QA hires from non-technical backgrounds to independent sprint work.' },
  { date: '2025-05', when: 'May 2025', type: 'achievement', photo: '/images/events/hackathon-first-prize.jpg', photoAlt: 'The winning team holding the First Prize card. Mahmood is second from the left.', title: '1st of 11 teams, division-wide AI hackathon', detail: 'AI solutions for customer retention and employee performance monitoring. Led the winning team as Product Owner, Scrum Master and QA lead, and delivered the final presentation.', metric: { value: '1st', label: 'of 11 teams' }, to: '/case-studies/hackathon-2025', highlight: true },
  { date: '2026-01', when: 'Jan 2026', type: 'promotion', from: 'Junior SQA Analyst', title: 'Product Quality Analyst', org: 'Contour Software, Perseus Group', detail: 'A product role spanning business analysis, design collaboration, AI prototyping, Scrum and QA leadership.', highlight: true },
  { date: '2026-02', when: 'Feb 2026', type: 'certification', title: 'Business Analysis Fundamentals', org: 'Microsoft', file: '/certifications/Business-Analysis-Fundamentals.pdf' },
  { date: '2026-03', when: '2026', type: 'achievement', title: 'Onboarded three new analysts', detail: 'Ran the QA hiring evaluation and brought three analysts up to speed.' },
  { date: '2026-04', when: 'Apr 2026', type: 'project', title: 'Full UI and UX revamp', detail: 'Seven product areas redesigned and rebuilt through agentic coding, each reviewed against the component library.', to: '/case-studies/design-phase', highlight: true },
  { date: '2026-07', when: 'Jul 2026', type: 'project', title: 'AI product prototyping', detail: 'Working prototypes that let the team evaluate AI ideas before committing to build.', to: '/case-studies/ai-prototyping' },
  { date: '2026-08', when: 'Aug 2026', type: 'event', title: 'Organised the AI Foundations hackathon', detail: 'Briefed nine real-world AI projects for the QA and design team, taught the foundations and mentored every team to a working demonstration.', to: '/case-studies/ai-foundations-hackathon', file: '/certifications/ai-foundations-organiser-certificate.jpg', highlight: true },
  { date: '2026-07', when: 'Jul 2026', type: 'participated', title: 'DIS AI Foundations program', detail: 'Completed a five-day, cross-division AI hackathon, taking the AI QA Workbench I had started a month earlier and extending it.', to: '/case-studies/ai-qa-workbench', file: '/certifications/dis-ai-foundations-certificate.jpg', highlight: true },
  { date: '2026-07', when: '2026', type: 'workshop', title: 'AI automation workshops', detail: 'Taught a mostly manual QA team how to automate testing with AI, using our own framework as the worked example.' },
  { date: '2026-08', when: 'Aug 2026', type: 'talk', title: 'AI Foundations: From Doing to Directing', detail: 'Opening session of the AI Foundations hackathon: Claude Projects, Skills, MCP servers, connectors, agents and workflows, with activities for each role and a live example on Azure DevOps MCP servers.', to: '/case-studies/ai-foundations-hackathon' },
  { date: '2026-08', when: 'Aug 2026', type: 'course', title: 'Working with Claude: The Eleven Building Blocks', detail: 'A 183-page practical handbook for continued learning across the division.', file: '/documents/working-with-claude-eleven-building-blocks.pdf', fileLabel: 'Read the handbook' },
  { date: '2026-10', when: 'Oct 2026', type: 'course', title: 'Skills Evals Lab', detail: 'A 14-module interactive course on how to test AI skills, from what makes a good skill to graders and live labs: 16 lessons, about two and three-quarter hours.', to: '/case-studies/ai-evaluation' },
  { date: '2026-09', when: '2026', type: 'course', title: 'Playwright automation course', detail: 'A self-paced course inside the QA plugin that remembers where each learner stopped.' },
  { date: '2026-10', when: 'Oct 2026', type: 'project', title: 'Published my Claude Code marketplace', detail: 'Plugins built one at a time, brought together in one public repo; every one asks before it writes.', metric: { value: '30', label: 'skills across 7 plugins' }, to: '/case-studies/claude-marketplace', highlight: true },
  { date: '2026-11', when: 'Nov 2026', type: 'project', title: 'AI feature in pilot', detail: 'Led its product definition, from discovery and requirements to design, evaluation and launch readiness.', to: '/case-studies/promise-tracker', highlight: true },
];

// Keep the entries in date order, however they were added (a stable sort keeps same-date order).
journey.sort((a, b) => a.date.localeCompare(b.date));

// Career chapters for the Home timeline panel.
export const chapters = [
  { until: '2023-11', years: '2021 to 2023', role: 'UX and web design', place: 'Arfa Software Technology Park, Media Solutions' },
  { until: '2025-12', years: '2023 to 2025', role: 'Software quality', place: 'Contour Software, Perseus Group' },
  { until: '9999', years: '2026 to now', role: 'AI product analysis', place: 'Perseus Group, Constellation Software' },
];

export const chapterOf = (date) => chapters.findIndex((c) => date <= c.until);
