/**
 * Color Wings
 */

import './global/Setup'
import './global/StylesHandler'

import Canvas from './components/Canvas'

function isCustomizer() {
	return !!( typeof wp !== 'undefined' && wp.hasOwnProperty( 'customize' ) )
}

if ( isCustomizer() ) {
	wp.customize.bind( 'preview-ready', () => {
		// Send Example
		// wp.customize.preview.send( 'test-event', 'Reply' )

		const canvas = document.createElement( 'div' )
		canvas.id = 'color-wings';
		document.body.appendChild( canvas )

		// Todo: This might occur before preview-ready.
		cw.Evt.on( 'mount-colorwings', () => {
			// Todo: Without setTimeout browser hangs, not sure why.
			setTimeout( () => ReactDOM.render( <Canvas />, canvas ), 100 )
		})

		cw.Evt.on( 'unmount-colorwings', () => {
			ReactDOM.unmountComponentAtNode( canvas )
		})
	})
}
