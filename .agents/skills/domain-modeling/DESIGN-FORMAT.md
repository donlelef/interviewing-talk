# DESIGN.md Format

What `docs/DESIGN.md` is for is in `AGENTS.md`, _Documents_; this file defines its content.

Every entry is a general principle that holds throughout the app, on every screen and for every feature. A rule that only makes sense for one screen, component, or feature is a detail: it belongs in the code that implements it, not here. Before adding an entry, check that it would still guide a screen nobody has designed yet; if it would not, generalise it or leave it out.

## What belongs

- Visual hierarchy and composition principles
- Interaction and state behaviour
- Responsive rules
- Accessibility expectations
- Stable pointers to source-owned tokens and primitives

## What does not belong

- Product capabilities or user flows (`docs/PRODUCT.md`)
- Domain definitions (`docs/GLOSSARY.md`)
- Technical mechanisms behind a control, such as how it submits its value (the code)
- Rationale for hard-to-reverse technical or product choices (`docs/decisions/`)
- Details of a specific screen, component, or feature, such as which element a page shows or what a particular badge says
- Literal token values, component props, or inventories that code already owns
- Screenshots, dated mockups, audit notes, or temporary implementation plans

When the reason behind a principle matters to whoever might change it, state it in one clause beside the principle.

Write principles as current truths. Prefer a small rule that guides future work
over a catalogue of today's pages. When a principle changes, edit it in place.
