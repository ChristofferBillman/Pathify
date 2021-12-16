export default class ValuePair {

	public x: number;
	public y: number;

	constructor(x: number, y:number){
		this.x = x;
		this.y = y;
	}
	public equals(p: ValuePair){
		return this.x === p.x && this.y === p.y;
	}
}