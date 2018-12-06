import FoodLogic from '../logic/foodLogic';
import SnakeLogic from '../logic/snakeLogic';
import Food from '../entity/food';
import Snake from '../entity/snake';
import CanvasArea from '../entity/canvasArea';

class GameService {
    private readonly gameArea: CanvasArea;
    private readonly cubeSize: number;

    public food: Food;
    public snake: Snake;

    constructor(gameArea: CanvasArea, cubeSize: number) {
        this.gameArea = gameArea;
        this.cubeSize = cubeSize;
        this.food = FoodLogic.getFood(this.gameArea, this.cubeSize);
        this.snake = SnakeLogic.genSnake(this.cubeSize);
    }

    public reset() {
        this.genFood();
        SnakeLogic.resetSnake(this.snake);
    }

    public moveSnake(reverse: boolean = false): void {
        SnakeLogic.step(this.snake, reverse);
    }

    public turnSnake(keyCode: number): void {
       SnakeLogic.makeTurn(this.snake, keyCode);
    }

    public checkFood(): boolean {
        return this.snake.head.y === this.food.y && this.snake.head.x === this.food.x;
    }

    public checkCollision(): boolean {
        const outOfBoundsX = this.snake.head.x < this.gameArea.x || this.snake.head.x >= this.gameArea.x + this.gameArea.width;
        const outOfBoundsY = this.snake.head.y < this.gameArea.y || this.snake.head.y >= this.gameArea.y + this.gameArea.height;
        const hasCollision = this.snake.parts.some((cube, i) => i > 0 && cube.y === this.snake.head.y && cube.x === this.snake.head.x);
        return outOfBoundsX || outOfBoundsY || hasCollision;
    }

    public growSnake(): void {
        SnakeLogic.addCube(this.snake, this.cubeSize);
    }

    public genFood(): void {
        const food = FoodLogic.getFood(this.gameArea, this.cubeSize);
        this.food.x = food.x;
        this.food.y = food.y;
    }
}

export default GameService;
