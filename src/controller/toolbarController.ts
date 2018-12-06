import ToolbarView from '../view/toolbar/toolbarView';
import GameService from '../model/service/gameService';

class ToolbarController {
    private gameService: GameService;
    private toolbarView: ToolbarView;
    private startSubscribers: (() => void)[];
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, gameService: GameService, toolbarHeight: number) {
        // Initialise services
        this.gameService = gameService;

        // Initialise views
        this.toolbarView = new ToolbarView(ctx, this.gameService.toolbar, this.gameService.score, this.gameService.startButton);

        // Set props
        this.gameService.setToolbarProps(0, 0, toolbarHeight, ctx.canvas.width);
        this.gameService.setStartButtonProps({
            height: 20,
            width: 50,
            x: ctx.canvas.width - 5 - 50,
            y: 5,
        });

        this.startSubscribers = [];
        this.ctx = ctx;
        ctx.canvas.addEventListener('click', this.onClick.bind(this));
    }

    public onStart(callback: () => void) {
        this.startSubscribers.push(callback);
    }

    public tick() {
        this.update();
    }

    private update() {
        this.toolbarView.update();
    }

    private onClick(event: MouseEvent) {
        const x: number = event.clientX - this.ctx.canvas.offsetLeft;
        const y: number = event.clientY - this.ctx.canvas.offsetTop;

        // If we are not inside the start button, return
        const outX: boolean =  x < this.gameService.startButton.x || x > this.gameService.startButton.x + this.gameService.startButton.width;
        const outY: boolean =  y < this.gameService.startButton.y || y > this.gameService.startButton.y + this.gameService.startButton.height;
        if (outX || outY) {
            return;
        }

        this.startSubscribers.forEach(x => x());
    }
}

export default ToolbarController;
