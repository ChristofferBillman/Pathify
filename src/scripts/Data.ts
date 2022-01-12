namespace Data{

	export class List<Type> implements ListInterface<Type>{

		private arr: Type[] = [];

		IsEmpty(){
			return this.arr.length === 0;
		}
		Prepend(el: Type, index: number): void{
			this.arr.splice(index, 0, el);
		}
		Append(el: Type, index: number): void{
			this.arr.splice(index+1, 0, el);
		}
		AppendLast(el: Type): void{
			this.arr.push(el);
		}
		GetLast(): Type{
			return this.arr[this.arr.length-1];
		}
		Get(index: number): Type{
			return this.arr[index];
		}
        GetWithInstance(inst: Type){
            let i = 0;
            try{
                while(this.arr[i] !== inst){
                    i++;
                }
            }
            catch(e: unknown){
				throw new RangeError('The given node does not exist in this graph.');
            }
            return this.arr[i]
        }
		RemoveWithInstance(inst: Type){
			let i = 0;
            try{
                while(this.arr[i] !== inst){
                    i++;
                }
            }
            catch(e: unknown){
				throw new RangeError('The given node does not exist in this graph.');
            }
            this.arr.splice(i,1);
		}
		Remove(index: number): void{
			this.arr.splice(index,1);
		}
	}
	interface ListInterface<Type>{
		IsEmpty(): boolean;
		Prepend(el: Type, index: number): void;
		Append(el: Type, index: number): void;
		GetLast(): Type;
		Get(index: number): Type;
	}
	
	// Graph is implemeted as list.
	export class Graph<Type> {

        nodeList: List<Vertex<Type>>;

		constructor(){
			this.nodeList = new List<Vertex<Type>>();
		}
        InsertEdge(n1: Vertex<Type>, n2: Vertex<Type>){
			//n2.connections.AppendLast(n1);
			n1.connections.AppendLast(n2);
		}
		RemoveEdge(n1: Vertex<Type>,n2: Vertex<Type>){
			// The conditions in the loops here might not be correct.
			let i = 0;
			while(n1.connections.Get(i).toString() !== n2.toString()){
				i++;
			}
			n1.connections.Remove(i);

			i = 0;
			while(n2.connections.Get(i).toString() !== n1.toString()){
				i++;
			}
			n2.connections.Remove(i);
		}
        AddVertex(content: Type){
            this.nodeList.AppendLast(new Vertex<Type>(content));
        }
        RemoveVertex(n: Vertex<Type>){
            this.nodeList.RemoveWithInstance(n);
        }
		Get(identifier: number): Vertex<Type>{
			return this.nodeList.Get(identifier);
		}
	}
	export class Vertex<Type>{
		
		public contains: Type;
		public connections: List<Vertex<Type>> = new List<Vertex<Type>>();

        constructor(content: Type){
            this.contains = content;
        }

        ReplaceContent(content: Type){
            this.contains = content;
        }
	}
}
export default Data;