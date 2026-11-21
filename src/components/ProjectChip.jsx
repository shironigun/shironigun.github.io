import { Link } from '../lib/router';
import { projects } from '../content/projects';
import { coverVars, ProjectIcon } from './board/parts';
import styles from './ProjectChip.module.css';

// A milestone's linked project, shown like a linked item on a ticket: the project's own picture
// and colour (the same as its preview card and board cover), its name and its key number. It is the
// link to the case study. Returns null when the link is not a project's case study.
export const projectFor = (to) => {
  const m = /^\/case-studies\/([\w-]+)$/.exec(to || '');
  return m ? projects.find((p) => p.slug === m[1]) || null : null;
};

export default function ProjectChip({ to, tone = 'light' }) {
  const p = projectFor(to);
  if (!p) return null;
  const [value, label] = p.kpi || [];
  return (
    <Link to={to} className={`${styles.chip} ${styles[tone]}`} style={coverVars(p.slug)}>
      <ProjectIcon slug={p.slug} />
      <span className={styles.text}>
        <span className={styles.name}>{p.name}</span>
        <span className={styles.sub}>{value ? <><strong>{value}</strong> {label}</> : 'Case study'}</span>
      </span>
      <span className={styles.tag}>Case study</span>
    </Link>
  );
}
