let currentItem = {}

function LayoutItems( { control, updateRows } ) {
	const { items } = control.params
	// const refs = items.map( () => React.createRef() )

	React.useEffect( () => {
		const itemDropped = ( [ pos, [ row, col ] ] ) => {
			if ( pos !== control.params.position ) {
				return
			}

			row = row - 1
			updateRows( ( prev ) => {
				if ( 'items' in prev[ row ] ) {
					if ( col in prev[ row ].items ) {
						prev[ row ].items[ col ].push( currentItem.id )
					} else {
						prev[ row ].items[ col ] = [ currentItem.id ]
					}
				} else {
					prev[ row ].items = { [ col ]: [ currentItem.id ] }
				}
				return prev
			} )
		}

		wp.customize.previewer.bind( 'dropped-over', itemDropped )
		return () => { wp.customize.previewer.unbind( 'dropped-over', itemDropped ) }
	}, [] )

	const dragStartOld = ( e, i ) => {
		const node = refs[ i ].current
		const clone = node.cloneNode( true )
		node.parentNode.appendChild( clone )
		const nodePosition = node.getBoundingClientRect()
		clone.style.position = 'fixed'
		clone.style.top = `${nodePosition.top}px`
		clone.style.left = `${nodePosition.left}px`
		clone.style.transform = 'translate3D(0, 0, 0)'

		const initX = e.clientX
		const initY = e.clientY

		const updateClone = ( evt ) => {
			clone.style.transform = `translate3D(${ evt.clientX - initX }px, ${ evt.clientY - initY }px, 0)`
		}

		const clearEvents = () => {
			document.removeEventListener( 'mousemove', updateClone )
			document.removeEventListener( 'mouseup', clearEvents )
		}
		document.addEventListener( 'mousemove', updateClone )
		document.addEventListener( 'mouseup', clearEvents )
	}

	const dragStart = ( id ) => {
		currentItem = { id, item: items[ id ] }
		wp.customize.previewer.send( 'start-drag-item' )
	}

	const dragEnd = () => wp.customize.previewer.send( 'end-drag-item' )

	return (
		<div className="layout-items">
			<div className="items-title">Drag and Drop to column</div>
			{ Object.entries( items ).map( ( [ id, item ] ) => (
				// <div key={ item.id } ref={ refs[ i ] } className="layout-item" onMouseDown={ ( e ) => dragStart( e, i ) }>{ item.name }</div>
				<div key={ id } className="layout-item" draggable onDragStart={ () => dragStart( id ) } onDragEnd={ dragEnd }>{ item.name }</div>
			) )  }
		</div>
	)
}

export default LayoutItems
