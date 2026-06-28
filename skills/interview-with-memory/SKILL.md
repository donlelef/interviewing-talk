---
name: interview-with-memory
description: Interview a product owner one question at a time and turns answers into persistent repo memory. Use when clarifying product, domain language, architecture decisions, or agent operating rules before building software.
---

# Interview With Memory

Use this skill before planning or building software when the product, domain language, or technical direction is still ambiguous.

The goal is to interview the user, resolve one design branch at a time, and turn settled answers into a durable repo memory.

## Core Behavior

Interview the user before implementing.

- Ask one question at a time.
- Prefer concrete alternatives over open-ended brainstorming.
- Recommend one option and explain why.
- Explain trade-offs and risks in plain language.
- Wait for the user's answer before continuing.
- Do not invent decisions the user did not make.
- Make uncertainty explicit.
- Challenge fuzzy language and ask for sharper terms when needed.
- Discuss concrete scenarios when an answer is too abstract.
- Cross-reference existing repo memory before creating new terms or decisions.

## Memory Files

The target repo may use these memory files:

- `AGENTS.md`: the entry point future agents read first.
- `product.md`: product-only memory.
- `glossary.md`: domain-language-only memory.
- `docs/adr/`: technical-decision-only memory.

If the files do not exist, propose creating them. Ask for confirmation before writing substantial changes.

## How To Classify Answers

Classify each answer before writing it down.

| Answer Type | Write To |
| --- | --- |
| Product decision | `product.md` |
| Domain term | `glossary.md` |
| Technical decision | `docs/adr/` |
| Agent operating rule | `AGENTS.md` |
| Open question | Relevant file |

Keep boundaries strict:

- Do not put technical implementation details in `product.md`.
- Do not put architecture notes in `glossary.md`.
- Do not put product requirements in ADRs.
- Do not use `AGENTS.md` as a dumping ground for requirements.
- All memory documents must use terms consistently with `glossary.md`.

## AGENTS.md Guidance

`AGENTS.md` is the first thing future agents should read. It should explain the memory system and how to use it.

When creating or updating `AGENTS.md`, explain the memory files, their boundaries, and how future agents should use them before planning or coding.

Keep `AGENTS.md` concise. Its job is to point agents to the right memory files and define operating rules.

## Format Guides

Use these files when creating or updating memory:

- `PRODUCT-FORMAT.md` explains how to write `product.md`.
- `GLOSSARY-FORMAT.md` explains how to write `glossary.md`.
- `ADR-FORMAT.md` explains how to write ADRs under `docs/adr/`.

Read the relevant guide before editing the corresponding memory file.

## Interview Flow

Use this loop:

1. Read existing memory files if they exist.
2. Identify the highest-impact ambiguity.
3. Ask one question with 4 alternatives.
4. Recommend a default when useful.
5. Wait for the user's answer.
6. Classify the answer by memory file.
7. Propose the exact memory update.
8. Ask for confirmation before substantial edits.
9. Apply the update only after confirmation.
10. Continue with the next ambiguity.

If no stronger starting point exists, begin by asking which branch of repo memory should be clarified first: product scope, domain language, technical direction, or agent operating rules.
