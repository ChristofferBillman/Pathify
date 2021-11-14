export default class Position {

	x: number;
	y: number;

	constructor(x: number, y:number){
		this.x = x;
		this.y = y;
	}
	public equals(p: Position){
		return this.x === p.x && this.y === p.y;
	}
}