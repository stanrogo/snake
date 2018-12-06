import SnakePart from '../entity/snakePart';
import Snake from '../entity/snake';
import Turn from '../entity/turn';
import Direction from '../../interfaces/direction';
import KeyBinding from '../../interfaces/keyBinding';

class SnakeLogic {
    private static keyBinding: KeyBinding = {
        37: Direction.left,
        38: Direction.up,
        39: Direction.right,
        40: Direction.down,
    };

    public static resetSnake(snake: Snake): void {
        const cubeSize: number = snake.parts[0].size;
        snake.parts.splice(0, snake.parts.length);
        snake.turns.splice(0, snake.turns.length);
        snake.parts.push(new SnakePart(60, 80, Direction.right, cubeSize));
    }

    public static genSnake(cubeSize: number): Snake {
        const snakeParts: SnakePart[] = [];
        const snakePart = new SnakePart(60, 80, Direction.right, cubeSize);
        snakeParts.push(snakePart);
        return new Snake(snakeParts);
    }

    public static makeTurn(snake: Snake, keyCode: number) {
        const direction: Direction = SnakeLogic.keyBinding[keyCode];

        if (snake.head.direction === direction) {
            return;
        }

        snake.turns.push({
            x: snake.head.x,
            y: snake.head.y,
            direction,
        });
    }

    private static setDirection(snake: Snake, i: number): void {
        const part: SnakePart = snake.parts[i];
        const isTurn: Turn | undefined = snake.turns.find(turn => turn.y === part.y && turn.x === part.x);

        if (isTurn) {
            part.direction =  isTurn.direction;
        }

        if (i === snake.parts.length - 1 && isTurn) {
            snake.turns.shift();
        }
    }

    public static step(snake: Snake, reverse: boolean = false): void {
        snake.parts.forEach((snakePart: SnakePart, i: number) => {
            if (!reverse) SnakeLogic.setDirection(snake, i);
            SnakeLogic.incrementSnakePart(snakePart, reverse);
        });
    }

    private static incrementSnakePart(snakePart: SnakePart, reverse = false) {
        const amount = reverse ? snakePart.size * -1 : snakePart.size;

        switch (snakePart.direction) {
            case Direction.right:
                snakePart.x += amount;
                break;
            case Direction.left:
                snakePart.x -= amount;
                break;
            case Direction.down:
                snakePart.y += amount;
                break;
            case Direction.up:
                snakePart.y -= amount;
                break;
        }
    }

    public static addCube(snake: Snake, cubeSize: number): void {
        const cube = new SnakePart(snake.tail.x, snake.tail.y, snake.tail.direction, cubeSize);
        SnakeLogic.incrementSnakePart(cube, true);
        snake.parts.push(cube);
    }
}

export default SnakeLogic;
