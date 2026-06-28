# product.md Format

`product.md` contains product memory only.

Use it to preserve what the product is, who it serves, what value it promises, how it behaves, what is in scope, and what is intentionally out of scope.

Do not store technical implementation details here.

## Structure

```md
# Product Memory

One or two sentences describing the product and why it exists.

## Users

- **User type**: What this user needs from the product.

## Value Proposition

What value the product provides, and to whom.

## Usage Modes

- How users enter, use, and return to the product.

## Functional Choices

- Product decision: rationale or implication.

## Scope

### In Scope

- Things the product is expected to support.

### Out Of Scope

- Things the product intentionally does not support.

## Product Constraints

- Privacy, trust, operational, legal, or business constraints that shape the product.

## Open Questions

- Unresolved product questions that need future clarification.
```

## Rules

- Keep this file product-only.
- Include users, value proposition, usage modes, functional behavior, scope, non-goals, constraints, and open questions.
- Do not include database choices, frameworks, API design, infrastructure, schema details, or security implementation mechanisms.
- If a decision explains what the product should do, it belongs here.
- If a decision explains how the system should be built, it belongs in an ADR.
- If a term needs a shared definition, put the definition in `glossary.md` and reference the term here.

## Example

```md
# Product Memory

This product helps a clearly defined user group accomplish a specific outcome in a repeatable workflow.

## Users

- **Primary user**: The main user whose problem the product solves.
- **Secondary user**: A supporting user who configures, reviews, approves, or manages part of the workflow.

## Value Proposition

The product reduces a specific pain, creates a specific benefit, or makes a recurring workflow easier to complete.

## Usage Modes

- A user can start the main workflow from an empty state.
- A returning user can resume or review previous work.
- A supporting user can manage the parts of the workflow they are responsible for.

## Functional Choices

- The first version supports the core workflow only.
- Advanced reporting is out of scope until the main workflow is validated.
- User roles should not be added unless their product responsibility is clear.

## Product Constraints

- The product should optimize for clarity over configurability in the first version.
- Sensitive or irreversible user actions require explicit confirmation.
- Product decisions should be understandable without reading technical architecture notes.

## Open Questions

- Which user role owns the main workflow?
- What is intentionally out of scope for the first version?
- What user action would be costly or risky to reverse?
```
