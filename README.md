# 🪑 Blender Model Viewer

[![model-viewer](https://img.shields.io/badge/%3Cmodel--viewer%3E-4.3.1-4285F4.svg?logo=google&logoColor=white)](https://github.com/google/model-viewer)
[![Build](https://img.shields.io/badge/build-none-44cc66.svg)](#development--local-preview)
[![GitHub Pages](https://img.shields.io/badge/hosting-GitHub_Pages-222222.svg?logo=github&logoColor=white)](https://pages.github.com/)<br>
![Blender](https://img.shields.io/badge/Blender-E87D0D.svg?logo=blender&logoColor=white)
![glTF](https://img.shields.io/badge/glTF%2FGLB-87C540.svg)
![AR](https://img.shields.io/badge/AR-Scene_Viewer_%2F_WebXR_%2F_Quick_Look-9146FF.svg)

3D models created in [Blender](https://www.blender.org/), viewable right in your web browser using Google's [`<model-viewer>`](https://github.com/google/model-viewer) web component. Open it on your phone and place the models in the real world with AR.

🔗 **Demo**: <https://unsolublesugar.github.io/blender-model-viewer/>

![MyVideo_2](https://user-images.githubusercontent.com/8685879/147035773-28fce037-9cb8-4b29-ae12-a079a1e85583.gif)

## Features

- **360° viewer** — drag to rotate, pinch / scroll to zoom (extended zoom range & sensitivity)
- **AR mode** — place models in your room via Scene Viewer (Android), WebXR, or Quick Look (iOS). Models are scaled to tabletop size for comfortable placement
- **Large AR button** — a custom, easy-to-tap "View in AR" button replaces the tiny default one on AR-capable devices
- **QR hand-off** — on desktop, a "Try AR on your phone" button shows a QR code that opens the current page on your phone
- **Hotspot annotations** — tap the markers on each model for short descriptions; they dim automatically when occluded
- **Model gallery** — card-style index of all models at [`/models/`](https://unsolublesugar.github.io/blender-model-viewer/models/)
- **Fast loading** — pinned library version, `.glb` assets, lightweight webp posters shown while models load
- **OGP / Twitter Card** — link previews for social sharing

## Models

| Model                                         | Page                                                                                       |
|-----------------------------------------------|--------------------------------------------------------------------------------------------|
| Desk Chair — my first ever Blender model      | [/](https://unsolublesugar.github.io/blender-model-viewer/)                                |
| Among Us Crewmate — with a transmissive visor | [/models/amongus/](https://unsolublesugar.github.io/blender-model-viewer/models/amongus/) |

## Directory structure

```text
index.html               Desk Chair viewer (top page)
desk_chair.glb           Desk Chair asset used by the site
desk_chair.gltf          Kept for an external blog embed — do not delete
poster.webp / og.png     Loading poster / OGP image for the top page
models/
  index.html             Model gallery
  amongus/
    index.html           Among Us Crewmate viewer
    amongus.gltf         Model asset
    poster.webp / og.png Loading poster / OGP image
assets/
  site.css               Shared styles (nav, hotspots, AR button, QR modal)
  ar-qr.js               QR hand-off logic (shown only when AR is unavailable)
  favicon.svg            Site favicon
  vendor/qrcode.js       qrcode-generator v2.0.4 (MIT, vendored — no CDN)
```

No build step. Every page is plain HTML that loads `<model-viewer>` from unpkg (version-pinned) and site assets via relative paths.

## Development / local preview

```bash
python3 -m http.server 8000   # → http://localhost:8000/
```

Model assets are referenced with relative paths, so local previews load your local files.

> **Note**: AR only activates in a secure context (HTTPS). To test AR on a real phone against your local server, use an HTTPS tunnel (e.g. `cloudflared tunnel --url http://localhost:8000`) or push to GitHub Pages.

## Adding a new model

1. Create `models/<name>/` and drop in your `.glb` (preferred) or `.gltf` exported from Blender
2. Copy `models/amongus/index.html` and update the `<title>`, OGP tags, `alt`, `src`, and hotspot positions
3. Generate `poster.webp` / `og.png` from the rendered page (headless Chrome capture)
4. Add a card to `models/index.html`
5. Push — GitHub Pages deploys automatically

## Background

The Desk Chair on the demo page is the first 3D model I ever made in Blender. The learning process is written up here (Japanese):
<https://synamon.hatenablog.com/entry/blender-introduction>
