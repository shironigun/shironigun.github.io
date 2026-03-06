# Projects Section Context

## Component
`src/components/Projects.jsx` (~258 lines)

## Data Source
`projectsData` from `mockData.js` (5 projects)

**IMPORTANT**: Uses `projectsData` (detailed format), NOT the simple `projects` array.

## Type Filters
`All`, `Product QA`, `Knowledge Management`, `API Testing & Automation`, `UX & Documentation`, `AI & Innovation`

## Projects

### 1. CRM Product Quality Initiative
- **ID**: crm-quality
- **Company**: Perseus Group / Contour Software
- **Period**: 2024 – Present
- **Type**: Product QA
- **Status**: Live
- **Impact**: 40% defect reduction
- **Tags**: CRM, Azure DevOps, Quality Gates, Test Planning, Agile
- **Highlights**: 40% defect leakage reduction, Zero critical bugs in 6 sprints, Adopted by 3 teams
- **Color**: #1d6aff

### 2. Cross-Functional Domain Training Program
- **ID**: domain-training
- **Company**: Contour Software
- **Period**: 2024 – 2025
- **Type**: Knowledge Management
- **Status**: Completed
- **Impact**: 2,000+ hours delivered
- **Tags**: Training, Documentation, Facilitation, Knowledge Mgmt, SOPs
- **Highlights**: 2,000+ hours, Reduced ramp by 5 weeks, 60+ SOPs
- **Color**: #00e5a0

### 3. Postman POC — API & Performance Testing
- **ID**: postman-poc
- **Company**: Perseus Group
- **Period**: 2025
- **Type**: API Testing & Automation
- **Status**: Completed
- **Impact**: POC adopted by team
- **Tags**: Postman, API Testing, Performance Testing, Newman, CI/CD, Automation
- **Highlights**: E2E POC, Newman CLI for CI/CD, Adopted as standard tool
- **Color**: #ff6c37

### 4. Global UI Standards Documentation
- **ID**: ui-standards
- **Company**: Contour Software
- **Period**: 2023 – 2024
- **Type**: UX & Documentation
- **Status**: Completed
- **Impact**: Org-wide adoption
- **Tags**: UI Standards, Accessibility, Documentation, Confluence, Design Systems
- **Highlights**: 200+ inconsistencies resolved, 3 product lines, 35% UI bug reduction
- **Color**: #da1f27

### 5. AI Hackathon — 1st Place Win
- **ID**: ai-hackathon
- **Company**: Contour Software
- **Period**: 2025
- **Type**: AI & Innovation
- **Status**: Completed
- **Impact**: 1st place out of 11 teams
- **Tags**: AI, Hackathon, UI/UX, Cognitive Models, Semantic Analysis
- **Highlights**: 1st/11, Led requirements/UX/presentation, Customer Retention & Performance Monitoring
- **Color**: #f5a623

## Component Behavior
- Filterable by type chips
- Cards show: type chip, status, title, company/period, description, tags (first 4), impact
- Click opens detail dialog with longDescription, highlights, tags

## Last Updated
March 6, 2026
