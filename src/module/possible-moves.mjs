class Moves {
    constructor(current) {
        this.current = current
        this.u = null
        this.d = null
        this.r = null;
        this.l = null;
    }

    setUpMove(array) {
        if (array.length > 2 || typeof(array) !== 'object') {
            throw new Error('Array with length of 2 is required');
        }
        let x = array[0];
        let oldY = array[1];
        let newY = oldY + 1;
        if (x > 9 || x < 0 || newY > 9 || newY < 0) {
            return;
        }
        return this.u = [x, newY];
    }

    setDownMove(array) {
        if (array.length > 2 || typeof(array) !== 'object') {
            throw new Error('Array with length of 2 is required');
        }
        let x = array[0];
        let oldY = array[1];
        let newY = oldY - 1;
        if (x > 9 || x < 0 || newY > 9 || newY < 0) {
            return;
        }
        return this.d = [x, newY];
    }

    setRightMove(array) {
        if (array.length > 2 || typeof(array) !== 'object') {
            throw new Error('Array with length of 2 is required');
        }
        let oldX = array[0];
        let y = array[1];
        let newX = oldX + 1;
        if (newX > 9 || newX < 0 || y > 9 || y < 0) {
            return;
        }
        return this.r = [newX, y];
    }

    setLeftMove(array) {
        if (array.length > 2 || typeof(array) !== 'object') {
            throw new Error('Array with length of 2 is required');
        }
        let oldX = array[0];
        let y = array[1];
        let newX = oldX - 1;
        if (newX > 9 || newX < 0 || y > 9 || y < 0) {
            return;
        }
        return this.l = [newX, y];
    }
}

export { Moves}