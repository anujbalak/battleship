import { Ship } from "./ship.mjs";

class Gameboard {
  constructor() {
    this.board = generateBoard();
    this.ships = [];
    this.missed = [];
    this.firedSquares = []
    this.isHit = false;
    this.hitCords = null;
    this.sunkShipsPosition = [];
    this.totalSunkShips = 0;
    this.score = 0
    this.changeInScore = 0
    this.scoreBonus = 0
    this.isPlace = false;
    this.isAShipSunk = false;
  }

  placeShip(length = 0) {
    let ship = new Ship();
    ship.length = length;
    ship.position = this.generateShipPosition(length);
    this.ships.push(ship);
    return;
  }

  buildShip(length = 0, position = []) {
    let ship = new Ship();
    ship.length = length;
    ship.position = position;
    this.ships.push(ship);
    return;
  }


  isAlreadyGenerated(receiveCords) {
    let x = receiveCords[0];
    let y = receiveCords[1];
    let isPlaced = false;
    let generatedShipCords = []

    this.ships.forEach(ship => {
      ship.position.forEach(cords => {
        generatedShipCords.push(cords);
      })
    })
    for(let i = 0; i < generatedShipCords.length && isPlaced === false; i++) {
      let currentSquare = generatedShipCords[i];
      if (currentSquare[0] === x && currentSquare[1]=== y) {
        return isPlaced = true;
      }
    }
    return isPlaced;
  }



  generateShipPosition(lengthOfShip) { 
    let position = []

    const generateX = () => {
      return Math.floor(Math.random() * 10);
    }

    const generateY = () => {
      return Math.floor(Math.random() * 10);
    }

    const generateSubtractor = () => {
      return Math.floor((Math.random() * 5) + 1);
    }
    /// H => 0, V => 1;
    const generateShipDirection = () => {
      return Math.floor(Math.random() * 2);
    }

    let generatedX = generateX() ;
    let generatedY = generateY();
    let direction = generateShipDirection();

    const getXorY = (generatedNumber) => {
      let a = generatedNumber - (generatedNumber - ((10 - lengthOfShip) - generateSubtractor()));
      return a;
    }

    const generateCords = (direction, lengthOfShip) => {
      let x = null;
      let y = null;
      if (direction === 0) {
        if (generatedX > 5) {
          x = getXorY(generatedX);
        } else {
          x = generatedX
        }
        y = generatedY;
        return generatePosition(x, y, direction, lengthOfShip)
      } else if (direction === 1) {
        if (generatedY > 5) {
          y = getXorY(generatedY);
        } else {
          y = generatedY
        }
        x = generatedX;
        return generatePosition(x, y, direction, lengthOfShip);
      }
    }
    
    const generatePosition = (x, y, direction, length) => {
      let cord = [x, y];
      let i = length - 1;
      position.push(cord);
      while (i > 0) {
        if (direction === 0) {
          cord = [x + length - i, y];
          position.push(cord)
        } else if (direction === 1) {
          cord = [x, y + length - i];
          position.push(cord)
        }
        i--;
      };
      return position;
    }
    let isGenerated = false;
    generateCords(direction, lengthOfShip)
    if (lengthOfShip === 5) return position;
    if (lengthOfShip < 5) {
      for (let i = 0; i < position.length && isGenerated === false; i++) {
        let cords = position[i];
        if (this.isAlreadyGenerated(cords)) {
          isGenerated = true;
        }
      }
    }
    if (isGenerated) {
      return this.generateShipPosition(lengthOfShip);
    } else {
      return position
    }
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
    this.isAShipSunk = false;
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
                this.hitCords = recievedCords;
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
        } else {
          this.changeInScore = 0
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
      this.isAShipSunk = true;
      this.scoreBonus = 100;
      this.score += 100;
      this.sunkShipsPosition.push(ship.position);
      return;
    }
    return;
  }

  areAllShipsPlace() {
    if (this.ships.every(ship => ship.isPlace === true)) {
        return true;
    }
    return false;
  }

  removeAllShips() {
    return this.ships = []
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
