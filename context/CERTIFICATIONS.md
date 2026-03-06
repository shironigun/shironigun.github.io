# Certifications Section Context

## Component
`src/components/Certifications.jsx` (340 lines)

## Data Source
`certificationsWithPdf` from `mockData.js` (9 certs)

## Certifications

| ID | Title | Issuer | Date | Category | Color |
|----|-------|--------|------|----------|-------|
| ms-ba | Business Analysis Fundamentals | Microsoft | Feb 2026 | Product | #0078d4 |
| csm | Certified ScrumMaster® (CSM®) | Scrum Alliance | Dec 2024 | Agile | #da1f27 |
| ctfl | Certified Tester Foundation Level (CTFL) | ISTQB® | Jul 2024 | QA | #00b050 |
| py-inter | Intermediate Python | DataCamp | Apr 2025 | Data | #03bd62 |
| sql | Introduction to SQL Server | DataCamp | Aug 2024 | Data | #03bd62 |
| js | Programming with JavaScript | Meta | Sep 2022 | Dev | #1877f2 |
| jira | Agile with Atlassian Jira | Atlassian | Aug 2023 | Agile | #0052cc |
| pm | Foundations of Project Management | Google | Apr 2023 | PM | #4285f4 |
| git | Version Control (Git & GitHub) | Meta | Oct 2022 | Dev | #1877f2 |

## Component Behavior
- **Flip cards**: Front shows cert info + "Verified" badge. Back shows PDF preview mockup
- **Header on back**: `{issuer} · CERTIFICATE` — **centered** text
- **Click**: Opens detail dialog with PDF iframe, credential URL button, skills, description
- PDF URLs currently use placeholder Google Drive links (need replacing with actual files)

## Notes
- Legacy `certifications` array also exists in mockData but is NOT used by the flip card component
- `certificationsWithPdf` has extra fields: `pdfUrl`, `credentialUrl`, `category`, `description`

## Last Updated
March 6, 2026
