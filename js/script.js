const score = { player: 0, computer: 0 };
let roundWinner = "";

function getComputerChoice() {
  return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
}

function playRound(playerChoice, computerChoice) {
  if (
    (playerChoice === "rock" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "rock")
  ) {
    score.computer++;
    roundWinner = "computer";
  } else {
    score.player++;
    roundWinner = "player";
  }

  console.log("The round winner is the " + roundWinner);
  console.log("Current score: " + JSON.stringify(score));
}

function handleClick(e) {
  const playerChoice = e.target.closest("button").id;
  playRound(playerChoice, getComputerChoice());
}

const buttonsContainer = document.querySelector(".buttons-container");

buttonsContainer.addEventListener("click", handleClick);
