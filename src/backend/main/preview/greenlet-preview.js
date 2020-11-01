/**
 * Greenlet Customizer Preview.
 *
 * @package greenlet
 */

import { toggleToTop, dScrollTo } from './actions'
import Canvas from './components/Canvas'

function isCustomizer() {
	return !!( typeof wp !== 'undefined' && wp.hasOwnProperty( 'customize' ) )
}

if ( isCustomizer() ) {
	wp.customize.bind( 'preview-ready', () => {
		const canvas = document.createElement( 'div' )
		canvas.id = 'greenlet-preview';
		document.body.appendChild( canvas )

		wp.customize.preview.bind( 'start-customize', ( pos ) => {
			setTimeout( () => ReactDOM.render( <Canvas pos={ pos } />, canvas ), 100 )
		} )

		wp.customize.preview.bind( 'stop-customize', () => {
			ReactDOM.unmountComponentAtNode( canvas )
		} )

		wp.customize( 'to_top', setting => setting.bind( toggleToTop ) )

		wp.customize( 'to_top_at', setting => setting.bind( dScrollTo ) )
	} )
}
