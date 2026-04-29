# solotracks-site

Marketing landing page for [SoloTracks](https://github.com/jamesinsf-git/everplay).

Single static HTML page, mobile-first, no build step.

## Local preview

```bash
# Any static server works. From this directory:
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` directly in a browser.

## Drop-in assets needed before deploy

| Path | What it is | Suggested size |
|---|---|---|
| `assets/app-icon.png` | App icon, square | 192×192 PNG (or larger) |
| `assets/favicon.png` | Browser tab icon | 32×32 PNG |
| `assets/apple-touch-icon.png` | iOS home-screen icon | 180×180 PNG |
| `assets/og-image.png` | Image shown when shared on social | 1200×630 PNG |
| `assets/app-store-badge.svg` | Apple's official "Download on the App Store" badge | from [Apple's marketing resources](https://developer.apple.com/app-store/marketing/guidelines/) |
| `screenshots/wifi-transfer.png` | Wi-Fi transfer screen | iPhone screenshot, 9:19.5 ratio |
| `screenshots/player-loop.png` | Player with A-B markers | iPhone screenshot |
| `screenshots/lockscreen.png` | Lock screen with playback controls | iPhone screenshot |
| `video/demo.mp4` | The 30-second demo video | H.264, < 5 MB ideally |
| `video/demo-poster.jpg` | Poster frame shown before video plays | First frame of the video |

## Update the App Store link

Both `index.html` and the App Store badge image link to `https://apps.apple.com/` as a placeholder. Find/replace with your real product page URL once the app is approved.

Search `index.html` for: `apps.apple.com`

## Deploy

Recommended: **Cloudflare Pages**.

1. Push this repo to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com), connect the repo
3. Build settings: leave everything blank (no build command, output directory `/`)
4. Add custom domain in the project settings
5. Done — auto-deploys on every push

Alternative: Vercel, Netlify, GitHub Pages all work with the same zero-config setup.

## Editing the site

The whole site is two files: `index.html` and `privacy.html`. CSS is embedded at the top of each. No JS, no framework, no build. Open in your editor, edit, save, push.
