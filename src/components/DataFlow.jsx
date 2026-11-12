import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CheckIcon, ChipIcon, LayersIcon, PersonIcon, PlugIcon, ShieldIcon } from './Icons';
import styles from './DataFlow.module.css';

// A data-flow diagram for case studies, read left to right: who acts (lanes, drawn as rows), what
// each part does (nodes, in time order across the page) and what moves between them (wires,
// labelled with the data they carry). The whole flow fits one screen's height; when it is wider
// than the column it scrolls sideways and follows the step being played. When it scrolls into view
// a trace plays once: a packet carries the data along each wire, the next node lights up, and the
// readout says what happens there and what comes in and goes out. Approval gates hold the packet
// until they turn green. Readers can pause, step, or pick any node; with reduced motion nothing
// moves until they do.
//
//   { graph: { lanes, nodes, edges, phases?, order?, trace? }, caption }
//   lanes:  [{ name, note? }]                       at most 4
//   nodes:  [{ id, name, sub?, lane, row, kind, detail, who? }]
//           lane may be fractional (1.5 sits between lanes 1 and 2); row is the time order, drawn
//           as columns from left to right
//           kind: human | ai | gate | check | store | external | output
//           (a gate waits for a person; a check is automatic: typecheck, a reviewer, a scan)
//   edges:  [{ from, to, label? }]                  a wire that goes back in time is drawn as a loop
//   phases: [{ name, row }]                         a divider before the column where a phase starts
//   order:  [id, …]                                 the trace order, if not column by column
//   trace:  false                                   a map rather than a pipeline: no walk-through

export const KIND = {
  human: { label: 'You', Icon: PersonIcon },
  ai: { label: 'AI agent', Icon: ChipIcon },
  gate: { label: 'Your approval', Icon: ShieldIcon },
  check: { label: 'Automatic check', Icon: ShieldIcon },
  store: { label: 'Saved state', Icon: LayersIcon },
  external: { label: 'Outside tool', Icon: PlugIcon },
  output: { label: 'Result', Icon: CheckIcon },
};

const TRAVEL = 760; // ms for a packet to cross one wire
const GATE_WAIT = 950; // ms a gate holds the packet before it turns green

const prefersStill = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const pad = (n) => String(n).padStart(2, '0');
const wordsIn = (s) => (s ? s.split(/\s+/).length : 0);

// A cubic curve, with its midpoint (for the label) and the direction it arrives in (for the arrow).
function cubic(p0, p1, p2, p3) {
  const mid = [(p0[0] + 3 * p1[0] + 3 * p2[0] + p3[0]) / 8, (p0[1] + 3 * p1[1] + 3 * p2[1] + p3[1]) / 8];
  let dx = p3[0] - p2[0];
  let dy = p3[1] - p2[1];
  if (!dx && !dy) { dx = p3[0] - p0[0]; dy = p3[1] - p0[1]; }
  return { d: `M${p0} C${p1} ${p2} ${p3}`, mid, end: p3, angle: Math.atan2(dy, dx) };
}

function arrowHead([x, y], a, s = 7) {
  const bx = x - s * Math.cos(a);
  const by = y - s * Math.sin(a);
  const px = Math.sin(a) * s * 0.55;
  const py = -Math.cos(a) * s * 0.55;
  return `${x},${y} ${bx + px},${by + py} ${bx - px},${by - py}`;
}

// Text widths, measured with the page's own fonts: a wire label, or a word in a node's name.
const measurers = {};
function textWidth(text, kind = 'label') {
  if (typeof document === 'undefined') return text.length * 6.8;
  if (!measurers[kind]) {
    const root = getComputedStyle(document.documentElement);
    const family = (name) => root.getPropertyValue(name).trim() || 'sans-serif';
    measurers[kind] = document.createElement('canvas').getContext('2d');
    measurers[kind].font = kind === 'name' ? `600 12.5px ${family('--font-display')}` : `500 12px ${family('--font-body')}`;
  }
  return measurers[kind].measureText(text).width;
}

// Spread the ends of several wires along one edge of a node, in the order of the node at the other
// end, so they fan out instead of meeting in one point and hiding each other's arrowheads.
function spread(list, centre, room, otherPos) {
  const out = new Map();
  const sorted = [...list].sort((p, q) => otherPos(p) - otherPos(q));
  const span = Math.max(0, Math.min(room, (sorted.length - 1) * 16));
  sorted.forEach((item, i) => out.set(item, sorted.length < 2 ? centre : centre - span / 2 + (span * i) / (sorted.length - 1)));
  return out;
}

const MIN_COL = 60; // narrower than this and the diagram scrolls sideways instead
const NODE_GAP = 16; // room between neighbouring nodes for a wire and its arrowhead
const MAX_NODE = 250;
const NODE_H = 84;
const LANE_H = NODE_H + 32; // the band between two lanes holds the wire labels
const BAND = 32; // a band above or below the lanes for loops
const PHASE_BAND = 30; // a band on top for phase names
const PHASE_GAP = 16;

// Everything that depends on the width available: columns, node boxes, wires and their labels.
function layout(graph, avail) {
  const { nodes, edges = [], lanes = [], phases = [] } = graph;
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const narrow = avail < 600;
  const laneCount = Math.max(lanes.length, ...nodes.map((n) => Math.floor(n.lane) + 1));
  const cols = Math.max(...nodes.map((n) => n.row)) + 1;
  const sortedPhases = [...phases].sort((p, q) => p.row - q.row);
  const phaseStarts = new Set(sortedPhases.filter((p) => p.row > 0).map((p) => p.row));
  const breaksBefore = (c) => sortedPhases.filter((p) => p.row > 0 && p.row <= c).length;
  const allBreaks = breaksBefore(cols - 1) * PHASE_GAP;

  // Lane names sit in a column of their own, which stays put when the diagram scrolls. When the
  // columns would get tight, the names turn on their side to leave the room to the flow.
  const named = lanes.some((l) => l.name);
  let labelW = named ? 118 : 0;
  let flat = true;
  if (named && (avail - labelW - allBreaks) / cols < 104) { labelW = 40; flat = false; }
  // Loops (wires back in time) run in a band above the lanes when both ends sit in the top half,
  // otherwise below.
  const isBack = edges.map((e) => Boolean(byId[e.from] && byId[e.to] && byId[e.to].row < byId[e.from].row));
  const upper = (n) => n.lane + 0.5 <= laneCount / 2;
  const loopSide = edges.map((e, i) => (isBack[i] ? (upper(byId[e.from]) && upper(byId[e.to]) ? 'top' : 'bottom') : null));
  const phaseBand = sortedPhases.length ? PHASE_BAND : 0;
  const lanesTop = phaseBand + (loopSide.includes('top') ? BAND : 6);
  const lanesBottom = lanesTop + laneCount * LANE_H;
  const height = lanesBottom + (loopSide.includes('bottom') ? BAND : 6);
  const laneMid = (lane) => lanesTop + (lane + 0.5) * LANE_H;

  // A node sits in its column and its lane's row, and widens into the empty cells beside it in its
  // own row (half of each, so two neighbours never meet), so a name gets the room it needs. Whether
  // a side is free depends only on what sits where, not on widths, so it is worked out once.
  const shareRow = (n, m) => Math.abs(m.lane - n.lane) * LANE_H < NODE_H - 1;
  const occupied = (n, c) => nodes.some((m) => m.row === c && m.id !== n.id && shareRow(n, m));
  const free = Object.fromEntries(nodes.map((n) => {
    const c = n.row;
    return [n.id, {
      left: c > 0 && !phaseStarts.has(c) && !occupied(n, c - 1),
      right: c < cols - 1 && !phaseStarts.has(c + 1) && !occupied(n, c + 1),
    }];
  }));
  const place = (colWs) => {
    const lefts = [];
    let x = 0;
    colWs.forEach((w, c) => { if (phaseStarts.has(c)) x += PHASE_GAP; lefts.push(x); x += w; });
    const box = {};
    for (const n of nodes) {
      const c = n.row;
      const own = Math.min(MAX_NODE, colWs[c] - NODE_GAP);
      const mid = lefts[c] + colWs[c] / 2;
      const left = free[n.id].left ? lefts[c] - colWs[c - 1] / 2 + NODE_GAP / 2 : mid - own / 2;
      const right = free[n.id].right ? lefts[c + 1] + colWs[c + 1] / 2 - NODE_GAP / 2 : mid + own / 2;
      const w = Math.max(own, Math.min(MAX_NODE, right - left));
      const cx = (left + right) / 2;
      const cy = laneMid(n.lane);
      box[n.id] = { x: cx - w / 2, y: cy - NODE_H / 2, w, h: NODE_H, cx, cy };
    }
    return { lefts, width: Math.ceil(x), box };
  };

  // Column widths. Each column needs enough for its nodes' longest words (a name may break after a
  // hyphen, never inside a word), counting the room a node borrows from free cells beside it. The
  // rest of the room is shared evenly; when there is not enough, the diagram scrolls sideways.
  const room = avail - labelW - allBreaks;
  const word = Object.fromEntries(nodes.map((n) => [n.id, Math.max(...n.name.split(/\s+|(?<=-)/).map((t) => textWidth(t, 'name')))]));
  let colWs = Array(cols).fill(Math.max(MIN_COL, room / cols));
  for (let pass = 0; pass < 6; pass += 1) {
    const least = Array(cols).fill(0);
    for (const n of nodes) {
      const c = n.row;
      const borrowed = (free[n.id].left ? colWs[c - 1] / 2 : 0) + (free[n.id].right ? colWs[c + 1] / 2 : 0);
      least[c] = Math.max(least[c], Math.min(MAX_NODE, word[n.id] + 18) + NODE_GAP - borrowed);
    }
    // The even share: the largest width that, with every column at least its minimum, fits the room.
    let lo = MIN_COL;
    let hi = Math.max(MIN_COL, room);
    const total = (even) => least.reduce((sum, m) => sum + Math.max(even, m), 0);
    for (let k = 0; k < 24; k += 1) { const m = (lo + hi) / 2; if (total(m) <= room) lo = m; else hi = m; }
    const next = least.map((m) => Math.max(lo, m));
    const settled = next.every((w, c) => Math.abs(w - colWs[c]) < 0.5);
    colWs = next;
    if (settled) break;
  }
  const { lefts, width, box } = place(colWs);
  // A node sets its icon beside its name when the name's longest word still fits beside it;
  // otherwise the icon sits on top.
  for (const n of nodes) box[n.id].stacked = box[n.id].w < 140 || box[n.id].w - 66 < word[n.id];
  const colLeft = (c) => lefts[c];

  // How each wire runs: to the side when the next node starts to the right; straight up or down when
  // the two overlap across the page; a loop through a band when it goes back in time.
  const kind = edges.map((e, i) => {
    const a = box[e.from];
    const b = box[e.to];
    if (!a || !b) return null;
    if (isBack[i]) return 'loop';
    return b.x >= a.x + a.w + 6 ? 'side' : 'drop';
  });
  const ends = edges.map(() => ({}));
  const indexed = edges.map((e, i) => [e, i]);
  for (const n of nodes) {
    const b = box[n.id];
    const pick = (fn) => indexed.filter(fn);
    const below = (id) => box[id].cy > b.cy;
    const sideOut = pick(([e, i]) => e.from === n.id && kind[i] === 'side');
    const sideIn = pick(([e, i]) => e.to === n.id && kind[i] === 'side');
    spread(sideOut, b.cy, b.h - 28, ([e]) => box[e.to].cy).forEach((y, [, i]) => { ends[i].y1 = y; });
    spread(sideIn, b.cy, b.h - 28, ([e]) => box[e.from].cy).forEach((y, [, i]) => { ends[i].y2 = y; });
    const downOut = pick(([e, i]) => e.from === n.id && ((kind[i] === 'drop' && below(e.to)) || loopSide[i] === 'bottom'));
    const upOut = pick(([e, i]) => e.from === n.id && ((kind[i] === 'drop' && !below(e.to)) || loopSide[i] === 'top'));
    const downIn = pick(([e, i]) => e.to === n.id && ((kind[i] === 'drop' && !below(e.from)) || loopSide[i] === 'top'));
    const upIn = pick(([e, i]) => e.to === n.id && ((kind[i] === 'drop' && below(e.from)) || loopSide[i] === 'bottom'));
    const room = b.w - 30;
    spread(downOut, b.cx, room, ([e]) => box[e.to].cx).forEach((x, [, i]) => { ends[i].x1 = x; });
    spread(upOut, b.cx, room, ([e]) => box[e.to].cx).forEach((x, [, i]) => { ends[i].x1 = x; });
    spread(downIn, b.cx, room, ([e]) => box[e.from].cx).forEach((x, [, i]) => { ends[i].x2 = x; });
    spread(upIn, b.cx, room, ([e]) => box[e.from].cx).forEach((x, [, i]) => { ends[i].x2 = x; });
  }
  let topLoops = 0;
  let bottomLoops = 0;
  const wires = edges.map((e, i) => {
    if (!kind[i]) return null;
    const a = box[e.from];
    const b = box[e.to];
    const p = ends[i];
    if (kind[i] === 'side') {
      const x1 = a.x + a.w;
      const x2 = b.x;
      const k = Math.max(14, (x2 - x1) / 2);
      return { ...cubic([x1, p.y1], [x1 + k, p.y1], [x2 - k, p.y2], [x2, p.y2]), kind: 'side' };
    }
    if (kind[i] === 'drop') {
      // Straight down (or up) through the part the two nodes share, so it never runs behind text.
      const lo = Math.max(a.x, b.x) + 12;
      const hi = Math.min(a.x + a.w, b.x + b.w) - 12;
      const clamp = (x) => (lo <= hi ? Math.max(lo, Math.min(hi, x)) : (a.cx + b.cx) / 2);
      const x1 = clamp(p.x1 ?? a.cx);
      const x2 = clamp(p.x2 ?? b.cx);
      const down = b.cy > a.cy;
      const y1 = down ? a.y + a.h : a.y;
      const y2 = down ? b.y : b.y + b.h;
      const m = (y1 + y2) / 2;
      return { ...cubic([x1, y1], [x1, m], [x2, m], [x2, y2]), kind: 'drop' };
    }
    const top = loopSide[i] === 'top';
    const depth = top ? topLoops++ : bottomLoops++;
    const bandY = top ? lanesTop - BAND / 2 - (depth % 2) * 5 : lanesBottom + BAND / 2 + (depth % 2) * 5;
    const x1 = p.x1 ?? a.cx;
    const x2 = p.x2 ?? b.cx;
    const y1 = top ? a.y : a.y + a.h;
    const y2 = top ? b.y : b.y + b.h;
    const ctrl = (y1 + y2) / 2 + (bandY - (y1 + y2) / 2) / 0.75;
    return { ...cubic([x1, y1], [x1, ctrl], [x2, ctrl], [x2, y2]), mid: [(x1 + x2) / 2, bandY], kind: 'loop' };
  });

  // Labels go where they cover nothing: the middle of the wire if it is clear, otherwise the band
  // between two lanes nearest to it. A label with nowhere clear stays tucked away until its wire
  // is lit (hovered, or carrying the packet).
  const placed = [];
  const nodeRects = Object.values(box).map((b) => ({ x: b.x - 3, y: b.y - 2, w: b.w + 6, h: b.h + 4 }));
  const hits = (r) => [...nodeRects, ...placed].some((q) => r.x < q.x + q.w && q.x < r.x + r.w && r.y < q.y + q.h && q.y < r.y + r.h);
  const boundaries = Array.from({ length: laneCount + 1 }, (_, k) => lanesTop + k * LANE_H);
  const labels = edges.map((e, i) => {
    const w = wires[i];
    if (!w || !e.label) return null;
    const lw = Math.ceil(textWidth(e.label)) + 18;
    const lh = 20;
    const tries = [w.mid];
    if (w.kind !== 'loop') {
      const a = box[e.from];
      const b = box[e.to];
      const lo = Math.min(a.cy, b.cy) - LANE_H / 2 - 1;
      const hi = Math.max(a.cy, b.cy) + LANE_H / 2 + 1;
      boundaries.filter((y) => y >= lo && y <= hi)
        .sort((p, q) => Math.abs(p - w.mid[1]) - Math.abs(q - w.mid[1]))
        .forEach((y) => tries.push([w.mid[0], y]));
    }
    const fit = (tx) => Math.max(lw / 2 + 2, Math.min(width - lw / 2 - 2, tx));
    for (const [tx, ty] of tries) {
      const x = fit(tx);
      const r = { x: x - lw / 2, y: ty - lh / 2, w: lw, h: lh };
      if (r.y < 0 || r.y + lh > height || hits(r)) continue;
      placed.push({ x: r.x - 4, y: r.y - 1, w: r.w + 8, h: r.h + 2 });
      return { x, y: ty, tucked: false };
    }
    return { x: fit(w.mid[0]), y: w.mid[1], tucked: true };
  });

  return {
    narrow,
    width,
    height,
    labelW,
    flat,
    laneH: LANE_H,
    lanesTop,
    box,
    wires,
    labels,
    laneLines: boundaries.slice(1, -1),
    phases: sortedPhases.map((p) => ({ ...p, x: colLeft(p.row) + 2, lineX: p.row > 0 ? colLeft(p.row) - PHASE_GAP / 2 : null })),
  };
}

export { layout as flowLayout, textWidth as flowTextWidth };

export default function DataFlow({ graph, label }) {
  const { nodes, edges = [], lanes = [], trace = true } = graph;
  const stageRef = useRef(null);
  const scrollRef = useRef(null);
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(0);

  // The room inside the stage: the lane names and the flow share it.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const measure = () => {
      const cs = getComputedStyle(el);
      setWidth(Math.floor(el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const order = useMemo(
    () => graph.order || [...nodes].sort((a, b) => a.row - b.row || a.lane - b.lane).map((n) => n.id),
    [graph.order, nodes],
  );
  const byId = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);
  const stepOf = useMemo(() => Object.fromEntries(order.map((id, i) => [id, i])), [order]);
  const L = useMemo(() => (width ? layout(graph, width) : null), [graph, width]);

  const [step, setStep] = useState(trace ? 0 : -1);
  const [stage, setStage] = useState('here'); // 'travel' while packets move, 'here' once they arrive
  const [playing, setPlaying] = useState(false);
  const [gateOk, setGateOk] = useState(true);
  const [hover, setHover] = useState(null);
  const started = useRef(false);
  const autoPaused = useRef(false);
  const playingRef = useRef(false);
  const pathRefs = useRef([]);
  const packetRefs = useRef([]);
  playingRef.current = playing;

  const activeId = step >= 0 ? order[step] : null;
  const incoming = useMemo(
    () => edges.map((e, i) => i).filter((i) => edges[i].to === activeId && stepOf[edges[i].from] < step),
    [edges, activeId, stepOf, step],
  );

  // Play once when the diagram comes into view; pause while it is scrolled away, then carry on.
  useEffect(() => {
    if (!trace || prefersStill()) return undefined;
    const el = canvasRef.current;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!started.current) {
          started.current = true;
          setStep(0);
          setStage('travel');
          setPlaying(true);
        } else if (autoPaused.current) {
          autoPaused.current = false;
          setPlaying(true);
        }
      } else if (playingRef.current) {
        autoPaused.current = true;
        setPlaying(false);
      }
    }, { rootMargin: '0px 0px -28% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [trace]);

  // Move the packets along the wires into the active node.
  useEffect(() => {
    if (!playing || stage !== 'travel') return undefined;
    if (!incoming.length || prefersStill()) { setStage('here'); return undefined; }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / TRAVEL);
      for (const i of incoming) {
        const path = pathRefs.current[i];
        const dot = packetRefs.current[i];
        if (!path || !dot) continue;
        const p = path.getPointAtLength(path.getTotalLength() * ease(t));
        dot.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
        dot.style.opacity = t < 1 ? '1' : '0';
      }
      if (t < 1) raf = requestAnimationFrame(tick);
      else setStage('here');
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, stage, incoming]);

  // Stay long enough to read the step (a gate first waits for its yes), then move on.
  useEffect(() => {
    if (!playing || stage !== 'here') return undefined;
    const node = byId[activeId];
    const isGate = node?.kind === 'gate';
    setGateOk(!isGate);
    const timers = [];
    if (isGate) timers.push(setTimeout(() => setGateOk(true), GATE_WAIT));
    const dwell = Math.min(4400, Math.max(1800, wordsIn(node?.detail) * 140)) + (isGate ? GATE_WAIT : 0);
    timers.push(setTimeout(() => {
      if (step < order.length - 1) {
        setStep(step + 1);
        setStage('travel');
      } else {
        setPlaying(false);
      }
    }, dwell));
    return () => timers.forEach(clearTimeout);
  }, [playing, stage, step, activeId, byId, order.length]);

  // When the flow is wider than the column, keep the step being shown in view.
  useEffect(() => {
    const sc = scrollRef.current;
    const b = activeId && L?.box[activeId];
    if (!sc || !b || sc.scrollWidth <= sc.clientWidth + 1) return;
    if (b.x >= sc.scrollLeft + 8 && b.x + b.w <= sc.scrollLeft + sc.clientWidth - 8) return;
    sc.scrollTo({ left: Math.max(0, b.cx - sc.clientWidth / 2), behavior: prefersStill() ? 'auto' : 'smooth' });
  }, [activeId, L]);

  const go = (i) => {
    started.current = true;
    autoPaused.current = false;
    setPlaying(false);
    setStage('here');
    setGateOk(true);
    setStep(Math.max(0, Math.min(order.length - 1, i)));
  };
  const atEnd = step >= order.length - 1;
  const toggle = () => {
    started.current = true;
    autoPaused.current = false;
    if (playing) { setPlaying(false); return; }
    if (atEnd) { setStep(0); setStage('travel'); } else { setStage('here'); }
    setPlaying(true);
  };

  // What to emphasise: in a trace, the path so far and the wires into the active node; on hover (or
  // a selected node in a map), the wires touching that node.
  const focus = hover || (!trace ? activeId : null);
  const touches = (e) => e.from === focus || e.to === focus;
  const nearFocus = (id) => !focus || id === focus || edges.some((e) => touches(e) && (e.from === id || e.to === id));
  const visited = (id) => trace && stepOf[id] <= step;
  const wireState = (e, i) => {
    if (focus) return touches(e) ? styles.hot : styles.dim;
    if (!trace) return '';
    if (incoming.includes(i)) return styles.live;
    if (stepOf[e.from] < stepOf[e.to] && stepOf[e.to] <= step) return styles.done;
    return '';
  };

  const kindsUsed = Object.keys(KIND).filter((k) => nodes.some((n) => n.kind === k));
  const active = activeId ? byId[activeId] : null;
  const whoOf = (n) => n.who ?? (Number.isInteger(n.lane) ? lanes[n.lane]?.name : undefined);
  const showPackets = playing && stage === 'travel';
  // What the active part takes in and hands on, named in the readout.
  const flowsIn = active ? edges.filter((e) => e.to === active.id && byId[e.from]) : [];
  const flowsOut = active ? edges.filter((e) => e.from === active.id && byId[e.to]) : [];

  return (
    <div className={`${styles.graph} ${L?.narrow ? styles.narrow : ''}`} role="group" aria-label={label || 'Data flow'}>
      <div className={styles.legend} aria-hidden="true">
        {kindsUsed.map((k) => {
          const { label: kl, Icon } = KIND[k];
          return <span key={k} className={`${styles.key} ${styles[`k_${k}`]}`}><span className={styles.keyTile}><Icon width="12" height="12" /></span>{kl}</span>;
        })}
        {edges.some((e) => e.label) && <span className={styles.keyWire}><span className={styles.keyPacket}>data</span>moves along the wires</span>}
      </div>

      <div ref={stageRef} className={styles.stage}>
        {L && L.labelW > 0 && (
          <div className={`${styles.laneCol} ${L.flat ? '' : styles.turned}`} style={{ width: L.labelW, height: L.height }} aria-hidden="true">
            {lanes.map((l, i) => l.name && (
              <div key={l.name} className={styles.lane} style={{ top: L.lanesTop + i * L.laneH, height: L.laneH }}>
                <span className={styles.laneName}>{l.name}</span>
                {l.note && L.flat && <span className={styles.laneNote}>{l.note}</span>}
              </div>
            ))}
          </div>
        )}
        <div ref={scrollRef} className={styles.scroller}>
          <div ref={canvasRef} className={styles.canvas} style={{ width: L ? L.width : '100%', height: L ? L.height : 320 }}>
            {L && (
              <>
                <svg className={styles.wires} width={L.width} height={L.height} aria-hidden="true">
                  {L.laneLines.map((y) => <line key={y} className={styles.laneLine} x1={0} x2={L.width} y1={y} y2={y} />)}
                  {L.phases.map((p) => p.lineX !== null && (
                    <line key={p.name} className={styles.phaseLine} x1={p.lineX} x2={p.lineX} y1={4} y2={L.height - 2} />
                  ))}
                  {edges.map((e, i) => {
                    const w = L.wires[i];
                    if (!w) return null;
                    const cls = wireState(e, i);
                    return (
                      <g key={`${e.from}-${e.to}-${i}`} className={cls}>
                        <path ref={(el) => { pathRefs.current[i] = el; }} className={`${styles.wire} ${w.kind === 'loop' ? styles.loop : ''}`} d={w.d} />
                        <polygon className={styles.arrow} points={arrowHead(w.end, w.angle, L.narrow ? 6 : 7)} />
                      </g>
                    );
                  })}
                </svg>

                {L.phases.map((p) => (
                  <span key={p.name} className={styles.phase} style={{ left: p.x }} aria-hidden="true">{p.name}</span>
                ))}

                {edges.map((e, i) => {
                  const at = L.labels[i];
                  if (!at) return null;
                  return (
                    <span
                      key={`l-${i}`}
                      className={`${styles.edgeLabel} ${at.tucked ? styles.tucked : ''} ${wireState(e, i)}`}
                      style={{ left: at.x, top: at.y }}
                      aria-hidden="true"
                    >
                      {e.label}
                    </span>
                  );
                })}

                {order.map((id) => {
                  const n = byId[id];
                  const b = L.box[id];
                  const k = KIND[n.kind] || KIND.ai;
                  const isActive = id === activeId;
                  const isGate = n.kind === 'gate';
                  const waiting = isGate && isActive && trace && !gateOk;
                  const approved = isGate && trace && visited(id) && !waiting;
                  const Icon = approved ? CheckIcon : k.Icon;
                  const { stacked } = b;
                  const cls = [
                    styles.node,
                    stacked && styles.stack,
                    styles[`k_${n.kind}`],
                    visited(id) && styles.visited,
                    isActive && styles.active,
                    waiting && styles.waiting,
                    approved && styles.approved,
                    !nearFocus(id) && styles.dimNode,
                  ].filter(Boolean).join(' ');
                  return (
                    <button
                      key={id}
                      type="button"
                      className={cls}
                      style={{ left: b.x, top: b.y, width: b.w, height: b.h }}
                      aria-pressed={isActive}
                      onClick={() => go(stepOf[id])}
                      onPointerEnter={(ev) => ev.pointerType === 'mouse' && setHover(id)}
                      onPointerLeave={() => setHover(null)}
                    >
                      <span className={styles.tile} aria-hidden="true"><Icon width={stacked ? 13 : 15} height={stacked ? 13 : 15} /></span>
                      <span className={styles.nodeText}>
                        <span className={styles.name}>{n.name}</span>
                        {n.sub && b.w >= 170 && <span className={styles.sub}>{n.sub}</span>}
                      </span>
                    </button>
                  );
                })}

                {showPackets && incoming.map((i) => {
                  const e = edges[i];
                  const withText = !L.narrow && incoming.length <= 2 && e.label;
                  return (
                    <span
                      key={`p-${i}-${step}`}
                      ref={(el) => { packetRefs.current[i] = el; }}
                      className={`${styles.packet} ${withText ? '' : styles.packetDot}`}
                      aria-hidden="true"
                    >
                      {withText ? e.label : ''}
                    </span>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.readout} aria-live={playing ? 'off' : 'polite'}>
        {trace && <span className={styles.progress} aria-hidden="true"><span style={{ width: `${((step + 1) / order.length) * 100}%` }} /></span>}
        {active ? (
          <>
            {trace && <span className={styles.count} aria-label={`Step ${step + 1} of ${order.length}`}>{pad(step + 1)}<small>/{pad(order.length)}</small></span>}
            <span className={styles.readBody}>
              <span className={styles.who}>
                <span className={`${styles.whoKind} ${styles[`k_${active.kind}`]}`}>{(KIND[active.kind] || KIND.ai).label}</span>
                {whoOf(active) && <span>{whoOf(active)}</span>}
              </span>
              <span className={styles.readTitle}>{active.name}</span>
              <span className={styles.readText}>{active.detail}</span>
              {(flowsIn.length > 0 || flowsOut.length > 0) && (
                <span className={styles.flows}>
                  {flowsIn.map((e, i) => <span key={`i${i}`} className={styles.flowIn}>In: {e.label || byId[e.from].name}</span>)}
                  {flowsOut.map((e, i) => <span key={`o${i}`} className={styles.flowOut}>Out: {e.label || byId[e.to].name}</span>)}
                </span>
              )}
            </span>
          </>
        ) : (
          <span className={styles.readHint}>Pick any part to see what it does and what flows in and out of it.</span>
        )}
        {trace && (
          <span className={styles.controls}>
            <button type="button" className={styles.ctl} onClick={() => go(step - 1)} disabled={step <= 0}>Back</button>
            <button type="button" className={`${styles.ctl} ${styles.ctlMain}`} onClick={toggle}>{playing ? 'Pause' : atEnd ? 'Replay' : 'Play'}</button>
            <button type="button" className={styles.ctl} onClick={() => go(step + 1)} disabled={atEnd}>Next</button>
          </span>
        )}
      </div>

      <ol className="visually-hidden">
        {order.map((id) => {
          const n = byId[id];
          const ins = edges.filter((e) => e.to === id && byId[e.from]);
          return (
            <li key={id}>
              {n.name}{whoOf(n) ? ` (${whoOf(n)})` : ''}: {n.detail}
              {ins.map((e) => ` Gets ${e.label || 'its input'} from ${byId[e.from].name}.`).join('')}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// The words inside a graph, for the reading time.
export function graphWords(g) {
  if (!g) return [];
  return [
    ...(g.lanes || []).flatMap((l) => [l.name, l.note]),
    ...g.nodes.flatMap((n) => [n.name, n.sub, n.detail]),
    ...(g.edges || []).map((e) => e.label),
    ...(g.phases || []).map((p) => p.name),
  ];
}
