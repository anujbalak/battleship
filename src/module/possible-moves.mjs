import { realPlayer } from "../app/playerGui.mjs";

class Moves {
    constructor() {
        this.nextMoves = []
    }

    setUpMove(array) {
        if (array.length > 2 || typeof(array) !== 'object') {
            throw new Error('Array with length of 2 is required');
        }
        let x = array[0];
        let oldY = array[1];
        let newY = oldY + 1;
        if (x > 9 || x < 0 || newY > 9 || newY < 0 || realPlayer.gameboard.isAlreadyFired(array)) {
            return;
        }
        return this.nextMoves.push([x, newY]);
    }

    setDownMove(array) {
        if (array.length > 2 || typeof(array) !== 'object') {
            throw new Error('Array with length of 2 is required');
        }
        let x = array[0];
        let oldY = array[1];
        let newY = oldY - 1;
        if (x > 9 || x < 0 || newY > 9 || newY < 0 || realPlayer.gameboard.isAlreadyFired(array)) {
            return;
        }
        return this.nextMoves.push([x, newY]);
    }

    setRightMove(array) {
        if (array.length > 2 || typeof(array) !== 'object') {
            throw new Error('Array with length of 2 is required');
        }
        let oldX = array[0];
        let y = array[1];
        let newX = oldX + 1;
        if (newX > 9 || newX < 0 || y > 9 || y < 0 || realPlayer.gameboard.isAlreadyFired(array)) {
            return;
        }
        return this.nextMoves.push([newX, y]);
    }

    setLeftMove(array) {
        if (array.length > 2 || typeof(array) !== 'object') {
            throw new Error('Array with length of 2 is required');
        }
        let oldX = array[0];
        let y = array[1];
        let newX = oldX - 1;
        if (newX > 9 || newX < 0 || y > 9 || y < 0 || realPlayer.gameboard.isAlreadyFired(array)) {
            return;
        }
        return this.nextMoves.push([newX, y]);
    }

    setPossibleMoves(array) {
        return (
            this.setUpMove(array),
            this.setDownMove(array),
            this.setRightMove(array),
            this.setLeftMove(array)
        );
    };
}

export { Moves }