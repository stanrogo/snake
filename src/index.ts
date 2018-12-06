import Controller from './controller/controller';

const canvas: HTMLCanvasElement | null = <HTMLCanvasElement|null>document.getElementById('canvas');
if (!canvas) throw new ReferenceError('Cannot find canvas');

const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
if (!context) throw new Error('Unable to get context');

const controller: Controller = new Controller(context);
controller.update();
