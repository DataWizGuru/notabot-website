# Notabot Studio Website

A GitHub Pages-ready static website for Notabot Studio.

## Files

```text
notabot-website/
├── index.html
├── services.html
├── training.html
├── about.html
├── contact.html
├── css/styles.css
├── js/main.js
├── CNAME
└── assets/
```

## How to test locally

1. Open the folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and select **Open with Live Server**.

You can also double-click `index.html`, but Live Server is cleaner for testing.

## What to replace before launch

- Replace the placeholder logo mark with your final Notabot logo.
- Add your real LinkedIn URL.
- Replace the WhatsApp placeholder number in `contact.html`.
- Email is set to `hello@notabot.studio`.
- Add `assets/images/notabot-preview.png` for LinkedIn/Open Graph previews.
- Add a favicon.

## GitHub Pages deployment

1. Create a GitHub repo called `notabot-website`.
2. Upload all files.
3. Go to **Settings → Pages**.
4. Set source to **Deploy from branch**.
5. Select `main` and `/root`.
6. Save.

## Custom domain

The `CNAME` file contains:

```text
www.notabot.studio
```

In GoDaddy, point `www` to your GitHub Pages domain:

```text
Type: CNAME
Name: www
Value: YOUR-GITHUB-USERNAME.github.io
```

For the root domain, add GitHub Pages A records in your DNS settings.

## Pricing included

- BI Consulting: R875/hour
- Analytics Strategy Session: R3,500
- Dashboard UX/UI Redesign: from R12,500
- Power BI Report Build: from R18,500
- Microsoft Fabric Advisory: from R25,000
- Power BI Training:
  - 1-Day Fundamentals: R9,500
  - 2-Day Practical Training: R17,500
  - 3-Day Dashboard Build Workshop: R26,500

## Brand direction

Inspired by the Notabot style scape:

- Segoe UI Variable / Aptos heading and body stack
- Microsoft Fluent 2-inspired spacing, radius, elevation, focus rings and surfaces
- Premium dark mode
- Teal, deep blue, off-white, and yellow accents
- Human-centred data storytelling
- Dashboard-like visual system
- Friendly but premium robot-inspired brand mark


## Logo and font update

The site now uses the supplied Notabot robot logo from `assets/logo/notabot-logo.png`, with a small favicon at `assets/logo/favicon.png`. Typography has been updated to a Microsoft-style Segoe UI Variable / Aptos stack for a cleaner, more readable Fluent 2 feel.


## 2026 Fluent 2 interaction update

This version includes transparent Notabot logo assets, a high-contrast dark-mode wordmark, subtle Fluent-style acrylic surfaces, animated hero elements, hover micro-interactions, and reduced-motion support.


## Refinement note

This version uses the supplied full Notabot Studio wordmark in the navigation with a transparent high-contrast dark-mode treatment. The homepage hero has been simplified to keep the first viewport focused on the tagline, headline, subtext, CTA buttons and one dashboard visual.
