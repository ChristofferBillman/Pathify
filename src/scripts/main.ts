import Square from './Square'
import Input from './Input'
import UI from './UI'
import Debug from './Debug'
/*
 * TODO: * Write TSDoc.
 * 		 * Make grid pannable.
 * 		   Define data structure for storing 'maps'. Add 'state' to Square.
 * NOTE: * Squares are inserted into array in the order they are seen in the grid. Gives easy access to any square without search, write findSquare(), given the coordinates.
 */

module Main {
	let ctx: CanvasRenderingContext2D;
	let canvas: HTMLCanvasElement;

	let squares: Square.Square[] = [];

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
		// Asserting that context is not null.
		ctx = canvas.getContext('2d')!;

		Input.init(canvas)
		UI.init(ctx)

		canvas.addEventListener('click', () =>{
			UI.UIObjects.forEach(UIObject =>{
				UIObject.onclick();
			})
		})

		setCanvasSize()
		Square.init(ctx);
		squares = Square.setSquares(width,height,squareSize,5)
		loop()
	}
	/**
	 * The game loop.
	 */
	function loop(){
		draw();
		squares.forEach(square =>{
			square.onframe(UI.UIObjects.get('eraseButton')!.pressed);
		})
		UI.onframe(width,height);
		Debug.calculatePerformance();
		Debug.draw(width, squares.length,ctx);
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
	 * Sets the
	 */
	function setCanvasSize(){
		ctx.canvas.width  = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
		width = ctx.canvas.width;
		height = ctx.canvas.height;
	}
}
export default Main;

