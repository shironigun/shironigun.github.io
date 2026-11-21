import { useState } from 'react';
import { Link } from '../lib/router';
import CountUp from './CountUp';
import { ChevronIcon, SubjectIcon } from './Icons';
import styles from './HomeDash.module.css';

// The Home page's middle sections, drawn as parts of a product tool: a badge wall, a KPI panel,
// an activity log, a profile record, a results table and a workflow swimlane. Neutral greys and
// one accent (cobalt); every mini-chart shows the real figure, nothing invented.

function Panel({ title, meta, action, children, className = '' }) {
  return (
    <div className={`${styles.panel} ${className}`}>
      <div className={styles.panelHead}>
        <span className={styles.panelDots} aria-hidden="true"><i /><i /><i /></span>
        <span className={styles.panelTitle}>{title}</span>
        {meta && <span className={styles.panelMeta}>{meta}</span>}
        {action && <span className={styles.panelAction}>{action}</span>}
      </div>
      {children}
    </div>
  );
}

/* ─── Recognition: a badge wall ─────────────────────────────────── */
export function BadgeWall({ items }) {
  return (
    <ul className={styles.badges}>
      {items.map((r, i) => (
        <li key={r.title} style={{ '--i': i }}>
          <span className={styles.badge} aria-hidden="true"><SubjectIcon name={r.icon} width="20" height="20" /></span>
          <span className={styles.badgeText}>
            <strong>{r.title}</strong>
            {r.detail && <span>{r.detail}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Numbers: a KPI panel with honest mini-charts ──────────────── */
const YEARS = [2023, 2024, 2025, 2026];
function Viz({ kind }) {
  if (kind === 'years') {
    return (
      <span className={styles.vizYears} aria-hidden="true">
        {YEARS.map((y, i) => <span key={y} data-on={i > 0 || undefined}><i />{y}</span>)}
      </span>
    );
  }
  if (kind === 'dots') {
    return <span className={styles.vizDots} aria-hidden="true">{Array.from({ length: 120 }, (_, i) => <i key={i} />)}</span>;
  }
  if (kind === 'teams') {
    return (
      <span className={styles.vizTeams} aria-hidden="true">
        <span data-own>Our team</span>
        {[1, 2, 3].map((n) => <span key={n}>+1</span>)}
      </span>
    );
  }
  if (kind === 'rank') {
    return (
      <span className={styles.vizRank} aria-hidden="true">
        {Array.from({ length: 11 }, (_, i) => <i key={i} data-on={i === 0 || undefined} />)}
      </span>
    );
  }
  return null;
}

export function KpiPanel({ items }) {
  return (
    <Panel title="Highlights" meta="Dec 2023 to now">
      <ul className={styles.kpis}>
        {items.map((h) => (
          <li key={h.label}>
            <Link to={h.to} className={styles.kpi}>
              <span className={styles.kpiValue}><CountUp value={h.value} /></span>
              <span className={styles.kpiLabel}>{h.label}</span>
              <Viz kind={h.viz} />
              <span className={styles.kpiGo}>{h.to === '/journey' ? 'Career journey' : 'Case study'}<ChevronIcon width="14" height="14" aria-hidden="true" /></span>
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ─── Events: a recap built on the two photos ───────────────────── */
export function EventRecap({ rows, onOpen }) {
  return (
    <div className={styles.recap}>
      <figure className={`${styles.photo} ${styles.speaker}`}>
        <img src="/images/events/hackathon-speaker.jpg" alt="Mahmood speaking with a microphone at the division-wide AI hackathon." width="204" height="328" loading="lazy" />
        <figcaption><strong>On stage</strong><span>Division-wide AI hackathon, 2025</span></figcaption>
      </figure>
      <figure className={`${styles.photo} ${styles.room}`}>
        <img src="/images/events/hackathon-audience.jpg" alt="The session room at the AI hackathon, with participants seated around the tables." width="704" height="328" loading="lazy" />
        <figcaption><strong>The room</strong><span>Participants from across the division</span></figcaption>
      </figure>
      <ol className={styles.eventList}>
        {rows.map((e) => {
          const [m, y] = e.when.includes(' ') ? e.when.split(' ') : [e.when, ''];
          return (
            <li key={e.title}>
              <span className={styles.date}><strong>{m}</strong>{y && <span>{y}</span>}</span>
              <span className={styles.eventMain}>
                <span className={styles.eventType}><SubjectIcon name={e.icon} width="13" height="13" />{e.label}</span>
                <strong>{e.title}</strong>
              </span>
              {e.project ? (
                <button type="button" className={styles.open} aria-haspopup="dialog" onClick={() => onOpen(e.project.slug)} aria-label={`Open the project: ${e.project.name}`}>
                  <span>Project</span><ChevronIcon width="14" height="14" aria-hidden="true" />
                </button>
              ) : <span />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ─── Six roles: one title in the middle, six roles branching off it ─ */
export function RoleHub({ title, roles }) {
  const left = roles.slice(0, 3);
  const right = roles.slice(3);
  const node = (r) => (
    <li key={r.role}>
      <Link to={r.to} className={styles.node}>
        <span className={styles.nodeIcon} aria-hidden="true"><SubjectIcon name={r.icon} width="18" height="18" /></span>
        <span className={styles.nodeText}>
          <span className={styles.nodeArea}>{r.area}</span>
          <strong>{r.role}</strong>
          <span className={styles.nodeProof}>{r.proof}</span>
        </span>
      </Link>
    </li>
  );
  return (
    <div className={styles.hub}>
      <ul className={`${styles.side} ${styles.left}`}>{left.map(node)}</ul>
      <div className={styles.core}>
        <span className={styles.coreAvatar} aria-hidden="true">MA</span>
        <span className={styles.coreLabel}>One title</span>
        <strong className={styles.coreTitle}>{title}</strong>
        <span className={styles.coreCount}><b>6</b> roles across product, design, AI and quality</span>
      </div>
      <ul className={`${styles.side} ${styles.right}`}>{right.map(node)}</ul>
    </div>
  );
}

/* ─── Achievements: a milestone timeline ────────────────────────── */
export function Milestones({ rows }) {
  return (
    <div className={styles.milestones} style={{ '--n': rows.length }}>
      <ol className={styles.stops}>
        <li className={styles.axis} aria-hidden="true" />
        {rows.map((a, i) => {
          const pos = i % 2 === 0 ? 'top' : 'bottom';
          const inner = (
            <>
              <span className={styles.msFigure}>{a.figure || <SubjectIcon name={a.icon} width="26" height="26" />}</span>
              <strong className={styles.msTitle}>{a.title}</strong>
              {a.figureLabel && <span className={styles.msLabel}>{a.figureLabel}</span>}
            </>
          );
          return (
            <li key={a.title} className={styles.stop} data-pos={pos} style={{ '--i': i }}>
              {a.to ? <Link to={a.to} className={styles.ms}>{inner}</Link> : <span className={styles.ms}>{inner}</span>}
              <span className={styles.tick}><i aria-hidden="true" /><time>{a.when}</time></span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ─── How I work: a chevron process bar ─────────────────────────── */
export function ProcessBar({ steps }) {
  return (
    <ol className={styles.process}>
      {steps.map((s, i) => (
        <li key={s.name}>
          <span className={styles.stepNo}>{i + 1}</span>
          <strong>{s.name}</strong>
          <span>{s.line}</span>
        </li>
      ))}
    </ol>
  );
}
