export default class Color{

	public r: number = 255;
	public g: number = 0;
	public b: number = 0;
	public a!: number;

	/**
	 * Holds RGBA values.
	 * @param r Red (0-255)
	 * @param g Green (0-255)
	 * @param b Blue (0-255)
	 * @param a Alpha (0-1) (Optional, defaults to 1 if not provided.)
	 */
	constructor(r: number,g:number,b:number,a?: number){
		if(this.boundsCheck(r)){
			this.r = r;
		}
		if(this.boundsCheck(g)){
			this.g = g
		}
		if(this.boundsCheck(b)){
			this.b = b
		}

		if(a === undefined){
			this.a = 1;
		}
		else if(this.boundsCheck(a))	
		{
			this.a = a
		}
	}
	private boundsCheck(n: number){
		if(n > 256 && n < 0){
			throw new RangeError("Some RGBA-value is out of bounds. Allowed values are (0-255).")
		}
		else {
			return true
		}
	}
	public getString(){
		return 'rgba(' + this.r + ',' + this.g +',' + this.b +',' + this.a +')'
	}
	public deepClone(){
		return JSON.parse(JSON.stringify(this))
	}
}