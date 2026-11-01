import type { BunRequest } from "bun";
import index from "./index.html";
import {
  InvalidQuestionError,
  OwnQuestionUpvoteError,
  QuestionNotFoundError,
  type QuestionStore,
} from "./questions";

const ATTENDEE_COOKIE = "attendee";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

function attendeeOf(req: BunRequest) {
  const existing = req.cookies.get(ATTENDEE_COOKIE);
  if (existing) return existing;
  const attendeeId = crypto.randomUUID();
  req.cookies.set(ATTENDEE_COOKIE, attendeeId, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: ONE_YEAR_IN_SECONDS,
  });
  return attendeeId;
}

function errorResponse(error: unknown) {
  if (error instanceof InvalidQuestionError) return Response.json({ error: error.message }, { status: 400 });
  if (error instanceof QuestionNotFoundError) return Response.json({ error: error.message }, { status: 404 });
  if (error instanceof OwnQuestionUpvoteError) return Response.json({ error: error.message }, { status: 403 });
  throw error;
}

export function startServer(store: QuestionStore, port: number) {
  return Bun.serve({
    port,
    routes: {
      "/": index,
      "/api/questions": {
        GET: (req) => Response.json(store.list(attendeeOf(req))),
        POST: async (req) => {
          const attendeeId = attendeeOf(req);
          const body = await req.json().catch(() => null);
          if (typeof body?.text !== "string") {
            return Response.json({ error: "Send a JSON body with a text field." }, { status: 400 });
          }
          try {
            return Response.json(store.ask(attendeeId, body.text), { status: 201 });
          } catch (error) {
            return errorResponse(error);
          }
        },
      },
      "/api/questions/:id/upvote": {
        PUT: (req) => {
          try {
            store.upvote(attendeeOf(req), Number(req.params.id));
            return new Response(null, { status: 204 });
          } catch (error) {
            return errorResponse(error);
          }
        },
        DELETE: (req) => {
          try {
            store.withdrawUpvote(attendeeOf(req), Number(req.params.id));
            return new Response(null, { status: 204 });
          } catch (error) {
            return errorResponse(error);
          }
        },
      },
    },
  });
}
