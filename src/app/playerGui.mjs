import { Player } from "../module/player.mjs";
import { computerRun } from "./computerInput.mjs";

let realPlayer = new Player();
function playerGui() {
    realPlayer.type = 'real';

    let playerLobby = document.createElement('div');
    playerLobby.classList.add('player-lobby');

    function renderPlayerName() {
        let playerNameContainer = document.createElement('div');
        let playerNameInput = document.createElement("input");
        playerNameContainer.classList.add("player-name-container", "flex-container");
        playerNameInput.placeholder = 'Enter your name here'
        realPlayer.name = playerNameInput.value;
        playerNameInput.autofocus;
        playerNameInput.addEventListener('keyup', (event) => {
            if (event.keyCode === 13 || event.code === 13) {
                playerNameInput.blur();
                realPlayer.name = playerNameInput.value;
                const playerName = document.querySelector('p');
                playerName.classList.add('player-name', "text");
                playerName.textContent = `${realPlayer.name}'s Board`;
                localStorage.setItem('playerName', realPlayer.name);
                playerNameInput.style.display = 'none'
                playerNameContainer.appendChild(playerName)
            }
        })
        playerNameContainer.appendChild(playerNameInput);
        return playerNameContainer;
    }


    function renderPlayerBoard(squares) {
        let playerBoard = document.createElement('div');

        playerBoard.classList.add(`${realPlayer.type}-board`);
        playerBoard.id = 'player-board'
        squares.forEach(square => {
            let cell = document.createElement('span');
            cell.classList.add('cell');
            cell.id = 'cell';
            // cell.innerText = square
            cell.setAttribute('value', square)
            playerBoard.appendChild(cell);
        });

        return playerBoard;
    }

    let playerName = renderPlayerName();
    realPlayer.setBoard()
    let playerBoard = renderPlayerBoard(realPlayer.gameboard.board)

    playerLobby.appendChild(playerName);
    playerLobby.appendChild(playerBoard);

    const MAIN_AREA = document.querySelector('main');
    MAIN_AREA.appendChild(playerLobby)

    // realPlayer.gameboard.placeShipPre()
    // renderShips(realPlayer.gameboard.ships)
    // console.log(realPlayer.gameboard.ships)
    
}

export function renderShips() {
    let ships = realPlayer.gameboard.ships;
    ships.forEach(ship => {
        let shipLocation = ship.position;
        shipLocation.forEach(shipCords => {
            let shipSquare = document.querySelector(`div.real-board span[value='${shipCords}']`);
            shipSquare.classList.add("ship-square")
            shipSquare.innerText = '🚩'
        })
        ship.isPlace = true;
    })
}
function renderPlayerScore(playerLobby) {
    let score = 0;
    let scoreContainer = document.createElement('div');
    let scoreText = document.createElement('p');
    let playerNameNode = document.createElement('p');

    scoreContainer.classList.add('score-container');
    scoreText.classList.add('score-text');
    playerNameNode.classList.add('player-name-node');
    // let playerLobby = document.querySelector('main div.player-lobby+div');
    playerNameNode.innerText = `Your Score:`;
    scoreText.innerText = score;
    scoreContainer.appendChild(playerNameNode)
    scoreContainer.appendChild(scoreText);
    playerLobby.appendChild(scoreContainer);
}

function refreshScore(score, changeInScore, bonusScore) {
    let scoreNode = document.querySelector('main div+div div.score-container p.score-text');
    runScoreAnimation(scoreNode, changeInScore, bonusScore);
    setTimeout(() => {
        scoreNode.innerText = score;
        scoreNode.setAttribute('id', '')
        computerRun();
    }, 500);


}

function runScoreAnimation(scoreNode, changeInScore, bonusScore) {
    let scoreChangeText = ``;
    if (changeInScore === 50) {
        scoreChangeText = `+${changeInScore}`
        scoreNode.setAttribute('id', 'score-increase')
    } else if (changeInScore === 5) {
        scoreChangeText = `-${changeInScore}`
        scoreNode.setAttribute('id', 'score-decrease')
    } else if (changeInScore === 0) {
        scoreChangeText = changeInScore
    }
    if (bonusScore === 100) {
        scoreChangeText = `+${changeInScore + bonusScore}`
        scoreNode.setAttribute('id', 'score-bonus')
    }
    scoreNode.innerText = scoreChangeText;
}

export {playerGui, refreshScore, realPlayer, renderPlayerScore}