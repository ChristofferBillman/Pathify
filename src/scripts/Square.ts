import ValuePair from './ValuePair'
import Utils from './Utils';
import Input from './Input';
import {Tween, ColorTween,colors} from './UI'
import Color from './Color'

module Square{

	let ctx: CanvasRenderingContext2D;

	export class Square{

		selected: boolean = false;
		hover: boolean = false;
		pos: ValuePair;
		size: number;

		public visited: boolean = false;

		hoverTween: ColorTween;
		selectionTween: Tween;

		color: Color = colors.default;

		constructor(size: number, position: ValuePair){
			this.size = size;
			this.pos = position;

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
			if(Input.isHovered(this.pos, new ValuePair(this.pos.x+this.size,this.pos.y+this.size) )){
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
			this.color = colors.default
			
			if(this.visited){
				this.color = colors.visited;
			}
			
			if(this.selected){
				 this.color = colors.selected;
			}
		}

		private draw(){
			ctx.fillStyle = this.color.getString()
			Utils.drawRoundRect(this.pos.x,this.pos.y,this.size,this.size,5,ctx);
		}
	}
	/**
	 * Populates this.square with squares. Is called on init and on window resize.
	 */
	export function setSquares(width: number, height: number, squareSize: number, gap: number): Square[][]{
		let i: number = 0;
		let j: number = 0;
		let squares: Square[][] = [];

		for(let x = 0; x < width ; x = x + squareSize+gap){

			console.log("HEj")
			squares[i] = [];

			for(let y = 0; y < height; y = y + squareSize+gap){
				console.log("i: " + i + "    j: " + j);
				squares[i][j] = new Square(squareSize, new ValuePair(x,y));
				j++;
			}
			j = 0;
			i++;
		}
		return squares;
	}
	export function init(context: CanvasRenderingContext2D){
		ctx = context;
	}
}
export default Square;