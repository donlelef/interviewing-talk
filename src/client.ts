import type { Question } from "./questions";

const REFRESH_INTERVAL_MS = 3000;

const form = document.querySelector<HTMLFormElement>("#ask-form")!;
const textarea = document.querySelector<HTMLTextAreaElement>("#question-text")!;
const formError = document.querySelector<HTMLSpanElement>("#form-error")!;
const list = document.querySelector<HTMLOListElement>("#questions")!;
const emptyState = document.querySelector<HTMLParagraphElement>("#empty-state")!;

function renderQuestion(question: Question) {
  const item = document.createElement("li");
  const text = document.createElement("p");
  text.textContent = question.text;
  const time = document.createElement("time");
  time.dateTime = question.askedAt;
  time.textContent = new Date(question.askedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const upvote = document.createElement("button");
  upvote.className = "upvote";
  upvote.textContent = `▲ ${question.votes}`;
  upvote.addEventListener("click", async () => {
    await fetch(`/api/questions/${question.id}/upvote`, { method: "POST" });
    await refresh();
  });
  item.append(upvote, text, time);
  return item;
}

async function refresh() {
  const response = await fetch("/api/questions");
  const questions: Question[] = await response.json();
  list.replaceChildren(...questions.map(renderQuestion));
  emptyState.hidden = questions.length > 0;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formError.textContent = "";
  const response = await fetch("/api/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: textarea.value }),
  });
  if (!response.ok) {
    formError.textContent = (await response.json()).error;
    return;
  }
  form.reset();
  await refresh();
});

refresh();
setInterval(refresh, REFRESH_INTERVAL_MS);
