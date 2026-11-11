import styles from './visuals.module.css';
import { hoursText } from '../../content/hours';

// Small, static previews for project cards. Decorative: the card's text carries the meaning.

function PromiseThumb() {
  return (
    <div className={styles.thumbList}>
      {[['Critical', 'Confirm the appraisal time'], ['High', 'Send the owner’s manual'], ['Medium', 'Share financing options']].map(([u, t]) => (
        <div key={t} className={styles.thumbRow}>
          <span className={`${styles.thumbChip} ${styles[`thumb${u}`]}`}>{u}</span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );
}

function ReviewThumb() {
  return (
    <div className={styles.thumbList}>
      {['Library components', 'Tokens followed', 'Mobile layout', 'Empty state'].map((t, i) => (
        <div key={t} className={styles.thumbRow}>
          <span className={i === 3 ? styles.thumbFix : styles.thumbOk}>{i === 3 ? 'Fix' : 'Pass'}</span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );
}

function LoopThumb() {
  const steps = ['Analyze', 'Author', 'Publish', 'Automate', 'Run', 'File bugs'];
  return (
    <div className={styles.thumbLoop}>
      {steps.map((s, i) => (
        <span key={s} className={`${styles.thumbStep} ${[1, 2, 5].includes(i) ? styles.thumbStepGate : ''}`}>{i + 1} {s}</span>
      ))}
    </div>
  );
}

function StatsThumb() {
  return (
    <div className={styles.thumbStats}>
      <span><strong>~40%</strong> less defect leakage</span>
      <span><strong>0</strong> critical defects in 6 sprints</span>
      <span><strong>3</strong> teams adopted it</span>
    </div>
  );
}

function NumbersThumb({ items }) {
  return (
    <div className={styles.thumbStats}>
      {items.map(([n, t]) => <span key={t}><strong>{n}</strong> {t}</span>)}
    </div>
  );
}

const TrainingThumb = () => <NumbersThumb items={[[hoursText.junior, 'hours of training'], ['120+', 'live sessions'], ['60+', 'SOPs written']]} />;
const FoundationsThumb = () => <NumbersThumb items={[['9', 'project briefs'], ['11', 'building blocks taught'], ['183', 'page handbook']]} />;
const PostmanThumb = () => <NumbersThumb items={[['15', 'capabilities explained'], ['4', 'plans mapped'], ['5+', 'teams adopted it']]} />;

function TrophyThumb() {
  return (
    <div className={styles.thumbTrophy}>
      <strong>1st</strong>
      <span>of 11 teams, division-wide AI hackathon</span>
    </div>
  );
}

function PrototypesThumb() {
  return (
    <div className={styles.thumbList}>
      {[['Heading to production', 'AI Promise Tracker'], ['Assisted', 'AI campaign planning'], ['Method', 'Click it before building it']].map(([s, t]) => (
        <div key={t} className={styles.thumbRow}>
          <span className={styles.thumbTag}>{s}</span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );
}

function AuditThumb() {
  return (
    <div className={styles.thumbAudit}>
      <div className={styles.thumbBar}><span style={{ flexGrow: 6 }} /><span style={{ flexGrow: 1 }} /></div>
      <span><strong>Backend off:</strong> which tests still pass?</span>
    </div>
  );
}

function PipelineThumb() {
  return (
    <div className={styles.thumbLoop}>
      {['Analyst', 'Tester', 'Bug writer', 'Code verifier', 'Impact analyser', 'Failure triage'].map((a) => (
        <span key={a} className={styles.thumbStep}>{a}</span>
      ))}
    </div>
  );
}

function DecisionsThumb() {
  return (
    <div className={styles.thumbList}>
      {[['Workshop', '10 decisions on email messaging'], ['Brief', 'Measuring rep performance'], ['Model', 'Cost of an AI feature']].map(([s, t]) => (
        <div key={t} className={styles.thumbRow}>
          <span className={styles.thumbTag}>{s}</span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );
}

function FilmsThumb() {
  return (
    <div className={styles.thumbFilms}>
      {['Enterprise promo', 'App-store cut', 'Promise Tracker story'].map((t) => (
        <span key={t} className={styles.thumbFilm}>
          <span className={styles.thumbFrame}><span className={styles.thumbPlay} /></span>
          {t}
        </span>
      ))}
    </div>
  );
}

function DashboardsThumb() {
  const bars = [34, 48, 40, 62, 54, 70, 58, 78, 66, 84];
  return (
    <div className={styles.thumbDash}>
      <div className={styles.thumbChart}>{bars.map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
      <span><strong>Under 1 s</strong> page loads, down from 25 to 70 s</span>
    </div>
  );
}

function StandardsThumb() {
  return (
    <div className={styles.thumbSpec}>
      <div className={styles.thumbSpecRow}>
        <span className={styles.specButton}>Button</span>
        <span className={styles.specInput}>Input field</span>
        <span className={styles.specToggle}><span /></span>
      </div>
      <span><strong>200+</strong> inconsistencies found in the audit</span>
    </div>
  );
}

function EvalsThumb() {
  return (
    <div className={styles.thumbList}>
      {[['Rule', 'One test per rule'], ['Gate', 'All 3 runs must pass'], ['Course', '16 lessons, 5 labs']].map(([s, t]) => (
        <div key={t} className={styles.thumbRow}>
          <span className={styles.thumbTag}>{s}</span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );
}

const THUMBS = {
  evals: EvalsThumb,
  decisions: DecisionsThumb,
  films: FilmsThumb,
  dashboards: DashboardsThumb,
  standards: StandardsThumb,
  promise: PromiseThumb,
  designReview: ReviewThumb,
  qaLoop: LoopThumb,
  stats: StatsThumb,
  training: TrainingThumb,
  postman: PostmanThumb,
  foundations: FoundationsThumb,
  trophy: TrophyThumb,
  prototypes: PrototypesThumb,
  audit: AuditThumb,
  pipeline: PipelineThumb,
};

export default function Thumb({ kind }) {
  const C = THUMBS[kind];
  if (!C) return null;
  return <div className={styles.thumb} aria-hidden="true"><C /></div>;
}
