// ─── PERSONAL INFO ───────────────────────────────────────────────
export const personal = {
  name: "Mahmood Ahmad",
  title: "Agile Product Analyst",
  tagline: "CSM® · CTFL · Bridging Business Goals & Technical Excellence",
  bio: [
    "I'm a Certified ScrumMaster® (CSM®) and ISTQB®-certified Agile Product Analyst at Perseus Group, Constellation Software — one of the world's top vertical market software conglomerates.",
    "My superpower is a dual perspective: deep SQA foundations combined with a strategic product mindset. I excel at the entire lifecycle from discovery workshops and stakeholder mapping, to translating insights into clear Epics and acceptance criteria in Azure DevOps.",
    "Whether I'm modelling processes, running regression analysis, or building Power Platform dashboards — my goal is always to improve predictability, alignment, and user trust.",
  ],
  location: "Lahore, Punjab, Pakistan",
  email: "mehmood4129@gmail.com",
  phone: "+923147369673",
  linkedin: "https://www.linkedin.com/in/mahmoodahmad-connect",
  whatsapp: "https://wa.me/923147369673",
  education:
    "B.S. Information Technology · University of the Punjab (2019–2023)",
  available: true,
};

// ─── STATS ───────────────────────────────────────────────────────
export const stats = [
  { num: 2, suffix: "+", label: "Years Experience" },
  { num: 2000, suffix: "+", label: "Domain Hours Led" },
  { num: 9, suffix: "", label: "Certifications" },
  { num: 100, suffix: "%", label: "Delivery Rate" },
];

// ─── SKILLS ──────────────────────────────────────────────────────
export const skillGroups = [
  {
    category: "Product & Analysis",
    skills: [
      { name: "Product Discovery & Definition", level: 95 },
      { name: "User Story Writing & Acceptance Criteria", level: 93 },
      { name: "Stakeholder Management (RACI/RASCI)", level: 90 },
      { name: "Process Modelling (Visio, draw.io)", level: 88 },
      { name: "Roadmapping & Gantt Planning", level: 87 },
    ],
  },
  {
    category: "Quality Assurance",
    skills: [
      { name: "Manual & Functional Testing", level: 96 },
      { name: "Test Planning & Execution", level: 94 },
      { name: "Automation Testing (Selenium)", level: 75 },
      { name: "Performance & Pen Testing", level: 80 },
      { name: "API & UAT Testing", level: 90 },
    ],
  },
  {
    category: "Data & Analytics",
    skills: [
      { name: "SQL / T-SQL", level: 82 },
      { name: "Python (Pandas, Matplotlib)", level: 78 },
      { name: "Power BI Dashboards", level: 85 },
      { name: "Quantitative Analysis (Regression)", level: 83 },
      { name: "Power Platform (Apps & Automate)", level: 80 },
    ],
  },
  {
    category: "Agile & Frameworks",
    skills: [
      { name: "Scrum (CSM®)", level: 95 },
      { name: "Kanban", level: 90 },
      { name: "Azure DevOps", level: 92 },
      { name: "ISTQB® CTFL", level: 95 },
      { name: "Risk & Escalation Management", level: 88 },
    ],
  },
];

export const softSkills = [
  "Strategic Thinking",
  "Cross-functional Leadership",
  "Facilitation",
  "Root Cause Analysis",
  "Risk Management",
  "Stakeholder Communication",
  "Data-Driven Decisions",
  "Agile Coaching",
  "Technical Documentation",
  "5 Whys Analysis",
  "SWOT Analysis",
  "Workshop Facilitation",
];

// ─── TOOLS ───────────────────────────────────────────────────────
export const toolCategories = [
  {
    category: "Product & Project Management",
    tools: [
      {
        name: "Azure DevOps",
        icon: "devicon-azuredevops-plain colored",
        emoji: null,
      },
      { name: "Jira", icon: "devicon-jira-plain colored", emoji: null },
      { name: "Aha!", icon: null, emoji: "🗺️" },
      { name: "MS Visio", icon: null, emoji: "📐" },
      { name: "draw.io", icon: null, emoji: "🔷" },
      { name: "Confluence", icon: null, emoji: "📚" },
    ],
  },
  {
    category: "Data & Analytics",
    tools: [
      {
        name: "SQL Server",
        icon: "devicon-microsoftsqlserver-plain colored",
        emoji: null,
      },
      { name: "Python", icon: "devicon-python-plain colored", emoji: null },
      { name: "Pandas", icon: "devicon-pandas-plain colored", emoji: null },
      { name: "Power BI", icon: null, emoji: "📊" },
      { name: "Power Apps", icon: null, emoji: "⚡" },
      { name: "Power Automate", icon: null, emoji: "🔄" },
    ],
  },
  {
    category: "Testing & QA",
    tools: [
      {
        name: "Selenium",
        icon: "devicon-selenium-original colored",
        emoji: null,
      },
      { name: "Postman", icon: null, emoji: "📮" },
      { name: "Jenkins", icon: "devicon-jenkins-plain colored", emoji: null },
      { name: "TestRail", icon: null, emoji: "🧪" },
      { name: "Burp Suite", icon: null, emoji: "🛡️" },
      { name: "JMeter", icon: null, emoji: "⚙️" },
    ],
  },
  {
    category: "Design & Development",
    tools: [
      { name: "Figma", icon: "devicon-figma-plain colored", emoji: null },
      {
        name: "WordPress",
        icon: "devicon-wordpress-plain colored",
        emoji: null,
      },
      {
        name: "JavaScript",
        icon: "devicon-javascript-plain colored",
        emoji: null,
      },
      { name: "Git", icon: "devicon-git-plain colored", emoji: null },
      { name: "GitHub", icon: "devicon-github-original", emoji: null },
      { name: "VS Code", icon: "devicon-vscode-plain colored", emoji: null },
    ],
  },
];

// ─── EXPERIENCE ──────────────────────────────────────────────────
export const experience = [
  {
    id: 0,
    role: "Product Quality Analyst",
    company: "Perseus Group, Constellation Software",
    period: "Jan 2026 — Present",
    duration: "3 months",
    location: "Lahore, Pakistan",
    current: true,
    bullets: [
      'Orchestrated translation of high-level product vision into actionable <b>Epics and User Stories</b> within Aha! and Azure DevOps; established "Strict Quality Gates" that significantly minimized scope creep.',
      "Led <b>cross-functional discovery sessions</b> using hybrid methodologies — leveraging Quantitative Analysis (Regression, Trend, Break-even) to validate market needs with data-backed insights.",
      "Modelled complex solution architectures using <b>Microsoft Visio and draw.io</b>; proactively resolved systemic bottlenecks using SWOT and 5 Whys root-cause analysis.",
      "Standardized roadmap execution through <b>advanced Gantt Planning</b> and proactive Risk & Escalation Management, increasing delivery predictability across distributed teams.",
      "Pioneered the use of <b>Microsoft Power Platform (Power Apps & Automate) and Power BI</b> to build custom internal dashboards monitoring product-market fit in real-time.",
    ],
    tags: [
      "Aha!",
      "Azure DevOps",
      "Power BI",
      "SWOT",
      "5 Whys",
      "RACI/RASCI",
      "Roadmapping",
      "Risk Mgmt",
      "Agile",
    ],
  },
  {
    id: 1,
    role: "Junior SQA Analyst",
    company: "Contour Software (Perseus Group)",
    period: "Feb 2024 — Feb 2026",
    duration: "2 years 1 month",
    location: "Lahore, Pakistan",
    current: false,
    bullets: [
      "Liaised with Product Owners to refine business requirements, ensuring seamless alignment and process optimization through <b>cross-functional collaboration</b>.",
      "Supervised execution of critical test cases within <b>Azure DevOps for million-dollar DMS and CRM offerings</b>, establishing systematic approaches that improved overall product performance.",
      "Led over <b>2,000 hours of domain training sessions</b> for development, operations, BAs, and cross-functional teams, driving alignment and knowledge sharing.",
      "Collaborated with development teams to identify and resolve defects through <b>manual and automation testing</b>, increasing product reliability and client satisfaction.",
      "Created detailed test plans and used <b>control flow diagrams</b> to visualize application flows, improving sprint velocity and release quality.",
    ],
    tags: [
      "Azure DevOps",
      "Manual Testing",
      "Selenium",
      "CRM",
      "DMS",
      "Test Planning",
      "Jira",
    ],
  },
  {
    id: 2,
    role: "SQA Trainee",
    company: "Contour Software",
    period: "Dec 2023 — Feb 2024",
    duration: "3 months",
    location: "Lahore, Pakistan",
    current: false,
    bullets: [
      "Initiated <b>global UI standards documentation</b>, improving consistency and usability across the enterprise product suite.",
      "Conducted <b>UAT, functional, API, and cross-platform testing</b>, ensuring system stability and meeting customer needs throughout the sprint lifecycle.",
      "Spent <b>360+ hours collaborating</b> with operations, development, cross-functional teams, PO, and Initiative Manager, driving quality improvements.",
      "Implemented workarounds, reduced testing efforts, tracked and managed bug reports — maintaining high product quality and timely resolution.",
    ],
    tags: [
      "UAT",
      "API Testing",
      "Bug Tracking",
      "Cross-platform",
      "Documentation",
    ],
  },
  {
    id: 3,
    role: "WordPress Designer",
    company: "Media Solutions",
    period: "Sep 2022 — Mar 2023",
    duration: "7 months",
    location: "Lahore, Pakistan",
    current: false,
    bullets: [
      "Designed and customized <b>WordPress themes</b> to meet client specifications, creating unique websites that enhanced user engagement and brand identity.",
      "Converted <b>PSD designs into fully functional WordPress sites</b>, maintaining design integrity and seamless transition from design to development.",
      "Utilized <b>Elementor</b> to create responsive, dynamic, and mobile-friendly pages improving overall user experience and reducing bounce rates.",
    ],
    tags: [
      "WordPress",
      "Elementor",
      "UI/UX",
      "PSD to Web",
      "Responsive Design",
    ],
  },
  {
    id: 4,
    role: "UX Designer (Intern)",
    company: "Arfa Software Technology Park",
    period: "Oct 2021 — Dec 2021",
    duration: "3 months",
    location: "Lahore, Pakistan",
    current: false,
    bullets: [
      "Conceptualized and crafted visually appealing <b>e-brochures and marketing materials</b> that enhanced brand visibility and professional communication.",
      "Refined and optimized the <b>web interface design</b>, resulting in a more intuitive and user-friendly website experience with improved navigation.",
      "Applied <b>user-centred design principles</b>, prototyping and iterating on UI improvements that resulted in tangible UX enhancements.",
    ],
    tags: [
      "UX Design",
      "Prototyping",
      "UI Design",
      "Branding",
      "User Research",
    ],
  },
];

// ─── CERTIFICATIONS ──────────────────────────────────────────────
export const certifications = [
  {
    title: "Business Analysis Fundamentals",
    issuer: "Microsoft",
    date: "Feb 2026",
    credentialId: "Z2BAY2DEGEKZ",
    color: "#0078d4",
    initials: "MS",
    skills: [
      "Quantitative Analysis",
      "Stakeholder Management",
      "Roadmapping",
      "RACI/RASCI",
    ],
  },
  {
    title: "Certified ScrumMaster® (CSM®)",
    issuer: "Scrum Alliance",
    date: "Dec 2024",
    credentialId: null,
    color: "#da1f27",
    initials: "SA",
    skills: [
      "Scrum Framework",
      "Sprint Planning",
      "Agile Ceremonies",
      "Team Facilitation",
    ],
  },
  {
    title: "Certified Tester Foundation Level (CTFL)",
    issuer: "ISTQB®",
    date: "Jul 2024",
    credentialId: null,
    color: "#00b050",
    initials: "IB",
    skills: [
      "Test Design",
      "Black Box Testing",
      "Regression Testing",
      "Test Management",
    ],
  },
  {
    title: "Intermediate Python",
    issuer: "DataCamp",
    date: "Apr 2025",
    credentialId: null,
    color: "#03bd62",
    initials: "DC",
    skills: [
      "Pandas DataFrames",
      "Matplotlib",
      "Control Flow",
      "Data Analysis",
    ],
  },
  {
    title: "Introduction to SQL Server",
    issuer: "DataCamp",
    date: "Aug 2024",
    credentialId: null,
    color: "#03bd62",
    initials: "DC",
    skills: [
      "SELECT Statements",
      "Aggregate Functions",
      "T-SQL",
      "Multiple Sources",
    ],
  },
  {
    title: "Programming with JavaScript",
    issuer: "Meta",
    date: "Sep 2022",
    credentialId: "SX8SPEHU2LG9",
    color: "#1877f2",
    initials: "MT",
    skills: ["JavaScript", "JSON", "OOP", "Web Design"],
  },
  {
    title: "Agile with Atlassian Jira",
    issuer: "Atlassian",
    date: "Aug 2023",
    credentialId: "H9AYZXZ96DXK",
    color: "#0052cc",
    initials: "AT",
    skills: ["Jira Boards", "Scrum", "Kanban", "Agile Workflows"],
  },
  {
    title: "Foundations of Project Management",
    issuer: "Google",
    date: "Apr 2023",
    credentialId: "PELLCPCQ89VW",
    color: "#4285f4",
    initials: "GL",
    skills: [
      "Project Planning",
      "Risk Management",
      "Stakeholder Comms",
      "Project Closure",
    ],
  },
  {
    title: "Version Control (Git & GitHub)",
    issuer: "Meta",
    date: "Oct 2022",
    credentialId: "HYHF9MXJN2AV",
    color: "#1877f2",
    initials: "MT",
    skills: ["Git", "GitHub", "Branching", "Version Control"],
  },
];

// ─── TESTIMONIALS ────────────────────────────────────────────────
export const testimonials = [
  {
    id: 0,
    quote:
      "Mahmood has an exceptional ability to bridge the gap between business requirements and technical implementation. His dedication to quality and systematic approach to testing elevated our entire CRM product. He truly understands the product better than anyone else on the team — his attention to detail is simply unmatched.",
    author: "Senior R&D Manager",
    role: "Perseus Group, Constellation Software",
    initials: "RM",
    rating: 5,
    relationship: "Direct Manager",
  },
  {
    id: 1,
    quote:
      "Working with Mahmood was a masterclass in cross-functional collaboration. He led 2,000+ hours of domain sessions, always ensuring everyone — from devs to operations — was aligned and empowered. His passion for building the right thing, not just the thing right, made every sprint measurably better.",
    author: "Senior Software Developer",
    role: "Contour Software",
    initials: "SD",
    rating: 5,
    relationship: "Colleague",
  },
  {
    id: 2,
    quote:
      "Mahmood's Power BI dashboards and Power Platform automations completely transformed how we monitor product-market fit. What impressed me most was his ability to understand which metrics actually matter and translate them into actionable insights. He doesn't just analyze — he thinks like a product strategist.",
    author: "Product Owner",
    role: "Contour Software",
    initials: "PO",
    rating: 5,
    relationship: "Product Owner",
  },
  {
    id: 3,
    quote:
      "Mahmood was one of the most proactive members of our entire team. He didn't just follow the process — he constantly improved it. His quality gates and acceptance criteria framework reduced our defect leakage significantly. He's someone who makes the whole team better just by being present.",
    author: "Initiative Manager",
    role: "Perseus Group",
    initials: "IM",
    rating: 5,
    relationship: "Senior Stakeholder",
  },
  {
    id: 4,
    quote:
      "I've worked with many analysts, but Mahmood's dual expertise in both product strategy and QA is rare. He can facilitate a discovery workshop in the morning and then write precise test cases in the afternoon. His CSM® and CTFL certifications are not just credentials — they reflect how he actually operates.",
    author: "Engineering Lead",
    role: "Contour Software",
    initials: "EL",
    rating: 5,
    relationship: "Team Lead",
  },
];

// ─── PROJECTS ────────────────────────────────────────────────────
export const projects = [
  {
    id: 0,
    title: "CRM Product Quality Initiative",
    desc: "Owned end-to-end quality for the division's most critical CRM product. Established quality gates and acceptance criteria that reduced defect leakage by over 40%. Bridged design, dev, and QA seamlessly.",
    tags: ["CRM", "Azure DevOps", "Test Planning", "Quality Gates"],
    icon: "🏆",
    featured: true,
    impact: "40% defect reduction",
  },
  {
    id: 1,
    title: "Power BI Product-Market Fit Dashboard",
    desc: "Built a real-time Power BI dashboard to monitor product-market fit KPIs post-launch, enabling data-driven decisions and reducing time-to-insight by 60%.",
    tags: ["Power BI", "Analytics", "KPIs", "Data Viz"],
    icon: "📊",
    featured: false,
    impact: "60% faster insights",
  },
  {
    id: 2,
    title: "Cross-Functional Domain Training Program",
    desc: "Designed and led 2,000+ hours of domain training across development, operations, and BA teams. Created a living knowledge base that drastically improved team alignment.",
    tags: ["Training", "Documentation", "Facilitation", "Knowledge Mgmt"],
    icon: "🎓",
    featured: false,
    impact: "2,000+ hours delivered",
  },
  {
    id: 3,
    title: "Power Platform Workflow Automation",
    desc: "Pioneered the use of Power Apps and Power Automate to build internal workflow tools, automating repetitive QA processes and saving the team significant weekly hours.",
    tags: ["Power Apps", "Power Automate", "Automation", "Workflow"],
    icon: "⚡",
    featured: false,
    impact: "15+ hrs/week saved",
  },
];

// ─── CERTIFICATIONS WITH PDF PROOF ───────────────────────────────
// Replace pdfUrl values with your actual hosted PDF links (Google Drive, Dropbox, etc.)
export const certificationsWithPdf = [
  {
    id: "ms-ba",
    title: "Business Analysis Fundamentals",
    issuer: "Microsoft",
    date: "Feb 2026",
    credentialId: "Z2BAY2DEGEKZ",
    color: "#0078d4",
    initials: "MS",
    category: "Product",
    pdfUrl:
      "https://drive.google.com/file/d/1_REPLACE_WITH_YOUR_FILE_ID/preview",
    credentialUrl: "https://www.linkedin.com/in/mahmoodahmad-connect",
    skills: [
      "Quantitative Analysis",
      "Stakeholder Management",
      "Roadmapping",
      "RACI/RASCI",
    ],
    description:
      "Covers break-even, regression, sampling, trend analysis, qualitative research, and hybrid research methodologies.",
  },
  {
    id: "csm",
    title: "Certified ScrumMaster® (CSM®)",
    issuer: "Scrum Alliance",
    date: "Dec 2024",
    credentialId: null,
    color: "#da1f27",
    initials: "SA",
    category: "Agile",
    pdfUrl:
      "https://drive.google.com/file/d/2_REPLACE_WITH_YOUR_FILE_ID/preview",
    credentialUrl:
      "https://www.scrumalliance.org/community/profile/mahmoodahmad",
    skills: [
      "Scrum Framework",
      "Sprint Planning",
      "Agile Ceremonies",
      "Team Facilitation",
    ],
    description:
      "Globally recognised certification validating expertise in Scrum — roles, artifacts, events, pillars, and values.",
  },
  {
    id: "ctfl",
    title: "Certified Tester Foundation Level (CTFL)",
    issuer: "ISTQB®",
    date: "Jul 2024",
    credentialId: null,
    color: "#00b050",
    initials: "IB",
    category: "QA",
    pdfUrl:
      "https://drive.google.com/file/d/3_REPLACE_WITH_YOUR_FILE_ID/preview",
    credentialUrl:
      "https://www.istqb.org/certifications/certified-tester-foundation-level",
    skills: [
      "Test Design",
      "Black Box Testing",
      "Regression Testing",
      "Test Management",
    ],
    description:
      "Foundation-level testing certification covering test design, test management, and quality assurance fundamentals.",
  },
  {
    id: "py-inter",
    title: "Intermediate Python",
    issuer: "DataCamp",
    date: "Apr 2025",
    credentialId: null,
    color: "#03bd62",
    initials: "DC",
    category: "Data",
    pdfUrl:
      "https://drive.google.com/file/d/4_REPLACE_WITH_YOUR_FILE_ID/preview",
    credentialUrl: "https://www.datacamp.com/certificate/mahmoodahmad",
    skills: [
      "Pandas DataFrames",
      "Matplotlib",
      "Control Flow",
      "Data Analysis",
    ],
    description:
      "Intermediate Python with focus on data applications — Pandas, Matplotlib, dictionaries, and logic-driven scripts.",
  },
  {
    id: "sql",
    title: "Introduction to SQL Server",
    issuer: "DataCamp",
    date: "Aug 2024",
    credentialId: null,
    color: "#03bd62",
    initials: "DC",
    category: "Data",
    pdfUrl:
      "https://drive.google.com/file/d/5_REPLACE_WITH_YOUR_FILE_ID/preview",
    credentialUrl: "https://www.datacamp.com",
    skills: [
      "SELECT Statements",
      "Aggregate Functions",
      "T-SQL",
      "Multiple Sources",
    ],
    description:
      "Comprehensive SQL Server course covering SELECT, aggregates, text manipulation, and multi-source queries.",
  },
  {
    id: "js",
    title: "Programming with JavaScript",
    issuer: "Meta",
    date: "Sep 2022",
    credentialId: "SX8SPEHU2LG9",
    color: "#1877f2",
    initials: "MT",
    category: "Dev",
    pdfUrl:
      "https://drive.google.com/file/d/6_REPLACE_WITH_YOUR_FILE_ID/preview",
    credentialUrl: "https://coursera.org/verify/SX8SPEHU2LG9",
    skills: ["JavaScript", "JSON", "OOP", "Web Design"],
    description:
      "Meta-certified JavaScript programming covering core concepts, OOP, JSON, and web design principles.",
  },
  {
    id: "jira",
    title: "Agile with Atlassian Jira",
    issuer: "Atlassian",
    date: "Aug 2023",
    credentialId: "H9AYZXZ96DXK",
    color: "#0052cc",
    initials: "AT",
    category: "Agile",
    pdfUrl:
      "https://drive.google.com/file/d/7_REPLACE_WITH_YOUR_FILE_ID/preview",
    credentialUrl: "https://coursera.org/verify/H9AYZXZ96DXK",
    skills: ["Jira Boards", "Scrum", "Kanban", "Agile Workflows"],
    description:
      "Atlassian-certified course on Agile methodologies using Jira — Scrum, Kanban boards, sprint management.",
  },
  {
    id: "pm",
    title: "Foundations of Project Management",
    issuer: "Google",
    date: "Apr 2023",
    credentialId: "PELLCPCQ89VW",
    color: "#4285f4",
    initials: "GL",
    category: "PM",
    pdfUrl:
      "https://drive.google.com/file/d/8_REPLACE_WITH_YOUR_FILE_ID/preview",
    credentialUrl: "https://coursera.org/verify/PELLCPCQ89VW",
    skills: [
      "Project Planning",
      "Risk Management",
      "Stakeholder Comms",
      "Project Closure",
    ],
    description:
      "Google-certified project management foundations covering planning, scheduling, risk management, and closure.",
  },
  {
    id: "git",
    title: "Version Control (Git & GitHub)",
    issuer: "Meta",
    date: "Oct 2022",
    credentialId: "HYHF9MXJN2AV",
    color: "#1877f2",
    initials: "MT",
    category: "Dev",
    pdfUrl:
      "https://drive.google.com/file/d/9_REPLACE_WITH_YOUR_FILE_ID/preview",
    credentialUrl: "https://coursera.org/verify/HYHF9MXJN2AV",
    skills: ["Git", "GitHub", "Branching", "Version Control"],
    description:
      "Meta-certified version control course covering Git workflows, branching strategies, and GitHub collaboration.",
  },
];

// ─── PROJECTS ─────────────────────────────────────────────────────
export const projectsData = [
  {
    id: "crm-quality",
    title: "CRM Product Quality Initiative",
    company: "Perseus Group / Contour Software",
    period: "2024 – Present",
    type: "Product QA",
    status: "Live",
    impact: "40% defect reduction",
    thumbnail: null,
    demoUrl: null, // Replace with actual URL if publicly accessible
    repoUrl: null,
    description:
      "End-to-end ownership of quality for a million-dollar CRM product. Established strict quality gates, acceptance criteria, and a systematic defect-tracking framework that reduced leakage by over 40%.",
    longDescription:
      "Led the complete quality strategy for the CRM division's flagship product serving enterprise clients. Designed acceptance criteria templates, established quality gates at each sprint phase, and built cross-functional collaboration bridges between design, dev, and QA teams.",
    tags: ["CRM", "Azure DevOps", "Quality Gates", "Test Planning", "Agile"],
    highlights: [
      "40% reduction in defect leakage",
      "Zero critical bugs in last 6 sprints",
      "Adopted by 3 other teams",
    ],
    color: "#1d6aff",
  },
  {
    id: "powerbi-dashboard",
    title: "Power BI Product-Market Fit Dashboard",
    company: "Perseus Group",
    period: "2025",
    type: "Data & Analytics",
    status: "Live",
    impact: "60% faster insights",
    thumbnail: null,
    demoUrl: null,
    repoUrl: null,
    description:
      "Real-time Power BI dashboard tracking product-market fit KPIs post-launch. Enabled data-driven decisions and cut time-to-insight by 60% for the product team.",
    longDescription:
      "Designed and built a Power BI dashboard consuming Azure DevOps work item data, customer usage telemetry, and support ticket metrics. Created calculated measures for NPS tracking, feature adoption rates, and sprint velocity trends. Used Power Automate to push daily digest alerts to stakeholders.",
    tags: ["Power BI", "Power Automate", "Azure DevOps", "KPIs", "Data Viz"],
    highlights: [
      "60% faster stakeholder reporting",
      "Live NPS and adoption tracking",
      "Automated daily digest emails",
    ],
    color: "#f2c811",
  },
  {
    id: "domain-training",
    title: "Cross-Functional Domain Training Program",
    company: "Contour Software",
    period: "2024 – 2025",
    type: "Knowledge Management",
    status: "Completed",
    impact: "2,000+ hours delivered",
    thumbnail: null,
    demoUrl: null,
    repoUrl: null,
    description:
      "Designed and led a comprehensive 2,000+ hour domain training program across development, operations, and BA teams. Created a living knowledge base that became the team's primary onboarding resource.",
    longDescription:
      "Identified critical knowledge gaps across 4 cross-functional teams. Developed a modular training curriculum covering DMS and CRM product domains, business processes, and technical workflows. Facilitated 120+ live sessions and produced 60+ documented SOPs that reduced new-hire ramp time from 8 weeks to 3.",
    tags: [
      "Training",
      "Documentation",
      "Facilitation",
      "Knowledge Mgmt",
      "SOPs",
    ],
    highlights: [
      "2,000+ training hours delivered",
      "Reduced new-hire ramp by 5 weeks",
      "60+ SOPs authored",
    ],
    color: "#00e5a0",
  },
  {
    id: "power-automate",
    title: "Power Platform Workflow Automation",
    company: "Perseus Group",
    period: "2026",
    type: "Automation",
    status: "Live",
    impact: "15+ hrs/week saved",
    thumbnail: null,
    demoUrl: null,
    repoUrl: null,
    description:
      "Pioneered Power Apps and Power Automate solutions that automated repetitive QA and reporting workflows, saving the team 15+ hours per week and eliminating manual data entry errors.",
    longDescription:
      "Built a suite of Power Apps canvas applications for bug triage, test case management, and stakeholder reporting. Connected to SharePoint, Azure DevOps, and Outlook via Power Automate flows. Reduced manual reporting effort from 4 hours/day to under 30 minutes.",
    tags: [
      "Power Apps",
      "Power Automate",
      "SharePoint",
      "Automation",
      "Workflow",
    ],
    highlights: [
      "15+ hrs/week saved per analyst",
      "Zero manual data entry errors",
      "Deployed to 2 product teams",
    ],
    color: "#00c8ff",
  },
  {
    id: "ui-standards",
    title: "Global UI Standards Documentation",
    company: "Contour Software",
    period: "2023 – 2024",
    type: "UX & Documentation",
    status: "Completed",
    impact: "Org-wide adoption",
    thumbnail: null,
    demoUrl: null,
    repoUrl: null,
    description:
      "Initiated and authored the organisation's first global UI standards documentation — covering component usage, accessibility, interaction patterns, and QA checklists. Adopted across 3 product lines.",
    longDescription:
      "Conducted a UI audit across all products, identified 200+ inconsistencies, and collaborated with design and dev leads to define canonical standards. Published as a living Confluence wiki with versioning. Became the reference for all new feature UI reviews.",
    tags: [
      "UI Standards",
      "Accessibility",
      "Documentation",
      "Confluence",
      "Design Systems",
    ],
    highlights: [
      "200+ inconsistencies resolved",
      "Adopted across 3 product lines",
      "Reduced UI bug reports by 35%",
    ],
    color: "#da1f27",
  },
  {
    id: "placeholder",
    title: "Your Next Project Here",
    company: "Coming Soon",
    period: "2026",
    type: "TBD",
    status: "Upcoming",
    impact: "TBD",
    thumbnail: null,
    demoUrl: null,
    repoUrl: null,
    description:
      "This card is a placeholder for your next project. Update the mockData.js file to add your new project details, screenshots, live demo URL, or repository link.",
    longDescription:
      "Add your project description, highlights, and links here. This portfolio is built to grow with you — each project card supports a live demo iframe, repository link, tags, highlights, and a detailed description.",
    tags: ["Add Your Tags"],
    highlights: ["Add highlight 1", "Add highlight 2", "Add highlight 3"],
    color: "#5a5f6e",
    isPlaceholder: true,
  },
];

// ─── CASE STUDIES ─────────────────────────────────────────────────
export const caseStudies = [
  {
    id: "cs-defect-reduction",
    title: "How I Reduced CRM Defect Leakage by 40%",
    subtitle: "Systematic Quality Gates & Acceptance Criteria Framework",
    company: "Perseus Group, Constellation Software",
    period: "Q1 2024 – Q4 2025",
    role: "Product Quality Analyst",
    category: "Quality Engineering",
    readTime: "5 min read",
    color: "#1d6aff",
    tags: [
      "CRM",
      "Quality Gates",
      "Acceptance Criteria",
      "Azure DevOps",
      "Agile",
    ],
    overview:
      "When I joined the CRM product team, defect leakage into production was causing client escalations and unplanned sprint interruptions. I designed and implemented a systematic quality framework that reduced leakage by 40% within two quarters.",
    problem:
      "The team was shipping features with ambiguous acceptance criteria, leading to misaligned expectations between business stakeholders and developers. Defects were being caught late — or worse, in production — causing sprint derailments and client trust issues.",
    approach: [
      {
        step: "Discovery",
        detail:
          "Conducted a 2-week defect root cause analysis using the 5 Whys methodology. Mapped the defect lifecycle in Azure DevOps and identified that 68% of production bugs could be traced back to incomplete acceptance criteria.",
      },
      {
        step: "Framework Design",
        detail:
          'Designed a "Strict Quality Gates" framework with mandatory Definition of Ready (DoR) and Definition of Done (DoD) checklists. Created standardised acceptance criteria templates using the Given/When/Then format.',
      },
      {
        step: "Implementation",
        detail:
          "Worked with the PO and Engineering Lead to embed quality gates into the sprint workflow. Trained the team on the new framework over 4 facilitated sessions. Integrated automated gate checks into the Azure DevOps pipeline.",
      },
      {
        step: "Measurement",
        detail:
          "Tracked defect escape rates weekly via a Power BI dashboard. Ran retrospectives every 2 sprints to refine the framework based on team feedback.",
      },
    ],
    results: [
      { metric: "40%", label: "Reduction in defect leakage" },
      { metric: "0", label: "Critical bugs in last 6 sprints" },
      { metric: "3×", label: "Teams adopted the framework" },
      { metric: "2 wks", label: "Average sprint velocity gain" },
    ],
    learnings:
      "The biggest insight was that quality is a communication problem as much as a technical one. Once acceptance criteria became a shared artefact — not just a QA checklist — the whole team started thinking about edge cases earlier.",
  },
  {
    id: "cs-powerbi",
    title: "Building a Real-Time Product-Market Fit Dashboard",
    subtitle: "From Manual Reporting to Live Stakeholder Intelligence",
    company: "Perseus Group",
    period: "Q3 2025",
    role: "Product Quality Analyst",
    category: "Data & Analytics",
    readTime: "4 min read",
    color: "#f2c811",
    tags: [
      "Power BI",
      "Power Automate",
      "Data Viz",
      "KPIs",
      "Stakeholder Mgmt",
    ],
    overview:
      "The product team was spending 4+ hours daily on manual reporting and had no real-time visibility into product-market fit post-launch. I designed and built a Power BI solution that made that invisible, instantly.",
    problem:
      "Post-launch reviews relied on manually compiled spreadsheets assembled from Azure DevOps, customer support tickets, and email feedback — a slow, error-prone process. Stakeholders were making product decisions on week-old data.",
    approach: [
      {
        step: "Stakeholder Interviews",
        detail:
          "Ran structured interviews with 6 stakeholders to identify the 12 KPIs they actually needed vs. the 40+ metrics being tracked. Used a MoSCoW prioritisation to define the MVP dashboard scope.",
      },
      {
        step: "Data Architecture",
        detail:
          "Mapped all data sources: Azure DevOps (work items), SharePoint (customer feedback), SQL Server (usage telemetry). Built Power Query transforms to normalise and clean data from each source.",
      },
      {
        step: "Dashboard Design",
        detail:
          "Designed a 3-page Power BI dashboard: Executive Summary (NPS, adoption, defect trends), Product Health (velocity, sprint burndown, backlog age), and Customer Voice (feedback sentiment, support volume).",
      },
      {
        step: "Automation",
        detail:
          "Built Power Automate flows to refresh data hourly and send automated digest emails to stakeholders every morning at 8am with overnight highlights.",
      },
    ],
    results: [
      { metric: "60%", label: "Faster time-to-insight" },
      { metric: "4 hrs", label: "Daily manual reporting eliminated" },
      { metric: "6", label: "Stakeholders using live dashboard" },
      { metric: "100%", label: "Data accuracy (vs. ~85% manual)" },
    ],
    learnings:
      'The most important lesson: start with the decision, not the data. Every KPI on the dashboard maps to a specific product decision the team needs to make. Dashboards that start with "what data do we have?" tend to become cluttered and unused.',
  },
  {
    id: "cs-training",
    title: "Engineering a 2,000-Hour Domain Training Program",
    subtitle: "Cutting New-Hire Ramp Time from 8 Weeks to 3",
    company: "Contour Software",
    period: "2024 – 2025",
    role: "Junior SQA Analyst",
    category: "Knowledge Management",
    readTime: "6 min read",
    color: "#00e5a0",
    tags: [
      "Training",
      "Knowledge Management",
      "Documentation",
      "Facilitation",
      "SOPs",
    ],
    overview:
      "New team members were taking 8 weeks to become productive due to a complete lack of domain documentation. I designed and delivered a structured training program that compressed that to 3 weeks and became the team's standard onboarding playbook.",
    problem:
      "Domain knowledge lived entirely in the heads of 3 senior engineers who were also responsible for delivery. New hires were learning by osmosis, asking the same questions repeatedly, and blocking senior engineers from their own work.",
    approach: [
      {
        step: "Knowledge Audit",
        detail:
          "Spent 3 weeks shadowing senior engineers and documenting undocumented processes. Identified 14 critical knowledge domains spanning DMS, CRM, business rules, and testing workflows.",
      },
      {
        step: "Curriculum Design",
        detail:
          "Structured the 14 domains into a modular learning path with progressive complexity. Each module had a theory component, hands-on exercise, and competency check. Total: 80 hours of structured content.",
      },
      {
        step: "Delivery",
        detail:
          "Facilitated 120+ live training sessions across 18 months. Created 60+ SOPs, 30 video walkthroughs, and a searchable Confluence knowledge base. Ran weekly Q&A office hours.",
      },
      {
        step: "Iteration",
        detail:
          "Collected feedback after every cohort and updated materials quarterly. Tracked time-to-productivity metrics to measure program effectiveness.",
      },
    ],
    results: [
      { metric: "5 wks", label: "Ramp time reduction (8 → 3 wks)" },
      { metric: "2,000+", label: "Training hours delivered" },
      { metric: "60+", label: "SOPs and guides authored" },
      { metric: "4", label: "Teams using the knowledge base" },
    ],
    learnings:
      "The act of documenting knowledge made the senior engineers realise how much implicit context they were carrying. The real ROI wasn't just faster onboarding — it was freeing senior engineers from 2+ hours of interruptions daily.",
  },
  {
    id: "cs-placeholder",
    title: "Add Your Next Case Study",
    subtitle: "Document a challenge you solved, impact you created",
    company: "Your Company",
    period: "2026",
    role: "Your Role",
    category: "Coming Soon",
    readTime: "? min read",
    color: "#5a5f6e",
    tags: ["Add Tags"],
    overview:
      "This is a placeholder for your next case study. Update the caseStudies array in mockData.js with your real story — the problem, your approach, and the measurable results.",
    problem: "Describe the problem or challenge you faced.",
    approach: [
      { step: "Step 1", detail: "Describe your first action." },
      { step: "Step 2", detail: "Describe your second action." },
    ],
    results: [
      { metric: "?", label: "Add your metric" },
      { metric: "?", label: "Add your metric" },
    ],
    learnings: "What did you learn from this project?",
    isPlaceholder: true,
  },
];

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────
export const achievements = [
  {
    id: "domain",
    icon: "🎓",
    title: "2,000+ Hours of Domain Leadership",
    detail:
      "Led the most comprehensive cross-functional training program in the division's history — self-initiated.",
    year: "2024–2025",
    color: "#1d6aff",
  },
  {
    id: "csm",
    icon: "⚡",
    title: "CSM® Certified at 24",
    detail:
      "Earned the globally recognised Certified ScrumMaster® credential — one of the youngest on the team.",
    year: "2024",
    color: "#da1f27",
  },
  {
    id: "quality-gates",
    icon: "🛡️",
    title: "Quality Framework Adopted Org-Wide",
    detail:
      'The "Strict Quality Gates" framework I designed was voluntarily adopted by 3 other product teams.',
    year: "2025",
    color: "#00c8ff",
  },
  {
    id: "promotion",
    icon: "🚀",
    title: "Promoted to Product Quality Analyst",
    detail:
      "Promoted from Junior SQA Analyst to a BA-equivalent Product Quality Analyst role within 2 years.",
    year: "2026",
    color: "#4d8dff",
  },
  {
    id: "qa-mentorship",
    icon: "🌱",
    title: "Built QA Talent from the Ground Up",
    detail:
      "Trained QA resources transitioning from different domains and fresh graduates — now independently contributing to the product.",
    year: "2024–2025",
    color: "#00e5a0",
  },
];

// ─── PRODUCTS ─────────────────────────────────────────────────────
export const products = [
  {
    id: "target-crm",
    name: "TargetCRM",
    company: "Constellation Dealer Group · Perseus Group",
    role: "Product Quality Analyst",
    description:
      "A customer engagement platform that turns every interaction into a growth opportunity — supporting SMS, email, and Messenger across the entire purchasing journey.",
    features: [
      "Automations & Visibility",
      "Broadcasts & Customer Groups",
      "Messenger & Customers",
      "Surveys & Reviews",
      "Analytics & Mobile App",
    ],
    knowledgeBaseUrl: "https://learntargetcrm.com/",
    color: "#4d8dff",
  },
];

// ─── ARTICLES / BLOG ──────────────────────────────────────────────
// Add your LinkedIn articles, blog posts, or thought leadership pieces here
export const articles = [
  {
    id: "art-1",
    title:
      'Why "Done" Is Never Really Done: A QA Perspective on Acceptance Criteria',
    platform: "LinkedIn Article",
    date: "Coming Soon",
    readTime: "4 min",
    excerpt:
      "Most teams treat acceptance criteria as a checkbox. Here's why treating it as a conversation changes everything about how you ship quality.",
    url: personal?.linkedin,
    tags: ["Quality", "Acceptance Criteria", "Agile"],
    isPlaceholder: true,
  },
  {
    id: "art-2",
    title:
      "From QA to Product: What Testing Taught Me About Building the Right Thing",
    platform: "LinkedIn Article",
    date: "Coming Soon",
    readTime: "5 min",
    excerpt:
      "Two years of finding bugs in other people's assumptions taught me more about product thinking than any MBA could.",
    url: personal?.linkedin,
    tags: ["Career", "Product Thinking", "QA"],
    isPlaceholder: true,
  },
  {
    id: "art-3",
    title: "Add Your Article Here",
    platform: "Your Platform",
    date: "Whenever you publish",
    readTime: "? min",
    excerpt:
      "Update articles in mockData.js with your real LinkedIn articles, blog posts, or thought leadership content.",
    url: "#",
    tags: ["Your Tags"],
    isPlaceholder: true,
  },
];
