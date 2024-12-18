let realPlayer,
    isComputerWin,
    isPlayerWin,
    computerPlayer;

function renderWinner(realPlay, isPlayWin, computerPlay, isComputeWin) {
    realPlayer = realPlay;
    isPlayerWin = isPlayWin;
    isComputerWin = isComputeWin;
    computerPlayer = computerPlay;
    showDialog(isPlayWin, computerPlay)
    restartGame();
    closeDialog();
    let winner = getWinnerNameAndScore()
    let failure = getFailureNameAndScore()
    console.log(winner)
    console.log(failure)
    winnerNameElement.innerText = `${winner.name} won!`
    winnerScoreElement.innerText = winner.score;
    failureName.innerText = failure.name;
    failureScore.innerText = failure.score;
}

const dialog = document.createElement('dialog');
const winnerContainer = document.createElement('div');
const winnerNameElement = document.createElement('p');
const winnerScoreElement = document.createElement('p');
const failureContainer = document.createElement('div');
const failureName = document.createElement('p');
const failureScore = document.createElement('p');

const buttonContainer = document.createElement('div');
const closeButton = document.createElement('button');
const restartButtun = document.createElement('button');

dialog.id = 'winnerDialog'
winnerContainer.className = 'winner-container';
winnerNameElement.className = 'winner-name';
winnerScoreElement.className = 'winner-score';
failureContainer.className = 'failure-container';
failureName.className = 'failure-name';
failureScore.className = 'failure-score';

buttonContainer.className = 'button-container'
closeButton.className = 'close-btn';
restartButtun.className = 'restart-btn'

closeButton.autofocus



restartButtun.innerText = 'Restart';
closeButton.innerText = 'Close'

winnerContainer.appendChild(winnerNameElement);
winnerContainer.appendChild(winnerScoreElement);
failureContainer.appendChild(failureName);
failureContainer.appendChild(failureScore);

buttonContainer.appendChild(restartButtun);
buttonContainer.appendChild(closeButton)

dialog.appendChild(winnerContainer);
dialog.appendChild(failureContainer);
dialog.appendChild(buttonContainer);

document.body.appendChild(dialog)


function showDialog() {
    if (isPlayerWin || isComputerWin) {
        dialog.style.display = 'grid';
        dialog.showModal();
    }
    return;
}

function restartGame() {
    restartButtun.addEventListener('click', () => {
        location.reload()
    })
}

function closeDialog() {
    closeButton.addEventListener('click', () => {
        dialog.style.display = 'none'
        dialog.close();
    })
}

function getWinnerNameAndScore() {
    let name = 'winner'
    let score = 0;
    if(isPlayerWin === true) {
        score = computerPlayer.gameboard.score;
        name = realPlayer.name;
    } else if (isComputerWin === true) {
        score = realPlayer.gameboard.score
        name = computerPlayer.name
    }   
    return {name, score};
}

function getFailureNameAndScore() {
    let name = 'failure'
    let score = 0;
    if(isPlayerWin === false) {
        score = computerPlayer.gameboard.score;
        name = realPlayer.name;
    } else if (isComputerWin === false) {
        score = realPlayer.gameboard.score
        name = computerPlayer.name
    }   
    return {name, score};
}

export { renderWinner }