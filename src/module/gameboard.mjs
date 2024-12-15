import { Ship } from "./ship.mjs";

class Gameboard {
  constructor() {
    this.board = generateBoard();
    this.ships = [];
    this.missed = [];
    this.firedSquares = []
    this.isHit = false;
    this.sunkShipsPosition = [];
    this.totalSunkShips = 0;
    this.score = 0
    this.changeInScore = 0
    this.scoreBonus = 0
  }

  placeShip(length = 0, position = []) {
    let ship = new Ship();
    ship.length = length;
    ship.position = position;
    this.ships.push(ship);
    return;
  }

  placeShipPre() {
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
      [7, 4],
      [7, 5],
    ];
    this.ships.push(carrier, battleship, destroyer, submarine, patrolBoat);
  }

  receiveAttack(recievedCords) {
    let gotShip = false;
    if (!this.isAlreadyFired(recievedCords)) {
      this.ships.forEach((ship) => {
        if (gotShip === false) {
          let shipCords = ship.position;
          shipCords.forEach((cords) => {
            if (gotShip === false) {
              if (
                cords[0] == recievedCords[0] &&
                cords[1] == recievedCords[1]
              ) {
                gotShip = true;
                this.isHit = true;
                ship.hit();
                ship.isSunk();
                this.sunkShip(ship);
                this.changeInScore = 50;
                this.score += 50;
                return;
              }
            }
          });
        }
      });
      if (gotShip === false) {
        this.isHit = false;
        if (this.score > 0) {
          this.changeInScore = 5;
          this.score -= 5;
        }
        this.missed.push(recievedCords);
      }
      this.firedSquares.push(recievedCords);
    }
    return gotShip;
  }

  areAllShipSunk() {
    let shipsCondition = [];
    let ships = this.ships;
    ships.forEach((ship) => {
      let shipSunkCondition = ship.sunk;
      shipsCondition.push(shipSunkCondition);
    });
    if (shipsCondition.every((condition) => condition === true)) return true;
    return false;
  }

  sunkAllShips() {
    let ships = this.ships;
    ships.forEach((ship) => {
      return (ship.sunk = true);
    });
  }

  isAlreadyFired(receiveCords) {
    let x = receiveCords[0];
    let y = receiveCords[1];
    let isShot = false;
    let firedShots = this.firedSquares;
    for(let i = 0; i < firedShots.length && isShot === false; i++) {
      let currentSquare = firedShots[i];
      if (currentSquare[0] === x && currentSquare[1]=== y) {
        return isShot = true;
      }
    }
    return isShot;
  }

  sunkShip(ship) {
    if (ship.sunk) {
      this.scoreBonus = 100;
      this.score += 100;
      this.sunkShipsPosition.push(ship.position);
      return;
    }
    return;
  }
}

function generateBoard() {
  let n = 0;
  let k = 10;
  let x = 0;
  let y = 9;
  let board = [];
  while (y >= n) {
    while (x < k ) {
      board.push([x, y]);
      x++;
    }
    y--;
    x = 0;
  }
  return board;
}

// let game = new Gameboard();
// game.placeShip();
// game.receiveAttack([0, 0]);

export { Gameboard, generateBoard };
