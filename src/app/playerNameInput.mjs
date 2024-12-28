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

    const showAgainlabel = document.createElement('label')
    const showAgainCheckbox = document.createElement('input')

    dialog.className = 'dialog';
    dialogBody.className = 'dialog-body'
    closeButton.className = 'close-dialog-btn';
    playerNameInputLabel.className = 'player-name-input-label';
    playerNameInput.className = 'player-name-input';
    confirmButton.className = 'confirm-name-btn'
    showAgainlabel.className = 'show-again-label';
    showAgainCheckbox.className = 'show-again-checkbox';

    closeButton.autofocus;
    showAgainCheckbox.id = 'show-again'
    showAgainCheckbox.type = 'checkbox'
    playerNameInputLabel.innerText = 'Enter player name'
    closeButton.innerText = '✖'
    confirmButton.innerText = 'Confirm'

    showAgainlabel.innerText = "Don't show again"

    showDialog(dialog)
    closeDialog(dialog, closeButton, player, showAgainCheckbox);
    dialog.appendChild(dialogBody)
    dialogBody.appendChild(closeButton);
    dialogBody.appendChild(playerNameInputLabel)
    playerNameInputLabel.appendChild(playerNameInput)
    dialogBody.appendChild(showAgainlabel)
    showAgainlabel.appendChild(showAgainCheckbox)
    dialogBody.appendChild(confirmButton)
    document.body.appendChild(dialog);
    getName(player, playerNameInput, confirmButton, dialog, showAgainCheckbox)
}

function showDialog(dialog) {
    window.onload = function() {
        let showAgain = JSON.parse(localStorage.getItem('showAgain'));
        if (showAgain === true || showAgain === null) {
            return dialog.showModal()
        }
        let playerName = localStorage.getItem('playerName');
        renderPlayerName(playerName);
    }
}

function closeDialog(dialog, btn, player, showAgainCheckbox) {
    btn.addEventListener('click', () => {
        dialog.close();
        setPlayerName('', player, showAgainCheckbox)
    }) 
}

function getName(player, input, confirmBtn, dialog, checkbox) {
    let name = ''
    confirmBtn.addEventListener('click', () => {
        name = input.value;
        dialog.close();
        setPlayerName(name, player, checkbox)
    })
}

function setPlayerName(name, player, checkbox) {
    if (name === '' || name.length === 0 || name === null || name === undefined) {
        name = 'Player'
    }
    player.name = name;
    checkShowAgain(checkbox, name)
    renderPlayerName(name)
}

function checkShowAgain(checkbox, inputName) {
    if (checkbox.checked) {
        JSON.stringify(localStorage.setItem('showAgain', false));
        JSON.stringify(localStorage.setItem('playerName', inputName))
        return
    }
    localStorage.setItem('showAgain', true)
    return
}
export { playerNameInput }