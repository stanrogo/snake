import FoodLogic from '../logic/foodLogic';
import SnakeLogic from '../logic/snakeLogic';
import ScoreLogic from '../logic/scoreLogic';
import Food from '../entity/food';
import Snake from '../entity/snake';
import Score from '../entity/score';
import Toolbar from '../entity/toolbar'
import StartButton from '../entity/startButton';
import CanvasArea from '../../interfaces/canvasArea';

class GameService {

    gameArea: CanvasArea;
    cubeSize: number;

    public food: Food;
    public snake: Snake;
    public score: Score;
    public toolbar: Toolbar;
    public startButton: StartButton;

    constructor(gameArea: CanvasArea, cubeSize: number) {
        this.gameArea = gameArea;
        this.cubeSize = cubeSize;
        this.food = FoodLogic.getFood(this.gameArea, this.cubeSize);
        this.snake = SnakeLogic.genSnake(this.cubeSize);
        this.score = ScoreLogic.newScore();
        this.toolbar = new Toolbar();
        this.startButton = new StartButton();
    }

    public reset() {
        this.genFood();
        SnakeLogic.resetSnake(this.snake);
        ScoreLogic.resetScore(this.score);
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

    public updateScore(): void {
        ScoreLogic.updateScore(this.score);
    }

    public setToolbarProps(x: number, y: number, height: number, width: number): void {
        this.toolbar.setProps(x, y, height, width);
    }

    public setStartButtonProps(data: CanvasArea): void {
        this.startButton.setProps(data);
    }
}

export default GameService;
