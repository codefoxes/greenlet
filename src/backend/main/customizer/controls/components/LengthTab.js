class LengthTab extends React.Component {
	showShortHand = ( ['radius', 'padding', 'margin'].includes( this.props.control.params.subType ) )
	units = {
		'px': { step: 1, min: 0, max: 2000 },
		'pc': { step: 0.1, min: 0, max: 200 },
		'cm': { step: 0.1, min: 0, max: 200 },
		'mm': { step: 1, min: 0, max: 2000 },
		'rem': { step: 0.1, min: 0, max: 200 },
		'em': { step: 0.01, min: 0, max: 100 },
		'ex': { step: 0.1, min: 0, max: 200 },
		'ch': { step: 0.1, min: 0, max: 200 },
		'vh': { step: 0.1, min: 0, max: 200 },
		'vw': { step: 0.1, min: 0, max: 200 },
		'in': { step: 0.01, min: 0, max: 100 },
		'%': { step: 0.1, min: 0, max: 200 },
	}

	constructor( props ) {
		super( props )
		const [ main, unit ] = this.getLength()

		this.state = {
			main,
			unit,
			step: this.units[ unit ].step,
			min: this.units[ unit ].min,
			max: this.units[ unit ].max
		}
	}

	componentDidMount () {
		window.dispatchEvent( new CustomEvent( 'componentMounted', { detail: this.props.control.id } ) )
	}

	resetValue = this.props.control.setting._value

	getLength = ( value = false ) => {
		let size = ''
		if ( false !== value ) {
			size = value
		} else {
			size = this.props.control.setting._value
			const splits = size.split(' ')
			if ( splits.length === 4 ) {
				size = ( this.props.tab === 0 ) ? '0px' : splits[ this.props.tab - 1 ]
			}
		}
		const matches = size.match( /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/ )
		return [ ( null === matches ) ? '' : matches[ 1 ], ( null === matches ) ? 'px' : matches[ 2 ] ]
	}

	reset = () => {
		const [ main, unit ] = this.getLength()
		this.setState( { main, unit }, this.handleChange )
	}

	handleChange = () => {
		this.props.handleChange( this.props.tab, this.state.main + this.state.unit )
	}

	handleLengthChange = ( e ) => {
		e.persist()
		this.setState( {
			main: e.target.value
		}, this.handleChange )
	}

	handleUnitChange = ( e ) => {
		e.persist()
		const unit = e.target.value
		this.setState( {
			unit,
			step: this.units[ unit ].step,
			min: this.units[ unit ].min,
			max: this.units[ unit ].max
		}, this.handleChange )
	}

	render() {
		const { main } = this.state
		return (
			<div className={ "tab-content " + (this.showShortHand ? 'shorthand' : '') + ( this.props.hidden ? ' hidden' : '' ) }>
				<div className="gl-row">
					<div className="col-7 range-wrap">
						<input
							type="range"
							id={ `length-size-${ this.props.control.id }` + (this.showShortHand ? `-${ this.props.tab }` : '') }
							step={ this.state.step }
							min={ this.state.min }
							max={ this.state.max }
							value={ main }
							onChange={ this.handleLengthChange } />
					</div>
					<div className="col-3">
						<input
							type="number"
							id={ `length-size-ip-${ this.props.control.id }` + (this.showShortHand ? `-${ this.props.tab }` : '') }
							step={ this.state.step }
							min={ this.state.min }
							max={ this.state.max }
							value={ main }
							onChange={ this.handleLengthChange } />
					</div>
					<select
						id={ `length-unit-${ this.props.control.id }` + (this.showShortHand ? `-${ this.props.tab }` : '') }
						className="col-2 length-unit"
						onChange={ this.handleUnitChange }
						value={ this.state.unit } >
						{ Object.keys( this.units ).map( ( unit ) => {
							return <option key={ unit } value={ unit } >{ unit }</option>
						} ) }
					</select>
					<span className="reset dashicons dashicons-undo" onClick={ this.reset } />
				</div>
			</div>
		)
	}
}

export default LengthTab
