import BaseView from '../baseView';
import Score from '../../model/entity/score';
import CanvasArea from '../../model/entity/canvasArea';

class ToolbarView extends BaseView {
    private toolbar: CanvasArea;
    private startButton: CanvasArea;
    private score: Score;

    constructor(ctx: CanvasRenderingContext2D, toolbar: CanvasArea, score: Score, startButton: CanvasArea) {
        super(ctx);
        this.toolbar = toolbar;
        this.startButton = startButton;
        this.score = score;
    }

    public update() {
        this.drawBackground();
        this.drawScore();
        this.drawStartButton();
    }

    private drawBackground(): void {
        this.drawRectangle({
            color: '#71c0ff',
            x: this.toolbar.x,
            y: this.toolbar.y,
            width: this.toolbar.width,
            height: this.toolbar.height,
        });
    }

    private drawScore(): void {
        this.drawText({
            color: 'green',
            align: 'left',
            text: `Score: ${this.score.score.toString()}`,
            baseline: 'middle',
            x: this.toolbar.x + 10,
            y: this.toolbar.height / 2,
            size: 14,
        });
    }

    private drawStartButton(): void {
        this.drawRectangle({
            color: '#58ff68',
            x: this.startButton.x,
            y: this.startButton.y,
            width: this.startButton.width,
            height: this.startButton.height,
        });
        this.drawText({
            color: 'white',
            align: 'center',
            text: 'Start',
            baseline: 'middle',
            x: this.startButton.x + this.startButton.width / 2,
            y: this.startButton.y + this.startButton.height / 2,
            size: 14,
        });
    }
}

export default ToolbarView;
