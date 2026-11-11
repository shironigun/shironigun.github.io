import { Link } from '../lib/router';
import PromisePanel from './PromisePanel';
import QaLoop from './visuals/QaLoop';
import { AgentPipeline, AuditSplit, DesignReview, Journey } from './visuals/Explainers';
import { BroadcastDashboard, ReleaseGate, TestLevels } from './Visuals';
import { ChevronIcon } from './Icons';
import { useViewer } from './DocumentViewer';
import styles from './ArticleBody.module.css';

// Renders a case study written as an article. The body is a list of small blocks:
//   { p }            a paragraph; add `lead` for a bold run-in ("Workspaces."), `meta` for a quiet note
//   { h2 }           a section heading; every h2 starts a new <section>
//   { h3 }           a subheading inside a section
//   { list } / { ol } bullet or numbered list (strings)
//   { quote }        a pull quote
//   { figure, caption }               one of the animated explainers below
//   { photo, alt, width, height, caption }  a photo; it opens full size in the viewer
//   { numbers: [[value, label]], caption }  a small row of figures
//   { pair: [{ title, items }, { title, items }] }  two lists side by side
//   { table: { columns, rows, note }, caption }
//   { code: [lines], caption }
//   { note }         a short aside
//   { link: { to | href, text } }     a further-reading link

const FIGURES = {
  journey: Journey,
  promiseFull: () => <PromisePanel size="full" />,
  releaseGate: ReleaseGate,
  designReview: DesignReview,
  broadcast: BroadcastDashboard,
  qaLoop: QaLoop,
  audit: AuditSplit,
  testLevels: TestLevels,
  pipeline: AgentPipeline,
};

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Words in the body, for the reading time.
export function wordCount(body) {
  const text = body.map((b) => [b.p, b.h2, b.h3, b.quote, b.note, b.caption, ...(b.list || []), ...(b.ol || []),
    ...(b.pair || []).flatMap((c) => [c.title, ...c.items])].filter(Boolean).join(' ')).join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

function Photo({ block }) {
  const { open } = useViewer();
  return (
    <figure className={`${styles.figure} ${styles.wide}`}>
      <button
        type="button"
        className={styles.photoButton}
        aria-haspopup="dialog"
        onClick={(e) => open({ src: block.photo, title: block.caption || block.alt, trigger: e.currentTarget })}
      >
        <img src={block.photo} alt={block.alt} width={block.width} height={block.height} loading="lazy" />
        <span className={styles.photoHint} aria-hidden="true">View full size</span>
      </button>
      {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>
  );
}

function Block({ block }) {
  if (block.p) {
    return (
      <p>
        {block.lead && <strong>{block.lead} </strong>}{block.p}
        {block.meta && <span className={styles.meta}>{block.meta}</span>}
      </p>
    );
  }
  if (block.h3) return <h3>{block.h3}</h3>;
  if (block.list) return <ul>{block.list.map((t) => <li key={t}>{t}</li>)}</ul>;
  if (block.ol) return <ol>{block.ol.map((t) => <li key={t}>{t}</li>)}</ol>;
  if (block.quote) return <blockquote className={styles.quote}><p>{block.quote}</p></blockquote>;
  if (block.note) return <aside className={styles.note}><p>{block.note}</p></aside>;
  if (block.photo) return <Photo block={block} />;
  if (block.figure) {
    const F = FIGURES[block.figure];
    return (
      <figure className={`${styles.figure} ${styles.wide}`}>
        <div className={styles.figureBody}>{F ? <F /> : null}</div>
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }
  if (block.numbers) {
    return (
      <figure className={styles.figure}>
        <dl className={styles.numbers}>
          {block.numbers.map(([v, l]) => <div key={l}><dt>{v}</dt><dd>{l}</dd></div>)}
        </dl>
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }
  if (block.pair) {
    return (
      <div className={styles.pair}>
        {block.pair.map((c) => (
          <div key={c.title}>
            <h4>{c.title}</h4>
            <ul>{c.items.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        ))}
      </div>
    );
  }
  if (block.table) {
    const { columns, rows, note } = block.table;
    return (
      <figure className={`${styles.figure} ${styles.wide}`}>
        <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={block.caption || 'Table'}>
          <table className={styles.table}>
            <thead><tr>{columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}</tr>
              ))}
            </tbody>
          </table>
        </div>
        {(block.caption || note) && <figcaption>{block.caption}{note && <span className={styles.tableNote}> {note}</span>}</figcaption>}
      </figure>
    );
  }
  if (block.code) {
    return (
      <figure className={styles.figure}>
        <pre className={styles.code}><code>{block.code.join('\n')}</code></pre>
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }
  if (block.link) {
    const { to, href, text } = block.link;
    return (
      <p className={styles.further}>
        {to
          ? <Link to={to}>{text}<ChevronIcon width="16" height="16" /></Link>
          : <a href={href} target="_blank" rel="noopener">{text}<ChevronIcon width="16" height="16" /></a>}
      </p>
    );
  }
  return null;
}

// Group the body into sections at each h2, so each section can be linked and the rope agent can
// comment on it.
export default function ArticleBody({ body }) {
  const sections = [];
  let current = { heading: null, blocks: [] };
  for (const b of body) {
    if (b.h2) {
      if (current.heading || current.blocks.length) sections.push(current);
      current = { heading: b.h2, blocks: [] };
    } else {
      current.blocks.push(b);
    }
  }
  sections.push(current);

  return (
    <div className={styles.body}>
      {sections.map((s, i) => {
        const id = s.heading ? `s-${slugify(s.heading)}` : undefined;
        return (
          <section key={id || `intro-${i}`} className={styles.section} aria-labelledby={id}>
            {s.heading && <h2 id={id}>{s.heading}</h2>}
            {s.blocks.map((b, j) => <Block key={j} block={b} />)}
          </section>
        );
      })}
    </div>
  );
}
