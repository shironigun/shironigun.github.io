import { useState } from 'react';
import { CheckIcon } from './Icons';
import styles from './PromisePanel.module.css';

// A recreation of Promise Tracker with fictional data. Every control works locally:
// the AI suggests, the manager decides, and nothing "sends" until the manager clicks.

const ITEMS = [
  {
    id: 'appraisal',
    customer: 'Jordan K.',
    owed: 'Confirm the trade-in appraisal time',
    urgency: 'Critical',
    reasons: ['Asked twice', 'Waiting 2 days', 'Test drive on Saturday'],
    message: { from: 'Customer', when: '2 days ago', text: 'Any update on the appraisal time? Second time asking.' },
    draft: 'Hi Jordan, sorry for the wait. I’m confirming your appraisal slot with the team now and will text you the time by 3pm today.',
    rep: 'Alex',
  },
  {
    id: 'manual',
    customer: 'Maya R.',
    owed: 'Send the owner’s manual',
    urgency: 'High',
    reasons: ['Promised by rep', 'Waiting 3 days'],
    message: { from: 'Alex, sales rep', when: '3 days ago', text: 'I’ll email the owner’s manual over tonight.' },
    draft: 'Hi Maya, apologies, the owner’s manual I promised hasn’t reached you yet. I’m sending it within the hour.',
    rep: 'Alex',
  },
  {
    id: 'financing',
    customer: 'Sam T.',
    owed: 'Share the financing options',
    urgency: 'Medium',
    reasons: ['Asked once', 'Waiting 1 day'],
    message: { from: 'Customer', when: 'Yesterday', text: 'Could you send me the financing options you mentioned?' },
    draft: 'Hi Sam, thanks for asking. I’ll send the financing options we discussed by the end of the day tomorrow.',
    rep: 'Priya',
  },
];

const ACTIONS = [
  { id: 'reply', label: 'Send reply', done: () => 'Reply sent by you' },
  { id: 'task', label: 'Create task', done: (item) => `Task created for ${item.rep}` },
  { id: 'remind', label: 'Remind rep', done: (item) => `Reminder sent to ${item.rep}` },
  { id: 'dismiss', label: 'Dismiss', done: () => 'Dismissed' },
];

const URGENCY_CLASS = { Critical: styles.critical, High: styles.high, Medium: styles.medium };

export default function PromisePanel({ size = 'hero' }) {
  const [selectedId, setSelectedId] = useState(ITEMS[0].id);
  const [handled, setHandled] = useState({});

  const selected = ITEMS.find((i) => i.id === selectedId);
  const openCount = ITEMS.filter((i) => !handled[i.id]).length;
  const outcome = handled[selected.id];

  const act = (action) => setHandled((h) => ({ ...h, [selected.id]: action.done(selected) }));
  const undo = () => setHandled((h) => {
    const next = { ...h };
    delete next[selected.id];
    return next;
  });

  return (
    <section className={`${styles.panel} ${size === 'full' ? styles.full : ''}`} aria-label="Promise Tracker recreation">
      <header className={styles.top}>
        <p className={styles.title}>We owe</p>
        <span className={styles.count}>{openCount} open</span>
      </header>

      <div className={styles.body}>
        <ul className={styles.list}>
          {ITEMS.map((item, index) => (
            <li key={item.id} style={{ '--i': index }}>
              <button
                type="button"
                className={`${styles.row} ${item.id === selectedId ? styles.selected : ''}`}
                aria-pressed={item.id === selectedId}
                onClick={() => setSelectedId(item.id)}
              >
                <span className={`${styles.urgency} ${URGENCY_CLASS[item.urgency]}`}>{item.urgency}</span>
                <span className={styles.rowText}>
                  <span className={`${styles.owed} ${handled[item.id] ? styles.struck : ''}`}>{item.owed}</span>
                  <span className={styles.customer}>{handled[item.id] ? handled[item.id] : item.customer}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.detail}>
          <div className={styles.why}>
            <span className={styles.detailLabel}>Why it’s {selected.urgency.toLowerCase()}</span>
            <ul className={styles.reasons}>
              {selected.reasons.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>

          <figure className={styles.message}>
            <figcaption className={styles.detailLabel}>{selected.message.from}, {selected.message.when}</figcaption>
            <blockquote>{selected.message.text}</blockquote>
          </figure>

          <div className={styles.draft}>
            <span className={styles.detailLabel}>Suggested reply</span>
            <p>{selected.draft}</p>
          </div>

          <div className={styles.actions} aria-live="polite">
            {outcome ? (
              <div className={styles.done}>
                <CheckIcon width="18" height="18" />
                <span>{outcome}</span>
                <button type="button" className={styles.undo} onClick={undo}>Undo</button>
              </div>
            ) : (
              ACTIONS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className={a.id === 'reply' ? styles.primaryAction : styles.action}
                  onClick={() => act(a)}
                >
                  {a.label}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      <footer className={styles.note}>Recreation with fictional data. The AI suggests; nothing is sent until a manager clicks.</footer>
    </section>
  );
}
