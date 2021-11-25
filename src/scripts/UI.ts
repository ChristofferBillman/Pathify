import Utils from "./Utils";
import Position from "./Position";
import Input from './Input';

export const colors = {
	hover: 'rgba(165,143,204,1)',
	selected: 'rgba(119,63,217,1)',
	default: 'rgba(255,255,255,1)',
	buttonColor: 'rgba(63,204,217)',
	buttonActive: 'rgba(58,123,207)'
}

export class Tween {
	interrupted: boolean = true;
	tweenBack: boolean;
	from: number;
	to: number;
	difference: number;
	count: number = 0;
	animationLength: number;
	x: number;
	dx: number;
	timingFunc!: Function;

	constructor(from: number, to: number,animationLength: number, tweenBack: boolean, timingFunc: string | ((x:number) => number)){
		this.from = from;
		this.to = to;
		this.animationLength = animationLength;
		this.tweenBack = tweenBack;

		this.x = 1/animationLength; // Only inital value, will increment when tween() is called.
		this.dx = 1/animationLength;
		this.difference = to - from;

		if(typeof(timingFunc) === 'string'){
			switch(timingFunc){
				case 'easeinout':
					this.timingFunc = (x: number):number => {
						return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
					}
					break;
				case 'easeoutback':
					this.timingFunc = (x: number):number => {
						const c1 = 1.70158;
						const c3 = c1 + 1;

						return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
					}
					break;
				default:
					this.timingFunc = (x: number):number => {
						return x;
					}
					break;
			}
		}
		else{
			this.timingFunc = timingFunc;
		}
	}
	tween(): number{
		let computedValue: number
		if(!this.interrupted && this.count < this.animationLength){
			this.x = this.x + this.dx;
			this.count++;
			computedValue = this.timingFunc(this.x);
			return (computedValue * this.difference) + this.from;
		}
		else if(this.tweenBack && this.count > 0){
			this.x = this.x - this.dx;
			this.count--;
			computedValue = this.timingFunc(this.x);
			return (computedValue * this.difference) + this.from;
		} else {
			return this.from;
		}
	}
	interrupt(): void{
		this.interrupted = true;
	}
	start(): void{
		this.interrupted = false;
	}
}

export class ColorTween {

	rt: Tween;
	gt: Tween;
	bt: Tween;
	at: Tween;

	from: number[];
	to: number[];

	constructor(from: string, to: string,animationLength: number, tweenBack: boolean, timingFunc: string | ((x:number) => number)){
		this.from = this.toArr(from)
		this.to = this.toArr(to)

		this.rt = new Tween(this.from[0],this.to[0],animationLength,tweenBack,timingFunc)
		this.gt = new Tween(this.from[1],this.to[1],animationLength,tweenBack,timingFunc)
		this.bt = new Tween(this.from[2],this.to[2],animationLength,tweenBack,timingFunc)
		this.at = new Tween(this.from[3],this.to[3],animationLength,tweenBack,timingFunc)
	}
	tween(): string{
		let cv: number[] = []
		cv[0] = this.rt.tween()
		cv[1] = this.gt.tween()
		cv[2] = this.bt.tween()
		cv[3] = this.at.tween()
		return 'rgba('+cv[0]+','+cv[1]+','+cv[2]+','+cv[3]+')'
	}
	start(){
		this.rt.start();
		this.gt.start();
		this.bt.start();
		this.at.start();
	}
	interrupt(){
		this.rt.interrupt();
		this.gt.interrupt();
		this.bt.interrupt();
		this.at.interrupt();
	}
	toArr(color: string){
		color = color.replace(')','')
		color = color.replace('rgba(','')
		return color.split(',').map(Number);
	}

}

module UI{

	let ctx: CanvasRenderingContext2D;
	export const UIObjects: Map<String, Button> = new Map();
	
	export class Button{
	
		pos: Position;
		defaultPos: Position;
		width: number;
		height: number;
		defaultWidth: number;
		defaultHeight: number;
		borderRadius: number;
		defaultColor: string;
		pressedColor: string;
	
		pressed: boolean = false;
		hover: boolean = false;
	
		scalingTween: Tween;
		translationTween: Tween;
	
		constructor(pos: Position, width: number, height: number,borderRadius: number, defaultColor: string, pressedColor: string){
			this.pos = pos;
			this.defaultPos = new Position(pos.x,pos.y)
			this.width = width;
			this.height = height;
			this.defaultWidth = width;
			this.defaultHeight = height;
			this.borderRadius = borderRadius;
			
			this.defaultColor = defaultColor;
			this.pressedColor = pressedColor;
	
			this.scalingTween = new Tween(1,1.2,15,true,'easeoutback')
			this.translationTween = new Tween(0,1,15,true,'easeoutback')
		}
	
		public onframe(){
			this.logic();
			this.animate();
			this.draw();
		}
	
		public onclick() {
			if(Input.wasClicked(this.pos, new Position(this.pos.x + this.width, this.pos.y + this.height))){
				if(this.pressed === false) this.pressed = true;
				else this.pressed = false;
			}
		}
	
		private logic(){
			if(Input.isHovered(this.pos, new Position(this.pos.x + this.width, this.pos.y + this.height))){
				this.hover = true;
			}
			else {
				this.hover = false;
			}
		}
	
		private animate(){
			// Only run Tween.tween() once per frame.
			let scale = this.scalingTween.tween();
			let tFactor = this.translationTween.tween();
			this.width = scale*this.defaultWidth;
			this.height = scale*this.defaultHeight;
			this.pos.x =  this.defaultPos.x + -4 * tFactor
			this.pos.y =  this.defaultPos.y + -4 * tFactor

			if(this.hover){
				this.scalingTween.start();
				this.translationTween.start();
			}
			else {
				this.scalingTween.interrupt();
				this.translationTween.interrupt();
			}
		}
		private draw(){
			ctx.fillStyle = this.defaultColor;
			if(this.pressed){
				ctx.fillStyle = this.pressedColor;
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
		UIObjects.set('eraseButton', new Button(
			new Position(60,60),
			60,60,
			10,
			colors.buttonColor,
			colors.buttonActive
			));
		UIObjects.set('setGoalButton', new Button(
			new Position(60*2+10,60),
			60,60,
			10,
			colors.buttonColor,
			colors.buttonActive));
		UIObjects.set('setStartButton', new Button(
			new Position(60*3+20,60),
			60,60,
			10,
			colors.buttonColor,
			colors.buttonActive
			));

		for(let i = 0; i < 5 ; i++){
			let x = 70 * 5-10 + (i * 70)
			let color = 'rgb('+(119 + i*20) +', 63, 217)'
			UIObjects.set('genericButton_' + i , new Button(new Position(x,60),60,60,10,color,colors.buttonActive));
		}
	}
}
export default UI;