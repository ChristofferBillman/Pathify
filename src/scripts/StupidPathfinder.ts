import Square from "./Square";
import ValuePair from "./ValuePair";

export default class StupidPathfinder{

	pos: ValuePair;
	arr: Square.Square[];
	squares: Square.Square[][];

	dx: number = 1;
	dy: number = 1;

	constructor(world: Square.Square[][]){
		this.pos = new ValuePair(2,0)
		this.arr = [];
		this.squares = world;

		setInterval(this.iterate,250,this);
	}
	private iterate(t: this){
		// t is short for "this".
		if(t.pos.x >= t.squares.length-1){
			t.dx = -1;
		}
		if(t.pos.x <= 0){
			t.dx = 1;
		}
		if(t.pos.y >= t.squares[0].length-1){
			t.dy = -1;
		}
		if(t.pos.y <= 0){
			t.dy = 1;
		}
		t.squares[t.pos.x][t.pos.y].visited = true;

		t.pos.y = t.pos.y + t.dy;
		t.pos.x = t.pos.x + t.dx;
	}
}