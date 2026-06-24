# Spin the Wheel

A static web app for live event prize giveaways.

## Overview

This project implements an interactive "Spin the Wheel" prize giveaway experience with real-time inventory tracking, probability-weighted spins, an admin panel, and local persistence using `localStorage`.

The full product requirements are documented in `prd.md`.

## Files

- `prd.md` — product requirements document and feature spec
- `Spin the Wheel.dc.html` — main web app HTML file
- `support.js` — app logic and interactions
- `config-title.png` — project title graphic
- `tex/` — supporting assets or documents
- `uploads/` — uploaded assets used by the app

## Running the App

This is a static app. Open `Spin the Wheel.dc.html` directly in your browser, or serve the directory with a simple local HTTP server.

### Using Python

```bash
cd /Users/samanthavp/Documents/Code/config-spin-the-wheel
python3 -m http.server 8000
```

Then open `http://localhost:8000/Spin%20the%20Wheel.dc.html`.

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
