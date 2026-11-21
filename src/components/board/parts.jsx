import { PenIcon, PlugIcon, ShieldIcon, SparkIcon, TrendIcon } from '../Icons';
import { pictureFor } from '../../pages/OgPictures';
import { FIRST, qIndex } from './model';
import styles from './parts.module.css';

// Small pieces shared by the kanban board, the roadmap and the project popup.

const ICONS = { Product: TrendIcon, Design: PenIcon, AI: SparkIcon, Quality: ShieldIcon, 'Personal builds': PlugIcon };

export function DisciplineIcon({ tag, ...rest }) {
  const Icon = ICONS[tag] || TrendIcon;
  return <Icon width="14" height="14" {...rest} />;
}

export function Avatar({ size = 'sm' }) {
  return <span className={`${styles.avatar} ${styles[size]}`} aria-hidden="true">MA</span>;
}

// One segment per quarter of the years the work spans; the quarters it ran are filled.
export function QuarterStrip({ p, variant = 'card' }) {
  const first = (p.start - FIRST) * 4;
  const count = (p.end - p.start + 1) * 4;
  const from = qIndex(p.from);
  const to = qIndex(p.to);
  return (
    <span className={`${styles.strip} ${styles[variant]}`} style={{ '--n': count }} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const idx = first + i;
        return (
          <span
            key={idx}
            className={styles.seg}
            data-on={idx >= from && idx <= to ? '' : undefined}
            data-year-start={i > 0 && i % 4 === 0 ? '' : undefined}
          />
        );
      })}
    </span>
  );
}

// The quarter strip with year labels under it, for the popup.
export function QuarterTimeline({ p }) {
  const years = Array.from({ length: p.end - p.start + 1 }, (_, i) => p.start + i);
  return (
    <span className={styles.timeline}>
      <QuarterStrip p={p} variant="large" />
      <span className={styles.timelineYears} style={{ '--n': years.length }}>
        {years.map((y) => <span key={y}>{y}</span>)}
      </span>
    </span>
  );
}

// The project's own picture and colour, from the same set as its preview card: a cover band on a
// board card, a small icon on a roadmap bar. Drawn, not the preview image, so it stays sharp at any
// size and follows the theme.
export const coverVars = (slug) => {
  const pic = pictureFor(slug);
  return { '--accent': pic.accent, '--wash': pic.wash, '--tint': pic.tint };
};

export function ProjectIcon({ slug, size = 'sm' }) {
  return (
    <span className={`${styles.icon} ${styles[`icon-${size}`]}`} style={coverVars(slug)} aria-hidden="true">
      {pictureFor(slug, size === 'lg' ? 40 : 25).svg}
    </span>
  );
}

export function Cover({ slug }) {
  return (
    <span className={styles.cover} style={coverVars(slug)} aria-hidden="true">
      <span className={styles.coverRing} />
      <span className={`${styles.coverDot} ${styles.cd1}`} />
      <span className={`${styles.coverDot} ${styles.cd2}`} />
      <ProjectIcon slug={slug} size="lg" />
    </span>
  );
}
