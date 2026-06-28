# product.md Format

`product.md` contains product memory only.

Use it to preserve what the product is and what users need to do with it.

Do not store technical implementation details here.

## Structure

```md
# Product Memory

## Introduction

A short explanation of what the product is, who it is for, and why it exists.

Use terms exactly as defined in `glossary.md`.

## User Stories

1. As a **Glossary Term**, I want to..., so that.... Explain also the trade-offs and what is explicitly out of scope or forbidden.
```

## Rules

- Keep this file product-only.
- Write an introduction, then a set of user stories.
- User stories should describe user goals and product behavior.
- Use only terms that match `glossary.md`. If a needed term is missing or unclear, update `glossary.md` first.
- Do not include database choices, frameworks, API design, infrastructure, schema details, or security implementation mechanisms.
- If a decision explains what the product should do for a user, it belongs here.
- If a decision explains how the system should be built, it belongs in an ADR.
