import { useState } from 'react';
import { Link, useDocumentTitle } from '../lib/router';
import { hero, highlights, pillars, recognition } from '../content/site';
import { featuredProjects } from '../content/projects';
import { achievements, domainLeadership, events, recentEvents } from '../content/achievements';
import { stages } from '../content/method';
import { ProjectGrid } from '../components/ProjectCard';
import CareerTimeline from '../components/CareerTimeline';
import WorkCarousel from '../components/WorkCarousel';
import { workSlides } from '../content/workSlides';
import Testimonials from '../components/Testimonials';
import CountUp from '../components/CountUp';
import { ChevronIcon, SubjectIcon } from '../components/Icons';
import { findItem, laneVar } from '../components/board/model';
import { DisciplineIcon } from '../components/board/parts';
import ProjectDialog from '../components/board/ProjectDialog';
import styles from './Home.module.css';

const eventCount = events.reduce((n, g) => n + g.items.length, 0);

// The latest events as four tickets, one per project, each with the project it belongs to (found
// from its case-study link). When two events share a project, such as the hackathon he organised
// and the talk that opened it, the first leads the ticket and the other is listed on it. An event
// without a project stays a plain ticket.
const projectOf = (e) => (e.to?.startsWith('/case-studies/') ? findItem(e.to.slice('/case-studies/'.length)) : null);
const homeEvents = [];
for (const e of recentEvents) {
  if (homeEvents.length === 4) break;
  const project = projectOf(e);
  const ticket = project && homeEvents.find((t) => t.project?.slug === project.slug);
  if (ticket) ticket.also.push(e);
  else homeEvents.push({ ...e, project, also: [] });
}
// The popup's previous and next step through these projects, in card order, each once.
const eventProjects = [...new Set(homeEvents.map((e) => e.project?.slug).filter(Boolean))];

const featuredAchievements = [
  'Quality framework adopted by 3 teams',
  domainLeadership,
  'Introduced the design phase',
  'Shipped a release solo',
  'Covered a 3-month BA vacancy',
  'Organised the AI Foundations hackathon',
].map((title) => achievements.find((a) => a.title === title)).filter(Boolean);

const latestTalk = recentEvents.find((e) => e.label === 'Talk');

// "Aug 2026" reads as a large month over the year; "2026" shows the year alone.
const splitWhen = (when) => {
  const [first, ...rest] = when.split(' ');
  return [first, rest.join(' ')];
};

export default function Home() {
  useDocumentTitle('Mahmood Ahmad: AI Product Analyst');
  // The selected-work list and the carousel share one slide; pointing at the list holds the rotation.
  const [slide, setSlide] = useState(0);
  const [holdTour, setHoldTour] = useState(false);
  // The project open in the popup, by slug.
  const [openProject, setOpenProject] = useState(null);
  const projectIndex = eventProjects.indexOf(openProject);
  const stepProject = (d) => setOpenProject(eventProjects[(projectIndex + d + eventProjects.length) % eventProjects.length]);

  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title" data-reveal="off">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <h1 id="hero-title" className={styles.heroTitle}>{hero.headline}</h1>
            <p className={styles.heroSupport}>{hero.support}</p>
            <div className={styles.heroActions}>
              <Link to="/case-studies" className="btn btn-primary">View case studies</Link>
              <Link to="/journey" className="btn btn-secondary">Career journey</Link>
            </div>
            <div className={styles.status}>
              <p className={styles.now}><span className={styles.nowLabel}>Now</span>{hero.now}</p>
              {latestTalk && (
                <p className={styles.latest}>
                  <span className={styles.latestLabel}>Latest talk</span>
                  <Link to="/#events">{latestTalk.title}</Link>
                  <span className={styles.latestWhen}>{latestTalk.when}</span>
                </p>
              )}
            </div>
          </div>

          {/* His cut-out fills the right of the hero and runs down behind the Recognition panel,
              which hides the cut at his waist. His thumb points across at the text, as on his
              LinkedIn banner. */}
          <div className={styles.portrait}>
            <img
              src="/images/portrait/mahmood-presenting.webp"
              alt="Mahmood Ahmad on stage with a microphone, pointing towards the text."
              width="820"
              height="954"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>

        <div className="container">
          <div className={styles.glance}>
            <div className={styles.glanceHead}>
              <h2 className={styles.glanceTitle}>Recognition</h2>
              <Link to="/journey#recognition" className="link-quiet">All recognition</Link>
            </div>
            <ul className={styles.glanceList}>
              {recognition.map((r, i) => (
                <li key={r.title} style={{ '--i': i }}>
                  <span className={styles.glanceIcon} aria-hidden="true"><SubjectIcon name={r.icon} width="18" height="18" /></span>
                  <span className={styles.glanceText}>
                    <strong>{r.title}</strong>
                    {r.detail && <span>{r.detail}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.highlights} aria-labelledby="highlights-title">
        <div className="container">
          <h2 id="highlights-title" className="visually-hidden">Highlights</h2>
          <ul className={styles.highlightList}>
            {highlights.map((h) => (
              <li key={h.label}>
                <CountUp value={h.value} className={styles.highlightValue} />
                <span className={styles.highlightLabel}>{h.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="tour-title">
        <div className={`container ${styles.tourGrid}`}>
          <div className={styles.tourIntro}>
            <div className="section-head">
              <h2 id="tour-title">Selected work</h2>
              <p>Six projects, each drawn as the flow it runs on. Choose one, or let them play through.</p>
            </div>
            <ul
              className={styles.tourList}
              onMouseEnter={() => setHoldTour(true)}
              onMouseLeave={() => setHoldTour(false)}
              onFocus={() => setHoldTour(true)}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHoldTour(false); }}
            >
              {workSlides.map((s, i) => (
                <li key={s.id}>
                  <button type="button" aria-current={i === slide ? 'true' : undefined} onClick={() => setSlide(i)}>
                    <span className={styles.tourLabel}>{s.label}</span>
                    <span className={styles.tourTitle}>{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
            <Link to="/case-studies" className="link-quiet">All case studies</Link>
          </div>
          <WorkCarousel index={slide} onIndexChange={setSlide} hold={holdTour} />
        </div>
      </section>

      <section id="events" className={`section ${styles.eventsBand}`} aria-labelledby="events-band-title">
        <div className="container">
          <div className={styles.rowHead}>
            <div className="section-head">
              <h2 id="events-band-title">Talks, workshops and events</h2>
              <p>Sessions I have delivered, events I have organised and the hackathon my team won. Open an event to see the project behind it.</p>
            </div>
            <Link to="/journey" className="link-quiet">All talks, events and courses</Link>
          </div>
          <div className={styles.eventsLayout}>
            <figure className={styles.eventPhoto}>
              <img src="/images/events/hackathon-presenting.jpg" alt="Mahmood presenting with a microphone at the AI hackathon, with a group photo of the participants and the audience in the session room." width="800" height="800" loading="lazy" />
              <figcaption><strong>On stage</strong><span>Presenting at the division-wide AI hackathon, 2025</span></figcaption>
            </figure>
            {/* Each event is a ticket: the date on a stub, the event below, and the project it
                belongs to at the foot. The whole ticket opens that project in the popup. */}
            <ol className={styles.eventCards} data-stagger>
            {homeEvents.map((e, i) => {
              const [big, small] = splitWhen(e.when);
              const p = e.project;
              return (
                <li
                  key={e.title}
                  className={`${styles.eventCard} ${p ? styles.eventLinked : ''}`}
                  style={{ '--lane': p ? laneVar(p.lane) : 'var(--cobalt)' }}
                >
                  <div className={styles.ticket}>
                    <p className={styles.eventDate}>
                      <span className={styles.eventBig}>{big}</span>
                      {small && <span className={styles.eventSmall}>{small}</span>}
                      <span className={styles.eventType}><SubjectIcon name={e.icon} width="14" height="14" />{e.label}</span>
                    </p>
                    <div className={styles.eventBody}>
                      <h3>
                        {p ? (
                          <button
                            type="button"
                            className={styles.eventOpen}
                            aria-haspopup="dialog"
                            aria-describedby={`event-project-${i}`}
                            onClick={() => setOpenProject(p.slug)}
                          >
                            {e.title}
                          </button>
                        ) : e.title}
                      </h3>
                      <p className={styles.eventDetail}>{e.detail}</p>
                      {e.also.map((a) => (
                        <p key={a.title} className={styles.eventAlso}>
                          <SubjectIcon name={a.icon} width="14" height="14" />
                          <span><strong>{a.label}</strong> {a.title}</span>
                        </p>
                      ))}
                    </div>
                    {p && (
                      <p id={`event-project-${i}`} className={styles.eventProject}>
                        <span className={styles.eventProjectIcon} aria-hidden="true"><DisciplineIcon tag={p.lane} /></span>
                        <span className={styles.eventProjectName}>
                          <span className="visually-hidden">Opens the project: </span>{p.name}
                        </span>
                        <span className={styles.eventProjectKey} aria-hidden="true">{p.id}</span>
                        <ChevronIcon className={styles.eventProjectGo} width="16" height="16" aria-hidden="true" />
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
            </ol>
          </div>
        </div>
      </section>

      {/* The same popup as the Projects page; its "Read the case study" goes on to the article. */}
      {openProject && (
        <ProjectDialog
          item={findItem(openProject)}
          position={projectIndex + 1}
          total={eventProjects.length}
          onClose={() => setOpenProject(null)}
          onPrev={() => stepProject(-1)}
          onNext={() => stepProject(1)}
        />
      )}

      <section className="section" aria-labelledby="roles-title">
        <div className="container">
          <div className={styles.rowHead}>
            <div className="section-head">
              <h2 id="roles-title">One title, six roles</h2>
              <p>Officially a Product Quality Analyst; in practice, accountable across product, design, AI and quality.</p>
            </div>
            <Link to="/about" className="link-quiet">More about me</Link>
          </div>
          <ul className={styles.pillars}>
            {pillars.map((p) => (
              <li key={p.name} className={styles.pillar}>
                <span className={styles.pillarIcon} aria-hidden="true"><SubjectIcon name={p.icon} width="22" height="22" /></span>
                <h3>{p.name}</h3>
                <p className={styles.roles}>{p.roles.join(', ')}</p>
                <p>{p.body}</p>
                <p className={styles.proof}>{p.proof}</p>
                <Link to={p.link.to} className="link-quiet">{p.link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.night}`} aria-labelledby="path-title">
        <div className="container">
          <div className={styles.rowHead}>
            <div className="section-head">
              <h2 id="path-title">From design intern to AI product analyst</h2>
              <p>Five years and three disciplines: design, then quality, then AI product work, each one building on the last.</p>
            </div>
            <Link to="/journey" className={`link-quiet ${styles.nightLink}`}>Explore the full journey</Link>
          </div>
          <CareerTimeline />
        </div>
      </section>

      <section className={`section ${styles.white}`} aria-labelledby="work-title">
        <div className="container">
          <div className={styles.rowHead}>
            <div className="section-head">
              <h2 id="work-title">Case studies</h2>
              <p>Six selected engagements spanning design, quality, product knowledge, AI prototyping, public tooling and innovation.</p>
            </div>
            <Link to="/case-studies" className="link-quiet">All case studies</Link>
          </div>
          <ProjectGrid projects={featuredProjects} />
        </div>
      </section>

      <section className="section" aria-labelledby="achievements-title">
        <div className="container">
          <div className={styles.rowHead}>
            <div className="section-head">
              <h2 id="achievements-title">Achievements</h2>
              <p>Measurable results, and the hackathons, talks and workshops I have won, organised or delivered.</p>
            </div>
            <Link to="/journey" className="link-quiet">The full career journey</Link>
          </div>

          <dl className={styles.achStats} data-stagger>
            <div><dt>Recognitions</dt><dd><CountUp value={String(recognition.length)} /></dd></div>
            <div><dt>Achievements</dt><dd><CountUp value={String(achievements.length)} /></dd></div>
            <div><dt>Hackathons, talks, workshops and courses</dt><dd><CountUp value={String(eventCount)} /></dd></div>
            <div><dt>Live training sessions delivered</dt><dd><CountUp value="120+" /></dd></div>
          </dl>

          <ul className={styles.achCards}>
            {featuredAchievements.map((a) => (
              <li key={a.title} className={styles.achCard}>
                <span className={styles.achIcon} aria-hidden="true"><SubjectIcon name={a.icon} width="20" height="20" /></span>
                <div>
                  <h3>{a.to ? <Link to={a.to}>{a.title}</Link> : a.title}</h3>
                  <p>{a.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.white}`} aria-labelledby="method-title">
        <div className="container">
          <div className={styles.rowHead}>
            <div className="section-head">
              <h2 id="method-title">How I work</h2>
              <p>Product thinking and quality discipline come first. Implementation is delivered by directing AI agents, with full accountability for what ships.</p>
            </div>
            <Link to="/how-i-work" className="link-quiet">My methods in full</Link>
          </div>
          <ol className={styles.stages}>
            {stages.map((s) => (
              <li key={s.name}>
                <h3>{s.name}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="quotes-title">
        <div className="container">
          <div className={`section-head ${styles.centerHead}`}>
            <h2 id="quotes-title">What colleagues say</h2>
            <p>Recommendations from my manager and the developers I work with, quoted in full from LinkedIn.</p>
          </div>
          <Testimonials />
        </div>
      </section>
    </>
  );
}
