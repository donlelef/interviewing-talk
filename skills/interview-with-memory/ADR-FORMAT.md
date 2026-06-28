# ADR Format

ADRs in `docs/adr/` preserve active architecture and implementation choices to respect in the future.

## Filename

Use a numbered filename:

```text
docs/adr/0001-short-technical-decision-name.md
```

## Structure

```md
# ADR 0001: Short Technical Decision Name

## Context

What technical problem, constraint, or trade-off does this decision address? Explain it with 2-3 sentences.

## Solution

What technical choice is active now, and what should future agents do because of it? Explain it with 2-3 sentences.
```

## Rules

- Use only `Context` and `Solution`.
- All ADRs in `docs/adr/` are active.
- Delete obsolete ADRs.
- Use terms consistently with `glossary.md`.
- If the decision is about what users should experience, put it in `product.md`.
- If the decision is about how the system should be designed or implemented, use an ADR.
