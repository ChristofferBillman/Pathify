import Position from "./Position";

module Input {
	let mPos: Position;
	let mouseDown: boolean = false;

	let dPressed: boolean = false;

	export function init(canvas: HTMLCanvasElement){
		mPos = new Position(0,0);

		canvas.addEventListener('mousemove', e =>{
			var rect = canvas.getBoundingClientRect();
			mPos = new Position(e.clientX - rect.left, e.clientY - rect.top);
		})
		canvas.addEventListener('mousedown', () =>{mouseDown = true;})
		canvas.addEventListener('mouseup', () =>{mouseDown = false;})

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
	export function getMousePos(){
		return mPos;
	}
	export function getMouseDown(){
		return mouseDown;
	}
	export function pPressed(){
		return dPressed;
	}
}
export default Input;