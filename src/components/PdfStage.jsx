import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Document, Outline, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import styles from './DocumentViewer.module.css';

// The PDF half of the document viewer, loaded only when a PDF is first opened. Rendering is
// react-pdf (pdf.js); the worker, fonts and decoders ship with the site.
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

const ASSETS = `${import.meta.env.BASE_URL}pdfjs/`;
const OPTIONS = { cMapUrl: `${ASSETS}cmaps/`, standardFontDataUrl: `${ASSETS}standard_fonts/`, wasmUrl: `${ASSETS}wasm/` };
const DPR = Math.min(window.devicePixelRatio || 1, 2);
const PAD = 32;
const READ_WIDTH = 920;

// Reading mode scrolls through every page, drawing only those near the screen. Present mode
// shows one page at a time, fitted to the screen.
export default function PdfStage({ ref, src, title, page, presenting, zoom, outlineOpen, onLoad, onPage }) {
  const stageRef = useRef(null);
  const pageRefs = useRef([]);
  const current = useRef(1);
  const [pdf, setPdf] = useState(null);
  const [count, setCount] = useState(0);
  const [ratios, setRatios] = useState({});
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [near, setNear] = useState(() => new Set([1, 2]));
  const [progress, setProgress] = useState(0);

  const ratioOf = (n) => ratios[n] ?? ratios[1] ?? 1.414;
  const readWidth = Math.max(200, Math.round(Math.min(box.w, READ_WIDTH) * zoom));
  const presentWidth = Math.max(200, Math.floor(Math.min(box.w, box.h / ratioOf(page))));

  const goTo = useCallback((n) => {
    const target = Math.min(Math.max(1, n), count || 1);
    current.current = target;
    onPage(target);
    if (!presenting) {
      const el = pageRefs.current[target];
      if (el && stageRef.current) stageRef.current.scrollTop = el.offsetTop - PAD / 2;
    }
  }, [count, presenting, onPage]);

  useImperativeHandle(ref, () => ({ goTo }), [goTo]);

  // Follow the stage size, so pages refit when the window or full screen changes.
  useEffect(() => {
    const el = stageRef.current;
    const ro = new ResizeObserver(([entry]) => setBox({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Draw only the pages within a couple of screens of the viewport.
  useEffect(() => {
    if (!count || presenting) return undefined;
    const io = new IntersectionObserver((entries) => {
      setNear((prev) => {
        const next = new Set(prev);
        for (const e of entries) {
          const n = Number(e.target.dataset.page);
          if (e.isIntersecting) next.add(n);
          else next.delete(n);
        }
        return next;
      });
    }, { root: stageRef.current, rootMargin: '150% 0px' });
    pageRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [count, presenting]);

  // Report the page at the top third of the screen as the current page.
  const onScroll = () => {
    if (presenting) return;
    const stage = stageRef.current;
    const line = stage.scrollTop + stage.clientHeight / 3;
    let n = 1;
    for (let i = 1; i <= count; i += 1) {
      const el = pageRefs.current[i];
      if (el && el.offsetTop <= line) n = i;
      else break;
    }
    if (n !== current.current) {
      current.current = n;
      onPage(n);
    }
  };

  // Keep the reader's place when zoom changes or present mode ends.
  useEffect(() => {
    if (presenting || !count) return undefined;
    const id = requestAnimationFrame(() => goTo(page));
    return () => cancelAnimationFrame(id);
    // Only on layout changes, not on every page change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presenting, readWidth, count]);

  // Present mode needs the real shape of each page to fit it to the screen.
  useEffect(() => {
    if (!pdf || !presenting || ratios[page]) return;
    pdf.getPage(page).then((p) => {
      const v = p.getViewport({ scale: 1 });
      setRatios((r) => ({ ...r, [page]: v.height / v.width }));
    }).catch(() => {});
  }, [pdf, presenting, page, ratios]);

  const loaded = async (doc) => {
    setPdf(doc);
    setCount(doc.numPages);
    const [first, outline] = await Promise.all([doc.getPage(1).catch(() => null), doc.getOutline().catch(() => null)]);
    if (first) {
      const v = first.getViewport({ scale: 1 });
      setRatios((r) => ({ ...r, 1: v.height / v.width }));
    }
    onLoad({ count: doc.numPages, hasOutline: Boolean(outline?.length) });
  };

  const measured = (n) => (p) => {
    const r = p.originalHeight / p.originalWidth;
    setRatios((prev) => (Math.abs((prev[n] ?? 0) - r) < 0.001 ? prev : { ...prev, [n]: r }));
  };

  const pct = Math.round(progress * 100);
  const status = (text) => <p className={styles.message} role="status">{text}</p>;

  return (
    <div className={`${styles.body} ${outlineOpen && pdf ? styles.withOutline : ''}`}>
      {outlineOpen && pdf && (
        <nav className={styles.outline} aria-label="Contents">
          <p className={styles.outlineTitle}>Contents</p>
          <Outline pdf={pdf} suspense={false} onItemClick={({ pageNumber }) => goTo(pageNumber)} />
        </nav>
      )}
      <div ref={stageRef} className={`${styles.stage} ${presenting ? styles.stageCenter : ''}`} onScroll={onScroll}>
        <Document
          file={src}
          options={OPTIONS}
          suspense={false}
          className={styles.pages}
          onLoadSuccess={loaded}
          onLoadProgress={({ loaded: l, total }) => total && setProgress(l / total)}
          onItemClick={({ pageNumber }) => goTo(pageNumber)}
          externalLinkTarget="_blank"
          externalLinkRel="noopener"
          loading={status(pct ? `Loading document… ${pct}%` : 'Loading document…')}
          error={status('This document could not be loaded. Please try again.')}
        >
          {presenting && count > 0 && (
            <Page
              key={`present-${page}`}
              pageNumber={page}
              width={presentWidth}
              devicePixelRatio={DPR}
              className={styles.page}
              loading={null}
              aria-label={`${title}, page ${page} of ${count}`}
            />
          )}
          {!presenting && Array.from({ length: count }, (_, i) => {
            const n = i + 1;
            return (
              <div
                key={n}
                ref={(el) => { pageRefs.current[n] = el; }}
                data-page={n}
                className={styles.slot}
                style={{ width: readWidth, minHeight: Math.round(readWidth * ratioOf(n)) }}
                aria-label={`Page ${n} of ${count}`}
                role="group"
              >
                {near.has(n) && (
                  <Page
                    pageNumber={n}
                    width={readWidth}
                    devicePixelRatio={DPR}
                    className={styles.page}
                    loading={null}
                    onLoadSuccess={measured(n)}
                  />
                )}
              </div>
            );
          })}
        </Document>
      </div>
    </div>
  );
}
