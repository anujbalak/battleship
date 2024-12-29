import { realPlayer } from "./playerGui.mjs";
import { computerPlayer, refreshScore } from "./computerGui.mjs";
import { isPlayerTurn, isPlayerWin } from "./playerInput.mjs";
import { renderWinner } from "./renderWinner.mjs";
import { getCords } from "./computer-moves.mjs";
import { printHighlights } from "./print-highlights.mjs";

function getHitSquare(array, cords) {
  let isFound = false;
  for (let index = 0; index < array.length && isFound === false; index++) {
    const square = array[index];
    let squareValue = square.getAttribute("value");
    let squareCords = makeArrayOfCords(squareValue);
    if (squareCords[0] == cords[0] && squareCords[1] == cords[1]) {
      isFound = true;
      return square;
    }
  }
  return;
}

export let isComputerWin = false;

function computerRun() {
  let computerBoard = document.querySelector(
    "main div+div.player-lobby div.computer-board",
  );
  computerBoard.style.opacity = "30%";
  setTimeout(() => {
    afterThinking();
    computerBoard.style.opacity = "100%";
  }, 500);
}

function afterThinking() {
  let playerBoard = document.querySelectorAll("div.real-board span.cell");
  if (!isComputerWin && !isPlayerWin) {
    let cords = getCords();
    let square = getHitSquare(playerBoard, cords);
    if (!realPlayer.gameboard.isAlreadyFired(cords)) {
      hitShip(cords);
      styleHitSquare(square);
      styleSunkShip();
      refreshScore(
        realPlayer.gameboard.score,
        realPlayer.gameboard.changeInScore,
        realPlayer.gameboard.scoreBonus,
      );
      realPlayer.gameboard.scoreBonus = 0;
      isPlayerTurn(true);
    }
  }
}

function hitShip(receiveCords) {
  realPlayer.gameboard.receiveAttack(receiveCords);
  if (realPlayer.gameboard.areAllShipSunk()) {
    isComputerWin = true;
    renderWinner(realPlayer, isPlayerWin, computerPlayer, isComputerWin);
  }
}

function styleHitSquare(square) {
  let hit = realPlayer.gameboard.isHit;
  if (hit) {
    square.innerText = "💣";
    return square.classList.add("hit-ship");
  }
  square.innerText = "❎";
  return square.classList.add("missed");
}

function styleSunkShip() {
  let sunkShipsPosition = realPlayer.gameboard.sunkShipsPosition;
  let countSunkShips = sunkShipsPosition.length;
  if (countSunkShips > realPlayer.gameboard.totalSunkShips) {
    let shipPosition = sunkShipsPosition[countSunkShips - 1];
    shipPosition.forEach((cords) => {
      let square = document.querySelector(
        `div.real-board span[value='${cords}']`,
      );
      square.classList.remove("hit-ship");
      square.classList.add("part-of-sunk-ship");
      square.innerText = "☠";
    });
    printHighlights(computerPlayer.type);
    realPlayer.gameboard.totalSunkShips += 1;
  }
}

function makeArrayOfCords(cordsString) {
  let cordsIntArr = cordsString.split(",");
  let x = cordsIntArr[0];
  let y = cordsIntArr[1];
  return [x, y];
}

export { computerRun };
