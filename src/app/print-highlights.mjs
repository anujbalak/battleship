import { realPlayer } from "./playerGui.mjs"
import { computerPlayer } from "./computerGui.mjs"
function printHighlights(playerType) {  
    if (playerType === 'real') {
        let sunkShips = computerPlayer.gameboard.sunkShips
        let lastSunkShip = sunkShips[sunkShips.length - 1];
        printSunkShip(realPlayer.name, computerPlayer.name, lastSunkShip.name);
    } else {
        let sunkShips = realPlayer.gameboard.sunkShips
        let lastSunkShip = sunkShips[sunkShips.length - 1];
        printSunkShip(computerPlayer.name, 'your', lastSunkShip.name);
    }
    let logMessages = document.querySelectorAll('main div#log-container div.print-container')
    if (logMessages.length > 3) {
        for(let i = 0; i < logMessages.length - 3; i++) {
            logMessages[i].remove();
        }
    }
}

function printSunkShip(attacker, owner, shipName) {
    const logContainer = document.querySelector('main div#log-container')
    const printContainer = document.createElement('div');
    const message = document.createElement('p');

    printContainer.className = 'print-container'
    message.className = 'message';

    message.innerText = `${attacker} destroyed ${owner}'s ${shipName}`

    printContainer.appendChild(message);
    logContainer.appendChild(printContainer);
}

export function hideLogMessages() {
    let logMessages = document.querySelectorAll('main div#log-container div.print-container')
    logMessages.forEach(log => {
        log.remove();
    })
}


export { printHighlights }