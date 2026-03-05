# Mahmood Ahmad — Portfolio v2.0

A production-grade portfolio built with the **latest** React 19 + Vite 6 + MUI v6 + Framer Motion v12.

## 🚀 Quick Start

```bash
npm install
npm run dev
# → http://localhost:5173
```

## 📦 Tech Stack (Latest Versions as of 2026)

| Library | Version | Why |
|---------|---------|-----|
| `react` + `react-dom` | **19.0** | Concurrent features, improved hydration |
| `vite` | **6.2** | Faster cold starts, Rolldown bundler |
| `@mui/material` | **6.4** | `cssVariables`, `colorSchemes`, Grid2, updated tokens |
| `@mui/icons-material` | **6.4** | Latest icon set |
| `framer-motion` | **12.4** | `motion.create()` API, AnimatePresence v2 |
| `react-intersection-observer` | **9.15** | Scroll-triggered animations |
| `@emotion/react` + `styled` | **11.14** | MUI styling engine |
| `@vitejs/plugin-react` | **4.3** | SWC transforms, fast HMR |

## ⚠️ Breaking Changes Handled

### MUI v6
- **`colorSchemes`** replaces `palette.mode` — dark mode now via `defaultMode="dark"`
- **`Grid2`** (size-based API) replaces old `Grid` with `item`/`xs`/`md` props
  - Old: `<Grid item xs={12} md={6}>`
  - New: `<Grid2 size={{ xs: 12, md: 6 }}>`
- **`cssVariables: true`** enables CSS custom properties for better theming
- **`InitColorSchemeScript`** prevents flash of wrong theme on load
- `MuiLinearProgress` uses `backgroundColor` not `background` for track

### Framer Motion v12
- **`motion.create()`** replaces `motion()` for wrapping MUI components
  - Old: `const MotionBox = motion(Box)`
  - New: `const MotionBox = motion.create(Box)`
- **`AnimatePresence mode="wait"`** for clean enter/exit transitions
- Spring physics API unchanged

### React 19
- `createRoot` is now the only way to mount (no `ReactDOM.render`)
- Stricter StrictMode — double-invocation in dev is expected
- `useEffect` cleanup is more strictly enforced

### Vite 6
- `build.target: 'esnext'` for modern output
- Manual chunks in `rollupOptions` for better code splitting

## 📁 Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Animated nav with mobile drawer
│   ├── Hero.jsx            # Canvas dots + typewriter + framer hero
│   ├── About.jsx           # Bio with staggered fade-up
│   ├── Skills.jsx          # Tabbed animated progress bars
│   ├── Tools.jsx           # Devicon icons with spring hover
│   ├── Experience.jsx      # Tabs + AnimatePresence transitions
│   ├── Certifications.jsx  # Spring-animated cert cards
│   ├── Testimonials.jsx    # AnimatePresence carousel
│   ├── Resume.jsx          # Sticky preview + resume doc
│   ├── Connect.jsx         # Channels + contact form
│   ├── Footer.jsx          # Footer + pulsing WhatsApp FAB
│   └── CustomCursor.jsx    # Custom cursor ring
├── data/mockData.js        # All content (single source of truth)
├── hooks/useScrollReveal.js
├── theme/theme.js          # MUI v6 theme with cssVariables
├── App.jsx
└── main.jsx
```

## 🏗️ Build

```bash
npm run build    # Outputs to /dist
npm run preview  # Preview production build
```
