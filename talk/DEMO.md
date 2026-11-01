# Demo Script

## Branches

What each branch represents is in the [README](README.md#branches). `demo/grilled` holds the docs from the [backup answers](#backup-answers) below.

Every demo branch is a fallback: if a live step goes wrong, switch to its branch and carry on. Run `bun run reset` after every switch, because the branches use different database schemas.

## Before The Talk

```bash
git switch main
bun run reset
bun run dev
```

Bun listens on every interface, so the audience can open `http://<your-ip>:3000` on the same network (`ipconfig getifaddr en0` on macOS). Ask them to post a few questions while you introduce the talk: the board fills up with real data for the upvoting demo.

## Run Of Show

1. **Level 0, just build.** Start a fresh agent session on a scratch branch from `main` and paste [`prompts/level-0-just-build.md`](prompts/level-0-just-build.md). Fallback: `git switch demo/naive-upvote`. Ask the room: can you upvote twice? Can you upvote your own question? What is an upvoter?
2. **Levels 1 to 3.** On `main`, paste each prompt in a fresh session and stop after two or three questions. Discard the sessions: nothing is written.
3. **Level 4, grill with docs.** On a scratch branch from `main`, run `/grill-with-docs Add upvoting to questions.` and let the audience answer each round. Watch `docs/` fill in. Fallback: `git switch demo/grilled`.
4. **Payoff.** In a fresh session on top of the grilled docs, paste the level 0 prompt again. Fallback: `git switch demo/informed-upvote`. Compare the two builds:

   ```bash
   git diff demo/naive-upvote demo/informed-upvote -- src tests
   ```

5. **Portability.** Open the same checkout in Codex or Cursor and ask: "What should I know before changing how upvotes work?" The answer comes from `AGENTS.md` and `docs/`, not from the chat that produced them.

## The Hidden Ambiguity

"Add upvoting to questions." leaves all of these open. The naive build picks a default for each without asking.

- **Who upvotes.** There is no login. Is an upvoter an anonymous browser, a nickname, or a signed-in person?
- **Own questions.** Can the person who asked a question upvote it?
- **How many.** One upvote per person per question, or unlimited clicks?
- **Undo.** Can an upvote be taken back?
- **Downvotes.** "Upvoting" implies none, but agents often add them.
- **Budget.** Can someone upvote every question, or only a few?
- **Ordering.** Do upvotes reorder the list, or is the count only shown?
- **Visibility.** Does everyone see the counts? Does each person see what they upvoted?
- **Answered questions.** Do they keep their upvotes, drop to the bottom, or stop taking upvotes?
- **Moderation and duplicates.** What happens to upvotes on a hidden or merged question?
- **Abuse.** Is a browser cookie good enough for a friendly room?
- **Language.** Vote, upvote, like, or +1? User, participant, or attendee?

## Backup Answers

If the room is quiet, these are the answers `demo/grilled` was written from:

| Question | Answer |
| --- | --- |
| Who upvotes? | An anonymous Attendee, recognised by their browser. No login. |
| Can someone upvote twice? | No: one Upvote per Attendee per Question. |
| Can an Upvote be taken back? | Yes, by pressing again. |
| Downvotes? | No. |
| A budget of Upvotes? | No. |
| Own Questions? | No: an Attendee cannot upvote a Question they asked. |
| Ordering? | Most Upvotes first; ties keep the earlier Question first. |
| Who sees the counts? | Everyone. Each Attendee also sees which Questions they upvoted. |
| A new browser can upvote again. Acceptable? | Yes, for a friendly room. |
| Answered questions, moderation, duplicates? | Out of scope for now. |
| Which words? | Question, Attendee, Upvote, Speaker. |
