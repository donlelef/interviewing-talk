# Q&A Board

A tiny live Q&A board: the audience asks the speaker questions and everyone
sees the list.

It is the sample app for the talk **AI Agents as interviewers: a new way of
building specs**. The talk itself, its prompts, and the demo script are in
[`talk/`](talk/README.md).

## Run

Requires [Bun](https://bun.sh) 1.3 or later. There is nothing to install.

```bash
bun run dev
```

Open the URL it prints (default `http://localhost:3000`). Set `PORT` to use
another port and `DB_PATH` to use another database file.

## Test

```bash
bun test
```

## Reset local data

Questions are stored in `qa-board.sqlite`. Delete it, for example after
switching to a branch with a different schema:

```bash
bun run reset
```

## Repository map

```text
src/server.ts         entry point
src/app.ts            HTTP routes
src/questions.ts      question store (bun:sqlite)
src/index.html        page, with client.ts and styles.css
tests/                bun test suites
.agents/skills/       agent skills (Claude Code reads them via .claude/skills/)
talk/                 the talk: narrative, prompts, demo script
```
