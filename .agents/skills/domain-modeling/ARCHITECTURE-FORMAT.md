# ARCHITECTURE.md Format

What `docs/ARCHITECTURE.md` is for is in `AGENTS.md`, _Documents_; this file defines its content.

Every entry is either part of the system's structure or a principle that holds throughout the code. How one module, flow, or feature works is a detail: it belongs in the code that implements it, told by its names and types, not here. Before adding an entry, check that it would still be true and useful after that module is rewritten; if it would not, it is a detail and stays out.

## Template

```md
# Architecture

## Structure

- **{Part}**: {what it owns, and which other parts it talks to and how}

## Layers

{How code is layered inside a part, and which way dependencies point.}

## Tests

- **{Kind of test}**: {what it proves, and at which seam}

## Principles

- {A rule every part of the code follows, with its reason in one clause when the reason matters, linking the decision behind it}
```

## What belongs

- The parts of the system (apps, bounded contexts, external services) and how they connect
- The layering every module follows and the rules for crossing between layers and parts
- What each kind of test proves and where it runs
- Technical principles and invariants that hold everywhere, especially those a change could break without anything failing
- Pointers to the decisions in `docs/decisions/` behind a part or a principle

## What does not belong

- How a specific module, flow, or feature works: algorithms, scoring, message formats, tool lists, step-by-step sequences (the code)
- Lists of files, routes, settings, or tests (the code)
- Contributor workflow such as tooling, code style, branches, and commits (`AGENTS.md`)
- Setup, commands, and environment quirks (`README.md`)
- Rationale for hard-to-reverse choices (`docs/decisions/`)
- Domain definitions and rules (`docs/GLOSSARY.md`)

Write entries as current truths, and keep the document short enough to read in one sitting. When the structure or a principle changes, edit it in place.
