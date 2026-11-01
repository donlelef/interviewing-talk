import { Database } from "bun:sqlite";

export const MAX_QUESTION_LENGTH = 280;

export type Question = {
  id: number;
  text: string;
  askedAt: string;
  votes: number;
};

export type QuestionStore = ReturnType<typeof openQuestionStore>;

export class InvalidQuestionError extends Error {}

export function openQuestionStore(path = ":memory:") {
  const db = new Database(path, { create: true, strict: true });
  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      asked_at TEXT NOT NULL,
      votes INTEGER NOT NULL DEFAULT 0
    )
  `);

  const insert = db.query<Question, { text: string; askedAt: string }>(
    "INSERT INTO questions (text, asked_at) VALUES ($text, $askedAt) RETURNING id, text, asked_at AS askedAt, votes",
  );
  const selectAll = db.query<Question, []>(
    "SELECT id, text, asked_at AS askedAt, votes FROM questions ORDER BY votes DESC, id DESC",
  );
  const incrementVotes = db.query<Question, { id: number }>(
    "UPDATE questions SET votes = votes + 1 WHERE id = $id RETURNING id, text, asked_at AS askedAt, votes",
  );

  return {
    ask(rawText: string): Question {
      const text = rawText.trim();
      if (text.length === 0) throw new InvalidQuestionError("A question cannot be empty.");
      if (text.length > MAX_QUESTION_LENGTH) {
        throw new InvalidQuestionError(`A question can be at most ${MAX_QUESTION_LENGTH} characters.`);
      }
      return insert.get({ text, askedAt: new Date().toISOString() })!;
    },
    list(): Question[] {
      return selectAll.all();
    },
    upvote(id: number): Question | null {
      return incrementVotes.get({ id });
    },
  };
}
