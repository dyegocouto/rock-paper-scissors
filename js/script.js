const buttonsContainer = document.querySelector(".buttons-container");
const playerSign = document.querySelector("#player-sign");
const computerSign = document.querySelector("#computer-sign");

const score = { player: 0, computer: 0 };
let roundWinner = "";

function getComputerChoice() {
  return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
}

function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    roundWinner = "tie";
  } else if (
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
}

function updateSigns(playerChoice, computerChoice) {
  switch (playerChoice) {
    case "rock":
      playerSign.src = "./images/rock.png";
      break;
    case "paper":
      playerSign.src = "./images/paper.png";
      break;
    case "scissors":
      playerSign.src = "./images/scissors.png";
      break;
  }

  switch (computerChoice) {
    case "rock":
      computerSign.src = "./images/rock.png";
      break;
    case "paper":
      computerSign.src = "./images/paper.png";
      break;
    case "scissors":
      computerSign.src = "./images/scissors.png";
      break;
  }
}

function handleClick(e) {
  const playerChoice = e.target.closest("button").id;
  const computerChoice = getComputerChoice();

  playRound(playerChoice, computerChoice);
  updateSigns(playerChoice, computerChoice);
}

buttonsContainer.addEventListener("click", handleClick);
