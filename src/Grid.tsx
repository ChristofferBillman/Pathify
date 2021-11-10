import { motion } from "framer-motion"
import Square from './Sqaure'

let squares: JSX.Element[] = [];

/*enum SQUARE_TYPES {
	Normal,
	Active
}*/

for (let i = 0; i < 2000; i++) {
	squares.push(<Square squareId={i.toString()} />);
}

function Grid(props: any) {

	return (
		<motion.div className="grid"
			drag
			dragConstraints={{
				top: -10,
				left: -10,
				right: 10,
				bottom: 10
			}}>
			{squares}
		</motion.div>
	);
}
export default Grid;