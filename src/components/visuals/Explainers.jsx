import { useEffect, useState } from 'react';
import { useInView, useReducedMotion } from '../../lib/hooks';
import { journey } from '../../content/site';
import { CheckIcon, CloseIcon, PersonIcon } from '../Icons';
import styles from './visuals.module.css';

// Idea to launch: the stages fill in once, in order, when the journey comes into view.
export function Journey({ compact = false }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView(0.3);
  const done = inView || reduced;
  return (
    <figure className={`${styles.journey} ${compact ? styles.journeyCompact : ''}`} ref={ref}>
      <ol className={`${styles.journeyList} ${done ? styles.journeyDone : ''}`} aria-label="From first idea to launch">
        {journey.map((j, i) => (
          <li key={j.stage} style={{ '--i': i }}>
            <span className={styles.journeyDot} aria-hidden="true">{i + 1}</span>
            <span className={styles.journeyStage}>{j.stage}</span>
            <span className={styles.journeyArtifact}>{j.artifact}</span>
          </li>
        ))}
      </ol>
      {!compact && <figcaption className={styles.caption}>My role on AI Promise Tracker covered every stage.</figcaption>}
    </figure>
  );
}

// The audit: switch the backend off and see which tests still claim to pass.
export function AuditSplit() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView(0.5);
  const [backendOff, setBackendOff] = useState(false);
  const [touched, setTouched] = useState(false);

  // One orchestrated moment: flip the switch once when first seen, unless the visitor already did.
  useEffect(() => {
    if (!inView || touched) return;
    if (reduced) { setBackendOff(true); return; }
    const id = setTimeout(() => setBackendOff(true), 900);
    return () => clearTimeout(id);
  }, [inView, touched, reduced]);

  const set = (off) => { setTouched(true); setBackendOff(off); };

  return (
    <figure className={styles.audit} ref={ref}>
      <div className={styles.switchRow} role="group" aria-label="Backend">
        <span className={styles.switchLabel}>Backend</span>
        <button type="button" className={styles.switchBtn} aria-pressed={!backendOff} onClick={() => set(false)}>On</button>
        <button type="button" className={styles.switchBtn} aria-pressed={backendOff} onClick={() => set(true)}>Off</button>
      </div>

      <div className={`${styles.auditBar} ${backendOff ? styles.auditOff : ''}`} aria-hidden="true">
        <span className={styles.auditFail} style={{ flexGrow: backendOff ? 6 : 0 }} />
        <span className={styles.auditPass} style={{ flexGrow: backendOff ? 1 : 7 }} />
      </div>

      <div className={styles.auditLegend} aria-live="polite">
        {backendOff ? (
          <>
            <p><span className={`${styles.key} ${styles.keyFail}`} aria-hidden="true" /><strong>Most</strong> failed, as they should with no backend</p>
            <p><span className={`${styles.key} ${styles.keyWarn}`} aria-hidden="true" /><strong>Some</strong> still passed. These were false positives.</p>
          </>
        ) : (
          <p><span className={`${styles.key} ${styles.keyPass}`} aria-hidden="true" /><strong>Every</strong> test passing. Looks healthy.</p>
        )}
      </div>
      <figcaption className={styles.caption}>What the audit showed. The clean-up I directed makes tests fail when the system is missing, as they should.</figcaption>
    </figure>
  );
}

// The AI QA workbench's agents, lit in sequence once when seen.
const AGENTS = [
  { name: 'Analyst', job: 'Reads the story and its context' },
  { name: 'Tester', job: 'Writes test cases in house style' },
  { name: 'Bug writer', job: 'Drafts bug reports', gate: true },
  { name: 'Code verifier', job: 'Checks the generated tests' },
  { name: 'Impact analyser', job: 'Picks the tests a build affects' },
  { name: 'Failure triage', job: 'Sorts failures, with a confidence score', gate: true },
];

export function AgentPipeline() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView(0.35);
  const done = inView || reduced;
  return (
    <figure className={styles.pipeline} ref={ref}>
      <ol className={`${styles.pipelineList} ${done ? styles.pipelineDone : ''}`} aria-label="Agents in the workbench">
        {AGENTS.map((a, i) => (
          <li key={a.name} style={{ '--i': i }}>
            <span className={styles.pipelineName}>{a.name}</span>
            <span className={styles.pipelineJob}>{a.job}</span>
            {a.gate && (
              <span className={styles.pipelineGate}><PersonIcon width="14" height="14" />Drafts first</span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className={styles.caption}>Each agent has one job. Bulk writes to the team’s tracker send only drafts a person approved.</figcaption>
    </figure>
  );
}

// A design review: the screen beside the checklist it is held to. Illustrative.
const REVIEW = [
  { item: 'Components come from the library', ok: true },
  { item: 'Spacing and type follow the tokens', ok: true },
  { item: 'Business rule shown where it matters', ok: true },
  { item: 'Works on mobile', ok: true },
  { item: 'Empty state designed', ok: false },
  { item: 'Contrast and focus pass', ok: true },
];

export function DesignReview() {
  return (
    <figure className={styles.review}>
      <div className={styles.reviewScreen} aria-hidden="true">
        <div className={styles.reviewBar}><span>Customer groups</span><span className={styles.reviewBtn}>New group</span></div>
        <div className={styles.reviewRow}><span>Service due, last 90 days</span><span>1,284</span></div>
        <div className={styles.reviewRow}><span>New leads this month</span><span>312</span></div>
        <div className={styles.reviewRow}><span>Opted in to SMS</span><span>4,906</span></div>
        <div className={styles.reviewNote}>Opted-out customers are excluded when a broadcast is sent.</div>
      </div>
      <ul className={styles.reviewList} aria-label="Design review checklist">
        {REVIEW.map((r) => (
          <li key={r.item} className={r.ok ? styles.reviewOk : styles.reviewFix}>
            {r.ok ? <CheckIcon width="16" height="16" /> : <CloseIcon width="16" height="16" />}
            <span>{r.item}</span>
            <span className={styles.reviewStatus}>{r.ok ? 'Pass' : 'Fix before build'}</span>
          </li>
        ))}
      </ul>
      <figcaption className={styles.caption}>Illustrative review of a fictional screen. Anything marked “Fix before build” goes back to design, not to development.</figcaption>
    </figure>
  );
}

