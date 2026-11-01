import type { Question } from "./questions";

const REFRESH_INTERVAL_MS = 3000;
const NEAR_LIMIT_CHARACTERS = 20;

const form = document.querySelector<HTMLFormElement>("#ask-form")!;
const textarea = document.querySelector<HTMLTextAreaElement>("#question-text")!;
const formError = document.querySelector<HTMLParagraphElement>("#form-error")!;
const characterCount = document.querySelector<HTMLSpanElement>("#character-count")!;
const questionCount = document.querySelector<HTMLSpanElement>("#question-count")!;
const list = document.querySelector<HTMLOListElement>("#questions")!;
const emptyState = document.querySelector<HTMLDivElement>("#empty-state")!;

function renderQuestion(question: Question, number: number) {
  const item = document.createElement("li");
  const badge = document.createElement("span");
  badge.className = "question-number";
  badge.setAttribute("aria-hidden", "true");
  badge.textContent = String(number);
  const body = document.createElement("div");
  body.className = "question-body";
  const text = document.createElement("p");
  text.textContent = question.text;
  const time = document.createElement("time");
  time.dateTime = question.askedAt;
  time.textContent = new Date(question.askedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  body.append(text, time);
  item.append(badge, body);
  return item;
}

function describeCount(count: number) {
  return count === 1 ? "1 question, newest first" : `${count} questions, newest first`;
}

function updateCharacterCount() {
  const length = textarea.value.length;
  characterCount.textContent = `${length} / ${textarea.maxLength}`;
  characterCount.classList.toggle("near-limit", length > textarea.maxLength - NEAR_LIMIT_CHARACTERS);
}

function showError(message: string) {
  formError.textContent = message;
  textarea.setAttribute("aria-invalid", String(message !== ""));
}

async function refresh() {
  const response = await fetch("/api/questions");
  const questions: Question[] = await response.json();
  list.replaceChildren(...questions.map((question, index) => renderQuestion(question, questions.length - index)));
  emptyState.hidden = questions.length > 0;
  questionCount.textContent = questions.length > 0 ? describeCount(questions.length) : "";
}

textarea.addEventListener("input", () => {
  updateCharacterCount();
  showError("");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  showError("");
  const response = await fetch("/api/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: textarea.value }),
  });
  if (!response.ok) {
    showError((await response.json()).error);
    return;
  }
  form.reset();
  updateCharacterCount();
  await refresh();
});

refresh();
setInterval(refresh, REFRESH_INTERVAL_MS);
