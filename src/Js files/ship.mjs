class Ship {
  constructor() {
    this.position = null;
    this.length = null;
    this.hitCount = 0;
    this.sunk = false;
  }

  hit() {
    return (this.hitCount += 1);
  }

  isSunk() {
    if (this.length > this.hitCount) return false;
    return true;
  }
}

export { Ship };
