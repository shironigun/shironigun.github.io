import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../lib/hooks';
import styles from './HeaderArt.module.css';

// One small illustration per page, drawn from that page's subject, sitting in the empty space
// beside the heading. Decorative only: hidden from assistive technology, paused off screen,
// and still under reduced motion.

const STAR = 'M0,-10 L2.9,-4 9.5,-3.1 4.7,1.5 5.9,8.1 0,5 -5.9,8.1 -4.7,1.5 -9.5,-3.1 -2.9,-4 Z';

// Projects: a sprint board, one card on the move.
function Board() {
  const cols = [[3, 1], [2, -1], [3, -1], [2, 0]];
  return (
    <g>
      {cols.map(([n, hi], c) => {
        const x = 150 + c * 118;
        return (
          <g key={c}>
            <rect className={styles.bar} x={x} y={62} width={64} height={8} rx={4} />
            {Array.from({ length: n }, (_, i) => (
              <g key={i}>
                <rect className={i === hi ? styles.wash : styles.w} x={x} y={84 + i * 62} width={108} height={50} rx={9} />
                <rect className={styles.bar} x={x + 12} y={98 + i * 62} width={70} height={6} rx={3} />
                <rect className={styles.bar} x={x + 12} y={112 + i * 62} width={42} height={6} rx={3} />
              </g>
            ))}
          </g>
        );
      })}
      <g className={styles.travel}>
        <rect className={styles.wash} x={150} y={300} width={108} height={50} rx={9} />
        <rect className={styles.barStrong} x={162} y={314} width={70} height={6} rx={3} />
        <rect className={styles.barStrong} x={162} y={328} width={42} height={6} rx={3} />
      </g>
    </g>
  );
}

// Case studies: case files, with a magnifier reading over them.
function CaseFiles() {
  return (
    <g>
      <rect className={styles.sheet} x={286} y={74} width={210} height={270} rx={10} transform="rotate(-9 390 210)" />
      <rect className={styles.sheet} x={330} y={66} width={210} height={270} rx={10} transform="rotate(6 435 200)" />
      <rect className={styles.w} x={300} y={58} width={224} height={284} rx={10} />
      <rect className={styles.barStrong} x={324} y={86} width={120} height={10} rx={5} />
      {[150, 120, 170, 96, 160, 140, 110, 150].map((w, i) => <rect key={i} className={styles.bar} x={324} y={118 + i * 24} width={w} height={6} rx={3} />)}
      <rect className={`${styles.mark} ${styles.glow}`} x={318} y={160} width={154} height={18} rx={5} />
      <g className={styles.drift}>
        <circle className={styles.lens} cx={468} cy={236} r={40} />
        <path className={styles.handle} d="M 497 265 L 532 300" />
      </g>
    </g>
  );
}

// Journey: a winding path through milestones, with a marker travelling along it.
function Path({ motion }) {
  const d = 'M 40 372 C 90 368 122 332 150 312 S 222 262 262 252 S 342 230 372 196 S 432 150 472 132 S 542 74 586 46';
  const stops = [[40, 372, 'c'], [150, 312, 'c'], [262, 252, 'd'], [372, 196, 'c'], [472, 132, 'd'], [586, 46, 'c']];
  return (
    <g>
      <path className={`${styles.s} ${styles.d} ${styles.flow}`} d={d} />
      {stops.map(([x, y, k]) => (k === 'd'
        ? <rect key={x} className={styles.wash} x={x - 8} y={y - 8} width={16} height={16} transform={`rotate(45 ${x} ${y})`} />
        : <circle key={x} className={styles.w} cx={x} cy={y} r={8} />))}
      <path className={styles.flag} d="M 586 46 L 586 6 L 612 16 L 586 26" />
      {motion && (
        <g>
          <circle className={styles.halo} r="14" />
          <circle className={styles.a} r="6" />
          <animateMotion dur="10s" repeatCount="indefinite" path={d} />
        </g>
      )}
    </g>
  );
}

// Achievements: a medal with turning rays, and stars around it.
function Stars() {
  const stars = [[300, 84, 1], [560, 70, 0.8], [338, 268, 0.7], [586, 250, 1], [250, 170, 0.6], [520, 336, 0.8], [408, 46, 0.6]];
  return (
    <g>
      <g className={styles.spin}>
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return <path key={i} className={styles.s} d={`M ${450 + Math.cos(a) * 72} ${180 + Math.sin(a) * 72} L ${450 + Math.cos(a) * 88} ${180 + Math.sin(a) * 88}`} />;
        })}
      </g>
      <path className={styles.wash} d="M 424 222 L 404 304 L 428 290 L 440 312 L 452 232 Z" />
      <path className={styles.wash} d="M 476 222 L 496 304 L 472 290 L 460 312 L 448 232 Z" />
      <circle className={styles.wash} cx={450} cy={180} r={56} />
      <circle className={styles.s} cx={450} cy={180} r={42} />
      <path className={styles.a} d={STAR} transform="translate(450 180) scale(2.2)" />
      {stars.map(([x, y, s], i) => <path key={i} className={`${styles.starSoft} ${styles.twinkle}`} style={{ animationDelay: `${i * -0.6}s` }} d={STAR} transform={`translate(${x} ${y}) scale(${s})`} />)}
    </g>
  );
}

// About: six roles as a radar shape that breathes.
function Radar() {
  const cx = 430;
  const cy = 200;
  const R = 150;
  const pt = (k, f) => {
    const a = (-90 + k * 60) * (Math.PI / 180);
    return [cx + Math.cos(a) * R * f, cy + Math.sin(a) * R * f];
  };
  const hex = (f) => Array.from({ length: 6 }, (_, k) => pt(k, f).join(',')).join(' ');
  const values = [0.92, 0.78, 0.86, 0.62, 0.72, 0.84];
  const shape = values.map((v, k) => pt(k, v).join(',')).join(' ');
  return (
    <g>
      {[1, 0.66, 0.33].map((f) => <polygon key={f} className={styles.s} points={hex(f)} />)}
      {Array.from({ length: 6 }, (_, k) => <path key={k} className={styles.s} d={`M ${cx} ${cy} L ${pt(k, 1).join(' ')}`} />)}
      <g className={styles.breathe}>
        <polygon className={styles.area} points={shape} />
        {values.map((v, k) => <circle key={k} className={styles.a} cx={pt(k, v)[0]} cy={pt(k, v)[1]} r="5" />)}
      </g>
    </g>
  );
}

// How I work: six stages with gates, a loop back, and work flowing through.
function Pipeline({ motion }) {
  const xs = [90, 186, 282, 378, 474, 570];
  return (
    <g>
      <path className={styles.s} d="M 70 210 L 590 210" />
      <path className={`${styles.s} ${styles.d} ${styles.flow}`} d="M 474 190 C 458 116, 298 116, 282 190" />
      {xs.slice(0, -1).map((x, i) => <rect key={x} className={styles.wash} x={x + 42} y={204} width={12} height={12} transform={`rotate(45 ${x + 48} 210)`} />)}
      {xs.map((x, i) => (
        <g key={x} className={styles.stage} style={{ animationDelay: `${i * 0.5}s` }}>
          <circle className={styles.w} cx={x} cy={210} r={18} />
          <text className={styles.num} x={x} y={215} textAnchor="middle">{i + 1}</text>
        </g>
      ))}
      {motion && (
        <circle className={styles.a} r="5">
          <animateMotion dur="6s" repeatCount="indefinite" path="M 70 210 L 590 210" />
        </circle>
      )}
    </g>
  );
}

// Contact: ripples from an envelope, a paper plane on its way.
function Signal() {
  return (
    <g>
      {[0, 1.2, 2.4].map((delay) => <circle key={delay} className={`${styles.s} ${styles.ripple}`} style={{ animationDelay: `${delay}s` }} cx={470} cy={212} r={46} />)}
      <circle className={styles.wash} cx={470} cy={212} r={40} />
      <rect className={styles.w} x={446} y={196} width={48} height={34} rx={5} />
      <path className={styles.s} d="M 446 199 L 470 216 L 494 199" />
      <path className={`${styles.s} ${styles.d} ${styles.flow}`} d="M 296 126 C 360 128, 404 160, 436 190" />
      <g className={styles.bob}>
        <path className={styles.wash} d="M 250 108 L 300 124 L 250 142 L 260 124 Z" />
        <path className={styles.s} d="M 260 124 L 300 124" />
      </g>
    </g>
  );
}

// Case study, AI: a small neural network firing.
function Neural({ motion }) {
  const L = [[330, [110, 170, 230, 290]], [450, [80, 140, 200, 260, 320]], [570, [140, 200, 260]]];
  const links = [];
  for (let a = 0; a < 2; a++) L[a][1].forEach((y1) => L[a + 1][1].forEach((y2) => links.push([L[a][0], y1, L[a + 1][0], y2])));
  const routes = ['M 330 170 L 450 140 L 570 200', 'M 330 290 L 450 260 L 570 260', 'M 330 110 L 450 200 L 570 140', 'M 330 230 L 450 320 L 570 260'];
  let n = 0;
  return (
    <g>
      {links.map(([x1, y1, x2, y2]) => <path key={`${x1}${y1}${x2}${y2}`} className={styles.faint} d={`M ${x1} ${y1} L ${x2} ${y2}`} />)}
      {L.map(([x, ys]) => ys.map((y) => <circle key={`${x}${y}`} className={`${styles.w} ${styles.fire}`} style={{ animationDelay: `${(n++ % 6) * 0.45}s` }} cx={x} cy={y} r={10} />))}
      {motion && routes.map((d, i) => (
        <circle key={d} className={styles.a} r="4">
          <animateMotion dur="3.2s" begin={`${i * 0.8}s`} repeatCount="indefinite" path={d} />
        </circle>
      ))}
    </g>
  );
}

// Case study, Quality: checkpoint gates, with work pausing at each one.
function Gates({ motion }) {
  const gates = [190, 330, 470];
  return (
    <g>
      <path className={styles.s} d="M 40 260 L 590 260" />
      {gates.map((x) => (
        <g key={x}>
          <rect className={styles.wash} x={x - 26} y={176} width={9} height={84} rx={3} />
          <rect className={styles.wash} x={x + 17} y={176} width={9} height={84} rx={3} />
          <rect className={styles.barStrong} x={x - 28} y={170} width={56} height={9} rx={4} />
          <circle className={styles.ok} cx={x} cy={136} r={14} />
          <path className={styles.okPath} d={`M ${x - 6} ${136} l 4 4 l 8 -8`} />
        </g>
      ))}
      {motion && (
        <g>
          <circle className={styles.halo} r="13" />
          <circle className={styles.a} r="7" />
          <animateMotion dur="8s" repeatCount="indefinite" path="M 40 260 L 590 260" keyPoints="0;0.27;0.27;0.53;0.53;0.78;0.78;1" keyTimes="0;0.18;0.3;0.46;0.58;0.74;0.86;1" calcMode="linear" />
        </g>
      )}
    </g>
  );
}

// Case study, Design: a wireframe under review, with a cursor at work.
function Wireframe() {
  return (
    <g>
      <rect className={styles.w} x={250} y={56} width={330} height={290} rx={12} />
      <path className={styles.s} d="M 250 84 L 580 84" />
      {[268, 282, 296].map((x) => <circle key={x} className={styles.dotSoft} cx={x} cy={70} r={4} />)}
      <rect className={styles.wash} x={272} y={104} width={140} height={92} rx={8} />
      {[0, 1, 2, 3].map((i) => <rect key={i} className={styles.bar} x={428} y={110 + i * 18} width={[120, 96, 132, 70][i]} height={7} rx={3} />)}
      <rect className={styles.barStrong} x={428} y={182} width={72} height={18} rx={9} />
      {[272, 374, 476].map((x) => <rect key={x} className={styles.w} x={x} y={226} width={86} height={92} rx={8} />)}
      <rect className={`${styles.select} ${styles.ants}`} x={366} y={218} width={102} height={108} rx={10} />
      <g className={styles.cursor}>
        <path className={styles.pointer} d="M 0 0 L 0 22 L 6 16 L 11 27 L 15 25 L 10 14 L 18 14 Z" />
      </g>
    </g>
  );
}

// Case study, Product: a roadmap with a marker for now.
function Roadmap() {
  const xs = [120, 214, 308, 402, 496];
  return (
    <g>
      {xs.map((x, i) => <path key={x} className={i < 2 ? styles.wash : styles.w} d={`M ${x} 182 L ${x + 80} 182 L ${x + 96} 206 L ${x + 80} 230 L ${x} 230 L ${x + 16} 206 Z`} />)}
      {[214, 402].map((x) => <path key={x} className={styles.flag} d={`M ${x + 40} 182 L ${x + 40} 134 L ${x + 66} 144 L ${x + 40} 154`} />)}
      {xs.map((x) => <rect key={x} className={styles.bar} x={x + 24} y={262} width={56} height={6} rx={3} />)}
      <g className={styles.slide}>
        <path className={`${styles.s} ${styles.d}`} d="M 300 120 L 300 290" />
        <circle className={styles.a} cx={300} cy={120} r={6} />
      </g>
    </g>
  );
}

// Articles: a page of writing, with a cursor.
function Lines() {
  return (
    <g>
      <rect className={styles.w} x={330} y={52} width={250} height={300} rx={10} />
      <path className={styles.quote} d="M 356 104 v -14 c 0 -12 6 -18 16 -20 l 2 5 c -6 2 -9 6 -9 12 h 8 v 17 z m 26 0 v -14 c 0 -12 6 -18 16 -20 l 2 5 c -6 2 -9 6 -9 12 h 8 v 17 z" />
      <rect className={styles.barStrong} x={356} y={124} width={150} height={10} rx={5} />
      {[190, 170, 196, 150, 186, 120].map((w, i) => <rect key={i} className={styles.bar} x={356} y={152 + i * 26} width={w} height={6} rx={3} />)}
      <rect className={`${styles.a} ${styles.blink}`} x={480} y={280} width={3} height={14} />
    </g>
  );
}

// Not found: nodes that lost their connections.
function Scatter() {
  const nodes = [[300, 90], [420, 60], [560, 120], [360, 220], [500, 240], [590, 320], [280, 320]];
  return (
    <g>
      <path className={`${styles.s} ${styles.d}`} d="M 300 90 L 340 82" />
      <path className={`${styles.s} ${styles.d}`} d="M 400 66 L 420 60" />
      <path className={`${styles.s} ${styles.d}`} d="M 360 220 L 400 226" />
      <path className={`${styles.s} ${styles.d}`} d="M 470 236 L 500 240" />
      {nodes.map(([x, y], i) => <circle key={x} className={`${styles.w} ${i === 3 ? styles.lost : ''}`} cx={x} cy={y} r={i === 3 ? 14 : 9} />)}
    </g>
  );
}

const ARTS = {
  board: Board,
  casefiles: CaseFiles,
  path: Path,
  stars: Stars,
  radar: Radar,
  pipeline: Pipeline,
  signal: Signal,
  neural: Neural,
  gates: Gates,
  wireframe: Wireframe,
  roadmap: Roadmap,
  lines: Lines,
  scatter: Scatter,
};

// Case-study pages take their illustration from the project's main discipline.
export const artForTags = (tags = []) => ({ AI: 'neural', Quality: 'gates', Design: 'wireframe', Product: 'roadmap' })[tags[0]] || 'neural';

export default function HeaderArt({ kind, className = '' }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) svg.unpauseAnimations?.();
      else svg.pauseAnimations?.();
    });
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  const Art = ARTS[kind];
  if (!Art) return null;
  return (
    <svg
      ref={ref}
      className={`${styles.art} ${styles.header} ${visible ? '' : styles.paused} ${className}`}
      viewBox="0 0 640 400"
      preserveAspectRatio="xMaxYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <Art motion={!reduced} />
    </svg>
  );
}
