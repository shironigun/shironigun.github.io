import { ChipIcon, LayersIcon, PersonIcon, ShieldIcon } from './Icons';
import styles from './ArticleDiagrams.module.css';

// Diagram blocks for case studies that need to show a system end to end (see ArticleBody):
//   { flow: [{ name, detail, kind, phase }], caption }   a pipeline; steps with the same `phase` share a row
//   { cards: [{ title, tag, body, meta }], mono, columns, caption }   a grid of named parts (commands, skills, agents)
//   { tree: [{ name, note, depth }], caption }           a folder structure
//   { timeline: [{ when, title, detail }], caption }     dated milestones
// Every diagram is built from lists and text, so it reads the same in a screen reader, on a phone
// and with motion off; arrows and colours only repeat what the words already say.

const KIND = {
  human: { label: 'You decide', Icon: PersonIcon, cls: styles.kHuman },
  ai: { label: 'AI agent', Icon: ChipIcon, cls: styles.kAi },
  gate: { label: 'Gate', Icon: ShieldIcon, cls: styles.kGate },
  system: { label: 'Automatic', Icon: LayersIcon, cls: styles.kSystem },
};

function Step({ step, n }) {
  const kind = KIND[step.kind];
  return (
    <li className={`${styles.step} ${kind ? kind.cls : ''}`}>
      <span className={styles.stepHead}>
        <span className={styles.stepNo} aria-hidden="true">{n}</span>
        {kind && (
          <span className={styles.kind}>
            <kind.Icon width="12" height="12" aria-hidden="true" />{kind.label}
          </span>
        )}
      </span>
      <span className={styles.stepName}>{step.name}</span>
      {step.detail && <span className={styles.stepDetail}>{step.detail}</span>}
    </li>
  );
}

// Steps are grouped into phases in the order they first appear; numbering runs across the whole flow.
export function Flow({ steps, label }) {
  const phases = [];
  steps.forEach((s, i) => {
    const key = s.phase || '';
    let p = phases.find((x) => x.key === key);
    if (!p) { p = { key, steps: [] }; phases.push(p); }
    p.steps.push({ ...s, n: i + 1 });
  });
  return (
    <div className={styles.flow} role="group" aria-label={label || 'Pipeline'}>
      <div className={styles.legend} aria-hidden="true">
        {Object.values(KIND).map((k) => (
          <span key={k.label} className={`${styles.kind} ${k.cls}`}><k.Icon width="12" height="12" />{k.label}</span>
        ))}
      </div>
      {phases.map((p) => (
        <section key={p.key || 'all'} className={styles.phase} aria-label={p.key || undefined}>
          {p.key && <div role="heading" aria-level={3} className={styles.phaseName}>{p.key}</div>}
          <ol className={styles.steps} start={p.steps[0].n}>
            {p.steps.map((s) => <Step key={s.n} step={s} n={s.n} />)}
          </ol>
        </section>
      ))}
    </div>
  );
}

export function Cards({ cards, mono, columns }) {
  return (
    <ul className={styles.cards} data-cols={columns || undefined}>
      {cards.map((c) => (
        <li key={c.title} className={styles.card}>
          <span className={styles.cardTop}>
            <span className={mono ? styles.cardTitleMono : styles.cardTitle}>{c.title}</span>
            {c.tag && <span className={styles.cardTag}>{c.tag}</span>}
          </span>
          {c.body && <span className={styles.cardBody}>{c.body}</span>}
          {c.meta && <span className={styles.cardMeta}>{c.meta}</span>}
        </li>
      ))}
    </ul>
  );
}

export function Tree({ items }) {
  return (
    <ul className={styles.tree}>
      {items.map((it, i) => (
        <li key={`${it.name}-${i}`} style={{ '--depth': it.depth || 0 }}>
          <span className={it.name.endsWith('/') ? styles.dir : styles.file}>{it.name}</span>
          {it.note && <span className={styles.treeNote}>{it.note}</span>}
        </li>
      ))}
    </ul>
  );
}

export function Timeline({ items }) {
  return (
    <ol className={styles.timeline}>
      {items.map((it) => (
        <li key={`${it.when}-${it.title}`}>
          <span className={styles.when}>{it.when}</span>
          <span className={styles.tlTitle}>{it.title}</span>
          {it.detail && <span className={styles.tlDetail}>{it.detail}</span>}
        </li>
      ))}
    </ol>
  );
}

// The words inside these blocks, for the reading time.
export function diagramWords(b) {
  if (b.flow) return b.flow.flatMap((s) => [s.name, s.detail, s.phase]);
  if (b.cards) return b.cards.flatMap((c) => [c.title, c.tag, c.body, c.meta]);
  if (b.tree) return b.tree.flatMap((t) => [t.note]);
  if (b.timeline) return b.timeline.flatMap((t) => [t.when, t.title, t.detail]);
  return [];
}
