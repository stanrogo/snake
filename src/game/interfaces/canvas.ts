interface CanvasGeneric {
    color: string;
    x: number;
    y: number;
}

interface CanvasText extends CanvasGeneric{
    align: CanvasTextAlign;
    baseline: CanvasTextBaseline;
    text: string;
    size: number;
}

interface CanvasRect extends CanvasGeneric{
    width: number;
    height: number;
}

export { CanvasText, CanvasRect };
