import BaseView from './baseView';
import SnakePart from '../model/entity/snakePart';

class SnakeView extends BaseView {
    snakeParts: SnakePart[];

    constructor(ctx: CanvasRenderingContext2D, snakeParts: SnakePart[]) {
        super(ctx);
        this.snakeParts = snakeParts;
    }

    update() {
        this.snakeParts.forEach((snakePart) => {
            this.drawCube(snakePart);
        });
    }
}

export default SnakeView;
