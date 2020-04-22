class LengthTab extends React.Component {
	showShortHand = ( ['radius', 'padding', 'margin'].includes( this.props.subType ) )
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

	resetValue = []

	componentDidMount() {
		this.resetValue = this.getLength()
	}

	getLength = ( value = false ) => {
		let size = ''
		if ( false !== value ) {
			size = value
		} else {
			size = this.props.val
			if ( 'values' in this.props ) {
				size = this.props.values[ this.props.tab ]
			}
		}
		const matches = size.match( /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/ )
		return [ ( null === matches ) ? '' : matches[ 1 ], ( null === matches ) ? 'px' : matches[ 2 ] ]
	}

	reset = () => {
		const [ main, unit ] = this.resetValue
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
				<div className="cw-row">
					<div className="col-7 range-wrap">
						<input
							type="range"
							step={ this.state.step }
							min={ this.state.min }
							max={ this.state.max }
							value={ main }
							onChange={ this.handleLengthChange } />
					</div>
					<div className="col-3">
						<input
							type="number"
							step={ this.state.step }
							min={ this.state.min }
							max={ this.state.max }
							value={ main }
							onChange={ this.handleLengthChange } />
					</div>
					<select
						className="col-2 length-unit"
						onChange={ this.handleUnitChange }
						value={ this.state.unit } >
						{ Object.keys( this.units ).map( ( unit ) => {
							return <option key={ unit } value={ unit } >{ unit }</option>
						} ) }
					</select>
					<span className="reset" onClick={ this.reset }>
						<svg width="15px" height="14.7px" viewBox="0 0 50 49" version="1.1" xmlns="http://www.w3.org/2000/svg">
							<path d="M0,20 L14,0 C14,6 14,9 14,9 C40,-3 65,30 38,49 C58,27 36,7 18,17 C18,17 20,19 24,23 L0,20 Z" fill="#7CB342" />
						</svg>
					</span>
				</div>
			</div>
		)
	}
}

export default LengthTab
