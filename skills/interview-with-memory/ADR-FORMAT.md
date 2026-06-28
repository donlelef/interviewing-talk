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
# ADR 0001: Enforce HR Visibility Boundaries Server-Side

## Status

Proposed

## Context

The product limits HR visibility to aggregate metrics and operational status. The system needs a technical boundary that prevents HR-facing surfaces from accessing individual support details.

## Options Considered

1. Enforce boundaries only in the frontend
   - Pros: Simple to prototype.
   - Cons: Insufficient for sensitive data; backend APIs could still expose individual details.
2. Enforce boundaries in backend authorization and data access
   - Pros: Stronger control; safer default for sensitive data.
   - Cons: Requires explicit authorization rules and test coverage.
3. Store HR reporting data in a separate reporting model
   - Pros: Reduces accidental leakage from operational records.
   - Cons: Adds data synchronization and consistency concerns.

## Decision

Use backend authorization and data-access boundaries as the minimum requirement. Consider a separate reporting model if aggregate reporting becomes complex.

## Rationale

Frontend-only controls are not appropriate for sensitive psychological support data. The backend must prevent HR users from retrieving individual support details even if a UI or client bug occurs.

## Consequences

- Future HR-facing features must use authorization paths designed for HR visibility.
- Tests should cover attempts to access individual employee support details as an HR admin.
- Reporting features may later need a separate read model for aggregate metrics.

## Follow-Up Questions

- What minimum group size is required before an aggregate metric can be shown?
- Should identifiable support records and reporting data be stored separately from the beginning?
```
