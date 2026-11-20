// Makes public/images/portfolio-preview.png: the live Home page at 1200x627, the image LinkedIn and
// other sites show for a link to the portfolio (its og:image in index.html).
// shortcut: run by hand after a visible change to the Home page's first screen, then push.
// Usage: node scripts/portfolio-preview.mjs [url]   (defaults to the live site; needs Chrome or Edge)
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const url = process.argv[2] || 'https://shironigun.github.io/';
const out = path.resolve('public/images/portfolio-preview.png');
const browser = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean).find((p) => fs.existsSync(p));
if (!browser) throw new Error('Chrome or Edge not found; set CHROME_PATH.');

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'preview-'));
execFileSync(browser, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--force-prefers-reduced-motion', '--blink-settings=preferredColorScheme=1',
  `--user-data-dir=${profile}`, '--window-size=1200,627', '--virtual-time-budget=8000',
  `--screenshot=${out}`, url,
], { stdio: 'ignore' });
fs.rmSync(profile, { recursive: true, force: true });
console.log(`✓ ${path.relative(process.cwd(), out)} from ${url}`);
