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
		GetWithIdentifier(identifier: Type): Type{
			for(let i = 0; i < this.arr.length; i++){
				if(JSON.stringify(this.arr[i]) === JSON.stringify(identifier)){
					return this.arr[i];
				}
			}
			throw new RangeError('The given identifier does not correspond to any nodes.')
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

        graph: List<Node<Type>>;

		constructor(){
			this.graph = new List<Node<Type>>();
		}
        InsertEdge(n1: Node<Type>, n2: Node<Type>){
			n2.connections.AppendLast(n1);
			n1.connections.AppendLast(n2);
		}
		RemoveEdge(n1: Node<Type>,n2: Node<Type>){
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
            this.graph.AppendLast(new Node<Type>(content));
        }
        RemoveVertex(n: Node<Type>){
            this.graph.RemoveWithInstance(n);
        }
		Get(identifier: Type): Node<Type>{
			return this.graph.GetWithIdentifier(new Node(identifier));
		}
	}
	export class Node<Type>{
		
		public contains: Type;
		public connections: List<Node<Type>> = new List<Node<Type>>();

        constructor(content: Type){
            this.contains = content;
        }

        ReplaceContent(content: Type){
            this.contains = content;
        }
	}
}
export default Data;