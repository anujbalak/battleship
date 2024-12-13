import { Gameboard } from "./gameboard.mjs";

class Player {
  constructor() {
    this.name = null;
    this.type = null;
    this.gameboard = null;
  }

  setBoard() {
    let board = new Gameboard();
    return (this.gameboard = board);
  }
}

export { Player };
