# Portfolio – Mahmood Ahmad

## Project Overview

Personal portfolio website built with React + Vite.

## Tech Stack

- **Framework:** React (JSX)
- **Bundler:** Vite
- **Styling:** Theme-based (see `src/theme/theme.js`)

## Structure

```
src/
  App.jsx          – Root component
  main.jsx         – Entry point
  components/      – UI sections (Hero, About, Skills, Experience, Projects, etc.)
  data/mockData.js – All portfolio content (achievements, experience, projects, etc.)
  hooks/           – Custom hooks (useScrollReveal)
  theme/           – Theme configuration
```

## Key Components

| Component       | Purpose                        |
| --------------- | ------------------------------ |
| Hero            | Landing / intro section        |
| About           | Bio / summary                  |
| Skills          | Technical skills               |
| Experience      | Work history                   |
| Projects        | Project showcase               |
| Achievements    | Career milestones              |
| Articles        | Published articles             |
| CaseStudies     | In-depth project write-ups     |
| Certifications  | Professional certifications    |
| Testimonials    | Endorsements / recommendations |
| Tools           | Dev tools & workflow           |
| Resume          | Downloadable resume            |
| Connect         | Contact / social links         |
| Navbar / Footer | Navigation & footer            |
| CustomCursor    | Custom cursor effect           |

## Change Log

### 2026-03-05

- **Removed** the "~100% Salary Increment" achievement entry from
  `src/data/mockData.js`.
