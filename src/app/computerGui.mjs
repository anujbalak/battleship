import { Player } from "../module/player.mjs";
import { renderPlayerScore } from "./playerGui.mjs";
import { shipNames } from "../ext-files/ship-names.mjs";

const computerPlayer = new Player();
function computerGui() {
  computerPlayer.name = "Computer";
  computerPlayer.type = "computer";

  let playerLobby = document.createElement("div");
  playerLobby.classList.add("player-lobby");

  function renderPlayerName(name) {
    let playerNameContainer = document.createElement("div");
    let playerName = document.createElement("p");
    playerNameContainer.classList.add(
      "player-name-container",
      "flex-container",
    );
    playerName.classList.add("player-name", "text");

    playerName.innerText = `${name}'s Board`;
    playerNameContainer.appendChild(playerName);
    return playerNameContainer;
  }

  function renderPlayerBoard(squares) {
    let playerBoard = document.createElement("div");

    playerBoard.classList.add(`${computerPlayer.type}-board`);
    squares.forEach((square) => {
      let cell = document.createElement("span");
      cell.classList.add("cell");
      // cell.innerText = square
      cell.setAttribute("value", square);
      playerBoard.appendChild(cell);
    });

    return playerBoard;
  }

  let playerName = renderPlayerName(computerPlayer.name);
  computerPlayer.setBoard();
  let playerBoard = renderPlayerBoard(computerPlayer.gameboard.board);

  playerLobby.appendChild(playerName);
  playerLobby.appendChild(playerBoard);

  const MAIN_AREA = document.querySelector("main");
  MAIN_AREA.appendChild(playerLobby);
  renderPlayerScore(playerLobby);

  generateShips();
  renderShips(computerPlayer.gameboard.ships);
  renderScore();
}

function renderShips(ships) {
  ships.forEach((ship) => {
    let shipLocation = ship.position;
    shipLocation.forEach((shipCords) => {
      let shipSquare = document.querySelector(
        `div.computer-board span[value='${shipCords}']`,
      );
      shipSquare.classList.add("ship-square");
    });
    ship.isPlace = true;
  });
}

function generateShips() {
  computerPlayer.gameboard.placeShip(5, shipNames[0]);
  computerPlayer.gameboard.placeShip(4, shipNames[1]);
  computerPlayer.gameboard.placeShip(3, shipNames[2]);
  computerPlayer.gameboard.placeShip(3, shipNames[3]);
  computerPlayer.gameboard.placeShip(2, shipNames[4]);
}

function renderScore(score = 0) {
  let scoreContainer = document.createElement("div");
  let scoreText = document.createElement("p");
  let playerNameNode = document.createElement("p");

  scoreContainer.classList.add("score-container");
  scoreText.classList.add("score-text");
  playerNameNode.classList.add("player-name-node");
  let playerLobby = document.querySelector("main>div.player-lobby");
  playerNameNode.innerText = `Computer Score:`;
  scoreText.innerText = score;
  scoreContainer.appendChild(playerNameNode);
  scoreContainer.appendChild(scoreText);
  playerLobby.appendChild(scoreContainer);
}

function refreshScore(score, changeInScore, bonusScore) {
  let scoreNode = document.querySelector(
    "main>div div.score-container p.score-text",
  );
  runScoreAnimation(scoreNode, changeInScore, bonusScore);
  setTimeout(() => {
    scoreNode.innerText = score;
    scoreNode.setAttribute("id", "");
  }, 500);
}

function runScoreAnimation(scoreNode, changeInScore, bonusScore) {
  let scoreChangeText = ``;
  if (changeInScore === 50) {
    scoreChangeText = `+${changeInScore}`;
    scoreNode.setAttribute("id", "score-increase");
  } else if (changeInScore === 5) {
    scoreChangeText = `-${changeInScore}`;
    scoreNode.setAttribute("id", "score-decrease");
  } else if (changeInScore === 0) {
    scoreChangeText = changeInScore;
  }
  if (bonusScore === 100) {
    scoreChangeText = `+${changeInScore + bonusScore}`;
    scoreNode.setAttribute("id", "score-bonus");
  }
  scoreNode.innerText = scoreChangeText;
}

export function activatComputerBoard() {
  let board = document.querySelector("div.computer-board");
  let squares = document.querySelectorAll("div.computer-board span.cell");
  squares.forEach((square) => {
    square.classList.add("can-hover");
  });
  board.style.opacity = "1";
  let scoreContainer = document.querySelector(
    "div#player-board+div.score-container",
  );
  scoreContainer.style.opacity = "1";
}

export { computerGui, computerPlayer, refreshScore };
