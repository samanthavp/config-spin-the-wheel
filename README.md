# Spin the Wheel

A static web app for live event prize giveaways.

## Overview

This project implements an interactive "Spin the Wheel" prize giveaway experience with real-time inventory tracking, probability-weighted spins, an admin panel, and local persistence using `localStorage`.

The full product requirements are documented in `prd.md`.

## Files

- `prd.md` — product requirements document and feature spec
- `public/index.html` — main web app entrypoint
- `public/support.js` — app logic and interactions
- `public/assets/images/config-title.png` — project title graphic
- `public/assets/tex/` — supporting textures and graphics
- `public/uploads/` — local reference assets, not committed to git (see `.gitignore`) and not currently referenced by the app

## Running the App

This is a static app. Serve the `public/` directory with a simple local HTTP server.

### Using Python

```bash
cd public
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Git Documentation

This repository is initialized for git tracking. It includes:

- `.gitignore` — ignores macOS and editor artifacts
- `README.md` — project overview and usage

### Recommended workflow

1. Create a feature branch for updates:
   ```bash
git checkout -b feature/update-wheel
```
2. Stage changed files:
   ```bash
git add README.md .gitignore
```
3. Commit with a clear message:
   ```bash
git commit -m "Add git documentation and project README"
```

## Notes

- No build step is required.
- Most state is stored in browser `localStorage`.
- The app is designed for booth/event use with a live prize wheel and admin controls.
