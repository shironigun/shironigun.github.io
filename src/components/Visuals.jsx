import { CheckIcon, PersonIcon } from './Icons';
import styles from './Visuals.module.css';

// Small product recreations used as evidence beside each featured project.

export function ReleaseGate() {
  const stages = [
    { name: 'Draft', state: 'done' },
    { name: 'Quality criteria', state: 'done' },
    { name: 'Development', state: 'done' },
    { name: 'Test', state: 'current' },
    { name: 'Production', state: 'next' },
  ];
  const checks = [
    'Passes every quality check consistently',
    'Every answer matches the expected structure',
    'Never invents facts the conversation doesn’t contain',
    'Every manager action works end to end',
  ];
  return (
    <figure className={styles.frame}>
      <div className={styles.frameHead}>
        <span>Release gate, AI feature</span>
        <span className={styles.version}>Pre-production</span>
      </div>
      <ol className={styles.stages}>
        {stages.map((s) => (
          <li key={s.name} className={styles[s.state]}>
            <span className={styles.stageDot} aria-hidden="true" />
            <span>{s.name}</span>
          </li>
        ))}
      </ol>
      <ul className={styles.checks}>
        {checks.map((c) => (
          <li key={c}><CheckIcon width="16" height="16" />{c}</li>
        ))}
      </ul>
      <figcaption className={styles.caption}>The process every change follows before it can reach customers.</figcaption>
    </figure>
  );
}

export function TestLevels() {
  const levels = [
    { name: 'Contract', note: 'Right shape of data' },
    { name: 'Endpoint', note: 'Right answer to good and bad input' },
    { name: 'Workflow', note: 'Whole business flows hold together' },
  ];
  return (
    <figure className={styles.frame}>
      <div className={styles.frameHead}>
        <span>The suite, by level</span>
        <span className={styles.version}>Runs in the pipeline</span>
      </div>
      <ul className={styles.levels}>
        {levels.map((l) => (
          <li key={l.name}>
            <div className={styles.levelText}>
              <strong>{l.name}</strong>
              <span>{l.note}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.callout}>
        <strong>Audit:</strong> with the backend switched off, some tests still passed. I rebuilt the suite so they fail.
      </div>
    </figure>
  );
}

export function PluginFlow() {
  const steps = ['User story', 'Test cases', 'Automated tests', 'Bug draft'];
  return (
    <figure className={styles.frame}>
      <div className={styles.frameHead}>
        <span>QA Engineering Plugin</span>
        <span className={styles.version}>Open source</span>
      </div>
      <ol className={styles.flow}>
        {steps.map((s, i) => (
          <li key={s}>
            <span className={styles.flowStep}>{s}</span>
            {i < steps.length - 1 && (
              <span className={styles.approve}>
                <PersonIcon width="14" height="14" />
                You approve
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className={styles.caption}>Built from six skills I wrote and refined. Nothing is written to the tracker without a person’s approval.</figcaption>
    </figure>
  );
}

export function BroadcastDashboard() {
  const kpis = [
    { label: 'Messages sent', value: '12,480', delta: '+8% vs last month' },
    { label: 'Delivered', value: '97.8%', delta: '+0.4 pts' },
    { label: 'Replies', value: '1,134', delta: '+12%' },
  ];
  const bars = [38, 52, 46, 61, 58, 72, 66, 80, 74, 88, 82, 94];
  return (
    <figure className={styles.frame}>
      <div className={styles.frameHead}>
        <span>Broadcast performance</span>
        <span className={styles.version}>Last 12 weeks</span>
      </div>
      <div className={styles.kpis}>
        {kpis.map((k) => (
          <div key={k.label} className={styles.kpi}>
            <span className={styles.kpiLabel}>{k.label}</span>
            <span className={styles.kpiValue}>{k.value}</span>
            <span className={styles.kpiDelta}>{k.delta}</span>
          </div>
        ))}
      </div>
      <div className={styles.chart} aria-hidden="true">
        {bars.map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}
      </div>
      <figcaption className={styles.caption}>Recreation of a dashboard I added during the revamp. All numbers are fictional.</figcaption>
    </figure>
  );
}
