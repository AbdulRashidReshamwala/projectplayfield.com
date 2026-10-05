# Project Playfield

The showcase website for Playfield, an experiment that turns projected spaces into games controlled by your hands.

Live site: https://projectplayfield.com

## Local preview

Run `npm run dev`, then open http://127.0.0.1:4173. The site is plain HTML, CSS, and JavaScript in `dist/`; edit those files directly. All optimized media is included.

## Deploy

Requires Node.js, npm, and the authenticated Cloudflare `cf` CLI (tested with 1.0.0-beta.6).

```sh
npm ci
npm run deploy
```

The build script creates Cloudflare's static asset Build Output. Deployment publishes the `projectplayfield` Worker and its custom domain from `cloudflare.config.mjs`.

`prepare-media.py` records the original media preparation process and requires the separate local launch-video project and FFmpeg. It is not needed to preview or deploy this repository.

## Credits and contact

Created by Abdul Rashid. [GitHub](https://github.com/AbdulRashidReshamwala) · [X](https://x.com/abdul_rashid_r) · abdulrreshamwala@gmail.com

Launch-film music: “Riptide” by Kevin MacLeod, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Voice generated with [ElevenLabs](https://elevenlabs.io). Full film credits are included on the site.
