import Cube from './cube';

class Food extends Cube {
    static color: string = '#ca1f1c';

    constructor(x: number, y: number, size: number) {
        super(x, y, Food.color, size);
    }
}

export default Food;
