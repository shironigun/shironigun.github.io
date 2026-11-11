import { useEffect, useState } from 'react';
import { useInView, useReducedMotion } from '../../lib/hooks';
import styles from './visuals.module.css';

// The QA loop from the QA Engineering Plugin: six steps around one shared state.
// Auto-advances while visible; Pause/Play satisfies WCAG 2.2.2; reduced motion = no autoplay.

const STEPS = [
  { n: 1, name: 'Analyze', agent: 'story intelligence', body: 'Reads the whole story: acceptance criteria, comments, history and linked bugs. Every claim is labelled Confirmed, Inferred, Assumption or Gap. Read-only.' },
  { n: 2, name: 'Author cases', agent: 'drafted cases', gate: true, body: 'Drafts test cases in the team’s house style. You choose which ones go forward.' },
  { n: 3, name: 'Publish', agent: 'tracker publish', gate: true, body: 'Shows a dry run of every title, suite and link first, then waits for your explicit yes before anything is written.' },
  { n: 4, name: 'Automate', agent: 'automation engine', body: 'Turns approved cases into Playwright specs that reuse the framework and trace back to each case.' },
  { n: 5, name: 'Run', agent: 'run suite', body: 'Runs only what the change affects and reports the real pass, fail and flaky counts.' },
  { n: 6, name: 'File bugs', agent: 'failure to bug', gate: true, body: 'Reads the failure trace, classifies it, and drafts product bugs. Nothing is filed without your yes.' },
];

const POS = ['top', 'rightTop', 'rightBottom', 'bottom', 'leftBottom', 'leftTop'];

export default function QaLoop() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView(0.4);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  const autoplay = playing && inView && !reduced;

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 2800);
    return () => clearInterval(id);
  }, [autoplay]);

  const step = STEPS[active];

  return (
    <figure className={styles.loop} ref={ref}>
      <div className={styles.loopStage}>
        <svg className={styles.loopRing} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <ellipse cx="50" cy="50" rx="34" ry="38" />
        </svg>

        <ol className={styles.loopNodes} aria-label="The six steps of the QA loop">
          {STEPS.map((s, i) => (
            <li key={s.n} className={styles[POS[i]]}>
              <button
                type="button"
                className={`${styles.loopNode} ${i === active ? styles.loopNodeActive : ''}`}
                aria-pressed={i === active}
                onClick={() => { setActive(i); setPlaying(false); }}
              >
                <span className={styles.loopNum}>{s.n}</span>
                <span className={styles.loopText}>
                  <span className={styles.loopName}>{s.name}</span>
                  <span className={styles.loopAgent}>{s.agent}</span>
                </span>
                {s.gate && <span className={styles.gate}>Your yes</span>}
              </button>
            </li>
          ))}
        </ol>

        <div className={styles.loopCenter}>
          <span className={styles.loopCenterLabel}>Shared state</span>
          <span className={styles.loopThread}>
            <span>story</span><span>case</span><span>script</span><span>bug</span>
          </span>
          <span className={styles.loopCenterNote}>One traceable thread</span>
        </div>
      </div>

      <div className={styles.loopDetail}>
        <div>
          <p className={styles.loopDetailHead}>
            Step {step.n} of 6: {step.name}
            {step.gate && <span className={styles.gateInline}>Gated</span>}
          </p>
          <p className={styles.loopDetailBody}>{step.body}</p>
        </div>
        {reduced ? (
          <p className={styles.loopHint}>Choose a step to read about it.</p>
        ) : (
          <button
            type="button"
            className={styles.playButton}
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause the loop animation' : 'Play the loop animation'}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            )}
            <span aria-hidden="true">{playing ? 'Pause' : 'Play'}</span>
          </button>
        )}
      </div>
      <figcaption className={styles.caption}>
        Story in, filed bug out. The three steps marked “Your yes” never write to the tracker without explicit approval.
      </figcaption>
    </figure>
  );
}
