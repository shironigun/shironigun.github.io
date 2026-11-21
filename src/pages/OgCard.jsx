import { projects } from '../content/projects';
import { pictureFor } from './OgPictures';
import styles from './OgCard.module.css';

// Link-preview cards (1200x627), one per project. Not linked from the site: scripts/og-images.mjs
// screenshots /og/<slug> into public/images/previews/<slug>.png, which the case-study pages, the
// labs page and LinkedIn use as their preview image.

// Work shown on LinkedIn that has no page on the site.
const EXTRA = [
  {
    slug: 'beacon',
    name: 'Beacon',
    summary: 'A dashboard and report generator for the support team’s board: every number recalculates from the filters you choose.',
    role: 'Found the problem, specified the solution, reviewed the results',
    tags: ['Product', 'AI'],
  },
];

const TAG_COLOUR = {
  Product: 'var(--c-product)',
  Design: 'var(--c-design)',
  AI: 'var(--c-ai)',
  Quality: 'var(--c-quality)',
  'Personal builds': 'var(--c-personal)',
};

export const ogSlugs = [...projects, ...EXTRA].map((p) => p.slug);

export default function OgCard({ slug }) {
  const p = [...projects, ...EXTRA].find((x) => x.slug === slug);
  if (!p) return <p>No project called {slug}.</p>;
  const [value, label] = p.kpi || [];
  const pic = pictureFor(slug);

  return (
    <div className={styles.card} style={{ '--accent': pic.accent, '--wash': pic.wash }}>
      <div className={styles.text}>
        <ul className={styles.tags}>
          {(p.tags || []).slice(0, 3).map((t) => (
            <li key={t} style={{ '--tag': TAG_COLOUR[t] || 'var(--quiet)' }}>{t}</li>
          ))}
        </ul>
        <h1 className={styles.title}>{p.name}</h1>
        <p className={styles.summary}>{p.summary}</p>
        {value ? (
          <p className={styles.kpi}>
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
          </p>
        ) : (
          <p className={styles.role}>{p.role}</p>
        )}
        <p className={styles.foot}><strong>Mahmood Ahmad</strong> AI Product Analyst · shironigun.github.io</p>
      </div>
      <div className={styles.art}>{pic.svg}</div>
    </div>
  );
}
