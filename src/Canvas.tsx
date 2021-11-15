import Main from './scripts/Main'
import React, { useEffect } from 'react';

function Canvas(props: any) {

	useEffect(() => {
		Main.init();
	})

	return (
		<canvas>
		</canvas>
	);
}

export default Canvas