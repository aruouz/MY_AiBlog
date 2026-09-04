const form = document.querySelector("#chat-form");
const input = document.querySelector("#chat-input");
const messages = document.querySelector("#chat-messages");
const chips = document.querySelectorAll(".question-chip");
const chatSection = document.querySelector("#chat");
const closeButton = document.querySelector("#chat-close");
const chatTriggers = document.querySelectorAll('a[href="#chat"]');
let lastFocusedElement = null;

const answers = [
  {
    keywords: ["做什么", "最近", "现在", "在做"],
    text: "最近正在搭建自己的个人主页，整理作品集，也在持续学习 AI 工具和背后的底层原理。希望把学习过程中的输入，慢慢变成真正能解决问题的作品。",
  },
  {
    keywords: ["作品", "有哪些", "项目"],
    text: "作品集还在持续整理中，目前更关注 AI 应用、内容表达和知识整理这几个方向。这个主页本身，就是我正在搭建的一个小作品。",
  },
  {
    keywords: ["场景", "用在哪", "应用", "用途"],
    text: "这些作品可以用于个人知识管理、内容创作辅助、信息整理，以及把复杂的技术概念变成更容易理解的表达。具体场景会随着项目迭代继续补充。",
  },
  {
    keywords: ["你好", "嗨", "介绍", "是谁"],
    text: "你好！我是 aruouz 的数字分身。aruouz 是一个正在学习 AI 的开发者，喜欢新奇事物、手工、读书和把学到的东西快速应用起来。",
  },
];

function getAnswer(question) {
  const matched = answers.find((answer) => answer.keywords.some((keyword) => question.includes(keyword)));
  return matched?.text || "这是一个有趣的问题。aruouz 目前正在通过持续学习和做小项目来寻找答案，也欢迎你换个角度继续问问看。";
}

function addMessage(text, type) {
  const row = document.createElement("div");
  row.className = `message-row ${type === "user" ? "user-row" : "twin-row"}`;
  row.innerHTML = type === "user"
    ? `<div class="message-content"><div class="message-meta"><strong>你</strong><span>刚刚</span></div><div class="bubble user-bubble"></div></div>`
    : `<div class="mini-avatar" aria-hidden="true">a/</div><div class="message-content"><div class="message-meta"><strong>aruouz 的数字分身</strong><span>刚刚</span></div><div class="bubble twin-bubble"></div></div>`;
  row.querySelector(".bubble").textContent = text;
  messages.insertBefore(row, messages.querySelector(".suggestions"));
  row.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function submitQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  addMessage(cleanQuestion, "user");
  input.value = "";
  window.setTimeout(() => addMessage(getAnswer(cleanQuestion), "twin"), 420);
}

function openChat(event) {
  event.preventDefault();
  lastFocusedElement = document.activeElement;
  chatSection.classList.add("is-open");
  chatSection.setAttribute("aria-hidden", "false");
  document.body.classList.add("chat-open");
  input.focus();
}

function closeChat() {
  chatSection.classList.remove("is-open");
  chatSection.setAttribute("aria-hidden", "true");
  document.body.classList.remove("chat-open");
  lastFocusedElement?.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitQuestion(input.value);
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => submitQuestion(chip.dataset.question));
});

chatTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openChat);
});

closeButton.addEventListener("click", closeChat);

chatSection.addEventListener("click", (event) => {
  if (event.target === chatSection) closeChat();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && chatSection.classList.contains("is-open")) closeChat();
});
