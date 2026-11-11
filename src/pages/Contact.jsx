import { Link, useDocumentTitle } from '../lib/router';
import PageHeader from '../components/PageHeader';
import { DocButton } from '../components/DocumentViewer';
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from '../components/Icons';
import { contact, person } from '../content/site';
import styles from './Pages.module.css';

export default function Contact() {
  useDocumentTitle('Contact: Mahmood Ahmad');
  return (
    <>
      <PageHeader art="signal" crumbs={[{ label: 'Contact' }]} title="Contact" lead={person.availability} />
      <section className="section">
        <div className={`container ${styles.contactGrid}`}>
          <div className={styles.contactCard}>
            <h2>Get in touch</h2>
            <p>Email is the quickest way to reach me.</p>
            <div className={styles.contactActions}>
              <a href={`mailto:${contact.email}`} className="btn btn-primary"><MailIcon />Email me</a>
              <a href={contact.linkedin} target="_blank" rel="noopener" className="btn btn-secondary"><LinkedInIcon />LinkedIn</a>
              <a href={contact.whatsapp} target="_blank" rel="noopener" className="btn btn-secondary"><WhatsAppIcon />WhatsApp</a>
            </div>
            <p className={styles.muted}>{contact.email}</p>
          </div>

          <div className={styles.contactCard}>
            <h2>For hiring managers</h2>
            <p>The three things worth opening first.</p>
            <ul className={styles.list}>
              <li><DocButton src={contact.resumeLight} title="Résumé" download className={styles.certLink}>Résumé</DocButton><span className={styles.muted}>Also as a <DocButton src={contact.resumeDark} title="Résumé, dark version" download className={styles.inlineDoc}>dark version</DocButton></span></li>
              <li><Link to="/case-studies/promise-tracker">AI Promise Tracker case study</Link><span className={styles.muted}>An AI feature I led from idea to launch</span></li>
              <li><a href={contact.pluginRepo} target="_blank" rel="noopener">QA Engineering Plugin on GitHub</a><span className={styles.muted}>Open source</span></li>
            </ul>
            <div className={styles.contactActions}>
              <DocButton src={contact.resumeLight} title="Résumé" download className="btn btn-secondary"><DownloadIcon />Résumé</DocButton>
              <a href={contact.github} target="_blank" rel="noopener" className="btn btn-secondary"><GitHubIcon />GitHub</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
