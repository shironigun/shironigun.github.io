import { useState } from 'react';
import { Link, useDocumentTitle } from '../lib/router';
import PageHeader from '../components/PageHeader';
import CountUp from '../components/CountUp';
import { ProjectGrid } from '../components/ProjectCard';
import { categories, projectPages, projects } from '../content/projects';
import styles from './Pages.module.css';

const countIn = (c) => projectPages.filter((p) => p.tags.includes(c)).length;

export default function CaseStudies() {
  useDocumentTitle('Case studies: Mahmood Ahmad');
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? projectPages : projectPages.filter((p) => p.tags.includes(filter));
  const inUse = categories.filter((c) => countIn(c) > 0);

  return (
    <>
      <PageHeader
        art="casefiles"
        crumbs={[{ label: 'Case studies' }]}
        title="Case studies"
        lead="Detailed accounts of selected work: the problem, my approach, the outcome, and a clear split between what I decided, what AI built and what the team delivered."
      >
        <dl className={styles.statBand}>
          <div><dt>Case studies</dt><dd><CountUp value={String(projectPages.length)} /></dd></div>
          {inUse.slice(0, 3).map((c) => (
            <div key={c}><dt>{c}</dt><dd><CountUp value={String(countIn(c))} /></dd></div>
          ))}
        </dl>
      </PageHeader>

      <section className="section" aria-labelledby="cases-title">
        <div className="container">
          <div className={styles.listHead}>
            <h2 id="cases-title" className={styles.subhead}>{filter === 'All' ? 'All case studies' : `${filter} case studies`} ({shown.length})</h2>
            <div className={styles.filterRow} role="toolbar" aria-label="Filter case studies">
              {['All', ...inUse].map((c) => (
                <button key={c} type="button" className={styles.filterChip} aria-pressed={filter === c} onClick={() => setFilter(c)}>
                  {c} <span>{c === 'All' ? projectPages.length : countIn(c)}</span>
                </button>
              ))}
            </div>
          </div>
          <ProjectGrid projects={shown} />
          <p className={styles.muted} style={{ marginTop: 'var(--s-6)' }}>
            Looking for everything, including the smaller projects? <Link to="/projects">See all {projects.length} projects</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
