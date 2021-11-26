import Utils from "./Utils";
import ValuePair from "./ValuePair";
import Input from './Input';

export const colors = {
	hover: 'rgba(165,143,204,1)',
	selected: 'rgba(119,63,217,1)',
	default: 'rgba(255,255,255,1)',
	buttonColor: 'rgba(63,204,217)',
	buttonActive: 'rgba(58,123,207)',
	invisible: 'rgba(0,0,0,0)'
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
		} else if(this.tweenBack) {
			return this.from;
		}
		else if(!this.tweenBack){
			return this.to
		}
		return 0
	}
	reset():void{
		this.count = 0;
		this.x = 1/this.animationLength; // Only inital value, will increment when tween() is called.
		this.dx = 1/this.animationLength;
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

	interface UIObject{
		onframe(): void;
		onclick(): void;
	}

	let ctx: CanvasRenderingContext2D;
	export const UIObjects: Map<String, UIObject> = new Map();

	class Cursor implements UIObject{
		pos: ValuePair;
		gridPos: ValuePair
		size: number;
		gap: number;
		borderRadius: number;
		lastGridPos: ValuePair;
		diffX: number = 0;
		diffY: number = 0;
	
		posTween: Tween;
		illegalArea: ValuePair[];
		overUI: boolean = false;
	
		constructor(squareSize: number, borderRadius: number, gap: number, illegalArea: ValuePair[]){
			this.size = squareSize
			this.pos = new ValuePair(0,0)
			this.gridPos = new ValuePair(0,0)
			this.lastGridPos = new ValuePair(0,0)
			this.gap = gap;

			this.illegalArea = illegalArea

			this.borderRadius = borderRadius
			this.posTween = new Tween(0,1,5,false,'easeinout')
		}
		onclick(){

		}
	
		onframe(){
			this.logic()
			this.animate()
			this.draw()
		}
		logic(){
			this.overUI = false;
			if(Input.isHovered(this.illegalArea[0],this.illegalArea[1])){
				this.overUI = true;
			}

			let mousePos = Input.getMousePos()

			let ligp = new ValuePair(this.gridPos.x, this.gridPos.y)

			this.gridPos.x = Math.floor(mousePos.x / (50 + this.gap)) * (50 + this.gap)
			this.gridPos.y = Math.floor(mousePos.y / (50 + this.gap)) * (50 + this.gap)

			// Event that the mouse moves into another square.
			if(!this.gridPos.equals(ligp)){
				this.lastGridPos = new ValuePair(ligp.x,ligp.y)
				this.posTween.reset()
			}

			// Differensen mellan nuvarande gridpos och förra.
			this.diffX = this.lastGridPos.x - this.gridPos.x
			this.diffY = this.lastGridPos.y - this.gridPos.y
		}
		animate(){
			this.posTween.start()
			let d = this.posTween.tween()
			this.pos.x = this.lastGridPos.x - this.diffX * d
			this.pos.y = this.lastGridPos.y - this.diffY * d
		}
		draw(){
			ctx.fillStyle = colors.hover
			if(this.overUI) {
				ctx.fillStyle = colors.invisible
			}

			Utils.drawRoundRect(this.pos.x,this.pos.y,this.size,this.size,this.borderRadius,ctx);
		}
	}
	
	export class Button implements UIObject{
	
		pos: ValuePair;
		defaultPos: ValuePair;
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
		mouseDownTween: Tween;
	
		constructor(pos: ValuePair, width: number, height: number,borderRadius: number, defaultColor: string, pressedColor: string){
			this.pos = pos;
			this.defaultPos = new ValuePair(pos.x,pos.y)
			this.width = width;
			this.height = height;
			this.defaultWidth = width;
			this.defaultHeight = height;
			this.borderRadius = borderRadius;
			
			this.defaultColor = defaultColor;
			this.pressedColor = pressedColor;
	
			this.scalingTween = new Tween(1,1.2,15,true,'easeoutback')
			this.translationTween = new Tween(0,1,15,true,'easeoutback')
			this.mouseDownTween = new Tween(1,1.1,10,true,'easeinout')
		}
	
		public onframe(): void{
			this.logic();
			this.animate();
			this.draw();
		}
	
		public onclick():void {
			if(Input.wasClicked(this.pos, new ValuePair(this.pos.x + this.width, this.pos.y + this.height))){
				if(this.pressed === false) this.pressed = true;
				else this.pressed = false;
			}
		}
	
		private logic():void{
			if(Input.isHovered(this.pos, new ValuePair(this.pos.x + this.width, this.pos.y + this.height))){
				this.hover = true;
			}
			else {
				this.hover = false;
			}
		}
	
		private animate():void{
			let mouseDownScale = 1;
			if(this.hover){
				this.scalingTween.start();
				this.translationTween.start();

				if(Input.getMouseDown()){
					this.mouseDownTween.start()
				}
				else{
					this.mouseDownTween.interrupt();
				}
			}
			else {
				this.scalingTween.interrupt();
				this.translationTween.interrupt();
				this.mouseDownTween.interrupt();
			}
			// Only run Tween.tween() once per frame.
			let pScaling = this.mouseDownTween.tween()
			let scale = this.scalingTween.tween() * pScaling
			let tFactor = this.translationTween.tween()
			this.width = scale*mouseDownScale*this.defaultWidth;
			this.height = scale*mouseDownScale*this.defaultHeight;
			this.pos.x =  this.defaultPos.x + -6 * tFactor * pScaling
			this.pos.y =  this.defaultPos.y + -6 * tFactor * pScaling
			
		}
		private draw():void{
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
	class Menu implements UIObject{
		dim: ValuePair;
		pos: ValuePair;

		constructor(pos: ValuePair, dimensions: ValuePair){
			this.pos = pos;
			this.dim = dimensions
		}
		onframe(): void {
			ctx.shadowColor = "rgba(0,0,0,0.2)";
			ctx.shadowBlur = 10;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			ctx.fillStyle = '#ffffff';
			Utils.drawRoundRect(
				this.pos.x,
				this.pos.y,
				this.dim.x,
				this.dim.y,
				20,
				ctx);

			ctx.shadowBlur = 0;
		}
		onclick(): void {
		}
	}

	export function onframe(width: number, height: number){

		UIObjects.forEach(UIObject=>{
			// Draws the object on the canvas and does all logic and animation.
			UIObject.onframe();
		})
	}
	export function init(context: CanvasRenderingContext2D){
		ctx = context;

		UIObjects.set('cursor', new Cursor(
			50,
			5,
			5,
			[new ValuePair(50,50), new ValuePair(550,80+50)]
			));

		UIObjects.set('menu', new Menu(
			new ValuePair(50,50),
			new ValuePair(500,80)
			))

		UIObjects.set('eraseButton', new Button(
			new ValuePair(60,60),
			60,60,
			10,
			colors.buttonColor,
			colors.buttonActive
			));
		UIObjects.set('setGoalButton', new Button(
			new ValuePair(60*2+10,60),
			60,60,
			10,
			colors.buttonColor,
			colors.buttonActive));
		UIObjects.set('setStartButton', new Button(
			new ValuePair(60*3+20,60),
			60,60,
			10,
			colors.buttonColor,
			colors.buttonActive
			));

		for(let i = 0; i < 5 ; i++){
			let x = 70 * 5-10 + (i * 70)
			let color = 'rgb('+(119 + i*20) +', 63, 217)'
			UIObjects.set('genericButton_' + i , new Button(new ValuePair(x,60),60,60,10,color,colors.buttonActive));
		}
	}
}
export default UI;