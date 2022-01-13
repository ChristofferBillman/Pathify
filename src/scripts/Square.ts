import ValuePair from './ValuePair'
import Utils from './Utils';
import Input from './Input';
import UI from './UI'
import Color from './Color'
import Grid from './Grid';

namespace Square{

	export class Square{

		selected: boolean = false;
		hover: boolean = false;
		start: boolean = false;
		goal: boolean = false;
		pos: ValuePair;
		gridPos: ValuePair;
		size: number;

		public visited: boolean = false;
		public evaluated: boolean = false;

		hoverTween: UI.ColorTween;
		selectionTween: UI.Tween;

		color: Color = UI.colors.default;
		image: HTMLImageElement | undefined;

		constructor(size: number, position: ValuePair, gridPos: ValuePair){
			this.size = size;
			this.pos = position;
			this.gridPos = gridPos;

			this.hoverTween = new UI.ColorTween(UI.colors.default,UI.colors.hover,5,true,'easeinout')
			this.selectionTween = new UI.Tween(0,1,5,true,'easeinout')
		}
		onframe(erase: boolean){
			this.logic(erase);
			this.animate();
			this.draw();
		}
		onclick(){
			let menu: UI.Menu = (UI.UIObjects.get('menu') as UI.Menu);
			// Check if the mouse is over the menu bar.
			if(Input.isHovered(menu.pos, new ValuePair(menu.pos.x + menu.dim.x, menu.pos.y + menu.dim.y))){
				return;
			}
			if(Input.wasClicked(this.pos, new ValuePair(this.pos.x + this.size,this.pos.y + this.size))){
				if((UI.UIObjects.get('setGoalButton') as UI.Button).pressed){
					Grid.unsetGoals();
					this.setGoal();
				}
				if((UI.UIObjects.get('setStartButton') as UI.Button).pressed){
					Grid.unsetStarts();
					this.setStart();
				}
			}
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
			this.color = UI.colors.default
			if(this.evaluated){
				this.color = UI.colors.evaluated;
			}
			
			if(this.visited){
				this.color = UI.colors.visited;
			}
			
			if(this.selected){
				 this.color = UI.colors.selected;
			}
		}


		private draw(){
			window.ctx.fillStyle = this.color.getString()
			Utils.drawRoundRect(this.pos.x,this.pos.y,this.size,this.size,5,window.ctx);

			if(this.image) window.ctx.drawImage(this.image,this.pos.x+10,this.pos.y+10,this.size-20,this.size-20);
		}
		public setGoal(){
			this.image = new Image();
			this.goal = true;
			this.image!.src = '/img/goal.svg';
		}
		public unsetGoal(){
			this.goal = false;
			if(!this.start) this.image = undefined;
		}
		public setStart(){
			this.image = new Image();
			this.start = true;
			this.image!.src = '/img/start.svg';
		}
		public unsetStart(){
			this.start = false;
			if(!this.goal) this.image = undefined;
		}
	}
	/*export function init(context: CanvasRenderingContext2D, UIobj: Map<String, UI.UIObject>){
		ctx = context;
		UIObjects = UIobj;
	}*/
}
export default Square;