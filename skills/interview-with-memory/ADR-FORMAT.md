# ADR Format

ADRs in `docs/adr/` contain technical decisions only.

Use ADRs to preserve important architecture and implementation choices, especially when the decision has meaningful trade-offs or constrains future work.

Do not use ADRs to store product requirements or domain definitions.

## Filename

Use a numbered filename:

```text
docs/adr/0001-short-technical-decision-name.md
```

## Structure

```md
# ADR 0001: Short Technical Decision Name

## Status

Proposed | Accepted | Superseded

## Context

What technical problem needs a decision?

## Options Considered

1. Option A
   - Pros:
   - Cons:
2. Option B
   - Pros:
   - Cons:

## Decision

Which option was selected?

## Rationale

Why is this the best choice given the current context?

## Consequences

- Positive consequence.
- Negative consequence or trade-off.
- Constraint future agents should respect.

## Follow-Up Questions

- Technical uncertainties that remain.
```

## Rules

- Keep ADRs technical.
- Include the problem, considered options, selected solution, rationale, and consequences.
- Do not store product requirements here.
- Do not define domain terms here.
- If the decision is about what users should experience, put it in `product.md`.
- If the decision is about how the system should be designed or implemented, use an ADR.
- Reference product constraints when needed, but do not turn the ADR into product memory.

## Example

```md
# ADR 0001: Enforce Authorization Boundaries Server-Side

## Status

Proposed

## Context

The product has multiple permission levels. The system needs a technical boundary that prevents clients from reading or changing data outside the current user's permitted scope.

## Options Considered

1. Enforce boundaries only in the frontend
   - Pros: Simple to prototype.
   - Cons: Insufficient for protected data; backend APIs could still expose or mutate records too broadly.
2. Enforce boundaries in backend authorization and data access
   - Pros: Stronger control; safer default for protected workflows.
   - Cons: Requires explicit authorization rules and test coverage.
3. Use database-level access policies
   - Pros: Adds another enforcement layer close to the data.
   - Cons: Can make application behavior harder to reason about if not documented carefully.

## Decision

Use backend authorization and data-access boundaries as the minimum requirement. Consider database-level access policies if the permission model becomes complex enough to justify another enforcement layer.

## Rationale

Frontend-only controls are not appropriate for protected workflows. The backend must enforce permissions even when a client is buggy, stale, or malicious.

## Consequences

- Future features must use the shared authorization path.
- Tests should cover attempts to read or mutate data outside the current user's permitted scope.
- If database-level policies are added later, this ADR should be superseded or expanded.

## Follow-Up Questions

- Which permission checks belong in shared helpers versus feature-specific services?
- Should database-level policies be added now or deferred until the permission model stabilizes?
```
