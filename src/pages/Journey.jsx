import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useDocumentTitle } from '../lib/router';
import { useReducedMotion } from '../lib/hooks';
import PageHeader from '../components/PageHeader';
import { DocButton } from '../components/DocumentViewer';
import CountUp from '../components/CountUp';
import { SubjectIcon } from '../components/Icons';
import { journey, nodeGroups, nodeTypes } from '../content/journey';
import { recognition } from '../content/site';
import { achievements } from '../content/achievements';
import styles from './Journey.module.css';
import pageStyles from './Pages.module.css';

// Awards without a date can't sit on the timeline, so they lead the page. Where the achievements
// record says more about an award, that fuller line is used.
const awards = recognition.map((r) => ({ ...r, detail: achievements.find((a) => a.title === r.title)?.detail || r.detail }));

const groupOf = (m) => nodeTypes[m.type].group;
const years = [...new Set(journey.map((m) => m.date.slice(0, 4)))];
const groupIcon = { roles: 'briefcase', work: 'layers', achievements: 'trophy', learning: 'badge', talks: 'mic', workshops: 'users', courses: 'book', events: 'calendar' };

function Milestone({ m }) {
  const type = nodeTypes[m.type];
  return (
    <li className={styles.node} data-node data-group={type.group} data-type={m.type}>
      <span className={styles.dot} aria-hidden="true"><SubjectIcon name={type.icon} width="16" height="16" /></span>
      <article className={styles.card}>
        <p className={styles.meta}>
          <span className={styles.type}>{type.label}</span>
          <span className={styles.when}>{m.when}</span>
        </p>
        {m.type === 'promotion' && m.from ? (
          <h4 className={styles.title}>
            <span className={styles.from}><span className="visually-hidden">Promoted from </span>{m.from}</span>
            <span className={styles.toTitle}><span className="visually-hidden">to </span>{m.title}</span>
          </h4>
        ) : (
          <h4 className={styles.title}>{m.title}</h4>
        )}
        {m.org && <p className={styles.org}>{m.org}</p>}
        {m.metric && (
          <p className={styles.metric}><strong>{m.metric.value}</strong><span>{m.metric.label}</span></p>
        )}
        {m.detail && <p className={styles.detail}>{m.detail}</p>}
        {m.photo && <img className={styles.photo} src={m.photo} alt={m.photoAlt || ''} loading="lazy" />}
        {(m.to || m.file) && (
          <p className={styles.links}>
            {m.to && <Link to={m.to} className="link-quiet">Read the case study</Link>}
            {m.file && <DocButton src={m.file} title={m.title}>{m.fileLabel || 'View certificate'}</DocButton>}
          </p>
        )}
      </article>
    </li>
  );
}

export default function Journey() {
  useDocumentTitle('Career journey: Mahmood Ahmad');
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState('all');
  const [activeYear, setActiveYear] = useState(years[0]);
  const trackRef = useRef(null);

  const visible = useMemo(() => journey.filter((m) => filter === 'all' || groupOf(m) === filter), [filter]);
  const byYear = years
    .map((year) => ({ year, items: visible.filter((m) => m.date.startsWith(year)) }))
    .filter((g) => g.items.length > 0);
  const maxPerYear = Math.max(...byYear.map((g) => g.items.length));

  // The spine fills as the visitor reads; milestones above the reading line are marked as reached,
  // and the year index follows along. Written straight to the DOM to avoid re-rendering on scroll.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const nodes = [...track.querySelectorAll('[data-node]')];
    const heads = [...track.querySelectorAll('[data-year]')];
    if (reduced) {
      track.style.setProperty('--fill', '1');
      nodes.forEach((n) => { n.dataset.reached = 'true'; });
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.6;
      const box = track.getBoundingClientRect();
      track.style.setProperty('--fill', Math.min(1, Math.max(0, (line - box.top) / box.height)).toFixed(4));
      nodes.forEach((n) => { n.dataset.reached = String(n.getBoundingClientRect().top + 24 < line); });
      let year = heads[0]?.dataset.year;
      heads.forEach((h) => { if (h.getBoundingClientRect().top < line) year = h.dataset.year; });
      setActiveYear((prev) => (prev === year ? prev : year));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced, filter]);

  const jumpTo = (year) => {
    document.getElementById(`y${year}`)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <>
      <PageHeader
        art="path"
        crumbs={[{ label: 'Journey' }]}
        title="Career journey"
        lead="Every step since my first UI/UX role: roles and promotions, projects, achievements and certifications, and the talks, workshops, courses and events I have delivered or taken part in."
      >
        <dl className={styles.stats}>
          {nodeGroups.map((g) => (
            <div key={g.id}>
              <dt><span className={styles.statIcon} aria-hidden="true"><SubjectIcon name={groupIcon[g.id]} width="16" height="16" /></span>{g.label}</dt>
              <dd><CountUp value={String(journey.filter((m) => groupOf(m) === g.id).length)} /></dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <section id="recognition" className="section" aria-labelledby="recognition-title">
        <div className="container">
          <div className="section-head">
            <h2 id="recognition-title">Recognition</h2>
            <p>Awards and formal recognition from the division and its leadership. Dated wins, certificates and results follow on the timeline below.</p>
          </div>
          <ul className={pageStyles.recCards}>
            {awards.map((r) => (
              <li key={r.title}>
                <span className={pageStyles.iconBox} aria-hidden="true"><SubjectIcon name={r.icon} width="20" height="20" /></span>
                <strong>{r.title}</strong>
                {r.detail && <span>{r.detail}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.section}`} aria-labelledby="journey-title">
        <div className="container">
          <h2 id="journey-title" className="visually-hidden">Milestones by year</h2>

          <div className={styles.filters} role="toolbar" aria-label="Filter milestones" data-reveal="off">
            <button type="button" className={styles.filter} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
              All <span className={styles.count}>{journey.length}</span>
            </button>
            {nodeGroups.map((g) => (
              <button key={g.id} type="button" className={styles.filter} aria-pressed={filter === g.id} onClick={() => setFilter(g.id)}>
                {g.label} <span className={styles.count}>{journey.filter((m) => groupOf(m) === g.id).length}</span>
              </button>
            ))}
          </div>
          <p className="visually-hidden" aria-live="polite">Showing {visible.length} of {journey.length} milestones</p>

          <div className={styles.layout}>
            <nav className={styles.index} aria-label="Jump to year">
              <ol>
                {byYear.map((g) => (
                  <li key={g.year}>
                    <button type="button" onClick={() => jumpTo(g.year)} aria-current={activeYear === g.year ? 'true' : undefined}>
                      <span className={styles.indexYear}>{g.year}</span>
                      <span className={styles.indexBar} aria-hidden="true"><span style={{ width: `${(g.items.length / maxPerYear) * 100}%` }} /></span>
                      <span className={styles.indexCount}>{g.items.length}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            <div className={styles.track} ref={trackRef}>
              <span className={styles.spine} aria-hidden="true" data-reveal="off"><span className={styles.spineFill} /></span>
              {byYear.map((g) => (
                <div key={g.year} className={styles.yearGroup}>
                  <div className={styles.yearHead} id={`y${g.year}`} data-year={g.year}>
                    <span className={styles.yearMarker} aria-hidden="true" />
                    <h3 className={styles.yearNum}>{g.year}</h3>
                    <p className={styles.yearCount}>{g.items.length} {g.items.length === 1 ? 'milestone' : 'milestones'}</p>
                  </div>
                  <ol className={styles.list} data-stagger>
                    {g.items.map((m) => <Milestone key={m.date + m.title} m={m} />)}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
