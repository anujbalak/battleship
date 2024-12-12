import { Ship } from "./ship.mjs";

class Gameboard {
  constructor() {
    this.board = generateBoard();
    this.ships = [];
    this.missed = [];
  }

  placeShip() {
    let carrier = new Ship();
    carrier.length = 5;
    carrier.position = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ];

    let battleship = new Ship();
    battleship.length = 4;
    battleship.position = [
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
    ];

    let destroyer = new Ship();
    destroyer.length = 3;
    destroyer.position = [
      [3, 0],
      [3, 1],
      [3, 2],
    ];

    let submarine = new Ship();
    submarine.length = 3;
    submarine.position = [
      [5, 5],
      [5, 6],
      [5, 7],
    ];

    let patrolBoat = new Ship();
    patrolBoat.length = 2;
    patrolBoat.position = [
      [7, 1],
      [7, 2],
    ];
    this.ships.push(carrier, battleship, destroyer, submarine, patrolBoat);
  }

  receiveAttack(recievedCords) {
    let gotShip = false;
    let i = 0;
    let j = 0;

    return this.missed.push(recievedCords);
  }
}

function generateBoard() {
  let n = 10;
  let x = 0;
  let y = 0;
  let board = [];
  while (y < n) {
    while (x < n) {
      board.push([x, y]);
      x++;
    }
    y++;
    x = 0;
  }
  return board;
}

let game = new Gameboard();
game.placeShip();
game.receiveAttack([0, 0]);

export { Gameboard, generateBoard };
