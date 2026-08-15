# stephenalanmurphy.com

Stephen Murphy's mechanical engineering and product design portfolio.

## Stack

- HTML
- CSS
- Vanilla JavaScript
- No framework
- No build step
- GitHub repository deployed through Cloudflare Workers static assets

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

Production deploys from the `main` branch through Cloudflare Workers static assets / Git integration.

There is no framework build step; the repository root is the static site.

## Rollback

The site immediately before the August 15, 2026 editorial / Apple-style visual redesign is preserved on:

`pre-apple-visual-redesign-2026-08-15`

That branch points to commit `3bd2e0f4c8f36ba87da857de34313b898f525420` and should remain unchanged so the redesign can be reverted cleanly if needed.

## Content notes

- Portfolio images are stored locally in the repository under `assets/projects/`; the public site does not depend on Wix-hosted media.
- X-BAT public-program imagery is stored locally with the rest of the portfolio assets.
- The current résumé button opens the archived 2023 PDF in the browser's PDF viewer; the file will be replaced when the updated résumé is ready.
- The original SkySafe MM2 internal-electronics image was not present in the recovered media archive, so the public site currently shows the exterior MM2 image only.
