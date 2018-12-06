import BaseView from "./baseView";

class GameOverView extends BaseView {

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    update() {
        this.drawText({
            color: 'red',
            align: 'center',
            text: 'Game Over',
            x: this.ctx.canvas.width/2,
            y: this.ctx.canvas.height/2,
            size: 30,
            baseline: 'middle',
        });
    }
}

export default GameOverView;
