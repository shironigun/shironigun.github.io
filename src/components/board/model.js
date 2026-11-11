import { categories, projects } from '../../content/projects';

// The Projects page's data model: every project as a board card, the kanban columns, the roadmap
// lanes, and the helpers both views and the project popup share.

export const FIRST = 2023;
export const NOW = 2026;
export const YEARS = [2023, 2024, 2025, 2026];
export const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
export const LANE = { Product: 'product', Design: 'design', AI: 'ai', Quality: 'quality', 'Personal builds': 'personal' };
export const laneVar = (tag) => `var(--c-${LANE[tag]})`;

// '2024-Q3' -> { year: 2024, q: 3 }
const parseQ = (s) => ({ year: parseInt(s.slice(0, 4), 10), q: parseInt(s.slice(-1), 10) });
export const qIndex = ({ year, q }) => (year - FIRST) * 4 + (q - 1);
const qLabel = ({ year, q }) => `Q${q} ${year}`;

function span(p) {
  if (p.quarters) {
    const from = parseQ(p.quarters[0]);
    const to = parseQ(p.quarters[1]);
    return { start: from.year, end: to.year, from, to };
  }
  const [a, b = a] = p.year.split(/[–-]/).map((y) => parseInt(y, 10));
  return { start: Math.max(a, FIRST), end: Math.min(b, NOW), from: { year: a, q: 1 }, to: { year: b, q: 4 } };
}

// A card's documents and headline numbers live in its case study, which loads on demand (useStudy).
export const items = projects.map((p, i) => ({
  ...p,
  id: `MA-${101 + i}`,
  lane: p.tags[0],
  ...span(p),
}));

export const period = (p) => p.when || p.year.replace('–', ' to ');
export function quarterRange(p) {
  if (qIndex(p.from) === qIndex(p.to)) return qLabel(p.from);
  if (p.from.year === p.to.year) return `Q${p.from.q} to Q${p.to.q} ${p.to.year}`;
  return `${qLabel(p.from)} to ${qLabel(p.to)}`;
}

// Most recent work first.
const byRecency = (a, b) => qIndex(b.to) - qIndex(a.to) || qIndex(b.from) - qIndex(a.from);

// Kanban columns are workflow states.
export const COLUMNS = [
  { key: 'progress', title: 'In progress', hint: 'Being explored or built now', statuses: ['ongoing', 'development'] },
  { key: 'pilot', title: 'In pilot', hint: 'Built and being piloted before release', statuses: ['pilot'] },
  { key: 'live', title: 'Live and in use', hint: 'Part of how teams work today', statuses: ['practice', 'live'] },
  { key: 'done', title: 'Done', hint: 'Delivered and wrapped up', statuses: ['completed'] },
].map((c) => ({ ...c, items: items.filter((p) => c.statuses.includes(p.status)).sort(byRecency) }));

// Roadmap lanes are disciplines; within a lane, earliest first, longest first.
export const lanes = categories
  .map((name) => ({
    name,
    key: LANE[name],
    items: items
      .filter((p) => p.lane === name)
      .sort((a, b) => qIndex(a.from) - qIndex(b.from) || (qIndex(b.to) - qIndex(b.from)) - (qIndex(a.to) - qIndex(a.from))),
  }))
  .filter((l) => l.items.length);

export const disciplines = categories;
export const findItem = (slug) => items.find((p) => p.slug === slug) || null;
