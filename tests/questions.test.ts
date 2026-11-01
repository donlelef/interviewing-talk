import { describe, expect, test } from "bun:test";
import { InvalidQuestionError, MAX_QUESTION_LENGTH, openQuestionStore } from "../src/questions";

describe("question store", () => {
  test("lists the newest question first", () => {
    const store = openQuestionStore();
    store.ask("First?");
    store.ask("Second?");

    expect(store.list().map((question) => question.text)).toEqual(["Second?", "First?"]);
  });

  test("trims the question text", () => {
    const store = openQuestionStore();

    expect(store.ask("  Why Bun?  ").text).toBe("Why Bun?");
  });

  test("rejects an empty question", () => {
    const store = openQuestionStore();

    expect(() => store.ask("   ")).toThrow(InvalidQuestionError);
  });

  test("rejects a question longer than the limit", () => {
    const store = openQuestionStore();

    expect(() => store.ask("a".repeat(MAX_QUESTION_LENGTH + 1))).toThrow(InvalidQuestionError);
  });
});
