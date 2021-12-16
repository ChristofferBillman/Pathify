import Square from "./Square";
import ValuePair from "./ValuePair";

export default class StupidPathfinder{

	constructor(world: Square.Square[][]){
		let arr: Square.Square[] = [];

		setInterval(this.iterate,500,
			 new ValuePair(0,0),
			 world,
			 arr);
	}
	public iterate(pos: ValuePair, squares: Square.Square[][], queue: Square.Square[]){

		
		pos.x++;
		pos.y++;
		squares[pos.x][pos.y].visited = true;
	}
}