import Utils from "./Utils";
import Square from "./Square";

export default class UI{

	draw(width: number, height: number,ctx: CanvasRenderingContext2D){
		ctx.shadowColor = "rgba(0,0,0,0.2)";
		ctx.shadowBlur = 10;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.fillStyle = '#ffffff';
		Utils.drawRoundRect(50,50,width-width/2,80,20,ctx);
		ctx.shadowBlur = 0;
		ctx.fillStyle = Square.colors.hover;
		for(let x = 0; x < 5*70; x=x+70){
			Utils.drawRoundRect(60+x,60,60,60,10,ctx);
		}
	}
}