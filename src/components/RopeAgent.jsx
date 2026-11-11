import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useRoute } from '../lib/router';
import { useReducedMotion } from '../lib/hooks';
import { currentTheme } from '../lib/theme';
import { clickLines as LINES, darkLines as DARK, facts as FACTS, greeting, partLines as PART, sectionLine } from '../content/agent';
import AgentFigure from './AgentFigure';
import styles from './RopeAgent.module.css';

// A small agent on a rope in the free strip left of the content, on every page. It rappels
// down as the page scrolls, swings when the scroll changes pace, follows the pointer with its
// eyes, comments on the section beside it, and reacts to clicks on any part of its body:
//   head, one unhurried click        a fact about Mahmood
//   head, clicks under 300 ms apart  2 affection, 3-5 one hand slips, 6 falls
//   hand                             lets go and shakes it; three quick clicks and he falls
//   legs                             ticklish kicks; four quick clicks make him dizzy
//   belly                            laughs harder with each quick click, then falls laughing
// A fall ends on the wall; a click there drops him to the floor, where he is stunned, repairs
// himself, sulks, and forgives after a quiet spell. In dark mode he hides in the dark and
// jumps out with a "Boo!". On dark backgrounds his outline turns light.
// Decorative only: hidden from assistive technology. Reduced motion keeps him still and skips
// the falls.

const LEFT = 36; // how far the figure reaches either side of the rope, in drawing units,
const RIGHT = 41; // waving arm included
const GRIP = 12; // the rope ends at the hands, this far below the top of the drawing
const RAPID_MS = 300; // clicks closer than this count towards the animations
const BELLY_MS = 500; // tickles closer than this make the laugh grow
const CALM_MS = 3500; // a pause this long ends a click streak
const FORGIVE_MS = 12000;
const BOO_COOLDOWN_MS = 12000;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const EASE = {
  in: (t) => t * t,
  out: (t) => 1 - (1 - t) * (1 - t),
  inOut: (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
};
const TWEENED = ['fy', 'fx', 'ry', 'tilt'];

// The free strip left of the content column, worked out the same way as `.container`.
function laneWidth() {
  const w = document.documentElement.clientWidth;
  const container = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--container')) || 1240;
  return Math.max(clamp(w * 0.03, 20, 40), (w - container) / 2);
}

// The innermost page section at a given height, and the first line the agent has for it,
// walking outwards until one matches.
function sectionAt(y, path) {
  const hits = [...document.querySelectorAll('main section, main header, main article, section[aria-labelledby], footer')]
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.top <= y && r.bottom >= y)
    .sort((a, b) => a.r.height - b.r.height);
  for (const { el } of hits) {
    const tag = el.tagName;
    const key = el.getAttribute('aria-labelledby') || (tag === 'HEADER' || tag === 'ARTICLE' ? 'header' : tag === 'FOOTER' ? 'footer' : '');
    const heading = el.querySelector('h1, h2, h3')?.textContent || '';
    const line = sectionLine(path, key, heading);
    if (line) return { id: key || heading, line };
  }
  return hits.length ? { id: hits[0].el.getAttribute('aria-labelledby') || 'none', line: null } : null;
}

// Whether the page behind a point is dark: the first opaque background up the tree.
function darkBehind(x, y, root) {
  const el = document.elementsFromPoint(x, y).find((e) => !root.contains(e));
  for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
    const m = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
    if (m && (m.length < 4 || Number(m[3]) > 0.5)) {
      const [r, g, b] = m.map(Number);
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.45;
    }
  }
  return currentTheme() === 'dark';
}

// Speech is typed out at a talking pace, then held long enough to read: longer lines stay up
// longer, and very long lines type faster so they never drag.
function speechTiming(text, instant) {
  const chars = text.length;
  const typeMs = instant ? 0 : Math.min(30, 1100 / Math.max(chars, 1));
  const reveal = typeMs * chars;
  const hold = clamp(900 + chars * 50, 1400, 4200);
  return { typeMs, reveal, total: reveal + hold };
}

const Bubble = memo(function Bubble({ text, typeMs }) {
  const [shown, setShown] = useState(typeMs ? 0 : text.length);
  useEffect(() => {
    if (!typeMs) return undefined;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= text.length) clearInterval(id);
    }, typeMs);
    return () => clearInterval(id);
  }, [text, typeMs]);
  return (
    <p className={styles.bubble}>
      <span className={styles.ghost}>{text}</span>
      <span className={styles.typed}>{text.slice(0, shown)}</span>
    </p>
  );
});

export default function RopeAgent() {
  const { path } = useRoute();
  const reduced = useReducedMotion();
  const rootRef = useRef(null);
  const refs = { figure: useRef(null), swing: useRef(null), eyes: useRef(null), screen: useRef(null) };
  const p = useRef({ fy: -170, vy: 0, fx: 0, ry: -160, tilt: 0, th: 0, w: 0, slip: 0, s: 1, x: 40, queue: [], step: null, nextT0: null }).current;
  const engine = useRef({ run: () => {}, kick: () => {}, hangTarget: () => 0, backdrop: () => {} });
  const stage = useRef('hang');
  const clicks = useRef(0); // escalation level from quick head clicks
  const tap = useRef({ last: 0, part: null, streak: 0 }).current;
  const belly = useRef({ last: 0, level: 0 }).current;
  const order = useRef(FACTS.map((_, i) => i).sort(() => Math.random() - 0.5)).current;
  const factAt = useRef(0);
  const sulkLine = useRef(0);
  const legDir = useRef(1);
  const booAt = useRef(0);
  const idleBoo = useRef(false);
  const hoverRef = useRef(false);
  const ctaRef = useRef(false);
  const moodRef = useRef('hello');
  const bubbleRef = useRef(null);
  const quietUntil = useRef(0);
  const speechId = useRef(0);
  const shownRef = useRef(false);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const timers = useRef({}).current;
  const [mood, setMoodState] = useState('hello');
  const [pose, setPose] = useState('grip');
  const [flags, setFlags] = useState({});
  const [bubble, setBubbleState] = useState(null);
  const [blink, setBlink] = useState(false);
  const [shown, setShown] = useState(false);

  const flag = useCallback((k, v) => setFlags((f) => (f[k] === v ? f : { ...f, [k]: v })), []);
  const setMood = useCallback((m) => {
    moodRef.current = m;
    setMoodState(m);
  }, []);
  const setStage = (s) => { stage.current = s; };
  // The resting face for wherever he is.
  const rest = useCallback(() => {
    if (stage.current === 'sulking') return setMood('grumpy');
    if (stage.current !== 'hang') return undefined;
    if (clicks.current >= 3) return setMood('stressed');
    return setMood(hoverRef.current ? 'happy' : ctaRef.current ? 'starry' : 'idle');
  }, [setMood]);
  // A mood for a moment, then back to resting.
  const feel = useCallback((m, ms) => {
    clearTimeout(timers.mood);
    if (moodRef.current !== m) setMood(m);
    if (ms) timers.mood = setTimeout(rest, ms);
  }, [rest, setMood, timers]);
  const say = useCallback((text, opts = {}) => {
    const { typeMs, reveal, total } = speechTiming(text, opts.instant || reducedRef.current);
    clearTimeout(timers.bubble);
    clearTimeout(timers.talk);
    speechId.current += 1;
    bubbleRef.current = text;
    setBubbleState({ text, typeMs, id: speechId.current });
    flag('talking', true);
    timers.talk = setTimeout(() => flag('talking', false), Math.max(300, reveal));
    timers.bubble = setTimeout(() => {
      bubbleRef.current = null;
      quietUntil.current = Date.now() + 2500;
      setBubbleState(null);
    }, opts.ms ?? total);
  }, [flag, timers]);

  // Size and place him in the free strip; hide him when there is no room.
  useEffect(() => {
    const root = rootRef.current;
    const place = () => {
      const lane = laneWidth();
      const s = clamp((lane - 5) / (LEFT + RIGHT), 0, 1.15);
      const x = clamp(lane / 2, 2 + LEFT * s, lane - 3 - RIGHT * s);
      p.s = s;
      p.x = x;
      root.style.setProperty('--x', `${x}px`);
      root.style.setProperty('--s', s.toFixed(3));
      shownRef.current = s >= 0.6;
      setShown(s >= 0.6);
      engine.current.kick();
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [p]);

  // Motion: a spring toward a rope length set by scroll position while he hangs, a pendulum
  // pushed by changes in scroll speed, and a queue of timed steps for the falls and returns.
  // Runs only while something moves.
  useEffect(() => {
    const root = rootRef.current;
    let raf = 0;
    let running = false;
    let lastY = window.scrollY;
    let lastV = 0;
    let lastCheck = 0;

    const hangTarget = () => {
      const vh = window.innerHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      const progress = clamp(window.scrollY / max, 0, 1);
      return reduced ? vh * 0.34 : vh * (0.24 + progress * 0.36);
    };
    // Light outline over dark bands and in dark mode, so every part stays visible.
    const backdrop = () => {
      if (!shownRef.current) return;
      root.classList.toggle(styles.onDark, darkBehind(p.x + p.fx, p.fy + 45 * p.s, root));
    };
    const draw = (now) => {
      const low = ['stunned', 'sulking', 'returning'].includes(stage.current);
      root.style.setProperty('--fy', `${p.fy.toFixed(1)}px`);
      root.style.setProperty('--ry', `${Math.max(0, p.ry).toFixed(1)}px`);
      root.style.setProperty('--fx', `${p.fx.toFixed(1)}px`);
      root.style.setProperty('--tilt', `${p.tilt.toFixed(1)}deg`);
      root.style.setProperty('--by', `${(low ? p.fy - 34 : p.fy + 22 * p.s).toFixed(1)}px`);
      if (refs.swing.current) refs.swing.current.style.transform = `rotate(${p.th.toFixed(2)}deg)`;
      if (now - lastCheck > 160) {
        lastCheck = now;
        backdrop();
      }
    };
    // Steps start where the previous one ended, so a slow frame rate never stretches a sequence.
    const step = (now) => {
      for (let guard = 0; guard < 12; guard += 1) {
        if (!p.step) {
          if (!p.queue.length) return;
          const st = p.queue.shift();
          st.t0 = p.nextT0 ?? now;
          st.from = {};
          st.target = {};
          for (const k of TWEENED) {
            if (st.to && k in st.to) {
              st.from[k] = p[k];
              st.target[k] = typeof st.to[k] === 'function' ? st.to[k]() : st.to[k];
            }
          }
          st.start?.();
          p.step = st;
        }
        const st = p.step;
        const t = st.ms ? clamp((now - st.t0) / st.ms, 0, 1) : 1;
        const e = (EASE[st.ease] || EASE.inOut)(t);
        for (const k of Object.keys(st.target)) p[k] = st.from[k] + (st.target[k] - st.from[k]) * e;
        if (t < 1) return;
        p.step = null;
        p.nextT0 = st.t0 + st.ms;
      }
    };
    const frame = (now) => {
      const sy = window.scrollY;
      const v = sy - lastY;
      const dv = v - lastV;
      lastY = sy;
      lastV = v;
      let busy = false;
      if (p.queue.length || p.step) {
        step(now);
        busy = true;
      } else if (stage.current === 'hang') {
        const goal = hangTarget() + p.slip;
        if (reduced) p.fy = goal;
        else {
          p.vy = (p.vy + (goal - p.fy) * 0.07) * 0.8;
          p.fy += p.vy;
          p.w += clamp(dv, -40, 40) * 0.1;
          if (Math.abs(v) > 24 && !hoverRef.current && clicks.current < 3) feel(v > 0 ? 'whee' : 'whoa', 800);
        }
        p.ry = p.fy + GRIP * p.s;
        busy = Math.abs(p.vy) > 0.04 || Math.abs(goal - p.fy) > 0.4 || v !== 0;
      }
      const swingy = stage.current === 'hang' || stage.current === 'regrab' || stage.current === 'boo';
      p.w = (p.w - p.th * (swingy ? 0.035 : 0.08)) * (swingy ? 0.93 : 0.8);
      p.th = reduced ? 0 : clamp(p.th + p.w, -26, 26);
      draw(now);
      if (busy || Math.abs(p.w) > 0.01 || Math.abs(p.th) > 0.05) raf = requestAnimationFrame(frame);
      else {
        running = false;
        backdrop();
      }
    };
    const kick = () => {
      if (running) return;
      running = true;
      lastY = window.scrollY;
      lastV = 0;
      raf = requestAnimationFrame(frame);
    };
    const run = (steps) => {
      p.queue = steps;
      p.step = null;
      p.nextT0 = null;
      kick();
    };
    engine.current = { run, kick, hangTarget, backdrop };
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    };
    // refs.swing is stable; listing the ref object would rerun this on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, feel, p]);

  // Where the wall and the floor are, in the figure's own offsets.
  const wallFx = () => 2 - p.x + 39 * p.s;
  const floorFy = (standing) => window.innerHeight - 4 - (standing ? 103 : 98) * p.s;
  const stopFidgets = () => {
    ['fact', 'calm', 'hand', 'kick', 'belly'].forEach((k) => clearTimeout(timers[k]));
    flag('shake', false);
    flag('laughing', false);
    flag('kick', false);
  };

  // Dark mode: he hides in the dark, all but his eyes, then jumps out.
  const boo = (intro) => {
    if (stage.current !== 'hang' || clicks.current) return;
    booAt.current = Date.now();
    const steps = [];
    if (intro) steps.push({ ms: 1700, start: () => { setStage('boo'); feel('whoa'); say(DARK.lightsOut); } });
    steps.push(
      { ms: 1200, start: () => { setStage('boo'); setMood('idle'); flag('lurk', true); } },
      { ms: 1300, start: () => { flag('lurk', false); flag('pop', true); setPose('boo'); setMood('spooky'); say(DARK.boo, { instant: true, ms: 1300 }); p.w += 2.5; } },
      { ms: 0, start: () => { flag('pop', false); setPose('grip'); setStage('hang'); feel('happy', 2200); say(DARK.gotYou); } },
    );
    engine.current.run(steps);
  };

  // Arrival: drop in, then wave hello, or in the dark, a "Boo!".
  useEffect(() => {
    const t1 = setTimeout(() => {
      if (currentTheme() === 'dark') boo(false);
      else say(greeting);
    }, reduced ? 200 : 1300);
    const t2 = setTimeout(() => currentTheme() !== 'dark' && rest(), reduced ? 2800 : 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      Object.values(timers).forEach(clearTimeout);
    };
    // Runs once, on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Switching themes: lights out and a scare, or a squint at the brightness.
  useEffect(() => {
    const onTheme = (e) => {
      engine.current.backdrop();
      if (stage.current !== 'hang' || clicks.current) return;
      if (e.detail === 'dark') boo(true);
      else {
        feel('squint', 1900);
        say(DARK.bright);
      }
    };
    window.addEventListener('themechange', onTheme);
    return () => window.removeEventListener('themechange', onTheme);
  });

  // Eyes follow the pointer; stars over buttons; after a quiet spell, a nap (or in the dark,
  // every other time, a scare).
  useEffect(() => {
    let raf = 0;
    let px = 0;
    let py = 0;
    const look = () => {
      raf = 0;
      const eyes = refs.eyes.current;
      const screen = refs.screen.current;
      if (!eyes || !screen) return;
      const r = screen.getBoundingClientRect();
      const dx = px - (r.left + r.width / 2);
      const dy = py - (r.top + r.height / 2);
      const f = Math.min(1, Math.hypot(dx, dy) / 240);
      const a = Math.atan2(dy, dx);
      eyes.style.transform = `translate(${(Math.cos(a) * 3 * f).toFixed(2)}px, ${(Math.sin(a) * 2.4 * f).toFixed(2)}px)`;
    };
    const wake = () => {
      clearTimeout(timers.idle);
      if (moodRef.current === 'sleepy') feel('whoa', 700);
      timers.idle = setTimeout(() => {
        if (stage.current !== 'hang' || clicks.current || hoverRef.current || ctaRef.current) return;
        idleBoo.current = !idleBoo.current;
        if (currentTheme() === 'dark' && idleBoo.current) boo(false);
        else feel('sleepy');
      }, 15000);
    };
    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf && !reduced) raf = requestAnimationFrame(look);
      wake();
    };
    const onOver = (e) => {
      const over = Boolean(e.target.closest?.('.btn, [class*="btn-"]'));
      if (over === ctaRef.current) return;
      ctaRef.current = over;
      if (stage.current !== 'hang' || clicks.current || hoverRef.current) return;
      if (over) feel('starry');
      else if (moodRef.current === 'starry') rest();
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('keydown', wake);
    document.addEventListener('pointerover', onOver);
    wake();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', wake);
      window.removeEventListener('keydown', wake);
      document.removeEventListener('pointerover', onOver);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, feel, rest, timers]);

  // Blink now and then while resting.
  useEffect(() => {
    if (reduced || mood !== 'idle') return undefined;
    let t;
    const next = () => {
      t = setTimeout(() => {
        setBlink(true);
        t = setTimeout(() => {
          setBlink(false);
          next();
        }, 140);
      }, 2400 + Math.random() * 3200);
    };
    next();
    return () => clearTimeout(t);
  }, [mood, reduced]);

  // Something relevant about the section beside him, once per section per page visit, when the
  // scroll settles. Never while he is busy, being clicked or already talking, and never within
  // a couple of seconds of his last line.
  useEffect(() => {
    const spoken = new Set();
    let settle;
    let last = 0;
    const check = () => {
      if (!shownRef.current || stage.current !== 'hang' || clicks.current || hoverRef.current || bubbleRef.current) return;
      if (Date.now() - last < 5000 || Date.now() < quietUntil.current) return;
      const found = sectionAt(p.fy + 45 * p.s, path);
      if (!found || spoken.has(found.id)) return;
      spoken.add(found.id);
      if (!found.line) return;
      last = Date.now();
      say(found.line);
    };
    const onScroll = () => {
      clearTimeout(settle);
      settle = setTimeout(check, 900);
    };
    // Once on arrival, and again after the first greeting has cleared.
    const arrive = setTimeout(check, 1600);
    const again = setTimeout(check, 5200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(settle);
      clearTimeout(arrive);
      clearTimeout(again);
      window.removeEventListener('scroll', onScroll);
    };
  }, [path, p, say]);

  const calm = () => {
    if (clicks.current >= 3) {
      p.slip = 0;
      setPose('grip');
      flag('shake', false);
      flag('climbing', true);
      setTimeout(() => flag('climbing', false), 900);
      clicks.current = 0;
      feel('relieved', 1800);
      say(LINES.phew);
      engine.current.kick();
    }
    clicks.current = 0;
  };

  const fall = (line = LINES.fall, face = 'whoa') => {
    stopFidgets();
    clicks.current = 0;
    p.slip = 0;
    const top = p.fy;
    engine.current.run([
      { to: { fy: top + 150, ry: p.ry + 120 }, ms: 520, ease: 'in', start: () => { setStage('falling'); setPose('fall'); feel(face); say(line, { ms: 1400 }); } },
      { to: { fx: wallFx }, ms: 260, ease: 'out', start: () => { setPose('wall'); setStage('wall'); feel('whoa'); say(LINES.wall); } },
      { ms: 1300, start: () => feel('determined') },
      { to: { fy: top + 112 }, ms: 1000, start: () => { setStage('wallclimb'); flag('climbing', true); } },
      { to: { fx: 0 }, ms: 340, ease: 'out', start: () => { setStage('regrab'); flag('climbing', false); setPose('grip'); say(LINES.regrab); p.w += 2; } },
      { to: { fy: () => engine.current.hangTarget(), ry: () => engine.current.hangTarget() + GRIP * p.s }, ms: 1400, start: () => flag('climbing', true) },
      { ms: 0, start: () => { flag('climbing', false); setStage('hang'); feel('relieved', 2000); say(LINES.back); } },
    ]);
  };

  const forgive = () => {
    engine.current.run([
      { ms: 1700, start: () => { setStage('returning'); flag('away', false); feel('relieved'); say(LINES.forgive); } },
      { to: { fy: () => floorFy(true), tilt: 0 }, ms: 220, ease: 'out', start: () => { setPose('stand'); setMood('idle'); } },
      { to: { fx: 0 }, ms: Math.abs(p.fx) * 7 + 400, start: () => flag('walking', true) },
      { to: { ry: () => p.fy + GRIP * p.s }, ms: 900, start: () => flag('walking', false) },
      { ms: 260, start: () => { setPose('grip'); setMood('happy'); } },
      { to: { fy: () => engine.current.hangTarget(), ry: () => engine.current.hangTarget() + GRIP * p.s }, ms: 1500 },
      { ms: 0, start: () => { flag('bandaid', false); setStage('hang'); feel('happy', 1600); say(LINES.home); } },
    ]);
  };

  const drop = () => {
    const floor = floorFy(false);
    const ms = Math.round(clamp(Math.sqrt(Math.max(0, floor - p.fy)) * 30, 300, 750));
    engine.current.run([
      { to: { fy: floor }, ms, ease: 'in', start: () => { setStage('dropping'); flag('climbing', false); setPose('fall'); feel('whoa'); say(LINES.drop, { ms: 1200 }); } },
      { to: { fy: floor - 12, tilt: 14 }, ms: 130, ease: 'out', start: () => { setStage('stunned'); setPose('slump'); setMood('dizzy'); flag('broken', true); } },
      { to: { fy: floor }, ms: 150, ease: 'in' },
      { ms: 2000 },
      { ms: 1700, start: () => { flag('broken', false); setMood('healing'); say(LINES.repair); } },
      { to: { tilt: 0 }, ms: 320, ease: 'out', start: () => { setPose('sit'); flag('bandaid', true); } },
      { ms: 0, start: () => { setStage('sulking'); setMood('grumpy'); say(LINES.sulk); timers.forgive = setTimeout(forgive, FORGIVE_MS); } },
    ]);
  };

  // Quick head clicks: affection, then slipping, then a fall.
  const escalate = (streak) => {
    const level = clicks.current >= 3 ? clicks.current + 1 : streak;
    clicks.current = level;
    clearTimeout(timers.calm);
    if (level === 2) {
      feel('love', 1800);
      say(pick(LINES.second));
      p.vy -= 6;
      p.w += 1.6;
    } else if (level <= 5 || reduced) {
      setPose('oneHand');
      feel('stressed');
      say(level <= 5 ? LINES.slipping[level - 3] : LINES.calm);
      if (!reduced) {
        p.slip += 16;
        p.w -= 2.4;
        flag('shake', true);
      }
    } else {
      fall();
      return;
    }
    engine.current.kick();
    timers.calm = setTimeout(calm, CALM_MS);
  };

  const sayFact = () => {
    if (stage.current !== 'hang' || clicks.current) return;
    feel('happy', 2400);
    say(FACTS[order[factAt.current % order.length]]);
    factAt.current += 1;
    p.vy -= 3;
    engine.current.kick();
  };

  const headClick = (streak) => {
    clearTimeout(timers.fact);
    if (streak > 1) {
      escalate(streak);
      return;
    }
    if (clicks.current >= 3) {
      say(PART.busy);
      return;
    }
    // Wait a beat: a second quick click turns this into an animation instead.
    timers.fact = setTimeout(sayFact, RAPID_MS);
  };

  const handClick = (side, streak) => {
    clearTimeout(timers.fact);
    clearTimeout(timers.hand);
    if (!reduced && (streak >= 3 || clicks.current >= 3)) {
      fall(PART.handDrop);
      return;
    }
    setPose(side === 'L' ? 'releaseL' : 'releaseR');
    feel('wince', 1000);
    say(pick(PART.hand));
    p.w += side === 'L' ? 2.2 : -2.2;
    engine.current.kick();
    timers.hand = setTimeout(() => {
      if (stage.current === 'hang' && clicks.current < 3) setPose('grip');
    }, 850);
  };

  const legClick = (streak) => {
    clearTimeout(timers.fact);
    clearTimeout(timers.kick);
    legDir.current *= -1;
    if (streak >= 4) {
      p.w += 7 * legDir.current;
      feel('dizzy', 1900);
      say(PART.legSpin);
    } else {
      p.w += 3 * legDir.current;
      feel('laugh', 1300);
      say(pick(PART.leg));
    }
    flag('kick', true);
    timers.kick = setTimeout(() => flag('kick', false), 700);
    engine.current.kick();
  };

  const bellyClick = (now) => {
    clearTimeout(timers.fact);
    clearTimeout(timers.belly);
    belly.level = now - belly.last < BELLY_MS ? belly.level + 1 : 1;
    belly.last = now;
    if (belly.level >= 4 && !reduced) {
      belly.level = 0;
      fall(PART.bellyFall, 'laugh');
      return;
    }
    flag('laughing', true);
    feel('laugh');
    say(PART.belly[Math.min(belly.level, 3) - 1]);
    if (belly.level >= 3 && !reduced) {
      setPose('oneHand');
      clicks.current = Math.max(clicks.current, 3);
      p.slip += 12;
    }
    engine.current.kick();
    timers.belly = setTimeout(() => {
      flag('laughing', false);
      belly.level = 0;
      if (clicks.current >= 3) calm();
      else rest();
    }, 1600);
  };

  const onPart = (part, side) => {
    const now = performance.now();
    tap.streak = now - tap.last < RAPID_MS && tap.part === part ? tap.streak + 1 : 1;
    tap.last = now;
    tap.part = part;
    const st = stage.current;
    if (st === 'wall' || st === 'wallclimb') {
      drop();
      return;
    }
    if (st === 'sulking') {
      clearTimeout(timers.forgive);
      timers.forgive = setTimeout(forgive, FORGIVE_MS);
      say(LINES.sulking[sulkLine.current % LINES.sulking.length]);
      sulkLine.current += 1;
      return;
    }
    if (st !== 'hang') return;
    if (part === 'head') headClick(tap.streak);
    else if (part === 'hand') handClick(side, tap.streak);
    else if (part === 'leg') legClick(tap.streak);
    else bellyClick(now);
  };

  const onEnter = () => {
    hoverRef.current = true;
    if (stage.current === 'sulking') flag('away', true);
    else if (stage.current === 'hang' && clicks.current < 3) {
      if (currentTheme() === 'dark' && Date.now() - booAt.current > BOO_COOLDOWN_MS) boo(false);
      else feel('happy');
    }
  };
  const onLeave = () => {
    hoverRef.current = false;
    flag('away', false);
    if (stage.current === 'hang' && clicks.current < 3) rest();
  };

  return (
    <div ref={rootRef} className={`${styles.root} ${shown ? '' : styles.hidden} ${reduced ? '' : styles.motion}`} aria-hidden="true">
      <span className={styles.rope} />
      <AgentFigure pose={pose} mood={mood} blink={blink} flags={flags} refs={refs} onPart={onPart} onEnter={onEnter} onLeave={onLeave} />
      {bubble && <Bubble key={bubble.id} text={bubble.text} typeMs={bubble.typeMs} />}
    </div>
  );
}
