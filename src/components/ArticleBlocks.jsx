import { CheckIcon } from './Icons';
import styles from './ArticleBlocks.module.css';

// Blocks that show how Mahmood worked, used inside case studies (see ArticleBody):
//   { stages: [{ name, part, by, now }], caption }   idea to launch, one line of "my part" per stage
//   { decisions: [{ q, options, chose, why }], caption }   the calls that shaped the work
//   { call: { saw, decided, why } }                  the one judgement that mattered most
//   { story: { persona, title, text, criteria }, caption }   a recreated user story
// Everything is plain text and lists, so it reads the same on a phone, in a screen reader and
// with motion turned off.

// Who did the work at each stage. The three labels make authorship visible at a glance.
const BY = {
  me: { label: 'My decision', cls: styles.byMe },
  ai: { label: 'Built with AI agents', cls: styles.byAi },
  proved: { label: 'Proved', cls: styles.byProved },
};

export function Stages({ stages, label = 'How the work moved, stage by stage' }) {
  return (
    <ol className={styles.stages} aria-label={label}>
      {stages.map((s, i) => {
        const by = BY[s.by];
        return (
          <li key={s.name} className={styles.stage} data-now={s.now || undefined}>
            <span className={styles.stageNo} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.stageName}>
              {s.name}
              {s.now && <span className={styles.now}>Now</span>}
            </span>
            <span className={styles.stagePart}>{s.part}</span>
            {by && <span className={`${styles.by} ${by.cls}`}>{by.label}</span>}
          </li>
        );
      })}
    </ol>
  );
}

// When the choice is one of the listed options, it is marked in the list rather than repeated.
export function Decisions({ decisions }) {
  return (
    <div className={styles.decisions}>
      {decisions.map((d) => {
        const marked = d.options?.includes(d.chose);
        return (
        <article key={d.q} className={styles.decision}>
          <div role="heading" aria-level={3} className={styles.decisionQ}>{d.q}</div>
          <dl className={styles.decisionBody}>
            {d.options && (
              <div>
                <dt>{marked ? 'Options, and what I chose' : 'Options'}</dt>
                <dd>
                  <ul className={styles.options}>
                    {d.options.map((o) => (
                      <li key={o} data-chosen={o === d.chose || undefined}>
                        {o === d.chose && <><CheckIcon width="12" height="12" /><span className="visually-hidden">Chosen: </span></>}
                        {o}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            {!marked && (
              <div className={styles.chose}>
                <dt>What I chose</dt>
                <dd>{d.chose}</dd>
              </div>
            )}
            <div>
              <dt>Why</dt>
              <dd>{d.why}</dd>
            </div>
          </dl>
        </article>
        );
      })}
    </div>
  );
}

export function Call({ call }) {
  return (
    <aside className={styles.call} aria-label="My call">
      <p className={styles.callLabel}>My call</p>
      <dl className={styles.callBody}>
        {call.saw && <div><dt>What I saw</dt><dd>{call.saw}</dd></div>}
        <div><dt>What I decided</dt><dd>{call.decided}</dd></div>
        {call.why && <div><dt>Why</dt><dd>{call.why}</dd></div>}
      </dl>
    </aside>
  );
}

export function StoryCard({ story }) {
  return (
    <article className={styles.story} aria-label={`Example user story: ${story.title}`}>
      <p className={styles.storyMeta}>
        {story.persona && <span className={styles.persona}>{story.persona}</span>}
        <span className={styles.ready}><CheckIcon width="12" height="12" />{story.status || 'Definition of ready met'}</span>
      </p>
      <div role="heading" aria-level={3} className={styles.storyTitle}>{story.title}</div>
      <p className={styles.storyText}>{story.text}</p>
      {story.criteria && (
        <ol className={styles.criteria}>
          {story.criteria.map((c, i) => (
            <li key={c}><span className={styles.acId}>AC{i + 1}</span><span>{c}</span></li>
          ))}
        </ol>
      )}
    </article>
  );
}

// The words inside these blocks, for the reading time.
export function blockWords(b) {
  if (b.stages) return b.stages.flatMap((s) => [s.name, s.part]);
  if (b.decisions) return b.decisions.flatMap((d) => [d.q, ...(d.options || []), d.chose, d.why]);
  if (b.call) return [b.call.saw, b.call.decided, b.call.why];
  if (b.story) return [b.story.title, b.story.text, ...(b.story.criteria || [])];
  return [];
}
