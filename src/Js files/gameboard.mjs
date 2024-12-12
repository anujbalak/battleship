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
    this.ships.forEach((ship) => {
      if (gotShip === false) {
        let shipCords = ship.position;
        shipCords.forEach((cords) => {
          if (gotShip === false) {
            if (
              cords[0] === recievedCords[0] &&
              cords[1] === recievedCords[1]
            ) {
              gotShip = true;
              ship.hit();
              ship.isSunk();
              return 
            }
          }
        });
      }
    });
    if (gotShip === false) {
      this.missed.push(recievedCords);
    }
    return gotShip;
  }

  areAllShipSunk() {
    let shipsCondition = [];
    let ships = this.ships;
    ships.forEach(ship => {
      let shipSunkCondition = ship.sunk;
      shipsCondition.push(shipSunkCondition);
    })
    if (shipsCondition.every(condition => condition === true)) return true;
    return false;
  }

  sunkAllShips() {
    let ships = this.ships;
    ships.forEach(ship => {
      return ship.sunk = true;
    })
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

// let game = new Gameboard();
// game.placeShip();
// game.receiveAttack([0, 0]);

export { Gameboard, generateBoard };
