// Portfolio QA sweep. With `npm run dev` running, open http://localhost:5173, paste this into
// the browser console, and wait for "QA sweep" to print (about two minutes). Each route loads
// in a hidden frame at five widths and is checked for the problems below.

(async () => {
  const projects = await import('/src/content/projects.js');
  const writing = await import('/src/content/writing.js');
  const routes = [
    '/', '/projects', '/case-studies', '/journey', '/about', '/how-i-work', '/contact', '/not-a-page',
    ...projects.projectPages.map((p) => `/case-studies/${p.slug}`),
    ...writing.articles.map((a) => `/writing/${a.slug}`),
  ];
  const widths = [360, 768, 1100, 1440, 1920];
  const issues = [];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // Words that must never appear (such as where he lives) stay out of the public repo: one per
  // line in docs/private/blocked-words.txt, which git ignores.
  const blocked = await fetch('/docs/private/blocked-words.txt').then((r) => (r.ok ? r.text() : '')).catch(() => '');
  const words = blocked.split(/\r?\n/).map((x) => x.trim()).filter((x) => x && !x.startsWith('#') && !x.startsWith('<'));
  const escape = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const banned = words.length ? new RegExp(words.map(escape).join('|'), 'i') : null;
  if (!banned) console.warn('QA sweep: docs/private/blocked-words.txt not found, so blocked words are not checked.');

  for (const w of widths) {
    for (const route of routes) {
      const f = document.createElement('iframe');
      f.style.cssText = `position:fixed;left:-9999px;top:0;width:${w}px;height:900px;border:0`;
      f.src = route;
      document.body.appendChild(f);
      await new Promise((res) => { f.onload = res; setTimeout(res, 8000); });
      await wait(600);
      const d = f.contentDocument;
      const tag = `${w}px ${route}`;
      if (d.documentElement.scrollWidth > w + 1) issues.push(`${tag}: page scrolls sideways (${d.documentElement.scrollWidth}px)`);
      const h1 = d.querySelectorAll('h1').length;
      if (h1 !== 1) issues.push(`${tag}: ${h1} h1 elements`);
      let last = 1;
      for (const h of d.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
        const level = +h.tagName[1];
        if (level > last + 1) issues.push(`${tag}: heading jumps from h${last} to h${level} ("${h.textContent.slice(0, 30)}")`);
        last = level;
      }
      const ids = {};
      d.querySelectorAll('[id]').forEach((e) => { ids[e.id] = (ids[e.id] || 0) + 1; });
      Object.entries(ids).filter(([, n]) => n > 1).forEach(([id]) => issues.push(`${tag}: duplicate id "${id}"`));
      d.querySelectorAll('img:not([alt])').forEach((i) => issues.push(`${tag}: image without alt ${i.src}`));
      d.querySelectorAll('a,button').forEach((e) => {
        if (!(e.getAttribute('aria-label') || e.textContent || e.title || '').trim()) issues.push(`${tag}: unnamed ${e.tagName.toLowerCase()}`);
      });
      d.querySelectorAll('a[href$=".pdf"],a[href*="/certifications/"]').forEach((a) => issues.push(`${tag}: raw document link ${a.getAttribute('href')}`));
      const text = `${d.body.innerText} ${[...d.querySelectorAll('img')].map((i) => i.alt).join(' ')}`;
      const hit = banned && text.match(banned);
      if (hit) issues.push(`${tag}: contains the blocked word "${hit[0]}"`);
      const small = [...d.querySelectorAll('body *')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
        && parseFloat(getComputedStyle(e).fontSize) < 12 && !e.closest('svg, [class*="slide"], [class*="arousel"]'));
      if (small.length) issues.push(`${tag}: ${small.length} text elements under 12px`);
      f.remove();
    }
  }
  console.log(`QA sweep: ${routes.length * widths.length} page loads, ${issues.length} issues`);
  issues.forEach((i) => console.log(i));
})();
