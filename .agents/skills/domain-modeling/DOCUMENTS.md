# Documents

What each project document is for. Where a document's content has rules of its
own, they are defined once, in the format linked beside it. The other files of
this skill point here, or to that format, rather than restate either.

Read the documents below that touch a change before making it, use the
glossary's terms exactly in code, tests, UI copy, and docs, and flag a change
that contradicts a decision instead of silently overriding it.

- **`README.md`**: how to run and test the app, and a short map of the
  repository.
- **`AGENTS.md`**: the rules for contributors and agents working in this repo.
- **`docs/PRODUCT.md`**: what the product does, for whom, and what it
  deliberately does not do
  ([format](./PRODUCT-FORMAT.md)).
- **`docs/GLOSSARY.md`**: what each domain term means
  ([format](./GLOSSARY-FORMAT.md)).
- **`docs/DESIGN.md`**: how the interface looks and behaves
  ([format](./DESIGN-FORMAT.md)).
- **`docs/ARCHITECTURE.md`**: the structure of the system and the technical
  principles it follows
  ([format](./ARCHITECTURE-FORMAT.md)).
- **`docs/decisions/`**: why the decisions still in effect were made
  ([format](./DECISION-FORMAT.md)).

A document under `docs/` is created only when there is something to write in
it. Create no other project-document location.

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
