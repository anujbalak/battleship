import { Moves } from "../module/possible-moves.mjs";
import { realPlayer } from "./playerGui.mjs";

let possibleMoves = [];

function getCords() {
    if (realPlayer.gameboard.isHit) {
        getPreDeterminedCords(realPlayer.gameboard.hitCords);
    }
    if (realPlayer.gameboard.isAShipSunk) {
        possibleMoves.splice(0, possibleMoves.length);
    }

    if(possibleMoves.length === 0 && areBombedShipSquares(bombedShipSquares())) {
        let arrayOfLocation = getBombedShipCords(bombedShipSquares());
        arrayOfLocation.forEach(location => {
            getPreDeterminedCords(location)
        })
    }

    if (possibleMoves.length === 0) {
        return generateCords();
    }

    let nextMove = possibleMoves[0];
    possibleMoves.shift();
    return nextMove;
}

function getPreDeterminedCords(hitCords) {
    let moves = new Moves();
    moves.setPossibleMoves(hitCords)
    moves.nextMoves.forEach(move => {
        possibleMoves.unshift(move);
    })
}
    

function generateCords() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    if (realPlayer.gameboard.isAlreadyFired([x, y])) {
        return getCords();
    }
    return [x, y];
}

function bombedShipSquares() {
    let hitShipsCords = document.querySelectorAll('div.player-lobby div#player-board span.hit-ship')
    return hitShipsCords
}

function areBombedShipSquares(arrayOfNodes) {
    if (arrayOfNodes != null) {
        if (arrayOfNodes.length > 0) {
            return true;
        }
    }
    return false;
}

function getBombedShipCords(arrayOfNodes) {
    let bombedShipLocationArray = []
    arrayOfNodes.forEach(node => {
        let value = makeArrayOfCords(node.getAttribute('value'));
        bombedShipLocationArray.push(value);
    })
    return bombedShipLocationArray;
}

function makeArrayOfCords(cordsString) {
    let cordsIntArr = cordsString.split(',');
    let x = Number(cordsIntArr[0]);
    let y = Number(cordsIntArr[1]);
    return [x, y]
}

export { getCords}