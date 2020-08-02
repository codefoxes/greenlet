import { $, waitUntil } from '../../../../common/Helpers'

function handlePickerPosition( irisRefNode ) {
	const cp = irisRefNode.parentNode.parentNode.parentNode
	if ( ! cp.classList.contains( 'fixed' ) ) {
		const left = cp.getBoundingClientRect().left
		const holder = cp.querySelector( '.wp-picker-holder' )
		holder.style.left = `-${ left - 12 }px`
		holder.style.position = 'absolute'
		cp.classList.add( 'fixed' )
		// If color picker is under transition.
		setTimeout( () => { holder.style.left = `-${ cp.getBoundingClientRect().left - 12 }px` }, 1000 )
	}
}

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
		if ( rgb.indexOf( 'rgba(' ) !== -1 ) {
			const [ r, g, b, a ] = rgb.substring(5, rgb.length-1).replace(/ /g, '').split(',')
			if ( a === '0' ) {
				return '#' + componentToHex( parseInt( r, 10 ) ) + componentToHex( parseInt( g, 10 ) ) + componentToHex( parseInt( b, 10 ) )
			}
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
	const initIris = () => { $( irisRef.current ).wpColorPicker( irisOptions ); $( irisRef.current ).iris( 'color', defaultColor ); handlePickerPosition( irisRef.current ) }

	const [ resolved ] = waitUntil( refIsNotNull )
	resolved( initIris )

	return (
		<div className="cw-control-content cw-color">
			{ props.label && <span className="cw-control-title">{ props.label }</span> }
			<input type="text" ref={ irisRef } data-alpha="true" defaultValue={ defaultColor } />
		</div>
	)
}

export default Color
