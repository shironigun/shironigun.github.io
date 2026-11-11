// Experience, education, certifications and testimonials.
// Testimonial text is quoted in full and verbatim from LinkedIn recommendations. Never edit or trim it.

import { hoursText, roleHours } from './hours';

// Experience, newest first. `start`/`end` (YYYY-MM, end null for the current role) drive the
// durations and the career strip on About; `track` colours it (design, quality, product); `org`
// groups roles by employer; `promoted` marks a promotion into the role. `hours` is the working
// time in each title at Perseus Group, worked out live in hours.js.
export const experience = [
  {
    role: 'Product Quality Analyst',
    company: 'Contour Software, Perseus Group (Constellation Software)',
    period: 'Jan 2026 to present',
    start: '2026-01', end: null, track: 'product', org: 'Perseus Group, part of Constellation Software', orgSub: 'Contour Software', promoted: true,
    hours: roleHours.current,
    summary: 'On our dealership SaaS products I work as the team’s business analyst and associate product owner, collaborate on design, run the sprint as Scrum Master, prototype AI features and lead the QA team.',
    highlights: [
      { label: 'AI product ownership', text: 'Lead AI feature definition for the most successful product in a 200+ person division: customer-engagement SaaS for automotive, agricultural and equipment dealerships. Took Promise Tracker, an AI feature that surfaces what a dealership still owes its customers, from concept to production readiness. Promoted from Junior SQA Analyst in under two years.' },
      { label: 'AI-native product revamp', text: 'Led the rebuild of 7 product areas of our dealership CRM, directing Claude Code agents from specification to review against the component library and business rules.' },
      { label: 'Roadmap and product strategy', text: 'Shape the roadmap and AI feature decisions with the Product Owner and Initiative Manager in Aha! and Azure DevOps, backing priorities with quantitative analysis (regression, trend and break-even), SWOT and 5 Whys.' },
      { label: 'AI enablement at scale', text: 'Organised the AI Foundations hackathon for 9 participants across QA and design, with 9 working demos; opened it with “AI Foundations: From Doing to Directing” and wrote a 183-page handbook on working with Claude.' },
      { label: 'Open-source AI tooling', text: 'Published an open-source Claude Code marketplace of 7 plugins and 30 skills, with a person approving every write, and created the AI QA Workbench in 4 days at the DIS AI Foundations program.' },
      { label: 'Delivery and insight', text: 'Own release readiness, introduced the API automation framework and onboarded 3 analysts; set up Power BI and Power Platform dashboards tracking release cadence, change failure rate and post-launch outcomes.' },
      { label: 'Recognition', text: 'Certificate of Appreciation for organising and delivering the AI Foundations initiative; Certificate of Completion, AI Foundations: From Developer to Orchestrator (Dealer Information Systems).' },
    ],
  },
  {
    role: 'Junior SQA Analyst',
    company: 'Contour Software, Perseus Group (Constellation Software)',
    period: 'Feb 2024 to Dec 2025',
    start: '2024-02', end: '2025-12', track: 'quality', org: 'Perseus Group, part of Constellation Software', orgSub: 'Contour Software', promoted: true,
    hours: roleHours.junior,
    summary: 'Owned QA for an enterprise dealership CRM and grew into business analysis and design.',
    highlights: [
      { label: 'Division-wide quality framework', text: 'Designed the Strict Quality Gates framework, adopted by 3 other teams: about 40% less defect leakage and zero critical defects across 6 consecutive sprints.' },
      { label: 'Delivery under pressure', text: 'Took over a million-dollar CRM mid-cycle when the senior QA left without notice and shipped the critical release on time; covered a 3-month BA vacancy, owning requirements with the Product Owner, with no gap in delivery.' },
      { label: 'Domain enablement', text: `Delivered ${hoursText.junior} hours of domain training, the most comprehensive programme in the division’s history, contributed to the public product knowledge base through training and knowledge transfer, and trained 2 non-technical hires to independent sprint work within their first quarter.` },
      { label: 'Design and tooling standards', text: 'Led the design phase for the dealership mobile app with the UX designer, and ran the Postman proof of concept that made Postman the standard API testing tool across 5+ teams.' },
      { label: 'AI hackathon winner', text: '1st of 11 teams in a division-wide AI hackathon (2025) as Product Owner, Scrum Master and QA lead, building AI for customer retention and employee performance; delivered the final pitch.' },
    ],
  },
  {
    role: 'SQA Trainee',
    company: 'Contour Software',
    period: 'Dec 2023 to Feb 2024',
    start: '2023-12', end: '2024-02', track: 'quality', org: 'Perseus Group, part of Constellation Software', orgSub: 'Contour Software',
    hours: roleHours.trainee,
    summary: 'Learned the product, the domain and the sprint, and started improving them.',
    highlights: [
      { label: 'Standards from day one', text: 'Initiated and wrote the organisation’s first global UI standards document, covering component consistency, interaction patterns and accessibility baselines.' },
      { label: 'Domain immersion', text: `Spent ${hoursText.trainee} hours with the Product Owner, Initiative Manager, development and operations, and ran acceptance, functional, API and cross-platform testing with workarounds that cut regression effort.` },
    ],
  },
  {
    role: 'WordPress Designer',
    company: 'Media Solutions',
    period: 'Sep 2022 to Mar 2023',
    start: '2022-09', end: '2023-03', track: 'design', org: 'Media Solutions',
    summary: 'Designed and built responsive client websites.',
    highlights: [
      { label: 'Client websites', text: 'Designed and built custom WordPress websites from client brand requirements, turning PSD designs into pixel-accurate, responsive Elementor builds.' },
      { label: 'UX improvements', text: 'Improved navigation, layout hierarchy and UI consistency across every site I delivered.' },
    ],
  },
  {
    role: 'UX Designer, intern',
    company: 'Arfa Software Technology Park',
    period: 'Oct 2021 to Dec 2021',
    start: '2021-10', end: '2021-12', track: 'design', org: 'Arfa Software Technology Park',
    summary: 'Interface design, prototypes and marketing materials.',
    highlights: [
      { label: 'Interface design', text: 'Refined the organisation’s web interface for clearer navigation and hierarchy, and sketched and prototyped UI concepts for stakeholder review before engineering started.' },
      { label: 'Brand materials', text: 'Designed e-brochures and client-facing materials to brand guidelines.' },
    ],
  },
];

export const product = {
  name: 'Enterprise dealership SaaS',
  description: 'Customer-engagement software for automotive, agricultural and equipment dealerships, part of the dealer software group at Constellation Software. It sits on top of each dealership-management system and covers SMS, email and Messenger across the whole buying journey, on web and mobile.',
  features: ['Automations and visibility', 'Broadcasts and customer groups', 'Messenger and customers', 'Surveys and reviews', 'Deals, payments and inventory', 'Analytics and the mobile app'],
};

export const skills = [
  { group: 'Product and analysis', items: ['Product discovery and definition', 'User stories and acceptance criteria', 'Stakeholder management (RACI/RASCI)', 'Process modelling', 'Roadmapping'] },
  { group: 'AI product work', items: ['AI feature design', 'AI skill writing and refinement', 'Evaluating AI output', 'Agentic workflows', 'Prototyping with AI'] },
  { group: 'Quality', items: ['Test strategy and planning', 'Functional, API and acceptance testing', 'Quality gates', 'Release readiness', 'Defect management'] },
  { group: 'Ways of working', items: ['Scrum (CSM®)', 'Kanban', 'Workshop facilitation', 'Root-cause analysis (5 Whys)', 'Risk and escalation management'] },
];

export const education = {
  degree: 'B.S. Information Technology',
  school: 'University of the Punjab',
  period: '2019 to 2023',
};

export const certifications = [
  { title: 'AI Foundations: From Developer to Orchestrator', issuer: 'Dealer Information Systems', year: '2026', file: '/certifications/dis-ai-foundations-certificate.jpg' },
  { title: 'Business Analysis Fundamentals', issuer: 'Microsoft', year: '2026', file: '/certifications/Business-Analysis-Fundamentals.pdf' },
  { title: 'Certified ScrumMaster® (CSM®)', issuer: 'Scrum Alliance', year: '2024', file: '/certifications/CSM.jpeg' },
  { title: 'Certified Tester Foundation Level', issuer: 'ISTQB®', year: '2024', file: '/certifications/ISTQB-Certificate.jpeg' },
  { title: 'Intermediate Python', issuer: 'DataCamp', year: '2025', file: '/certifications/Intermediate-Python.pdf' },
  { title: 'Introduction to Python', issuer: 'DataCamp', year: '2025', file: '/certifications/Introduction-to-Python.pdf' },
  { title: 'Introduction to SQL Server', issuer: 'DataCamp', year: '2024', file: '/certifications/Introduction-to-SQL-Server.pdf' },
  { title: 'Agile with Atlassian Jira', issuer: 'Atlassian', year: '2023', file: '/certifications/Agile-with-Atlassian-Jira.pdf' },
  { title: 'Foundations of Project Management', issuer: 'Google', year: '2023', file: '/certifications/Foundations-of-Project-Management.pdf' },
  { title: 'Version Control', issuer: 'Meta', year: '2022', file: '/certifications/Version-Control.pdf' },
  { title: 'Programming with JavaScript', issuer: 'Meta', year: '2022', file: '/certifications/Programming-with-Javascript.pdf' },
];

export const testimonials = [
  {
    quote:
      "Mahmood has displayed great commitment to TargetCRM since I have joined. When Sehar left our team, Mahmood stepped up to play a crucial role in our QA. He knows the application very well, and has ensured that our release quality is always High. What I really appreciate with Mahmood is that he is always thinking about the overall quality of the application. His focus goes beyond the items he is working on. He has recommended UI changes to make the application more usable and consistent, he has recommended performance updates ensure a Dealers have a great experience and as also pointed out areas where the application logic was not doing what a dealer would expect. I want to thank him for going above and beyond his role to ensure that the TargetCRM product is as good as possible. I'm happy to have him on my team, and am looking forward to see him grow in experience and leadership.",
    name: 'Richard Pineault',
    role: 'R&D Manager, Perseus Group, Constellation Software Inc.',
    photo: '/testimonial-profiles/Richard-Pineault.jpeg',
    relationship: 'Managed me directly',
  },
  {
    quote:
      "I had the pleasure of working with Mahmood, and if I were to give an example of someone who is dedicated, hardworking, smart, and highly attentive to detail, it would be him. He is an exceptional QA professional with a strong mindset and the ability to quickly learn whatever is required. He excels in his current role, consistently gives his best, and takes full ownership of his responsibilities. It's been a great experience working alongside him.",
    name: 'Adeen Bin Waheed',
    role: 'Senior Software Developer — Team Lead, Contour Software',
    photo: '/testimonial-profiles/Adeen-Bin-Waheed.png',
    relationship: 'Worked on the same team',
  },
  {
    quote:
      "I've had the privilege of working with Mahmood, a highly skilled and detail-oriented QA professional. He approaches every task with precision and a deep commitment to quality, ensuring our application meets the highest standards before every release. Mahmood's keen eye for identifying edge cases and potential issues has consistently saved us from production bugs. He collaborates seamlessly with the development team, providing clear and constructive feedback. His dedication, proactive mindset, and passion for continuous improvement make him an invaluable asset to any team. I strongly recommend Mahmood for any role where quality and reliability are a priority.",
    name: 'Daud Riaz',
    role: 'Senior Software Developer — Team Lead, Contour Software',
    photo: '/testimonial-profiles/Daud-Riaz.jpeg',
    relationship: 'Worked on the same team',
  },
];
