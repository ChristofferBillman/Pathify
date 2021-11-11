import Main from './scripts/Main'
import React, { useEffect } from 'react';

function Canvas(props: any) {

	useEffect(() => {
		/*eslint-disable */
		Main.init();
		/*eslint-enable */
	})

	return (
		<canvas>
		</canvas>
	);
}

export default Canvas