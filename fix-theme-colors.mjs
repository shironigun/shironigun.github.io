import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "src", "components");
const files = readdirSync(dir).filter(
  f => f.endsWith(".jsx") && f !== "ThemeToggle.jsx"
);

// Order matters! Longer/compound patterns first, then simpler ones.
const replacements = [
  // ── COMPOUND PATTERNS FIRST ──

  // Section gradients (exact match)
  [
    "linear-gradient(180deg,transparent,rgba(29,106,255,0.025),transparent)",
    "var(--gradient-section)",
  ],
  [
    "linear-gradient(180deg,transparent,rgba(29,106,255,0.02),transparent)",
    "var(--gradient-section)",
  ],
  [
    "linear-gradient(180deg,rgba(29,106,255,0.025),transparent)",
    "var(--gradient-section)",
  ],

  // Radial gradients for section backgrounds
  [
    "radial-gradient(ellipse at 50% 50%, rgba(29,106,255,0.04), transparent 70%)",
    "var(--gradient-radial)",
  ],
  [
    "radial-gradient(ellipse at 50% 50%, rgba(29,106,255,0.05), transparent 70%)",
    "var(--gradient-radial)",
  ],
  [
    "radial-gradient(ellipse at 50% 0%,rgba(29,106,255,0.07),transparent 60%)",
    "var(--gradient-radial-top)",
  ],

  // Resume thumb gradient (before #061325 replacement)
  ["linear-gradient(160deg,#0a1628,#061325)", "var(--dialog-bg-gradient)"],
  // Cert fallback gradient
  [
    "linear-gradient(160deg,#0a1628,var(--dialog-bg))",
    "var(--dialog-bg-gradient)",
  ], // in case #061325 already replaced

  // Shadow
  ["0 20px 60px rgba(0,0,0,0.5)", "var(--shadow-heavy)"],

  // ── DIALOG / DROPDOWN / NAV BACKGROUNDS ──
  // Must match the full pattern including quotes
  // Dropdown bg variants
  ["rgba(6,19,37,0.97)", "var(--dropdown-bg)"],
  ["rgba(6,19,37,0.98)", "var(--dropdown-bg)"],
  ["rgba(6,19,37,0.95)", "var(--dropdown-bg)"],

  // Nav bg
  ["rgba(3,13,26,0.9)", "var(--nav-bg)"],

  // Dialog bg
  ["#061325", "var(--dialog-bg)"],

  // ── GLASS BACKGROUNDS (white alpha 0.02-0.06) ──
  ["rgba(255,255,255,0.035)", "var(--glass-bg)"],
  ["rgba(255,255,255,0.04)", "var(--glass-bg)"],
  ["rgba(255,255,255,0.03)", "var(--glass-bg)"],
  ["rgba(255,255,255,0.02)", "var(--glass-bg)"],
  ["rgba(255,255,255,0.05)", "var(--glass-bg)"],
  ["rgba(255,255,255,0.06)", "var(--glass-bg)"],

  // ── GLASS DIVIDERS (0.07) ──
  ["rgba(255,255,255,0.07)", "var(--glass-divider)"],

  // ── GLASS BORDERS (0.08-0.1) ──
  ["rgba(255,255,255,0.08)", "var(--glass-border)"],
  ["rgba(255,255,255,0.09)", "var(--glass-border)"],
  ["rgba(255,255,255,0.1)", "var(--glass-border)"],

  // ── GLASS HOVER (0.12, 0.15) ──
  ["rgba(255,255,255,0.12)", "var(--glass-hover)"],
  ["rgba(255,255,255,0.15)", "var(--glass-hover)"],

  // ── TEXT ON GLASS ──
  ["rgba(255,255,255,0.65)", "var(--text-on-glass)"],

  // ── ACCENT GLOW VARIANTS ──
  ["rgba(29,106,255,0.07)", "var(--accent-glow)"],
  ["rgba(29,106,255,0.08)", "var(--accent-glow)"],
  ["rgba(29,106,255,0.1)", "var(--accent-glow-mild)"],
  ["rgba(29,106,255,0.12)", "var(--accent-glow-mild)"],
  ["rgba(29,106,255,0.18)", "var(--accent-glow-strong)"],
  ["rgba(29,106,255,0.22)", "var(--accent-glow-strong)"],
  ["rgba(29,106,255,0.2)", "var(--accent-border)"],

  // ── ACCENT BORDER (standalone border colors) ──
  // These are for `border: '1px solid rgba(29,106,255,0.3)'` type patterns
  // Leaving these partially - the accent blue works in both modes

  // ── CODE COLORS ──
  // #00c8ff when used as text color for monospace/code elements
  // Be careful - don't replace in gradient contexts or cursor/animation contexts
  // We'll handle #00c8ff manually for specific contexts

  // ── INLINE STYLE HELPERS ──
  [
    "color: '#00c8ff', background: 'rgba(0,200,255,0.08)'",
    "color: 'var(--code-color)', background: 'var(--code-bg)'",
  ],
  ["color: '#00c8ff'", "color: 'var(--code-color)'"],

  // Code tags in inline styles (JSX)
  ["color: '#eef2fb'", "color: 'var(--strong-inline)'"],

  // Inline <code> style
  [
    "style={{ color: 'var(--code-color)', background: 'var(--code-bg)', padding: '2px 6px', borderRadius: 4 }}",
    "style={{ color: 'var(--code-color)', background: 'var(--code-bg)', padding: '2px 6px', borderRadius: 4 }}",
  ],
];

let totalChanges = 0;

for (const file of files) {
  const filePath = join(dir, file);
  let content = readFileSync(filePath, "utf8");
  const original = content;
  let fileChanges = 0;

  for (const [find, replace] of replacements) {
    if (find === replace) continue; // skip identity replacements

    // Use simple string replacement (all occurrences)
    let count = 0;
    while (content.includes(find)) {
      content = content.replace(find, replace);
      count++;
    }
    if (count > 0) {
      fileChanges += count;
    }
  }

  if (content !== original) {
    writeFileSync(filePath, content, "utf8");
    console.log(`✓ ${file}: ${fileChanges} replacements`);
    totalChanges += fileChanges;
  } else {
    console.log(`  ${file}: no changes`);
  }
}

console.log(
  `\nTotal: ${totalChanges} replacements across ${files.length} files`
);
