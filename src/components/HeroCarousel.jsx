import { useEffect, useRef, useState } from 'react';
import { Link } from '../lib/router';
import { useReducedMotion } from '../lib/hooks';
import { heroSlides } from '../content/heroSlides';
import { CheckIcon, ChevronIcon, PersonIcon } from './Icons';
import styles from './HeroCarousel.module.css';

// The hero carousel: one node diagram per project. A slide advances every three seconds,
// timed by the progress bar's own animation so that pausing (hover, keyboard focus, the pause
// button or the carousel leaving the screen) resumes exactly where it stopped. With reduced
// motion nothing moves on its own. Diagrams are decorative; each slide's title and caption
// carry the meaning.

const W = 560;
const H = 360;
const pct = (x, total) => `${(x / total) * 100}%`;
const pad = (n) => String(n).padStart(2, '0');

function edgePath(a, b, curve = 0) {
  if (!curve) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - curve;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}

function Card({ card }) {
  const style = { left: pct(card.x, W), top: pct(card.y, H), width: pct(card.w, W) };
  if (card.kind === 'terminal') {
    return (
      <div className={`${styles.card} ${styles.terminal}`} style={style}>
        <span className={styles.lights}><i /><i /><i /></span>
        {card.lines.map(([state, text], i) => (
          <span key={text} className={styles.line} data-state={state} style={{ '--i': i }}>
            {state === 'ok' ? <CheckIcon width="10" height="10" /> : <span className={styles.diamond} />}
            {text}
          </span>
        ))}
      </div>
    );
  }
  if (card.kind === 'approval') {
    return (
      <div className={`${styles.card} ${styles.approval}`} style={style}>
        <span className={styles.approvalTitle}>{card.title}</span>
        <span className={styles.approvalActions}>
          <span className={styles.approve}>{card.actions[0]}</span>
          <span className={styles.decline}>{card.actions[1]}</span>
        </span>
      </div>
    );
  }
  if (card.kind === 'checklist') {
    return (
      <div className={`${styles.card} ${styles.checklist}`} style={style}>
        <span className={styles.checklistTitle}>{card.title}</span>
        {card.rows.map(([state, text], i) => (
          <span key={text} className={styles.checkRow} style={{ '--i': i }}>
            <span className={styles.verdict} data-state={state}>{state === 'ok' ? 'Pass' : 'Fix'}</span>
            {text}
          </span>
        ))}
      </div>
    );
  }
  if (card.kind === 'stats') {
    return (
      <div className={`${styles.card} ${styles.stats}`} style={style}>
        {card.items.map(([value, label], i) => (
          <span key={label} style={{ '--i': i }}><strong>{value}</strong>{label}</span>
        ))}
      </div>
    );
  }
  return (
    <div className={`${styles.card} ${styles.chips} ${card.dark ? styles.chipsDark : ''}`} style={style}>
      {card.items.map((item, i) => <span key={item} style={{ '--i': i }}>{item}</span>)}
    </div>
  );
}

function Diagram({ slide, animate }) {
  const points = Object.fromEntries(
    [...slide.nodes, ...(slide.hub ? [{ id: 'hub', ...slide.hub }] : [])].map((n) => [n.id, n])
  );
  return (
    <div className={`${styles.stage} ${slide.cycle ? styles.cycle : ''}`} aria-hidden="true">
      <svg className={styles.wires} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {slide.orbit && <ellipse className={styles.orbit} cx={slide.orbit.cx} cy={slide.orbit.cy} rx={slide.orbit.rx} ry={slide.orbit.ry} />}
        {slide.loop && <path className={styles.flow} d={slide.loop} />}
        {(slide.paths || []).map((d) => <path key={d} className={styles.flow} d={d} />)}
        {(slide.edges || []).map(([a, b, opts = {}]) => (
          <path key={a + b} className={opts.flow ? styles.flow : styles.wire} d={edgePath(points[a], points[b], opts.curve)} />
        ))}
        {animate && slide.packet && (
          <circle className={styles.packet} r="4.5">
            <animateMotion dur={`${slide.packet.dur}s`} repeatCount="indefinite" path={slide.packet.path} />
          </circle>
        )}
      </svg>

      {slide.hub && (
        <div className={styles.hub} style={{ left: pct(slide.hub.x, W), top: pct(slide.hub.y, H) }}>
          <span className={styles.hubRing} />
          <strong>{slide.hub.label}</strong>
          <small>{slide.hub.sub}</small>
          <span className={styles.typing}><i /><i /><i /></span>
        </div>
      )}

      {slide.nodes.map((n, i) => (
        <div
          key={n.id}
          className={`${styles.node} ${n.kind ? styles[n.kind] : ''}`}
          style={{ left: pct(n.x, W), top: pct(n.y, H), '--i': i }}
        >
          {n.kind === 'person' ? <span className={styles.avatar}><PersonIcon width="12" height="12" /></span> : <span className={styles.nodeDot} />}
          <span className={styles.nodeText}>
            <strong>{n.label}</strong>
            {n.sub && <small>{n.sub}</small>}
          </span>
        </div>
      ))}

      {(slide.cards || []).map((c, i) => <Card key={c.kind + i} card={c} />)}
    </div>
  );
}

export default function HeroCarousel() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const rootRef = useRef(null);
  const count = heroSlides.length;

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = !reduced && !paused && !hovered && !focused && onScreen;
  const go = (i) => setIndex((i + count) % count);

  return (
    <section
      ref={rootRef}
      className={styles.carousel}
      aria-roledescription="carousel"
      aria-label="Selected work"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => { if (e.target.matches(':focus-visible')) setFocused(true); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
    >
      <div className={styles.viewport} aria-live={running ? 'off' : 'polite'}>
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${s.title}`}
            data-active={i === index || undefined}
            aria-hidden={i !== index}
            inert={i !== index}
          >
            <div className={styles.slideHead}>
              <span className={styles.label}>{s.label}</span>
              <span className={styles.counter}>{pad(i + 1)} / {pad(count)}</span>
            </div>
            <Diagram slide={s} animate={!reduced} />
            <div className={styles.slideFoot}>
              <div>
                <p className={styles.title}>{s.title}</p>
                <p className={styles.caption}>{s.caption}</p>
              </div>
              <Link to={s.to} className="link-quiet">View case study</Link>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.arrow} onClick={() => go(index - 1)} aria-label="Previous slide">
          <ChevronIcon width="18" height="18" style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div className={styles.dots}>
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={styles.dot}
              aria-label={`Show slide ${i + 1}: ${s.title}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => go(i)}
            >
              <span className={styles.dotTrack}>
                {i === index && (
                  <span
                    key={index}
                    className={`${styles.dotFill} ${reduced ? '' : styles.timed}`}
                    style={{ animationPlayState: running ? 'running' : 'paused' }}
                    onAnimationEnd={() => go(index + 1)}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <button type="button" className={styles.arrow} onClick={() => go(index + 1)} aria-label="Next slide">
          <ChevronIcon width="18" height="18" />
        </button>
        {!reduced && (
          <button type="button" className={styles.pause} onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Start slide rotation' : 'Stop slide rotation'}>
            {paused ? (
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" /></svg>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
