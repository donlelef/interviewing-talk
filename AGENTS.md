# Agent Instructions

## Before changing code

Read `docs/` if it exists. Do not read `talk/`: it holds the material of a talk
about this repository, not project documentation.

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
Tests are named for the behaviour they prove.
