import { Link } from '../lib/router';
import { contact, person } from '../content/site';
import { DownloadIcon, LinkedInIcon, MailIcon } from './Icons';
import { DocButton } from './DocumentViewer';
import styles from './CtaBand.module.css';

// The same closing call to action on every page, so the next step is always one click away.
export default function CtaBand() {
  return (
    <section className={styles.band} aria-labelledby="cta-title">
      <div className={`container ${styles.inner}`}>
        <div>
          <h2 id="cta-title" className={styles.title}>Looking to take an AI product from idea to launch?</h2>
          <p className={styles.text}>
            <span className={styles.dot} aria-hidden="true" />
            {person.availability}
          </p>
        </div>
        <div className={styles.actions}>
          <a href={`mailto:${contact.email}`} className="btn btn-light"><MailIcon />Email me</a>
          <a href={contact.linkedin} target="_blank" rel="noopener" className="btn btn-ghost-night"><LinkedInIcon />LinkedIn</a>
          <DocButton src={contact.resumeLight} title="Résumé" download className="btn btn-ghost-night"><DownloadIcon />Résumé</DocButton>
          <Link to="/contact" className={styles.more}>All contact options</Link>
        </div>
      </div>
    </section>
  );
}
