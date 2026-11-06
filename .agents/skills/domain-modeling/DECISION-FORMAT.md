# Decision Format

What `docs/decisions/` is for is in [DOCUMENTS.md](./DOCUMENTS.md); this file defines its content. Decisions use sequential numbering: `0001-slug.md`, `0002-slug.md`, etc. The same log holds **technical** and **product** decisions: don't split them into separate directories.

UI/UX choices are never recorded here: their principle goes in `docs/DESIGN.md`.

## Template

```md
# {Short title of the decision}

## Context

{The situation and the forces that made a decision necessary: the problem, the constraints, what mattered. One short paragraph.}

## Solution

{What we decided, and why it fits the context. Summarise the what only as far as the why needs it to be understood.}

## Considered Alternatives

- **{Alternative}**: {why it was not chosen, and when it would be worth revisiting}

## Consequences

- {A non-obvious downstream effect the decision brings, good or bad}
```

**Context** and **Solution** are required. **Considered Alternatives** and **Consequences** are optional: include the first only when the rejected alternatives are worth remembering, so nobody proposes them again without knowing why they were dropped, and the second only when there are non-obvious downstream effects to call out; otherwise leave the heading out entirely. Keep every section short; the value is in recording _that_ a decision was made and _why_, not in filling out sections. How the decision is implemented belongs in the code; the structure, principle, or capability it settles goes in `docs/ARCHITECTURE.md` (technical) or `docs/PRODUCT.md` (product), not here.

No status field. `docs/decisions/` captures the current state of decisions, not a history of how they changed; see [Superseding](#superseding).

## Numbering

Scan `docs/decisions/` for the highest existing number and increment by one, whether the prior entries were technical or product decisions: it's one chronological log, not several. Numbers start at 0001 and stay contiguous: deleting a record renumbers the ones after it and updates every link and reference to them.

## Superseding

When a new decision overrules an earlier one, the earlier record has to go: delete it, or rewrite it in place to state the new call. Don't keep it around: `docs/decisions/` only holds decisions that are still in effect, never a changelog of abandoned ones; version control keeps the history. Then update every link to it, in every document: none may point at a record that is gone or says something else now.

## When to offer a decision record

All three of these must be true:

1. **Hard to reverse**: the cost of changing your mind later is meaningful
2. **Surprising without context**: a future reader will look at the code (or the product) and wonder "why on earth did they do it this way?"
3. **The result of a real trade-off**: there were genuine alternatives and you picked one for specific reasons

If a decision is easy to reverse, skip it: you'll just reverse it. If it's not surprising, nobody will wonder why. If there was no real alternative, there's nothing to record beyond "we did the obvious thing."

### What qualifies: technical

- **Architectural shape.** "We're using a monorepo." "The write model is event-sourced, the read model is projected into Postgres."
- **Integration patterns between contexts.** "Ordering and Billing communicate via domain events, not synchronous HTTP."
- **Technology choices that carry lock-in.** Database, message bus, auth provider, deployment target. Not every library: just the ones that would take a quarter to swap out.
- **Boundary and scope decisions.** "Customer data is owned by the Customer context; other contexts reference it by ID only." The explicit no-s are as valuable as the yes-s.
- **Deliberate deviations from the obvious path.** "We're using manual SQL instead of an ORM because X." Anything where a reasonable reader would assume the opposite. These stop the next engineer from "fixing" something that was deliberate.
- **Constraints not visible in the code.** "We can't use AWS because of compliance requirements." "Response times must be under 200ms because of the partner API contract."
- **Rejected alternatives when the rejection is non-obvious.** If you considered GraphQL and picked REST for subtle reasons, record it; otherwise someone will suggest GraphQL again in six months.

### What qualifies: product

- **Scope decisions.** "Bulk export ships enterprise-tier only, because X." The explicit no-s are as valuable as the yes-s.
- **Positioning or pricing calls that carry lock-in.** "We price per-seat, not usage-based, because Y." Not every pricing tweak: just the ones that would be costly to reverse.
- **Deliberate deviations from what users asked for.** "We declined self-serve signup because it conflicts with [compliance/onboarding requirement]." Stops the next person from re-proposing it without knowing why it was declined.
- **Constraints not visible in the product.** "We can't support anonymous accounts because of KYC requirements."
- **Rejected alternatives when the rejection is non-obvious.** If you considered a freemium tier and picked sales-assisted onboarding instead for subtle reasons, record it.

## After recording

If the decision settles something that's now the current state, link it from the document that owns that state, as [DOCUMENTS.md](./DOCUMENTS.md), _One fact, one place_, describes.
