import { Moves } from "./possible-moves.mjs";

class MovesTree {

    constructor() {
        this.head = null;
    }
    
    setMoves(array) {
        let moves = new Moves(array);
        moves.setPossibleMoves();
        return this.head = moves;
    }
}

export { MovesTree }