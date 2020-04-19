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

		cw.Evt.on( 'mount-colorwings', () => {
			ReactDOM.render( <Canvas />, canvas )
		})

		cw.Evt.on( 'unmount-colorwings', () => {
			ReactDOM.unmountComponentAtNode( canvas )
		})
	})
}
// else {
// 	const canvas = document.createElement( 'div' )
// 	canvas.id = 'color-wings';
// 	document.body.appendChild( canvas )
// 	ReactDOM.render(
// 		<Canvas />,
// 		canvas
// 	)
// }
