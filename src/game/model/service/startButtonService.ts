import CanvasArea from "../entity/canvasArea";

class StartButtonService {
    public startButton: CanvasArea;

    constructor(canvasArea: CanvasArea) {
        this.startButton = canvasArea;
    }
}

export default StartButtonService;
