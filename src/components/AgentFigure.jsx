import styles from './RopeAgent.module.css';

// The rope agent's drawing, in a 84 x 108 box. The rope runs down x = 40 and the body swings
// from between the hands. Poses change the arms and legs; moods change the face. A transparent
// hit layer on top tells head, belly, hand and leg clicks apart.

const EYES = [[31, 45], [49, 45]];
const heart = (x, y) => `M${x} ${y + 3.6} C${x - 6.4} ${y - 0.6} ${x - 3.6} ${y - 6.2} ${x} ${y - 2.6} C${x + 3.6} ${y - 6.2} ${x + 6.4} ${y - 0.6} ${x} ${y + 3.6} Z`;
const sparkle = (x, y, r = 5.4) => `M${x} ${y - r} Q${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y} Q${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r} Q${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y} Q${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r} Z`;
const lid = (x, y) => `M${x - 3.8} ${y - 0.4} H${x + 3.8} A3.8 3.8 0 0 1 ${x - 3.8} ${y - 0.4} Z`;

// [path, hand x, hand y] for the left and right arm in each pose.
const GRIP_L = ['M13 44 C2 36 6 15 37.4 15.6', 37.6, 15.6];
const GRIP_R = ['M67 44 C79 35 74 9 42.6 7.8', 42.4, 7.8];
const FREE_L = ['M13 46 C6 52 4 60 6 66', 6, 68];
const FREE_R = ['M67 46 C74 52 76 60 74 66', 74, 68];
const ARMS = {
  grip: [GRIP_L, GRIP_R],
  oneHand: [GRIP_L, FREE_R],
  releaseL: [FREE_L, GRIP_R],
  releaseR: [GRIP_L, FREE_R],
  boo: [GRIP_L, ['M67 42 C78 34 80 22 76 13', 76, 11]],
  fall: [['M13 42 C6 34 6 22 12 14', 12, 12], ['M67 42 C74 34 74 22 68 14', 68, 12]],
  wall: [['M13 44 C6 40 2 32 2 24', 2, 22], ['M67 42 C74 32 70 20 62 14', 61, 12]],
  slump: [['M14 50 C8 60 8 70 10 78', 10, 80], ['M66 50 C72 60 72 70 70 78', 70, 80]],
  stand: [['M14 50 C10 58 10 66 12 72', 12, 74], ['M66 50 C70 58 70 66 68 72', 68, 74]],
  sit: [['M14 48 C14 66 30 74 48 74', 48, 74], ['M66 48 C66 66 50 76 32 76', 32, 76]],
};
const WAVE = ['M67 44 C76 39 76 28 72 20', 72, 18];
const LEGS = {
  hang: [['M34 86 Q33 94 31 99', 30, 100.5], ['M46 86 Q47 94 49 99', 50, 100.5]],
  fall: [['M34 86 Q30 93 25 97', 24, 98.5], ['M46 86 Q50 93 55 97', 56, 98.5]],
  sit: [['M34 86 Q28 92 20 94', 18, 95], ['M46 86 Q52 92 60 94', 62, 95]],
};
const LEG_HIT = { hang: [22, 86, 36, 18], fall: [16, 86, 48, 16], sit: [10, 86, 60, 14] };

function Eyes({ mood, blink }) {
  switch (mood) {
    case 'hello':
    case 'happy':
    case 'laugh':
      return EYES.map(([x, y]) => <path key={x} className={styles.eyeLine} d={`M${x - 3.8} ${y + 1} Q${x} ${y - 4.4} ${x + 3.8} ${y + 1}`} />);
    case 'relieved':
    case 'healing':
    case 'sleepy':
      return EYES.map(([x, y]) => <path key={x} className={styles.eyeLine} d={`M${x - 3.6} ${y} Q${x} ${y + 3} ${x + 3.6} ${y}`} />);
    case 'whee':
    case 'wince':
      return (
        <>
          <path className={styles.eyeLine} d="M28 41.5 L33.5 45 L28 48.5" />
          <path className={styles.eyeLine} d="M52 41.5 L46.5 45 L52 48.5" />
        </>
      );
    case 'squint':
      return EYES.map(([x, y]) => <path key={x} className={styles.eyeLine} d={`M${x - 4} ${y + 0.5} Q${x} ${y - 1.2} ${x + 4} ${y + 0.5}`} />);
    case 'whoa':
      return EYES.map(([x, y]) => (
        <g key={x}>
          <circle className={styles.eye} cx={x} cy={y} r="5" />
          <circle className={styles.glint} cx={x + 1.6} cy={y - 1.7} r="1.5" />
        </g>
      ));
    case 'spooky':
      return EYES.map(([x, y]) => (
        <g key={x}>
          <circle className={styles.spookEye} cx={x} cy={y - 0.5} r="5.6" />
          <circle className={styles.pupil} cx={x} cy={y - 0.5} r="1.5" />
        </g>
      ));
    case 'love':
      return EYES.map(([x, y]) => <path key={x} className={styles.heart} d={heart(x, y)} />);
    case 'starry':
      return EYES.map(([x, y]) => <path key={x} className={styles.star} d={sparkle(x, y)} />);
    case 'stressed':
      return EYES.map(([x, y]) => <ellipse key={x} className={styles.eye} cx={x} cy={y + 0.5} rx="3" ry="3.6" />);
    case 'determined':
      return EYES.map(([x, y]) => <ellipse key={x} className={styles.eye} cx={x} cy={y + 0.6} rx="3.4" ry="3.2" />);
    case 'dizzy':
      return EYES.map(([x, y]) => <path key={x} className={styles.eyeLine} d={`M${x - 3.2} ${y - 3.2} L${x + 3.2} ${y + 3.2} M${x + 3.2} ${y - 3.2} L${x - 3.2} ${y + 3.2}`} />);
    case 'grumpy':
      return EYES.map(([x, y]) => <path key={x} className={styles.eye} d={lid(x, y + 0.5)} />);
    default:
      return EYES.map(([x, y]) => <ellipse key={x} className={styles.eye} cx={x} cy={y} rx="3.7" ry={blink ? 0.6 : 4.8} />);
  }
}

function Brows({ mood }) {
  if (mood === 'stressed') return <path className={styles.brow} d="M27 40.5 L34.2 37.8 M53 40.5 L45.8 37.8" />;
  if (mood === 'determined') return <path className={styles.brow} d="M27 39.4 H35 M45 39.4 H53" />;
  if (mood === 'grumpy') return <path className={styles.brow} d="M27 38.6 L34.6 41.4 M53 38.6 L45.4 41.4" />;
  if (mood === 'spooky') return <path className={styles.brow} d="M26 36.8 L34 38.6 M54 36.8 L46 38.6" />;
  return null;
}

function Mouth({ mood }) {
  switch (mood) {
    case 'whoa':
      return <ellipse className={styles.mouthFill} cx="40" cy="55.5" rx="2.5" ry="3.1" />;
    case 'sleepy':
      return <ellipse className={styles.mouthFill} cx="40" cy="55" rx="1.6" ry="1.2" />;
    case 'whee':
    case 'laugh':
      return <path className={styles.mouthFill} d="M34.4 51.6 H45.6 Q45.2 59.8 40 59.8 Q34.8 59.8 34.4 51.6 Z" />;
    case 'hello':
    case 'happy':
    case 'starry':
      return <path className={styles.mouthFill} d="M35.4 52.4 Q40 59.4 44.6 52.4 Z" />;
    case 'spooky':
      return <path className={styles.mouthFill} d="M33 52 L35.5 55 L38 52.4 L40 55.4 L42 52.4 L44.5 55 L47 52 Q46 59.6 40 59.6 Q34 59.6 33 52 Z" />;
    case 'wince':
      return <path className={styles.mouthLine} d="M35 55.5 L37.5 54 L40 55.5 L42.5 54 L45 55.5" />;
    case 'stressed':
    case 'dizzy':
      return <path className={styles.mouthLine} d="M35 55 Q37.5 52.8 40 55 Q42.5 57.2 45 55" />;
    case 'determined':
    case 'squint':
      return <path className={styles.mouthLine} d="M36.5 55 H43.5" />;
    case 'grumpy':
      return <path className={styles.mouthLine} d="M36 56.8 Q40 53.4 44 56.8" />;
    case 'healing':
      return <path className={styles.mouthLine} d="M37 55 H43" />;
    default:
      return <path className={styles.mouthLine} d="M36 54 Q40 57.6 44 54" />;
  }
}

function Limb({ d, hx, hy, className = '' }) {
  return (
    <g className={className}>
      <path className={styles.limb} d={d} />
      <circle className={styles.hand} cx={hx} cy={hy} r="3.8" />
    </g>
  );
}

export default function AgentFigure({ pose, mood, blink, flags, refs, onPart, onEnter, onLeave }) {
  const waving = pose === 'grip' && (mood === 'hello' || mood === 'happy');
  const [left, right] = ARMS[pose] || ARMS.grip;
  const shownRight = waving ? WAVE : right;
  const legKind = pose === 'fall' || pose === 'wall' ? 'fall' : pose === 'sit' || pose === 'slump' ? 'sit' : 'hang';
  const legs = LEGS[legKind];
  const cheeks = ['hello', 'happy', 'love', 'starry', 'relieved', 'laugh'].includes(mood);
  const climbing = flags.climbing ? styles.climbing : '';
  const freeL = pose === 'releaseL' || pose === 'fall' ? styles.flailA : '';
  const freeR = ['oneHand', 'releaseR', 'fall', 'wall'].includes(pose) ? styles.flailB : '';
  const part = (name, side) => (e) => {
    e.stopPropagation();
    onPart(name, side);
  };
  const [lx, ly, lw, lh] = LEG_HIT[legKind];

  return (
    <svg ref={refs.figure} className={styles.figure} viewBox="0 0 84 108" focusable="false">
      <g ref={refs.swing} className={styles.swing}>
        <g className={styles.idle}>
          <g className={`${flags.shake ? styles.shake : ''} ${flags.laughing ? styles.laughing : ''}`}>
            <g className={`${styles.main} ${flags.lurk ? styles.dim : ''} ${flags.pop ? styles.pop : ''}`}>
              <g className={`${styles.legs} ${flags.walking ? styles.walking : ''} ${flags.kick ? styles.kick : ''}`}>
                {legs.map(([d, fx, fy], i) => (
                  <g key={i} className={i ? styles.legB : styles.legA}>
                    <path className={styles.limb} d={d} />
                    <ellipse className={styles.foot} cx={fx} cy={fy} rx={legKind === 'sit' ? 4.6 : 4.2} ry="2.8" />
                  </g>
                ))}
              </g>
              <rect className={styles.torso} x="28" y="70" width="24" height="18" rx="8" />
              <circle className={styles.badge} cx="40" cy="79" r="2.4" />

              <Limb d={left[0]} hx={left[1]} hy={left[2]} className={`${climbing} ${freeL}`} />
              <Limb d={shownRight[0]} hx={shownRight[1]} hy={shownRight[2]} className={waving ? styles.wave : `${climbing} ${styles.climbB} ${freeR}`} />

              <g className={styles.head}>
                <rect className={styles.shell} x="12" y="22" width="56" height="48" rx="18" />
                <rect ref={refs.screen} className={`${styles.screen} ${flags.broken ? styles.flicker : ''}`} x="17" y="27" width="46" height="37" rx="13" />
                <circle className={styles.light} cx="40" cy="24.6" r="1.6" />
                <ellipse className={`${styles.cheek} ${cheeks ? styles.cheekOn : ''}`} cx="23.5" cy="53" rx="3.2" ry="2" />
                <ellipse className={`${styles.cheek} ${cheeks ? styles.cheekOn : ''}`} cx="56.5" cy="53" rx="3.2" ry="2" />
                <g ref={refs.eyes} className={`${styles.eyes} ${flags.away ? styles.away : ''} ${mood === 'spooky' ? styles.glow : ''}`}>
                  <Eyes mood={mood} blink={blink} />
                </g>
                <Brows mood={mood} />
                <g className={flags.talking ? styles.talking : ''}>
                  <Mouth mood={mood} />
                </g>
                {flags.broken && <path className={styles.crack} d="M51 28 L47 35 L52 39 L46 48 L49 52" />}
                {mood === 'healing' && <rect className={styles.scan} x="17" y="27" width="46" height="3" rx="1.5" />}
                {flags.bandaid && (
                  <g transform="rotate(-35 19 27)">
                    <rect className={styles.bandaid} x="12.5" y="24.8" width="13" height="4.6" rx="2.2" />
                    <rect className={styles.pad} x="17" y="25.4" width="4" height="3.4" rx="0.8" />
                  </g>
                )}
              </g>

              {(mood === 'stressed' || mood === 'relieved' || mood === 'wince') && <path className={styles.sweat} d="M65 23 Q68.6 28.6 65 30.8 Q61.4 28.6 65 23 Z" />}
              {mood === 'dizzy' && (
                <g className={styles.orbit}>
                  <path className={styles.star} d={sparkle(26, 14, 3.4)} />
                  <path className={styles.star} d={sparkle(54, 14, 3.4)} />
                  <path className={styles.star} d={sparkle(40, 6, 3.4)} />
                </g>
              )}
              {mood === 'healing' && (
                <g className={styles.plus}>
                  <path d="M8 26 v6 M5 29 h6" />
                  <path d="M74 34 v6 M71 37 h6" />
                  <path d="M70 14 v5 M67.5 16.5 h5" />
                </g>
              )}
              {mood === 'sleepy' && (
                <g className={styles.zs}>
                  <text x="64" y="30">z</text>
                  <text x="70" y="22">z</text>
                  <text x="76" y="14">z</text>
                </g>
              )}
              {mood === 'laugh' && (
                <g className={styles.zs}>
                  <text x="64" y="28">ha</text>
                  <text x="70" y="18">ha</text>
                </g>
              )}
            </g>

            {/* In the dark he hides, all but his eyes. */}
            {flags.lurk && (
              <g className={styles.lurkEyes}>
                <ellipse cx="31" cy="45" rx="3.4" ry="4.4" />
                <ellipse cx="49" cy="45" rx="3.4" ry="4.4" />
              </g>
            )}

            <g className={styles.hits} onPointerEnter={onEnter} onPointerLeave={onLeave}>
              <rect className={styles.hit} x={lx} y={ly} width={lw} height={lh} onClick={part('leg')} />
              <rect className={styles.hit} x="26" y="68" width="28" height="22" onClick={part('belly')} />
              <rect className={styles.hit} x="11" y="21" width="58" height="50" rx="18" onClick={part('head')} />
              <g onClick={part('hand', 'L')}>
                <path className={styles.hitStroke} d={left[0]} />
                <circle className={styles.hit} cx={left[1]} cy={left[2]} r="7" />
              </g>
              <g onClick={part('hand', 'R')}>
                <path className={styles.hitStroke} d={shownRight[0]} />
                <circle className={styles.hit} cx={shownRight[1]} cy={shownRight[2]} r="7" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
