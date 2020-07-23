import Canvas from './Canvas'
import { resetResizer } from './MediaHandler'

let cwmNode, cwmState, cwmDevice
function toggleMediaEditor( op = 'disable' ) {
	cwmNode = document.getElementById( 'color-wings-media' )
	if ( null === cwmNode ) {
		cwmNode = document.createElement( 'div' )
		cwmNode.id = 'color-wings-media'
		const preview = document.getElementById( 'customize-preview' )
		preview.appendChild( cwmNode )
		// preview.parentNode.insertBefore(cwmNode, preview.nextSibling);
		ReactDOM.render( <Canvas />, cwmNode )
	}

	if ( op === 'enable' ) {
		cwmState = 'open'
		if ( 'desktop' !== cwmDevice ) {
			document.documentElement.classList.add( 'cwm-enabled' )
		}
	} else {
		cwmState = 'close'
		document.documentElement.classList.remove( 'cwm-enabled' )
	}
}

function changeDevice( newDevice ) {
	cwmDevice = newDevice
	if ( 'desktop' !== newDevice && 'open' === cwmState ) {
		document.documentElement.classList.add( 'cwm-enabled' )
		resetResizer()
	} else {
		document.documentElement.classList.remove( 'cwm-enabled' )
	}
}

export { toggleMediaEditor, changeDevice }
