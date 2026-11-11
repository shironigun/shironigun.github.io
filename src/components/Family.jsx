import { Link } from '../lib/router';
import { projects } from '../content/projects';
import Status from './Status';
import { ChevronIcon } from './Icons';
import styles from './Family.module.css';

// The children of a parent project (the plugins of the marketplace), as a grid of cards in the order
// they were built. On a child's own page the current one is marked, so the grid doubles as a map of
// where the reader is.
export const childrenOf = (slug) => projects.filter((p) => p.parent === slug);

export default function Family({ parent, current, title }) {
  const kids = childrenOf(parent);
  if (!kids.length) return null;
  return (
    <div className={styles.family}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <ul className={styles.grid}>
        {kids.map((p) => (
          <li key={p.slug} className={styles.item}>
            <Link
              to={`/case-studies/${p.slug}`}
              className={`${styles.card} ${p.slug === current ? styles.current : ''}`}
              aria-current={p.slug === current ? 'page' : undefined}
            >
              <span className={styles.top}>
                <span className={styles.when}>{p.when}</span>
                <Status status={p.status} />
              </span>
              <span className={styles.name}>{p.name}</span>
              <span className={styles.sum}>{p.summary}</span>
              {p.kpi && <span className={styles.kpi}><strong>{p.kpi[0]}</strong> {p.kpi[1]}</span>}
              <span className={styles.more}>{p.slug === current ? 'You are here' : 'Read the case study'}<ChevronIcon width="14" height="14" aria-hidden="true" /></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
