class Ship {
  constructor() {
    this.position = null;
    this.length = null;
    this.hitCount = 0;
    this.sunk = false;
    this.isPlace = false;
    this.name = "";
  }

  hit() {
    return (this.hitCount += 1);
  }

  isSunk() {
    if (this.length > this.hitCount) return (this.sunk = false);
    return (this.sunk = true);
  }
}

export { Ship };
