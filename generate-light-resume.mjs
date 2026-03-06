import PDFDocument from "pdfkit";
import fs from "fs";

// ── Colors ───────────────────────────────────────────────────────
const C = {
  black: "#111827",
  secondary: "#4b5563",
  accent: "#1d6aff",
  accentLight: "#4d8dff",
  divider: "#e5e7eb",
  white: "#ffffff",
};

// ── Data ─────────────────────────────────────────────────────────
const personal = {
  name: "Mahmood Ahmad",
  title: "Product Quality Analyst (CSM®, CTFL)",
  subtitle: "Perseus Group, Constellation Software",
  phone: "+923147369673",
  email: "mehmood4129@gmail.com",
  location: "Lahore, Punjab, Pakistan",
  linkedin: "linkedin.com/in/mahmoodahmad-connect",
};

const summary =
  "CSM® and ISTQB®-certified Product Quality Analyst partnering with cross-functional teams to transform complex product visions into secure, high-quality solutions. Dual expertise spanning rigorous SQA practices and strategic product discovery — from acceptance-criteria workshops to Power BI dashboards.";

const experience = [
  {
    role: "Product Quality Analyst",
    company: "Perseus Group, Constellation Software",
    period: "Jan 2026 — Present",
    bullets: [
      'Orchestrate the translation of high-level product vision into actionable Epics and User Stories within Aha! and Azure DevOps — established "Strict Quality Gates" and acceptance criteria that significantly minimized scope creep and reduced defect leakage across the development lifecycle.',
      "Lead cross-functional discovery sessions using hybrid research methodologies; leverage Quantitative Analysis (Regression, Trend, Break-even) to validate market needs — ensuring prioritization is driven by data-backed insights rather than intuition.",
      "Model complex solution architectures and business processes using Microsoft Visio and draw.io; proactively resolve systemic bottlenecks via SWOT and 5 Whys root-cause analysis, while clarifying cross-functional ownership through RACI/RASCI frameworks.",
      "Standardize roadmap execution through advanced Gantt Planning and proactive Risk & Escalation Management — directly increasing delivery predictability and stakeholder alignment across distributed teams.",
      "Pioneered Microsoft Power Platform (Power Apps & Automate) and Power BI dashboards that streamline workflows, monitor product-market fit in real-time, and validate post-launch outcomes against KPIs.",
    ],
  },
  {
    role: "Junior SQA Analyst",
    company: "Contour Software (Perseus Group)",
    period: "Feb 2024 — Feb 2026",
    bullets: [
      "Liaised with Product Owners to refine business requirements — ensuring seamless alignment, clarity, and process optimization through cross-functional collaboration.",
      "Created detailed test plans and used control flow diagrams to visualize application flows, improving test coverage and sprint execution.",
      "Improved development, sprint, and release processes — enhancing delivery speed and operational efficiency across product teams.",
      "Supervised execution of critical test cases within Azure DevOps for million-dollar DMS and CRM offerings; established a systematic approach that improved overall product performance with notable reliability increases.",
      "Collaborated with development teams to identify and resolve defects through manual and automation testing, directly increasing product reliability and client satisfaction.",
      "Led over 2,000+ hours of domain training sessions for development, operations, BAs, and cross-functional teams — driving alignment, knowledge sharing, and reduced onboarding time.",
    ],
  },
  {
    role: "SQA Trainee",
    company: "Contour Software",
    period: "Dec 2023 — Feb 2024",
    bullets: [
      "Initiated global UI standards documentation, improving consistency and usability across the enterprise product suite.",
      "Gained deep domain, business, and sprint process understanding, proactively identifying and enhancing workflow inefficiencies.",
      "Conducted UAT, functional, API, and cross-platform testing, ensuring system stability and meeting customer needs throughout the sprint lifecycle.",
      "Implemented workarounds, reduced testing efforts, tracked and managed bug reports — ensuring timely resolution and maintaining high product quality.",
      "Spent 360+ hours collaborating with operations, development, cross-functional teams, PO, and Initiative Manager — driving quality improvements and process efficiency.",
    ],
  },
  {
    role: "WordPress Designer",
    company: "Media Solutions",
    period: "Sep 2022 — Mar 2023",
    bullets: [
      "Designed and customized WordPress themes to client specifications — delivering unique websites that enhanced user engagement and strengthened brand identity.",
      "Converted PSD designs into fully functional WordPress sites, ensuring pixel-perfect design integrity and seamless design-to-development handoff.",
      "Utilized Elementor to create responsive, dynamic, and mobile-friendly pages — improving user experience and reducing bounce rates.",
      "Enhanced UI/UX by optimizing site navigation and layout, resulting in increased user satisfaction and measurable engagement improvements.",
    ],
  },
  {
    role: "UX Designer (Intern)",
    company: "Arfa Software Technology Park",
    period: "Oct 2021 — Dec 2021",
    bullets: [
      "Conceptualized and crafted visually appealing e-brochures and marketing materials that enhanced brand visibility and professional communication.",
      "Refined and optimized the web interface design, resulting in a more intuitive and user-friendly experience with improved navigation and aesthetics.",
      "Sketched and prototyped user interface designs to streamline the design process — ensuring alignment with user needs and smoother development handoff.",
      "Collaborated on key design improvements applying user-centred design principles, resulting in tangible enhancements to the overall user experience.",
    ],
  },
];

const education = {
  degree: "B.S. Information Technology",
  school: "University of the Punjab, Lahore",
  period: "Nov 2019 — Dec 2023",
};

const skills = [
  "Product Discovery",
  "User Story Writing",
  "Azure DevOps",
  "Power BI",
  "SQL / T-SQL",
  "Python",
  "Scrum (CSM®)",
  "ISTQB CTFL",
  "Stakeholder Mgmt",
  "RACI/RASCI",
  "Risk Management",
  "Power Platform",
  "Selenium",
  "Kanban",
  "SWOT",
  "5 Whys",
];

// Only first 5 shown — matches UI (certifications.slice(0, 5))
const certifications = [
  { title: "Business Analysis Fundamentals", issuer: "Microsoft", date: "Feb 2026" },
  { title: "Certified ScrumMaster® (CSM®)", issuer: "Scrum Alliance", date: "Dec 2024" },
  { title: "Certified Tester Foundation Level (CTFL)", issuer: "ISTQB®", date: "Jul 2024" },
  { title: "Intermediate Python", issuer: "DataCamp", date: "Apr 2025" },
  { title: "Introduction to SQL Server", issuer: "DataCamp", date: "Aug 2024" },
];

// ── PDF Generation ───────────────────────────────────────────────
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 40, bottom: 40, left: 45, right: 45 },
  info: {
    Title: "Mahmood Ahmad — Resume (Light)",
    Author: "Mahmood Ahmad",
  },
});

const out = fs.createWriteStream("public/Mahmood_Ahmad_Resume_Light.pdf");
doc.pipe(out);

const W = doc.page.width - 90; // usable width
let y = 40;

function drawDivider() {
  doc
    .moveTo(45, y)
    .lineTo(45 + W, y)
    .strokeColor(C.divider)
    .lineWidth(0.75)
    .stroke();
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
  .font("Helvetica-Bold")
  .fontSize(22)
  .fillColor(C.black)
  .text(personal.name, 45, y, { width: W * 0.6 });
y += 28;
doc
  .font("Helvetica")
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
doc.font("Helvetica").fontSize(7.5).fillColor(C.secondary);
doc.text(personal.phone, rightX, ry, { width: rightW, align: "right" });
ry += 11;
doc
  .fillColor(C.accent)
  .text(personal.email, rightX, ry, { width: rightW, align: "right" });
ry += 11;
doc
  .fillColor(C.secondary)
  .text(personal.location, rightX, ry, { width: rightW, align: "right" });
ry += 11;
doc
  .fillColor(C.accent)
  .text(personal.linkedin, rightX, ry, { width: rightW, align: "right" });

y += 20;

// Accent line under header
doc
  .moveTo(45, y)
  .lineTo(45 + W, y)
  .strokeColor(C.accent)
  .lineWidth(1.5)
  .stroke();
y += 16;

// ── Summary ────────────────────────────────────────────────────
doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(C.accentLight)
  .text("SUMMARY", 45, y, { characterSpacing: 1.2 });
y += 14;
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor(C.secondary)
  .text(summary, 45, y, { width: W, lineGap: 3 });
y = doc.y + 14;
drawDivider();

// ── Experience ─────────────────────────────────────────────────
doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(C.accentLight)
  .text("EXPERIENCE", 45, y, { characterSpacing: 1.2 });
y += 16;

for (const exp of experience) {
  checkPage(70);
  // Role + Period
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(C.black)
    .text(exp.role, 45, y, { width: W * 0.65, continued: false });
  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor(C.secondary)
    .text(exp.period, 45 + W * 0.65, y, { width: W * 0.35, align: "right" });
  y = Math.max(doc.y, y + 12);
  y += 1;
  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor(C.accent)
    .text(exp.company, 45, y);
  y = doc.y + 6;

  for (const bullet of exp.bullets) {
    checkPage(20);
    doc.font("Helvetica").fontSize(8).fillColor(C.secondary);
    const bulletText = `›  ${bullet}`;
    doc.text(bulletText, 52, y, { width: W - 12, lineGap: 2 });
    y = doc.y + 3;
  }
  y += 8;
}

drawDivider();

// ── Education ──────────────────────────────────────────────────
checkPage(50);
doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(C.accentLight)
  .text("EDUCATION", 45, y, { characterSpacing: 1.2 });
y += 14;
doc
  .font("Helvetica-Bold")
  .fontSize(9)
  .fillColor(C.black)
  .text(education.degree, 45, y, { width: W * 0.65 });
doc
  .font("Helvetica")
  .fontSize(7.5)
  .fillColor(C.secondary)
  .text(education.period, 45 + W * 0.65, y, {
    width: W * 0.35,
    align: "right",
  });
y = Math.max(doc.y, y + 12) + 1;
doc
  .font("Helvetica")
  .fontSize(7.5)
  .fillColor(C.accent)
  .text(education.school, 45, y);
y = doc.y + 14;
drawDivider();

// ── Core Skills ────────────────────────────────────────────────
checkPage(50);
doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(C.accentLight)
  .text("CORE SKILLS", 45, y, { characterSpacing: 1.2 });
y += 14;

// Render skill chips in rows
let sx = 45;
const chipH = 16;
const chipPadX = 10;
const chipGap = 6;
const rowGap = 6;

for (const skill of skills) {
  const tw = doc.font("Helvetica").fontSize(7).widthOfString(skill);
  const chipW = tw + chipPadX * 2;
  if (sx + chipW > 45 + W) {
    sx = 45;
    y += chipH + rowGap;
    checkPage(chipH + 10);
  }
  // Chip border
  doc
    .roundedRect(sx, y, chipW, chipH, 3)
    .strokeColor("#c7d2fe")
    .lineWidth(0.75)
    .stroke();
  doc
    .font("Helvetica")
    .fontSize(7)
    .fillColor(C.accent)
    .text(skill, sx + chipPadX, y + 4.5, { lineBreak: false });
  sx += chipW + chipGap;
}
y += chipH + 14;
drawDivider();

// ── Certifications ─────────────────────────────────────────────
checkPage(60);
doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor(C.accentLight)
  .text("KEY CERTIFICATIONS", 45, y, { characterSpacing: 1.2 });
y += 14;

for (const cert of certifications) {
  checkPage(18);
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(C.black)
    .text(cert.title, 45, y, { width: W * 0.6 });
  doc
    .font("Helvetica")
    .fontSize(7)
    .fillColor(C.secondary)
    .text(`${cert.issuer} · ${cert.date}`, 45 + W * 0.6, y + 0.5, {
      width: W * 0.4,
      align: "right",
    });
  y = Math.max(doc.y, y + 12) + 4;
  // light separator
  if (cert !== certifications[certifications.length - 1]) {
    doc
      .moveTo(45, y)
      .lineTo(45 + W, y)
      .strokeColor("#f3f4f6")
      .lineWidth(0.5)
      .stroke();
    y += 6;
  }
}

doc.end();

out.on("finish", () => {
  console.log(
    "✓ Light resume PDF generated → public/Mahmood_Ahmad_Resume_Light.pdf"
  );
});
