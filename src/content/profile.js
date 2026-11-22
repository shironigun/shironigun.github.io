// Experience, education, certifications and testimonials.
// Testimonial text is quoted in full and verbatim from LinkedIn recommendations. Never edit or trim it.

import { roleHours } from './hours';

// Experience, newest first. `start`/`end` (YYYY-MM, end null for the current role) drive the
// durations and the career strip on About; `track` colours it (design, quality, product); `org`
// groups roles by employer; `promoted` marks a promotion into the role. `hours` is the working
// time in each title at Perseus Group, worked out live in hours.js. `bullets` are the role's results,
// shared by the About page, the resume and his LinkedIn experience: one or two lines each, past tense, each
// opening with a different word from his action words list (resume/build.mjs checks for repeats).
export const experience = [
  {
    role: 'Product Quality Analyst',
    company: 'Perseus Group (Constellation Software)',
    period: 'Jan 2026 to present',
    start: '2026-01', end: null, track: 'product', org: 'Perseus Group, part of Constellation Software', promoted: true,
    hours: roleHours.current,
    summary: 'On our enterprise dealership CRM I do the team’s business analysis and shape the roadmap with the Product Owner, collaborate on design, run the sprint as Scrum Master, prototype AI features and lead the QA team.',
    bullets: [
    'Headed product definition for Promise Tracker, an AI feature that surfaces outstanding dealership commitments to customers, from discovery to pilot.',
    'Defined AI feature requirements in 70 user stories with acceptance criteria.',
    'Redesigned 7 CRM product areas by directing AI coding agents, reviewing each against the component library and business rules.',
    'Influenced roadmap priorities with the Product Owner and Initiative Manager through trend analysis, break-even analysis and AI cost modelling.',
    'Formulated a repeatable AI evaluation method using rule-based tests, written grading criteria and 3 runs per case to check consistency.',
    'Oversaw the QA team from Oct 2026, coaching analysts in AI-assisted testing, LLM evaluation and test automation.',
    'Organised the AI Foundations hackathon, writing 9 real-world project briefs and mentoring all 10 participants to working demos.',
    'Prepared a 183-page Claude handbook to support AI knowledge-sharing across the division.',
    'Managed release readiness and introduced API test automation built by AI agents, auditing it for false positives.',
    'Evaluated QA candidates and onboarded 3 analysts, gaining promotion from Junior SQA Analyst in under two years.',
    ],
  },
  {
    role: 'Junior SQA Analyst',
    company: 'Perseus Group (Constellation Software)',
    period: 'Feb 2024 to Dec 2025',
    start: '2024-02', end: '2025-12', track: 'quality', org: 'Perseus Group, part of Constellation Software', promoted: true,
    hours: roleHours.junior,
    summary: 'Owned QA for an enterprise dealership CRM and grew into business analysis and design.',
    bullets: [
    'Identified gaps in acceptance criteria behind 68% of escaped defects and designed the Quality Gates framework to close them.',
    'Secured adoption of the Quality Gates framework by 3 other teams through 4 facilitated sessions.',
    'Quantified about 40% lower defect leakage and zero critical defects across 6 consecutive sprints after adoption.',
    'Launched a domain training programme of 120+ live sessions for development, QA, operations and business analysts.',
    'Trained 2 new hires to handle sprint work independently within their first quarter, using 60+ SOPs and guides written for the programme.',
    'Originated a pre-development design phase, aligning business rules with the UX designer before mobile app development.',
    'Standardised API testing across 5+ teams by presenting a Postman proof of concept to the division.',
    'Ranked first of 11 teams in a division-wide AI hackathon as Product Owner, Scrum Master and QA lead, delivering the final pitch.',
    ],
  },
  {
    role: 'SQA Trainee',
    company: 'Perseus Group (Constellation Software)',
    period: 'Dec 2023 to Feb 2024',
    start: '2023-12', end: '2024-02', track: 'quality', org: 'Perseus Group, part of Constellation Software',
    hours: roleHours.trainee,
    summary: 'Learned the product, the domain and the sprint, and started improving them.',
    bullets: [
    'Developed shared UI standards for components, interaction patterns and accessibility, then expanded them into a 12-page style guide.',
    'Tested acceptance, functional, API and cross-platform flows, finding workarounds that reduced regression effort.',
    'Wrote a 13-page Selenium WebDriver guide in C# to share automation practice with other testers.',
    ],
  },
  {
    role: 'WordPress Designer',
    company: 'Media Solutions',
    period: 'Sep 2022 to Mar 2023',
    start: '2022-09', end: '2023-03', track: 'design', org: 'Media Solutions',
    summary: 'Designed and built responsive client websites.',
    bullets: [
    'Built custom WordPress websites from client brand requirements, turning PSD designs into pixel-accurate, responsive Elementor builds.',
    'Improved navigation, layout hierarchy and UI consistency across every site delivered.',
    ],
  },
  {
    role: 'UX Designer, intern',
    company: 'Arfa Software Technology Park',
    period: 'Oct 2021 to Dec 2021',
    start: '2021-10', end: '2021-12', track: 'design', org: 'Arfa Software Technology Park',
    summary: 'Interface design, prototypes and marketing materials.',
    bullets: [
    'Refined the organisation’s web interface for clearer navigation and hierarchy, and prototyped UI concepts for stakeholder review before engineering started.',
    'Designed e-brochures and client-facing materials to brand guidelines.',
    ],
  },
];

export const product = {
  name: 'Enterprise dealership CRM',
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
