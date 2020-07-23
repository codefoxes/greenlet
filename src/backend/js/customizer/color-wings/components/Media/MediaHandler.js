import { MediaStore } from './MediaStore'

let specialStyle, barStyle, resizerDetails

cw.Evt.on( 'cw-media-loaded', () => {
	specialStyle = document.createElement( 'style' ); specialStyle.id = 'cwm-special-styles'
	barStyle = document.createElement( 'style' ); barStyle.id = 'cwm-bar-styles'
	document.getElementById( 'color-wings-media' ).append( specialStyle, barStyle )
	resizerDetails = document.getElementById( 'cwm-resizer-details' )
} )

function resizePreview( left ) {
	specialStyle.innerHTML = `.cwm-resizer{left:${ left }px;}.cwm-enabled #customize-preview{width:${ left }px;}`
	resizerDetails.innerHTML = `${ left }px`
}

function endResizePreview( left ) {
	barStyle.innerHTML = `.cwm-bar .cwm-breakpoint-adder{left:${ left }px;}`
	MediaStore.updatePreviewWidth( left )
}

function resetResizer() {
	specialStyle.innerHTML = ''
	setTimeout( () => {
		const preview = document.getElementById( 'customize-preview' )
		resizerDetails.innerHTML = `${ preview.clientWidth }px`
		endResizePreview( preview.clientWidth )
	}, 500 )
}

export { resizePreview, endResizePreview, resetResizer }
