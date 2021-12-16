import Square from "./Square";
import ValuePair from "./ValuePair";

export default class StupidPathfinder{

	pos: ValuePair;
	arr: Square.Square[];
	squares: Square.Square[][];

	constructor(world: Square.Square[][]){
		this.pos = new ValuePair(0,0)
		this.arr = [];
		this.squares = world;

		setInterval(this.iterate,500,this);
	}
	public iterate(instance: this){

		console.log(instance.pos)
		//pos.y++;
		//squares[pos.x][pos.y].visited = true;
	}
}