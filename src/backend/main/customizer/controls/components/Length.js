import LengthTab from './LengthTab'
import LengthIcon from './LengthIcon'

class Length extends React.Component {
	showShortHand = ( ['radius', 'padding', 'margin'].includes( this.props.control.params.subType ) )

	constructor( props ) {
		super( props )
		const size = this.props.control.setting._value
		const splits = size.split(' ')

		let values = [ size, size, size, size, size ]
		if ( splits.length === 4 ) {
			values = [ '0px', splits[ 0 ], splits[ 1 ], splits[ 2 ], splits[ 3 ] ]
		}

		this.state = {
			tab: 0,
			values,
			currentVal: this.props.control.setting._value
		}
	}

	onTab = ( e, i ) => {
		e.currentTarget.parentNode.childNodes.forEach( tab => tab.classList.remove( 'active' ) )
		e.currentTarget.classList.add( 'active' )
		this.setState({
			tab: i
		})
	}

	handleChange = ( tab, val ) => {
		const { values } = this.state
		values[ tab ] = val

		let currentVal = val
		if ( tab !== 0 && tab !== undefined ) {
			currentVal = `${values[1]} ${values[2]} ${values[3]} ${values[4]}`
		}
		this.setState({ currentVal })
		this.setState({ values })

		this.props.control.setting.set( currentVal )
	}

	render() {
		this.onTab = this.onTab.bind(this)

		const tabs = this.showShortHand && (
			<div className="tabs">
				{ [0, 1, 2, 3, 4].map( ( i ) => {
					return (
						<div key={i}
							className={ `tab tab-${i} ${ ( i === 0 ) ? 'active' : '' }` }
							onClick={ ( e ) => this.onTab( e, i ) } >
							<LengthIcon tab={ i } subType={ this.props.control.params.subType } />
						</div>
					)
				} ) }
			</div>
		)

		let tabContent
		if ( this.showShortHand ) {
			tabContent = [0, 1, 2, 3, 4].map( ( i ) =>
				<LengthTab key={ i } control={ this.props.control } tab={ i } hidden={ i !== this.state.tab } handleChange={ this.handleChange } />
			)
		} else {
			tabContent = <LengthTab control={ this.props.control } handleChange={ this.handleChange } />
		}

		const output = this.showShortHand && ( <div className="output">Output: { this.state.currentVal }</div> )

		return (
			<div className="gl-length">
				{ this.props.control.params.label && <span className="customize-control-title">{ this.props.control.params.label }</span> }
				{ this.props.control.params.description && <span className="description customize-control-description">{ this.props.control.params.description }</span> }
				{ tabs }
				{ tabContent }
				{ output }
			</div>
		)
	}
}

export default Length