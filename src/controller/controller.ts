import ToolbarController from './toolbarController';
import GameController from './gameController';
import CanvasArea from '../model/entity/canvasArea';
import GameOverView from '../view/gameOverView';

/**
 * The controller is responsible for the other controllers, passing events between them.
 *
 * Here we specify the dimensions of the canvas and the immediate game sub areas
 */
class Controller {
    private static readonly canvasWidth: number = 400;
    private static readonly canvasHeight: number = 300;
    private static readonly toolbarHeight: number = 30;
    private static readonly gameHeight: number = Controller.canvasHeight - Controller.toolbarHeight;

    private readonly ctx: CanvasRenderingContext2D;

    private readonly toolbarController: ToolbarController;
    private readonly gameController: GameController;

    private gameOverView: GameOverView;

    private interval: number;
    private gameOver: boolean;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

        // Initialise specific controllers
        this.toolbarController = new ToolbarController(
            ctx,
            new CanvasArea(0,0, Controller.toolbarHeight, Controller.canvasWidth)
        );
        this.gameController = new GameController(
            ctx,
            new CanvasArea(0, Controller.toolbarHeight, Controller.gameHeight, Controller.canvasWidth)
        );

        // Bind controller events
        this.toolbarController.onStart(() => this.start());
        this.gameController.onFood(() => this.toolbarController.updateScore());
        this.gameController.onGameOver(() => this.stop());

        // Initialise views
        this.gameOverView = new GameOverView(ctx);

        // Initialise other properties
        this.interval = 0;
        this.gameOver = true;
        ctx.canvas.width = Controller.canvasWidth;
        ctx.canvas.height = Controller.canvasHeight;
    }

    public update(): void {
        this.gameController.tick();
        this.toolbarController.tick();
    }

    private start(): void {
        if (!this.gameOver) {
            this.stop();
            this.toolbarController.reset();
            this.gameController.reset();
        }

        this.gameOver = false;
        this.interval = window.setInterval(() => this.update(), 100);
    }

    private stop(): void {
        this.gameOver = true;
        this.gameOverView.update();
        this.gameOver = false;
        window.clearInterval(this.interval);
    }
}

export default Controller;
