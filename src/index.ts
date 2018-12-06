import GameController from './controller/gameController';

const canvas: HTMLCanvasElement | null = <HTMLCanvasElement|null>document.getElementById('canvas');
if (!canvas) throw new ReferenceError('Cannot find canvas');

const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
if (!context) throw new Error('Unable to get context');

new GameController(context);
