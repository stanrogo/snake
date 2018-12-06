class Toolbar {
    x: number = 0;
    y: number = 0;
    height: number = 0;
    width: number = 0;

    setProps(x: number, y: number, height: number, width: number) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}

export default Toolbar;
