# GLOSSARY.md Format

What `docs/GLOSSARY.md` is for is in [DOCUMENTS.md](./DOCUMENTS.md); this file defines its content.

## Structure

```md
# {Context Name}

{One or two sentence description of what this context is and why it exists.}

## Language

**Order**:
{A one or two sentence description of the term}
_Avoid_: Purchase, transaction

**Invoice**:
A request for payment sent to a customer after delivery.
_Avoid_: Bill, payment request

**Customer**:
A person or organization that places orders.
_Avoid_: Client, buyer, account
```

## Rules

- **Be opinionated.** When multiple words exist for the same concept, pick the best one and list the others under `_Avoid_`.
- **Keep definitions tight.** One or two sentences max. Define what it IS, not what it does.
- **Only include terms specific to this project's context.** General programming concepts (timeouts, error types, utility patterns) don't belong even if the project uses them extensively. Before adding a term, ask: is this a concept unique to this context, or a general programming concept? Only the former belongs.
- **Group terms under subheadings** when natural clusters emerge. If all terms belong to a single cohesive area, a flat list is fine.
- **Not a feature list.** Whether the product has a capability, and who can use it, belongs in `docs/PRODUCT.md`. This file only defines what the words mean.

## One file

The canonical glossary is always `docs/GLOSSARY.md`. Multiple business contexts are sections in that one file, so shared language and relationships remain visible together. When multiple contexts exist, infer which one the current topic relates to. If unclear, ask.
