import { Moves } from "../module/possible-moves.mjs";
import { realPlayer } from "./playerGui.mjs";

function getCords() {
    let moves = new Moves();
    moves.setPossibleMoves([0, 0])
    console.log(moves.nextMoves)
    return generateCords();
}

function generateCords() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    if (realPlayer.gameboard.isAlreadyFired([x, y])) {
        return getCords();
    }
    console.log(realPlayer.gameboard.isHit)
    return [x, y];
}

export { getCords}