import { realPlayer, renderShips } from "./playerGui.mjs";
import { activatComputerBoard } from "./computerGui.mjs";
import { hideShipMenuGui } from "./ship-menu.mjs";
import { shipNames } from "../ext-files/ship-names.mjs";

let randomPlaceContainer = null;
function placeRandomly() {
  const shipMenuContaienr = document.querySelector("div.ship-menu-container");

  randomPlaceContainer = document.createElement("div");
  let randomPlaceButton = document.createElement("button");

  randomPlaceContainer.classList.add("random-place-container");
  randomPlaceButton.classList.add("random-place-button", "button");

  randomPlaceButton.innerText = "Place randomly";

  randomPlaceContainer.appendChild(randomPlaceButton);
  shipMenuContaienr.appendChild(randomPlaceContainer);
  randomPlaceButton.addEventListener("click", () => {
    let shipSquares = document.querySelectorAll(
      "div#player-board span.ship-square",
    );
    shipSquares.forEach((square) => {
      square.classList.remove("ship-square");
      square.textContent = " ";
    });
    styleButton(randomPlaceButton);
    // removePlacedShips();
    removeExistingShips();
    generateShips();
    renderShips();
    activatComputerBoard();
    activateComputerBoard();
    hideShipMenuGui();
  });
}

function styleButton(btn) {
  btn.classList.add("clicked");
  btn.innerText = "placed";
  setTimeout(() => {
    btn.classList.remove("button");
    btn.classList.remove("clicked");
    btn.innerText = "Place randomly";
  }, 200);
}

function removeExistingShips() {
  return realPlayer.gameboard.removeAllShips();
}

function generateShips() {
  realPlayer.gameboard.placeShip(5, shipNames[0]);
  realPlayer.gameboard.placeShip(4, shipNames[1]);
  realPlayer.gameboard.placeShip(3, shipNames[2]);
  realPlayer.gameboard.placeShip(3, shipNames[3]);
  realPlayer.gameboard.placeShip(2, shipNames[4]);
}

function activateComputerBoard() {
  if (realPlayer.gameboard.areAllShipsPlace()) {
    activatComputerBoard();
  }
}

export function hidePlaceButton() {
  if (randomPlaceContainer != null) {
    randomPlaceContainer.style.display = "none";
  }
}

export { placeRandomly };
