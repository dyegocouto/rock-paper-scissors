const buttonsContainer = document.querySelector(".buttons-container");

function handleClick(e) {
  const playerChoice = e.target.closest("button").id;
  console.log(playerChoice);
}

buttonsContainer.addEventListener("click", handleClick);
