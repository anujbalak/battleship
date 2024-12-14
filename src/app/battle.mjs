import { computerGui, computerPlayer} from "./computerGui.mjs";

function battle() {
    let playerBoard = document.querySelectorAll('div.real-board span.cell')
    let computerBoard = document.querySelectorAll('div.computer-board span.cell');

    let computerShips = computerPlayer.gameboard.ships;

    computerBoard.forEach(square => {
        square.addEventListener('click',() => {
            let recievedCords = square.getAttribute('value');
            let cords = makeArrayOfCords(recievedCords);
            hitShip(cords);
            styleHitSquare(square);
        }) 
    })

    function hitShip(receiveCords) {
        computerPlayer.gameboard.receiveAttack(receiveCords)
        let isFinish = areAllComputerShipsSunk();
        if (isFinish) {
            console.log('finish')
        }
    }

    function styleHitSquare(square) {
        let hit = computerPlayer.gameboard.isHit;
        if (hit) {
            console.log(computerPlayer.gameboard.sunkShipsPosition)
            square.innerText = '💣'
            return square.classList.add('hit-ship');
        }
        square.innerText = '❎'
        return square.classList.add('missed');
    }
    function areAllComputerShipsSunk() {
        return computerPlayer.gameboard.areAllShipSunk();
    }
    function makeArrayOfCords(cordsString) {
        let cordsIntArr = cordsString.split(',');
        let x = (cordsIntArr[0]);
        let y = (cordsIntArr[1]);
        return [x, y]
    }

}

export { battle }