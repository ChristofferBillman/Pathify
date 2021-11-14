import Utils from "./Utils";
import Square from "./Square";
import Position from "./Position";
import Input from './Input';

	interface gameObject{
		draw(ctx: CanvasRenderingContext2D): void;
		onclick(): void;
	}

	export class Button implements gameObject {

		pos: Position;
		width: number;
		height: number;
		borderRadius: number;
		pressed: boolean = false;
		hover: boolean = false;

		constructor(pos: Position, width: number, height: number,borderRadius: number){
			this.pos = pos;
			this.width = width;
			this.height = height;
			this.borderRadius = borderRadius;
		}
		draw(ctx: CanvasRenderingContext2D){
			ctx.fillStyle = Square.colors.selected;
			if(this.pressed){
				ctx.fillStyle = '#04bd7c'
			}
			Utils.drawRoundRect(this.pos.x,this.pos.y,this.width,this.height,this.borderRadius,ctx);
		}
		onclick() {
			if(Input.wasClicked(this.pos, new Position(this.pos.x + this.width, this.pos.y + this.height))){
				if(this.pressed === false) this.pressed = true;
				else this.pressed = false;
			}
		}
		getState(){
			return this.pressed;
		}
	}

module UI{

	export const UIObjects: Map<String, Button> = new Map();

	UIObjects.set("eraseButton", new Button(new Position(60,60),60,60,10));

	export function draw(width: number, height: number,ctx: CanvasRenderingContext2D){
		ctx.shadowColor = "rgba(0,0,0,0.2)";
		ctx.shadowBlur = 10;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.fillStyle = '#ffffff';
		Utils.drawRoundRect(50,50,width-width/2,80,20,ctx);
		ctx.shadowBlur = 0;

		UIObjects.forEach(UIObject=>{
			UIObject.draw(ctx);
		})

		ctx.fillStyle = Square.colors.hover;
		for(let x = 70; x < 5*70; x=x+70){
			Utils.drawRoundRect(60+x,60,60,60,10,ctx);
		}
	}
}
export default UI;