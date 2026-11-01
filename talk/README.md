# AI Agents as interviewers: a new way of building specs

Coding agents are getting very good at writing code. But in many projects, we invite them into the work only after the most important thinking has already gone wrong. Or only lies in our heads.

If the starting point is vague, the agent does not stop. It fills the gaps: who the feature is for, what risks matter, which trade-offs are acceptable, and which words the team should use. The output can look impressive while quietly encoding the wrong assumptions.

This is why faster code generation is not always the real win. Andrew Murphy makes this point well in ["If you thought the speed of writing code was your problem - you have bigger problems"](https://andrewmurphy.io/blog/if-you-thought-the-speed-of-writing-code-was-your-problem-you-have-bigger-problems): if we do not know what to build, moving faster mostly means guessing faster.

It also connects to [GitHub Spec Kit](https://github.com/github/spec-kit), which puts specs at the center of AI-assisted software development. Spec Kit shows how structured specs can drive planning and implementation. This talk asks the step before that: how do we write better specs in the first place?

The answer explored here is simple: before asking the agent to build, ask it to interview. The product engineers building the product know the answers. They should only be asked the right questions.

> The value is not only asking AI to write code.
> The value lies also in using coding agents to clarify the product, make decisions explicit, and build reusable project memory.

## Case Study

The demo is the app at the root of this repository: a tiny **Q&A board** where the audience asks the speaker questions and everyone sees the list. It is the app the audience can use during the talk.

Today it does one thing: ask a question and see it listed, newest first. The task for the whole talk is one line:

> Add upvoting to questions.

It sounds like twenty lines of code. It hides a dozen product decisions: who an upvoter is when there is no login, whether someone can upvote twice or take an upvote back, whether the list reorders, whether you can upvote your own question, and which word the team uses for all of this. An agent that is not asked will make each of these calls silently. The full list is in [`DEMO.md`](DEMO.md#the-hidden-ambiguity).

The app is deliberately small: [Bun](https://bun.sh), no dependencies, `bun:sqlite`, one page. Everyone understands the domain in five seconds, so the room can focus on the method.

### Branches

Each branch freezes the repository at one moment of the talk, so you can open any step without replaying the ones before it:

```text
main ──┬── demo/naive-upvote                      level 0 on main
       └── demo/grilled ── demo/informed-upvote   level 4, then level 0 again
```

| Branch | What it represents | What is in it |
| --- | --- | --- |
| `main` | The starting point, before the task. | Ask a question and see it listed, newest first. `AGENTS.md` and the skills are there, but `docs/` is empty: the project has no memory of product decisions yet. |
| `demo/naive-upvote` | [Level 0](#level-0-just-build): what an agent builds when nobody interviews it. | `main` plus the level 0 prompt, run with no questions asked. Upvoting works, but every decision is a silent guess: anyone can upvote the same question again and again, including their own, and nothing records why. |
| `demo/grilled` | [Level 4](#level-4-grill-with-docs): the project memory an interview leaves behind. | `main` plus the `docs/` written by a `/grill-with-docs` session on upvoting: product, glossary, architecture, and one decision. No code changes. |
| `demo/informed-upvote` | The payoff: the same prompt as level 0, now with memory. | `demo/grilled` plus the level 0 prompt run again. The agent follows the docs: one Upvote per Attendee, which they can take back, never on their own Question, most Upvoted first. |

The prompt behind `demo/naive-upvote` and `demo/informed-upvote` is word for word the same. The only difference is the `docs/` on `demo/grilled`, so comparing those two branches shows what the interview was worth.

## The Method Works In Any Agent

Nothing here depends on one tool. The demo runs in Claude Code; the same repository works in Codex, Cursor, and other agents:

- [`AGENTS.md`](../AGENTS.md) holds the rules and says what each document is for. [`CLAUDE.md`](../CLAUDE.md) only imports it.
- The skills follow the [Agent Skills](https://agentskills.io) `SKILL.md` format and live in [`.agents/skills/`](../.agents/skills/). Claude Code reads them through symlinks in `.claude/skills/`; Codex reads `agents/openai.yaml` beside each skill.
- Levels 0 to 3 are plain prompts you can paste anywhere.

Claude Code adds a few conveniences on stage, such as rendering a multiple-choice question as clickable options, but the method does not need them.

## The Levels

Each level changes the shape of the conversation: from no questions, to vague questions, to structured alternatives, to motivated trade-offs, to a persistent project memory.

### Level 0: Just Build

Prompt: [`prompts/level-0-just-build.md`](prompts/level-0-just-build.md)

The agent writes code at once. It works, and it encodes guesses nobody approved. The result is kept on the `demo/naive-upvote` branch.

### Level 1: Generic Questions

Prompt: [`prompts/level-1-generic-questions.md`](prompts/level-1-generic-questions.md)

The agent asks questions before coding. That is better, but it tends to ask too many at once, mix product and technical concerns, and leave you to decide what matters.

### Level 2: One Question at a Time

Prompt: [`prompts/level-2-one-question-alternatives.md`](prompts/level-2-one-question-alternatives.md)

One question at a time, with alternatives and their implications. The interview becomes easy to complete, but the agent still avoids making judgment calls.

### Level 3: Sparring Partner

Prompt: [`prompts/level-3-sparring-partner.md`](prompts/level-3-sparring-partner.md)

The agent recommends an option, explains why, and names the trade-offs. It looks facts up in the code itself and asks only for decisions. It is now a sparring partner, but the decisions disappear when the chat ends.

### Level 4: Grill With Docs

Skill: [`/grill-with-docs`](../.agents/skills/grill-with-docs/SKILL.md), which combines two skills:

- [`grilling`](../.agents/skills/grilling/SKILL.md) maps the work as a **design tree** and asks it in **rounds**. Each round asks every question whose prerequisites are already settled, numbered and with a recommended answer. Dependent questions wait for the next round. This is the step after level 3: independent questions come together, so the interview is faster without guessing.
- [`domain-modeling`](../.agents/skills/domain-modeling/SKILL.md) writes down what the interview settles the moment it is settled. It challenges terms against the glossary, sharpens fuzzy language, and stress-tests rules with concrete scenarios.

The documents it creates, only when there is something to write, are defined once in [`AGENTS.md`](../AGENTS.md#documents):

| Document | Holds |
| --- | --- |
| `docs/PRODUCT.md` | What the product does, for whom, and what it deliberately does not do |
| `docs/GLOSSARY.md` | What each domain term means, and which words to avoid |
| `docs/DESIGN.md` | Interface principles that hold on every screen |
| `docs/ARCHITECTURE.md` | The structure of the system and principles that hold throughout |
| `docs/decisions/` | Why the decisions still in effect were made |

Two rules keep the memory useful: **write only what matters** (a fact the code cannot tell a future reader) and **one fact, one place** (link instead of restating). A decision is recorded only when it is hard to reverse, surprising without context, and the result of a real trade-off.

The interview's output is kept on `demo/grilled`. Running level 0's prompt again on top of it gives `demo/informed-upvote`. Comparing it with `demo/naive-upvote` is the point of the talk.

## Comparison

| Level | Prompt Style | What Improves | Main Limitation |
| --- | --- | --- | --- |
| 0 | "Add upvoting" | Fast | Every product decision is a silent guess |
| 1 | Generic "ask me questions" | Starts a conversation before coding | Questions are broad, unordered, and hard to answer |
| 2 | One question at a time with alternatives | Makes the interview easy to complete | The agent still avoids making judgment calls |
| 3 | Alternatives plus motivated recommendation | Adds trade-off analysis and product judgment | Decisions disappear after the chat ends |
| 4 | Design-tree rounds plus living docs | Turns answers into reusable repo memory | Requires discipline about what belongs in each document |

## Related Implementations of Level 4

Level 4 is a pattern that is appearing in several agent workflows: interview the human, resolve ambiguity, and write durable context before implementation.

- [Matt Pocock's skills](https://github.com/mattpocock/skills) include `grill-with-docs`, `grilling`, and `domain-modeling`. The skills in this repository are adapted from them (see [notices](../.agents/skills/THIRD-PARTY-NOTICES.md)).
- [Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin) includes [`ce:brainstorm`](https://github.com/EveryInc/compound-engineering-plugin/blob/main/plugins/compound-engineering/skills/ce-brainstorm/SKILL.md), which uses collaborative dialogue to define what should be built and capture a requirements document before planning implementation.
- [Superpowers](https://github.com/obra/superpowers) includes [`brainstorming`](https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md), a Socratic design workflow that turns rough ideas into an approved design document before moving to planning.

## Running The Demo

The run of show, the branches, and the backup answers for the interview are in [`DEMO.md`](DEMO.md).

## References And Inspirations

- [AGENTS.md](https://agents.md/)
- [Agent Skills](https://agentskills.io)
- [Claude Code skills](https://code.claude.com/docs/en/skills)
- [Codex skills](https://developers.openai.com/codex/skills)
- [Cursor Docs](https://cursor.com/docs)
- [Matt Pocock skills](https://github.com/mattpocock/skills)
- [Compound Engineering plugin](https://github.com/EveryInc/compound-engineering-plugin)
- [Superpowers](https://github.com/obra/superpowers)
- [Andrew Murphy - If you thought the speed of writing code was your problem, you have bigger problems](https://andrewmurphy.io/blog/if-you-thought-the-speed-of-writing-code-was-your-problem-you-have-bigger-problems)
- [GitHub Spec Kit](https://github.com/github/spec-kit)
