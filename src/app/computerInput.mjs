import { realPlayer } from "./playerGui.mjs";
import { refreshScore } from "./playerGui.mjs";

function computerInput() {
    let playerBoard = document.querySelectorAll('div.real-board span.cell')

    let isGameFinished = false;

    function generateCords() {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);

        return [x, y];
    }

    function computerChoose() {
        if (!isGameFinished) {
            let cords = generateCords();
            if (!realPlayer.gameboard.isAlreadyFired(cords)) {
                hitShip(cords);
                styleHitSquare(square);
                styleSunkShip();
                refreshScore(realPlayer.gameboard.score, realPlayer.gameboard.changeInScore, realPlayer.gameboard.scoreBonus);
                realPlayer.gameboard.scoreBonus = 0
            }
        }
    }

    function hitShip(receiveCords) {
        realPlayer.gameboard.receiveAttack(receiveCords)
        if (realPlayer.gameboard.areAllShipSunk()) {
            isGameFinished = true;
        }
    }

    function styleHitSquare(square) {
        let hit = realPlayer.gameboard.isHit;
        if (hit) {
            square.innerText = '💣'
            return square.classList.add('hit-ship');
        }
        square.innerText = '❎'
        return square.classList.add('missed');
    }

    function styleSunkShip() {
        let sunkShipsPosition = realPlayer.gameboard.sunkShipsPosition;
        let countSunkShips = sunkShipsPosition.length;
        if (countSunkShips > realPlayer.gameboard.totalSunkShips) {
            let shipPosition = sunkShipsPosition[countSunkShips - 1];
            shipPosition.forEach(cords => {
                let square = document.querySelector(`div.real-board span[value='${cords}']`);
                square.classList.add('part-of-sunk-ship')
                console.log(square);
                square.innerText = '☠'
            })
            realPlayer.gameboard.totalSunkShips += 1;
        }
    }

    function makeArrayOfCords(cordsString) {
        let cordsIntArr = cordsString.split(',');
        let x = (cordsIntArr[0]);
        let y = (cordsIntArr[1]);
        return [x, y]
    }

}


export { computerInput }