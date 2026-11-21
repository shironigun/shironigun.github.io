// One picture per project for the link-preview cards: a simple drawn emblem of what the project
// is about. Original drawings (no copied logos), in the project's colour on a soft wash of it.
// viewBox 0 0 200 200; `c` is the main colour, `w` the wash, `d` a darker shade.

const Check = ({ x, y, r = 16, c }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#FFFFFF" stroke={c} strokeWidth="5" />
    <path d={`M${x - r * 0.45} ${y} l${r * 0.3} ${r * 0.32} l${r * 0.55} -${r * 0.6}`} fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

const P = {
  // API testing: a request in braces with a passing check.
  api: ({ c, w }) => (
    <>
      <circle cx="100" cy="100" r="78" fill={c} />
      <text x="100" y="124" textAnchor="middle" fontFamily="'Schibsted Grotesk', sans-serif" fontWeight="700" fontSize="74" fill="#FFFFFF">{'{ }'}</text>
      <Check x={152} y={150} r={22} c="#0B7A55" />
    </>
  ),
  // Evaluation: three runs, each passing.
  runs: ({ c, w }) => (
    <>
      {[50, 100, 150].map((y) => (
        <g key={y}>
          <rect x="74" y={y - 14} width="96" height="28" rx="14" fill={w} stroke={c} strokeWidth="3" />
          <Check x={46} y={y} r={20} c={c} />
        </g>
      ))}
    </>
  ),
  // Plugin marketplace: a plug.
  plug: ({ c, d }) => (
    <>
      <rect x="80" y="30" width="12" height="40" rx="6" fill={d} />
      <rect x="108" y="30" width="12" height="40" rx="6" fill={d} />
      <rect x="62" y="64" width="76" height="62" rx="16" fill={c} />
      <path d="M100 126 V146 C100 170 70 168 58 182" fill="none" stroke={c} strokeWidth="12" strokeLinecap="round" />
      <circle cx="100" cy="95" r="9" fill="#FFFFFF" />
    </>
  ),
  // A handbook with an AI spark.
  book: ({ c, w, d }) => (
    <>
      <path d="M100 62 C78 50 50 50 26 58 V156 C50 148 78 148 100 160 Z" fill={w} stroke={c} strokeWidth="5" strokeLinejoin="round" />
      <path d="M100 62 C122 50 150 50 174 58 V156 C150 148 122 148 100 160 Z" fill={w} stroke={c} strokeWidth="5" strokeLinejoin="round" />
      {[80, 96, 112].map((y) => <line key={y} x1="122" y1={y} x2="156" y2={y - 3} stroke={c} strokeWidth="4" strokeLinecap="round" opacity="0.5" />)}
      <path d="M150 14 L156 30 L172 36 L156 42 L150 58 L144 42 L128 36 L144 30 Z" fill={d} />
    </>
  ),
  // First place.
  trophy: ({ c, w, d }) => (
    <>
      <path d="M62 36 H138 V78 C138 108 120 126 100 126 C80 126 62 108 62 78 Z" fill={c} />
      <path d="M62 50 H40 C40 78 52 92 68 94" fill="none" stroke={c} strokeWidth="9" strokeLinecap="round" />
      <path d="M138 50 H160 C160 78 148 92 132 94" fill="none" stroke={c} strokeWidth="9" strokeLinecap="round" />
      <rect x="92" y="124" width="16" height="26" fill={d} />
      <rect x="66" y="150" width="68" height="18" rx="5" fill={d} />
      <text x="100" y="92" textAnchor="middle" fontFamily="'Schibsted Grotesk', sans-serif" fontWeight="700" fontSize="38" fill="#FFFFFF">1</text>
    </>
  ),
  // A guide with numbered steps.
  guide: ({ c, w }) => (
    <>
      <path d="M52 24 H128 L152 48 V176 H52 Z" fill={w} stroke={c} strokeWidth="5" strokeLinejoin="round" />
      <path d="M128 24 V48 H152" fill={w} stroke={c} strokeWidth="5" strokeLinejoin="round" />
      {[78, 112, 146].map((y, i) => (
        <g key={y}>
          <circle cx="76" cy={y} r="11" fill={c} />
          <text x="76" y={y + 5} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="14" fill="#FFFFFF">{i + 1}</text>
          <rect x="96" y={y - 5} width="40" height="10" rx="5" fill={c} opacity="0.35" />
        </g>
      ))}
    </>
  ),
  // A beacon light.
  beacon: ({ c, w, d }) => (
    <>
      <circle cx="100" cy="66" r="46" fill={c} opacity="0.12" />
      <path d="M100 66 L24 40 M100 66 L20 86 M100 66 L176 40 M100 66 L180 86" stroke={c} strokeWidth="7" strokeLinecap="round" opacity="0.5" />
      <path d="M82 178 L89 86 H111 L118 178 Z" fill={c} />
      <path d="M86 118 H114 M84 150 H116" stroke="#FFFFFF" strokeWidth="9" />
      <rect x="84" y="56" width="32" height="30" rx="5" fill={d} />
      <rect x="91" y="62" width="18" height="18" rx="3" fill="#FFE8A3" />
      <path d="M80 56 L100 36 L120 56 Z" fill={d} />
      <rect x="66" y="174" width="68" height="10" rx="5" fill={d} />
    </>
  ),

  // AI agents: a friendly robot with a passing check.
  robot: ({ c, w, d }) => (
    <>
      <line x1="100" y1="44" x2="100" y2="62" stroke={d} strokeWidth="6" strokeLinecap="round" />
      <circle cx="100" cy="38" r="9" fill={c} />
      <rect x="50" y="62" width="100" height="84" rx="22" fill={c} />
      <rect x="64" y="80" width="72" height="40" rx="14" fill="#FFFFFF" />
      <circle cx="84" cy="100" r="7" fill={d} />
      <circle cx="116" cy="100" r="7" fill={d} />
      <rect x="36" y="92" width="14" height="28" rx="7" fill={d} />
      <rect x="150" y="92" width="14" height="28" rx="7" fill={d} />
      <Check x={146} y={150} r={20} c="#0B7A55" />
    </>
  ),
  // A promise in a message, still owed.
  promise: ({ c, w, d }) => (
    <>
      <path d="M30 44 H150 A14 14 0 0 1 164 58 V112 A14 14 0 0 1 150 126 H74 L46 150 V126 H30 A14 14 0 0 1 16 112 V58 A14 14 0 0 1 30 44 Z" fill={w} stroke={c} strokeWidth="5" strokeLinejoin="round" />
      <rect x="38" y="70" width="96" height="10" rx="5" fill={c} opacity="0.35" />
      <rect x="38" y="92" width="64" height="10" rx="5" fill={c} opacity="0.35" />
      <circle cx="150" cy="140" r="30" fill={c} />
      <path d="M150 124 V140 L162 148" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // A quality gate: a shield with a tick.
  shield: ({ c, w }) => (
    <>
      <path d="M100 24 L160 46 V98 C160 136 134 160 100 176 C66 160 40 136 40 98 V46 Z" fill={c} />
      <path d="M72 100 L92 120 L130 80" fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // Design: a frame being reviewed with a pen.
  design: ({ c, w, d }) => (
    <>
      <rect x="28" y="40" width="112" height="120" rx="10" fill={w} stroke={c} strokeWidth="5" />
      <rect x="42" y="56" width="60" height="12" rx="6" fill={c} opacity="0.5" />
      <rect x="42" y="78" width="84" height="34" rx="6" fill={w} />
      <rect x="42" y="124" width="44" height="18" rx="6" fill={c} />
      <path d="M176 70 L130 150 L118 164 L122 146 L168 66 Z" fill={d} />
      <path d="M168 66 L176 70" stroke={d} strokeWidth="8" strokeLinecap="round" />
    </>
  ),
  // Teaching the domain.
  cap: ({ c, d }) => (
    <>
      <path d="M100 46 L178 80 L100 114 L22 80 Z" fill={c} />
      <path d="M58 98 V132 C58 148 142 148 142 132 V98 L100 116 Z" fill={d} />
      <path d="M170 84 V128" stroke={d} strokeWidth="5" strokeLinecap="round" />
      <circle cx="170" cy="134" r="8" fill={d} />
    </>
  ),
  // Finding what doesn't hold: a magnifier over a bug.
  audit: ({ c, w, d }) => (
    <>
      <circle cx="86" cy="86" r="52" fill={w} stroke={c} strokeWidth="10" />
      <path d="M124 124 L168 168" stroke={d} strokeWidth="16" strokeLinecap="round" />
      <ellipse cx="86" cy="92" rx="16" ry="22" fill={d} />
      <circle cx="86" cy="64" r="10" fill={d} />
      <path d="M70 84 L58 78 M70 98 L56 100 M102 84 L114 78 M102 98 L116 100" stroke={d} strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  // Try it before it's built: a pointer on a prototype.
  prototype: ({ c, w, d }) => (
    <>
      <rect x="24" y="36" width="134" height="104" rx="12" fill={w} stroke={c} strokeWidth="5" />
      <rect x="40" y="56" width="70" height="12" rx="6" fill={c} opacity="0.5" />
      <rect x="40" y="80" width="100" height="10" rx="5" fill={w} />
      <rect x="40" y="104" width="54" height="20" rx="8" fill={c} />
      <path d="M118 106 L176 130 L150 138 L164 164 L152 170 L138 144 L120 162 Z" fill={d} stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
    </>
  ),
  // Deciding between options: a signpost.
  decision: ({ c, w, d }) => (
    <>
      <rect x="94" y="30" width="12" height="148" rx="6" fill={d} />
      <path d="M106 44 H160 L176 60 L160 76 H106 Z" fill={c} />
      <path d="M94 90 H40 L24 106 L40 122 H94 Z" fill={c} opacity="0.6" />
      <rect x="72" y="172" width="56" height="10" rx="5" fill={d} />
    </>
  ),
  // Documentation: stacked pages.
  docs: ({ c, w }) => (
    <>
      <rect x="64" y="30" width="96" height="124" rx="10" fill={w} stroke={c} strokeWidth="4" />
      <rect x="40" y="48" width="96" height="124" rx="10" fill={w} stroke={c} strokeWidth="5" />
      {[76, 96, 116, 136].map((y, i) => <rect key={y} x="56" y={y} width={i % 2 ? 48 : 64} height="9" rx="4.5" fill={c} opacity="0.4" />)}
    </>
  ),
  // An idea: a lightbulb.
  idea: ({ c, w, d }) => (
    <>
      <path d="M100 26 C70 26 50 48 50 76 C50 96 62 108 72 120 C78 128 80 134 80 142 H120 C120 134 122 128 128 120 C138 108 150 96 150 76 C150 48 130 26 100 26 Z" fill={c} />
      <rect x="80" y="148" width="40" height="10" rx="4" fill={d} />
      <rect x="84" y="162" width="32" height="10" rx="4" fill={d} />
      <path d="M86 98 L100 112 L114 98" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // A connected model of a feature.
  network: ({ c, w, d }) => (
    <>
      {[[100, 100, 46, 46], [100, 100, 156, 52], [100, 100, 40, 150], [100, 100, 160, 154], [100, 100, 100, 28]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="5" opacity="0.5" />
      ))}
      {[[46, 46], [156, 52], [40, 150], [160, 154], [100, 28]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="14" fill="#FFFFFF" stroke={c} strokeWidth="5" />)}
      <circle cx="100" cy="100" r="28" fill={c} />
    </>
  ),
  // Release notes: a megaphone.
  release: ({ c, w, d }) => (
    <>
      <path d="M40 84 L120 46 V154 L40 116 Z" fill={c} />
      <rect x="24" y="82" width="20" height="36" rx="6" fill={d} />
      <path d="M56 116 L66 160 H84 L76 122" fill={d} />
      <path d="M140 76 C152 88 152 112 140 124 M154 62 C174 82 174 118 154 138" fill="none" stroke={c} strokeWidth="6" strokeLinecap="round" opacity="0.6" />
    </>
  ),
  // A bug report.
  bug: ({ c, w, d }) => (
    <>
      <ellipse cx="100" cy="112" rx="40" ry="52" fill={c} />
      <circle cx="100" cy="56" r="22" fill={d} />
      <line x1="100" y1="72" x2="100" y2="162" stroke="#FFFFFF" strokeWidth="5" />
      <path d="M60 96 L34 86 M60 120 L30 122 M64 144 L40 160 M140 96 L166 86 M140 120 L170 122 M136 144 L160 160 M88 38 L80 22 M112 38 L120 22" stroke={d} strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  // A toolkit.
  toolkit: ({ c, w, d }) => (
    <>
      <rect x="30" y="70" width="140" height="96" rx="14" fill={c} />
      <path d="M76 70 V54 A10 10 0 0 1 86 44 H114 A10 10 0 0 1 124 54 V70" fill="none" stroke={d} strokeWidth="9" />
      <rect x="30" y="104" width="140" height="10" fill={d} />
      <rect x="88" y="98" width="24" height="22" rx="5" fill="#FFFFFF" />
    </>
  ),
  // A chart going up.
  chart: ({ c, w, d }) => (
    <>
      <path d="M30 30 V170 H176" fill="none" stroke={d} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {[[48, 120], [78, 96], [108, 108], [138, 70]].map(([x, y]) => <rect key={x} x={x} y={y} width="22" height={170 - y} rx="4" fill={c} opacity={x === 138 ? 1 : 0.4} />)}
    </>
  ),
  // A film.
  film: ({ c, d }) => (
    <>
      <rect x="22" y="46" width="156" height="108" rx="14" fill={d} />
      <path d="M86 76 L130 100 L86 124 Z" fill="#FFFFFF" />
      {[30, 62, 94, 126, 158].map((x) => <rect key={x} x={x} y="52" width="14" height="8" rx="2" fill="#FFFFFF" opacity="0.5" />)}
      {[30, 62, 94, 126, 158].map((x) => <rect key={x} x={x} y="140" width="14" height="8" rx="2" fill="#FFFFFF" opacity="0.5" />)}
    </>
  ),
  // Browser automation: a browser window and a cursor.
  browser: ({ c, w, d }) => (
    <>
      <rect x="24" y="40" width="152" height="118" rx="12" fill={w} stroke={c} strokeWidth="5" />
      <path d="M24 66 H176" stroke={c} strokeWidth="5" />
      {[40, 54, 68].map((x) => <circle key={x} cx={x} cy="53" r="4" fill={c} />)}
      <path d="M70 92 L52 108 L70 124 M130 92 L148 108 L130 124 M110 86 L90 130" fill="none" stroke={d} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // UI standards: components on a grid.
  components: ({ c, w, d }) => (
    <>
      <rect x="28" y="40" width="64" height="28" rx="8" fill={c} />
      <rect x="104" y="40" width="68" height="28" rx="8" fill={w} stroke={c} strokeWidth="4" />
      <rect x="28" y="84" width="144" height="28" rx="8" fill={w} stroke={c} strokeWidth="4" />
      <rect x="28" y="128" width="54" height="30" rx="15" fill={c} opacity="0.5" />
      <circle cx="67" cy="143" r="11" fill="#FFFFFF" />
      <rect x="98" y="128" width="30" height="30" rx="6" fill={d} />
      <path d="M104 143 L111 150 L122 136" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

// Colours per discipline: main, wash, dark, tint (the strong end of the card's gradient).
const PALETTE = {
  product: ['#2446DB', '#EEF1FD', '#1A33A6', '#C9D4FA'],
  design: ['#7A3FD1', '#F3EEFB', '#57299C', '#DCCBF6'],
  ai: ['#0B7A6E', '#E6F4F2', '#075A51', '#BFE5DF'],
  quality: ['#A35C00', '#FDF3E3', '#7A4400', '#F4D9AE'],
  postman: ['#E8590C', '#FFF1EA', '#B5440A', '#FFCDB0'],
  personal: ['#5B6070', '#EFF0F3', '#3F434F', '#D5D8E0'],
};

// slug → [picture, palette]
const MAP = {
  'promise-tracker': ['promise', 'product'],
  'design-phase': ['design', 'design'],
  'claude-marketplace': ['plug', 'product'],
  'release-notes-suite': ['release', 'product'],
  'ui-testing': ['browser', 'quality'],
  'api-testing': ['api', 'quality'],
  'crm-bug-suite': ['bug', 'quality'],
  'qa-toolkit': ['toolkit', 'quality'],
  'qa-plugin': ['robot', 'ai'],
  'feature-explainer': ['idea', 'product'],
  'feature-intelligence': ['network', 'ai'],
  'quality-gates': ['shield', 'quality'],
  'ai-test-suite-audit': ['audit', 'quality'],
  'ai-qa-workbench': ['robot', 'ai'],
  'ai-prototyping': ['prototype', 'design'],
  'domain-knowledge-base': ['cap', 'product'],
  'ai-foundations-hackathon': ['book', 'ai'],
  'postman-evaluation': ['api', 'postman'],
  'product-decisions': ['decision', 'product'],
  'product-documentation': ['docs', 'product'],
  'feature-guides': ['guide', 'design'],
  'how-to-standard': ['guide', 'product'],
  'guide-build-tool': ['docs', 'design'],
  'promise-tracker-guide': ['guide', 'ai'],
  'promo-films': ['film', 'design'],
  'delivery-dashboards': ['chart', 'personal'],
  'hackathon-2025': ['trophy', 'quality'],
  'ai-evaluation': ['runs', 'ai'],
  'selenium-csharp-notes': ['browser', 'personal'],
  'ui-standards': ['components', 'design'],
  beacon: ['beacon', 'product'],
};

// Every project gets its own colour: 31 hues spread around the wheel, ordered so that projects
// next to each other in the list land far apart. Postman keeps its orange.
const SLUGS = Object.keys(MAP);
// Hand-picked hues for the projects shown together on LinkedIn, so neighbours there differ clearly.
const PICKED = {
  'feature-guides': 320, // magenta
  'ai-evaluation': 172, // teal
  'ai-qa-workbench': 222, // blue
  'claude-marketplace': 140, // green
  'ai-foundations-hackathon': 268, // violet
  beacon: 0, // red
  'hackathon-2025': 192, // cyan
};
function colourFor(slug) {
  if (slug === 'postman-evaluation') return PALETTE.postman;
  const i = Math.max(0, SLUGS.indexOf(slug));
  const hue = slug in PICKED ? PICKED[slug] : Math.round(((i * 13) % SLUGS.length) * (360 / SLUGS.length) + 210) % 360;
  const light = hue >= 40 && hue <= 100 ? 31 : 40; // yellows need more depth to read as text
  return [`hsl(${hue} 68% ${light}%)`, `hsl(${hue} 70% 96%)`, `hsl(${hue} 72% ${light - 12}%)`, `hsl(${hue} 70% 84%)`];
}

export function pictureFor(slug, size = 236) {
  const [name] = MAP[slug] || ['docs'];
  const [c, w, d, t] = colourFor(slug);
  const Pic = P[name];
  return { wash: w, accent: c, tint: t, svg: <svg viewBox="0 0 200 200" width={size} height={size} aria-hidden="true"><Pic c={c} w={w} d={d} /></svg> };
}
