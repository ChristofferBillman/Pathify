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
		forEach((i:number,j:number) => {
			grid[j][i].onframe((UI.UIObjects.get('eraseButton') as UI.Button)!.pressed);
		})
	}
	// This function right here really needs to be sorted out.
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
		return pos.x < grid[0].length && pos.x >= 0 && pos.y < grid.length && pos.y >= 0;
	}
	export function unsetGoals(){
		forEach((i:number,j:number) => {
			grid[j][i].unsetGoal();
		})
	}
	export function unsetStarts(){
		forEach((i:number,j:number) => {
			grid[j][i].unsetStart();
		})
	}
	export function forEach(func: ((i:number, j:number) => void)){
		for(let j = 0; j < grid.length; j++){
			for(let i = 0; i < grid[j].length; i++){
				func(i,j);
			}
		}
	}
}

export default Grid;