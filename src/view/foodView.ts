import Food from '../model/entity/food';
import BaseView from './baseView';

class FoodView extends BaseView {
    food: Food;

    constructor(ctx: CanvasRenderingContext2D, food: Food) {
        super(ctx);
        this.food = food;
    }

    update() {
        this.drawCube(this.food);
    }
}

export default FoodView;
