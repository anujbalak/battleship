/* eslint-disable no-undef */
import { Player } from "../module/player.mjs";

let realPlayer = new Player();
describe("Test for real player", () => {
  beforeAll(() => {
    realPlayer.type = "real";
    realPlayer.setBoard();
    realPlayer.gameboard.placeShip(3, [
      [4, 5],
      [4, 6],
      [4, 7],
    ]);
    realPlayer.gameboard.placeShip();
    realPlayer.gameboard.placeShip();
    realPlayer.gameboard.placeShip();
    realPlayer.gameboard.placeShip();
  });
  afterAll(() => {
    console.log(realPlayer.gameboard.ships);
  });
  test("Player type will be Real", () => {
    expect(realPlayer.type).toBe("real");
  });
  test("Player has five ships", () => {
    expect(realPlayer.gameboard.ships.length).toBe(5);
  });
  test("Player's ship position", () => {
    expect(realPlayer.gameboard.ships[0].position).toEqual([
      [4, 5],
      [4, 6],
      [4, 7],
    ]);
  });
});

let computer = new Player();
describe("Test for computer player", () => {
  beforeAll(() => {
    computer.type = "computer";
  });
  test("Player type is computer", () => {
    expect(computer.type).toBe("computer");
  });
});
