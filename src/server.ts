import { startServer } from "./app";
import { openQuestionStore } from "./questions";

const store = openQuestionStore(process.env.DB_PATH ?? "qa-board.sqlite");
const server = startServer(store, Number(process.env.PORT ?? 3000));

console.log(`Q&A board running at ${server.url}`);
