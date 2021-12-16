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
	 * @param ctx The canvas context.
	 */
	export function draw(width: number, numerOfSquares: number, ctx: CanvasRenderingContext2D){
		if(Input.pPressed()){
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			Utils.drawRoundRect(width-260,20,250,100,10,ctx)
			ctx.fillStyle = "#ffffff";
			ctx.font = "20px Arial";
			ctx.fillText("fps: " + fps as unknown as string,width-250,50)
			ctx.fillText("number of squares: " + numerOfSquares as unknown as string,width-250,80)
		}
	}
}
export default Debug;