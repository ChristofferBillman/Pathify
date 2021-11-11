import Input from './Input'
import Utils from './Utils'

module Debug {

	var times:any = [];
	var fps:number = 60;

	export function calculatePerformance(){
		let now = performance.now();
		while (times.length > 0 && times[0] <= now - 1000) {
			times.shift();
		}
		times.push(now);
		fps = times.length;
	}
	export function draw(width: number, sLen: number, ctx: CanvasRenderingContext2D){
		if(Input.pPressed()){
			ctx.fillStyle = "rgba(0,0,0,0.5)";
			Utils.drawRoundRect(width-260,20,250,100,10,ctx)
			ctx.fillStyle = "#ffffff";
			ctx.font = "20px Arial";
			ctx.fillText("fps: " + fps as unknown as string,width-250,50)
			ctx.fillText("number of squares: " + sLen as unknown as string,width-250,80)
		}
	}
}
export default Debug;