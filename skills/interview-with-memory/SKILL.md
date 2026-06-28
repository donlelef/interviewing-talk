---
name: interview-with-memory
description: Interviews a founder or product owner one question at a time and turns answers into persistent repo memory. Use when clarifying product, domain language, architecture decisions, or agent operating rules before building software.
---

# Interview With Memory

Use this skill before planning or building software when the product, domain language, or technical direction is still ambiguous.

The goal is to interview the user, resolve one design branch at a time, and turn settled answers into thin, durable repo memory.

## Core Behavior

Interview the user before implementing.

- Ask exactly one question at a time.
- Prefer concrete alternatives over open-ended brainstorming.
- When useful, recommend one option and explain why.
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

| Answer Type | Write To | Examples |
| --- | --- | --- |
| Product decision | `product.md` | User roles, value proposition, scope, functional behavior |
| Domain term | `glossary.md` | Project-specific terms, preferred names, avoided synonyms |
| Technical decision | `docs/adr/` | Hard-to-reverse architecture choices with trade-offs |
| Agent operating rule | `AGENTS.md` | How future agents should read and respect repo memory |
| Open question | Relevant file | Unresolved product, language, or technical uncertainty |

Keep boundaries strict:

- Do not put technical implementation details in `product.md`.
- Do not put architecture notes in `glossary.md`.
- Do not put product requirements in ADRs.
- Do not use `AGENTS.md` as a dumping ground for requirements.

## AGENTS.md Guidance

`AGENTS.md` is the first thing future agents should read. It should explain the memory system and how to use it.

When creating or updating `AGENTS.md`, include:

```md
# Agent Instructions

This repo uses persistent memory files to keep product, domain, and technical decisions explicit.

Before planning or coding:

1. Read `product.md` for product context, users, value proposition, scope, and functional choices.
2. Read `glossary.md` for domain language. Use these terms consistently.
3. Read relevant ADRs in `docs/adr/` for technical decisions and constraints.
4. If a requested change conflicts with existing memory, ask before changing direction.

Memory boundaries:

- `product.md` is for product information only. Do not store implementation details there.
- `glossary.md` is for domain terms only. Do not store technical vocabulary there.
- `docs/adr/` is for technical decisions only. Do not store product requirements there.

Domain sensitivity:

- Treat sensitive domain data as sensitive.
- Do not add product roles, workflows, or technical constraints unless the product owner explicitly decides them.
- If a request conflicts with documented memory, stop and ask which direction should win.
- When the domain has compliance, safety, privacy, or trust implications, clarify them before implementation.
```

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
3. Ask one question with 3-5 alternatives.
4. Recommend a default when useful.
5. Wait for the user's answer.
6. Classify the answer by memory file.
7. Propose the exact memory update.
8. Ask for confirmation before substantial edits.
9. Apply the update only after confirmation.
10. Continue with the next ambiguity.

## First Question

If no stronger starting point exists, begin with the highest-impact ambiguity:

```text
Before we design anything else, what is the most important decision this repo memory should clarify?

Options:

1. Product scope: who the product serves, what it does, and what is out of scope.
2. Domain language: what terms the team should use, and which terms are ambiguous or misleading.
3. Technical direction: a hard-to-reverse implementation or architecture choice.
4. Agent operating rules: how future coding agents should read, preserve, and update repo memory.

My preference is to start with product scope unless the user already named a specific technical decision. Product scope usually determines which language and architecture decisions matter.

Which branch should we resolve first?
```
