import { useEffect, useState } from 'react';
import { useInView, useReducedMotion } from '../lib/hooks';

// Counts a figure such as "2,000+", "2.5+" or "~40%" up from zero when it comes into view.
// Screen readers get the final figure only; ordinals like "1st" are shown as they are.
function parse(value) {
  const m = String(value).match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m || /^[a-z]/i.test(m[3])) return null;
  const raw = m[2];
  return {
    pre: m[1],
    num: parseFloat(raw.replace(/,/g, '')),
    decimals: (raw.split('.')[1] || '').length,
    grouped: raw.includes(','),
    post: m[3],
  };
}

export default function CountUp({ value, duration = 1400, className }) {
  const reduced = useReducedMotion();
  const parts = parse(value);
  const animate = Boolean(parts) && parts.num > 0 && !reduced;
  const [ref, inView] = useInView(0.5);
  const [n, setN] = useState(animate ? 0 : null);

  useEffect(() => {
    if (!animate || !inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const k = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      if (k < 1) {
        setN(parts.num * eased);
        raf = requestAnimationFrame(tick);
      } else {
        setN(null);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, inView]);

  let shown = value;
  if (n !== null && parts) {
    const fixed = n.toFixed(parts.decimals);
    const body = parts.grouped
      ? Number(fixed).toLocaleString('en-US', { minimumFractionDigits: parts.decimals, maximumFractionDigits: parts.decimals })
      : fixed;
    shown = `${parts.pre}${body}${parts.post}`;
  }

  return (
    <span ref={ref} className={className} style={{ display: 'inline-grid' }}>
      <span aria-hidden="true" style={{ gridArea: '1 / 1', visibility: 'hidden' }}>{value}</span>
      <span aria-hidden="true" style={{ gridArea: '1 / 1' }}>{shown}</span>
      <span className="visually-hidden">{value}</span>
    </span>
  );
}
