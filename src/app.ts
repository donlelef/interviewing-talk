import index from "./index.html";
import { InvalidQuestionError, type QuestionStore } from "./questions";

export function startServer(store: QuestionStore, port: number) {
  return Bun.serve({
    port,
    routes: {
      "/": index,
      "/api/questions": {
        GET: () => Response.json(store.list()),
        POST: async (req) => {
          const body = await req.json().catch(() => null);
          if (typeof body?.text !== "string") {
            return Response.json({ error: "Send a JSON body with a text field." }, { status: 400 });
          }
          try {
            return Response.json(store.ask(body.text), { status: 201 });
          } catch (error) {
            if (error instanceof InvalidQuestionError) {
              return Response.json({ error: error.message }, { status: 400 });
            }
            throw error;
          }
        },
      },
      "/api/questions/:id/upvote": {
        POST: (req) => {
          const question = store.upvote(Number(req.params.id));
          if (!question) return Response.json({ error: "Question not found." }, { status: 404 });
          return Response.json(question);
        },
      },
    },
  });
}
