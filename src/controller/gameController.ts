import GameService from '../model/service/gameService';
import FoodView from '../view/foodView';
import SnakeView from '../view/snakeView';
import BackView from '../view/backView';
import GameOverView from '../view/gameOverView';
import ToolbarController from './toolbarController';
import CanvasArea from '../interfaces/canvasArea';

class GameController {
    private readonly gameService: GameService;

    private toolbarController: ToolbarController;

    private backView: BackView;
    private foodView: FoodView;
    private snakeView: SnakeView;
    private gameOverView: GameOverView;

    private interval: number;
    private readonly keyDown: () => void;

    private readonly toolbarHeight: number = 30;

    constructor(ctx: CanvasRenderingContext2D) {
        this.keyDown = this.notifyKeyDown.bind(this);
        this.interval = 0;
        const gameArea: CanvasArea = {
          x: 0, width: ctx.canvas.width, y: this.toolbarHeight, height: ctx.canvas.height - this.toolbarHeight
        };

        // Initialise services
        this.gameService = new GameService(gameArea, 10);

        // Initialise views
        this.backView = new BackView(ctx);
        this.foodView = new FoodView(ctx, this.gameService.food);
        this.snakeView = new SnakeView(ctx, this.gameService.snake.parts);
        this.gameOverView = new GameOverView(ctx);

        // Initialise controllers
        this.toolbarController = new ToolbarController(ctx, this.gameService, this.toolbarHeight);
        this.toolbarController.onStart(this.start.bind(this));

        this.backView.update();
        this.toolbarController.tick();
    }

    public start(): void {
        this.stop();
        this.gameService.reset();
        document.addEventListener('keydown', this.keyDown);
        this.interval = window.setInterval(this.tick.bind(this), 100);
    }

    public stop(): void {
        document.removeEventListener('keydown', this.keyDown);
        window.clearInterval(this.interval);
    }

    private update(): void {
        this.backView.update();
        this.toolbarController.tick();
        this.foodView.update();
        this.snakeView.update();
    }

    private tick(): void {
        this.gameService.moveSnake();

        const hasCollision: boolean = this.gameService.checkCollision();
        if (hasCollision) {
            this.gameService.moveSnake(true);
            this.update();
            this.gameOverView.update();
            this.stop();
            return;
        }

        const inFood = this.gameService.checkFood();
        if (inFood) {
            this.gameService.growSnake();
            this.gameService.genFood();
            this.gameService.updateScore();
        }

        this.update();
    }

    private notifyKeyDown(event: KeyboardEvent): void {
        this.gameService.turnSnake(event.keyCode);
    }
}

export default GameController;
