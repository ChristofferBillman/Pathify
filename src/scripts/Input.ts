import Position from "./Position";

module Input {
	let mPos: Position;
	let mouseDown: boolean = false;
	let dPressed: boolean = false;
	let lastClickPos: Position;

	export function init(canvas: HTMLCanvasElement){
		mPos = new Position(0,0);
		lastClickPos = new Position(0,0);

		canvas.addEventListener('mousemove', e =>{
			let rect = canvas.getBoundingClientRect();
			mPos = new Position(e.clientX - rect.left, e.clientY - rect.top);
		})
		canvas.addEventListener('mousedown', () =>{mouseDown = true;})
		canvas.addEventListener('mouseup', () =>{mouseDown = false;})
		canvas.addEventListener('click', e =>{
			let rect = canvas.getBoundingClientRect();
			lastClickPos = new Position(e.clientX - rect.left, e.clientY - rect.top);
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
	export function getMousePos(): Position{
		return mPos;
	}
	export function getMouseDown(): boolean{
		return mouseDown;
	}
	// Re-write such that i doesn't break when giving the arguments in different order.
	export function wasClicked(p1: Position, p2: Position): boolean{
		/*console.log("p1: " + p1.x + "," + p1.y)
		console.log("p2: " + p2.x+","+p2.y)
		console.log("lastClick: " + lastClickPos.x + ","+lastClickPos.y)*/
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