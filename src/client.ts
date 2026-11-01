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
  item.append(renderUpvoteButton(question), text, time);
  return item;
}

function renderUpvoteButton(question: Question) {
  const button = document.createElement("button");
  button.className = "upvote";
  button.textContent = `▲ ${question.upvotes}`;
  button.setAttribute("aria-pressed", String(question.upvotedByMe));
  button.setAttribute("aria-label", `Upvote, ${question.upvotes} so far`);
  if (question.askedByMe) {
    button.disabled = true;
    button.title = "You cannot upvote your own question";
  }
  button.addEventListener("click", async () => {
    await fetch(`/api/questions/${question.id}/upvote`, { method: question.upvotedByMe ? "DELETE" : "PUT" });
    await refresh();
  });
  return button;
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
