import { renderPlayerName } from "./playerGui.mjs";

function playerNameInput(player) {
    dialogGui(player);
}

function dialogGui(player) {
    const dialog = document.createElement('dialog');
    const dialogBody = document.createElement('div');
    const closeButton = document.createElement('button');
    const playerNameInputLabel = document.createElement('label');
    const playerNameInput = document.createElement('input');
    const confirmButton = document.createElement('button');

    dialog.className = 'dialog';
    dialogBody.className = 'dialog-body'
    closeButton.className = 'close-dialog-btn';
    playerNameInputLabel.className = 'player-name-input-label';
    playerNameInput.className = 'player-name-input';
    confirmButton.className = 'confirm-name-btn'

    closeButton.autofocus;
    playerNameInputLabel.innerText = 'Enter player name'
    closeButton.innerText = '✖'
    confirmButton.innerText = 'Confirm'

    showDialog(dialog)
    closeDialog(dialog, closeButton, player);
    dialog.appendChild(dialogBody)
    dialogBody.appendChild(closeButton);
    dialogBody.appendChild(playerNameInputLabel)
    playerNameInputLabel.appendChild(playerNameInput)
    dialogBody.appendChild(confirmButton)
    document.body.appendChild(dialog);
    getName(player, playerNameInput, confirmButton, dialog)
}

function showDialog(dialog) {
    window.onload = function() {
        dialog.showModal()
    }
}

function closeDialog(dialog, btn, player) {
    btn.addEventListener('click', () => {
        dialog.close();
        setPlayerName('', player)
    }) 
}

function getName(player, input, confirmBtn, dialog) {
    let name = ''
    confirmBtn.addEventListener('click', () => {
        name = input.value;
        dialog.close();
        setPlayerName(name, player)
    })
}

function setPlayerName(name, player) {
    if (name === '' || name.length === 0 || name === null || name === undefined) {
        name = 'Player'
    }
    player.name = name;
    renderPlayerName(name)
}

export { playerNameInput }