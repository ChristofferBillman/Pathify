import Position from './Position'
import Utils from './Utils';
import State from './State';

export default class Square{

	state: State = State.DEFAULT
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
	logic(mouseDown: boolean, mousePos: Position){
		if(this.state === State.HOVER){
			this.state = State.DEFAULT;
		}
		if(this.mouseInSquare(mousePos)){
			if(!mouseDown) {
				this.state = State.HOVER;
			}
			if(mouseDown){
				if(this.state === State.DEFAULT){
					this.state = State.SELECTED;
				}
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D){
		ctx.fillStyle = this.color;

		if(this.state === State.SELECTED){
			this.color = Square.colors.selected;
		}
		else if(this.state === State.HOVER) {
			ctx.fillStyle = Square.colors.hover;
		}
		Utils.drawRoundRect(this.coordinates.x,this.coordinates.y,this.size,this.size,5, ctx);
	}
	private mouseInSquare(mousePos: Position) {
		if(mousePos.x < this.coordinates.x+this.size && mousePos.x > this.coordinates.x){
			if(mousePos.y < this.coordinates.y+this.size && mousePos.y > this.coordinates.y){
				return true;
			}
		}
		return false;
	}

	/**
	 * Populates this.square with squares. Is called on every iteration of loop().
	 * @note Can be optimized, should be called every time window is resized - not in every iteration of the loop.
	 */
	 public static setSquares(width: number, height: number, squareSize: number, gap: number){
		let i: number = 0;
		let j: number = 0;
		let squares = [];

		for(let x = 0; x < width ; x = x + squareSize+gap){
			for(let y = 0; y < height; y = y + squareSize+gap){
				squares.push(
					new Square(squareSize,
					new Position(x,y),
					new Position(i,j))
					)
			}
			j++;
		}
		i++;
		return squares;
	}
}