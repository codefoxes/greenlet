import LengthIcon from '../length/LengthIcon'
import Select from '../Select'
import Color from '../Color'
import LengthTab from '../length/LengthTab'

function Border( props ) {
	const initState = {
		tab: 0,
		values: [ [ '0px', 'none', '#000000' ], [ '0px', 'none', '#000000' ], [ '0px', 'none', '#000000' ], [ '0px', 'none','#000000' ], [ '0px', 'none', '#000000' ] ]
	}
	if ( 'borderTopWidth' in props.val ) {
		initState.values = [
			[ props.val.borderTopWidth, props.val.borderTopStyle, props.val.borderTopColor ],
			[ props.val.borderTopWidth, props.val.borderTopStyle, props.val.borderTopColor ],
			[ props.val.borderRightWidth, props.val.borderRightStyle, props.val.borderRightColor ],
			[ props.val.borderBottomWidth, props.val.borderBottomStyle, props.val.borderBottomColor ],
			[ props.val.borderLeftWidth, props.val.borderLeftStyle, props.val.borderLeftColor ]
		]
	}
	const [ state, changeState ] = React.useState( initState )

	const onTab = ( e, i ) => {
		e.currentTarget.parentNode.childNodes.forEach( tab => tab.classList.remove( 'active' ) )
		e.currentTarget.classList.add( 'active' )
		changeState( prev => ( { ...prev, tab: i } ) )
	}

	const tabs = (
		<div className="cw-tabs">
			{ [0, 1, 2, 3, 4].map( ( i ) => {
				return (
					<div key={i}
						 className={ `tab tab-${i} ${ ( i === 0 ) ? 'active' : '' }` }
						 onClick={ ( e ) => onTab( e, i ) } >
						<LengthIcon tab={ i } subType={ 'border' } />
					</div>
				)
			} ) }
		</div>
	)

	const { tab, values } = state
	const onWidthChange = ( t, val ) => {
		changeState( prev => { prev.values[ tab ][ 0 ] = val; return prev } )
		props.onChange( values, tab )
	}

	const onStyleChange = ( val ) => {
		changeState( prev => { prev.values[ tab ][ 1 ] = val; return prev } )
		props.onChange( values, tab )
	}

	const onColorChange = ( val ) => {
		changeState( prev => { prev.values[ tab ][ 2 ] = val; return prev } )
		props.onChange( values, tab )
	}

	const styleOptions = [
		{ name: 'x', value: 'none' },
		{ name: '', value: 'solid' },
		{ name: '', value: 'dotted' },
		{ name: '', value: 'dashed' }
	]

	const tabContent = (
		<div className="cw-tab-wrap">
			<LengthTab val={ values[ tab ][ 0 ] } tab={ 0 } hidden={ false } handleChange={ onWidthChange } />
			<Color val={ values[ tab ][ 2 ] } onChange={ onColorChange } label="Color" />
			<Select options={ styleOptions } val={ values[ tab ][ 1 ] } onChange={ onStyleChange } printOptions="always" horizontal="true" label="Style" />
		</div>
	)

	return (
		<div className="cw-control-content cw-border">
			{ props.label && <span className="cw-control-title">{ props.label }</span> }
			{ tabs }
			{ tabContent }
		</div>
	)
}

export default Border
