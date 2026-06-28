# glossary.md Format

`glossary.md` contains domain language only.

Use it to define the product's domain terms so future agents and contributors use the same words consistently.

Do not store technical vocabulary or architecture notes here.

## Structure

```md
# Glossary

One or two sentences describing the domain language covered by this glossary.

## Terms

**Preferred Term**:
A one or two sentence definition of what the term means in this product.
_Avoid_: Ambiguous term, misleading synonym, overloaded word
```

Group terms under subheadings when useful.

## Rules

- Be opinionated. Pick one preferred term when multiple words could describe the same concept.
- Keep definitions tight: one or two sentences.
- Define what the term is, not how it is implemented.
- Include only product and domain terms.
- Exclude programming concepts, database terms, API terms, infrastructure terms, and architecture patterns.
- Use `_Avoid_` to prevent ambiguous or misleading language from spreading.

Before adding a term, ask:

> Is this a concept specific to this product domain, or a general technical concept?

Only domain concepts belong here.

## Example

```md
# Glossary

Shared domain language for this product.

## Core Concepts

**Primary Actor**:
The person or system that starts the main workflow.
_Avoid_: User, owner, requester

**Work Item**:
The main unit of work tracked by the product from creation to completion.
_Avoid_: Task, ticket, record

**Workflow State**:
The current meaningful stage of a work item from the product user's point of view.
_Avoid_: Status, flag, step

## Roles

**Reviewer**:
A supporting role that evaluates or approves a work item before it can proceed.
_Avoid_: Manager, operator, approver

**Workspace Member**:
A person who belongs to the same collaborative area of the product.
_Avoid_: Account user, teammate, seat

## Measurements

**Aggregate Metric**:
A measurement reported across a group or time period rather than a single identifiable item.
_Avoid_: Insight, detail, individual metric
```
