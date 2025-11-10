const displayTitle = document.querySelector(".display-title");
const displayPara = document.querySelector(".display-para");

const gameButtons = document.querySelector(".game-buttons");

const playerIcon = document.querySelector("#player-icon");
const computerIcon = document.querySelector("#computer-icon");

const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");

const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal-button");
const modalPara = document.querySelector(".modal-para");

const IMAGE_PATH = "./images/";

const internalScore = { player: 0, computer: 0 };
let roundWinner = "";

function getComputerChoice() {
  return ["r", "p", "s"][Math.floor(Math.random() * 3)];
}

function playRound(playerChoice, computerChoice) {
  const match = playerChoice + computerChoice;

  if (playerChoice === computerChoice) {
    roundWinner === "tie";
  } else if (match === "rs" || match === "pr" || match === "sp") {
    roundWinner = "player";
  } else {
    roundWinner === "computer";
  }
}

function setIconImage(element, choice) {
  element.src = `${IMAGE_PATH}${choice}.png`;
}

function updateIcons(playerChoice, computerChoice) {
  setIconImage(playerIcon, playerChoice);
  setIconImage(computerIcon, computerChoice);
}

function capitalizeFirstLetter(str) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

function updateDisplay(playerChoice, computerChoice) {
  switch (roundWinner) {
    case "tie":
      displayTitle.textContent = "It's a tie!";
      displayPara.textContent = `${capitalizeFirstLetter(
        playerChoice
      )} ties with ${computerChoice}`;
      break;
    case "player":
      displayTitle.textContent = "You win!";
      displayPara.textContent = `${capitalizeFirstLetter(
        playerChoice
      )} beats ${computerChoice}`;
      break;
    case "computer":
      displayTitle.textContent = "You lose!";
      displayPara.textContent = `${capitalizeFirstLetter(
        playerChoice
      )} is beaten by ${computerChoice}`;
      break;
  }
}

function updateScoreboard() {
  playerScore.textContent = `Player: ${internalScore.player}`;
  computerScore.textContent = `Computer: ${internalScore.computer}`;
}

function endGame() {
  if (internalScore.player > internalScore.computer) {
    modalPara.textContent = "You won!";
  } else {
    modalPara.textContent = "You lost...";
  }
  modal.showModal();
}

function isGameOver() {
  return internalScore.player >= 5 || internalScore.computer >= 5;
}

function updateInternalScore(winner) {
  internalScore[winner]++;
}

function handleClick(e) {
  if (isGameOver()) {
    endGame();
    return;
  }

  const playerChoice = e.target.closest("button").id;
  const computerChoice = getComputerChoice();
  const roundWinner = playRound(playerChoice, computerChoice);

  updateInternalScore(roundWinner);
  updateIcons(playerChoice, computerChoice);
  updateDisplay(playerChoice, computerChoice);
  updateScoreboard();
}

function resetInternalScore() {
  internalScore.player = 0;
  internalScore.computer = 0;
  updateScoreboard();
}

function resetDisplay() {
  displayTitle.textContent = "Make a move";
  displayPara.textContent = "First to score 5 points wins the game";
}

function resetIcons() {
  playerIcon.src = `${IMAGE_PATH}question-mark.png`;
  computerIcon.src = `${IMAGE_PATH}question-mark.png`;
}

function restartGame() {
  resetInternalScore();
  resetDisplay();
  resetIcons();

  modal.close();
}

gameButtons.addEventListener("click", handleClick);

modalBtn.addEventListener("click", restartGame);
