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
    roundWinner = "computer";
  } else {
    roundWinner = "player";
  }

  console.log("The round winner is the " + roundWinner);
}

function handleClick(e) {
  const playerChoice = e.target.closest("button").id;
  playRound(playerChoice, getComputerChoice());
}

const buttonsContainer = document.querySelector(".buttons-container");

buttonsContainer.addEventListener("click", handleClick);
