import ValuePair from "./ValuePair";
import UI from './UI'

module Input {
	let mPos: ValuePair;
	let mouseDown: boolean = false;
	let dPressed: boolean = false;
	let lastClickPos: ValuePair;

	export function init(canvas: HTMLCanvasElement){
		mPos = new ValuePair(0,0);
		lastClickPos = new ValuePair(0,0);

		canvas.addEventListener('mousemove', e =>{
			let rect = canvas.getBoundingClientRect();
			mPos = new ValuePair(e.clientX - rect.left, e.clientY - rect.top);
		})
		canvas.addEventListener('mousedown', () =>{mouseDown = true;})
		canvas.addEventListener('mouseup', () =>{mouseDown = false;})
		canvas.addEventListener('click', e =>{
			let rect = canvas.getBoundingClientRect();
			lastClickPos = new ValuePair(e.clientX - rect.left, e.clientY - rect.top);

			UI.UIObjects.forEach(UIObject =>{
				UIObject.onclick();
			})
		})

		window.addEventListener('keypress', e =>{
			if(e.key === 'd'){
				if(dPressed === true){
					dPressed = false;
				}
				else {
					dPressed = true;
				}
			}
		})
	}
	export function getMousePos(): ValuePair{
		return mPos;
	}
	export function getMouseDown(): boolean{
		return mouseDown;
	}
	export function isHovered(p1: ValuePair, p2: ValuePair ){
		if(mPos.x < p2.x  && mPos.x > p1.x){
			if(mPos.y < p2.y && mPos.y > p1.y){
				return true;
			}
		}
		return false;
	}
	// Re-write such that i doesn't break when giving the arguments in different order.
	export function wasClicked(p1: ValuePair, p2: ValuePair): boolean{
			if(lastClickPos.x < p2.x  && lastClickPos.x > p1.x){
				if(lastClickPos.y < p2.y && lastClickPos.y > p1.y){
					return true;
				}
			}
			return false;
		}
	export function pPressed(): boolean{
		return dPressed;
	}
}
export default Input;