---
name: interview-with-memory
description: Interviews a founder or product owner one question at a time and turns answers into persistent repo memory. Use when clarifying product, domain language, architecture decisions, or agent operating rules before building software.
---

# Interview With Memory

Use this skill before planning or building software when the product is still ambiguous.

The running example for this skill is an employee psychological support desk: a product where companies offer employees access to psychological support, appointments, therapists, possible case managers, aggregate reporting, consent flows, and privacy-sensitive workflows.

## Core Behavior

Interview the user before implementing.

- Ask exactly one question at a time.
- Prefer concrete alternatives over open-ended brainstorming.
- When useful, recommend one option and explain why.
- Explain trade-offs and risks in plain language.
- Wait for the user's answer before continuing.
- Do not invent decisions the user did not make.
- Make uncertainty explicit.
- Treat privacy, sensitive data, consent, HR visibility, and urgent psychological risk as first-class concerns.

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
| Product decision | `product.md` | HR sees only aggregate metrics; employees can self-book first sessions |
| Domain term | `glossary.md` | Employee, therapist, case manager, aggregate metric, urgent case |
| Technical decision | `docs/adr/` | Enforce HR access boundaries server-side; separate identifiable data from reporting data |
| Agent operating rule | `AGENTS.md` | Read product memory before coding; never expose individual clinical details to HR |
| Open question | Relevant file | Whether a case manager exists; whether emergency escalation is in scope |

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

- Treat psychological support data as sensitive.
- Do not assume HR can see individual employee details.
- Prefer aggregate reporting unless the product owner explicitly decides otherwise.
- Escalation, crisis, or urgent-risk behavior must be clarified before implementation.
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

## First Question For This Domain

If no stronger starting point exists, begin here:

```text
Before we design anything else, what should the company or HR admin be allowed to see about employee use of the psychological support desk?

Options:

1. Operational status only: eligibility, booking status, and usage counts, but no individual wellbeing or session details.
2. Aggregate reporting only: trends across groups when the group is large enough, with no individual-level visibility.
3. Limited individual workflow visibility: HR can see that support is active for an employee, but not why or what is discussed.
4. Broad HR visibility: HR can see individual reasons, notes, or outcomes.

My preference is option 2, with option 1 for operational workflows. It protects employee trust while still giving the company enough information to understand adoption. Option 4 is high-risk and should be avoided unless there is a very specific legal and product reason.

Which option matches your intended product?
```
