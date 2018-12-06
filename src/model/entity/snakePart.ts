import Cube from './cube';
import Direction from '../../interfaces/direction';

class SnakePart extends Cube {
    public static color: string = '#212121';
    public direction: Direction;

    constructor(x: number, y: number, direction: Direction, size: number) {
        super(x, y, SnakePart.color, size);
        this.direction = direction;
    }
}

export default SnakePart;
