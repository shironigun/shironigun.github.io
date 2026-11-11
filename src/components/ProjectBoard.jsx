import { useEffect, useMemo, useState } from 'react';
import { useInView } from '../lib/hooks';
import { STATUS } from '../content/projects';
import { BookIcon, CloseIcon, LayersIcon } from './Icons';
import { Avatar, DisciplineIcon, QuarterStrip } from './board/parts';
import ProjectDialog from './board/ProjectDialog';
import { COLUMNS, disciplines, findItem, FIRST, items, lanes, laneVar, NOW, period, quarterRange, QUARTERS, YEARS } from './board/model';
import styles from './ProjectBoard.module.css';

// Every project as a card on a project board. Two views: a kanban board with a column per
// workflow state, and a roadmap with a lane per discipline and a column per year, split into
// quarters. Clicking any card opens the project in a popup; the URL hash remembers which.

const haystack = (p) => [p.name, p.summary, p.role, p.id, ...p.tags, ...(p.delivered || [])].join(' ').toLowerCase();

function Card({ p, onOpen }) {
  const state = STATUS[p.status];
  return (
    <button type="button" className={styles.card} style={{ '--lane': laneVar(p.lane) }} aria-haspopup="dialog" onClick={() => onOpen(p.slug)}>
      <span className={styles.cardTop}>
        <span className={styles.cardType}><DisciplineIcon tag={p.lane} />{p.id}</span>
        <span className={styles.cardPeriod}>{period(p)}</span>
      </span>
      <span className={styles.cardTitle}>{p.name}</span>
      <span className={styles.kpi}><strong>{p.kpi[0]}</strong><span>{p.kpi[1]}</span></span>
      <span className={styles.cardFields}>
        <span className={styles.cardState}><span className={`${styles.dot} ${styles[state.tone]}`} aria-hidden="true" />{state.label}</span>
        <span className={styles.cardOwner}><Avatar /><span>{p.role}</span></span>
      </span>
      <span className={styles.cardTags}>
        {p.tags.map((t) => <span key={t} style={{ '--tag': laneVar(t) }}>{t}</span>)}
      </span>
      <span className={styles.cardFoot}>
        <span className={styles.cardQuarters}>{quarterRange(p)}</span>
        <span className={styles.cardIcons}>
          {p.page && <span title="Has a case study"><BookIcon width="14" height="14" /><span className="visually-hidden">Case study</span></span>}
          {p.documents.length > 0 && <span title={`${p.documents.length} ${p.documents.length > 1 ? 'documents' : 'document'}`}><LayersIcon width="14" height="14" />{p.documents.length}</span>}
        </span>
      </span>
      <QuarterStrip p={p} />
    </button>
  );
}

function Kanban({ matches, onOpen }) {
  return (
    <div className={styles.kanban}>
      {COLUMNS.map((col) => {
        const shown = col.items.filter(matches);
        return (
          <section key={col.key} className={styles.column} data-col={col.key} aria-labelledby={`col-${col.key}`}>
            <header className={styles.colHead}>
              <h3 id={`col-${col.key}`}>{col.title}</h3>
              <span className={styles.colCount}>
                {shown.length}{shown.length !== col.items.length && <span>/{col.items.length}</span>}
              </span>
              <p>{col.hint}</p>
            </header>
            <ul className={styles.cards}>
              {shown.map((p) => <li key={p.slug}><Card p={p} onOpen={onOpen} /></li>)}
              {shown.length === 0 && <li className={styles.empty}>Nothing here matches the filter.</li>}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function Roadmap({ matches, onOpen }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} className={`${styles.roadmap} ${inView ? styles.play : ''}`}>
      <div className={styles.years} aria-hidden="true">
        {YEARS.map((y, i) => (
          <span key={y} style={{ '--i': i }} className={`${styles.year} ${y === NOW ? styles.nowYear : ''}`}>
            <span className={styles.yearLabel}>{y}{y === NOW && <em>now</em>}</span>
            <span className={styles.quarters}>{QUARTERS.map((q) => <span key={q}>{q}</span>)}</span>
          </span>
        ))}
      </div>
      {lanes.map((lane, li) => (
        <section key={lane.key} className={styles.lane} style={{ '--lane': laneVar(lane.name) }} aria-labelledby={`lane-${lane.key}`}>
          <h3 id={`lane-${lane.key}`} className={styles.laneName}>
            <span className={styles.laneDot} aria-hidden="true" />{lane.name}<span className={styles.laneCount}>{lane.items.length}</span>
          </h3>
          <ul className={styles.track}>
            {lane.items.map((p) => (
              <li
                key={p.slug}
                className={styles.cell}
                data-off={!matches(p) || undefined}
                style={{ gridColumn: `${p.start - FIRST + 1} / ${p.end - FIRST + 2}`, '--d': `${(p.start - FIRST) * 170 + li * 70}ms` }}
              >
                <button type="button" className={styles.rcard} aria-haspopup="dialog" onClick={() => onOpen(p.slug)}>
                  <span className={styles.rcardName}>{p.name}</span>
                  <span className={styles.rcardMeta}>
                    <span className={`${styles.dot} ${styles[STATUS[p.status].tone]}`} aria-hidden="true" />
                    <span>{period(p)}</span>
                    <span className="visually-hidden">, {quarterRange(p)}, {STATUS[p.status].label}</span>
                  </span>
                  <QuarterStrip p={p} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default function ProjectBoard() {
  const [view, setView] = useState('board');
  const [query, setQuery] = useState('');
  const [areas, setAreas] = useState([]);
  const [open, setOpen] = useState(() => findItem(window.location.hash.slice(1))?.slug || null);

  const q = query.trim().toLowerCase();
  const matches = useMemo(() => (p) => (areas.length === 0 || p.tags.some((t) => areas.includes(t))) && (!q || haystack(p).includes(q)), [areas, q]);
  const filtering = areas.length > 0 || q;

  // The popup steps through what is on screen, in reading order.
  const order = useMemo(() => {
    const list = view === 'board' ? COLUMNS.flatMap((c) => c.items) : lanes.flatMap((l) => l.items);
    const shown = list.filter(matches);
    return shown.length ? shown : list;
  }, [view, matches]);
  const index = order.findIndex((p) => p.slug === open);
  const item = open ? findItem(open) : null;
  const step = (d) => {
    const i = index < 0 ? 0 : (index + d + order.length) % order.length;
    setOpen(order[i].slug);
  };

  // A link to /projects#slug opens that project, on load or when the hash changes on the page.
  useEffect(() => {
    const onHash = () => setOpen(findItem(window.location.hash.slice(1))?.slug || null);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Keep the open item in the address, so a link can open it directly.
  useEffect(() => {
    const url = `${window.location.pathname}${window.location.search}${open ? `#${open}` : ''}`;
    window.history.replaceState(window.history.state, '', url);
  }, [open]);

  const toggleArea = (t) => setAreas((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]));
  const shownCount = items.filter(matches).length;

  return (
    <div className={styles.wrap} data-reveal="off">
      <div className={styles.toolbar}>
        <div className={styles.toolTop}>
          <span className={styles.boardIcon} aria-hidden="true"><LayersIcon width="18" height="18" /></span>
          <div className={styles.tabs} role="tablist" aria-label="View">
            {[['board', 'Board'], ['roadmap', 'Roadmap']].map(([key, label]) => (
              <button key={key} type="button" role="tab" aria-selected={view === key} className={styles.tab} onClick={() => setView(key)}>{label}</button>
            ))}
          </div>
          <span className={styles.summary} aria-live="polite">
            {filtering ? `${shownCount} of ${items.length} projects` : `${items.length} projects, 2023 to now`}
          </span>
        </div>
        <div className={styles.filterBar}>
          <label className={styles.search}>
            <span className="visually-hidden">Filter projects by keyword</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input type="search" placeholder="Filter by keyword" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <div className={styles.areas} role="group" aria-label="Disciplines">
            {disciplines.map((t) => (
              <button key={t} type="button" className={styles.area} aria-pressed={areas.includes(t)} style={{ '--tag': laneVar(t) }} onClick={() => toggleArea(t)}>
                <span className={styles.areaDot} aria-hidden="true" />{t}
                <span className={styles.areaCount}>{items.filter((p) => p.tags.includes(t)).length}</span>
              </button>
            ))}
          </div>
          {filtering && (
            <button type="button" className={styles.clear} onClick={() => { setAreas([]); setQuery(''); }}>
              <CloseIcon width="14" height="14" />Clear
            </button>
          )}
        </div>
      </div>

      <div role="tabpanel" aria-label={view === 'board' ? 'Board' : 'Roadmap'}>
        {view === 'board' ? <Kanban matches={matches} onOpen={setOpen} /> : <Roadmap matches={matches} onOpen={setOpen} />}
      </div>

      {item && (
        <ProjectDialog
          item={item}
          position={(index < 0 ? 0 : index) + 1}
          total={order.length}
          onClose={() => setOpen(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </div>
  );
}
