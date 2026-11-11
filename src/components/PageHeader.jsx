import { Link } from '../lib/router';
import HeaderArt from './HeaderArt';
import styles from './PageHeader.module.css';

// Every inner page opens the same way: where you are, what this is, why it matters.
export default function PageHeader({ crumbs = [], kicker, title, lead, art, children }) {
  return (
    <header className={styles.header}>
      {art && <HeaderArt kind={art} />}
      <div className="container">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <ol>
              <li><Link to="/">Home</Link></li>
              {crumbs.map((c) => (
                <li key={c.label}>
                  {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {kicker && <div className={styles.kicker}>{kicker}</div>}
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
        {children}
      </div>
    </header>
  );
}
