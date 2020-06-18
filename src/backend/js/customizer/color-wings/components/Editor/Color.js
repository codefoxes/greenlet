import { $, waitUntil } from '../../../../common/Helpers'

function Color( props ) {
	const componentToHex = ( c ) => {
		const hex = c.toString( 16 )
		return hex.length === 1 ? `0${hex}` : hex
	}

	function rgbToHex( rgb ) {
		if ( rgb.indexOf( 'rgb(' ) !== -1 ) {
			const [ r, g, b ] = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',')
			return '#' + componentToHex( parseInt( r, 10 ) ) + componentToHex( parseInt( g, 10 ) ) + componentToHex( parseInt( b, 10 ) )
		}
		return rgb.replace(/ /g, '')
	}

	const defaultColor = rgbToHex( props.val )
	const irisOptions = {
		change: function( event, ui ) {
			const newColor = ui.color.toString()
			if ( newColor !== defaultColor ) {
				props.onChange( newColor )
			}
		},
		clear: function() {
			props.onChange( '' )
		}
	}

	const irisRef = React.createRef()
	const refIsNotNull = () => ( irisRef.current !== null )
	const initIris = () => { $( irisRef.current ).wpColorPicker( irisOptions ); $( irisRef.current ).iris( 'color', defaultColor ) }

	const [ resolved ] = waitUntil( refIsNotNull )
	resolved( initIris )

	return (
		<div className="cw-control-content color-picker">
			{ props.label && <span className="cw-control-title">{ props.label }</span> }
			<input type="text" ref={ irisRef } data-alpha="true" defaultValue={ defaultColor } />
		</div>
	)
}

export default Color
