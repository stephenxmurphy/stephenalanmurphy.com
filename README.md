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

The site immediately before the August 18, 2026 project-structure cleanup is preserved on:

`pre-structure-cleanup-2026-08-18`

That branch points to commit `81c07b5be07276b289cd80fce96232b6c47f20d1`.

The site immediately before the August 15, 2026 editorial / Apple-style visual redesign is preserved on:

`pre-apple-visual-redesign-2026-08-15`

That branch points to commit `3bd2e0f4c8f36ba87da857de34313b898f525420`.

## Content notes

- Most portfolio images are stored locally in the repository under `assets/projects/`; the public site does not depend on Wix-hosted media.
- The X-BAT section embeds Shield AI's official public launch video and loads an official Shield AI engine-testing still.
- The current résumé button opens the archived 2023 PDF in the browser's PDF viewer; the file will be replaced when the updated résumé is ready.
- The original SkySafe MM2 internal-electronics image was not present in the recovered media archive, so the public site currently shows the exterior MM2 image only.
