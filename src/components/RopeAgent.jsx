import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useRoute } from '../lib/router';
import { useReducedMotion } from '../lib/hooks';
import { currentTheme } from '../lib/theme';
import { clickLines as LINES, darkLines as DARK, facts as FACTS, greeting, partLines as PART, roamLines as ROAM, sectionLine } from '../content/agent';
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
//
// Left alone (no pointer movement, scrolling or typing for a few seconds) he takes a break: he
// swings onto the wall, climbs down hand over hand and plays along the bottom of the screen. His
// games act out Mahmood's work: leading a line of mini AI agents, putting up a now-next-later
// roadmap, sketching a wireframe, clapping a clapperboard for the promo films, reading the Claude
// handbook, raising the hackathon trophy. In between he strolls, hops, dances, sits, naps, climbs
// a wall to look around, or walks off one side of the screen and back in from the other. A fast swipe of the
// pointer at him makes him dodge; a slow approach gets a wave; a click sends him back up his rope.
// Scrolling means someone is reading, so he steps aside into a side lane until it stops. After a
// few activities he climbs back up on his own. He keeps doing whatever he was doing across page
// changes, and across reloads in the same tab.
// Decorative only: hidden from assistive technology. Reduced motion keeps him still on his rope
// and skips the falls and the roaming.

const LEFT = 36; // how far the figure reaches either side of the rope, in drawing units,
const RIGHT = 41; // waving arm included
const GRIP = 12; // the rope ends at the hands, this far below the top of the drawing
const RAPID_MS = 300; // clicks closer than this count towards the animations
const BELLY_MS = 500; // tickles closer than this make the laugh grow
const CALM_MS = 3500; // a pause this long ends a click streak
const FORGIVE_MS = 12000;
const BOO_COOLDOWN_MS = 12000;
const ROAM_IDLE_MS = 3000; // left alone this long, he climbs down to play
const ROAM_REST_MS = 25000; // after climbing back, he stays on the rope at least this long
const ROAM_KEY = 'ropeAgent'; // where his whereabouts are kept for the tab, across reloads
const FLOOR = ['descend', 'roam', 'homing']; // stages spent off the rope, down at the bottom

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const EASE = {
  in: (t) => t * t,
  out: (t) => 1 - (1 - t) * (1 - t),
  inOut: (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
};
const TWEENED = ['fy', 'fx', 'ry', 'tilt'];

// The free strip left of the content column: where the first `.container`'s content starts.
// (The container width is a CSS calculation on wide screens, so measure it rather than parse it.)
function laneWidth() {
  const c = document.querySelector('.container');
  if (!c) return 0;
  return c.getBoundingClientRect().left + parseFloat(getComputedStyle(c).paddingLeft);
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
  // fy, fx: the figure's top and its offset from the rope; ry: the rope's length; face: 1 facing
  // right, -1 left.
  const p = useRef({ fy: -170, vy: 0, fx: 0, ry: -160, tilt: 0, th: 0, w: 0, slip: 0, s: 1, x: 40, face: 1, queue: [], step: null, nextT0: null }).current;
  // The break: how many activities are left, the last one, whether he is waiting in a side lane,
  // when he may next climb down, the last fast swipe he dodged, and the pointer's last position.
  const roam = useRef({ left: 0, last: '', aside: false, restUntil: 0, dodgeAt: 0, px: -1, py: -1, pt: 0, movedAt: Date.now() }).current;
  const roamApi = useRef({});
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
  const [notes, setNotes] = useState([]); // roadmap sticky notes on the floor games
  const [sketch, setSketch] = useState(null); // the wireframe he sketches

  const flag = useCallback((k, v) => setFlags((f) => (f[k] === v ? f : { ...f, [k]: v })), []);
  const setMood = useCallback((m) => {
    moodRef.current = m;
    setMoodState(m);
  }, []);
  const setStage = (s) => { stage.current = s; };
  // The resting face for wherever he is.
  const rest = useCallback(() => {
    if (stage.current === 'sulking') return setMood('grumpy');
    if (FLOOR.includes(stage.current)) return setMood(hoverRef.current ? 'happy' : 'idle');
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
      p.vw = document.documentElement.clientWidth;
      root.style.setProperty('--x', `${x}px`);
      root.style.setProperty('--s', s.toFixed(3));
      shownRef.current = s >= 0.6;
      setShown(s >= 0.6);
      roamApi.current.fit?.();
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
      const low = ['stunned', 'sulking', 'returning', ...FLOOR].includes(stage.current);
      root.style.setProperty('--fy', `${p.fy.toFixed(1)}px`);
      root.style.setProperty('--ry', `${Math.max(0, p.ry).toFixed(1)}px`);
      root.style.setProperty('--fx', `${p.fx.toFixed(1)}px`);
      root.style.setProperty('--tilt', `${p.tilt.toFixed(1)}deg`);
      root.style.setProperty('--by', `${(low ? p.fy - 34 : p.fy + 22 * p.s).toFixed(1)}px`);
      // The bubble sits to his right, or to his left when the screen's edge is near.
      const flip = (p.vw || window.innerWidth) - (p.x - 40 * p.s + p.fx + 84 * p.s) < 252;
      root.classList.toggle(styles.flipBubble, flip);
      root.style.setProperty('--bl', `${(flip ? p.fx - 248 : p.fx + 82 * p.s + 6).toFixed(1)}px`);
      // Where his games' props go: the middle of his body, and the bottom of the window.
      root.style.setProperty('--cx', `${(42 * p.s + p.fx).toFixed(1)}px`);
      root.style.setProperty('--floor', `${window.innerHeight}px`);
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

  // Arrival: drop in, then wave hello, or in the dark, a "Boo!". If he was on a break when the
  // page last loaded in this tab, he carries on from the floor instead.
  useEffect(() => {
    let saved = null;
    try { saved = JSON.parse(sessionStorage.getItem(ROAM_KEY) || 'null'); } catch { saved = null; }
    if (saved?.stage === 'roam' && Date.now() - saved.t < 30 * 60000 && !reduced && shownRef.current) {
      roamApi.current.restore(saved);
      return () => Object.values(timers).forEach(clearTimeout);
    }
    const t1 = setTimeout(() => {
      if (currentTheme() === 'dark') boo(false);
      else say(greeting);
    }, reduced ? 200 : 1300);
    const t2 = setTimeout(() => currentTheme() !== 'dark' && rest(), reduced ? 2800 : 3800);
    const t3 = setTimeout(() => roamApi.current.idle(), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      Object.values(timers).forEach(clearTimeout);
    };
    // Runs once, on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // His break goes on across pages. A page change scrolls to the top, which is not someone
  // reading, so it doesn't send him aside; he has a look at the new page instead.
  const firstPath = useRef(true);
  useEffect(() => {
    if (firstPath.current) { firstPath.current = false; return undefined; }
    roam.navAt = Date.now();
    if (stage.current !== 'roam' || roam.aside) return undefined;
    const t = setTimeout(() => { if (!bubbleRef.current) say(pick(ROAM.newPage)); }, 900);
    return () => clearTimeout(t);
  }, [path, roam, say]);

  // What sets the break off and what interrupts it: idle time, scrolling, a swipe at him.
  useEffect(() => {
    const onMove = (e) => {
      const now = performance.now();
      const v = roam.px < 0 ? 0 : Math.hypot(e.clientX - roam.px, e.clientY - roam.py) / Math.max(1, now - roam.pt);
      roam.px = e.clientX;
      roam.py = e.clientY;
      roam.pt = now;
      roam.movedAt = Date.now();
      roamApi.current.onPointer(e.clientX, e.clientY, v);
      roamApi.current.idle();
    };
    const onScroll = () => {
      roamApi.current.onScroll();
      roamApi.current.idle();
    };
    const onKey = () => roamApi.current.idle();
    const onHide = () => roamApi.current.save();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('pagehide', onHide);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pagehide', onHide);
    };
  }, [roam]);

  // Switching themes: lights out and a scare, or a squint at the brightness.
  useEffect(() => {
    const onTheme = (e) => {
      engine.current.backdrop();
      if (FLOOR.includes(stage.current)) {
        feel(e.detail === 'dark' ? 'whoa' : 'squint', 1200);
        return;
      }
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

  // ── The break: down the wall, along the bottom of the screen, and back up his rope ──
  const vw = () => p.vw || document.documentElement.clientWidth;
  const rightWallFx = () => vw() - 2 - p.x - 42 * p.s;
  const sideWallL = () => 2 - p.x + 32 * p.s; // facing left, hands on the left wall
  const sideWallR = () => vw() - 2 - p.x - 36 * p.s; // facing right, hands on the right wall
  const floorMin = () => wallFx() + 34 * p.s;
  const floorMax = () => rightWallFx() - 34 * p.s;
  const standFy = () => floorFy(true);
  const sitFy = () => floorFy(false);
  const centreX = () => p.x - 40 * p.s + p.fx + 42 * p.s;
  const setFace = (f) => {
    p.face = f;
    rootRef.current?.style.setProperty('--face', String(f));
  };
  const save = () => {
    try {
      sessionStorage.setItem(ROAM_KEY, JSON.stringify({ stage: FLOOR.includes(stage.current) ? 'roam' : 'hang', fx: p.fx, t: Date.now() }));
    } catch { /* no storage: next time he simply starts on his rope */ }
  };

  const putNote = (label) => {
    const x = 42 * p.s + p.fx + p.face * 40 * p.s - 21 * p.s;
    setNotes((list) => [...list, { label, x, y: p.fy - 16 * p.s }]); // just above his head, so he never covers one
  };
  const putSketch = () => {
    const w = 76 * p.s;
    const cx = 42 * p.s + p.fx;
    setSketch({ x: p.face > 0 ? cx + 34 * p.s : cx - 34 * p.s - w, y: p.fy + 6 * p.s });
  };
  // Clear away whatever game was under way.
  const tidy = () => {
    ['walking', 'kick', 'climbing', 'side', 'crew', 'crewHop', 'clapper', 'clap', 'trophy', 'reach', 'book'].forEach((k) => flag(k, false));
    setNotes([]);
    setSketch(null);
  };

  // One activity's steps, walking on from wherever the previous step leaves him.
  const plan = () => {
    const steps = [];
    let at = p.fx;
    const wait = (ms, start) => steps.push({ ms, start });
    const walk = (to, msPerPx = 11, free = false) => {
      const target = free ? to : clamp(to, floorMin(), floorMax());
      const from = at;
      if (Math.abs(target - from) < 4) return;
      steps.push({ to: { fx: target }, ms: Math.round(Math.abs(target - from) * msPerPx + 160), start: () => { setFace(target >= from ? 1 : -1); setPose('stand'); flag('side', true); flag('walking', true); } });
      steps.push({ ms: 0, start: () => { flag('walking', false); flag('side', false); } });
      at = target;
    };
    return { steps, wait, walk, at: () => at, moveTo: (v) => { at = v; } };
  };

  const ACTIVITIES = {
    stroll(pl) {
      // A short wander, 180 to 520 px, towards the side with more room.
      const mid = (floorMin() + floorMax()) / 2;
      const dir = pl.at() < mid ? 1 : -1;
      pl.walk(pl.at() + dir * (180 + Math.random() * 340));
      pl.wait(700, () => { rest(); if (Math.random() < 0.4) say(pick(ROAM.stroll)); });
      pl.wait(1300);
    },
    // Directing AI agents: three mini agents follow him across the floor.
    crew(pl) {
      const dir = pl.at() < (floorMin() + floorMax()) / 2 ? 1 : -1;
      pl.wait(600, () => { setFace(dir); setPose('stand'); flag('crew', true); feel('happy'); say(pick(ROAM.crew)); });
      pl.walk(pl.at() + dir * (260 + Math.random() * 160), 13);
      pl.wait(1100, rest);
      pl.wait(700, () => { flag('crewHop', true); say(pick(ROAM.crewDone)); });
      pl.wait(1400, () => flag('crewHop', false));
      pl.wait(400, () => flag('crew', false));
      pl.wait(500);
    },
    // Roadmapping: three sticky notes, now, next and later, one step apart. They always read
    // left to right, so he works rightwards, first stepping left if the edge is too close.
    roadmap(pl) {
      const dir = 1;
      if (pl.at() + 170 * p.s > floorMax()) pl.walk(pl.at() - 260);
      pl.wait(700, () => { setFace(dir); setPose('stand'); feel('determined'); say(ROAM.roadmap); });
      ['Now', 'Next', 'Later'].forEach((label, i) => {
        if (i) pl.walk(pl.at() + dir * 50 * p.s, 14);
        pl.wait(420, () => { flag('reach', true); putNote(label); });
        pl.wait(260, () => flag('reach', false));
      });
      pl.wait(1600, () => { rest(); say(pick(ROAM.roadmapDone)); });
      pl.wait(1400, () => setNotes([]));
      pl.wait(500);
    },
    // Design first: he sketches a wireframe before anything gets built.
    sketch(pl) {
      const dir = pl.at() < (floorMin() + floorMax()) / 2 ? 1 : -1;
      pl.wait(400, () => { setFace(dir); setPose('stand'); flag('reach', true); feel('determined'); putSketch(); say(pick(ROAM.sketch)); });
      pl.wait(2500, () => { flag('reach', false); feel('happy', 1400); });
      pl.wait(1200, () => setSketch(null));
      pl.wait(500);
    },
    // The promo films: a clapperboard, "Action!", and a slow tracking shot.
    film(pl) {
      pl.wait(900, () => { setPose('stand'); flag('clapper', true); feel('happy'); say(ROAM.film); });
      pl.wait(700, () => flag('clap', true));
      pl.wait(500, () => { say(ROAM.action, { ms: 1100 }); feel('whee', 900); });
      pl.wait(200, () => { flag('clapper', false); flag('clap', false); });
      pl.walk(pl.at() + (pl.at() < (floorMin() + floorMax()) / 2 ? 1 : -1) * 260, 18);
      pl.wait(500, () => { rest(); say(pick(ROAM.cut)); });
      pl.wait(1200);
    },
    // The Claude handbook: he sits down and reads it.
    read(pl) {
      pl.steps.push({ to: { fy: () => sitFy() }, ms: 240, start: () => { setPose('sit'); flag('book', true); rest(); } });
      pl.wait(1400, () => say(pick(ROAM.book)));
      pl.wait(3600);
      pl.steps.push({ to: { fy: () => standFy() }, ms: 220, start: () => { flag('book', false); setPose('stand'); rest(); } });
      pl.wait(600);
    },
    // The hackathon win: the trophy goes up, with a couple of hops.
    trophy(pl) {
      pl.wait(300, () => { setPose('stand'); flag('trophy', true); feel('starry'); say(ROAM.trophy); });
      for (let i = 0; i < 2; i += 1) {
        pl.steps.push({ to: { fy: () => standFy() - 24 * p.s }, ms: 220, ease: 'out' });
        pl.steps.push({ to: { fy: () => standFy() }, ms: 200, ease: 'in' });
      }
      pl.wait(1500, () => feel('happy'));
      pl.wait(300, () => { flag('trophy', false); rest(); });
      pl.wait(600);
    },
    hop(pl) {
      for (let i = 0; i < 2; i += 1) {
        pl.steps.push({ to: { fy: () => standFy() - 32 * p.s }, ms: 230, ease: 'out', start: () => { setPose('fall'); feel('whee'); } });
        pl.steps.push({ to: { fy: () => standFy() }, ms: 210, ease: 'in' });
      }
      pl.wait(200, () => { setPose('stand'); say(pick(ROAM.hop)); rest(); });
      pl.wait(1200);
    },
    dance(pl) {
      pl.wait(0, () => { setPose('fall'); feel('happy'); say(pick(ROAM.dance)); });
      for (let i = 0; i < 5; i += 1) pl.steps.push({ to: { tilt: i % 2 ? 9 : -9 }, ms: 260, start: () => flag('kick', i === 2) });
      pl.steps.push({ to: { tilt: 0 }, ms: 220, start: () => flag('kick', false) });
      pl.wait(300, () => { setPose('stand'); rest(); });
      pl.wait(900);
    },
    sit(pl, nap = false) {
      pl.steps.push({ to: { fy: () => sitFy() }, ms: 240, start: () => setPose('sit') });
      pl.wait(nap ? 6500 : 3600, () => {
        if (nap) { setMood('sleepy'); say(ROAM.nap); } else { rest(); if (Math.random() < 0.6) say(pick(ROAM.sit)); }
      });
      pl.steps.push({ to: { fy: () => standFy() }, ms: 220, start: () => { setPose('stand'); rest(); } });
      pl.wait(700);
    },
    peek(pl) {
      // Up the nearer wall for a look around, then a jump back down.
      const right = pl.at() > (floorMin() + floorMax()) / 2;
      const foot = right ? floorMax() : floorMin();
      pl.walk(foot, 7);
      pl.steps.push({ to: { fx: right ? sideWallR : sideWallL }, ms: 240, ease: 'out', start: () => { setFace(right ? 1 : -1); setPose('wall'); flag('side', true); } });
      pl.steps.push({ to: { fy: () => window.innerHeight * 0.42 }, ms: 1900, start: () => { flag('climbing', true); feel('determined'); } });
      pl.wait(1500, () => { flag('climbing', false); feel('starry'); say(pick(ROAM.peek)); });
      pl.steps.push({ to: { fy: () => standFy() }, ms: 560, ease: 'in', start: () => { flag('climbing', false); flag('side', false); setPose('fall'); feel('whee'); } });
      pl.steps.push({ to: { fx: foot }, ms: 200, ease: 'out', start: () => { setPose('stand'); rest(); } });
      pl.moveTo(foot);
      pl.wait(800);
    },
    away(pl) {
      // Off the right edge to the "other screens", and back in from the left.
      pl.walk(floorMax(), 6);
      pl.wait(0, () => say(ROAM.away, { ms: 1800 }));
      pl.walk(vw() - p.x + 90 * p.s, 6, true);
      pl.wait(1800);
      const enter = -p.x - 90 * p.s;
      pl.wait(0, () => { p.fx = enter; setFace(1); });
      pl.moveTo(enter);
      pl.walk(floorMin() + 150, 6, true);
      pl.wait(500, () => { say(ROAM.wrapped); feel('happy', 1600); });
      pl.wait(900);
    },
    comment(pl) {
      pl.wait(2600, () => { rest(); say(pick(ROAM.stroll)); });
    },
  };

  // The next thing to do on his break; after a handful, he heads home.
  const nextActivity = () => {
    if (stage.current !== 'roam' || roam.aside) return;
    if (roam.left <= 0 || reducedRef.current || !shownRef.current) {
      goHome('tired');
      return;
    }
    roam.left -= 1;
    const quiet = Date.now() - roam.movedAt > 30000;
    const pool = ['stroll', 'crew', 'crew', 'roadmap', 'sketch', 'film', 'read', 'trophy', 'hop', 'dance', 'sit', 'peek', 'away', 'comment'].filter((a) => a !== roam.last);
    const what = quiet && Math.random() < 0.5 ? 'nap' : pick(pool);
    roam.last = what;
    const pl = plan();
    if (what === 'nap') ACTIVITIES.sit(pl, true);
    else ACTIVITIES[what](pl);
    pl.wait(Math.round(300 + Math.random() * 900));
    pl.wait(0, () => { timers.roam = setTimeout(nextActivity, 0); });
    engine.current.run(pl.steps);
  };

  // Off the rope: onto the wall, hand over hand down to the floor, and a hop off.
  const descend = () => {
    stopFidgets();
    clicks.current = 0;
    p.slip = 0;
    roam.left = 4 + Math.floor(Math.random() * 3);
    roam.aside = false;
    roam.last = '';
    const climbMs = Math.round(clamp((standFy() - p.fy) * 4.2, 900, 3200));
    engine.current.run([
      { ms: 900, start: () => { setStage('descend'); feel('happy'); say(pick(ROAM.leave)); } },
      { to: { fx: sideWallL }, ms: 420, ease: 'out', start: () => { setFace(-1); setPose('wall'); flag('side', true); feel('whoa'); } },
      { to: { fy: () => standFy() - 26 * p.s }, ms: climbMs, start: () => { flag('climbing', true); feel('determined'); } },
      { to: { fy: standFy, fx: floorMin }, ms: 300, ease: 'in', start: () => { flag('climbing', false); flag('side', false); setFace(1); setPose('fall'); feel('whee'); } },
      { ms: 350, start: () => { setPose('stand'); setStage('roam'); flag('grounded', true); rest(); save(); } },
      { ms: 0, start: () => { timers.roam = setTimeout(nextActivity, 300); } },
    ]);
  };

  // Back up: to the wall under his rope, climb, and grab the rope again.
  const goHome = (reason) => {
    clearTimeout(timers.roam);
    clearTimeout(timers.resume);
    roam.aside = false;
    const pl = plan();
    pl.wait(0, () => {
      setStage('homing');
      tidy();
      say(pick(reason === 'click' ? ROAM.click : ROAM.tired));
      feel(reason === 'click' ? 'relieved' : 'happy');
    });
    pl.steps.push({ to: { fy: standFy, tilt: 0 }, ms: 260, start: () => setPose('stand') });
    pl.walk(floorMin(), 4);
    pl.steps.push({ to: { fx: sideWallL }, ms: 240, ease: 'out', start: () => { setFace(-1); setPose('wall'); flag('side', true); } });
    pl.steps.push({
      to: { fy: () => engine.current.hangTarget() },
      ms: Math.round(clamp((standFy() - engine.current.hangTarget()) * 4.5, 900, 3400)),
      start: () => { flag('climbing', true); feel('determined'); },
    });
    pl.steps.push({ to: { fx: 0 }, ms: 340, ease: 'out', start: () => { flag('climbing', false); flag('side', false); flag('grounded', false); setFace(1); setPose('grip'); setStage('regrab'); p.w += 2; } });
    pl.wait(0, () => {
      setStage('hang');
      roam.restUntil = Date.now() + ROAM_REST_MS;
      feel('happy', 1600);
      save();
      scheduleDescend();
    });
    engine.current.run(pl.steps);
  };

  // Someone is scrolling, so reading: into the nearest side lane, where he sits and waits.
  const stepAside = () => {
    if (stage.current !== 'roam') return;
    clearTimeout(timers.resume);
    timers.resume = setTimeout(resumeRoam, ROAM_IDLE_MS * 2);
    if (roam.aside) return;
    roam.aside = true;
    clearTimeout(timers.roam);
    const lanes = [0, vw() - laneWidth() / 2 - p.x - 2 * p.s];
    const spot = Math.abs(p.fx - lanes[0]) <= Math.abs(p.fx - lanes[1]) ? lanes[0] : lanes[1];
    const pl = plan();
    pl.wait(0, () => { tidy(); say(pick(ROAM.aside), { ms: 1700 }); });
    pl.steps.push({ to: { fy: standFy, tilt: 0 }, ms: 200, start: () => setPose('stand') });
    pl.walk(spot, 3.5, true);
    pl.steps.push({ to: { fy: sitFy }, ms: 220, start: () => { setFace(spot === 0 ? 1 : -1); setPose('sit'); rest(); } });
    engine.current.run(pl.steps);
  };
  const resumeRoam = () => {
    if (stage.current !== 'roam' || !roam.aside) return;
    roam.aside = false;
    engine.current.run([
      { to: { fy: standFy }, ms: 220, start: () => setPose('stand') },
      { ms: 0, start: () => { timers.roam = setTimeout(nextActivity, 400); } },
    ]);
  };

  // A fast swipe of the pointer at him: he scampers off, laughing.
  const dodge = (px) => {
    roam.dodgeAt = Date.now();
    const dir = px < centreX() ? 1 : -1;
    let to = p.fx + dir * 180;
    if (to > floorMax() || to < floorMin()) to = p.fx - dir * 180;
    clearTimeout(timers.roam);
    const pl = plan();
    pl.wait(0, () => { tidy(); feel('laugh', 1300); say(pick(ROAM.dodge), { ms: 1400 }); });
    pl.steps.push({ to: { fy: standFy, tilt: 0 }, ms: 120, start: () => setPose('stand') });
    pl.walk(to, 2.4);
    pl.wait(600, rest);
    pl.wait(0, () => { timers.roam = setTimeout(nextActivity, 300); });
    engine.current.run(pl.steps);
  };

  // Left alone for a few seconds on his rope, he climbs down for a break.
  const scheduleDescend = () => {
    clearTimeout(timers.descend);
    if (reducedRef.current || stage.current !== 'hang') return;
    timers.descend = setTimeout(() => {
      if (!shownRef.current || document.hidden || stage.current !== 'hang') return;
      const busy = clicks.current || hoverRef.current || bubbleRef.current || p.queue.length || p.step;
      if (busy) scheduleDescend();
      else descend();
    }, Math.max(ROAM_IDLE_MS, roam.restUntil - Date.now()));
  };

  roamApi.current = {
    save,
    idle: scheduleDescend,
    goHome,
    onScroll: () => {
      if (Date.now() - (roam.navAt || 0) > 900) stepAside();
    },
    onPointer: (x, y, v) => {
      if (stage.current !== 'roam' || roam.aside || Date.now() - roam.dodgeAt < 2500) return;
      if (p.fy < standFy() - 40 || v < 1.4) return;
      if (Math.hypot(x - centreX(), y - (p.fy + 60 * p.s)) < 120) dodge(x);
    },
    // The window changed size: keep him on the floor and on screen.
    fit: () => {
      if (!FLOOR.includes(stage.current) || p.step || p.queue.length) return;
      p.fy = roam.aside ? sitFy() : standFy();
      p.fx = roam.aside ? p.fx : clamp(p.fx, floorMin(), floorMax());
    },
    restore: (saved) => {
      // Still on his break from the last page load in this tab: carry on from the floor.
      p.ry = engine.current.hangTarget() + GRIP * p.s;
      p.fy = standFy();
      p.fx = clamp(Number(saved.fx) || floorMin(), floorMin(), floorMax());
      setFace(1);
      setPose('stand');
      setStage('roam');
      flag('grounded', true);
      roam.left = 3 + Math.floor(Math.random() * 3);
      engine.current.kick();
      timers.roam = setTimeout(() => {
        say(ROAM.still);
        timers.roam = setTimeout(nextActivity, 2400);
      }, 700);
    },
  };

  // In development only: window.__rope.play('crew') runs one game on the floor, for checking the
  // drawings without waiting for him to pick it. Production builds leave this out.
  if (import.meta.env.DEV) {
    window.__rope = {
      play: (what) => {
        clearTimeout(timers.roam);
        clearTimeout(timers.descend);
        if (stage.current !== 'roam') {
          p.ry = engine.current.hangTarget() + GRIP * p.s;
          p.fy = standFy();
          p.fx = floorMin() + 200;
          setPose('stand');
          setStage('roam');
          flag('grounded', true);
        }
        roam.left = 0;
        const pl = plan();
        ACTIVITIES[what](pl);
        engine.current.run(pl.steps);
      },
    };
  }

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
    // On his break, a click calls him back to his rope.
    if (FLOOR.includes(st)) {
      if (st === 'roam') goHome('click');
      else say(ROAM.busy);
      return;
    }
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
    if (stage.current === 'roam') {
      feel('happy');
      if (!bubbleRef.current && Date.now() - (roam.wavedAt || 0) > 8000) {
        roam.wavedAt = Date.now();
        say(pick(ROAM.wave));
      }
      return;
    }
    if (stage.current === 'sulking') flag('away', true);
    else if (stage.current === 'hang' && clicks.current < 3) {
      if (currentTheme() === 'dark' && Date.now() - booAt.current > BOO_COOLDOWN_MS) boo(false);
      else feel('happy');
    }
  };
  const onLeave = () => {
    hoverRef.current = false;
    flag('away', false);
    if ((stage.current === 'hang' && clicks.current < 3) || stage.current === 'roam') rest();
  };

  const rootClass = [
    styles.root,
    shown ? '' : styles.hidden,
    reduced ? '' : styles.motion,
    flags.grounded ? styles.grounded : '',
    flags.crew ? styles.crewOn : '',
    flags.crewHop ? styles.crewHop : '',
  ].join(' ');
  return (
    <div ref={rootRef} className={rootClass} aria-hidden="true">
      <span className={styles.rope} />
      <span className={styles.crew}>
        {[0, 1, 2].map((i) => (
          <svg key={i} className={styles.bot} viewBox="0 0 22 30">
            <rect className={styles.botShell} x="2" y="2" width="18" height="14" rx="5" />
            <rect className={styles.botScreen} x="5" y="5" width="12" height="8" rx="3" />
            <circle className={styles.botEye} cx="9" cy="9" r="1.3" />
            <circle className={styles.botEye} cx="13" cy="9" r="1.3" />
            <rect className={styles.botBody} x="7" y="16.5" width="8" height="7" rx="3" />
            <path className={styles.botLeg} d="M9 23.5 L8 28.5 M13 23.5 L14 28.5" />
          </svg>
        ))}
      </span>
      {notes.map((n) => (
        <span key={n.label} className={`${styles.note} ${styles[`note${n.label}`]}`} style={{ left: n.x, top: n.y }}>{n.label}</span>
      ))}
      {sketch && (
        <svg className={styles.sketch} style={{ left: sketch.x, top: sketch.y }} viewBox="0 0 76 60">
          <rect className={styles.paper} x="1" y="1" width="74" height="58" rx="5" />
          <path className={styles.ink} d="M6 6 H70 V54 H6 Z M6 15 H70 M11 21 H38 V37 H11 Z M44 22 H64 M44 28 H60 M44 34 H56 M11 43 H27 V50 H11 Z" />
        </svg>
      )}
      <AgentFigure pose={pose} mood={mood} blink={blink} flags={flags} refs={refs} onPart={onPart} onEnter={onEnter} onLeave={onLeave} />
      {bubble && <Bubble key={bubble.id} text={bubble.text} typeMs={bubble.typeMs} />}
    </div>
  );
}
