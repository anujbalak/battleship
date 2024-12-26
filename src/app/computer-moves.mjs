import { Moves } from "../module/possible-moves.mjs";
import { realPlayer } from "./playerGui.mjs";

let possibleMoves = [];

function getCords() {
    if (realPlayer.gameboard.isHit) {
        getPreDeterminedCords([realPlayer.gameboard.hitCords]);
    }
    if (realPlayer.gameboard.isAShipSunk) {
        possibleMoves.splice(0, possibleMoves.length);
    }
    if (possibleMoves.length === 0) {
        return generateCords();
    }
    

    let nextMove = possibleMoves[0];
    possibleMoves.shift();
    return nextMove;
}

function getPreDeterminedCords(hitCords) {
    hitCords.forEach(cords =>  {
        let moves = new Moves();
        moves.setPossibleMoves(cords)
        moves.nextMoves.forEach(move => {
            possibleMoves.unshift(move);
        })
        console.log(moves.nextMoves);
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

function getHitCords() {
    let hitShipsCords = document.querySelectorAll('div.player-lobby div#player-board span.hit-ship')
    return hitShipsCords
}

function isHitCords(hitShipsCords) {
    if (hitShipsCords.length > 0) {
        return true;
    }
    return false;
}


function getCordsOfNotSunkShips(hitShipsCords) {
    let result =[]
    hitShipsCords.forEach(square => {
        result.push(makeArrayOfCords(square.getAttribute('value')));
    })
    console.log(result)
    return result;
}

function makeArrayOfCords(cordsString) {
    let cordsIntArr = cordsString.split(',');
    let x = (cordsIntArr[0]);
    let y = (cordsIntArr[1]);
    return [x, y]
}

export { getCords}