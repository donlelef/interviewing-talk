# AI Agents as interviewers: a new way of building specs

Coding agents are getting very good at writing code. But in many projects, we invite them into the work only after the most important thinking has already gone wrong. Or only lies in our heads.

If the starting point is vague, the agent does not stop. It fills the gaps: who the product is for, what risks matter, which trade-offs are acceptable, and which words the team should use. The output can look impressive while quietly encoding the wrong assumptions.

This is why faster code generation is not always the real win. Andrew Murphy makes this point well in ["If you thought the speed of writing code was your problem - you have bigger problems"](https://andrewmurphy.io/blog/if-you-thought-the-speed-of-writing-code-was-your-problem-you-have-bigger-problems): if we do not know what to build, moving faster mostly means guessing faster.

It also connects to [GitHub Spec Kit](https://github.com/github/spec-kit), which puts specs at the center of AI-assisted software development. Spec Kit shows how structured specs can drive planning and implementation. This talk asks the step before that: how do we write better specs in the first place?

The answer explored here is simple: before asking the agent to build, ask it to interview. The product engieers building the product know the answers. They should only be asked the right questions.

> The value is not only asking AI to write code.
> The value lies also in using coding agents to clarify the product, make decisions explicit, and build reusable project memory.

## Case Study

The demo uses a fictional product: an app to manage **employee psychological support desks**.

The app has only two roles:

- **Employees** request psychological support, book sessions, and manage the information they share.
- **Admins** are therapists. They manage availability, appointments, and the support context needed to provide care.

The sponsoring company is the buyer of the benefit, but it is not a product role unless the product owner explicitly decides to add company-facing reporting later.

This is intentionally more ambiguous than a simple todo app. Even with these simplifications, the design raises many questions that cut across product, compliance, UX, and architecture:

- What can therapist-admins see before, during, and after an employee session?
- Should the sponsoring company receive any reporting, or is reporting out of scope?
- How should employee consent be handled?
- Should the product ever add another role, or stay limited to employees and therapist-admins?

The point is not to design a real mental health platform: we will write no code. The point is to show how much better a coding agent can work when it is allowed to ask structured questions before it writes code.

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

This repo deliberately does **not** include `product.md`, `glossary.md`, `AGENTS.md`, or ADR files. Those are generated in the target repository where the interview is being run.

## The Four Levels

The goal of this session is to learn how to be interviewed by coding agents. Each level changes the shape of the conversation: from vague questions, to structured alternatives, to motivated trade-offs, to persistent repo memory.

### Level 1: Generic Questions

The first prompt asks the agent to "ask questions to understand the app."

This is better than jumping straight into code, but it is still weak. The agent may ask too many questions at once, mix product and technical concerns, and fail to help you decide what matters.

Prompt: [`prompts/level-1-generic-questions.md`](prompts/level-1-generic-questions.md)

### Level 2: One Question at a Time

The second prompt makes the conversation manageable. The agent must ask one question at a time, propose alternatives, and wait for answers before continuing.

Prompt: [`prompts/level-2-one-question-alternatives.md`](prompts/level-2-one-question-alternatives.md)

### Level 3: Sparring Partner

The third prompt asks the agent to recommend a preferred option, explain why, and highlight trade-offs.

At this level the agent is no longer only collecting requirements. It becomes a product sparring partner that helps you turn ambiguity into decisions.

Prompt: [`prompts/level-3-sparring-partner.md`](prompts/level-3-sparring-partner.md)

### Level 4: Interview With Memory

The fourth level uses a portable Cursor skill:

[`skills/interview-with-memory/SKILL.md`](skills/interview-with-memory/SKILL.md)

The skill tells the agent how to interview a product owner or engineer one question at a time, then turn answers into persistent repo memory:

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

## 5. Related Implementations of Level 4

This repo's level 4 is not a unique trick. It is a small and improvised implementation of a pattern that is appearing in several agent workflows: interview the human, resolve ambiguity, and write durable context before implementation.

- [Matt Pocock's skills](https://github.com/mattpocock/skills) includes [`grill-with-docs`](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md), a repo-aware interview skill that sharpens domain language and records decisions in docs such as `CONTEXT.md` and ADRs.
- [Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin) includes [`ce:brainstorm`](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/skills/ce-brainstorm/SKILL.md), which uses collaborative dialogue to define what should be built and capture a requirements document before planning implementation.
- [Superpowers](https://github.com/obra/superpowers) includes [`brainstorming`](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md), a Socratic design workflow that turns rough ideas into an approved design document before moving to planning.

In other words, Matt Pocock's `grill-with-docs`, Compound Engineering's `ce:brainstorm`, and Superpowers' `brainstorming` are all implementations of the same level 4 idea: the agent should help create durable, reusable project context before it writes code.

## References And Inspirations

- [Cursor Docs](https://cursor.com/docs)
- [AGENTS.md](https://agents.md/)
- [Compound Engineering plugin](https://github.com/EveryInc/compound-engineering-plugin)
- [Compound Engineering README](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/README.md)
- [Matt Pocock skills](https://github.com/mattpocock/skills)
- [Andrew Murphy - If you thought the speed of writing code was your problem, you have bigger problems](https://andrewmurphy.io/blog/if-you-thought-the-speed-of-writing-code-was-your-problem-you-have-bigger-problems)
- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [Superpowers](https://github.com/obra/superpowers)
- [Superpowers brainstorming skill](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md)
