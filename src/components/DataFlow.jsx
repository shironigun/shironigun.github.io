import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CheckIcon, ChipIcon, LayersIcon, PersonIcon, PlugIcon, ShieldIcon } from './Icons';
import styles from './DataFlow.module.css';

// A data-flow diagram for case studies: who acts (lanes, drawn as columns), what each part does
// (nodes, in time order down the page) and what moves between them (wires, labelled with the data
// they carry). When it scrolls into view a trace plays once: a packet carries the data along each
// wire, the next node lights up, and the readout says what happens there. Approval gates hold the
// packet until they turn green. Readers can pause, step, or pick any node; with reduced motion
// nothing moves until they do.
//
//   { graph: { lanes, nodes, edges, phases?, order?, trace? }, caption }
//   lanes:  [{ name, note? }]                       at most 4, so it still reads on a phone
//   nodes:  [{ id, name, sub?, lane, row, kind, detail, who? }]
//           lane may be fractional (1.5 sits between lanes 1 and 2); row is the time order
//           kind: human | ai | gate | check | store | external | output
//           (a gate waits for a person; a check is automatic: typecheck, a reviewer, a scan)
//   edges:  [{ from, to, label? }]                  a wire that goes back up the page is drawn as a loop
//   phases: [{ name, row }]                         a divider above the row where a phase starts
//   order:  [id, …]                                 the trace order, if not row by row
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

// Down the page: bottom of one node to the top of the next. Same row: side to side, with the label
// dropped into the gap below. Back up the page: a loop out to the right.
// `sx` and `ex` are the ports on the bottom and top edges, spread apart when several wires share a node.
function route(a, b, right, sx = a.cx, ex = b.cx) {
  if (b.y > a.y + 1) {
    const y1 = a.y + a.h;
    const k = (b.y - y1) / 2;
    return { ...cubic([sx, y1], [sx, y1 + k], [ex, b.y - k], [ex, b.y]), kind: 'down' };
  }
  if (Math.abs(b.y - a.y) <= 1) {
    const toRight = b.cx > a.cx;
    const x1 = toRight ? a.x + a.w : a.x;
    const x2 = toRight ? b.x : b.x + b.w;
    const k = (x2 - x1) / 2;
    const c = cubic([x1, a.cy], [x1 + k, a.cy], [x2 - k, b.cy], [x2, b.cy]);
    return { ...c, mid: [c.mid[0], a.y + a.h + 18], kind: 'across' };
  }
  const x1 = a.x + a.w;
  const x2 = b.x + b.w;
  const out = Math.min(right - 4, Math.max(x1, x2) + 40);
  return { ...cubic([x1, a.cy], [out, a.cy], [out, b.cy], [x2, b.cy]), mid: [out - 6, (a.cy + b.cy) / 2], kind: 'loop' };
}

function arrowHead([x, y], a, s = 7) {
  const bx = x - s * Math.cos(a);
  const by = y - s * Math.sin(a);
  const px = Math.sin(a) * s * 0.55;
  const py = -Math.cos(a) * s * 0.55;
  return `${x},${y} ${bx + px},${by + py} ${bx - px},${by - py}`;
}

// Everything that depends on the width: node boxes, lane and phase positions, wires.
function layout(graph, width) {
  const { nodes, edges = [], lanes = [], phases = [] } = graph;
  const narrow = width < 600;
  const backwards = edges.some((e) => {
    const a = nodes.find((n) => n.id === e.from);
    const b = nodes.find((n) => n.id === e.to);
    return a && b && b.row < a.row;
  });
  const gutter = backwards ? (narrow ? 18 : 34) : 0;
  const laneCount = Math.max(lanes.length, ...nodes.map((n) => Math.floor(n.lane) + 1));
  const laneW = (width - gutter) / laneCount;
  const nodeW = narrow ? Math.max(60, laneW - 8) : Math.min(220, laneW - 20);
  const nodeH = narrow ? 96 : 70;
  const rowH = narrow ? 128 : 114;
  const headH = lanes.some((l) => l.name) ? (narrow ? 40 : 56) : 8;
  const phaseH = 36;
  const sorted = [...phases].sort((p, q) => p.row - q.row);
  const rowTop = (row) => headH + row * rowH + sorted.filter((p) => p.row <= row).length * phaseH;

  const box = {};
  for (const n of nodes) {
    const cx = (n.lane + 0.5) * laneW;
    const y = rowTop(n.row) + 8;
    box[n.id] = { x: cx - nodeW / 2, y, w: nodeW, h: nodeH, cx, cy: y + nodeH / 2 };
  }
  // On a phone a lane is only about 75px wide, too narrow for a name like "recommendation" at a
  // readable size. Most rows hold one node, so let each node widen into the empty lanes beside it:
  // up to half way to its nearest neighbour in the same row, and never past the loop gutter.
  if (narrow) {
    const rows = {};
    for (const n of nodes) (rows[n.row] ||= []).push(n);
    for (const row of Object.values(rows)) {
      row.sort((p, q) => p.lane - q.lane);
      row.forEach((n, i) => {
        const b = box[n.id];
        const centre = (n.lane + 0.5) * laneW;
        const left = i > 0 ? ((row[i - 1].lane + 0.5) * laneW + centre) / 2 + 3 : 2;
        const right = i < row.length - 1 ? (centre + (row[i + 1].lane + 0.5) * laneW) / 2 - 3 : width - gutter - 2;
        const w = Math.max(b.w, Math.min(laneW * 1.9, right - left));
        const x = Math.min(Math.max(centre - w / 2, left), right - w);
        box[n.id] = { ...b, x, w, cx: x + w / 2 };
      });
    }
  }
  const lastRow = Math.max(...nodes.map((n) => n.row));
  const height = rowTop(lastRow) + 8 + nodeH + (narrow ? 14 : 24);
  // Wires going down the page leave from the bottom edge and arrive on the top edge. When several
  // share a node, spread their ports in the order of the node at the other end, so they fan out
  // instead of meeting in one point and hiding each other's arrowheads.
  const down = (e) => box[e.from] && box[e.to] && box[e.to].y > box[e.from].y + 1;
  const ports = (b, list, otherX) => {
    const m = new Map();
    const sorted = [...list].sort((p, q) => otherX(p) - otherX(q));
    sorted.forEach((e, i) => {
      const span = Math.min(b.w - 36, (sorted.length - 1) * 26);
      m.set(e, sorted.length < 2 ? b.cx : b.cx - span / 2 + (span * i) / (sorted.length - 1));
    });
    return m;
  };
  const startX = new Map();
  const endX = new Map();
  for (const n of nodes) {
    ports(box[n.id], edges.filter((e) => e.from === n.id && down(e)), (e) => box[e.to].cx).forEach((x, e) => startX.set(e, x));
    ports(box[n.id], edges.filter((e) => e.to === n.id && down(e)), (e) => box[e.from].cx).forEach((x, e) => endX.set(e, x));
  }
  const wires = edges.map((e) => (box[e.from] && box[e.to]
    ? route(box[e.from], box[e.to], width, startX.get(e), endX.get(e))
    : null));
  return {
    narrow,
    height,
    laneW,
    laneCount,
    headH,
    box,
    wires,
    phases: sorted.map((p) => ({ ...p, y: rowTop(p.row) - phaseH + 6 })),
  };
}

export default function DataFlow({ graph, label }) {
  const { nodes, edges = [], lanes = [], trace = true } = graph;
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = canvasRef.current;
    if (!el) return undefined;
    const measure = () => setWidth(Math.round(el.clientWidth));
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

  return (
    <div className={`${styles.graph} ${L?.narrow ? styles.narrow : ''}`} role="group" aria-label={label || 'Data flow'}>
      <div className={styles.legend} aria-hidden="true">
        {kindsUsed.map((k) => {
          const { label: kl, Icon } = KIND[k];
          return <span key={k} className={`${styles.key} ${styles[`k_${k}`]}`}><span className={styles.keyTile}><Icon width="12" height="12" /></span>{kl}</span>;
        })}
        {edges.some((e) => e.label) && <span className={styles.keyWire}><span className={styles.keyPacket}>data</span>moves along the wires</span>}
      </div>

      <div className={styles.stage}>
        <div ref={canvasRef} className={styles.canvas} style={{ height: L ? L.height : 320 }}>
          {L && (
            <>
              <svg className={styles.wires} width={width} height={L.height} aria-hidden="true">
                {lanes.length > 1 && Array.from({ length: L.laneCount - 1 }, (_, i) => (
                  <line key={i} className={styles.laneLine} x1={(i + 1) * L.laneW} x2={(i + 1) * L.laneW} y1={L.headH - 6} y2={L.height - 4} />
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

              {lanes.map((l, i) => l.name && (
                <div key={l.name} className={styles.lane} style={{ left: i * L.laneW, width: L.laneW }} aria-hidden="true">
                  <span className={styles.laneName}>{l.name}</span>
                  {l.note && !L.narrow && <span className={styles.laneNote}>{l.note}</span>}
                </div>
              ))}

              {L.phases.map((p) => (
                <div key={p.name} className={styles.phase} style={{ top: p.y }} aria-hidden="true"><span>{p.name}</span></div>
              ))}

              {!L.narrow && edges.map((e, i) => e.label && L.wires[i] && (
                <span
                  key={`l-${i}`}
                  className={`${styles.edgeLabel} ${wireState(e, i)}`}
                  style={{ left: L.wires[i].mid[0], top: L.wires[i].mid[1] }}
                  aria-hidden="true"
                >
                  {e.label}
                </span>
              ))}

              {order.map((id) => {
                const n = byId[id];
                const b = L.box[id];
                const k = KIND[n.kind] || KIND.ai;
                const isActive = id === activeId;
                const isGate = n.kind === 'gate';
                const waiting = isGate && isActive && trace && !gateOk;
                const approved = isGate && trace && visited(id) && !waiting;
                const Icon = approved ? CheckIcon : k.Icon;
                const cls = [
                  styles.node,
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
                    <span className={styles.tile} aria-hidden="true"><Icon width={L.narrow ? 13 : 15} height={L.narrow ? 13 : 15} /></span>
                    <span className={styles.nodeText}>
                      <span className={styles.name}>{n.name}</span>
                      {n.sub && <span className={styles.sub}>{n.sub}</span>}
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
