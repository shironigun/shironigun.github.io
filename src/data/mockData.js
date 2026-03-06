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
      'Orchestrate the translation of high-level product vision into actionable <b>Epics and User Stories</b> within Aha! and Azure DevOps — established "Strict Quality Gates" and acceptance criteria that significantly minimized scope creep and reduced defect leakage across the development lifecycle.',
      "Lead <b>cross-functional discovery sessions</b> using hybrid research methodologies; leverage Quantitative Analysis (Regression, Trend, Break-even) to validate market needs — ensuring prioritization is driven by <b>data-backed insights</b> rather than intuition.",
      "Model complex solution architectures and business processes using <b>Microsoft Visio and draw.io</b>; proactively resolve systemic bottlenecks via SWOT and 5 Whys root-cause analysis, while clarifying cross-functional ownership through <b>RACI/RASCI</b> frameworks.",
      "Standardize roadmap execution through <b>advanced Gantt Planning</b> and proactive Risk & Escalation Management — directly increasing delivery predictability and stakeholder alignment across distributed teams.",
      "Pioneered <b>Microsoft Power Platform (Power Apps & Automate) and Power BI</b> dashboards that streamline workflows, monitor product-market fit in real-time, and validate post-launch outcomes against KPIs.",
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
      "Liaised with Product Owners to refine business requirements — ensuring seamless alignment, clarity, and <b>process optimization</b> through cross-functional collaboration.",
      "Created detailed <b>test plans</b> and used control flow diagrams to visualize application flows, improving test coverage and sprint execution.",
      "Improved development, sprint, and release processes — <b>enhancing delivery speed</b> and operational efficiency across product teams.",
      "Supervised execution of critical test cases within <b>Azure DevOps for million-dollar DMS and CRM offerings</b>; established a systematic approach that improved overall product performance with notable reliability increases.",
      "Collaborated with development teams to identify and resolve defects through <b>manual and automation testing</b>, directly increasing product reliability and client satisfaction.",
      "Led over <b>2,000+ hours of domain training sessions</b> for development, operations, BAs, and cross-functional teams — driving alignment, knowledge sharing, and reduced onboarding time.",
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
      "Gained deep <b>domain, business, and sprint process</b> understanding, proactively identifying and enhancing workflow inefficiencies.",
      "Conducted <b>UAT, functional, API, and cross-platform testing</b>, ensuring system stability and meeting customer needs throughout the sprint lifecycle.",
      "Implemented workarounds, reduced testing efforts, tracked and managed bug reports — ensuring <b>timely resolution</b> and maintaining high product quality.",
      "Spent <b>360+ hours collaborating</b> with operations, development, cross-functional teams, PO, and Initiative Manager — driving quality improvements and process efficiency.",
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
      "Designed and customized <b>WordPress themes</b> to client specifications — delivering unique websites that enhanced user engagement and strengthened brand identity.",
      "Converted <b>PSD designs into fully functional WordPress sites</b>, ensuring pixel-perfect design integrity and seamless design-to-development handoff.",
      "Utilized <b>Elementor</b> to create responsive, dynamic, and mobile-friendly pages — improving user experience and reducing bounce rates.",
      "Enhanced <b>UI/UX</b> by optimizing site navigation and layout, resulting in increased user satisfaction and measurable engagement improvements.",
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
      "Refined and optimized the <b>web interface design</b>, resulting in a more intuitive and user-friendly experience with improved navigation and aesthetics.",
      "Sketched and prototyped <b>user interface designs</b> to streamline the design process — ensuring alignment with user needs and smoother development handoff.",
      "Collaborated on key <b>design improvements</b> applying user-centred design principles, resulting in tangible enhancements to the overall user experience.",
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
    title: "Cross-Functional Domain Training Program",
    desc: "Designed and led 2,000+ hours of domain training across development, operations, and BA teams. Created a living knowledge base that drastically improved team alignment.",
    tags: ["Training", "Documentation", "Facilitation", "Knowledge Mgmt"],
    icon: "🎓",
    featured: false,
    impact: "2,000+ hours delivered",
  },
  {
    id: 2,
    title: "Postman POC — API & Performance Testing",
    desc: "Built a proof-of-concept report demonstrating Postman for API functional testing and performance benchmarking, driving adoption of automated API validation across the QA team.",
    tags: ["Postman", "API Testing", "Performance Testing", "Automation"],
    icon: "🚀",
    featured: false,
    impact: "POC adopted by team",
  },
  {
    id: 3,
    title: "AI Hackathon — Customer Retention & Performance Monitoring",
    desc: "Won 1st place out of 11 teams at a division-wide AI Hackathon. Built AI-powered solutions for Customer Retention and Employee Performance Monitoring using Language Cognitive Models, Text Analyzers, and Semantic Analyzers.",
    tags: ["AI", "Hackathon", "UI/UX", "Cognitive Models", "Semantic Analysis"],
    icon: "🥇",
    featured: true,
    impact: "1st place / 11 teams",
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
    id: "ai-hackathon",
    title: "AI Hackathon — 1st Place Win",
    company: "Contour Software",
    period: "2025",
    type: "AI & Innovation",
    status: "Completed",
    impact: "1st place out of 11 teams",
    thumbnail: null,
    demoUrl: null,
    repoUrl: null,
    description:
      "Won 1st place out of 11 teams at a division-wide AI Hackathon. Led requirements, UI/UX prototyping, and the final presentation. Built AI-powered solutions for Customer Retention and Employee Performance Monitoring using Language Cognitive Models, Text Analyzers, and Semantic Analyzers.",
    longDescription:
      "Secured 1st place out of 11 teams at a division-wide AI Hackathon. Took ownership of finalizing project requirements, defining and aligning clear goals, designing UI/UX prototypes, and preparing and delivering the final presentation. The team built AI-powered solutions targeting Customer Retention and Employee Performance Monitoring, powered by AI Language Cognitive Models, Text Analyzers, and Semantic Analyzers.",
    tags: ["AI", "Hackathon", "UI/UX", "Cognitive Models", "Semantic Analysis"],
    highlights: [
      "1st place out of 11 teams",
      "Led requirements, UI/UX design & final presentation",
      "Built AI solutions for Customer Retention & Performance Monitoring",
    ],
    color: "#f5a623",
  },
  {
    id: "crm-quality",
    title: "CRM Product Quality Initiative",
    company: "Perseus Group / Contour Software",
    period: "2024 – Present",
    type: "Product QA",
    status: "Live",
    impact: "40% defect reduction",
    thumbnail: null,
    demoUrl: null,
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
    id: "postman-poc",
    title: "Postman POC — API & Performance Testing",
    company: "Perseus Group",
    period: "2025",
    type: "API Testing & Automation",
    status: "Completed",
    impact: "POC adopted by team",
    thumbnail: null,
    demoUrl: null,
    repoUrl: null,
    description:
      "Developed a comprehensive proof-of-concept report showcasing Postman for API functional testing and performance benchmarking — enabling the QA team to adopt automated API validation.",
    longDescription:
      "Researched, designed, and delivered a POC report evaluating Postman as the primary tool for API testing and performance benchmarking. Covered collection-based test automation, environment management, pre/post-request scripts, Newman CLI integration for CI/CD pipelines, and performance load testing capabilities. The report included hands-on examples, comparison matrices, and actionable recommendations that led to team-wide adoption.",
    tags: [
      "Postman",
      "API Testing",
      "Performance Testing",
      "Newman",
      "CI/CD",
      "Automation",
    ],
    highlights: [
      "End-to-end POC with hands-on examples",
      "Newman CLI integration for CI/CD",
      "Adopted as standard API testing tool",
    ],
    color: "#ff6c37",
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
    id: "cs-postman-poc",
    title: "How a Postman POC Standardised API Testing Across 5+ Teams",
    subtitle:
      "Evaluating Postman's Suitability Beyond Traditional QA Workflows",
    company: "Perseus Group, Constellation Software",
    period: "Q1 2025",
    role: "Product Quality Analyst",
    category: "API Testing & Automation",
    readTime: "5 min read",
    color: "#ff6c37",
    tags: [
      "Postman",
      "API Testing",
      "Performance Testing",
      "Newman CLI",
      "CI/CD",
      "Automation",
    ],
    overview:
      "Postman is widely used for functional API testing, but its capabilities for automation, performance, and security testing were unexplored within the team. I researched, designed, and delivered a comprehensive POC document evaluating Postman's full feature set — covering 12 capabilities, pricing tiers, pros/cons, and actionable recommendations that led to team-wide adoption.",
    problem:
      "The QA team relied entirely on manual API validation with no standardised tooling for functional, performance, or automated API testing. There was no CI/CD integration for API tests, no structured approach to API chaining or environment management, and no visibility into API health or performance benchmarks.",
    approach: [
      {
        step: "Feature Deep-Dive",
        detail:
          "Evaluated 12 core Postman capabilities: Workspaces, Environments, Collection Execution (Manual/Scheduled/CLI), Flows (no-code automation), API Chaining, Performance Testing, Postbot AI, Unit Testing with Chai.js, Built-in Test Data Generation (Faker.js), CI/CD Integrations (Newman, Jenkins, GitHub Actions, Azure DevOps), Security & Vault Integrations, and Monitors.",
      },
      {
        step: "Plan-by-Plan Analysis",
        detail:
          "Mapped every feature against Postman's Free, Basic, Professional, and Enterprise pricing tiers — documenting limits such as 25 vs 250 collection runs, 100 vs 500 virtual users for performance testing, and workspace/collaboration restrictions per plan.",
      },
      {
        step: "Pros & Cons Evaluation",
        detail:
          "Identified 10 key strengths (intuitive UI, Chai.js assertions, Postbot AI, Newman CLI for CI/CD, real-time collaboration) and 6 critical limitations (performance caps at 500 virtual users, no distributed load testing, limited contract testing, no built-in fuzz/vulnerability scanning, high cost for unlimited runs at $49/seat/month).",
      },
      {
        step: "Recommendations & Delivery",
        detail:
          "Concluded that Postman is best for functional, contract, and end-to-end testing with automation — but requires complementary tools like JMeter/Gatling for high-scale performance and OWASP ZAP for security. Delivered the POC document and presented findings to the QA and engineering teams.",
      },
    ],
    results: [
      { metric: "12", label: "Features evaluated end-to-end" },
      { metric: "4", label: "Pricing tiers mapped" },
      { metric: "5+", label: "Teams adopted as standard API tool" },
      { metric: "10+", label: "Pros & cons documented" },
    ],
    learnings:
      "A good POC isn't just about proving a tool works — it's about defining where it excels and where it doesn't. By being transparent about Postman's limitations upfront, the team trusted the recommendation and adopted it faster than if I'd only highlighted the positives.",
  },
  {
    id: "cs-training",
    title: "How I Cut Domain Training from Months to Minutes",
    subtitle:
      "A Self-Initiated Knowledge Base Adopted by Operations, Development, QA, Stakeholders & End Customers",
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
      "Domain training that once took months of shadowing was compressed into a self-serve knowledge base accessible in minutes. I designed and delivered a 2,000+ hour structured training program now used by operations, internal development, QA, stakeholder teams, and end customers as the primary domain reference.",
    problem:
      "Domain knowledge lived entirely in the heads of 3 senior engineers who were also responsible for delivery. New hires were learning by osmosis over months, asking the same questions repeatedly, and blocking senior engineers from their own work. There was no single source of truth for operations, dev, QA, or customer-facing teams.",
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
          "Facilitated 120+ live training sessions across 18 months. Created 60+ SOPs, 30 video walkthroughs, and a publicly hosted knowledge base at learntargetcrm.com. Ran weekly Q&A office hours.",
      },
      {
        step: "Iteration",
        detail:
          "Collected feedback after every cohort and updated materials quarterly. Tracked time-to-productivity metrics to measure program effectiveness.",
      },
    ],
    results: [
      { metric: "Months→Min", label: "Training time compressed" },
      { metric: "2,000+", label: "Training hours delivered" },
      { metric: "60+", label: "SOPs and guides authored" },
      { metric: "5+", label: "Teams: Ops, Dev, QA, Stakeholders, Customers" },
    ],
    learnings:
      "The act of documenting knowledge made the senior engineers realise how much implicit context they were carrying. The real ROI wasn't just faster onboarding — it was freeing senior engineers from 2+ hours of interruptions daily.",
  },
];

// ─── ACHIEVEMENTS ─────────────────────────────────────────────────
export const achievements = [
  {
    id: "hackathon",
    icon: "🥇",
    title: "1st Place — Division-Wide AI Hackathon",
    detail:
      "Led requirements, UI/UX prototyping, and the final presentation for AI-powered Customer Retention and Employee Performance Monitoring solutions — winning 1st out of 11 teams.",
    year: "2025",
    color: "#ff6c37",
  },
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

// ─── ARTICLES ─────────────────────────────────────────────────────
export const articles = [
  {
    id: "art-1",
    title:
      'Why "Done" Is Never Really Done: A QA Perspective on Acceptance Criteria',
    date: "March 2026",
    readTime: "4 min",
    excerpt:
      "Most teams treat acceptance criteria as a checkbox. Here's why treating it as a conversation changes everything about how you ship quality.",
    tags: ["Quality", "Acceptance Criteria", "Agile"],
    color: "#1d6aff",
    body: [
      {
        type: "paragraph",
        text: "Every sprint retrospective has that one moment — someone says 'but the acceptance criteria were met.' And technically, they're right. The checkboxes are checked. The story is closed. But the customer is still confused, the edge case still breaks, and the team is already firefighting in the next sprint.",
      },
      {
        type: "heading",
        text: "The Checkbox Trap",
      },
      {
        type: "paragraph",
        text: "Acceptance criteria written as checkboxes create a false sense of completeness. When a story says 'User can reset password,' the developer builds exactly that — a reset flow. But what about the user who typos their email? The one on a 3G connection? The one who triggers the flow twice in 10 seconds?",
      },
      {
        type: "paragraph",
        text: "These aren't obscure edge cases. They're the real-world scenarios your users encounter daily. A checkbox says 'done.' A conversation asks 'done for whom?'",
      },
      {
        type: "heading",
        text: "Acceptance Criteria as a Conversation",
      },
      {
        type: "paragraph",
        text: "The best acceptance criteria I've written weren't written alone. They came from 15-minute conversations with developers, designers, and PMs — where someone always asks the question nobody thought to ask.",
      },
      {
        type: "paragraph",
        text: "In my experience at Perseus Group, switching from static bullet points to collaborative acceptance criteria workshops reduced our defect leakage by over 40%. Not because we wrote more criteria — but because we asked better questions before writing any.",
      },
      {
        type: "heading",
        text: "A Better Framework",
      },
      {
        type: "paragraph",
        text: "Here's what I use now: every acceptance criterion gets stress-tested with three questions — (1) What happens when this goes wrong? (2) What does the user see when nothing happens? (3) Would a new team member understand this without context?",
      },
      {
        type: "paragraph",
        text: "If any of those questions produce a shrug, the criterion isn't ready. It's not about perfection — it's about surfacing assumptions before they become bugs.",
      },
      {
        type: "heading",
        text: "The Takeaway",
      },
      {
        type: "paragraph",
        text: "'Done' is a spectrum, not a switch. The teams that ship the most reliable software aren't the ones with the longest acceptance criteria — they're the ones who treat 'done' as a conversation that starts before the first line of code and continues after deployment.",
      },
    ],
  },
  {
    id: "art-2",
    title:
      "From QA to Product: What Testing Taught Me About Building the Right Thing",
    date: "March 2026",
    readTime: "5 min",
    excerpt:
      "Two years of finding bugs in other people's assumptions taught me more about product thinking than any MBA could.",
    tags: ["Career", "Product Thinking", "QA"],
    color: "#00e5a0",
    body: [
      {
        type: "paragraph",
        text: "I didn't start in product. I started in QA — clicking through flows, writing test cases, and filing bugs that developers would mark 'working as intended.' That phrase haunted me. Because often, the feature was working as intended. It just wasn't working as needed.",
      },
      {
        type: "heading",
        text: "Bugs Are Misaligned Assumptions",
      },
      {
        type: "paragraph",
        text: "The biggest lesson from QA isn't how to find bugs. It's recognising that most bugs aren't code issues — they're communication gaps. A developer builds what the ticket says. A designer designs what the brief described. The user does something nobody documented.",
      },
      {
        type: "paragraph",
        text: "When I started mapping these gaps, I realised I wasn't just testing software — I was testing whether the team truly understood the problem they were solving.",
      },
      {
        type: "heading",
        text: "The Perspective Shift",
      },
      {
        type: "paragraph",
        text: "QA gives you something rare: you see the product through the user's eyes, but with full knowledge of the team's intent. You sit between what was meant and what was built. That gap — that's where product thinking lives.",
      },
      {
        type: "paragraph",
        text: "At Contour Software, I moved from filing bugs to asking 'why does this feature exist?' in sprint planning. That single question changed my trajectory. Suddenly I was in requirement workshops, mapping user journeys, and defining acceptance criteria that prevented bugs instead of catching them.",
      },
      {
        type: "heading",
        text: "What Testing Teaches You About Product",
      },
      {
        type: "paragraph",
        text: "Testing teaches you to think in failure modes. Product requires thinking in success paths. Combine both, and you get someone who can define what 'right' looks like — and what 'wrong' looks like before it happens.",
      },
      {
        type: "paragraph",
        text: "It also teaches empathy. Not the soft kind — the rigorous kind. The kind where you sit with a customer support ticket for 20 minutes and realise the 'user error' was actually a UX decision your team made six months ago.",
      },
      {
        type: "heading",
        text: "For QA Professionals Considering the Leap",
      },
      {
        type: "paragraph",
        text: "You already have the hardest skill to teach: the instinct to question assumptions. Product people spend years developing that. You've been doing it every time you wrote a bug report.",
      },
      {
        type: "paragraph",
        text: "The transition isn't about abandoning QA — it's about expanding the scope of what you test. Instead of testing features, you start testing ideas. Instead of verifying requirements, you start shaping them.",
      },
      {
        type: "heading",
        text: "The Takeaway",
      },
      {
        type: "paragraph",
        text: "My path from QA to product wasn't a career change — it was a perspective shift. The best product analysts I know aren't the ones with the fanciest frameworks. They're the ones who ask 'but what happens when...' — exactly the question every good tester already knows how to ask.",
      },
    ],
  },
];
