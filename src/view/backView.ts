import BaseView from "./baseView";

class BackView extends BaseView {

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    update() {
        this.drawRectangle({
            color: '#FAF7F8',
            x: 0,
            y: 0,
            width: this.ctx.canvas.width,
            height: this.ctx.canvas.height,
        });
    }
}

export default BackView;
