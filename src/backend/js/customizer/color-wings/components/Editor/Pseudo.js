import { MainStore } from '../../global/MainStore'

/**
 * Pseudo Selector.
 *
 * @return {mixed}
 */
function Pseudo() {
	const togglePseudo = ( elem, op = '', cls = 'open' ) => {
		if ( 'add' === op ) {
			elem.classList.add( cls )
		} else {
			elem.classList.remove( cls )
		}
	}

	const [ pseudos, update ] = React.useState( ['hover', 'focus', 'active', 'visited'] )

	const handleChange = ( e ) => {
		const val = e.target.innerText
		if ( MainStore.get().currentPseudo === val ) {
			MainStore.togglePseudo( '' )
			togglePseudo( e.target.parentNode.parentNode, '', 'active' )
		} else {
			MainStore.togglePseudo( val )

			// Move to the beginning.
			if ( pseudos.indexOf( val ) > 0) {
				pseudos.splice( pseudos.indexOf( val), 1 ); pseudos.unshift( val )
				update( pseudos )
			}
			togglePseudo( e.target.parentNode.parentNode )
			togglePseudo( e.target.parentNode.parentNode, 'add', 'active' )
		}
		e.target.parentNode.childNodes.forEach( ( item ) => item.classList.remove( 'selected' ) )
	}

	const activeCls = MainStore.get().currentPseudo === '' ? '' : 'active'
	return (
		<div className={ `cw-pseudo ${ activeCls }` } onMouseEnter={ ( e ) => togglePseudo( e.currentTarget, 'add' ) } onMouseLeave={ ( e ) => togglePseudo( e.currentTarget ) }>
			<span className="cw-pseudo-icon dashicons dashicons-menu-alt2" />
			<div className="cw-pseudo-content">
				{ pseudos.map( ( ps, k ) => (
					<div key={ k } className="cw-pseudo-item" onClick={ handleChange }>{ ps }</div>
				) ) }
			</div>
		</div>
	)
}

export default Pseudo
