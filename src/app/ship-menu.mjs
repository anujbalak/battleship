import { realPlayer } from './playerGui.mjs'
import { dragNDropShips } from './ship-drag-n-drop.mjs';

function shipMenuUi() {
    const shipMenuContainer = document.createElement('div');
    const rotateInstructionsContainer = document.createElement('div');
    const rotateInstructions = document.createElement('div');
    const rotateButton = document.createElement('input');
    const rotateLabel = document.createElement('label');
    const shipMenu = document.createElement('div');

    shipMenuContainer.className = 'ship-menu-container';
    rotateInstructionsContainer.className = 'rotate-instructions-container'
    rotateInstructions.className = 'rotate-instructions'
    shipMenu.className = 'ship-menu';

    rotateButton.type = 'checkbox'
    rotateButton.id = 'toggle';
    rotateButton.className = 'checkbox';
    rotateLabel.setAttribute('for', 'toggle');
    rotateLabel.className = 'switch';

    rotateInstructions.innerText = 'Toggle this button to rotate the ships.'
    shipMenuContainer.appendChild(rotateInstructionsContainer);
    rotateInstructionsContainer.appendChild(rotateInstructions)
    rotateInstructionsContainer.appendChild(rotateButton);
    rotateInstructionsContainer.appendChild(rotateLabel);
    shipMenuContainer.appendChild(shipMenu);
    let main = document.querySelector('main');
    main.appendChild(shipMenuContainer);
    buildShip(5, shipMenu, rotateButton)
    buildShip(4, shipMenu, rotateButton)
    buildShip(3, shipMenu, rotateButton)
    buildShip(3, shipMenu, rotateButton)
    buildShip(2, shipMenu, rotateButton)
    dragNDropShips();
}

function buildShip(length, shipMenu, rotateButton) {
    const shipContainer = document.createElement('div');
    shipContainer.draggable = true;
    shipContainer.classList.add('flex-container', 'ship-container');
    shipContainer.id = 'ship-container';
    shipContainer.setAttribute('value', 'h');
    realPlayer.gameboard.buildShip(length);
    for(let i = 0; i < length; i++) {
        ship(shipContainer);
    }
    shipMenu.appendChild(shipContainer)
    shipContainer.addEventListener('click', () => {
        if (shipContainer.id !== 'selected-ship') {
            shipContainer.id = 'selected-ship';
           toggleShipsDirection(rotateButton, shipContainer)
        } else {
            shipContainer.id = '';
        }
    })
}

function ship(shipContainer) {
    const square = document.createElement('span');
    square.classList.add('ship-square');
    square.id = 'ship-square';
    square.innerText = '🚩'
    shipContainer.appendChild(square);
}

function toggleShipsDirection(rotateButton, shipContainer) {
    rotateButton.addEventListener('click', () => {
        rotateShips(shipContainer);
    })
}

function rotateShips(shipContainer) {
    if (shipContainer.getAttribute('value') === 'h') {
        shipContainer.setAttribute('value', 'v');
    } else if (shipContainer.getAttribute('value') === 'v') {
        shipContainer.setAttribute('value', 'h');
    }
}

export { shipMenuUi }