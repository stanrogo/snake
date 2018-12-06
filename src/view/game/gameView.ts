import Food from '../../model/entity/food';
import SnakePart from '../../model/entity/snakePart';

import FoodView from './foodView';
import SnakeView from './snakeView';
import BackView from './backView';

class GameView {

    private foodView: FoodView;
    private snakeView: SnakeView;
    private backView: BackView;

    constructor(ctx: CanvasRenderingContext2D, food: Food, snakeParts: SnakePart[]) {
        this.foodView = new FoodView(ctx, food);
        this.snakeView = new SnakeView(ctx, snakeParts);
        this.backView = new BackView(ctx);
    }

    public update(): void {
        this.backView.update();
        this.foodView.update();
        this.snakeView.update();
    }
}

export default GameView;
