import CanvasArea from '../model/entity/canvasArea';
import GameService from '../model/service/gameService';
import GameView from '../view/game/gameView';

class GameController {
    private static readonly cubeSize: number = 10;

    private readonly ctx: CanvasRenderingContext2D;
    private readonly area: CanvasArea;

    private readonly gameService: GameService;
    private readonly gameView: GameView;

    private foodSubscribers: (() => void)[];
    private gameOverSubscribers: (() => void)[];

    constructor(ctx: CanvasRenderingContext2D, area: CanvasArea) {
        this.ctx = ctx;
        this.area = area;

        // Initialise services
        this.gameService = new GameService(area, GameController.cubeSize);

        // Initialise views
        this.gameView = new GameView(ctx, this.gameService.food,this.gameService.snake.parts);

        // Initialise Subscribers
        this.foodSubscribers = [];
        this.gameOverSubscribers = [];

        document.addEventListener('keydown', this.notifyKeyDown.bind(this));
    }

    public tick(): void {
        this.gameService.moveSnake();

        const hasCollision: boolean = this.gameService.checkCollision();
        if (hasCollision) {
            this.gameService.moveSnake(true);
            this.gameView.update();
            this.gameOverSubscribers.forEach(x => x());
            return;
        }

        const inFood = this.gameService.checkFood();
        if (inFood) {
            this.gameService.growSnake();
            this.gameService.genFood();
            this.foodSubscribers.forEach(x => x());
        }

        this.gameView.update();
    }

    public reset(): void {
        this.gameService.reset();
    }

    private notifyKeyDown(event: KeyboardEvent): void {
        this.gameService.turnSnake(event.keyCode);
    }

    public onFood(callback: () => void): void {
        this.foodSubscribers.push(callback);
    }

    public onGameOver(callback: () => void): void {
        this.gameOverSubscribers.push(callback);
    }
}

export default GameController;
