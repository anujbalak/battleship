import { realPlayer } from "./playerGui.mjs"

let grabbedBlock = null;
let nodeToHide = null;
let shipPosition = [];

function dragNDropShips() {
    const shipContainers = document.querySelectorAll('div.ship-menu div#ship-container');
    const shipSquares = document.querySelectorAll('div#ship-container span#ship-square')
    shipContainers.forEach(container => {
        let shipBlocks = container.childNodes;
        shipSquares.forEach(node => {
            node.addEventListener('mousedown', (e) => {
                for(let i = 0; i <= shipBlocks.length; i++) {
                    if (shipBlocks[i] === node) {
                        return grabbedBlock = i;
                    }
                }
            })
        })

        container.addEventListener('dragstart', (e) => {
            handleDragStart(e);
        })

        container.addEventListener('dragend', (e) => {
            handleDragEnd(e);
        })
    })


    const board = document.querySelector('main div.player-lobby div#player-board');
    const boardSquares = document.querySelectorAll('main div.player-lobby div#player-board span.cell')
    board.childNodes.forEach(square => {
        square.addEventListener('dragover', (e) => {
            handleDragOver(e);
           // console.log(square.getAttribute('value'));
            
        })

        square.addEventListener('dragenter', (e) => {
            handleDragEnter(e); 
        })

        square.addEventListener('dragleave', (e) => {
            handleDragLeave(e);
        })

        square.addEventListener('drop', (e) => {
            handleDrop(e);
        })
    })
}

function handleDragStart(e) {
    nodeToHide = e.target;
    e.dataTransfer.setData('direction', e.target.getAttribute('value'));
    e.dataTransfer.setData('length', e.target.childNodes.length);
    e.target.classList.add('dragging')
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0)

}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    e.target.classList.remove('hide');
}

function handleDragOver(e) {
    if (!isPreOccupied(shipPosition)) {
        e.preventDefault();
        e.stopPropagation()
        return false;
    }
}

function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation()
    let nodeArray = buildNodeArray(e)
    if (nodeArray.every(node => node !== null)) {
        nodeArray.forEach(node => {
            node.classList.add('drag-over-ship')
        });
    }
}

function buildNodeArray(e) {
    let direction = e.dataTransfer.getData('direction');
    let length = e.dataTransfer.getData('length');
    let x = Number(e.target.getAttribute('value').split(',')[0]);
    let y = Number(e.target.getAttribute('value').split(',')[1]);
    shipPosition = [[x, y]];
    let nodeArray = [document.querySelector(`main div.player-lobby div#player-board span[value='${[x, y]}']`)]
    
    const makeHorizontalArray = () => {
        if (x >= grabbedBlock) {
            for (let i = 1; i <= grabbedBlock; i++) {
                let cords = [x - i, y]
                shipPosition.unshift(cords);
                nodeArray.unshift(document.querySelector(`main div.player-lobby div#player-board span[value='${cords}']`))
            }
            let i = length - nodeArray.length;
            if (i > 0) {
                while (i > 0) {
                    let cords = [x + i, y]
                    shipPosition.push(cords);
                    nodeArray.push(document.querySelector(`main div.player-lobby div#player-board span[value='${cords}']`))
                    i--;
                }
            }
        }
    }

    const makeVerticalArray = () => {
        if (y >= grabbedBlock) {
            for (let i = 1; i <= grabbedBlock; i++) {
                let cords = [x, y - i]
                shipPosition.unshift(cords);
                nodeArray.unshift(document.querySelector(`main div.player-lobby div#player-board span[value='${cords}']`))
            }
            let i = length - nodeArray.length;
            if (i > 0) {
                while (i > 0) {
                    let cords = [x, y + i]
                    shipPosition.push(cords);
                    nodeArray.push(document.querySelector(`main div.player-lobby div#player-board span[value='${cords}']`))
                    i--;
                }
            }
        }
    }
    
    if (grabbedBlock !== null) {
        if (direction === 'h' ) {
            makeHorizontalArray();
        } else if (direction === 'v') {
            makeVerticalArray();
        }
    }
    
    let blankArray = []
    if (nodeArray.length == length) {
        return nodeArray;
    }
    return blankArray;
}

function handleDragLeave(e) {
    let nodeArray = buildNodeArray(e)
    if (nodeArray.every(node => node !== null)) {
        nodeArray.forEach(node => {
            node.classList.remove('drag-over-ship')
        });
    }
}

function handleDrop(e) {
    handleDragLeave(e);
    let nodeArray = buildNodeArray(e)
    if (!isPreOccupied(shipPosition)) {
        if (nodeToHide !== null) {
            nodeToHide.style.display = 'none'
        }
        if (nodeArray.every(node => node !== null)) {
            nodeArray.forEach(node => {
                node.classList.add('ship-square');
                node.innerText = '🚩'
            });
        }
        let length = e.dataTransfer.getData('length');;
        setShipPosition(length, nodeArray);
    }
}

function setShipPosition(length, nodeArray) {
    let ships = realPlayer.gameboard.ships;
    let cordsArray = []
    nodeArray.forEach(node => {
        let x = Number(node.getAttribute('value').split(',')[0]);
        let y = Number(node.getAttribute('value').split(',')[1]);
        cordsArray.push([x, y]);
    })
    for(let i = 0; i < ships.length; i++) {
        let shipLength = ships[i].length;
        let shipPosition = ships[i].position;
        if (shipLength == length && shipPosition.length === 0) {
            return realPlayer.gameboard.ships[i].position = cordsArray;
        }
    }
}

function isPreOccupied(e) {
    let isOccupied = false;
    // let x = Number(e.target.getAttribute('value').split(',')[0]);
    // let y = Number(e.target.getAttribute('value').split(',')[1])
    let ships = realPlayer.gameboard.ships;
    for (let i = 0; i < e.length && !isOccupied; i++) {
        let x = e[i][0];
        let y = e[i][1];
        if (ships.some(ship => ship.position.some(cords => cords[0] === x && cords[1] === y))) {
            return  isOccupied = true;
        }
    }
    console.log(isOccupied);
    return isOccupied;
}

export { dragNDropShips }