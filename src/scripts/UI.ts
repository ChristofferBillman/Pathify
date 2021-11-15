import Utils from "./Utils";
import Position from "./Position";
import Input from './Input';

module UI{

	let ctx: CanvasRenderingContext2D;
	export const UIObjects: Map<String, Button> = new Map();

	export class Button{

		pos: Position;
		width: number;
		height: number;
		borderRadius: number;
		defaultColor: string;
		scalingFactor: number = 1.1;

		/*
		 *	State variables
		 */
		pressed: boolean = false;
		hover: boolean = false;

		/*
		 *	Animation variables.
		 */

		// Animation length in frames.
		animationLength = 5;
		animationFrame = 0;
		// allowed types are 'in' and 'out'.
		animationMode: string = 'in';
		dSize: number;
		dTranslation: number;

		constructor(pos: Position, width: number, height: number,borderRadius: number, defaultColor: string){
			this.pos = pos;
			this.width = width;
			this.height = height;
			this.borderRadius = borderRadius;

			this.defaultColor = defaultColor;

			this.dSize = (this.width*(this.scalingFactor -1))/this.animationLength;
			this.dTranslation = this.dSize/2;
		}
		/**
		 * Function to be called on each frame.
		 */
		public onframe(){
			this.logic();
			this.animate();
			this.draw();
		}
		/**
		 * Function to be called on each click event.
		 */
		public onclick() {
			if(Input.wasClicked(this.pos, new Position(this.pos.x + this.width, this.pos.y + this.height))){
				if(this.pressed === false) this.pressed = true;
				else this.pressed = false;
			}
		}
		/**
		 * Changes the internal states of the object. It is important that this function is called before both draw() and animate().
		 */
		private logic(){
			if(Input.isHovered(this.pos, new Position(this.pos.x + this.width, this.pos.y + this.height))){
				this.hover = true;
			}
			else {
				this.hover = false;
			}
		}
		/**
		 * Animates different values. Animates the button scale and position linearly.
		 */
		private animate(){
			if(this.hover){
				if(this.animationFrame === this.animationLength) {
					this.animationMode = 'out';
				}
				if(this.animationFrame === 0) {
					this.animationMode = 'in';
				}

				if(this.animationMode === 'in'){
					this.width = this.width + this.dSize;
					this.height = this.height + this.dSize;

					this.pos.x = this.pos.x - this.dTranslation;
					this.pos.y = this.pos.y - this.dTranslation;
					this.animationFrame++;
				}
			}
			else if(this.animationMode === 'out' && this.animationFrame > 0){
				this.width = this.width - this.dSize;
				this.height = this.height - this.dSize;

				this.pos.x = this.pos.x + this.dTranslation;
				this.pos.y = this.pos.y + this.dTranslation;
				this.animationFrame--;
			}
		}
		/**
		 * Draws on the canvas. Draws different things based on the states of the object.
		 */
		private draw(){
			ctx.fillStyle = this.defaultColor;
			if(this.pressed){
				ctx.fillStyle = '#04bd7c'
			}
			Utils.drawRoundRect(this.pos.x,this.pos.y,this.width,this.height,this.borderRadius,ctx);
		}
		getState(){
			return this.pressed;
		}
	}

	export function onframe(width: number, height: number){
		ctx.shadowColor = "rgba(0,0,0,0.2)";
		ctx.shadowBlur = 10;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.fillStyle = '#ffffff';
		Utils.drawRoundRect(50,50,width-width/2,80,20,ctx);
		ctx.shadowBlur = 0;

		UIObjects.forEach(UIObject=>{
			// Draws the object on the canvas and does all logic and animation.
			UIObject.onframe();
		})
	}
	export function init(context: CanvasRenderingContext2D){
		ctx = context;
		UIObjects.set('eraseButton', new Button(new Position(60,60),60,60,10,'#3fccd9'));

		for(let i = 0; i < 5; i++){
			let x = 130 + (i * 70)
			let color = 'rgb('+(119 + i*20) +', 63, 217)'
			UIObjects.set('genericButton_' + i , new Button(new Position(x,60),60,60,10,color));
		}
	}
}
export default UI;