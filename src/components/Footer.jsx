import { Link } from '../lib/router';
import { useInView, useReducedMotion } from '../lib/hooks';
import { contact, hero, person, tenure } from '../content/site';
import { recentEvents } from '../content/achievements';
import { certifications } from '../content/profile';
import { projectPages } from '../content/projects';
import { operatingModel } from '../content/method';
import { DocButton } from './DocumentViewer';
import { ChevronIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons';
import styles from './Footer.module.css';

const EXPLORE = [
  { to: '/projects', label: 'Projects' },
  { to: '/case-studies', label: 'Case studies' },
  { to: '/journey', label: 'Journey' },
];
const ABOUT = [
  { to: '/about', label: 'About' },
  { to: '/how-i-work', label: 'How I work' },
  { to: '/contact', label: 'Contact' },
];
const featured = projectPages.filter((p) => p.featured).slice(0, 4);
const latest = recentEvents[0];
const named = ['Certified ScrumMaster® (CSM®)', 'Certified Tester Foundation Level'];
const credentials = `CSM®, ISTQB® CTFL and ${certifications.length - named.length} more`;

const SOCIAL = [
  { href: `mailto:${contact.email}`, label: 'Email', Icon: MailIcon },
  { href: contact.linkedin, label: 'LinkedIn', Icon: LinkedInIcon, external: true },
  { href: contact.github, label: 'GitHub', Icon: GitHubIcon, external: true },
];

export default function Footer() {
  const reduced = useReducedMotion();
  const [trackRef, seen] = useInView(0.6);
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.home} aria-label={`${person.name}, home`}>
            <span className={styles.mark} aria-hidden="true">MA</span>
            <span className={styles.brandText}>
              <span className={styles.name}>{person.name}</span>
              <span>{person.title}</span>
            </span>
          </Link>
          <p className={styles.pitch}>{hero.headline} Enterprise dealership SaaS at {person.company}.</p>
          <ul className={styles.social}>
            {SOCIAL.map(({ href, label, Icon, external }) => (
              <li key={label}>
                <a href={href} aria-label={label} title={label} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
                  <Icon width="18" height="18" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className={styles.cols} aria-label="Footer">
          <div>
            <h2 className={styles.colTitle}>Explore</h2>
            <ul>{EXPLORE.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className={styles.colTitle}>About</h2>
            <ul>
              {ABOUT.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
              <li><DocButton src={contact.resumeLight} title="Résumé" download className={styles.linkButton}>Résumé</DocButton></li>
            </ul>
          </div>
          <div className={styles.featured}>
            <h2 className={styles.colTitle}>Featured case studies</h2>
            <ul>{featured.map((p) => <li key={p.slug}><Link to={`/case-studies/${p.slug}`}>{p.name}</Link></li>)}</ul>
          </div>
        </nav>
      </div>

      <div className="container">
        <dl className={styles.facts}>
          <div>
            <dt>Experience</dt>
            <dd>{tenure} years in enterprise dealership SaaS</dd>
            <dd className={styles.sub}>From QA to product analysis</dd>
          </div>
          <div>
            <dt>Latest event</dt>
            <dd><Link to={latest.to || '/journey'}>{latest.title}</Link></dd>
            <dd className={styles.sub}>{latest.label}, {latest.when}</dd>
          </div>
          <div>
            <dt>Credentials</dt>
            <dd><Link to="/about">{credentials}</Link></dd>
            <dd className={styles.sub}>{certifications.length} certifications in total</dd>
          </div>
          <div>
            <dt>Now</dt>
            <dd className={styles.now}>{hero.now}</dd>
          </div>
        </dl>
      </div>

      <div className={`container ${styles.trackRow}`}>
        <p className={styles.trackTitle}>From idea to launch</p>
        <ol ref={trackRef} className={`${styles.track} ${seen && !reduced ? styles.moving : ''}`} aria-label="The six stages of how I work">
          {operatingModel.map((s) => <li key={s.name}><span className={styles.node} aria-hidden="true" />{s.name}</li>)}
        </ol>
        <Link to="/how-i-work" className={styles.trackLink}>How I work</Link>
      </div>

      <div className={`container ${styles.base}`}>
        <p>© {new Date().getFullYear()} {person.name}</p>
        <button type="button" className={styles.toTop} onClick={toTop}>
          Back to top <ChevronIcon width="16" height="16" className={styles.up} />
        </button>
      </div>
    </footer>
  );
}
