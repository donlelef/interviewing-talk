---
name: domain-modeling
description: Build and sharpen this project's domain model, product description, UI/UX design principles, architecture reference, and decision log. Use when discussing codebase terminology or product scope, writing or editing docs/GLOSSARY.md, docs/PRODUCT.md, docs/DESIGN.md (UI/UX), or docs/ARCHITECTURE.md, or recording or editing a technical or product decision in docs/decisions/.
---

# Domain Modeling

Actively build and sharpen the project's living documentation as you design: the domain glossary, the product, the design principles, the architecture, and the decision log behind them. This is the _active_ discipline: challenging terms, inventing edge-case scenarios, and writing things down the moment they crystallise. (Merely _reading_ these docs for vocabulary or context is not this skill: that's a one-line habit any skill can do. This skill is for when you're changing the model, not just consuming it.)

## The docs

What each document is for, and which one a fact belongs in, is in `AGENTS.md`, _Documents_; read it first. This skill covers `docs/GLOSSARY.md`, `docs/PRODUCT.md`, `docs/DESIGN.md`, `docs/ARCHITECTURE.md` and `docs/decisions/`, in these formats: [GLOSSARY-FORMAT.md](./GLOSSARY-FORMAT.md), [PRODUCT-FORMAT.md](./PRODUCT-FORMAT.md), [DESIGN-FORMAT.md](./DESIGN-FORMAT.md), [ARCHITECTURE-FORMAT.md](./ARCHITECTURE-FORMAT.md), [DECISION-FORMAT.md](./DECISION-FORMAT.md).

Create files lazily: only when you have something to write, not upfront.

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with the existing language in `docs/GLOSSARY.md`, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y. Which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account': do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code and other docs

When the user states how something works, check whether the code agrees, and whether the documents agree with each other. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible. Which is right?"

### Update the docs inline

When a term, a product rule, a design principle, or an architectural principle is resolved, update the document that owns it, per `AGENTS.md`, right there. Don't batch these up: capture them as they happen.

### Offer decision records sparingly

Offer to record a decision only when it meets the bar in [DECISION-FORMAT.md](./DECISION-FORMAT.md), _When to offer a decision record_, and write it in that format, which also covers updating the document the decision settles.
