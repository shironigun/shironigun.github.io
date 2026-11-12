import { Link, useDocumentTitle } from '../lib/router';
import HeaderArt from '../components/HeaderArt';
import { articles } from '../content/writing';
import { ChevronIcon } from '../components/Icons';
import NotFound from './NotFound';
import styles from './Article.module.css';

export default function Article({ slug }) {
  const article = articles.find((a) => a.slug === slug);
  useDocumentTitle(article ? `${article.title}: Mahmood Ahmad` : 'Page not found: Mahmood Ahmad');
  if (!article) return <NotFound />;
  const others = articles.filter((a) => a.slug !== slug);

  // On wide screens the illustration and the other perspectives sit beside the text; otherwise the
  // other perspectives follow it.
  return (
    <article className={`container ${styles.article}`}>
      <Link to="/how-i-work#perspectives" className={styles.back}><ChevronIcon width="16" height="16" />Back to How I work</Link>
      <div className={styles.layout}>
        <div className={styles.main}>
          <header className={styles.header}>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.meta}>{article.date}, {article.readTime}</p>
          </header>
          <div className={styles.body}>
            {article.body.map((b, i) =>
              b.type === 'heading' ? <h2 key={i}>{b.text}</h2> : <p key={i}>{b.text}</p>
            )}
          </div>
        </div>
        <aside className={styles.aside} aria-labelledby="more-title">
          <HeaderArt kind="lines" className={styles.art} />
          {others.length > 0 && (
            <div className={styles.more}>
              <h2 id="more-title">More perspectives</h2>
              <ul>
                {others.map((a) => (
                  <li key={a.slug}>
                    <Link to={`/writing/${a.slug}`}>{a.title}</Link>
                    <span>{a.date}, {a.readTime}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
