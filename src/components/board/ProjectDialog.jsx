import { useEffect, useRef } from 'react';
import { Link } from '../../lib/router';
import { STATUS } from '../../content/projects';
import { useStudy } from '../../content/caseStudies';
import Status from '../Status';
import Thumb from '../visuals/Thumbs';
import { DocButton } from '../DocumentViewer';
import { BookIcon, CheckIcon, ChevronIcon, CloseIcon, ExternalIcon, GitHubIcon } from '../Icons';
import { Avatar, DisciplineIcon, QuarterTimeline } from './parts';
import { laneVar, period, quarterRange } from './model';
import styles from './ProjectDialog.module.css';

// A project opened like a ticket: header with the item's key, title, owner and tags; a row of
// fields; then three columns: the description and what was delivered, the planning fields, and
// the outcome with related work. Arrow keys move to the previous or next item; Escape closes.
export default function ProjectDialog({ item, position, total, onClose, onPrev, onNext }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const opener = useRef(typeof document !== 'undefined' ? document.activeElement : null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const back = opener.current;
    return () => {
      document.body.style.overflow = prev;
      back?.focus?.();
    };
  }, []);

  // Each item starts at the top of the dialog.
  useEffect(() => {
    dialogRef.current?.querySelector('[data-scroll]')?.scrollTo(0, 0);
    dialogRef.current?.scrollTo(0, 0);
  }, [item.slug]);

  const onKeyDown = (e) => {
    const typing = /INPUT|TEXTAREA/.test(e.target.tagName);
    if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
    if (!typing && e.key === 'ArrowRight') { e.preventDefault(); onNext(); }
    if (!typing && e.key === 'ArrowLeft') { e.preventDefault(); onPrev(); }
    if (e.key === 'Tab') {
      const els = [...dialogRef.current.querySelectorAll('button:not([disabled]), a[href]')];
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  const facts = item.page ? item.page.facts.filter((f) => !['My role', 'When', 'Status'].includes(f.label)) : [];
  const { study } = useStudy(item.page ? item.slug : null);
  const documents = study?.documents || [];
  const numbers = study?.body.find((b) => b.numbers)?.numbers || [item.kpi];
  const kind = item.page ? 'Case study' : 'Project';

  return (
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        style={{ '--lane': laneVar(item.lane) }}
        onKeyDown={onKeyDown}
      >
        <header className={styles.head}>
          <div className={styles.headTop}>
            <span className={styles.type}>
              <span className={styles.typeIcon}><DisciplineIcon tag={item.lane} /></span>
              {kind} <span className={styles.key}>{item.id}</span>
            </span>
            <div className={styles.tools}>
              <span className={styles.position} aria-live="polite">{position} of {total}</span>
              <button type="button" className={styles.icon} onClick={onPrev} aria-label="Previous project" title="Previous (←)">
                <ChevronIcon width="18" height="18" style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button type="button" className={styles.icon} onClick={onNext} aria-label="Next project" title="Next (→)">
                <ChevronIcon width="18" height="18" />
              </button>
              <button ref={closeRef} type="button" className={styles.icon} onClick={onClose} aria-label="Close" title="Close (Esc)">
                <CloseIcon width="18" height="18" />
              </button>
            </div>
          </div>

          <h2 id="project-dialog-title" className={styles.title}>{item.name}</h2>

          <div className={styles.headMeta}>
            <span className={styles.owner}>
              <Avatar size="md" />
              <span><strong>Mahmood Ahmad</strong><span>{item.role}</span></span>
            </span>
            <span className={styles.tags}>
              {item.tags.map((t) => <span key={t} style={{ '--tag': laneVar(t) }}>{t}</span>)}
            </span>
            {item.page && (
              <Link to={`/case-studies/${item.slug}`} className={`btn btn-primary ${styles.headCta}`}>
                <BookIcon width="16" height="16" />Read the case study
              </Link>
            )}
          </div>

          <dl className={styles.fields}>
            <div><dt>State</dt><dd><Status status={item.status} /></dd></div>
            <div><dt>Disciplines</dt><dd>{item.tags.join(', ')}</dd></div>
            <div><dt>Period</dt><dd>{period(item)}</dd></div>
            <div><dt>Quarters</dt><dd>{quarterRange(item)}</dd></div>
          </dl>
        </header>

        <div className={styles.scroll} data-scroll>
          <div key={item.slug} className={styles.body}>
            <div className={styles.main}>
              <figure className={styles.visual}>
                {item.cover ? <img src={item.cover} alt="" /> : <Thumb kind={item.thumb} />}
              </figure>

              <section className={styles.block}>
                <h3>Description</h3>
                <p>{item.summary}</p>
                {item.page?.lead && <p>{item.page.lead}</p>}
                {!item.page && item.details?.map((d) => <p key={d}>{d}</p>)}
              </section>

              <section className={styles.block}>
                <h3>What I delivered</h3>
                <ul className={styles.checks}>
                  {item.delivered.map((d) => (
                    <li key={d}><span className={styles.check} aria-hidden="true"><CheckIcon width="14" height="14" /></span>{d}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className={styles.side}>
              <section className={styles.block}>
                <h3>Planning</h3>
                <dl className={styles.planning}>
                  <div><dt>My role</dt><dd>{item.role}</dd></div>
                  <div><dt>Period</dt><dd>{period(item)}</dd></div>
                  <div className={styles.full}><dt>Timeline</dt><dd><QuarterTimeline p={item} /></dd></div>
                  <div><dt>State</dt><dd>{STATUS[item.status].label}</dd></div>
                  {facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
                </dl>
              </section>
            </div>

            <div className={styles.side}>
              <section className={styles.block}>
                <h3>Outcome</h3>
                <dl className={styles.outcome}>
                  {numbers.map(([v, l]) => <div key={l}><dt>{v}</dt><dd>{l}</dd></div>)}
                </dl>
              </section>

              <section className={styles.block}>
                <h3>Related work</h3>
                <ul className={styles.related}>
                  {item.page && (
                    <li>
                      <Link to={`/case-studies/${item.slug}`} className={styles.relatedLink}>
                        <span className={styles.relatedIcon}><BookIcon width="16" height="16" /></span>
                        <span><strong>Case study</strong><span>The full story, as an article</span></span>
                      </Link>
                    </li>
                  )}
                  {documents.map((d) => (
                    <li key={d.href}>
                      <DocButton src={d.href} title={d.title} className={styles.relatedLink}>
                        <span className={styles.relatedIcon}><ExternalIcon width="16" height="16" /></span>
                        <span><strong>{d.action}</strong><span>{d.meta}</span></span>
                      </DocButton>
                    </li>
                  ))}
                  {item.href && (
                    <li>
                      <a href={item.href} target="_blank" rel="noopener" className={styles.relatedLink}>
                        <span className={styles.relatedIcon}><GitHubIcon width="16" height="16" /></span>
                        <span><strong>GitHub</strong><span>Public repository</span></span>
                      </a>
                    </li>
                  )}
                  {!item.page && !documents.length && !item.href && (
                    <li className={styles.none}>No write-up yet. The description covers it.</li>
                  )}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
