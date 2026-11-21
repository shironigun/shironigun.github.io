// Makes public/images/previews/<slug>.png: a 1200x627 link-preview card for every project (the
// /og/<slug> page), used as the og:image of each case-study page, the labs page and on LinkedIn.
// Run by hand with the dev server up after a project's name, summary, number or picture changes:
//   node scripts/og-images.mjs [base-url] [slug ...]     (base defaults to http://localhost:5173)
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createServer } from 'vite';

const args = process.argv.slice(2);
const base = (args[0] && args[0].startsWith('http') ? args.shift() : 'http://localhost:5173').replace(/\/$/, '');
const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' });
const { ogSlugs } = await vite.ssrLoadModule('/src/pages/OgCard.jsx');
await vite.close();
const slugs = args.length ? args : ogSlugs;

const browser = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean).find((p) => fs.existsSync(p));
if (!browser) throw new Error('Chrome or Edge not found; set CHROME_PATH.');

const outDir = path.resolve('public/images/previews');
fs.mkdirSync(outDir, { recursive: true });
for (const slug of slugs) {
  const out = path.join(outDir, `${slug}.png`);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'og-'));
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--force-prefers-reduced-motion',
    '--blink-settings=preferredColorScheme=1', `--user-data-dir=${profile}`, '--window-size=1200,627',
    '--virtual-time-budget=6000', `--screenshot=${out}`, `${base}/og/${slug}`,
  ], { stdio: 'ignore' });
  fs.rmSync(profile, { recursive: true, force: true });
  console.log(`✓ ${path.relative(process.cwd(), out)}`);
}
