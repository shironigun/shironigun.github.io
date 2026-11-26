import { useState } from 'react';
import { Link, useDocumentTitle } from '../lib/router';
import { hero, highlights, person, recognition, roleMap } from '../content/site';
import { featuredProjects } from '../content/projects';
import { achievements, domainLeadership, recentEvents } from '../content/achievements';
import { operatingModel } from '../content/method';

// How I work, one short line per stage.
const stepLines = { Discover: 'Frame the right problem', Define: 'Testable requirements', Design: 'Reviewed before the build', Prototype: 'Try it before building it', Deliver: 'Predictable sprints', Release: 'Ship what was agreed' };
const processSteps = operatingModel.map((s) => ({ name: s.name, line: stepLines[s.name] || s.summary }));
import { ProjectGrid } from '../components/ProjectCard';
import CareerTimeline from '../components/CareerTimeline';
import Testimonials from '../components/Testimonials';
import { findItem } from '../components/board/model';
import { BadgeWall, EventRecap, KpiPanel, Milestones, ProcessBar, RoleHub } from '../components/HomeDash';
import ProjectDialog from '../components/board/ProjectDialog';
import styles from './Home.module.css';


// The latest events as six log rows, one per project, each with the project it belongs to (found
// from its case-study link). When two events share a project, such as the hackathon he organised
// and the talk that opened it, the first leads the ticket and the other is listed on it. An event
// without a project stays a plain ticket.
const projectOf = (e) => (e.to?.startsWith('/case-studies/') ? findItem(e.to.slice('/case-studies/'.length)) : null);
const homeEvents = [];
for (const e of recentEvents) {
  if (homeEvents.length === 6) break;
  const project = projectOf(e);
  const ticket = project && homeEvents.find((t) => t.project?.slug === project.slug);
  if (ticket) ticket.also.push(e);
  else homeEvents.push({ ...e, project, also: [] });
}
// The popup's previous and next step through these projects, in card order, each once.
const eventProjects = [...new Set(homeEvents.map((e) => e.project?.slug).filter(Boolean))];

// One figure per achievement for the results list; where there is no number, its icon stands in.
const figures = {
  'Quality framework adopted by 3 teams': { figure: '3', figureLabel: 'teams adopted it', date: '2025-06', when: '2025' },
  [domainLeadership]: { figure: '120+', figureLabel: 'live sessions', date: '2024-07', when: '2024 to 2025' },
  'Introduced the design phase': { figure: '7', figureLabel: 'product areas through it', date: '2024-06', when: '2024' },
  'Published a Claude Code marketplace': { figure: '38', figureLabel: 'skills in 10 plugins', date: '2026-10', when: 'Oct 2026' },
  'AI Innovator of the Month': { figureLabel: 'For the UI revamp', date: '2026-06', when: 'Jun 2026' },
  'Organised the AI Foundations hackathon': { figure: '10', figureLabel: 'working demos', date: '2026-08', when: 'Aug 2026' },
};

const featuredAchievements = [
  'Quality framework adopted by 3 teams',
  domainLeadership,
  'Introduced the design phase',
  'Published a Claude Code marketplace',
  'AI Innovator of the Month',
  'Organised the AI Foundations hackathon',
].map((title) => achievements.find((a) => a.title === title)).filter(Boolean)
  .map((a) => ({ ...a, ...(figures[a.title] || {}) }))
  .sort((a, b) => (a.date || '').localeCompare(b.date || ''));

const latestTalk = recentEvents.find((e) => e.label === 'Talk');


// "Aug 2026" reads as a large month over the year; "2026" shows the year alone.
const splitWhen = (when) => {
  const [first, ...rest] = when.split(' ');
  return [first, rest.join(' ')];
};

export default function Home() {
  useDocumentTitle('Mahmood Ahmad: AI Product Analyst');
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
            <BadgeWall items={recognition} />
          </div>
        </div>
      </section>

      <section className={styles.highlights} aria-labelledby="highlights-title">
        <div className="container">
          <h2 id="highlights-title" className="visually-hidden">Highlights</h2>
          <KpiPanel items={highlights} />
        </div>
      </section>


      <section id="events" className={`section ${styles.eventsBand}`} aria-labelledby="events-band-title">
        <div className="container">
          <div className={styles.rowHead}>
            <div className="section-head">
              <h2 id="events-band-title">Talks, workshops and events</h2>
              <p>Sessions I have delivered, events I have organised and the hackathon our team won. Open an event to see the project behind it.</p>
            </div>
            <Link to="/journey" className="link-quiet">All talks, events and courses</Link>
          </div>
          <EventRecap rows={homeEvents} onOpen={setOpenProject} />
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
              <p>Product Quality Analyst by title, accountable across product, design, AI and quality.</p>
            </div>
            <Link to="/about" className="link-quiet">More about me</Link>
          </div>
          <RoleHub title={person.officialTitle} roles={roleMap} />
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

          <Milestones rows={featuredAchievements} />
        </div>
      </section>

      <section className={`section ${styles.white}`} aria-labelledby="method-title">
        <div className="container">
          <div className={styles.rowHead}>
            <div className="section-head">
              <h2 id="method-title">How I work</h2>
              <p>Product thinking and quality discipline come first. Implementation is delivered by directing AI agents, with accountability for everything I specify and review.</p>
            </div>
            <Link to="/how-i-work" className="link-quiet">My methods in full</Link>
          </div>
          <ProcessBar steps={processSteps} />
        </div>
      </section>

      <section className="section" aria-labelledby="quotes-title">
        <div className="container">
          <div className={`section-head ${styles.centerHead}`}>
            <h2 id="quotes-title">What colleagues say</h2>
          </div>
          <Testimonials />
        </div>
      </section>
    </>
  );
}
