import { Link } from '../lib/router';
import Status from './Status';
import styles from './ProjectCard.module.css';

// Each project's preview card (public/images/previews, made by scripts/og-images.mjs): the same
// picture people see when a link to the project is shared.
export const previewOf = (p) => `/images/previews/${p.slug}.png?v=2026-11-21e`;

// One card design for every case study, on Home and on the case studies page.
export default function ProjectCard({ project }) {
  return (
    <Link to={`/case-studies/${project.slug}`} className={styles.card}>
      <span className={styles.preview}><img src={previewOf(project)} alt="" loading="lazy" /></span>
      <span className={styles.body}>
        <span className={styles.meta}><Status status={project.status} /><span>{project.when || project.year.replace('–', ' to ')}</span></span>
        <span className={styles.title}>{project.name}</span>
        <span className={styles.summary}>{project.summary}</span>
        <span className={styles.role}>{project.role}</span>
      </span>
    </Link>
  );
}

// `dense` adds a fourth column on very wide screens, for long lists such as the case studies page.
export function ProjectGrid({ projects, dense }) {
  return (
    <ul className={`${styles.grid} ${dense ? styles.dense : ''}`}>
      {projects.map((p) => <li key={p.slug}><ProjectCard project={p} /></li>)}
    </ul>
  );
}
