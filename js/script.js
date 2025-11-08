const scoreTitle = document.querySelector(".score-title");
const scoreMessage = document.querySelector(".score-message");
const buttonsContainer = document.querySelector(".buttons-container");
const playerSign = document.querySelector("#player-sign");
const computerSign = document.querySelector("#computer-sign");
const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");
const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".modal-button");
const modalText = document.querySelector(".modal-text");

const IMAGE_PATH = "./images/";

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

function setSignImage(element, choice) {
  element.src = `${IMAGE_PATH}${choice}.png`;
}

function updateSigns(playerChoice, computerChoice) {
  setSignImage(playerSign, playerChoice);
  setSignImage(computerSign, computerChoice);
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
        playerChoice
      )} is beaten by ${computerChoice}`;
      break;
  }
}

function updateScoreboard() {
  playerScore.textContent = `Player: ${score.player}`;
  computerScore.textContent = `Computer: ${score.computer}`;
}

function endGame() {
  if (score.player > score.computer) {
    modalText.textContent = "You won!";
  } else {
    modalText.textContent = "You lost...";
  }
  modal.showModal();
}

function isGameOver() {
  return score.player >= 5 || score.computer >= 5;
}

function handleClick(e) {
  if (isGameOver()) {
    endGame();
    return;
  }

  const playerChoice = e.target.closest("button").id;
  const computerChoice = getComputerChoice();

  playRound(playerChoice, computerChoice);
  updateSigns(playerChoice, computerChoice);
  updateScoreInfo(playerChoice, computerChoice);
  updateScoreboard();
}

function resetScore() {
  score.player = 0;
  score.computer = 0;
  updateScoreboard();
}

function resetScoreInfo() {
  scoreTitle.textContent = "Make a move";
  scoreMessage.textContent = "First to score 5 points wins the game";
}

function resetSigns() {
  playerSign.src = `${IMAGE_PATH}question-mark.png`;
  computerSign.src = `${IMAGE_PATH}question-mark.png`;
}

function restartGame() {
  resetScore();
  resetScoreInfo();
  resetSigns();

  modal.close();
}

buttonsContainer.addEventListener("click", handleClick);

modalButton.addEventListener("click", restartGame);
