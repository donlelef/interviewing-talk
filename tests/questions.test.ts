import { describe, expect, test } from "bun:test";
import {
  InvalidQuestionError,
  MAX_QUESTION_LENGTH,
  OwnQuestionUpvoteError,
  QuestionNotFoundError,
  openQuestionStore,
} from "../src/questions";

const ada = "attendee-ada";
const bob = "attendee-bob";
const cy = "attendee-cy";

describe("asking", () => {
  test("trims the question text", () => {
    const store = openQuestionStore();

    expect(store.ask(ada, "  Why Bun?  ").text).toBe("Why Bun?");
  });

  test("rejects an empty question", () => {
    const store = openQuestionStore();

    expect(() => store.ask(ada, "   ")).toThrow(InvalidQuestionError);
  });

  test("rejects a question longer than the limit", () => {
    const store = openQuestionStore();

    expect(() => store.ask(ada, "a".repeat(MAX_QUESTION_LENGTH + 1))).toThrow(InvalidQuestionError);
  });

  test("an attendee sees which questions they asked", () => {
    const store = openQuestionStore();
    store.ask(ada, "Mine?");

    expect(store.list(ada)[0]!.askedByMe).toBe(true);
    expect(store.list(bob)[0]!.askedByMe).toBe(false);
  });
});

describe("upvoting", () => {
  test("an attendee upvotes a question once, however often they press", () => {
    const store = openQuestionStore();
    const question = store.ask(ada, "Slides?");

    store.upvote(bob, question.id);
    store.upvote(bob, question.id);

    expect(store.list(bob)[0]).toMatchObject({ upvotes: 1, upvotedByMe: true });
  });

  test("an attendee can withdraw their upvote", () => {
    const store = openQuestionStore();
    const question = store.ask(ada, "Slides?");
    store.upvote(bob, question.id);

    store.withdrawUpvote(bob, question.id);

    expect(store.list(bob)[0]).toMatchObject({ upvotes: 0, upvotedByMe: false });
  });

  test("an attendee cannot upvote their own question", () => {
    const store = openQuestionStore();
    const question = store.ask(ada, "Slides?");

    expect(() => store.upvote(ada, question.id)).toThrow(OwnQuestionUpvoteError);
  });

  test("upvoting a missing question fails", () => {
    const store = openQuestionStore();

    expect(() => store.upvote(ada, 999)).toThrow(QuestionNotFoundError);
  });

  test("everyone sees the count, only the upvoter sees it as theirs", () => {
    const store = openQuestionStore();
    const question = store.ask(ada, "Slides?");
    store.upvote(bob, question.id);

    expect(store.list(cy)[0]).toMatchObject({ upvotes: 1, upvotedByMe: false });
  });
});

describe("ordering", () => {
  test("the most upvoted question comes first", () => {
    const store = openQuestionStore();
    store.ask(ada, "Fewer upvotes?");
    const popular = store.ask(ada, "More upvotes?");
    store.upvote(bob, popular.id);

    expect(store.list(cy).map((question) => question.text)).toEqual(["More upvotes?", "Fewer upvotes?"]);
  });

  test("between equal counts, the question asked earlier comes first", () => {
    const store = openQuestionStore();
    store.ask(ada, "Earlier?");
    store.ask(ada, "Later?");

    expect(store.list(cy).map((question) => question.text)).toEqual(["Earlier?", "Later?"]);
  });
});
