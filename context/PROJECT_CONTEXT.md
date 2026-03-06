# Project Context — Mahmood Ahmad Portfolio

## Overview
Personal portfolio website for **Mahmood Ahmad**, Agile Product Analyst at Perseus Group, Constellation Software. Built with React + Vite, deployed on GitHub Pages via GitHub Actions.

## Tech Stack
- **Framework**: React 18 + Vite
- **UI Library**: MUI (Material UI) v6
- **Animations**: Framer Motion
- **Hosting**: GitHub Pages (auto-deploy on push to `main`)
- **Repository**: `shironigun/shironigun.github.io`

## File Structure
```
src/
  App.jsx              — Main app, renders all sections in order
  main.jsx             — Entry point
  data/mockData.js     — ALL content/data for every section (~1183 lines)
  theme/theme.js       — MUI theme config
  hooks/useScrollReveal.js
  components/
    Navbar.jsx         — Nav with dropdowns (Primary, Work, More)
    Hero.jsx           — Landing hero section
    About.jsx          — Bio & stats
    Skills.jsx         — Skill bars + soft skills
    Tools.jsx          — Tool grid by category
    Experience.jsx     — Timeline of roles
    Products.jsx       — Product cards + knowledge base webview dialog
    Certifications.jsx — Flip cards with PDF preview + detail dialog
    Projects.jsx       — Filterable project cards + detail dialog
    CaseStudies.jsx    — Impact-focused case study cards + reading dialog
    Achievements.jsx   — Achievement cards
    Testimonials.jsx   — Testimonial carousel
    Articles.jsx       — In-portfolio article cards + reading dialog
    Resume.jsx         — Resume section
    Connect.jsx        — Contact/connect section
    Footer.jsx         — Footer
    CustomCursor.jsx   — Custom cursor
```

## Section Render Order (App.jsx)
1. Navbar (fixed)
2. Hero
3. About
4. Skills
5. Tools
6. Experience
7. Products
8. Certifications
9. Projects
10. Case Studies
11. Achievements
12. Testimonials
13. Articles
14. Resume
15. Connect
16. Footer

## Navbar Structure
- **Primary**: About, Skills, Tools, Experience
- **Work** (dropdown): Products, Certifications, Projects, Case Studies, Achievements
- **More** (dropdown): Testimonials, Articles, Resume

## Key Data Exports (mockData.js)
| Export | Type | Used By |
|--------|------|---------|
| `personal` | Object | Navbar, Hero, About, Connect |
| `stats` | Array[4] | About |
| `skillGroups` | Array[4] | Skills |
| `softSkills` | Array[12] | Skills |
| `toolCategories` | Array[4] | Tools |
| `experience` | Array[5] | Experience |
| `certifications` | Array[9] | (legacy, not used by flip cards) |
| `certificationsWithPdf` | Array[9] | Certifications |
| `testimonials` | Array[5] | Testimonials |
| `projects` | Array[4] | (simple cards — not rendered by Projects.jsx) |
| `projectsData` | Array[5] | Projects |
| `caseStudies` | Array[3] | CaseStudies |
| `achievements` | Array[6] | Achievements |
| `products` | Array[1] | Products |
| `articles` | Array[2] | Articles |

## Important Notes
- **Two project arrays exist**: `projects` (simple format, not rendered) and `projectsData` (detailed format, used by Projects.jsx). Always add to `projectsData`.
- **No placeholder/mock content** — all removed. No "coming soon" or "add your" entries.
- **Articles are in-portfolio** — read via dialog, not external links. Each article has a `body` array of `{type, text}` blocks.
- **Products section** has an embedded iframe dialog for the knowledge base at `learntargetcrm.com`.
- **Certifications** use flip cards — front shows cert info, back shows PDF preview mockup. Header text on back is centered.

## Last Updated
March 6, 2026
