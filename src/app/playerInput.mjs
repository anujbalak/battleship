import { computerPlayer } from "./computerGui.mjs";
import { refreshScore, realPlayer } from "./playerGui.mjs";
import { isComputerWin } from "./computerInput.mjs";
import { renderWinner } from "./renderWinner.mjs";
import { hidePlaceButton } from "./place-randomly.mjs";
import { printHighlights } from "./print-highlights.mjs";

function isPlayerTurn(bool = true) {
  return (playerTurn = bool);
}
let playerTurn = true;
export let isPlayerWin = false;
function playerRun() {
  let computerBoard = document.querySelectorAll("div.computer-board span.cell");
  computerBoard.forEach((square) => {
    square.addEventListener("click", () => {
      if (
        !isPlayerWin &&
        playerTurn &&
        !isComputerWin &&
        realPlayer.gameboard.areAllShipsPlace()
      ) {
        let recievedCords = square.getAttribute("value");
        let cords = makeArrayOfCords(recievedCords);
        if (!computerPlayer.gameboard.isAlreadyFired(cords)) {
          hitShip(cords);
          styleHitSquare(square);
          styleSunkShip();
          refreshScore(
            computerPlayer.gameboard.score,
            computerPlayer.gameboard.changeInScore,
            computerPlayer.gameboard.scoreBonus,
          );
          computerPlayer.gameboard.scoreBonus = 0;
          isPlayerTurn(false);
        }
        hidePlaceButton();
      }
    });
  });
}

function hitShip(receiveCords) {
  computerPlayer.gameboard.receiveAttack(receiveCords);
  if (computerPlayer.gameboard.areAllShipSunk()) {
    isPlayerWin = true;
    renderWinner(realPlayer, isPlayerWin, computerPlayer, isComputerWin);
  }
}

function styleHitSquare(square) {
  let hit = computerPlayer.gameboard.isHit;
  if (hit) {
    square.innerText = "💣";
    return square.classList.add("hit-ship");
  }
  square.innerText = "❎";
  return square.classList.add("missed");
}

function styleSunkShip() {
  let sunkShipsPosition = computerPlayer.gameboard.sunkShipsPosition;
  let countSunkShips = sunkShipsPosition.length;
  if (countSunkShips > computerPlayer.gameboard.totalSunkShips) {
    let shipPosition = sunkShipsPosition[countSunkShips - 1];
    shipPosition.forEach((cords) => {
      let square = document.querySelector(
        `div.computer-board span[value='${cords}']`,
      );
      square.classList.add("part-of-sunk-ship");
      square.innerText = "☠";
    });
    printHighlights(realPlayer.type);
    computerPlayer.gameboard.totalSunkShips += 1;
  }
}

function makeArrayOfCords(cordsString) {
  let cordsIntArr = cordsString.split(",");
  let x = cordsIntArr[0];
  let y = cordsIntArr[1];
  return [x, y];
}

export { playerRun, isPlayerTurn };
