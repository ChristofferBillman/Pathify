module Utils {
	/**
	 * Draws a rounded rectangle on the provided canvas context.
	 * @param x Coordinate on canvas.
	 * @param y Coordinate on canvas.
	 * @param w Width of square.
	 * @param h Height of square.
	 * @param r Border radius of square.
	 * @param ctx The canvas context which the square is to be painted on.
	 */
	export function drawRoundRect(x: number, y: number, w: number, h: number, r:number, ctx: any) {
		if (w < 2 * r) r = w / 2;
		if (h < 2 * r) r = h / 2;
		ctx.beginPath();
		ctx.moveTo(x+r, y);
		ctx.arcTo(x+w, y,   x+w, y+h, r);
		ctx.arcTo(x+w, y+h, x,   y+h, r);
		ctx.arcTo(x,   y+h, x,   y,   r);
		ctx.arcTo(x,   y,   x+w, y,   r);
		ctx.closePath();
		ctx.fill();
	  }
}
export default Utils;