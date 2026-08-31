# The China Affair

A static reading edition of Ernest Walton's 1982 typescript, with a browsable
archive of the transcription process and evidence.

The complete site lives in [`site/`](site/) and uses plain HTML, CSS, and
JavaScript. It has no build step or external runtime dependencies.

## Publish with GitHub Pages

The [Pages workflow](.github/workflows/pages.yml) deploys `site/` whenever a
commit is pushed to `main`.

1. Open **Settings > Pages** in the GitHub repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`, or run **Deploy to GitHub Pages** from the Actions tab.

The published site will be available at:

<https://chazeah.github.io/the-china-affair/>

## Preview locally

From the repository root, run:

```bash
python3 -m http.server 8000 --directory site
```

Then open <http://localhost:8000/>. Serving over HTTP also enables the book's
full-text search, which browsers block when the HTML is opened directly from
disk.
