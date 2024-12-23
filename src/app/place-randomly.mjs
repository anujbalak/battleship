import { realPlayer, renderShips } from "./playerGui.mjs";
import { activatComputerBoard } from "./computerGui.mjs";
import { hideShipMenuGui } from "./ship-menu.mjs";


let randomPlaceButton = null;
function placeRandomly() {
    const shipMenuContaienr = document.querySelector('div.ship-menu-container');

    const randomPlaceContainer = document.createElement('div');
    randomPlaceButton = document.createElement('button');

    randomPlaceContainer.classList.add('random-place-container');
    randomPlaceButton.classList.add('random-place-button');

    randomPlaceButton.innerText = 'Place randomly'

    randomPlaceContainer.appendChild(randomPlaceButton);
    shipMenuContaienr.appendChild(randomPlaceContainer)
    randomPlaceButton.addEventListener('click', () => {
        let shipSquares = document.querySelectorAll('div#player-board span.ship-square');
        shipSquares.forEach(square => {
            square.classList.remove('ship-square')
            square.textContent = ' '
        })
        styleButton(randomPlaceButton);
        // removePlacedShips();
        removeExistingShips();
        generateShips();
        renderShips();
        activatComputerBoard();
        activateComputerBoard();
        hideShipMenuGui();
    })

}

function styleButton(btn) {
    btn.classList.add('clicked')
    btn.innerText = 'placed'
    setTimeout(() => {
        btn.classList.remove('clicked');
        btn.innerText = 'Place randomly'
    }, 500)
}

function removeExistingShips() {
    return realPlayer.gameboard.removeAllShips();
}

function generateShips() {
    realPlayer.gameboard.placeShip(5);
    realPlayer.gameboard.placeShip(4)
    realPlayer.gameboard.placeShip(3)
    realPlayer.gameboard.placeShip(3)
    realPlayer.gameboard.placeShip(2)
}

function activateComputerBoard() {
    if (realPlayer.gameboard.areAllShipsPlace()) {
        activatComputerBoard();
    }
}

export function hidePlaceButton() {
    if (randomPlaceButton != null) {
        randomPlaceButton.classList.add('hide');
    }
}

export{ placeRandomly }