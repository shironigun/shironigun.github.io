import { useEffect } from 'react';

// Scroll reveal for every page. Content below the fold rises in as it enters the viewport;
// lists of cards come in one item after another. The classes are added by script, so without
// script, or with reduced motion, everything is simply visible. Once an element has arrived,
// the classes come off again so hover transitions behave normally.
//
// Opt out with data-reveal="off" on a section or element; data-stagger on any element makes
// its children arrive one by one instead of all at once.

function collect(el, out) {
  if (el.matches('[data-reveal="off"]')) return;
  const isList = el.matches('ul, ol') && el.children.length > 1;
  if (isList || el.hasAttribute('data-stagger')) {
    out.push(...el.children);
  } else if (el.querySelector('[data-stagger]')) {
    for (const child of el.children) collect(child, out);
  } else {
    out.push(el);
  }
}

function targets(main) {
  const out = [];
  main.querySelectorAll('section:not([data-reveal="off"]) > .container').forEach((c) => {
    for (const child of c.children) collect(child, out);
  });
  return out;
}

function settle(el) {
  el.classList.remove('rv', 'is-in');
  el.style.removeProperty('--ri');
}

export function useScrollReveal(key) {
  useEffect(() => {
    const main = document.getElementById('main');
    if (!main || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Only what is still below the fold; anything already seen stays put.
    const fold = window.innerHeight * 0.92;
    const els = targets(main).filter((el) => el.getBoundingClientRect().top > fold);
    if (!els.length) return;

    const timers = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        // Items arriving together are staggered among themselves, in reading order.
        const arriving = entries.filter((e) => e.isIntersecting).map((e) => e.target);
        arriving.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left);
        arriving.forEach((el, i) => {
          io.unobserve(el);
          el.style.setProperty('--ri', Math.min(i, 8));
          el.classList.add('is-in');
          const done = (e) => {
            if (e && (e.target !== el || e.propertyName !== 'opacity' || e.pseudoElement)) return;
            el.removeEventListener('transitionend', done);
            settle(el);
          };
          el.addEventListener('transitionend', done);
          const t = setTimeout(done, 1600 + i * 90);
          timers.add(t);
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => {
      el.classList.add('rv');
      io.observe(el);
    });

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      els.forEach(settle);
    };
  }, [key]);
}
