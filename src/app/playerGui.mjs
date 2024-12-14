import { Player } from "../module/player.mjs";

function playerGui() {
    let realPlayer = new Player();
    realPlayer.name = 'Anuj';
    realPlayer.type = 'real';

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

        playerBoard.classList.add(`${realPlayer.type}-board`);
        squares.forEach(square => {
            let cell = document.createElement('span');
            cell.classList.add('cell');
            // cell.innerText = square
            cell.setAttribute('value', square)
            playerBoard.appendChild(cell);
        });

        return playerBoard;
    }

    let playerName = renderPlayerName(realPlayer.name);
    realPlayer.setBoard()
    let playerBoard = renderPlayerBoard(realPlayer.gameboard.board)

    playerLobby.appendChild(playerName);
    playerLobby.appendChild(playerBoard);

    const MAIN_AREA = document.querySelector('main');
    MAIN_AREA.appendChild(playerLobby)

    function renderShips(ships) {
        ships.forEach(ship => {
            let shipLocation = ship.position;
            shipLocation.forEach(shipCords => {
                let shipSquare = document.querySelector(`div.real-board span[value='${shipCords}']`);
                shipSquare.classList.add("ship-square")
                shipSquare.innerText = '🚩'
            })
        })
    }

    realPlayer.gameboard.placeShipPre()
    renderShips(realPlayer.gameboard.ships)

    function hashmap(arr) {
        let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        let firstLetter = alphabet[arr[0]];
        let secondLetter = alphabet[arr[1]];
        let result = `${firstLetter}${secondLetter}`;
        return result;
    }
}

export {playerGui}