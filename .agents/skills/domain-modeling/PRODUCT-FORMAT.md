# PRODUCT.md Format

What `docs/PRODUCT.md` is for is in `AGENTS.md`, _Documents_; this file defines its content.

## Template

```md
# {Product Name}

{One or two sentences: what it is, for whom, in plain language.}

## Who uses it

- **{Role}**: {one line: what they do here}

## Features

### {Surface / area}

- {Capability, stated as what a user can do}

## How it works

{Only the mechanics a PM needs to reason about scope and priority, linking the glossary for exact business rules.}

## Out of scope

- {Explicitly not built, and why it matters that it isn't}
```

## Rules

- **State capabilities, not mechanics.** "The Speaker can mark a Question as answered" not "answering sets an `answered_at` timestamp."
- **Link, don't restate.** Terms, interface principles, architecture, and the why behind a decision each live in their own document; link to them, as `AGENTS.md`, _One fact, one place_, requires.
- **Out-of-scope entries earn their place.** Only list an absence a reasonable reader would expect and ask "why isn't this here?", not an exhaustive list of everything the product isn't.
- **Keep it a single pass.** If a section grows past what a PM reads once, it belongs in a linked doc instead, with only a pointer left here.

## When to update

Update `docs/PRODUCT.md` the moment a feature is added, removed, or changes shape, during a grilling session (`/grill-with-docs`) or a normal implementation session. Don't batch it up.

## Creating it for the first time

When `docs/PRODUCT.md` needs to be created, don't ask the user to dictate it from scratch. Draft it from what's already true (routes, decisions, `docs/GLOSSARY.md`, README, commit history), then confirm the draft with the user and correct it inline. Writing it is synthesis, not an interview.
