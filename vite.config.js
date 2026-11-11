import { cpSync, createReadStream, statSync } from 'node:fs'
import { join, normalize, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// pdf.js fetches character maps, standard fonts and image decoders while it renders. Serve them
// from the package in development and copy them next to the build, so documents never depend
// on a third-party CDN.
const PDFJS_ROOT = resolve('node_modules/pdfjs-dist')
const PDFJS_DIRS = ['cmaps', 'standard_fonts', 'wasm']

function pdfjsAssets() {
  return {
    name: 'pdfjs-assets',
    configureServer(server) {
      server.middlewares.use('/pdfjs', (req, res, next) => {
        const file = normalize(join(PDFJS_ROOT, decodeURIComponent(req.url.split('?')[0])))
        const allowed = PDFJS_DIRS.some((d) => file.startsWith(join(PDFJS_ROOT, d)))
        let isFile = false
        try { isFile = statSync(file).isFile() } catch { /* missing */ }
        if (!allowed || !isFile) return next()
        if (file.endsWith('.wasm')) res.setHeader('Content-Type', 'application/wasm')
        createReadStream(file).pipe(res)
      })
    },
    writeBundle(options) {
      for (const d of PDFJS_DIRS) cpSync(join(PDFJS_ROOT, d), join(options.dir, 'pdfjs', d), { recursive: true })
    },
  }
}

export default defineConfig({
  plugins: [react(), pdfjsAssets()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    // The PDF viewer chunk (react-pdf and pdf.js) is large but only loads when a PDF opens.
    chunkSizeWarningLimit: 800,
  },
})
