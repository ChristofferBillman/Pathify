import Position from './Position'
import Utils from './Utils';

export default class Square{

	selected: boolean = false;
	hover: boolean = false;
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
	logic(mouseDown: boolean, mousePos: Position, erase: boolean){
		if(this.hover){
			this.hover = false;
		}
		if(this.mouseInSquare(mousePos)){
			if(!mouseDown) {
				this.hover = true;
			}
			if(mouseDown){
				if(erase){
					this.selected = false;
				}
				else {
					this.selected = true;
				}
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D){
		ctx.fillStyle = this.color;

		if(this.selected){
			this.color = Square.colors.selected;
		}
		else {
			this.color = Square.colors.default;
		}
		if(this.hover) {
			ctx.fillStyle = Square.colors.hover;
		}
		Utils.drawRoundRect(this.coordinates.x,this.coordinates.y,this.size,this.size,5,ctx);
	}
	private mouseInSquare(mousePos: Position): boolean {
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
	 public static setSquares(width: number, height: number, squareSize: number, gap: number): Square[]{
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