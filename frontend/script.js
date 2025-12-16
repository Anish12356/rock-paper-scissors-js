const userScoreEl = document.getElementById("user-score");
const cpuScoreEl = document.getElementById("cpu-score");
const resultText = document.getElementById("result-text");
const nextRoundBtn = document.getElementById("next-round");

let userScore = 0;
let cpuScore = 0;

const choices = document.querySelectorAll(".choice");

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.dataset.choice;
    const cpuChoice = getCPUChoice();
    const winner = getWinner(userChoice, cpuChoice);

    showGlow(choice);

    if (winner === "user") {
      userScore++;
      resultText.innerText = `You Win! ${capitalize(userChoice)} beats ${cpuChoice}`;
    } else if (winner === "cpu") {
      cpuScore++;
      resultText.innerText = `You Lose! ${capitalize(cpuChoice)} beats ${userChoice}`;
    } else {
      resultText.innerText = "Draw!";
    }

    updateScores();
    nextRoundBtn.classList.remove("hidden");
  });
});

function getCPUChoice() {
  const options = ["stone", "paper", "scissor"];
  return options[Math.floor(Math.random() * 3)];
}

function getWinner(u, c) {
  if (u === c) return "draw";

  if (
    (u === "stone" && c === "scissor") ||
    (u === "scissor" && c === "paper") ||
    (u === "paper" && c === "stone")
  ) return "user";

  return "cpu";
}

function showGlow(el) {
  el.classList.add("glow");
  setTimeout(() => el.classList.remove("glow"), 800);
}

function updateScores() {
  userScoreEl.innerText = userScore;
  cpuScoreEl.innerText = cpuScore;
}

nextRoundBtn.addEventListener("click", () => {
  resultText.innerText = "Make a choice!";
  nextRoundBtn.classList.add("hidden");
});

// Rules Popup
document.getElementById("rules-btn").addEventListener("click", () => {
  document.getElementById("rules-popup").classList.remove("hidden");
});

document.getElementById("close-rules").addEventListener("click", () => {
  document.getElementById("rules-popup").classList.add("hidden");
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
