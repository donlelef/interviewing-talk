# AI Agents as interviewers: a new way of building specs

This repository is a small, audience-facing demo kit for the talk **"AI Agents as interviewers: a new way of building specs."**

It is not a production app and it is not a starter template. It is a practical way to explore a different use of coding agents: before asking them to build software, ask them to interview you.

## The Core Idea

Coding agents are useful at writing code, but they are often asked to start too late in the thinking process. When a repo begins with vague instructions, the agent has to fill gaps with assumptions: who the product is for, what risks matter, which trade-offs are acceptable, and what language the team should use.

The result can look productive while quietly encoding the wrong product.

This repo argues for a different workflow:

> The value is not asking AI to write code faster.
> The value is using a coding agent to clarify the product, make decisions explicit, and build reusable project memory.

## Case Study

The demo uses a fictional product: an app for companies that offer an **employee psychological support desk**.

This is intentionally more ambiguous than a todo app. Even with only two product roles, it raises questions that cut across product, compliance, UX, and architecture:

- What can therapist-admins see before, during, and after an employee session?
- Should the sponsoring company receive any reporting, or is reporting out of scope?
- How should employee consent be handled?
- Who are the users: employee and admin, where admins are therapists?
- What happens when an employee reports an urgent or high-risk situation?
- Which decisions are product choices, and which are technical architecture choices?

The point is not to design a real mental health platform in this repo. The point is to show how much better a coding agent can work when it is allowed to ask structured questions before it writes code.

## What Is In This Repo

```text
README.md
LICENSE
prompts/
  level-1-generic-questions.md
  level-2-one-question-alternatives.md
  level-3-sparring-partner.md
skills/
  interview-with-memory/
    SKILL.md
    PRODUCT-FORMAT.md
    GLOSSARY-FORMAT.md
    ADR-FORMAT.md
```

This repo deliberately does **not** include `product.md`, `glossary.md`, `AGENTS.md`, or ADR files. Those belong in the target repository where the interview is being run.

## The Four Levels

### Level 1: Generic Questions

The first prompt asks the agent to "ask questions to understand the app."

This is better than jumping straight into code, but it is still weak. The agent may ask too many questions at once, mix product and technical concerns, and fail to help you decide what matters.

Prompt: [`prompts/level-1-generic-questions.md`](prompts/level-1-generic-questions.md)

### Level 2: One Question at a Time

The second prompt makes the conversation manageable. The agent must ask one question at a time, propose 3-5 alternatives, explain the implications, and wait before continuing.

This turns a vague requirements dump into a guided interview.

Prompt: [`prompts/level-2-one-question-alternatives.md`](prompts/level-2-one-question-alternatives.md)

### Level 3: Sparring Partner

The third prompt asks the agent to recommend a preferred option, explain why, and highlight trade-offs.

At this level the agent is no longer only collecting requirements. It becomes a product sparring partner that helps you turn ambiguity into decisions.

Prompt: [`prompts/level-3-sparring-partner.md`](prompts/level-3-sparring-partner.md)

### Level 4: Interview With Memory

The fourth level uses a portable Cursor skill:

[`skills/interview-with-memory/SKILL.md`](skills/interview-with-memory/SKILL.md)

The skill tells the agent how to interview a founder or product owner one question at a time, then turn answers into persistent repo memory:

- `AGENTS.md` for how future agents should use the repo memory.
- `product.md` for product-only information.
- `glossary.md` for domain terms only.
- `docs/adr/` for technical decisions only.

The skill also includes format guides:

- [`skills/interview-with-memory/PRODUCT-FORMAT.md`](skills/interview-with-memory/PRODUCT-FORMAT.md)
- [`skills/interview-with-memory/GLOSSARY-FORMAT.md`](skills/interview-with-memory/GLOSSARY-FORMAT.md)
- [`skills/interview-with-memory/ADR-FORMAT.md`](skills/interview-with-memory/ADR-FORMAT.md)

## Comparison

| Level | Prompt Style | What Improves | Main Limitation |
| --- | --- | --- | --- |
| 1 | Generic "ask me questions" | Starts a conversation before coding | Questions are often broad, unordered, and hard to answer |
| 2 | One question at a time with alternatives | Makes the interview easier to complete | The agent still avoids making judgment calls |
| 3 | Alternatives plus motivated recommendation | Adds trade-off analysis and product judgment | Decisions may still disappear after the chat ends |
| 4 | Interview plus persistent memory | Turns answers into reusable repo context | Requires discipline about what belongs in each memory file |

## How To Use This Repo

Use this repo as a self-guided exercise in a separate target repository.

1. Pick a repo where you want to explore a product idea.
2. Copy one of the prompt files from `prompts/` into Cursor.
3. Run the interview and answer as the product owner.
4. Compare how the conversation changes from level 1 to level 3.
5. For level 4, copy `skills/interview-with-memory/` into the target repo at `.cursor/skills/interview-with-memory/`.
6. Ask Cursor to use the `interview-with-memory` skill before building.
7. Let the agent create or update memory files in the target repo after confirming substantial changes.

The useful observation is not whether the agent writes code. The useful observation is whether the repo becomes clearer after the conversation.

## How This Maps To The Talk

The talk shows a progression:

1. A coding agent executes vague instructions and produces plausible but fragile output.
2. The same agent asks generic questions and improves slightly.
3. A structured prompt makes the interview easier to answer.
4. An opinionated prompt turns the agent into a sparring partner.
5. A skill turns interview answers into durable project memory.

The repository is designed so audience members can replay that progression after the talk, using their own product or the employee psychological support desk case study.

## References And Inspirations

- [Cursor Docs](https://cursor.com/docs)
- [AGENTS.md](https://agents.md/)
- [Compound Engineering plugin](https://github.com/EveryInc/compound-engineering-plugin)
- [Compound Engineering README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)
- [Matt Pocock / AI Hero - grill-with-docs](https://www.aihero.dev/grill-with-docs)
- [Superpowers](https://github.com/obra/superpowers)
- [Superpowers brainstorming skill](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md)
