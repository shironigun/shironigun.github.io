// Experience, education, certifications and testimonials.
// Testimonial text is quoted in full and verbatim from LinkedIn recommendations. Never edit or trim it.

import { roleHours } from './hours';

// Experience, newest first. `start`/`end` (YYYY-MM, end null for the current role) drive the
// durations and the career strip on About; `track` colours it (design, quality, product); `org`
// groups roles by employer; `promoted` marks a promotion into the role. `hours` is the working
// time in each title at Perseus Group, worked out live in hours.js.
export const experience = [
  {
    role: 'Product Quality Analyst',
    company: 'Perseus Group (Constellation Software)',
    period: 'Jan 2026 to present',
    start: '2026-01', end: null, track: 'product', org: 'Perseus Group, part of Constellation Software', promoted: true,
    hours: roleHours.current,
    summary: 'On our dealership SaaS products I do the team’s business analysis and shape the roadmap with the Product Owner, collaborate on design, run the sprint as Scrum Master, prototype AI features and lead the QA team.',
    highlights: [
      { label: 'AI product definition', text: 'Lead AI feature definition for customer-engagement SaaS for automotive, agricultural and equipment dealerships, in a 200+ person division. Led product definition for Promise Tracker, an AI feature that surfaces what a dealership still owes its customers, from concept to its pilot ahead of production. Promoted from Junior SQA Analyst in under two years.' },
      { label: 'AI-native product revamp', text: 'Led the rebuild of 7 product areas of our dealership CRM, directing Claude Code agents from specification to review against the component library and business rules.' },
      { label: 'Roadmap and product strategy', text: 'Shape the roadmap and AI feature decisions with the Product Owner and Initiative Manager in Aha! and Azure DevOps, backing priorities with quantitative analysis (regression, trend and break-even), SWOT and 5 Whys.' },
      { label: 'AI enablement', text: 'Organised the AI Foundations hackathon for 10 participants across QA and design, with 10 working demos; opened it with “AI Foundations: From Doing to Directing” and wrote a 183-page Claude handbook.' },
      { label: 'People leadership', text: 'Lead the QA team (since October 2026), coaching the team toward AI-assisted testing, AI evaluation and automation; completed six-month Manager Essentials Training.' },
      { label: 'Public AI tooling', text: 'Published a Claude Code marketplace of 7 plugins and 30 skills, with a person approving every write, and built the AI QA Workbench in the DIS AI Foundations cohort.' },
      { label: 'Delivery and insight', text: 'Own release readiness, introduced the API automation framework and onboarded 3 analysts.' },
    ],
  },
  {
    role: 'Junior SQA Analyst',
    company: 'Perseus Group (Constellation Software)',
    period: 'Feb 2024 to Dec 2025',
    start: '2024-02', end: '2025-12', track: 'quality', org: 'Perseus Group, part of Constellation Software', promoted: true,
    hours: roleHours.junior,
    summary: 'Owned QA for an enterprise dealership CRM and grew into business analysis and design.',
    highlights: [
      { label: 'Quality framework adopted by 3 teams', text: 'Designed the Strict Quality Gates framework, adopted by 3 other teams. By my own tracking: about 40% less defect leakage and zero critical defects across 6 consecutive sprints.' },
      { label: 'Domain enablement', text: `Ran a domain training programme of 120+ live sessions, contributed to the public product knowledge base through training and knowledge transfer, and trained 2 new hires to independent sprint work within their first quarter.` },
      { label: 'Design and tooling standards', text: 'Led the design phase for the dealership mobile app with the UX designer, and ran the Postman proof of concept, presented to the whole division, whose recommendation 5+ teams adopted as their standard API testing tool.' },
      { label: 'AI hackathon winner', text: '1st of 11 teams in a division-wide AI hackathon (2025) as Product Owner, Scrum Master and QA lead, building AI for customer retention and employee performance; delivered the final pitch.' },
    ],
  },
  {
    role: 'SQA Trainee',
    company: 'Perseus Group (Constellation Software)',
    period: 'Dec 2023 to Feb 2024',
    start: '2023-12', end: '2024-02', track: 'quality', org: 'Perseus Group, part of Constellation Software',
    hours: roleHours.trainee,
    summary: 'Learned the product, the domain and the sprint, and started improving them.',
    highlights: [
      { label: 'Standards from day one', text: 'Initiated and wrote shared UI standards, covering component consistency, interaction patterns and accessibility baselines, and improved it into a 12-page style guide in January 2024.' },
      { label: 'Domain immersion', text: `Worked alongside the Product Owner, Initiative Manager, development and operations, and ran acceptance, functional, API and cross-platform testing with workarounds that cut regression effort.` },
      { label: 'Automation guide', text: 'Published a 13-page Selenium WebDriver guide in C# for automation testers.' },
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
      { label: 'UX improvements', text: 'Improved navigation, layout hierarchy and UI consistency across the sites I delivered.' },
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
  { group: 'Product and analysis', items: ['Product management', 'Product strategy', 'Product discovery', 'Product roadmapping', 'Business analysis', 'Software requirements', 'Stakeholder management', 'Project management'] },
  { group: 'Design', items: ['Product design', 'User experience (UX)', 'User interface design', 'User interface prototyping'] },
  { group: 'AI product work', items: ['Artificial intelligence (AI)', 'Generative AI', 'AI agents', 'LLM evaluation', 'Prompt engineering', 'Rapid prototyping'] },
  { group: 'People leadership', items: ['Leadership', 'People development', 'Coaching', 'Mentoring', 'Delegation', 'Conflict resolution'] },
  { group: 'Quality', items: ['Product quality', 'Software quality assurance', 'Test planning', 'Test management', 'Test estimation', 'Test automation', 'API testing', 'Functional testing', 'Regression testing', 'User acceptance testing', 'Agile testing', 'Defect triage'] },
  { group: 'Ways of working', items: ['Scrum (CSM®)', 'Kanban', 'Agile methodologies', 'Sprint planning', 'Workshop facilitation'] },
];

export const education = {
  degree: 'B.S. Information Technology',
  school: 'University of the Punjab',
  period: '2019 to 2023',
};

export const certifications = [
  { title: 'Manager Essentials Training', issuer: 'Perseus Group', year: '2026', file: '/certifications/manager-essentials-certificate.jpg' },
  { title: 'Certificate of Appreciation, AI Foundations organiser', issuer: 'Perseus Group', year: '2026', file: '/certifications/ai-foundations-organiser-certificate.jpg' },
  { title: 'AI Foundations: From Developer to Orchestrator', issuer: 'Dealer Information Systems', year: '2026', file: '/certifications/dis-ai-foundations-certificate.jpg' },
  { title: 'Business Analysis Fundamentals', issuer: 'Microsoft', year: '2026', file: '/certifications/Business-Analysis-Fundamentals.pdf' },
  { title: 'Certified ScrumMaster® (CSM®)', issuer: 'Scrum Alliance', year: '2024', file: '/certifications/CSM.jpeg' },
  { title: 'Certified Tester Foundation Level', issuer: 'ISTQB®', year: '2024', file: '/certifications/ISTQB-Certificate.jpeg' },
  { title: 'Intermediate Python', issuer: 'DataCamp', year: '2025', file: '/certifications/Intermediate-Python.pdf' },
  { title: 'Introduction to Python', issuer: 'DataCamp', year: '2024', file: '/certifications/Introduction-to-Python.pdf' },
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
    role: 'R&D Director, Perseus Group, Constellation Software Inc.',
    photo: '/testimonial-profiles/Richard-Pineault.jpeg',
    relationship: 'Managed me directly',
  },
  {
    quote:
      "I had the pleasure of working with Mahmood, and if I were to give an example of someone who is dedicated, hardworking, smart, and highly attentive to detail, it would be him. He is an exceptional QA professional with a strong mindset and the ability to quickly learn whatever is required. He excels in his current role, consistently gives his best, and takes full ownership of his responsibilities. It's been a great experience working alongside him.",
    name: 'Adeen Bin Waheed',
    role: 'Senior Software Developer — Team Lead, Perseus Group',
    photo: '/testimonial-profiles/Adeen-Bin-Waheed.png',
    relationship: 'Worked on the same team',
  },
  {
    quote:
      "I've had the privilege of working with Mahmood, a highly skilled and detail-oriented QA professional. He approaches every task with precision and a deep commitment to quality, ensuring our application meets the highest standards before every release. Mahmood's keen eye for identifying edge cases and potential issues has consistently saved us from production bugs. He collaborates seamlessly with the development team, providing clear and constructive feedback. His dedication, proactive mindset, and passion for continuous improvement make him an invaluable asset to any team. I strongly recommend Mahmood for any role where quality and reliability are a priority.",
    name: 'Daud Riaz',
    role: 'Senior Software Developer — Team Lead, Perseus Group',
    photo: '/testimonial-profiles/Daud-Riaz.jpeg',
    relationship: 'Worked on the same team',
  },
];
