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
