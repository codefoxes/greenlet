function Resizer ( props ) {
	const ref = React.createRef()
	let pos = 0, left = 0

	const elementDrag = ( e ) => {
		e.preventDefault()
		const rawLeft = Math.floor( e.clientX - pos )
		if ( rawLeft < 1 ) return
		left = rawLeft

		if ( props.onResize ) {
			props.onResize( left )
		}
	}

	const end = () => {
		document.removeEventListener( 'mousemove', elementDrag )
		document.removeEventListener( 'mouseup', end )
		document.removeEventListener( 'touchcancel', end )
		document.removeEventListener( 'touchend', end )

		if ( props.onEnd ) {
			props.onEnd( left )
		}

		document.body.classList.remove( 'cwm-resizing' )
	}

	function start ( e ) {
		e.preventDefault()
		document.body.classList.add( 'cwm-resizing' )
		pos = ref.current.parentNode.getBoundingClientRect().left
		document.addEventListener( 'mousemove', elementDrag )
		document.addEventListener( 'mouseup', end )
		document.addEventListener( 'touchcancel', end )
		document.addEventListener( 'touchend', end )
	}

	return (
		<div className="cwm-resizer" ref={ ref } onMouseDown={ start } onTouchStart={ start } onMouseUp={ end } onTouchCancel={ end } onTouchEnd={ end } >
			<div className="cwm-resizer-tip">
				<div className="cwm-indicator" />
				<div id="cwm-resizer-details" />
			</div>
		</div>
	)
}

export default Resizer
