/* eslint-disable no-undef */
import { Ship } from "../Js files/ship.mjs";

let ship = new Ship()
ship.length = 4

describe('ship', () => {
    test('will return false', () => {
        expect(ship.isSunk()).toBeFalsy();
    })
    test('will return increase in hit', () => {
        expect(ship.hit()).toBe(1)
    })
    test('will return increase in hit', () => {
        expect(ship.hit()).toBe(2)
    })
    test('will return increase in hit', () => {
        expect(ship.hit()).toBe(3)
    })
    test('will return increase in hit', () => {
        expect(ship.hit()).toBe(4)
    })
})


describe('ship sunk status', () => {
    console.log(ship.hitCount)
    test('will return false', () => {
        expect(ship.isSunk()).toBeTruthy();
    })
})