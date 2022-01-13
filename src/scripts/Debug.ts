import Input from './Input'
import Utils from './Utils'

module Debug {

	var times:any = [];
	var fps:number = 60;
	/**
	 * Calculates the FPS of the game loop.
	 */
	export function calculatePerformance(){
		let now = performance.now();
		while (times.length > 0 && times[0] <= now - 1000) {
			times.shift();
		}
		times.push(now);
		fps = times.length;
	}
	/**
	 * Draws the performance statistics on the canvas.
	 * @param width Width of the window.
	 * @param numerOfSquares The number of squares currently being drawn on the canvas.
	 */
	export function draw(width: number, numerOfSquares: number){
		if(Input.pPressed()){
			window.ctx.fillStyle = "rgba(0,0,0,0.5)";
			Utils.drawRoundRect(width-260,20,250,100,10,window.ctx)
			window.ctx.fillStyle = "#ffffff";
			window.ctx.font = "20px Arial";
			window.ctx.fillText("fps: " + fps as unknown as string,width-250,50)
			window.ctx.fillText("number of squares: " + numerOfSquares as unknown as string,width-250,80)
		}
	}
}
export default Debug;