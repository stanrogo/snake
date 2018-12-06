import CanvasArea from '../../interfaces/canvasArea';

class StartButton {
    x: number = 0;
    y: number = 0;
    height: number = 0;
    width: number = 0;

    setProps(data: CanvasArea) {
        this.x = data.x;
        this.y = data.y;
        this.height = data.height;
        this.width = data.width;
    }
}

export default StartButton;
