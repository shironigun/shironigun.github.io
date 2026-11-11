import { useEffect, useState } from 'react';
import { Link, useDocumentTitle } from '../lib/router';
import PageHeader from '../components/PageHeader';
import { DocButton } from '../components/DocumentViewer';
import Testimonials from '../components/Testimonials';
import { BadgeIcon, BookIcon, CheckIcon, ChevronIcon, DownloadIcon, LinkedInIcon, MailIcon, SubjectIcon } from '../components/Icons';
import { contact, highlights, person, pillars, recognition, tenure, tools } from '../content/site';
import { certifications, education, experience, product, skills } from '../content/profile';
import { chapters, journey, nodeTypes } from '../content/journey';
import { achievements } from '../content/achievements';
import { formatHours } from '../lib/workHours';
import pageStyles from './Pages.module.css';
import styles from './About.module.css';

// About is a profile record, like a contact record in a product tool: a sticky panel with the key
// fields on the left, and tabs on the right for the overview and activity, experience, roles and
// skills, and recognition. The open tab is kept in the address (#experience and so on).

// ─── Dates ───────────────────────────────────────────────────────────
const now = new Date();
const NOW = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
const ym = (s) => s.split('-').map(Number);
// Months from a to b, counting both ends. Work still going on counts up to, not including, this
// month, so a duration never runs ahead of the tenure.
const monthsBetween = (a, b) => {
  const [y1, m1] = ym(a);
  const [y2, m2] = ym(b || NOW);
  const n = (y2 - y1) * 12 + (m2 - m1);
  return b ? n + 1 : Math.max(1, n);
};
function duration(n) {
  const y = Math.floor(n / 12);
  const m = n % 12;
  return [y && `${y} ${y === 1 ? 'yr' : 'yrs'}`, m && `${m} ${m === 1 ? 'mo' : 'mos'}`].filter(Boolean).join(' ');
}
const nextMonth = (s) => { const [y, m] = ym(s); return m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, '0')}`; };

// ─── Career bar ──────────────────────────────────────────────────────
const FIRST = experience[experience.length - 1].start;
const span = (a, b) => { const [y1, m1] = ym(a); const [y2, m2] = ym(b); return (y2 - y1) * 12 + (m2 - m1) + 1; };
const TOTAL = span(FIRST, NOW);
const pos = (start, end) => ({ left: `${((span(FIRST, start) - 1) / TOTAL) * 100}%`, width: `${(span(start, end) / TOTAL) * 100}%` });
const chapterSpans = chapters.map((c, i) => ({
  ...c,
  start: i === 0 ? FIRST : nextMonth(chapters[i - 1].until),
  end: c.until === '9999' ? NOW : c.until,
  track: ['design', 'quality', 'product'][i],
}));

function CareerBar() {
  return (
    <figure className={styles.career}>
      <div className={styles.careerTrack}>
        {experience.map((e) => (
          <span key={e.role} className={styles.careerSeg} data-track={e.track} style={pos(e.start, e.end || NOW)} title={`${e.role}, ${e.period}`} />
        ))}
      </div>
      <ol className={styles.careerChapters}>
        {chapterSpans.map((c) => (
          <li key={c.role} data-track={c.track} style={pos(c.start, c.end)}><strong>{c.role}</strong><span>{c.years}</span></li>
        ))}
      </ol>
      <figcaption className="visually-hidden">{chapterSpans.map((c) => `${c.role}, ${c.years}`).join('; ')}.</figcaption>
    </figure>
  );
}

// ─── Activity: the journey's highlights, newest first ────────────────
const activity = journey.filter((m) => m.highlight).sort((a, b) => b.date.localeCompare(a.date));

function Activity() {
  const [all, setAll] = useState(false);
  const shown = all ? activity : activity.slice(0, 7);
  return (
    <>
      <ol className={styles.feed}>
        {shown.map((m) => {
          const type = nodeTypes[m.type];
          return (
            <li key={m.date + m.title} data-type={m.type}>
              <span className={styles.feedIcon} aria-hidden="true"><SubjectIcon name={type.icon} width="15" height="15" /></span>
              <div className={styles.feedBody}>
                <p className={styles.feedMeta}><span>{type.label}</span><span>{m.when}</span></p>
                <p className={styles.feedTitle}>
                  {m.type === 'promotion' && m.from ? <>Promoted from {m.from} to <strong>{m.title}</strong></> : <strong>{m.title}</strong>}
                </p>
                {m.detail && <p className={styles.feedDetail}>{m.detail}</p>}
                {m.to && <Link to={m.to} className={`link-quiet ${styles.feedLink}`}>Read the case study</Link>}
              </div>
            </li>
          );
        })}
      </ol>
      <div className={styles.feedFoot}>
        {activity.length > 7 && (
          <button type="button" className={styles.more} aria-expanded={all} onClick={() => setAll((v) => !v)}>
            {all ? 'Show less' : `Show all ${activity.length} highlights`}
            <ChevronIcon width="14" height="14" style={{ transform: `rotate(${all ? -90 : 90}deg)` }} />
          </button>
        )}
        <Link to="/journey" className="link-quiet">The full journey, every milestone</Link>
      </div>
    </>
  );
}

// ─── Experience as related records ───────────────────────────────────
function RoleRecord({ e, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = `role-${e.start}`;
  return (
    <li className={styles.roleRec} data-track={e.track} data-open={open || undefined}>
      <button type="button" className={styles.roleRow} aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
        <span className={styles.roleMark} aria-hidden="true" />
        <span className={styles.roleMain}>
          <span className={styles.roleTitle}>
            {e.role}
            {!e.end && <span className={styles.current}>Current</span>}
            {e.promoted && <span className={styles.promoted}>Promotion</span>}
          </span>
          <span className={styles.roleOrg}>{e.org}{e.orgSub ? ` · ${e.orgSub}` : ''}</span>
        </span>
        <span className={styles.roleWhen}>
          <span>{e.period}</span>
          <span>{duration(monthsBetween(e.start, e.end))}{e.hours ? ` · ${formatHours(e.hours)} hrs` : ''}</span>
        </span>
        <ChevronIcon width="16" height="16" className={styles.roleChevron} aria-hidden="true" />
      </button>
      <div id={id} className={styles.roleDetail} hidden={!open}>
        <p className={styles.roleSummary}>{e.summary}</p>
        <ul className={styles.highlights}>
          {e.highlights.map((h) => <li key={h.label}><strong>{h.label}</strong><span>{h.text}</span></li>)}
        </ul>
      </div>
    </li>
  );
}

// Awards: the fuller line from the achievements record where there is one.
const awards = recognition.map((r) => ({ ...r, detail: achievements.find((a) => a.title === r.title)?.detail || r.detail }));

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'experience', label: 'Experience', count: experience.length },
  { id: 'roles', label: 'Roles and skills' },
  { id: 'recognition', label: 'Recognition', count: awards.length + certifications.length },
];

export default function About() {
  useDocumentTitle('About: Mahmood Ahmad');
  const [tab, setTab] = useState(() => (TABS.some((t) => `#${t.id}` === window.location.hash) ? window.location.hash.slice(1) : 'overview'));

  useEffect(() => {
    const url = `${window.location.pathname}${tab === 'overview' ? '' : `#${tab}`}`;
    window.history.replaceState(window.history.state, '', url);
  }, [tab]);

  const onTabKey = (e) => {
    const i = TABS.findIndex((t) => t.id === tab);
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const next = TABS[(i + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length];
      setTab(next.id);
      document.getElementById(`tab-${next.id}`)?.focus();
    }
  };

  return (
    <>
      <PageHeader
        art="radar"
        crumbs={[{ label: 'About' }]}
        title="About"
        lead="The record behind the work: who I am, where I’ve been, what I do and how it’s been recognised."
      />

      <section className={`section ${styles.recordSection}`} aria-labelledby="record-title">
        <div className="container">
          <h2 id="record-title" className="visually-hidden">Profile record</h2>
          <div className={styles.record}>
            {/* ─── Profile panel ─── */}
            <aside className={styles.panel} aria-label="Profile">
              <div className={styles.cover} aria-hidden="true" />
              <div className={styles.panelBody}>
                <span className={styles.avatar} aria-hidden="true">MA</span>
                <p className={styles.name}>{person.name}</p>
                <p className={styles.title}>{person.title}</p>
                {person.available && <p className={styles.status}><span aria-hidden="true" />Open to new roles</p>}

                <dl className={styles.fields}>
                  <div><dt>HR title</dt><dd>{person.officialTitle}</dd></div>
                  <div><dt>Company</dt><dd>{person.company}</dd></div>
                  <div><dt>Product</dt><dd>{person.product}</dd></div>
                  <div><dt>Division</dt><dd>200+ people</dd></div>
                  <div><dt>Joined</dt><dd>Dec 2023 <span>· {tenure} years</span></dd></div>
                  <div><dt>Education</dt><dd>{education.degree}, {education.period.slice(-4)}</dd></div>
                  <div><dt>Open to</dt><dd>Product Owner, Product Analyst and AI Product Manager roles</dd></div>
                </dl>

                <div className={styles.tags} aria-label="Disciplines">
                  {pillars.map((p) => <span key={p.name}><SubjectIcon name={p.icon} width="13" height="13" />{p.name}</span>)}
                </div>

                <div className={styles.actions}>
                  <a href={`mailto:${contact.email}`} className="btn btn-primary"><MailIcon />Email me</a>
                  <a href={contact.linkedin} target="_blank" rel="noopener" className="btn btn-secondary"><LinkedInIcon />LinkedIn</a>
                  <DocButton src={contact.resumeLight} title="Résumé" download className="btn btn-secondary"><DownloadIcon />Résumé</DocButton>
                </div>
              </div>
            </aside>

            {/* ─── Tabs ─── */}
            <div className={styles.main}>
              <div className={styles.tabs} role="tablist" aria-label="Profile sections" onKeyDown={onTabKey}>
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    id={`tab-${t.id}`}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.id}
                    aria-controls={`panel-${t.id}`}
                    tabIndex={tab === t.id ? 0 : -1}
                    className={styles.tab}
                    onClick={() => setTab(t.id)}
                  >
                    {t.label}{t.count ? <span className={styles.tabCount}>{t.count}</span> : null}
                  </button>
                ))}
              </div>

              <section id={`panel-${tab}`} key={tab} className={styles.panelContent} role="tabpanel" aria-labelledby={`tab-${tab}`}>
                {tab === 'overview' && (
                  <>
                    <div className={styles.block}>
                      <h3>Summary</h3>
                      <p className={styles.summary}>
                        I’m an AI Product Analyst. For {tenure} years I’ve built enterprise dealership SaaS at Perseus Group, part of Constellation Software:
                        customer engagement, messaging, a mobile app and AI features for automotive, agricultural and equipment dealerships, in a 200+ person division.
                        I came to product through design and quality, and I build by directing AI agents.
                      </p>
                    </div>
                    <dl className={styles.kpis}>
                      {highlights.map((h) => <div key={h.label}><dt>{h.value}</dt><dd>{h.label}</dd></div>)}
                    </dl>
                    <div className={styles.block}>
                      <h3>The product</h3>
                      <div className={styles.productBox}>
                        <p><strong>{product.name}.</strong> {product.description}</p>
                        <ul>{product.features.map((f) => <li key={f}>{f}</li>)}</ul>
                      </div>
                    </div>
                    <div className={styles.block}>
                      <h3>Activity</h3>
                      <Activity />
                    </div>
                  </>
                )}

                {tab === 'experience' && (
                  <>
                    <div className={styles.block}>
                      <h3>Career</h3>
                      <p className={styles.blockIntro}>Five years and three disciplines: design, then quality, then product and AI.</p>
                      <CareerBar />
                    </div>
                    <div className={styles.block}>
                      <h3>Roles</h3>
                      <ol className={styles.roleList}>
                        {experience.map((e, i) => <RoleRecord key={e.role} e={e} defaultOpen={i === 0} />)}
                      </ol>
                    </div>
                  </>
                )}

                {tab === 'roles' && (
                  <>
                    <div className={styles.block}>
                      <h3>One title, six roles</h3>
                      <p className={styles.blockIntro}>My HR title is {person.officialTitle}. This is the work it covers, in four areas.</p>
                      <ul className={styles.pillars}>
                        {pillars.map((p) => (
                          <li key={p.name}>
                            <span className={styles.pillarIcon} aria-hidden="true"><SubjectIcon name={p.icon} width="18" height="18" /></span>
                            <div className={styles.pillarBody}>
                              <p className={styles.pillarHead}><strong>{p.name}</strong>{p.roles.map((r) => <span key={r}>{r}</span>)}</p>
                              <p>{p.body}</p>
                              <p className={styles.proof}><CheckIcon width="13" height="13" aria-hidden="true" />{p.proof}</p>
                              <Link to={p.link.to} className="link-quiet">{p.link.text}</Link>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.skillCols}>
                      {[['Skills', skills], ['Tools', tools]].map(([title, list]) => (
                        <div key={title} className={styles.block}>
                          <h3>{title}</h3>
                          {list.map((g) => (
                            <div key={g.group} className={styles.chipGroup}>
                              <h4>{g.group}</h4>
                              <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {tab === 'recognition' && (
                  <>
                    <div className={styles.block}>
                      <h3>Awards</h3>
                      <ul className={styles.awards}>
                        {awards.map((r) => (
                          <li key={r.title}>
                            <span className={styles.awardIcon} aria-hidden="true"><SubjectIcon name={r.icon} width="18" height="18" /></span>
                            <span><strong>{r.title}</strong>{r.detail && <span>{r.detail}</span>}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.block}>
                      <h3>Certifications <span className={styles.blockCount}>{certifications.length}</span></h3>
                      <ul className={styles.certs}>
                        {certifications.map((c) => (
                          <li key={c.title}>
                            <DocButton src={c.file} title={c.title} className={styles.cert}>
                              <span className={styles.certIcon} aria-hidden="true"><BadgeIcon width="16" height="16" /></span>
                              <span className={styles.certText}><strong>{c.title}</strong><span>{c.issuer}, {c.year}</span></span>
                              <span className={styles.certView}>View</span>
                            </DocButton>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.block}>
                      <h3>Education</h3>
                      <p className={styles.edu}><BookIcon width="16" height="16" aria-hidden="true" /><span><strong>{education.degree}</strong><span>{education.school}, {education.period}</span></span></p>
                    </div>
                  </>
                )}
              </section>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="section" aria-labelledby="testimonials-title">
        <div className="container">
          <h2 id="testimonials-title" className={`${pageStyles.subhead} ${pageStyles.centerSubhead}`}>What colleagues say</h2>
          <Testimonials />
        </div>
      </section>
    </>
  );
}
