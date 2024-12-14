import { Player } from "../module/player.mjs";

const computerPlayer = new Player()
function computerGui() {
    computerPlayer.name = 'Computer';
    computerPlayer.type = 'computer';

    let playerLobby = document.createElement('div');
    playerLobby.classList.add('player-lobby');

    function renderPlayerName(name) {
        let playerNameContainer = document.createElement('div');
        let playerName = document.createElement("p");
        playerNameContainer.classList.add("player-name-container", "flex-container");
        playerName.classList.add('player-name', "text");

        playerName.innerText = `${name}'s Board`;
        playerNameContainer.appendChild(playerName);
        return playerNameContainer;
    }

    function renderPlayerBoard(squares) {
        let playerBoard = document.createElement('div');

        playerBoard.classList.add(`${computerPlayer.type}-board`);
        squares.forEach(square => {
            let cell = document.createElement('span');
            cell.classList.add('cell');
            // cell.innerText = square
            cell.setAttribute('value', square)
            playerBoard.appendChild(cell);
        });

        return playerBoard;
    }

    let playerName = renderPlayerName(computerPlayer.name);
    computerPlayer.setBoard()
    let playerBoard = renderPlayerBoard(computerPlayer.gameboard.board)

    playerLobby.appendChild(playerName);
    playerLobby.appendChild(playerBoard);

    const MAIN_AREA = document.querySelector('main');
    MAIN_AREA.appendChild(playerLobby)

    function renderShips(ships) {
        ships.forEach(ship => {
            let shipLocation = ship.position;
            shipLocation.forEach(shipCords => {
                let shipSquare = document.querySelector(`div.computer-board span[value='${shipCords}']`);
                shipSquare.classList.add("ship-square")
                shipSquare.innerText = '🚩'
            })
        })
    }

    computerPlayer.gameboard.placeShipPre()
    renderShips(computerPlayer.gameboard.ships)
}

export { computerGui, computerPlayer}