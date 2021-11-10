/*
 * TODO: * Write TSDoc.
 * 		 * Make grid pannable.
 * 		 * Compartmetalize code and structure into fewer, more abstract components
 * 		   Define data structure for storing 'maps'. Add 'state' to Square.
 * NOTE: * Squares are inserted into array in the order they are seen in the grid. Gives easy access to any square without search, write findSquare(), given the coordinates.
 */
module Main {
	let ctx: CanvasRenderingContext2D;
	let canvas: HTMLCanvasElement;

	let squares: Square[]= [];
	let mPos: Position;
	let mouseDown: boolean = false; 

	let squareSize: number = 50;
	let width!: number;
	let height!: number;

	let ui: UI;

	window.onresize = onResize;

	export function init(){
		canvas = document.getElementsByTagName('canvas')[0]

		if (!canvas.getContext) {
			console.log('Canvas is not supported.')
		}
		// Asserting that context is not null.
		ctx = canvas.getContext('2d')!;

		mPos = new Position(0,0);
		ui = new UI();
	
		canvas.addEventListener('mousemove', e =>{
			var rect = canvas.getBoundingClientRect();
			mPos = new Position(e.clientX - rect.left, e.clientY - rect.top);
		})
		canvas.addEventListener('mousedown', () =>{mouseDown = true;})
		canvas.addEventListener('mouseup', () =>{mouseDown = false;})

		setCanvasSize()
		setSquares()
		loop()

	}
	/**
	 * The game loop.
	 */
	function loop(){
		draw();
		window.requestAnimationFrame(loop);
	}

	/**
	 * Draws on the canvas. Only to be used inside loop().
	 */
	function draw(){
		ctx.fillStyle = '#f7f7f7';
		ctx.fillRect(0,0,width,height);

		ctx.fillStyle = '#ffffff';

		squares.forEach(square =>{
			square.draw();
		})
		ui.draw()
	}
	function onResize(){
		setCanvasSize();
		setSquares();
	}
	function setCanvasSize(){
		ctx.canvas.width  = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
		width = ctx.canvas.width;
		height = ctx.canvas.height;
	}
	/**
	 * Populates this.square with squares. Is called on every iteration of loop().
	 * @note Can be optimized, should be called every time window is resized - not in every iteration of the loop.
	 */
	function setSquares(){
		let i: number = 0;
		let j: number = 0;
		squares = [];

		for(let x = 0; x < width ; x = x + squareSize+5){
			for(let y = 0; y < height; y = y + squareSize+5){
				squares.push(
					new Square(squareSize,
					new Position(x,y),
					new Position(i,j))
					)
			}
			j++;
		}
		i++;
	}

	interface Drawable{
		draw(): void;
	}
	class UI implements Drawable {

		draw(){
			ctx.shadowColor = "rgba(0,0,0,0.2)";
			ctx.shadowBlur = 10;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			ctx.fillStyle = '#ffffff';
			drawRoundRect(50,50,width-width/2,80,20);
			ctx.shadowBlur = 0;
			ctx.fillStyle = Square.colors.hover;
			for(let x = 0; x < 5*70; x=x+70){
				drawRoundRect(60+x,60,60,60,10);
			}
		}
	}
	/**
	 * 
	 */
	class Square implements Drawable{

		position: Position;
		coordinates: Position;
		size: number;
		static colors = {
			hover: '#a58fcc',
			selected: '#773fd9',
			default: '#ffffff'
		}
		color: string = Square.colors.default;

		constructor(size: number, coordinatesOnCanvas: Position, position: Position){
			this.size = size;
			this.position = position;
			this.coordinates = coordinatesOnCanvas;
		}
		draw(){
			ctx.fillStyle = this.color;

			if(this.mouseInSquare()) {
				ctx.fillStyle = Square.colors.hover;
			}
			if(this.mouseInSquare() && mouseDown){
				this.color = '#773fd9';
			}
			drawRoundRect(this.coordinates.x,this.coordinates.y,this.size,this.size,5);
		}
		private mouseInSquare() {
			if(mPos.x < this.coordinates.x+squareSize && mPos.x > this.coordinates.x){
				if(mPos.y < this.coordinates.y+squareSize && mPos.y > this.coordinates.y){
					return true;
				}
			}
			return false;
		}
	}
	class Position {

		x: number;
		y: number;

		constructor(x: number, y:number){
			this.x = x;
			this.y = y;
		}
	}
/*
 * Credit to Grumdrig on StackOverflow for the following code.
 */
function drawRoundRect(x: number, y: number, w: number, h: number, r:number) {
		if (w < 2 * r) r = w / 2;
		if (h < 2 * r) r = h / 2;
		ctx.beginPath();
		ctx.moveTo(x+r, y);
		ctx.arcTo(x+w, y,   x+w, y+h, r);
		ctx.arcTo(x+w, y+h, x,   y+h, r);
		ctx.arcTo(x,   y+h, x,   y,   r);
		ctx.arcTo(x,   y,   x+w, y,   r);
		ctx.closePath();
		ctx.fill();
	  }
}
export default Main;
