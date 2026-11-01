# Agent Instructions

## Before changing code

Read the documents listed under [Documents](#documents) that touch the
change. Use the glossary's terms exactly in code, tests, UI copy, and docs. If
your change contradicts a decision, flag it instead of silently overriding it.

## Tooling

Use Bun for every project command: `bun run dev` to start the app, `bun test`
to run the tests, `bun run reset` to delete local data. The app has no
dependencies; ask for consent before adding one.

## Code style

Write the simplest code that delivers the feature at hand: readable at first
glance and easy to change. Add only what that feature strictly needs, with no
speculative options, abstractions, or extension points for features not yet
asked for, and delete code that nothing uses.

Code carries no comments. Names, types, and small functions say what the code
does; when a line seems to need a comment, rename or extract until it does not.
An explanation belongs in the document that owns it (see
[Documents](#documents)). Tests are named for the behaviour they prove.

## Skills

Agent skills live in `.agents/skills/<name>/`, which Codex and other agents
read, with Codex metadata in `agents/openai.yaml`. Claude Code reads them
through one symlink per skill in `.claude/skills/`,
`../../.agents/skills/<name>`. A new skill gets both; never a copy.

## Documents

This section is the one place that says what each document is for. Where a
document's content has rules of its own, they are defined once, in the format
linked beside it. Skills and other documents point here, or to that format,
rather than restate either.

- **`README.md`**: how to run and test the app, and a short map of the
  repository.
- **`AGENTS.md`**: the rules for contributors and agents working in this repo.
- **`docs/PRODUCT.md`**: what the product does, for whom, and what it
  deliberately does not do
  ([format](.agents/skills/domain-modeling/PRODUCT-FORMAT.md)).
- **`docs/GLOSSARY.md`**: what each domain term means
  ([format](.agents/skills/domain-modeling/GLOSSARY-FORMAT.md)).
- **`docs/DESIGN.md`**: how the interface looks and behaves
  ([format](.agents/skills/domain-modeling/DESIGN-FORMAT.md)).
- **`docs/ARCHITECTURE.md`**: the structure of the system and the technical
  principles it follows
  ([format](.agents/skills/domain-modeling/ARCHITECTURE-FORMAT.md)).
- **`docs/decisions/`**: why the decisions still in effect were made
  ([format](.agents/skills/domain-modeling/DECISION-FORMAT.md)).

A document under `docs/` is created only when there is something to write in
it. Create no other project-document location. `talk/` holds the material of
the talk this repository demonstrates; it is not project documentation, so do
not read it when working on the app.

### Write only what matters

Write a fact down only when a future reader needs it and the code cannot tell
them: a rule, a reason, a trap, a contract. No narrative of how the code got
here, no restating what a file or a test already shows, no dated notes. When in
doubt, leave it out: a short document that is right beats a long one that
drifts.

### One fact, one place

Each fact belongs in exactly one document, the one whose role above fits it;
anywhere else, link to it instead of restating it. `docs/PRODUCT.md`,
`docs/DESIGN.md`, and `docs/ARCHITECTURE.md` state what is true now and link to
the decision behind an entry for its why; a decision summarises only the what
it explains. If you find the same fact in two documents, or a fact in the wrong
one, move it rather than leaving a second copy.

When a fact could fit more than one document: whether a user can do something
is product (`docs/PRODUCT.md`); how it is presented and how the user interacts
with it is design (`docs/DESIGN.md`); the mechanism that implements it is the
code, and `docs/ARCHITECTURE.md` only when it is part of the system's structure
or a principle that holds throughout.
