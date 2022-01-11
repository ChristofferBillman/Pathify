import Square from './Square'
import Input from './Input'
import UI from './UI'
import Debug from './Debug'
//import ValuePair from './ValuePair'
//import StupidPathfinder from './StupidPathfinder';
import Grid from './Grid';
//import Data from './Data';
//import Astar from './Astar';
/*
 * TODO: * Write TSDoc.
 */

namespace Main {
	let ctx: CanvasRenderingContext2D;
	let canvas: HTMLCanvasElement;

	let grid: Square.Square[][];

	let width!: number;
	let height!: number;

	window.onresize = onResize;

	/**
	 * Inits the canvas.
	 */
	export function init(){
		canvas = document.getElementsByTagName('canvas')[0]

		if (!canvas.getContext) {
			console.log('Canvas is not supported.')
		}

		ctx = canvas.getContext('2d')!;

		setCanvasSize();

		let UIObjects: Map<String, UI.UIObject> = UI.init(ctx)
		Square.init(ctx,UIObjects);
		grid = Grid.init(width,height);
		Input.init(canvas,grid);

		loop()
	}
	/**
	 * The game loop.
	 */
	function loop(){
		draw();
		Grid.onframe();
		UI.onframe();
		Debug.calculatePerformance();
		Debug.draw(width, grid.length * grid[0].length,ctx);
		window.requestAnimationFrame(loop);
	}
	/*
	function fillGraph(): Data.Graph<ValuePair>{
		let graph: Data.Graph<ValuePair> = new Data.Graph<ValuePair>();

		for(let i = 0; i < grid.length; i++){
			for(let j = 0; j < grid[i].length; j++){
				graph.AddVertex(new ValuePair(i,j))
			}
		}
		for(let i = 0; i < grid.length; i++){
			for(let j = 0; j < grid[i].length; j++){

				let currentNode = graph.Get(new ValuePair(i,j));

				for(let k = 0; k < 2; k++){
					for(let l = 0; l < 2; l++){
						if(k === 0 && l === 0) continue;
						if(Grid.isInGrid(new ValuePair(i+k,j+l))) continue;
						
						let neighbor = graph.Get(new ValuePair(i + k, j + l));
						graph.InsertEdge(currentNode, neighbor);
					}
				}
			}
		}

		return graph;
	}
	*/
	/**
	 * Draws on the canvas. Only to be used inside loop().
	 */
	function draw(){
		ctx.fillStyle = '#f7f7f7';
		ctx.fillRect(0,0,width,height);
		ctx.fillStyle = '#ffffff';
	}
	/**
	 * Recalcalates the size of the canvas and the amount of squares in it.
	 */
	function onResize(){
		setCanvasSize();
		grid = Grid.init(width,height);
	}
	/**
	 * Sets the size of the canvas.
	 */
	function setCanvasSize(){
		ctx.canvas.width  = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
		width = ctx.canvas.width;
		height = ctx.canvas.height;
	}
}
export default Main;

