import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { startServer } from "../src/app";
import { openQuestionStore } from "../src/questions";

let server: ReturnType<typeof startServer>;

function attendeeCookie(response: Response) {
  return response.headers.getSetCookie().find((cookie) => cookie.startsWith("attendee="))?.split(";")[0];
}

function request(path: string, init: RequestInit = {}, cookie?: string) {
  const headers = new Headers(init.headers);
  if (cookie) headers.set("Cookie", cookie);
  return fetch(new URL(path, server.url), { ...init, headers });
}

function ask(text: unknown, cookie?: string) {
  return request(
    "/api/questions",
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) },
    cookie,
  );
}

async function newAttendee() {
  return attendeeCookie(await request("/api/questions"))!;
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

    const questions = await request("/api/questions").then((r) => r.json());
    expect(questions).toEqual([expect.objectContaining({ text: "Will the slides be shared?" })]);
  });

  test("an empty question is rejected", async () => {
    expect((await ask("")).status).toBe(400);
  });

  test("a body without text is rejected", async () => {
    expect((await ask(42)).status).toBe(400);
  });

  test("serves the board page", async () => {
    const response = await fetch(server.url);

    expect(response.status).toBe(200);
    expect(await response.text()).toContain("Q&amp;A Board");
  });
});

describe("attendees", () => {
  test("a first request gets an attendee cookie that only the server can read", async () => {
    const response = await request("/api/questions");
    const header = response.headers.getSetCookie().find((cookie) => cookie.startsWith("attendee="));

    expect(header).toContain("HttpOnly");
  });

  test("a returning attendee keeps their identity", async () => {
    const ada = await newAttendee();

    const response = await request("/api/questions", {}, ada);

    expect(attendeeCookie(response)).toBeUndefined();
  });
});

describe("upvoting API", () => {
  test("an attendee upvotes and withdraws", async () => {
    const ada = await newAttendee();
    const bob = await newAttendee();
    const question = await ask("Slides?", ada).then((r) => r.json());

    expect((await request(`/api/questions/${question.id}/upvote`, { method: "PUT" }, bob)).status).toBe(204);
    expect((await request("/api/questions", {}, bob).then((r) => r.json()))[0]).toMatchObject({
      upvotes: 1,
      upvotedByMe: true,
    });

    expect((await request(`/api/questions/${question.id}/upvote`, { method: "DELETE" }, bob)).status).toBe(204);
    expect((await request("/api/questions", {}, bob).then((r) => r.json()))[0].upvotes).toBe(0);
  });

  test("upvoting your own question is forbidden", async () => {
    const ada = await newAttendee();
    const question = await ask("Slides?", ada).then((r) => r.json());

    const response = await request(`/api/questions/${question.id}/upvote`, { method: "PUT" }, ada);

    expect(response.status).toBe(403);
  });

  test("upvoting a missing question returns 404", async () => {
    const response = await request("/api/questions/999/upvote", { method: "PUT" }, await newAttendee());

    expect(response.status).toBe(404);
  });
});
