import LengthTab from './LengthTab'
import LengthIcon from './LengthIcon'

class Length extends React.Component {
	showShortHand = ( ['radius', 'padding', 'margin'].includes( this.props.subType ) )

	constructor( props ) {
		super( props )
		const size = this.props.val
		const splits = size.split(' ')

		let values = [ size, size, size, size, size ]
		if ( splits.length === 4 ) {
			values = [ '0px', splits[ 0 ], splits[ 1 ], splits[ 2 ], splits[ 3 ] ]
		} else if ( splits.length === 3 ) {
			values = [ '0px', splits[ 0 ], splits[ 1 ], splits[ 2 ], splits[ 1 ] ]
		} else if ( splits.length === 2 ) {
			values = [ '0px', splits[ 0 ], splits[ 1 ], splits[ 0 ], splits[ 1 ] ]
		}
		this.values = values

		this.state = {
			tab: 0,
			values,
			currentVal: this.props.val
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

		this.props.onChange( currentVal )
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
							<LengthIcon tab={ i } subType={ this.props.subType } />
						</div>
					)
				} ) }
			</div>
		)

		let tabContent
		if ( this.showShortHand ) {
			tabContent = [0, 1, 2, 3, 4].map( ( i ) =>
				<LengthTab { ...this.props } values={ this.values } key={ i } tab={ i } hidden={ i !== this.state.tab } handleChange={ this.handleChange } />
			)
		} else {
			tabContent = <LengthTab { ...this.props } handleChange={ this.handleChange } />
		}

		const output = this.showShortHand && ( <div className="output">Output: { this.state.currentVal }</div> )

		return (
			<div className="cw-length">
				{ this.props.label && <span className="customize-control-title">{ this.props.label }</span> }
				{ this.props.description && <span className="description customize-control-description">{ this.props.description }</span> }
				{ tabs }
				{ tabContent }
				{ output }
			</div>
		)
	}
}

export default Length
