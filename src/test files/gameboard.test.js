/* eslint-disable no-undef */
import { Gameboard, generateBoard } from "../Js files/gameboard.mjs";

describe("Testing the board", () => {
  test("Board length will be 100", () => {
    expect(generateBoard().length).toBe(100);
  });
  test("Board first element should be [0, 0]", () => {
    expect(generateBoard()[0]).toEqual([0, 0]);
  });
  test("Board last element should be [9, 9", () => {
    expect(generateBoard()[99]).toEqual([9, 9]);
  });
});

let gameboard = new Gameboard();

describe("Testing the ships", () => {
  beforeAll(() => {
    generateBoard();
    gameboard.placeShip();
    return;
  });
  afterAll(() => {
    console.log(gameboard.ships);
    console.log(gameboard.missed);
  });
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
    expect(gameboard.receiveAttack([3, 0])).toBe(1);
  });
  test("destroyer wiil get another hit", () => {
    expect(gameboard.receiveAttack([3, 1])).toBe(2);
  });
  test("destroyer will get final hit and will sunk", () => {
    expect(gameboard.receiveAttack([3, 2])).toBe(3);
  });
});
