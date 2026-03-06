# Case Studies Section Context

## Component
`src/components/CaseStudies.jsx` (235 lines)

## Data Source
`caseStudies` from `mockData.js` (3 case studies)

## Case Studies

### 1. How I Reduced CRM Defect Leakage by 40%
- **ID**: cs-defect-reduction
- **Company**: Perseus Group, Constellation Software
- **Period**: Q1 2024 – Q4 2025
- **Role**: Product Quality Analyst
- **Category**: Quality Engineering
- **Read Time**: 5 min
- **Color**: #1d6aff
- **Approach**: Discovery (5 Whys, 68% traced to incomplete AC) → Framework Design (Strict Quality Gates, DoR/DoD, Given/When/Then) → Implementation (trained team, Azure DevOps pipeline) → Measurement (Power BI dashboard)
- **Results**: 40% defect reduction, 0 critical bugs in 6 sprints, 3× adoption, 2 wk velocity gain

### 2. How a Postman POC Standardised API Testing Across 5+ Teams
- **ID**: cs-postman-poc
- **Company**: Perseus Group, Constellation Software
- **Period**: Q1 2025
- **Role**: Product Quality Analyst
- **Category**: API Testing & Automation
- **Read Time**: 5 min
- **Color**: #ff6c37
- **Approach**: Feature Deep-Dive (12 capabilities) → Plan-by-Plan Analysis (Free/Basic/Pro/Enterprise) → Pros & Cons (10 strengths, 6 limitations) → Recommendations
- **Results**: 12 features evaluated, 4 pricing tiers, 5+ teams adopted, 10+ pros/cons documented

### 3. How I Cut Domain Training from Months to Minutes
- **ID**: cs-training
- **Company**: Contour Software
- **Period**: 2024 – 2025
- **Role**: Junior SQA Analyst
- **Category**: Knowledge Management
- **Read Time**: 6 min
- **Color**: #00e5a0
- **Approach**: Knowledge Audit (14 domains) → Curriculum Design (80 hrs structured) → Delivery (120+ sessions, 60+ SOPs, learntargetcrm.com) → Iteration
- **Results**: Months→Min compressed, 2,000+ hours, 60+ SOPs, 5+ teams (Ops, Dev, QA, Stakeholders, Customers)

## Component Behavior
- Cards show category chip, title, subtitle, company/period, read time, tags
- Click opens reading dialog with: header (category chip + close inline), title, subtitle, company/period/readTime, overview, problem, approach steps, results metrics, learnings
- Category chip is inline with close button in header to reduce height

## Last Updated
March 6, 2026
