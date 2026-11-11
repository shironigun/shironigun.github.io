import { useRef, useState } from 'react';
import { Link } from '../lib/router';
import { operatingModel } from '../content/method';
import { CheckIcon, ShieldIcon } from './Icons';
import styles from './OperatingModel.module.css';

// Six stages from problem to release. Each tab shows what I do, the artifact the stage produces
// (drawn as a small illustrative visual), the gate it must pass and where to see it in practice.

function Artifact({ kind }) {
  if (kind === 'problem') {
    return (
      <div className={styles.canvas}>
        <p className={styles.artTitle}>Problem framing</p>
        <div className={styles.canvasGrid}>
          <div><span>Problem</span>Commitments made to customers in conversations are easy to miss.</div>
          <div><span>Who has it</span>Sales managers and their reps.</div>
          <div><span>Today</span>Found out only when the customer follows up.</div>
          <div><span>Better looks like</span>Every open commitment visible, ranked by urgency.</div>
        </div>
      </div>
    );
  }
  if (kind === 'story') {
    return (
      <div className={styles.story}>
        <p className={styles.storyMeta}><span className={styles.storyType}>User story</span><span className={styles.ready}>Ready</span></p>
        <p className={styles.storyTitle}>Broadcast to a customer group</p>
        <p className={styles.storyText}>As a <b>sales manager</b>, I want to send a broadcast to a customer group, so that I reach customers who agreed to hear from us.</p>
        <ul className={styles.criteria}>
          <li><b>Given</b> a customer group <b>when</b> I send <b>then</b> only opted-in customers receive it</li>
          <li><b>Given</b> an opt-out after scheduling <b>when</b> it sends <b>then</b> that customer is excluded</li>
          <li><b>Given</b> an empty group <b>when</b> I open it <b>then</b> I see how to add customers</li>
        </ul>
      </div>
    );
  }
  if (kind === 'review') {
    const rows = [['ok', 'Component library'], ['ok', 'Design tokens'], ['ok', 'Mobile layout'], ['ok', 'Accessibility'], ['fix', 'Empty state']];
    return (
      <div className={styles.review}>
        <p className={styles.artTitle}>Design review</p>
        {rows.map(([state, text], i) => (
          <p key={text} className={styles.reviewRow} style={{ '--i': i }}>
            <span className={styles.verdict} data-state={state}>{state === 'ok' ? 'Pass' : 'Fix'}</span>{text}
          </p>
        ))}
      </div>
    );
  }
  if (kind === 'prototype') {
    const steps = ['Specification', 'Claude Code', 'Prototype', 'Team feedback'];
    return (
      <div className={styles.flow}>
        <p className={styles.artTitle}>Prototype loop</p>
        <ol className={styles.flowSteps}>
          {steps.map((s, i) => <li key={s} style={{ '--i': i }} data-accent={s === 'Prototype' || undefined}><span className={styles.flowDot} />{s}</li>)}
        </ol>
        <p className={styles.flowNote}>No development time committed until the team has used it.</p>
      </div>
    );
  }
  if (kind === 'board') {
    const cols = [['To do', 2], ['In progress', 2], ['In review', 1], ['Done', 2]];
    return (
      <div className={styles.board}>
        <p className={styles.artTitle}>Sprint board</p>
        <div className={styles.boardCols}>
          {cols.map(([name, n]) => (
            <div key={name} className={styles.boardCol}>
              <span className={styles.boardHead}>{name}</span>
              {Array.from({ length: n }, (_, i) => <span key={i} className={styles.boardCard}><i /><i /></span>)}
            </div>
          ))}
          <span className={styles.boardMover} aria-hidden="true"><i /><i /></span>
        </div>
      </div>
    );
  }
  const stages = [['Draft', 'done'], ['Criteria', 'done'], ['Build', 'done'], ['Test', 'now'], ['Release', 'next']];
  return (
    <div className={styles.gate}>
      <p className={styles.artTitle}>Release gate</p>
      <ol className={styles.gateStages}>
        {stages.map(([name, state]) => <li key={name} data-state={state}><span />{name}</li>)}
      </ol>
      <ul className={styles.gateChecks}>
        {['Passes every quality check consistently', 'Agreed criteria met', 'Critical failure stops the release'].map((c, i) => (
          <li key={c} style={{ '--i': i }}><CheckIcon width="13" height="13" />{c}</li>
        ))}
      </ul>
    </div>
  );
}

export default function OperatingModel() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const stage = operatingModel[active];

  const onKey = (e) => {
    const last = operatingModel.length - 1;
    let next = null;
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className={styles.model} style={{ '--progress': active / (operatingModel.length - 1) }}>
      <div className={styles.tabs} role="tablist" aria-label="Stages from problem to release" onKeyDown={onKey}>
        <span className={styles.rail} aria-hidden="true"><span /></span>
        {operatingModel.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => { tabs.current[i] = el; }}
            type="button"
            role="tab"
            id={`stage-tab-${s.id}`}
            aria-selected={i === active}
            aria-controls="stage-panel"
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            data-state={i < active ? 'done' : i === active ? 'now' : 'next'}
            onClick={() => setActive(i)}
          >
            <span className={styles.num}>{i + 1}</span>
            <span className={styles.tabName}>{s.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.panel} role="tabpanel" id="stage-panel" aria-labelledby={`stage-tab-${stage.id}`} key={stage.id}>
        <div className={styles.copy}>
          <p className={styles.step}>Stage {active + 1} of {operatingModel.length}</p>
          <h3 className={styles.stageName}>{stage.summary}</h3>
          <p className={styles.what}>{stage.what}</p>
          <div className={styles.exit}>
            <span className={styles.exitIcon} aria-hidden="true"><ShieldIcon width="18" height="18" /></span>
            <p><strong>Exit gate</strong>{stage.gate}</p>
          </div>
          <ul className={styles.tools} aria-label="Tools and methods">
            {stage.tools.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <Link to={stage.proof.to} className="link-quiet">See it in practice: {stage.proof.text}</Link>
        </div>
        <div className={styles.art} aria-hidden="true">
          <Artifact kind={stage.artifact} />
        </div>
      </div>
    </div>
  );
}
