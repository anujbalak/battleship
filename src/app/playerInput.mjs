import { computerPlayer} from "./computerGui.mjs";
import { refreshScore } from "./playerGui.mjs";

function playerInput() {
    let playerBoard = document.querySelectorAll('div.real-board span.cell')
    let computerBoard = document.querySelectorAll('div.computer-board span.cell');

    let isGameFinished = false;

    computerBoard.forEach(square => {
        
        square.addEventListener('click',() => {
            if (!isGameFinished) {
                let recievedCords = square.getAttribute('value');
                let cords = makeArrayOfCords(recievedCords);
                if (!computerPlayer.gameboard.isAlreadyFired(cords)) {
                    hitShip(cords);
                    styleHitSquare(square);
                    styleSunkShip();
                    refreshScore(computerPlayer.gameboard.score, computerPlayer.gameboard.changeInScore, computerPlayer.gameboard.scoreBonus);
                    computerPlayer.gameboard.scoreBonus = 0
                }
            }
        }) 
        
    })

    function hitShip(receiveCords) {
        computerPlayer.gameboard.receiveAttack(receiveCords)
        if (computerPlayer.gameboard.areAllShipSunk()) {
            isGameFinished = true;
        }
    }

    function styleHitSquare(square) {
        let hit = computerPlayer.gameboard.isHit;
        if (hit) {
            square.innerText = '💣'
            return square.classList.add('hit-ship');
        }
        square.innerText = '❎'
        return square.classList.add('missed');
    }

    function styleSunkShip() {
        let sunkShipsPosition = computerPlayer.gameboard.sunkShipsPosition;
        let countSunkShips = sunkShipsPosition.length;
        if (countSunkShips > computerPlayer.gameboard.totalSunkShips) {
            let shipPosition = sunkShipsPosition[countSunkShips - 1];
            shipPosition.forEach(cords => {
                let square = document.querySelector(`div.computer-board span[value='${cords}']`);
                square.classList.add('part-of-sunk-ship')
                console.log(square);
                square.innerText = '☠'
            })
            computerPlayer.gameboard.totalSunkShips += 1;
        }
    }

    function makeArrayOfCords(cordsString) {
        let cordsIntArr = cordsString.split(',');
        let x = (cordsIntArr[0]);
        let y = (cordsIntArr[1]);
        return [x, y]
    }

}

export { playerInput }