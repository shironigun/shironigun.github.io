import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../lib/hooks';
import { testimonials } from '../content/profile';
import { ChevronIcon } from './Icons';
import styles from './Testimonials.module.css';

// A plain testimonial carousel: one card at a time, sliding sideways, with the height following
// the card in view. Arrows, dots and swipe move it; it also advances every eight seconds, except
// while hovered, focused, paused or with reduced motion. Quotes are verbatim and complete.
const INTERVAL = 8000;

export default function Testimonials() {
  const reduced = useReducedMotion();
  const count = testimonials.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [height, setHeight] = useState(null);
  const slides = useRef([]);
  const touchX = useRef(null);

  const go = (i) => setIndex(((i % count) + count) % count);
  const running = !reduced && !paused && !hovered && !focused;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearTimeout(t);
  }, [running, index, count]);

  // Size the window to the card in view, and keep it right when the width changes.
  useLayoutEffect(() => {
    const el = slides.current[index];
    if (!el) return;
    const measure = () => setHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [index]);

  return (
    <section
      className={styles.carousel}
      aria-roledescription="carousel"
      aria-label="Recommendations from colleagues"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => { if (e.target.matches(':focus-visible')) setFocused(true); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
    >
      <div
        className={styles.window}
        style={height ? { height: height + 16 } : undefined}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        <ul className={styles.track} style={{ '--at': index }} aria-live={running ? 'off' : 'polite'}>
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              ref={(el) => { slides.current[i] = el; }}
              className={styles.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              inert={i !== index}
            >
              <figure className={styles.card}>
                <svg className={styles.mark} viewBox="0 0 48 36" aria-hidden="true"><path d="M0 36V22C0 9.6 6.4 2.3 19.2 0l2 4.8C13.9 6.7 10.4 10.8 10 17h9v19H0Zm27 0V22C27 9.6 33.4 2.3 46.2 0l1.8 4.8C40.9 6.7 37.4 10.8 37 17h9v19H27Z" /></svg>
                <blockquote className={styles.quote}>{t.quote}</blockquote>
                <figcaption className={styles.author}>
                  <img src={t.photo} alt="" width="44" height="44" loading="lazy" />
                  <span>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.controls}>
        <button type="button" className={styles.round} onClick={() => go(index - 1)} aria-label="Previous">
          <ChevronIcon width="18" height="18" style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div className={styles.dots}>
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className={styles.dot}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button type="button" className={styles.round} onClick={() => go(index + 1)} aria-label="Next">
          <ChevronIcon width="18" height="18" />
        </button>
        {!reduced && (
          <button type="button" className={styles.round} onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Start rotation' : 'Stop rotation'}>
            {paused ? (
              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" /></svg>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
