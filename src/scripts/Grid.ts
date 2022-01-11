import Square from './Square'
import UI from './UI';
import ValuePair from './ValuePair'

namespace Grid {
	let grid: Square.Square[][];
	let squareSize: number = 50;
	let gap: number = 5;

	export function init(width: number, height: number): Square.Square[][]{
		makeGrid(width, height,squareSize,gap)
		return grid;
	}

	export function onframe(){
		for(let i = 0; i < grid.length; i++){
			for(let j = 0; j < grid[i].length; j++){
				grid[i][j].onframe((UI.UIObjects.get('eraseButton') as UI.Button)!.pressed);
			}
		}
	}
	export function makeGrid(width: number, height: number, squareSize: number, gap: number){
		let i: number = 0;
		let j: number = 0;

		grid = [];

		for(let x = 0; x < width; x = x + squareSize+gap){
			grid[i] = [];
			for(let y = 0; y < height; y = y + squareSize+gap){
				grid[i][j] = new Square.Square(squareSize, new ValuePair(x,y),new ValuePair(i,j));
				j++;
			}
			j = 0;
			i++;
		}
	}
	export function isInGrid(pos: ValuePair){
		return pos.x < grid.length-1 && pos.x > 0 && pos.y < grid[0].length-1 && pos.y > 0;
	}
	export function unsetGoals(){
		for(let i = 0; i < grid.length; i++){
			for(let j = 0; j < grid[i].length; j++){
				grid[i][j].unsetGoal();
			}
		}
		console.log("unsetting goals")
	}
	export function unsetStarts(){
		for(let i = 0; i < grid.length; i++){
			for(let j = 0; j < grid[i].length; j++){
				grid[i][j].unsetStart();
			}
		}
		console.log("unsetting starts")
	}
}

export default Grid;