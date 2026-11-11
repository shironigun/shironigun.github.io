import { createContext, lazy, Suspense, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { BookIcon, ChevronIcon, CloseIcon, DownloadIcon } from './Icons';
import styles from './DocumentViewer.module.css';

// Documents and certificates open inside the portfolio instead of as raw files. PDFs render with
// react-pdf (pdf.js), loaded only when a PDF is first opened: every page in a scrolling reader,
// with contents, page jump and zoom. Present mode fills the screen, one page at a time. Arrow
// keys move between pages and Escape closes. HTML exhibits (interactive courses and explainers
// hosted under public/labs) run in a sandboxed frame, with present mode and a new-tab link.

const PdfStage = lazy(() => import('./PdfStage'));
const ZOOMS = [0.5, 0.67, 0.8, 1, 1.25, 1.5, 2];

const ViewerContext = createContext({ open: () => {} });
export const useViewer = () => useContext(ViewerContext);

export function ViewerProvider({ children }) {
  const [doc, setDoc] = useState(null);
  const opener = useRef(null);
  const open = useCallback((d) => {
    opener.current = d.trigger || document.activeElement;
    setDoc(d);
  }, []);
  const close = useCallback(() => {
    setDoc(null);
    requestAnimationFrame(() => opener.current?.focus?.());
  }, []);
  return (
    <ViewerContext.Provider value={{ open }}>
      {children}
      {doc && <Viewer doc={doc} onClose={close} />}
    </ViewerContext.Provider>
  );
}

// A button that opens a document in the viewer. Looks like a link or a button through className.
export function DocButton({ src, title, download = false, className = 'link-quiet', onClick, children }) {
  const { open } = useViewer();
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={(e) => {
        onClick?.(e);
        open({ src, title, download, trigger: e.currentTarget });
      }}
    >
      {children}
    </button>
  );
}

function Viewer({ doc, onClose }) {
  const isPdf = /\.pdf($|[?#])/i.test(doc.src);
  const isHtml = /\.html?($|[?#])/i.test(doc.src);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [draft, setDraft] = useState('1');
  const [zoom, setZoom] = useState(1);
  const [hasOutline, setHasOutline] = useState(false);
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [presenting, setPresenting] = useState(false);
  const dialogRef = useRef(null);
  const pdfRef = useRef(null);
  const closeRef = useRef(null);

  const go = (n) => pdfRef.current?.goTo(n);
  const onPage = useCallback((n) => setPage(n), []);
  const onLoad = useCallback(({ count: c, hasOutline: o }) => {
    setCount(c);
    setHasOutline(o);
    setOutlineOpen(o && window.innerWidth > 900);
  }, []);
  useEffect(() => setDraft(String(page)), [page]);

  // Lock the page behind, focus the dialog, and follow full screen.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onFs = () => setPresenting(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('fullscreenchange', onFs);
      if (document.fullscreenElement) document.exitFullscreen?.();
    };
  }, []);

  // Full screen where the browser allows it; otherwise present mode fills the window.
  const togglePresent = () => {
    const el = dialogRef.current;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else if (presenting) setPresenting(false);
    else if (document.fullscreenEnabled && el?.requestFullscreen) el.requestFullscreen().catch(() => setPresenting(true));
    else setPresenting(true);
  };

  const zoomBy = (step) => {
    const i = ZOOMS.indexOf(zoom);
    setZoom(ZOOMS[Math.min(Math.max(0, i + step), ZOOMS.length - 1)]);
  };

  const jump = () => {
    const n = parseInt(draft, 10);
    if (Number.isFinite(n)) go(n);
    else setDraft(String(page));
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape' && !document.fullscreenElement) {
      e.preventDefault();
      if (presenting) setPresenting(false);
      else onClose();
      return;
    }
    const typing = e.target.tagName === 'INPUT';
    if (count > 1 && !typing) {
      if (['ArrowRight', 'PageDown'].includes(e.key) || (presenting && e.key === ' ' && e.target.tagName !== 'BUTTON')) {
        e.preventDefault();
        go(page + 1);
      }
      if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        go(page - 1);
      }
      if (e.key === 'Home') go(1);
      if (e.key === 'End') go(count);
    }
    if (isPdf && !presenting && !typing && (e.key === '+' || e.key === '=')) zoomBy(1);
    if (isPdf && !presenting && !typing && e.key === '-') zoomBy(-1);
    // Keep keyboard focus inside the dialog.
    if (e.key === 'Tab') {
      const items = [...dialogRef.current.querySelectorAll('button:not([disabled]), a[href], input, iframe')];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className={`${styles.dialog} ${presenting ? styles.presenting : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="viewer-title"
        onKeyDown={onKeyDown}
      >
        <div className={styles.bar}>
          <div className={styles.lead}>
            {hasOutline && !presenting && (
              <button type="button" className={styles.icon} onClick={() => setOutlineOpen((v) => !v)} aria-pressed={outlineOpen} aria-label="Contents" title="Contents">
                <BookIcon width="18" height="18" />
              </button>
            )}
            <h2 id="viewer-title" className={styles.title}>{doc.title}</h2>
          </div>
          <div className={styles.tools}>
            {count > 1 && (
              <div className={styles.pager}>
                <button type="button" className={styles.icon} onClick={() => go(page - 1)} disabled={page === 1} aria-label="Previous page">
                  <ChevronIcon width="18" height="18" style={{ transform: 'rotate(180deg)' }} />
                </button>
                <label className={styles.count}>
                  <span className="visually-hidden">Page</span>
                  <input
                    className={styles.pageInput}
                    inputMode="numeric"
                    value={draft}
                    size={String(count).length}
                    onChange={(e) => setDraft(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => e.key === 'Enter' && jump()}
                    onBlur={jump}
                    onFocus={(e) => e.target.select()}
                  />
                  <span aria-hidden="true">/ {count}</span>
                  <span className="visually-hidden">of {count}</span>
                </label>
                <button type="button" className={styles.icon} onClick={() => go(page + 1)} disabled={page === count} aria-label="Next page">
                  <ChevronIcon width="18" height="18" />
                </button>
              </div>
            )}
            {isPdf && !presenting && count > 0 && (
              <div className={styles.zoom}>
                <button type="button" className={styles.icon} onClick={() => zoomBy(-1)} disabled={zoom === ZOOMS[0]} aria-label="Zoom out">−</button>
                <button type="button" className={styles.zoomValue} onClick={() => setZoom(1)} title="Fit to width" aria-label={`Zoom ${Math.round(zoom * 100)}%, reset to fit`}>
                  {Math.round(zoom * 100)}%
                </button>
                <button type="button" className={styles.icon} onClick={() => zoomBy(1)} disabled={zoom === ZOOMS[ZOOMS.length - 1]} aria-label="Zoom in">+</button>
              </div>
            )}
            {(isPdf || isHtml) && (
              <button type="button" className={styles.text} onClick={togglePresent}>
                {presenting ? 'Exit present mode' : 'Present'}
              </button>
            )}
            {isHtml && !presenting && (
              <a className={styles.text} href={doc.src} target="_blank" rel="noopener">Open in new tab</a>
            )}
            {doc.download && (
              <a className={styles.text} href={doc.src} download>
                <DownloadIcon width="16" height="16" />Download
              </a>
            )}
            <button ref={closeRef} type="button" className={styles.icon} onClick={onClose} aria-label="Close">
              <CloseIcon width="18" height="18" />
            </button>
          </div>
        </div>

        {isPdf ? (
          <Suspense fallback={<div className={styles.body}><div className={styles.stage}><p className={styles.message} role="status">Loading viewer…</p></div></div>}>
            <PdfStage
              ref={pdfRef}
              src={doc.src}
              title={doc.title}
              page={page}
              presenting={presenting}
              zoom={zoom}
              outlineOpen={outlineOpen && !presenting}
              onLoad={onLoad}
              onPage={onPage}
            />
          </Suspense>
        ) : isHtml ? (
          <div className={styles.body}>
            {/* Same-origin pages only; scripts run so the labs work, popups open links in a new tab. */}
            <iframe
              className={styles.frame}
              src={doc.src}
              title={doc.title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
        ) : (
          <div className={styles.body}>
            <div className={`${styles.stage} ${styles.stageCenter}`}>
              <img className={styles.image} src={doc.src} alt={doc.title} />
            </div>
          </div>
        )}

        {presenting && count > 1 && (
          <>
            <button type="button" className={`${styles.zone} ${styles.zonePrev}`} onClick={() => go(page - 1)} aria-label="Previous page" />
            <button type="button" className={`${styles.zone} ${styles.zoneNext}`} onClick={() => go(page + 1)} aria-label="Next page" />
          </>
        )}
      </div>
    </div>
  );
}
