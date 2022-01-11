/*
import Grid from "./Grid";
import Square from "./Square";
import ValuePair from "./ValuePair";

export default class Astar{

	queue: Square.Square[];
	grid: Square.Square[][];
	path: Square.Square[];

	start: ValuePair = new ValuePair(5,5);
	goal: ValuePair = new ValuePair(15,10);
	pos: ValuePair;

	timerID: number;

	constructor(world: Square.Square[][]){
		this.queue = [];
		this.path = [];
		this.grid = world;

		this.pos = new ValuePair(this.start.x,this.start.y);
		this.queue.push(this.grid[this.start.x][this.start.y]);
		this.timerID = window.setInterval(this.iterate,500,this);
	}
	private iterate(t: this){

		let best: number = 1000;
		let bestVal: number = 10000;

		for(let i = 0; i < this.queue.length; i++){
			let s = t.queue[i];
			let val = t.pCost(s.gridPos.x,s.gridPos.y) + t.heuristic(s.gridPos.x,s.gridPos.y);
			if(val < bestVal) {
				bestVal = val;
				best = i;
			}
		}

		for(let x = t.pos.x-1; x <=t.pos.x+1; x++){
			for(let y = t.pos.y-1; y <= t.pos.y+1; y++){

				if(!Grid.isInGrid(new ValuePair(x,y))){
					continue;
				}
				if(x === t.pos.x && y === t.pos.y){
					continue;
				}
				if(t.grid[x][y].selected){
					continue;
				}

				// Gör saker
				t.grid[x][y].evaluated = true;
				if(t.pCost(x,y) + t.heuristic(x,y) < bestValue){
					bestValue = t.pCost(x,y) + t.heuristic(x,y);
					bestOption.x = x;
					bestOption.y = y;
				}
			}
		}
		t.pos.x = bestOption.x;
		t.pos.y = bestOption.y;
		console.log('x: ' + t.pos.x + 'y: ' + t.pos.y);
		t.grid[bestOption.x][bestOption.y].visited = true;

		if(bestValue <= 2){
			console.log("Found goal at:    x: "+ bestOption.x + "    y: " + bestOption.y)
			window.clearInterval(t.timerID)
		}
	}
	private heuristic(x: number, y: number): number{
		return Math.sqrt(Math.pow(this.goal.x - x,2) + Math.pow(this.goal.y - y,2));
	}
	private pCost(x:number,y:number): number{
		return this.pathCost + Math.sqrt(Math.pow(this.pos.x - x,2) + Math.pow(this.pos.y - y,2));
	}
}*/