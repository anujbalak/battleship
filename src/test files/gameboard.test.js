/* eslint-disable no-undef */
import { Gameboard, generateBoard } from "../module/gameboard.mjs";

describe("Testing the board", () => {
  test("Board length will be 100", () => {
    expect(generateBoard().length).toBe(100);
  });
  test("Board first element should be [0, 0]", () => {
    expect(generateBoard()[0]).toEqual([0, 9]);
  });
  test("Board last element should be [9, 9", () => {
    expect(generateBoard()[99]).toEqual([9, 0]);
  });
});

let gameboard = new Gameboard();

describe("Testing the ships", () => {
  beforeAll(() => {
    generateBoard();
    gameboard.placeShipPre();
    return;
  });
  // afterAll(() => {
  //   console.log(gameboard.ships);
  //   console.log(gameboard.missed);
  // });
  test("battleship length is 4", () => {
    expect(gameboard.ships[1].length).toBe(4);
  });
  test("submarine position", () => {
    expect(gameboard.ships[3].position).toEqual([
      [5, 5],
      [5, 6],
      [5, 7],
    ]);
  });
  test("destroyer will get a hit", () => {
    expect(gameboard.receiveAttack([3, 0])).toBe(true);
  });
  test("destroyer wiil get another hit", () => {
    expect(gameboard.receiveAttack([3, 1])).toBe(true);
  });
  test("Nothing gonna hit", () => {
    expect(gameboard.receiveAttack([3, 4])).toBe(false);
  });
  test("Destroyer will get another hit and will sunk", () => {
    expect(gameboard.receiveAttack([3, 2])).toBe(true);
  });
  test("nothing will gonna hit", () => {
    expect(gameboard.receiveAttack([8, 0])).toBe(false);
  });
});

describe("Checking if all ship are sunk", () => {
  beforeAll(() => {
    gameboard.sunkAllShips();
  });
  test("Will return false", () => {
    expect(gameboard.areAllShipSunk()).toBe(true);
  });
});
