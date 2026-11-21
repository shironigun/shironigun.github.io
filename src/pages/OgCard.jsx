import { projects } from '../content/projects';
import { pictureFor } from './OgPictures';
import styles from './OgCard.module.css';

// Link-preview cards (1200x627), one per project. Not linked from the site: scripts/og-images.mjs
// screenshots /og/<slug> into public/images/previews/<slug>.png, which the case-study pages, the
// labs page and LinkedIn use as their preview image. A preview is glanced at, not read: the name,
// one number and the picture, nothing more.

// Work shown on LinkedIn that has no page on the site.
const EXTRA = [
  { slug: 'beacon', name: 'Beacon', line: 'Every number follows your filters', tags: ['Product'] },
];

export const ogSlugs = [...projects, ...EXTRA].map((p) => p.slug);

export default function OgCard({ slug }) {
  const p = [...projects, ...EXTRA].find((x) => x.slug === slug);
  if (!p) return <p>No project called {slug}.</p>;
  const [value, label] = p.kpi || [];
  const pic = pictureFor(slug);

  return (
    <div className={styles.card} style={{ '--accent': pic.accent, '--wash': pic.wash, '--tint': pic.tint }}>
      <div className={styles.text}>
        <p className={styles.tag}>{(p.tags || [])[0]}</p>
        <h1 className={`${styles.title} ${p.name.length > 42 ? styles.long : ''}`}>{p.name}</h1>
        {value ? (
          <p className={styles.kpi}>
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
          </p>
        ) : (
          <p className={styles.line}>{p.line}</p>
        )}
        <p className={styles.foot}><strong>Mahmood Ahmad</strong> shironigun.github.io</p>
      </div>
      <div className={styles.art}>
        <span className={styles.halo} />
        <span className={`${styles.dot} ${styles.d1}`} />
        <span className={`${styles.dot} ${styles.d2}`} />
        <span className={`${styles.dot} ${styles.d3}`} />
        <div className={styles.tile}>{pic.svg}</div>
      </div>
    </div>
  );
}
