import { useState } from 'react';
import { Link, useDocumentTitle } from '../lib/router';
import PageHeader from '../components/PageHeader';
import OperatingModel from '../components/OperatingModel';
import { AgentPipeline, DesignReview } from '../components/visuals/Explainers';
import { CheckIcon } from '../components/Icons';
import { aiPractice, designReview, personas, principles, requirementExample, requirementRules, skillsWritten } from '../content/method';
import { articles } from '../content/writing';
import styles from './HowIWork.module.css';

const SECTIONS = [
  ['model', 'Operating model'],
  ['requirements', 'Requirements'],
  ['design-review', 'Design review'],
  ['ai', 'AI agents'],
  ['principles', 'Principles'],
  ['perspectives', 'Perspectives'],
];

// One story and the edge-case check behind it. Pointing at a check highlights the criterion
// that answers it; the mapping is also written out, so nothing depends on hovering.
function RequirementMap() {
  const [focus, setFocus] = useState(null);
  const { title, persona, story, criteria, checks } = requirementExample;
  return (
    <div className={styles.reqGrid}>
      <article className={styles.storyCard} aria-label="Example user story">
        <p className={styles.storyMeta}>
          <span className={styles.persona}>{persona}</span>
          <span className={styles.ready}>Definition of ready met</span>
        </p>
        <h3 className={styles.storyTitle}>{title}</h3>
        <p className={styles.storyText}>{story}</p>
        <ol className={styles.criteria}>
          {criteria.map((c) => (
            <li
              key={c.id}
              data-lit={focus === c.id || undefined}
              onMouseEnter={() => setFocus(c.id)}
              onMouseLeave={() => setFocus(null)}
            >
              <span className={styles.acId}>{c.id}</span>
              <span>{c.text}</span>
            </li>
          ))}
        </ol>
        <ul className={styles.rules} aria-label="How acceptance criteria are written">
          {requirementRules.map((r) => <li key={r}><CheckIcon width="14" height="14" />{r}</li>)}
        </ul>
      </article>

      <div className={styles.checkPanel}>
        <h3 className={styles.panelTitle}>The 11-point edge-case check</h3>
        <p className={styles.panelLead}>Run on every story before it is final. Each answer becomes a criterion or a recorded decision.</p>
        <ol className={styles.checks}>
          {checks.map((c) => (
            <li
              key={c.q}
              tabIndex={0}
              data-lit={(c.ac && focus === c.ac) || undefined}
              onMouseEnter={() => c.ac && setFocus(c.ac)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => c.ac && setFocus(c.ac)}
              onBlur={() => setFocus(null)}
            >
              <span className={styles.q}>{c.q}</span>
              <span className={c.ac ? styles.covered : styles.noted}>{c.ac ? `Covered by ${c.ac}` : c.note}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function HowIWork() {
  useDocumentTitle('How I work: Mahmood Ahmad');
  return (
    <>
      <PageHeader
        art="pipeline"
        crumbs={[{ label: 'How I work' }]}
        title="How I work"
        lead="The operating model behind every project on this site: six stages from problem to release, the artifact each stage produces, the gate it has to pass, and how AI agents fit in."
      >
        <nav className={styles.jump} aria-label="On this page">
          {SECTIONS.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
      </PageHeader>

      <section id="model" className="section" aria-labelledby="model-title">
        <div className="container">
          <div className="section-head">
            <h2 id="model-title">The operating model</h2>
            <p>Select a stage to see what I do, the artifact it produces and the gate the work must pass before it moves on.</p>
          </div>
          <OperatingModel />
        </div>
      </section>

      <section id="requirements" className="section" aria-labelledby="req-title">
        <div className="container">
          <div className="section-head">
            <h2 id="req-title">Requirements in practice</h2>
            <p>Most defects start as an unclear sentence. This illustrative story shows how the edge-case check turns into acceptance criteria. Point at a check to see the criterion that answers it.</p>
          </div>
          <RequirementMap />
          <div className={styles.personas}>
            <span>Stories are written for named personas:</span>
            <ul>{personas.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section id="design-review" className="section" aria-labelledby="design-title">
        <div className="container">
          <div className="section-head">
            <h2 id="design-title">Design review before development</h2>
            <p>Every screen is reviewed against the component library and the business rules. Anything marked Fix goes back to design, where it is cheapest to change.</p>
          </div>
          <div className={styles.designGrid}>
            <DesignReview />
            <div className={styles.reviewList}>
              <h3 className={styles.panelTitle}>The six checks</h3>
              <ol>
                {designReview.map((d) => <li key={d}>{d}</li>)}
              </ol>
              <Link to="/case-studies/design-phase" className="link-quiet">Design phase case study</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="ai" className="section" aria-labelledby="ai-title">
        <div className="container">
          <div className="section-head">
            <h2 id="ai-title">Building with AI agents</h2>
            <p>Implementation is delivered by directing AI agents rather than hand-written code. The decisions, the specifications and the accountability stay with me.</p>
          </div>
          <AgentPipeline />
          <div className={styles.aiGrid}>
            <div>
              <h3 className={styles.panelTitle}>Ground rules</h3>
              <ol className={styles.rulesList}>
                {aiPractice.map((a) => (
                  <li key={a.title}><strong>{a.title}</strong><span>{a.body}</span></li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className={styles.panelTitle}>Skills and AI behaviour I have written</h3>
              <ul className={styles.skills}>
                {skillsWritten.map((s) => (
                  <li key={s.title}><strong>{s.title}</strong><span>{s.body}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="principles" className="section" aria-labelledby="principles-title">
        <div className="container">
          <div className="section-head">
            <h2 id="principles-title">Principles, with evidence</h2>
            <p>Each principle is backed by a result documented in a case study.</p>
          </div>
          <ul className={styles.principles}>
            {principles.map((p) => (
              <li key={p.title}>
                <p className={styles.pValue}>{p.value}</p>
                <h3>{p.title}</h3>
                <p className={styles.pLabel}>{p.label}</p>
                <Link to={p.to} className="link-quiet">See the evidence</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="perspectives" className="section" aria-labelledby="perspectives-title">
        <div className="container">
          <div className="section-head">
            <h2 id="perspectives-title">Perspectives</h2>
            <p>Longer pieces on quality, requirements and product thinking.</p>
          </div>
          <ul className={styles.articles}>
            {articles.map((a) => (
              <li key={a.slug}>
                <Link to={`/writing/${a.slug}`} className={styles.article}>
                  <span className={styles.articleMeta}>{a.date}, {a.readTime}</span>
                  <span className={styles.articleTitle}>{a.title}</span>
                  <span className={styles.articleExcerpt}>{a.excerpt}</span>
                  <span className={styles.articleCta}>Read the article</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
