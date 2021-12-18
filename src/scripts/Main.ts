import Square from './Square'
import Input from './Input'
import UI from './UI'
import Debug from './Debug'
//import StupidPathfinder from './StupidPathfinder';
import Grid from './Grid';
/*
 * TODO: * Write TSDoc.
 */

module Main {
	let ctx: CanvasRenderingContext2D;
	let canvas: HTMLCanvasElement;

	let grid: Square.Square[][];

	let width!: number;
	let height!: number;

	window.onresize = onResize;

	/**
	 * Inits the canvas.
	 */
	export function init(){
		canvas = document.getElementsByTagName('canvas')[0]

		if (!canvas.getContext) {
			console.log('Canvas is not supported.')
		}

		ctx = canvas.getContext('2d')!;

		setCanvasSize();

		let UIObjects: Map<String, UI.UIObject> = UI.init(ctx)
		Square.init(ctx,UIObjects);
		grid = Grid.init(width,height);
		Input.init(canvas,grid);

		/*let spf: StupidPathfinder =*/ //new StupidPathfinder(grid);
		loop()
	}
	/**
	 * The game loop.
	 */
	function loop(){
		draw();
		Grid.onframe();
		UI.onframe(width,height);
		Debug.calculatePerformance();
		Debug.draw(width, grid.length * grid[0].length,ctx);
		window.requestAnimationFrame(loop);
	}

	/**
	 * Draws on the canvas. Only to be used inside loop().
	 */
	function draw(){
		ctx.fillStyle = '#f7f7f7';
		ctx.fillRect(0,0,width,height);
		ctx.fillStyle = '#ffffff';
	}
	/**
	 * Recalcalates the size of the canvas and the amount of squares in it.
	 */
	function onResize(){
		setCanvasSize();
		grid = Grid.init(width,height);
	}
	/**
	 * Sets the size of the canvas.
	 */
	function setCanvasSize(){
		ctx.canvas.width  = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
		width = ctx.canvas.width;
		height = ctx.canvas.height;
	}
}
export default Main;

