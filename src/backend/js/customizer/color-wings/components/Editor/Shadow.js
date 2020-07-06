import Color from './Color'
import LengthTab from './length/LengthTab'

function Shadow( props ) {
	let initState = [ '0px', '0px', '0px', '0px', '#000000' ]
	if ( props.val !== 'none' ) {
		if ( isNaN( props.val.charAt(0) ) ) {
			const temp = props.val.split( / (?![^\(]*\))/ )
			initState = [ temp[ 1 ], temp[ 2 ], temp[ 3 ], temp[ 4 ], temp[ 0 ] ]
		} else {
			initState = props.val.split( ' ' )
		}
	}
	const [ values, changeValues ] = React.useState( initState )

	const onXChange = ( t, val ) => {
		changeValues( prev => { prev[ 0 ] = val; return prev } )
		props.onChange( values.join( ' ' ) )
	}

	const onYChange = ( t, val ) => {
		changeValues( prev => { prev[ 1 ] = val; return prev } )
		props.onChange( values.join( ' ' ) )
	}

	const onBlurChange = ( t, val ) => {
		changeValues( prev => { prev[ 2 ] = val; return prev } )
		props.onChange( values.join( ' ' ) )
	}

	const onSpreadChange = ( t, val ) => {
		changeValues( prev => { prev[ 3 ] = val; return prev } )
		props.onChange( values.join( ' ' ) )
	}

	const onColorChange = ( val ) => {
		changeValues( prev => { prev[ 4 ] = val; return prev } )
		props.onChange( values.join( ' ' ) )
	}

	return (
		<div className="cw-control-content border">
			{ props.label && <span className="cw-control-title">{ props.label }</span> }
			<span className="cw-control-title">X Offset</span>
			<LengthTab val={ values[ 0 ] } tab={ 0 } hidden={ false } handleChange={ onXChange } />
			<span className="cw-control-title">Y Offset</span>
			<LengthTab val={ values[ 1 ] } tab={ 0 } hidden={ false } handleChange={ onYChange } />
			<span className="cw-control-title">Blur Radius</span>
			<LengthTab val={ values[ 2 ] } tab={ 0 } hidden={ false } handleChange={ onBlurChange } />
			<span className="cw-control-title">Spread Radius</span>
			<LengthTab val={ values[ 3 ] } tab={ 0 } hidden={ false } handleChange={ onSpreadChange } />
			<Color val={ values[ 4 ] } onChange={ onColorChange } label="Color" />
		</div>
	)
}

export default Shadow
