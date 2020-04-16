/**
 * Color Wings
 */

import Canvas from './components/Canvas'

function isCustomizer() {
	return !!( typeof wp !== 'undefined' && wp.hasOwnProperty( 'customize' ) )
}

if ( isCustomizer() ) {
	wp.customize.bind( 'preview-ready', () => {
		// Send Example
		// wp.customize.preview.send( 'test-event', 'Reply' )

		wp.customize.preview.bind( 'init-wings', ( data ) => {
			if (data === true) {
				const canvas = document.createElement( 'div' )
				canvas.id = 'color-wings';
				document.body.appendChild( canvas )
				ReactDOM.render(
					<Canvas />,
					canvas
				)
			}
		})
	})
} else {
	const canvas = document.createElement( 'div' )
	canvas.id = 'color-wings';
	document.body.appendChild( canvas )
	ReactDOM.render(
		<Canvas />,
		canvas
	)
}
