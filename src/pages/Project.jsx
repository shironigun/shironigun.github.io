import { useEffect, useRef, useState } from 'react';
import { Link, useDocumentTitle } from '../lib/router';
import { parentOf, projectPages } from '../content/projects';
import { useStudy } from '../content/caseStudies';
import HeaderArt, { artForTags } from '../components/HeaderArt';
import ArticleBody, { chapters, wordCount } from '../components/ArticleBody';
import { DocButton } from '../components/DocumentViewer';
import Status from '../components/Status';
import Family from '../components/Family';
import { BookIcon, ChevronIcon } from '../components/Icons';
import NotFound from './NotFound';
import styles from './CaseStudy.module.css';

// Every case study, with each plugin under the marketplace that owns it. Wide screens only: it fills
// the left of the page and lets a reader move between stories without going back to the list.
function CaseShelf({ current }) {
  const box = useRef(null);
  // Bring the open story into view inside the list, without moving the page.
  useEffect(() => {
    const here = box.current?.querySelector('[aria-current="page"]');
    if (here) box.current.scrollTop = Math.max(0, here.offsetTop - box.current.clientHeight / 3);
  }, [current]);
  const kids = (slug) => projectPages.filter((p) => p.parent === slug);
  const item = (p) => (
    <Link to={`/case-studies/${p.slug}`} aria-current={p.slug === current ? 'page' : undefined}>{p.name}</Link>
  );
  return (
    <nav ref={box} className={styles.shelf} aria-labelledby="shelf-title">
      <h2 id="shelf-title" className={styles.tocTitle}>Case studies</h2>
      <ul className={styles.shelfList}>
        {projectPages.filter((p) => !p.parent).map((p) => (
          <li key={p.slug}>
            {item(p)}
            {kids(p.slug).length > 0 && <ul>{kids(p.slug).map((c) => <li key={c.slug}>{item(c)}</li>)}</ul>}
          </li>
        ))}
      </ul>
    </nav>
  );
}

// A case study is an article: headline and standfirst, then any documents it produced (so a
// presentation or report is the first thing a reader can open), the byline, and the story itself.
// On wide screens it reads in three columns: every case study, the story, and its chapters.
export default function Project({ slug }) {
  const index = projectPages.findIndex((p) => p.slug === slug);
  const project = projectPages[index];
  const { study, loading, failed } = useStudy(project ? slug : null);
  useDocumentTitle(project ? `${project.name}: Mahmood Ahmad` : 'Page not found: Mahmood Ahmad');
  // The chapter in view, so the sidebar can show where the reader is.
  const [activeChapter, setActiveChapter] = useState(null);
  useEffect(() => {
    if (!study) return undefined;
    const heads = [...document.querySelectorAll('article h2[id^="s-"]')];
    if (!heads.length) return undefined;
    const io = new IntersectionObserver((entries) => {
      const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (hit) setActiveChapter(hit.target.id);
    }, { rootMargin: '-80px 0px -65% 0px' });
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [study]);
  // The story arrives after the router has already tried the address's chapter link, so try it again.
  useEffect(() => {
    if (!study || !window.location.hash) return;
    document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView({ block: 'start' });
  }, [study]);
  if (!project || (!study && !loading && !failed)) return <NotFound />;
  if (!study) {
    return (
      <article className={styles.article}>
        <div className={`container ${styles.layout}`}>
          <header className={styles.header}>
            <p className={styles.kicker}><span className={styles.kickerName}>{project.name}</span></p>
            <h1 className={styles.title}>{project.question}</h1>
            <p className={styles.standfirst}>{project.page.lead}</p>
          </header>
          <div className={styles.main}>
            <p role="status" className={styles.loading}>
              {failed ? 'This story didn’t load. Check your connection and refresh the page.' : 'Loading the story…'}
            </p>
          </div>
        </div>
      </article>
    );
  }

  const prev = projectPages[(index - 1 + projectPages.length) % projectPages.length];
  const next = projectPages[(index + 1) % projectPages.length];
  const { page } = project;
  const minutes = Math.max(2, Math.round(wordCount(study.body) / 220));
  const when = project.when || project.year.replace('–', ' to ');
  // Role and dates are in the byline; the rest of the record sits just below it.
  const facts = page.facts.filter((f) => !['My role', 'When'].includes(f.label));
  // A longer story gets a chapter list, so a reader can jump to the part they came for.
  const toc = chapters(study.body);
  // A plugin belongs to the marketplace: the breadcrumb and kicker say so, and its siblings follow the story.
  const parent = parentOf(project);
  const hasToc = toc.length >= 4;

  return (
    <article className={styles.article}>
      <div className={`container ${styles.layout} ${hasToc ? styles.withToc : ''}`}>
        <header className={styles.header}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/case-studies">Case studies</Link></li>
              {parent && <li><Link to={`/case-studies/${parent.slug}`}>{parent.name}</Link></li>}
              <li><span aria-current="page">{project.name}</span></li>
            </ol>
          </nav>
          <p className={styles.kicker}>
            <span className={styles.kickerName}>{project.name}</span>
            <Status status={project.status} />
            {parent && <Link to={`/case-studies/${parent.slug}`} className={styles.partOf}>Part of the {parent.name}</Link>}
          </p>
          <h1 className={styles.title}>{project.question}</h1>
          <p className={styles.standfirst}>{page.lead}</p>

          {study.documents && (
            <section className={styles.docs} aria-labelledby="documents-title">
              <h2 id="documents-title" className={styles.docsTitle}>{study.documents.length > 1 ? 'The documents' : 'The document'}</h2>
              <ul className={styles.docList}>
                {study.documents.map((d) => (
                  <li key={d.href} className={styles.doc}>
                    <span className={styles.docIcon} aria-hidden="true"><BookIcon width="20" height="20" /></span>
                    <span className={styles.docText}>
                      <strong>{d.title}</strong>
                      <span>{d.meta}</span>
                    </span>
                    <DocButton src={d.href} title={d.title} className={`btn ${d.primary ? 'btn-primary' : 'btn-secondary'} ${styles.docButton}`}>
                      {d.action}<span className="visually-hidden">: {d.title}</span>
                    </DocButton>
                  </li>
                ))}
              </ul>
              {study.documentsNote && <p className={styles.docsNote}>{study.documentsNote}</p>}
            </section>
          )}

          <p className={styles.byline}>
            <span className={styles.avatar} aria-hidden="true">MA</span>
            <span className={styles.author}>Mahmood Ahmad</span>
            <span>{project.role}</span>
            <span>{when}</span>
            <span>{minutes} min read</span>
            {study.updated && <span>Updated {study.updated}</span>}
          </p>
          {facts.length > 0 && (
            <dl className={styles.facts}>
              {facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
            </dl>
          )}

          {project.href && (
            <p className={styles.headerLink}>
              <a href={project.href} target="_blank" rel="noopener" className="btn btn-secondary">View on GitHub<ChevronIcon width="16" height="16" /></a>
            </p>
          )}
        </header>

        <div className={styles.side}>
          <HeaderArt kind={artForTags(project.tags)} className={styles.art} />
          {hasToc && (
            <nav className={styles.toc} aria-labelledby="toc-title">
              <h2 id="toc-title" className={styles.tocTitle}>In this story</h2>
              <ol className={styles.tocList}>
                {toc.map((c) => (
                  <li key={c.id}>
                    <Link to={`/case-studies/${slug}#${c.id}`} aria-current={activeChapter === c.id ? 'location' : undefined}>{c.title}</Link>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>

        <div className={styles.main}>
          <ArticleBody body={study.body} />
          {parent && (
            <aside className={styles.siblings} aria-label={`More from the ${parent.name}`}>
              <Family parent={parent.slug} current={slug} title={`More from the ${parent.name}`} />
            </aside>
          )}
        </div>

        <CaseShelf current={slug} />
      </div>

      <nav className={styles.pager} aria-label="More case studies">
        <div className={`container ${styles.pagerInner}`}>
          <Link to={`/case-studies/${prev.slug}`} className={styles.pagerLink}>
            <span>Previous case study</span>
            <span>{prev.name}</span>
          </Link>
          <Link to={`/case-studies/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span>Next case study</span>
            <span>{next.name}</span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
