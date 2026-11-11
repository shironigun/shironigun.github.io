import { Link, useDocumentTitle } from '../lib/router';
import PageHeader from '../components/PageHeader';
import ProjectBoard from '../components/ProjectBoard';
import { projectPages, projects } from '../content/projects';
import styles from './Pages.module.css';

export default function Projects() {
  useDocumentTitle('Projects: Mahmood Ahmad');
  return (
    <>
      <PageHeader
        art="board"
        crumbs={[{ label: 'Projects' }]}
        title="Projects"
        lead={
          <>
            Every project at a glance: {projects.length} projects across product, design, AI and quality, each with my role and current status.
            Open any card for the full ticket, or switch to the roadmap to see them by quarter. {projectPages.length} have a full write-up on
            the <Link to="/case-studies">case studies</Link> page.
          </>
        }
      />
      <section className={`section ${styles.boardSection}`} aria-labelledby="index-title">
        <h2 id="index-title" className="visually-hidden">Projects board</h2>
        <ProjectBoard />
      </section>
    </>
  );
}
