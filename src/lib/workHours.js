// Working hours, counted the way he works: Monday to Friday, 8 hours a day, weekends off.
// Worked out when the page loads, like tenure. Public holidays are not taken out.
export const HOURS_PER_DAY = 8;

// 'YYYY-MM-DD' is that day. 'YYYY-MM' is the first day of the month, or the last with `end`.
function day(s, end = false) {
  const [y, m, d] = s.split('-').map(Number);
  if (d) return new Date(y, m - 1, d);
  return end ? new Date(y, m, 0) : new Date(y, m - 1, 1);
}

// Weekdays from a to b, counting both ends.
export function weekdays(a, b) {
  let n = 0;
  for (const d = new Date(a); d <= b; d.setDate(d.getDate() + 1)) {
    const w = d.getDay();
    if (w !== 0 && w !== 6) n += 1;
  }
  return n;
}

// Hours worked from `from` to `to`. Work still going on (`to` null) counts up to yesterday, so
// only finished days are counted and the figure never runs ahead.
export function workHours(from, to) {
  const now = new Date();
  const last = to ? day(to, true) : new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  return weekdays(day(from), last) * HOURS_PER_DAY;
}

// How an hours figure reads on the site: rounded down to two significant figures, plus "+", so
// 360 stays "360+", 3,920 reads "3,900+" and 6,064 reads "6,000+". The content rules say real
// numbers only, rounded down, so the shown figure is never more than `hours`.
export function formatHours(hours) {
  if (hours < 100) return `${Math.max(0, Math.floor(hours))}+`;
  const step = 10 ** (Math.floor(Math.log10(hours)) - 1);
  return `${(Math.floor(hours / step) * step).toLocaleString('en-US')}+`;
}
