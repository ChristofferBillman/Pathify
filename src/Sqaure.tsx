import React, { useState } from 'react'

function Square(props: any) {

	var [active] = useState(props.squareId)

	return (
		<div className="square" id={props.squareId} onClick={handleClick}></div>
	);

	function handleClick() {
		var square: any = document.getElementById(active.toString())
		square!.classList.toggle("active")
	}
}

export default Square;