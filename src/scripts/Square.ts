import Position from './Position'
import Utils from './Utils';
import Input from './Input';
import {Tween, ColorTween,colors} from './UI'

module Square{

	let ctx: CanvasRenderingContext2D;

	export class Square{

		selected: boolean = false;
		hover: boolean = false;
		position: Position;
		pos: Position;
		size: number;

		hoverTween: ColorTween;
		selectionTween: Tween;

		color: string = colors.default;

		constructor(size: number, coordinatesOnCanvas: Position, position: Position){
			this.size = size;
			this.position = position;
			this.pos = coordinatesOnCanvas;

			this.hoverTween = new ColorTween(colors.default,colors.hover,5,true,'easeinout')
			this.selectionTween = new Tween(0,1,5,true,'easeinout')
		}
		onframe(erase: boolean){
			this.logic(erase);
			this.animate();
			this.draw();
		}
		private logic(erase: boolean){
			if(this.hover){
				this.hover = false;
			}
			if(Input.isHovered(this.pos, new Position(this.pos.x+this.size,this.pos.y+this.size) )){
				if(!Input.getMouseDown()) {
					this.hover = true;
				}
				if(Input.getMouseDown()){
					if(erase){
						this.selected = false;
					}
					else {
						this.selected = true;
					}
				}
			}
		}
		private animate(){
			this.color = this.hoverTween.tween();
			if(this.hover) {
				this.hoverTween.start()
			}
			else {
				this.hoverTween.interrupt()
			}
			if(this.selected){
				 this.color = colors.selected;
			}
		}

		private draw(){
			ctx.fillStyle = this.color
			Utils.drawRoundRect(this.pos.x,this.pos.y,this.size,this.size,5,ctx);
		}
	}
	/**
	 * Populates this.square with squares. Is called on every iteration of loop().
	 * @note Can be optimized, should be called every time window is resized - not in every iteration of the loop.
	 */
	export function setSquares(width: number, height: number, squareSize: number, gap: number): Square[]{
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
	export function init(context: CanvasRenderingContext2D){
		ctx = context;
	}
}
export default Square;