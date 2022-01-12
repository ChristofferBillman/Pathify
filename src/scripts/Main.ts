import Square from './Square'
import Input from './Input'
import UI from './UI'
import Debug from './Debug'
import ValuePair from './ValuePair'
import Grid from './Grid';
import Data from './Data';
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

		// Init graph
		let graph: Data.Graph<ValuePair> = fillGraph();
		console.log(graph);

		console.log(graph.Get(posToIndex(2,2)));
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
	
	// Run this function every time "run-button" is pressed. Don't continuiously update the graph,
	// update it when grid editing is finished.
	function fillGraph(): Data.Graph<ValuePair>{
		let graph: Data.Graph<ValuePair> = new Data.Graph<ValuePair>();

		// Create all vertices in graph based on our visual grid.
		Grid.forEach((i:number, j:number) => {
			graph.AddVertex(new ValuePair(i,j));
		})

		// Connect all adjacent vertices (diagonal allowed).
		Grid.forEach((i: number, j:number) => {
			let currentNode = graph.Get(posToIndex(i,j));
				
			// Get all 'surrounding' vertices.
			for(let dj = -1; dj < 2; dj++){
				for(let di = -1; di < 2; di++){
					// Self is not considered a neighbor.
					if(di === 0 && dj === 0) continue;
					// Makes sure that we don't add a neighbor that does not exist.
					if(!Grid.isInGrid(new ValuePair(i+di,j+dj))) continue;
					
					let neighbor = graph.Get(posToIndex(i + di, j + dj));
					graph.InsertEdge(currentNode, neighbor);
				}
			}
		})
		return graph;
	}
	/**
	 * Converts a grid position to the unique identifer for the vertex at that position.
	 * @param i 
	 * @param j 
	 * @returns 
	 */
	function posToIndex(i: number,j: number){
		return grid[0].length * j + i
	}
	
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

