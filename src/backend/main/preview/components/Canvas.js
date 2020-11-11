import styles from './Canvas.scss'

function Canvas ( { pos } ) {
	const { __ } = wp.i18n
	const [ isZoneShown, setZoneShown ] = React.useState( false )
	const [ dropZones, setDropZones ] = React.useState( [] )

	const showDropZone = () => {
		const coverCols = document.querySelectorAll( `section.${ pos }-section .${ pos }-column, ${ pos }.${ pos }-section .${ pos }-column` )
		if ( coverCols.length > 0 ) {
			const zones = [ ...coverCols ].map( ( col ) => {
				const { top, left, width, height } = col.getBoundingClientRect()
				return {
					loc: col.dataset.loc,
					style: { top, left, width, height },
					dragOver: false
				}
			} )
			setDropZones( zones )
		} else {
			// Todo: Show no drop zones
		}

		setZoneShown( true )
	}

	const hideDropZone = () => setZoneShown( false )

	const div = document.createElement( 'div' )
	div.classList.add( 'scroll-disabled' )
	div.innerText = __( 'Infinite scrolling is temporarily disabled to edit footer.', 'greenlet' )

	const toggleInfiniteScroll = ( enable = true ) => {
		if ( 'Greenlet' in window ) {
			Greenlet.toggleScroll( enable )
		}
		const button = document.querySelector( '.pagination.infinite a' )
		if ( null === button ) return
		if ( ! enable ) {
			button.style.display = 'none'
			button.parentNode.appendChild( div )
		} else {
			button.parentNode.removeChild( div )
			button.style.display = 'inline'
		}
	}

	React.useEffect( () => {
		const initialPosition = [ document.documentElement.scrollLeft, document.documentElement.scrollTop ]
		toggleInfiniteScroll( false )
		window.scrollTo( 0, ( 'header' === pos ) ? 0 : 1000000 )

		wp.customize.preview.bind( 'start-drag-item', showDropZone )
		wp.customize.preview.bind( 'end-drag-item', hideDropZone )

		let isDirty = false
		const setDirty = () => isDirty = true
		setTimeout( () => window.addEventListener( 'scroll', setDirty ), 1000 )

		return () => {
			if ( ! isDirty ) window.scrollTo( initialPosition[ 0 ], initialPosition[ 1 ] )
			toggleInfiniteScroll()
			wp.customize.preview.unbind( 'start-drag-item', showDropZone )
			wp.customize.preview.unbind( 'end-drag-item', hideDropZone )
			window.removeEventListener( 'scroll', setDirty )
		}
	}, [] )

	const onDragOver = ( e, loc ) => {
		e.preventDefault()
		setDropZones( prev => prev.map( zone => { zone.dragOver = ( zone.loc === loc ); return zone } ) )
	}

	const onDrop = ( e, loc ) => {
		e.preventDefault()
		wp.customize.preview.send( 'dropped-over', [ pos, loc.split( '-' ) ] )
	}

	return (
		<div id="glp-canvas" >
			{ isZoneShown && (
				<div className="cover-drop-zone-wrap" style={ { position: 'fixed', top: '0', left: '0' } }>
					{ dropZones.map( ( zone ) => (
						<div
							key={ zone.loc }
							style={ zone.style }
							className={ `cover-drop-zone ${ zone.dragOver ? 'drag-over' : '' }` }
							onDragOver={ ( e ) => onDragOver( e, zone.loc ) }
							onDragLeave={ ( e ) => onDragOver( e, false ) }
							onDrop={ ( e ) => { onDrop( e, zone.loc ) } } />
					) ) }
				</div>
			) }
			<style type="text/css">{ styles }</style>
		</div>
	)
}

export default Canvas
