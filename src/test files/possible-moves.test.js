/* eslint-disable no-undef */
import { Moves } from "../module/possible-moves.mjs";

let moves = new Moves();
describe("Test moves", () => {
  afterEach(() => {
    console.log(moves);
  });
  test("Add up move", () => {
    expect(moves.setUpMove([1, 3])).toEqual([1, 4]);
  });
  test("Not a possible move", () => {
    expect(moves.setDownMove([4, 0])).toBe(undefined);
  });
  test("Add right move", () => {
    expect(moves.setRightMove([3, 5])).toEqual([4, 5]);
  });
  test("Add left move", () => {
    expect(moves.setLeftMove([7, 8])).toEqual([6, 8]);
  });
});
