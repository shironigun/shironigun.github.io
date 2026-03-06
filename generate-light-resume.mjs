import PDFDocument from 'pdfkit';
import fs from 'fs';

// ── Colors ───────────────────────────────────────────────────────
const C = {
  black: '#111827',
  secondary: '#4b5563',
  accent: '#1d6aff',
  accentLight: '#4d8dff',
  divider: '#e5e7eb',
  white: '#ffffff',
};

// ── Data ─────────────────────────────────────────────────────────
const personal = {
  name: 'Mahmood Ahmad',
  title: 'Product Quality Analyst (CSM®, CTFL)',
  subtitle: 'Perseus Group, Constellation Software',
  phone: '+923147369673',
  email: 'mehmood4129@gmail.com',
  location: 'Lahore, Punjab, Pakistan',
  linkedin: 'linkedin.com/in/mahmoodahmad-connect',
};

const summary =
  'CSM® and ISTQB®-certified Product Quality Analyst partnering with cross-functional teams to transform complex product visions into secure, high-quality solutions. Dual expertise spanning rigorous SQA practices and strategic product discovery — from acceptance-criteria workshops to Power BI dashboards.';

const experience = [
  {
    role: 'Product Quality Analyst',
    company: 'Perseus Group, Constellation Software',
    period: 'Jan 2026 — Present',
    bullets: [
      'Orchestrate Epics & User Stories in Aha!/Azure DevOps with "Strict Quality Gates" — minimized scope creep and reduced defect leakage.',
      'Lead cross-functional discovery sessions; leverage Regression, Trend, Break-even analysis for data-backed prioritization.',
      'Model solution architectures in Visio/draw.io; resolve bottlenecks via SWOT & 5 Whys; clarify ownership through RACI/RASCI.',
      'Standardize roadmap execution through Gantt Planning and Risk & Escalation Management — increased delivery predictability.',
      'Pioneered Power Platform (Power Apps & Automate) and Power BI dashboards for real-time product-market fit & KPI validation.',
    ],
  },
  {
    role: 'Junior SQA Analyst',
    company: 'Contour Software (Perseus Group)',
    period: 'Feb 2024 — Feb 2026',
    bullets: [
      'Refined business requirements with Product Owners — ensuring alignment, clarity, and process optimization.',
      'Created detailed test plans and control flow diagrams — improved test coverage and sprint execution.',
      'Improved dev, sprint, and release processes — enhanced delivery speed and operational efficiency.',
      'Supervised Azure DevOps test execution for million-dollar DMS & CRM offerings with notable reliability increases.',
      'Collaborated on manual & automation testing — increasing product reliability and client satisfaction.',
      'Led 2,000+ hours of domain training for dev, ops, BAs, and cross-functional teams.',
    ],
  },
  {
    role: 'SQA Trainee',
    company: 'Contour Software',
    period: 'Dec 2023 — Feb 2024',
    bullets: [
      'Initiated global UI standards documentation — improved consistency and usability across the enterprise suite.',
      'Conducted UAT, functional, API, and cross-platform testing ensuring system stability.',
      'Tracked bug reports, implemented workarounds — ensuring timely resolution and high product quality.',
    ],
  },
  {
    role: 'WordPress Designer',
    company: 'Media Solutions',
    period: 'Sep 2022 — Mar 2023',
    bullets: [
      'Designed & customized WordPress themes; converted PSD to functional sites with pixel-perfect integrity.',
      'Built responsive pages with Elementor; optimized UI/UX for increased engagement.',
    ],
  },
  {
    role: 'UX Designer (Intern)',
    company: 'Arfa Software Technology Park',
    period: 'Oct 2021 — Dec 2021',
    bullets: [
      'Crafted e-brochures, web interfaces, and UI prototypes — applying user-centred design principles.',
    ],
  },
];

const education = {
  degree: 'B.S. Information Technology',
  school: 'University of the Punjab, Lahore',
  period: 'Nov 2019 — Dec 2023',
};

const skills = [
  'Product Discovery',
  'User Story Writing',
  'Azure DevOps',
  'Power BI',
  'SQL / T-SQL',
  'Python',
  'Scrum (CSM®)',
  'ISTQB CTFL',
  'Stakeholder Mgmt',
  'RACI/RASCI',
  'Risk Management',
  'Power Platform',
  'Selenium',
  'Kanban',
  'SWOT',
  '5 Whys',
];

const certifications = [
  { title: 'Business Analysis Fundamentals', issuer: 'Microsoft', date: 'Feb 2026' },
  { title: 'Certified ScrumMaster® (CSM®)', issuer: 'Scrum Alliance', date: 'Dec 2024' },
  { title: 'Certified Tester Foundation Level (CTFL)', issuer: 'ISTQB®', date: 'Jul 2024' },
  { title: 'Intermediate Python', issuer: 'DataCamp', date: 'Apr 2025' },
  { title: 'Introduction to SQL Server', issuer: 'DataCamp', date: 'Aug 2024' },
  { title: 'Programming with JavaScript', issuer: 'Meta', date: 'Sep 2022' },
  { title: 'Agile with Atlassian Jira', issuer: 'Atlassian', date: 'Aug 2023' },
  { title: 'Foundations of Project Management', issuer: 'Google', date: 'Apr 2023' },
  { title: 'Version Control (Git & GitHub)', issuer: 'Meta', date: 'Oct 2022' },
];

// ── PDF Generation ───────────────────────────────────────────────
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 },
  info: {
    Title: 'Mahmood Ahmad — Resume (Light)',
    Author: 'Mahmood Ahmad',
  },
});

const out = fs.createWriteStream('public/Mahmood_Ahmad_Resume_Light.pdf');
doc.pipe(out);

const W = doc.page.width - 90; // usable width
let y = 40;

function drawDivider() {
  doc.moveTo(45, y).lineTo(45 + W, y).strokeColor(C.divider).lineWidth(0.75).stroke();
  y += 12;
}

function checkPage(need = 60) {
  if (y + need > doc.page.height - 50) {
    doc.addPage();
    y = 40;
  }
}

// ── Header ───────────────────────────────────────────────────────
doc
  .font('Helvetica-Bold')
  .fontSize(22)
  .fillColor(C.black)
  .text(personal.name, 45, y, { width: W * 0.6 });
y += 28;
doc
  .font('Helvetica')
  .fontSize(9)
  .fillColor(C.accent)
  .text(personal.title, 45, y, { width: W * 0.6 });
y += 13;
doc
  .fontSize(8.5)
  .fillColor(C.secondary)
  .text(personal.subtitle, 45, y, { width: W * 0.6 });

// Contact — right aligned
const rightX = 45 + W * 0.6 + 10;
const rightW = W * 0.4 - 10;
let ry = 40;
doc.font('Helvetica').fontSize(7.5).fillColor(C.secondary);
doc.text(personal.phone, rightX, ry, { width: rightW, align: 'right' });
ry += 11;
doc.fillColor(C.accent).text(personal.email, rightX, ry, { width: rightW, align: 'right' });
ry += 11;
doc.fillColor(C.secondary).text(personal.location, rightX, ry, { width: rightW, align: 'right' });
ry += 11;
doc.fillColor(C.accent).text(personal.linkedin, rightX, ry, { width: rightW, align: 'right' });

y += 20;

// Accent line under header
doc.moveTo(45, y).lineTo(45 + W, y).strokeColor(C.accent).lineWidth(1.5).stroke();
y += 16;

// ── Summary ────────────────────────────────────────────────────
doc.font('Helvetica-Bold').fontSize(8).fillColor(C.accentLight).text('SUMMARY', 45, y, { characterSpacing: 1.2 });
y += 14;
doc.font('Helvetica').fontSize(8.5).fillColor(C.secondary).text(summary, 45, y, { width: W, lineGap: 3 });
y = doc.y + 14;
drawDivider();

// ── Experience ─────────────────────────────────────────────────
doc.font('Helvetica-Bold').fontSize(8).fillColor(C.accentLight).text('EXPERIENCE', 45, y, { characterSpacing: 1.2 });
y += 16;

for (const exp of experience) {
  checkPage(70);
  // Role + Period
  doc.font('Helvetica-Bold').fontSize(9).fillColor(C.black).text(exp.role, 45, y, { width: W * 0.65, continued: false });
  doc.font('Helvetica').fontSize(7.5).fillColor(C.secondary).text(exp.period, 45 + W * 0.65, y, { width: W * 0.35, align: 'right' });
  y = Math.max(doc.y, y + 12);
  y += 1;
  doc.font('Helvetica').fontSize(7.5).fillColor(C.accent).text(exp.company, 45, y);
  y = doc.y + 6;

  for (const bullet of exp.bullets) {
    checkPage(20);
    doc.font('Helvetica').fontSize(8).fillColor(C.secondary);
    const bulletText = `›  ${bullet}`;
    doc.text(bulletText, 52, y, { width: W - 12, lineGap: 2 });
    y = doc.y + 3;
  }
  y += 8;
}

drawDivider();

// ── Education ──────────────────────────────────────────────────
checkPage(50);
doc.font('Helvetica-Bold').fontSize(8).fillColor(C.accentLight).text('EDUCATION', 45, y, { characterSpacing: 1.2 });
y += 14;
doc.font('Helvetica-Bold').fontSize(9).fillColor(C.black).text(education.degree, 45, y, { width: W * 0.65 });
doc.font('Helvetica').fontSize(7.5).fillColor(C.secondary).text(education.period, 45 + W * 0.65, y, { width: W * 0.35, align: 'right' });
y = Math.max(doc.y, y + 12) + 1;
doc.font('Helvetica').fontSize(7.5).fillColor(C.accent).text(education.school, 45, y);
y = doc.y + 14;
drawDivider();

// ── Core Skills ────────────────────────────────────────────────
checkPage(50);
doc.font('Helvetica-Bold').fontSize(8).fillColor(C.accentLight).text('CORE SKILLS', 45, y, { characterSpacing: 1.2 });
y += 14;

// Render skill chips in rows
let sx = 45;
const chipH = 16;
const chipPadX = 10;
const chipGap = 6;
const rowGap = 6;

for (const skill of skills) {
  const tw = doc.font('Helvetica').fontSize(7).widthOfString(skill);
  const chipW = tw + chipPadX * 2;
  if (sx + chipW > 45 + W) {
    sx = 45;
    y += chipH + rowGap;
    checkPage(chipH + 10);
  }
  // Chip border
  doc
    .roundedRect(sx, y, chipW, chipH, 3)
    .strokeColor('#c7d2fe')
    .lineWidth(0.75)
    .stroke();
  doc
    .font('Helvetica')
    .fontSize(7)
    .fillColor(C.accent)
    .text(skill, sx + chipPadX, y + 4.5, { lineBreak: false });
  sx += chipW + chipGap;
}
y += chipH + 14;
drawDivider();

// ── Certifications ─────────────────────────────────────────────
checkPage(60);
doc.font('Helvetica-Bold').fontSize(8).fillColor(C.accentLight).text('KEY CERTIFICATIONS', 45, y, { characterSpacing: 1.2 });
y += 14;

for (const cert of certifications) {
  checkPage(18);
  doc.font('Helvetica').fontSize(8).fillColor(C.black).text(cert.title, 45, y, { width: W * 0.6 });
  doc.font('Helvetica').fontSize(7).fillColor(C.secondary).text(`${cert.issuer} · ${cert.date}`, 45 + W * 0.6, y + 0.5, { width: W * 0.4, align: 'right' });
  y = Math.max(doc.y, y + 12) + 4;
  // light separator
  if (cert !== certifications[certifications.length - 1]) {
    doc.moveTo(45, y).lineTo(45 + W, y).strokeColor('#f3f4f6').lineWidth(0.5).stroke();
    y += 6;
  }
}

doc.end();

out.on('finish', () => {
  console.log('✓ Light resume PDF generated → public/Mahmood_Ahmad_Resume_Light.pdf');
});
