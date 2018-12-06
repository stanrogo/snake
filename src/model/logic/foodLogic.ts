import Food from '../entity/food';
import CanvasArea from '../../interfaces/canvasArea';

class FoodLogic {

    public static getFood(gameArea: CanvasArea, cubeSize: number): Food {
        const x = FoodLogic.genRandPos(gameArea.x, gameArea.width, cubeSize);
        const y = FoodLogic.genRandPos(gameArea.y, gameArea.height, cubeSize);
        return new Food(x, y, cubeSize);
    }

    /**
     * Generate a random position on the grid
     * @param start The first random number possible
     * @param scale The number by which to multiply the random number generated
     * @param cubeSize The size of a cube
     */
    private static genRandPos(start: number, scale: number, cubeSize: number): number {
        const random = start + Math.floor(Math.random() * scale);
        return random - random % cubeSize;
    }
}

export default FoodLogic;
