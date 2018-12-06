import Cube from '../model/entity/Cube';
import { CanvasText, CanvasRect } from '../interfaces/canvas';

abstract class BaseView {
    protected ctx: CanvasRenderingContext2D;

    protected constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    protected drawRectangle(data: CanvasRect) {
        this.ctx.fillStyle = data.color;
        this.ctx.beginPath();
        this.ctx.rect(data.x, data.y, data.width, data.height);
        this.ctx.closePath();
        this.ctx.fill();
    }

    protected drawCube(cube: Cube) {
        this.drawRectangle({
            color: cube.color,
            x: cube.x,
            y: cube.y,
            width: cube.size,
            height: cube.size,
        });
    }

    protected drawText(data: CanvasText) {
        this.ctx.font = `${data.size}px Comic Sans MS`;
        this.ctx.fillStyle = data.color;
        this.ctx.textAlign = data.align;
        this.ctx.textBaseline = data.baseline;
        this.ctx.fillText(data.text, data.x, data.y);
    }
}

export default BaseView;
