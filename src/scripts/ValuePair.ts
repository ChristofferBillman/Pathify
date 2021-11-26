export default class ValuePair {

	x: number;
	y: number;

	constructor(x: number, y:number){
		this.x = x;
		this.y = y;
	}
	public equals(p: ValuePair){
		return this.x === p.x && this.y === p.y;
	}
}