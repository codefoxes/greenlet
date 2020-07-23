import { MediaStore } from './MediaStore'
import { StylesStore } from '../../global/StylesStore'

function BreakPoint ( { left } ) {
	const [ context, setContext ] = React.useState( { show: false, x: 0, y: 0 } )

	const showContextMenu = ( e ) => {
		e.preventDefault()
		setContext( { show: true, x: e.clientX, y: e.clientY } )
	}

	const hideContextMenu = () => setContext( { show: false } )

	const getBreakpointQueries = ( point ) => {
		const { styles } = StylesStore.get()
		const queries = []
		let queriesString = ''
		for ( const media in styles ) {
			if ( ! styles.hasOwnProperty( media ) ) { continue }
			if ( media.includes( point ) ) {
				queries.push( media )
				queriesString += `\n${ media }`
			}
		}
		return { queries, queriesString }
	}

	const showConfirm = () => {
		let confirmed = true
		const { queries, queriesString } = getBreakpointQueries( left )
		if ( queriesString !== '' ) {
			confirmed = window.confirm( `This will also remove all styles for following media queries:\n${ queriesString }\n\nAre you sure you want to remove?` )
		}
		if ( confirmed ) {
			MediaStore.removeBreakpoint( left )
			StylesStore.removeMediaStyles( queries )
		}
		hideContextMenu()
	}

	return (
		<>
			{ context.show && (
				<div className="cwm-breakpoint-context">
					<div className="cwm-context-bg" onClick={ hideContextMenu } />
					<div className="cwm-context-menu" style={ { left: context.x + 2, top: context.y } }>
						<div className="cwm-context-item" onClick={ showConfirm }>Remove Breakpoint</div>
					</div>
				</div>
			) }
			<div className="cwm-breakpoint" style={ { left: `${ left }px` } } onContextMenu={ showContextMenu } />
		</>
	)
}

export default BreakPoint
