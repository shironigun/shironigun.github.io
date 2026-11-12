import { Link } from '../lib/router';
import Status from './Status';
import Thumb from './visuals/Thumbs';
import styles from './ProjectCard.module.css';

// One card design for every case study, on Home and on the case studies page.
export default function ProjectCard({ project }) {
  return (
    <Link to={`/case-studies/${project.slug}`} className={styles.card}>
      {project.cover ? (
        <span className={styles.cover}><img src={project.cover} alt="" loading="lazy" /></span>
      ) : (
        <Thumb kind={project.thumb} />
      )}
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
