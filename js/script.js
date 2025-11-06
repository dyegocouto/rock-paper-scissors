const scoreTitle = document.querySelector(".score-title");
const scoreMessage = document.querySelector(".score-message");
const buttonsContainer = document.querySelector(".buttons-container");
const playerSign = document.querySelector("#player-sign");
const computerSign = document.querySelector("#computer-sign");
const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");
const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".modal-button");

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

function capitalizeFirstLetter(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

function updateScoreInfo(playerChoice, computerChoice) {
  switch (roundWinner) {
    case "tie":
      scoreTitle.textContent = "It's a tie!";
      scoreMessage.textContent = `${capitalizeFirstLetter(
        playerChoice
      )} ties with ${computerChoice}`;
      break;
    case "player":
      scoreTitle.textContent = "You win!";
      scoreMessage.textContent = `${capitalizeFirstLetter(
        playerChoice
      )} beats ${computerChoice}`;
      break;
    case "computer":
      scoreTitle.textContent = "You lose!";
      scoreMessage.textContent = `${capitalizeFirstLetter(
        computerChoice
      )} beats ${playerChoice}`;
      break;
  }
}

function updateScoreboard() {
  playerScore.textContent = `Player: ${score.player}`;
  computerScore.textContent = `Computer: ${score.computer}`;
}

function endGame() {
  modal.showModal();
}

function isGameOver() {
  if (score.player >= 5 || score.computer >= 5) endGame();
}

function handleClick(e) {
  isGameOver();

  const playerChoice = e.target.closest("button").id;
  const computerChoice = getComputerChoice();

  playRound(playerChoice, computerChoice);
  updateSigns(playerChoice, computerChoice);
  updateScoreInfo(playerChoice, computerChoice);
  updateScoreboard();
}

function restartGame() {
  score.player = 0;
  score.computer = 0;
  updateScoreboard();

  scoreTitle.textContent = "Make a move";
  scoreMessage.textContent = "First to score 5 points wins the game";

  playerScore.textContent = "Player: 0";
  computerScore.textContent = "Computer: 0";

  playerSign.src = "./images/question-mark.png";
  computerSign.src = "./images/question-mark.png";

  modal.close();
}

buttonsContainer.addEventListener("click", handleClick);

modalButton.addEventListener("click", restartGame);
