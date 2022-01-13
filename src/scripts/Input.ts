import ValuePair from "./ValuePair";
import UI from './UI'
import Square from "./Square";

namespace Input {
	let mPos: ValuePair;
	let mouseDown: boolean = false;
	let dPressed: boolean = false;
	let lastClickPos: ValuePair;
	let squares: Square.Square[][];

	export function init(grid: Square.Square[][]){
		mPos = new ValuePair(0,0);
		lastClickPos = new ValuePair(0,0);
		squares = grid;

		window.canvas.addEventListener('mousemove', e =>{
			let rect = window.canvas.getBoundingClientRect();
			mPos = new ValuePair(e.clientX - rect.left, e.clientY - rect.top);
		})
		window.canvas.addEventListener('mousedown', () =>{mouseDown = true;})
		window.canvas.addEventListener('mouseup', () =>{mouseDown = false;})
		window.canvas.addEventListener('click', e =>{
			let rect = window.canvas.getBoundingClientRect();
			lastClickPos = new ValuePair(e.clientX - rect.left, e.clientY - rect.top);

			UI.UIObjects.forEach(UIObject =>{
				UIObject.onclick();
			})

			for(let i = 0; i < squares.length; i++){
				for(let j = 0; j < squares[i].length; j++){
					squares[i][j].onclick();
				}
			}
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