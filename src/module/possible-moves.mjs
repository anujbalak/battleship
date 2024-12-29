import { realPlayer } from "../app/playerGui.mjs";

class Moves {
  constructor() {
    this.nextMoves = [];
  }

  setUpMove(array) {
    if (array.length > 2 || typeof array !== "object") {
      throw new Error("Array with length of 2 is required");
    }
    let x = array[0];
    let oldY = array[1];
    let newY = oldY + 1;
    let nextMove = [x, newY];
    if (
      x > 9 ||
      x < 0 ||
      newY > 9 ||
      newY < 0 ||
      realPlayer.gameboard.isAlreadyFired(nextMove)
    ) {
      return;
    }
    return this.nextMoves.push(nextMove);
  }

  setDownMove(array) {
    if (array.length > 2 || typeof array !== "object") {
      throw new Error("Array with length of 2 is required");
    }
    let x = array[0];
    let oldY = array[1];
    let newY = oldY - 1;
    let nextMove = [x, newY];
    if (
      x > 9 ||
      x < 0 ||
      newY > 9 ||
      newY < 0 ||
      realPlayer.gameboard.isAlreadyFired(nextMove)
    ) {
      return;
    }
    return this.nextMoves.push(nextMove);
  }

  setRightMove(array) {
    if (array.length > 2 || typeof array !== "object") {
      throw new Error("Array with length of 2 is required");
    }
    let oldX = array[0];
    let y = array[1];
    let newX = oldX + 1;
    let nextMove = [newX, y];
    if (
      newX > 9 ||
      newX < 0 ||
      y > 9 ||
      y < 0 ||
      realPlayer.gameboard.isAlreadyFired(nextMove)
    ) {
      return;
    }
    return this.nextMoves.push(nextMove);
  }

  setLeftMove(array) {
    if (array.length > 2 || typeof array !== "object") {
      throw new Error("Array with length of 2 is required");
    }
    let oldX = array[0];
    let y = array[1];
    let newX = oldX - 1;
    let nextMove = [newX, y];
    if (
      newX > 9 ||
      newX < 0 ||
      y > 9 ||
      y < 0 ||
      realPlayer.gameboard.isAlreadyFired(nextMove)
    ) {
      return;
    }
    return this.nextMoves.push(nextMove);
  }

  setPossibleMoves(array) {
    if (array === null || array.length !== 2) return;
    return (
      this.setUpMove(array),
      this.setDownMove(array),
      this.setRightMove(array),
      this.setLeftMove(array)
    );
  }
}

export { Moves };
