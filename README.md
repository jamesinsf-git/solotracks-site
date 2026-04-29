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

### Static assets

| Path | What it is | Suggested size |
|---|---|---|
| `assets/app-icon.png` | App icon, square | 192×192 PNG (or larger) |
| `assets/favicon.png` | Browser tab icon | 32×32 PNG |
| `assets/apple-touch-icon.png` | iOS home-screen icon | 180×180 PNG |
| `assets/og-image.png` | Image shown when shared on social | 1200×630 PNG |
| `assets/app-store-badge.svg` | Apple's official "Download on the App Store" badge | from [Apple's marketing resources](https://developer.apple.com/app-store/marketing/guidelines/) |

### Hero demo video

| Path | What it is |
|---|---|
| `video/demo.mp4` | The 30-second hero demo video |
| `video/demo-poster.jpg` | Poster frame shown before the hero video plays |

### Feature section videos (3 total)

Each section has a short looping video (4–6 seconds) and a poster image (the first frame). Videos use `preload="none"` and only start downloading when the section scrolls into view, so per-section weight is the cost only for visitors who actually scroll there.

| Section | Video | Poster | What to capture |
|---|---|---|---|
| Drop in songs | `video/wifi-transfer.mp4` | `screenshots/wifi-transfer-poster.jpg` | Split-screen or near-cut: dragging MP3s from a Mac browser into the phone library |
| Slow it down. Loop it. | `video/player-loop.mp4` | `screenshots/player-loop-poster.jpg` | Tap flag, drop A-B markers, loop region replays at 0.5× |
| Offline, forever | `video/lockscreen.mp4` | `screenshots/lockscreen-poster.jpg` | Enable airplane mode, music keeps playing on the lock screen |

### Recording tips

- Record your iPhone screen at **60fps** via Control Center, then export at 30fps.
- For Wi-Fi transfer, use QuickTime on the Mac to record the Mac side, and Control Center on the iPhone for the phone side. Cut between them in your editor.
- Aim for **4–6 seconds per loop**. Longer than that and the file balloons; shorter than that and the loop is jarring.
- Pad the start by 1 frame so the loop has a clean visual cut.

### Encoding for the web

After you have your raw recording (typically a `.mov` from QuickTime), compress to a small, web-optimized MP4. Target **1–2 MB per feature video** and **3–5 MB for the hero**.

```bash
# Feature video — small, looping, no audio
ffmpeg -i source.mov \
  -c:v libx264 -crf 28 -preset slow -profile:v main \
  -an \
  -movflags +faststart \
  -vf "scale=720:-2,fps=30" \
  video/wifi-transfer.mp4
```

Flag breakdown:
- `-crf 28` quality (lower = better; 28 is a good sweet spot for short UI clips, drop to 23 if it looks blocky)
- `-preset slow` better compression at the cost of encode time (one-time)
- `-an` strip audio (videos play muted anyway)
- `-movflags +faststart` puts the moov atom at the front so playback starts before the file fully downloads
- `-vf "scale=720:-2,fps=30"` resize to 720px wide, 30fps

### Generating poster frames

```bash
# Grab a frame at 1.0s for the poster
ffmpeg -i video/wifi-transfer.mp4 -ss 00:00:01 -vframes 1 -q:v 2 \
  screenshots/wifi-transfer-poster.jpg
```

`-q:v 2` is high-quality JPEG (scale is 1–31, lower is better).

### One-shot script

If you have all three raw `.mov` files in a `raw/` folder, this loop processes them all:

```bash
mkdir -p video screenshots
for name in wifi-transfer player-loop lockscreen; do
  ffmpeg -y -i raw/$name.mov \
    -c:v libx264 -crf 28 -preset slow -profile:v main \
    -an -movflags +faststart -vf "scale=720:-2,fps=30" \
    video/$name.mp4
  ffmpeg -y -i video/$name.mp4 -ss 00:00:01 -vframes 1 -q:v 2 \
    screenshots/$name-poster.jpg
done
```

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
