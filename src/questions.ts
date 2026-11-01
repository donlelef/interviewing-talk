import { Database } from "bun:sqlite";

export const MAX_QUESTION_LENGTH = 280;

export type Question = {
  id: number;
  text: string;
  askedAt: string;
  upvotes: number;
  askedByMe: boolean;
  upvotedByMe: boolean;
};

type QuestionRow = Omit<Question, "askedByMe" | "upvotedByMe"> & { askedByMe: number; upvotedByMe: number };

export type QuestionStore = ReturnType<typeof openQuestionStore>;

export class InvalidQuestionError extends Error {}
export class QuestionNotFoundError extends Error {}
export class OwnQuestionUpvoteError extends Error {}

export function openQuestionStore(path = ":memory:") {
  const db = new Database(path, { create: true, strict: true });
  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      asked_at TEXT NOT NULL,
      attendee_id TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS upvotes (
      question_id INTEGER NOT NULL REFERENCES questions (id),
      attendee_id TEXT NOT NULL,
      PRIMARY KEY (question_id, attendee_id)
    )
  `);

  const insertQuestion = db.query<{ id: number }, { text: string; askedAt: string; attendeeId: string }>(
    "INSERT INTO questions (text, asked_at, attendee_id) VALUES ($text, $askedAt, $attendeeId) RETURNING id",
  );
  const selectQuestions = db.query<QuestionRow, { attendeeId: string }>(`
    SELECT
      q.id,
      q.text,
      q.asked_at AS askedAt,
      COUNT(u.attendee_id) AS upvotes,
      q.attendee_id = $attendeeId AS askedByMe,
      COALESCE(MAX(u.attendee_id = $attendeeId), 0) AS upvotedByMe
    FROM questions q
    LEFT JOIN upvotes u ON u.question_id = q.id
    GROUP BY q.id
    ORDER BY upvotes DESC, q.id ASC
  `);
  const selectAsker = db.query<{ attendeeId: string }, { id: number }>(
    "SELECT attendee_id AS attendeeId FROM questions WHERE id = $id",
  );
  const insertUpvote = db.query<never, { questionId: number; attendeeId: string }>(
    "INSERT OR IGNORE INTO upvotes (question_id, attendee_id) VALUES ($questionId, $attendeeId)",
  );
  const deleteUpvote = db.query<never, { questionId: number; attendeeId: string }>(
    "DELETE FROM upvotes WHERE question_id = $questionId AND attendee_id = $attendeeId",
  );

  function list(attendeeId: string): Question[] {
    return selectQuestions.all({ attendeeId }).map((row) => ({
      ...row,
      askedByMe: row.askedByMe === 1,
      upvotedByMe: row.upvotedByMe === 1,
    }));
  }

  function askerOf(questionId: number) {
    const question = selectAsker.get({ id: questionId });
    if (!question) throw new QuestionNotFoundError("Question not found.");
    return question.attendeeId;
  }

  return {
    ask(attendeeId: string, rawText: string): Question {
      const text = rawText.trim();
      if (text.length === 0) throw new InvalidQuestionError("A question cannot be empty.");
      if (text.length > MAX_QUESTION_LENGTH) {
        throw new InvalidQuestionError(`A question can be at most ${MAX_QUESTION_LENGTH} characters.`);
      }
      const { id } = insertQuestion.get({ text, askedAt: new Date().toISOString(), attendeeId })!;
      return list(attendeeId).find((question) => question.id === id)!;
    },
    list,
    upvote(attendeeId: string, questionId: number) {
      if (askerOf(questionId) === attendeeId) {
        throw new OwnQuestionUpvoteError("You cannot upvote your own question.");
      }
      insertUpvote.run({ questionId, attendeeId });
    },
    withdrawUpvote(attendeeId: string, questionId: number) {
      askerOf(questionId);
      deleteUpvote.run({ questionId, attendeeId });
    },
  };
}
