import { Link } from '../lib/router';
import PromisePanel from './PromisePanel';
import QaLoop from './visuals/QaLoop';
import { AgentPipeline, AuditSplit, DesignReview, Journey } from './visuals/Explainers';
import { BroadcastDashboard, ReleaseGate, TestLevels } from './Visuals';
import { ChevronIcon } from './Icons';
import { useViewer } from './DocumentViewer';
import { Call, Decisions, Stages, StoryCard, blockWords } from './ArticleBlocks';
import { Cards, Flow, Timeline, Tree, diagramWords } from './ArticleDiagrams';
import DataFlow, { graphWords } from './DataFlow';
import Family from './Family';
import styles from './ArticleBody.module.css';

// Renders a case study written as an article. The body is a list of small blocks:
//   { p }            a paragraph; add `lead` for a bold run-in ("Workspaces."), `meta` for a quiet note
//   { h2 }           a section heading; every h2 starts a new <section>
//   { h3 }           a subheading inside a section
//   { list } / { ol } bullet or numbered list (strings)
//   { quote }        a pull quote
//   { figure, caption }               one of the animated explainers below
//   { photo, alt, width, height, caption }  a photo; it opens full size in the viewer
//   { video, title, poster, caption }       a film played in place; nothing downloads until it is pressed
//   { numbers: [[value, label]], caption }  a small row of figures
//   { pair: [{ title, items }, { title, items }] }  two lists side by side
//   { table: { columns, rows, note }, caption }
//   { code: [lines], caption }
//   { note }         a short aside
//   { link: { to | href, text } }     a further-reading link
//   { stages }, { decisions }, { call }, { story }   how the work was done (see ArticleBlocks)
//   { flow }, { cards }, { tree }, { timeline }      a system shown end to end (see ArticleDiagrams)
//   { graph, caption }  a data-flow diagram: lanes, nodes, labelled wires and a trace (see DataFlow)
//   { family: slug }    the child projects of a parent project, as cards (see Family)
// Captioned figures are numbered in reading order ("Fig. 1"), so the text can point at them.

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
    ...(b.pair || []).flatMap((c) => [c.title, ...c.items]), ...blockWords(b), ...diagramWords(b), ...graphWords(b.graph)].filter(Boolean).join(' ')).join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

// The chapters of a case study, for its "In this story" list: every h2, with the id its section gets.
export const chapters = (body) => body.filter((b) => b.h2).map((b) => ({ id: `s-${slugify(b.h2)}`, title: b.h2 }));

// Which blocks are figures, and their numbers in reading order. Returns a Map from block to number;
// a block with no entry gets no "Fig." label. Only visual exhibits count, and only when captioned:
// a caption is where the number shows, so an uncaptioned exhibit must not use up a number.
// A row of figures or a code sample is part of the text, not an exhibit.
const EXHIBITS = ['figure', 'photo', 'video', 'table', 'stages', 'decisions', 'story', 'flow', 'cards', 'tree', 'timeline', 'graph'];
export function figureNumbers(body) {
  const numbers = new Map();
  for (const b of body) {
    if (b.caption && EXHIBITS.some((k) => b[k])) numbers.set(b, numbers.size + 1);
  }
  return numbers;
}

function Caption({ text, n, children }) {
  if (!text && !children && !n) return null;
  return (
    <figcaption>
      {n && <span className={styles.figNo}>Fig. {n}</span>}
      {text}{children}
    </figcaption>
  );
}

function Photo({ block, n }) {
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
      <Caption text={block.caption} n={n} />
    </figure>
  );
}

// A film, played in place. Nothing of the film downloads until it is pressed: the poster is a
// small still from its title card, and playback streams from there.
function Video({ block, n }) {
  return (
    <figure className={`${styles.figure} ${styles.wide}`}>
      <video
        className={styles.video}
        src={block.video}
        poster={block.poster}
        aria-label={block.title}
        controls
        playsInline
        preload="none"
      />
      <Caption text={block.caption} n={n} />
    </figure>
  );
}

function Block({ block, n }) {
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
  if (block.photo) return <Photo block={block} n={n} />;
  if (block.video) return <Video block={block} n={n} />;
  if (block.figure) {
    const F = FIGURES[block.figure];
    return (
      <figure className={`${styles.figure} ${styles.wide}`}>
        <div className={styles.figureBody}>{F ? <F /> : null}</div>
        <Caption text={block.caption} n={n} />
      </figure>
    );
  }
  if (block.stages) {
    return (
      <figure className={`${styles.figure} ${styles.wide}`}>
        <Stages stages={block.stages} label={block.caption} />
        <Caption text={block.caption} n={n} />
      </figure>
    );
  }
  if (block.decisions) {
    return (
      <figure className={styles.figure}>
        <Decisions decisions={block.decisions} />
        <Caption text={block.caption} n={n} />
      </figure>
    );
  }
  if (block.call) return <Call call={block.call} />;
  if (block.flow) {
    return (
      <figure className={`${styles.figure} ${styles.wide}`}>
        <Flow steps={block.flow} label={block.caption} />
        <Caption text={block.caption} n={n} />
      </figure>
    );
  }
  if (block.graph) {
    return (
      <figure className={`${styles.figure} ${styles.wide}`}>
        <DataFlow graph={block.graph} label={block.caption} />
        <Caption text={block.caption} n={n} />
      </figure>
    );
  }
  if (block.family) return <div className={styles.wide}><Family parent={block.family} /></div>;
  if (block.cards) {
    return (
      <figure className={`${styles.figure} ${styles.wide}`}>
        <Cards cards={block.cards} mono={block.mono} columns={block.columns} />
        <Caption text={block.caption} n={n} />
      </figure>
    );
  }
  if (block.tree) {
    return (
      <figure className={styles.figure}>
        <Tree items={block.tree} />
        <Caption text={block.caption} n={n} />
      </figure>
    );
  }
  if (block.timeline) {
    return (
      <figure className={styles.figure}>
        <Timeline items={block.timeline} />
        <Caption text={block.caption} n={n} />
      </figure>
    );
  }
  if (block.story) {
    return (
      <figure className={styles.figure}>
        <StoryCard story={block.story} />
        <Caption text={block.caption} n={n} />
      </figure>
    );
  }
  if (block.numbers) {
    return (
      <figure className={styles.figure}>
        <dl className={styles.numbers}>
          {block.numbers.map(([v, l]) => <div key={l}><dt>{v}</dt><dd>{l}</dd></div>)}
        </dl>
        <Caption text={block.caption} n={n} />
      </figure>
    );
  }
  if (block.pair) {
    return (
      <div className={styles.pair}>
        {block.pair.map((c) => (
          <div key={c.title}>
            <div role="heading" aria-level={3} className={styles.pairTitle}>{c.title}</div>
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
              {rows.map((r, ri) => (
                <tr key={`${ri}-${r[0]}`}>{r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <Caption text={block.caption} n={n}>{note && <span className={styles.tableNote}> {note}</span>}</Caption>
      </figure>
    );
  }
  if (block.code) {
    return (
      <figure className={styles.figure}>
        <pre className={styles.code}><code>{block.code.join('\n')}</code></pre>
        <Caption text={block.caption} n={n} />
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
// comment on it. Each section has a rail (its number and heading) above a flow (its blocks). In a
// wide column both fill the whole width.
const pad = (n) => String(n).padStart(2, '0');
export default function ArticleBody({ body }) {
  const figs = figureNumbers(body);
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
        // Chapters count from 01, as in the chapter list; the opening before the first one is 00.
        const number = sections[0].heading ? i + 1 : i;
        return (
          <section key={id || `intro-${i}`} className={`${styles.section} ${s.heading ? '' : styles.opening}`} aria-labelledby={id}>
            <div className={styles.rail}>
              <div className={styles.railInner}>
                <span className={styles.chapNo} aria-hidden="true">{pad(number)}</span>
                {s.heading ? <h2 id={id}>{s.heading}</h2> : <span className={styles.railLabel} aria-hidden="true">Opening</span>}
              </div>
            </div>
            <div className={styles.flow}>
              {s.blocks.map((b, j) => <Block key={j} block={b} n={figs.get(b)} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
