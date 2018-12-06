import ToolbarView from '../view/toolbar/toolbarView';
import CanvasArea from '../model/entity/canvasArea';
import ScoreService from '../model/service/scoreService';
import StartButtonService from '../model/service/startButtonService';

class ToolbarController {
    private readonly startButtonService: StartButtonService;
    private readonly scoreService: ScoreService;
    private readonly toolbarView: ToolbarView;
    private readonly startSubscribers: (() => void)[];
    private readonly ctx: CanvasRenderingContext2D;
    private readonly area: CanvasArea;

    constructor(ctx: CanvasRenderingContext2D, area: CanvasArea) {
        this.ctx = ctx;
        this.area = area;

        // Initialise services
        this.scoreService = new ScoreService();
        this.startButtonService = new StartButtonService(
            new CanvasArea(area.x + area.width - 5 - 50, area.y + 5, 20, 50)
        );

        // Initialise views
        this.toolbarView = new ToolbarView(ctx, this.area, this.scoreService.score, this.startButtonService.startButton);

        // Initialise subscribers
        this.startSubscribers = [];

        // Initialise events
        ctx.canvas.addEventListener('click', this.onClick.bind(this));
    }

    public onStart(callback: () => void) {
        this.startSubscribers.push(callback);
    }

    public reset(): void {
        this.scoreService.resetScore();
    }

    public updateScore(): void {
        this.scoreService.updateScore();
    }

    public tick() {
        this.toolbarView.update();
    }

    private onClick(event: MouseEvent): void {
        const x: number = event.clientX - this.ctx.canvas.offsetLeft;
        const y: number = event.clientY - this.ctx.canvas.offsetTop;
        const startButton: CanvasArea = this.startButtonService.startButton;

        // If we are not inside the start button, return
        const outX: boolean =  x < startButton.x || x > startButton.x + startButton.width;
        const outY: boolean =  y < startButton.y || y > startButton.y + startButton.height;
        if (outX || outY) {
            return;
        }

        this.startSubscribers.forEach(x => x());
    }
}

export default ToolbarController;
