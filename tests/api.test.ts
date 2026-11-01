import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { startServer } from "../src/app";
import { openQuestionStore } from "../src/questions";

let server: ReturnType<typeof startServer>;

function ask(text: unknown) {
  return fetch(new URL("/api/questions", server.url), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}

beforeEach(() => {
  server = startServer(openQuestionStore(), 0);
});

afterEach(() => {
  server.stop(true);
});

describe("questions API", () => {
  test("an asked question appears in the list", async () => {
    const response = await ask("Will the slides be shared?");
    expect(response.status).toBe(201);

    const questions = await fetch(new URL("/api/questions", server.url)).then((r) => r.json());
    expect(questions).toEqual([expect.objectContaining({ text: "Will the slides be shared?" })]);
  });

  test("an empty question is rejected", async () => {
    const response = await ask("");

    expect(response.status).toBe(400);
  });

  test("a body without text is rejected", async () => {
    const response = await ask(42);

    expect(response.status).toBe(400);
  });

  test("serves the board page", async () => {
    const response = await fetch(server.url);

    expect(response.status).toBe(200);
    expect(await response.text()).toContain("Q&amp;A Board");
  });
});

describe("upvoting", () => {
  test("upvoting a question increments its votes", async () => {
    const question = await ask("Is Bun production ready?").then((r) => r.json());

    const response = await fetch(new URL(`/api/questions/${question.id}/upvote`, server.url), { method: "POST" });

    expect(response.status).toBe(200);
    expect((await response.json()).votes).toBe(1);
  });

  test("questions are sorted by votes", async () => {
    const popular = await ask("Older but popular?").then((r) => r.json());
    await ask("Newer?");
    await fetch(new URL(`/api/questions/${popular.id}/upvote`, server.url), { method: "POST" });

    const questions = await fetch(new URL("/api/questions", server.url)).then((r) => r.json());

    expect(questions[0].text).toBe("Older but popular?");
  });

  test("upvoting a missing question returns 404", async () => {
    const response = await fetch(new URL("/api/questions/999/upvote", server.url), { method: "POST" });

    expect(response.status).toBe(404);
  });
});
