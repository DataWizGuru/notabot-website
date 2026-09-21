# NotABot Studio — implemented UX build

The reviewed architecture is implemented in the existing website. The dark visual direction is retained, with near-black surfaces, blue atmosphere, warm italic headings, readable controls and the supplied NotABot identity.

## What changed

- Twelve pages, with direct Training, Consultancy, About, Approach and Contact navigation.
- Home routes for individuals, organisations and visitors who want help choosing.
- Shared individual course and organisation programme information, with clear outcomes, formats and indicative fees.
- Optional guidance with explained starting points, editable answers, Back/Forward support, session recovery, reset and independent exploration.
- Organisation estimates with explicit group sizes, assumptions and validation for whole-number groups of 4–40. Estimate context survives the enquiry return link.
- Contextual enquiries with optional organisation details, accessible error messages, reviewable email drafts and copy support. The website does not send messages.
- Responsive navigation, focus indicators, semantic forms, reduced-motion support and static alternatives for the enhanced forms.
- The existing shop remains available from the footer.

## Verification completed

- 221 assertions against the implemented guidance and estimate logic, including guidance branches, group capacities, price calculations and invalid counts.
- Internal links, assets, anchors and image alternative text checked across all 12 pages: no issues found.
- All 12 pages checked in the browser at widths of 320, 768 and 1440 pixels: no horizontal overflow, one main heading per page and no missing loaded images.
- Browser checks for personal guidance, combined support, exploration, reset, retained answers with browser Back/Forward and reload, required-field and email validation, draft encoding and copying, invalid estimates, contextual estimate return, and keyboard menu dismissal.
- No browser console errors observed during the page sweep.

These checks are not a complete accessibility audit or a substitute for user testing. No-JavaScript fallbacks and reduced-motion rules were inspected in source; a separate assistive-technology and cross-browser certification pass was not performed. Actual email delivery was not tested because sending remains the visitor’s action.

## Using the site

The updated files are in `C:\Users\niren\Downloads\notabot-immersive-v20`. The ZIP contains the complete site and its local assets. It needs no dependency installation or build step. To preview with Node installed, run `node preview.cjs` from the extracted folder, then open `http://127.0.0.1:4173/index.html`.

The build is local and has not been published. Prices remain indicative; delivery dates, current fees, prerequisites and engagement details need confirmation. The existing qualitative project summary is retained without invented metrics or testimonials. A fuller approved biography and additional verified project evidence can be added when available.

## Maintenance

The new pages use `ux.css`, `ux.js` and `ux-core.js`. Catalogue values are in `catalogue.json` and its browser counterpart `ux-data.js`; static course cards also contain those values, so keep them consistent when updating the catalogue. The shop retains its earlier assets and scripts. `README.md` describes this release; `DESIGN.md` records the applied design direction.

The pre-change site is backed up separately in the working folder. Earlier architecture documents remain the design rationale; this note records the implemented build and actual validation.
