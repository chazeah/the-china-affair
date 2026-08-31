# The China Affair — website

A static site: a reading edition of Ernest Walton's 1982 typescript, and a
browsable archive of how the text was recovered from the scan.

No build step, no framework, no external requests. Plain HTML, one stylesheet
and one small script. Upload the contents of this folder and it works.

## Publishing it

**Any static host.** Drop this folder in. `index.html` is the entry point.

**GitHub Pages.** This repository's Pages workflow publishes this folder on
every push to `main`. In Settings → Pages, choose **GitHub Actions** as the
source.

**Netlify, Cloudflare Pages, Vercel.** Drag the folder onto the dashboard, or
point the project at it with no build command and this folder as the publish
directory.

The footer of the front page invites corrections but gives no address. Add one
if you want to hear from readers.

## Structure

```
index.html          the front page: the thesis, the contents, the figures
404.html            for hosts that use it
read/
  contents.html     the fifteen sections
  prologue.html     the book, one page per section
  chapter-01.html   …through chapter-14.html
archive/
  index.html        how the text was made
  corrections.html  every change, as a before-and-after diff
  preserved-spellings.html   what was deliberately left alone
  verification.html how the result was checked
  statistics.html   the figures
  evidence.html     the page images that settled a question
assets/
  style.css         the whole design
  img/              the cover, the hero crop and 42 evidence images
downloads/          .pdf, .docx, .txt, .md, and the working archive as a zip
```

## A few notes on how it's built

**No webfonts.** Type is a monospace stack for the chrome and a Palatino-family
serif stack for reading. That keeps the site to zero external requests, which
matters more for something meant to sit online unattended for years than any
particular letterform does.

**Dark mode** follows the system setting. The page inverts; the scans do not —
the artifact is dark ink on pale paper, and an inverted page of faint typescript
reads as a black void.

**The page furniture is the typescript's own.** Every original sheet carries the
author's name and a revision mark at the head, and a hand-numbered folio at the
foot. The site repeats that structure, so the chrome describes the source
instead of decorating it.

## Rebuilding

The site is generated from `The China Affair - archive/`, which sits beside this
folder. From the parent directory:

```bash
python3 build_site.py        # front page, contents, 15 chapter pages
python3 build_archive.py     # corrections diff + the three prose reports
python3 build_archive2.py    # archive landing page + evidence gallery
python3 finish_site.py       # 404, sitemap, robots.txt
```

`build_archive.py` needs `pandoc` to convert the reports. Everything else is
standard-library Python.

Editing prose directly in the generated HTML works fine, but a rebuild will
overwrite it — put lasting changes in the build scripts.
