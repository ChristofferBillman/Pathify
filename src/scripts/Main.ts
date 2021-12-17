import Square from './Square'
import Input from './Input'
import UI from './UI'
import Debug from './Debug'
import StupidPathfinder from './StupidPathfinder';
/*
 * TODO: * Write TSDoc.
 */

module Main {
	let ctx: CanvasRenderingContext2D;
	let canvas: HTMLCanvasElement;

	let squares: Square.Square[][] = [];

	let squareSize: number = 50;
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

		let UIObjects: Map<String, UI.UIObject> = UI.init(ctx)

		setCanvasSize()
		Square.init(ctx,UIObjects);
		squares = Square.setSquares(width,height,squareSize,5)
		Input.init(canvas,squares)

		/*let spf: StupidPathfinder =*/ new StupidPathfinder(squares);
		loop()
	}
	/**
	 * The game loop.
	 */
	function loop(){
		draw();
		for(let i = 0; i < squares.length; i++){
			for(let j = 0; j < squares[i].length; j++){
				squares[i][j].onframe((UI.UIObjects.get('eraseButton') as UI.Button)!.pressed);
			}
		}

		UI.onframe(width,height);
		Debug.calculatePerformance();
		Debug.draw(width, squares.length * squares[0].length,ctx);
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
		squares = Square.setSquares(width,height,squareSize,5)
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

