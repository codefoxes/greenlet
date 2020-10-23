/**
 * Greenlet Customizer Preview.
 *
 * @package greenlet
 */

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
	} )
}
