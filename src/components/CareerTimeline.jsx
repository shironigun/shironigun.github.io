import { useEffect, useRef, useState } from 'react';
import { Link } from '../lib/router';
import { useReducedMotion } from '../lib/hooks';
import { chapterOf, chapters, journey, nodeTypes } from '../content/journey';
import { SubjectIcon } from './Icons';
import styles from './CareerTimeline.module.css';

// The highlighted steps of the career journey, in order.
const milestones = journey
  .filter((m) => m.highlight)
  .map((m) => ({
    ...m,
    year: m.date.slice(0, 4),
    chapter: chapterOf(m.date),
    kind: nodeTypes[m.type].label,
    icon: nodeTypes[m.type].icon,
  }));

// The path from design intern to AI product analyst, driven by scroll. The rail fills as the
// visitor reads, each milestone lights up when the line reaches it, and the panel on the left
// follows with the year and the chapter. With reduced motion the whole path is shown at once.
export default function CareerTimeline() {
  const reduced = useReducedMotion();
  const trackRef = useRef(null);
  const [active, setActive] = useState(reduced ? milestones.length - 1 : 0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (reduced) {
      track.style.setProperty('--fill', '1');
      setActive(milestones.length - 1);
      return;
    }
    const items = [...track.querySelectorAll('[data-milestone]')];
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.55;
      const box = track.getBoundingClientRect();
      const fill = Math.min(1, Math.max(0, (line - box.top) / box.height));
      track.style.setProperty('--fill', fill.toFixed(4));
      let reached = 0;
      items.forEach((el, i) => {
        if (el.getBoundingClientRect().top + 28 < line) reached = i;
      });
      setActive((prev) => (prev === reached ? prev : reached));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced]);

  const current = milestones[active];

  return (
    <div className={styles.timeline} data-reveal="off">
      <div className={styles.panel}>
        <p className={styles.year} aria-hidden="true">
          <span key={current.year}>{current.year}</span>
        </p>
        <ol className={styles.chapters} aria-label="Career chapters">
          {chapters.map((c, i) => (
            <li key={c.role} data-state={i < current.chapter ? 'done' : i === current.chapter ? 'now' : 'next'}>
              <span className={styles.chYears}>{c.years}</span>
              <span className={styles.chRole}>{c.role}</span>
              <span className={styles.chPlace}>{c.place}</span>
            </li>
          ))}
        </ol>
        <div className={styles.meter} aria-hidden="true">
          <span>{String(active + 1).padStart(2, '0')}</span>
          <span className={styles.meterBar}><span style={{ transform: `scaleX(${(active + 1) / milestones.length})` }} /></span>
          <span>{milestones.length}</span>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        <span className={styles.rail} aria-hidden="true"><span className={styles.railFill} /></span>
        <ol className={styles.list}>
          {milestones.map((m, i) => (
            <li
              key={m.title}
              data-milestone
              className={styles.item}
              data-state={i < active ? 'past' : i === active ? 'now' : 'next'}
            >
              <span className={styles.node} aria-hidden="true">
                <SubjectIcon name={m.icon} width="16" height="16" />
              </span>
              <div className={styles.card}>
                <p className={styles.meta}>
                  <span className={styles.when}>{m.when}</span>
                  <span className={styles.kind}>{m.kind}</span>
                </p>
                <h3 className={styles.title}>{m.to ? <Link to={m.to}>{m.title}</Link> : m.title}</h3>
                <p className={styles.detail}>{m.detail}</p>
                {m.photo && <img className={styles.photo} src={m.photo} alt={m.photoAlt || ''} loading="lazy" />}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
