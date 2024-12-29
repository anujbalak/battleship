import { hideLogMessages } from "./print-highlights.mjs";

function renderWinner(realPlayer, isPlayerWin, computerPlayer, isComputerWin) {
  setTimeout(() => {
    hideLogMessages();
    afterAnimation(realPlayer, isPlayerWin, computerPlayer, isComputerWin);
  }, 500);
}

function afterAnimation(realPlayer, isPlayerWin, computerPlayer) {
  let playerName = realPlayer.name;
  let playerScore = computerPlayer.gameboard.score;
  let computerName = computerPlayer.name;
  let computerScore = realPlayer.gameboard.score;
  const shipMenuContainer = document.querySelector("div.ship-menu-container");
  if (isPlayerWin) {
    winner(playerName, playerScore, shipMenuContainer);
    failure(computerName, computerScore, shipMenuContainer);
  } else {
    playerName = "Your";
    winner(computerName, computerScore, shipMenuContainer);
    failure(playerName, playerScore, shipMenuContainer);
  }
  restartBtn(shipMenuContainer);
}

function winner(name, score, container) {
  const winnerContainer = document.createElement("div");
  const winnerText = document.createElement("p");
  const winnerScore = document.createElement("p");

  winnerContainer.classList.add("winner-container");
  winnerText.classList.add("winner-text");
  winnerScore.classList.add("winner-score");

  winnerText.innerText = name;
  winnerScore.innerText = score;

  winnerContainer.appendChild(winnerText);
  winnerContainer.appendChild(winnerScore);
  container.appendChild(winnerContainer);
}

function failure(name, score, container) {
  const failureContainer = document.createElement("div");
  const failureText = document.createElement("p");
  const failureScore = document.createElement("p");

  failureContainer.classList.add("failure-container");
  failureText.classList.add("failure-text");
  failureScore.classList.add("failure-score");

  failureText.innerText = name;
  failureScore.innerText = score;

  failureContainer.appendChild(failureText);
  failureContainer.appendChild(failureScore);
  container.appendChild(failureContainer);
}

function restartBtn(container) {
  const restartBtnContainer = document.createElement("div");
  const restartButton = document.createElement("button");

  restartBtnContainer.classList.add("restart-button-container");
  restartButton.className = "button";
  restartButton.innerText = "Restart";
  restartBtnContainer.appendChild(restartButton);
  container.appendChild(restartBtnContainer);
  restart(restartButton);
}

function restart(btn) {
  btn.addEventListener("click", () => {
    window.location.reload();
  });
}

export { renderWinner };
