# Makes public/resumes/resume-preview.png: both pages of the resume side by side on a 1200x627
# card, the image LinkedIn shows for the /resume/ link (its og:image).
# shortcut: run by hand after `node resume/build.mjs` when the pages change; move into build.mjs if
# the resume build ever gets a PDF rasteriser of its own.
# Usage: python resume/preview.py   (needs PyMuPDF: pip install pymupdf)
import pymupdf

SRC, OUT = 'public/resumes/Mahmood_Ahmad_Resume.pdf', 'public/resumes/resume-preview.png'
W, H, PAD, GAP = 1200, 627, 32, 28

src = pymupdf.open(SRC)
assert len(src) >= 2, 'expected a two-page resume'
card = pymupdf.open()
page = card.new_page(width=W, height=H)
page.draw_rect(page.rect, color=None, fill=(0.933, 0.945, 0.992))  # the site's soft cobalt wash
ph = H - 2 * PAD
pw = ph * src[0].rect.width / src[0].rect.height
x = (W - 2 * pw - GAP) / 2
for i in range(2):
    r = pymupdf.Rect(x, PAD, x + pw, PAD + ph)
    page.draw_rect(r + (4, 6, 4, 6), color=None, fill=(0.80, 0.82, 0.88))  # soft shadow
    page.draw_rect(r, color=None, fill=(1, 1, 1))
    page.show_pdf_page(r, src, i)
    x += pw + GAP
page.get_pixmap(alpha=False).save(OUT)
print('wrote', OUT)
