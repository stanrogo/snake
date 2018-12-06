import SnakePart from './snakePart';
import Turn from './turn';

class Snake {

    parts: SnakePart[];
    turns: Turn[];

    constructor(snakeParts: SnakePart[]) {
        this.parts = snakeParts;
        this.turns = [];
    }

    get head(): SnakePart {
        return this.parts[0];
    }

    get tail(): SnakePart {
        return this.parts[this.parts.length - 1];
    }
};

export default Snake;
