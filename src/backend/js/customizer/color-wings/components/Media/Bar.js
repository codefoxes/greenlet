import { MediaStore, useStore } from './MediaStore'
import BreakPoint from './BreakPoint'

function Bar () {
	const [ expanded, setExpanded ] = React.useState( false )
	const { queries, breakpoints, currentPreviewWidth, currentMedia } = useStore( MediaStore )
	const isNew = () => ( breakpoints.indexOf( currentPreviewWidth ) === -1 )

	const addBreakpoint = () => {
		MediaStore.addBreakpoint()
	}

	const colors  = [ 'rgba(229, 57, 53, .2)', 'rgb(142, 36, 170, .2)', 'rgb(57, 73, 171, .2)', 'rgb(3, 155, 229, .2)', 'rgb(0, 137, 123, .2)', 'rgb(124, 179, 66, .2)', 'rgb(253, 216, 53, .2)', 'rgb(251, 140, 0, .2)', 'rgb(109, 76, 65, .2)', 'rgb(84, 110, 122, .2)']
	const eColors = [ 'rgba(229, 57, 53, .8)', 'rgb(142, 36, 170, .8)', 'rgb(57, 73, 171, .8)', 'rgb(3, 155, 229, .8)', 'rgb(0, 137, 123, .8)', 'rgb(124, 179, 66, .8)', 'rgb(253, 216, 53, .8)', 'rgb(251, 140, 0, .8)', 'rgb(109, 76, 65, .8)', 'rgb(84, 110, 122, .8)']

	const toggleMediaBar = () => { setExpanded( prev => ! prev  ) }

	const toggleEnabled = ( e, key ) => {
		e.stopPropagation()
		MediaStore.toggleEnabled( key )
	}

	return (
		<div className={ `cwm-bar${ expanded ? ' expanded' : '' }` }>
			<div className="cwm-queries">
				{ Object.entries( queries ).map( ( [ key, query ], i ) => {
					let top = expanded ? `${( 25 * ( i % 10 ) )}px` : `${( 2 * ( i % 10 ) )}px`
					const active = ( currentMedia.key === key )
					if ( active && ! expanded ) {
						top = 0
					}
					return (
						<div
							key={ key }
							onClick={ () => MediaStore.activateQuery( key ) }
							className={ `cwm-query${ query.enabled ? ' enabled' : '' }${ active ? ' active' : '' }`}
							style={ { left: `${ query.min + 1 }px`, width: `${ query.max - query.min - 2 }px`, background: query.enabled ? eColors[ i % 9 ] : colors[ i % 9 ], top } }
						>
							<span className={ `cwm-query-enabler dashicons ${ query.enabled ? 'dashicons-visibility' : 'dashicons-hidden' }` } onClick={ ( e ) => toggleEnabled( e, key ) }/>
							<div className="cwm-query-details">
								{ query.min !== 0 ? `(min: ${ query.min }px)` : '' } { query.min !== 0 && query.max !== 5000 ? '&' : '' } { query.max !== 5000 ? `(max: ${ query.max }px)` : '' }
							</div>
						</div>
					)
				} ) }
			</div>
			<div className="cwm-breakpoints">
				{ breakpoints.map( ( breakpoint ) => (
					<BreakPoint key={ breakpoint } left={ breakpoint } />
				) ) }
			</div>
			{ isNew() && (
				<div className="cwm-breakpoint-adder" onClick={ addBreakpoint }>
					<span className="plus-sign">+</span>
					<span className="adder-text">Add Breakpoint</span>
				</div>
			) }
			<div className="cwm-bar-toggler" onClick={ toggleMediaBar } ><span className="dashicons dashicons-leftright" /></div>
		</div>
	)
}

export default Bar
