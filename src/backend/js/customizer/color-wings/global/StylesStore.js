import { Store, useStore } from '../../../common/Store'
import CssParser from '../../../common/lib/CssParser'

const initialState = {
	styles: {
		all: {}
	},
	output: ''
}

class StylesClass extends Store {
	addInitialStyle( styles ) {
		this.overrideInitialState( { ...initialState, output: styles } )
	}

	generateOutput( styles ) {
		let styleString = ''
		for ( const media in styles ) {
			if ( ! styles.hasOwnProperty( media ) ) { continue }

			// Handle if not 'all'

			for ( const selector in styles[ media ] ) {
				if ( ! styles[ media ].hasOwnProperty( selector ) ) { continue }

				styleString += selector + '{'
				for ( const property in styles[ media ][ selector ] ) {
					if ( ! styles[ media ][ selector ].hasOwnProperty( property ) ) { continue }

					styleString += `${ property }:${ styles[ media ][ selector ][ property ] };`
				}
				styleString += '}'
			}
		}
		return styleString
	}

	addStyle( selector, property, value, media = 'all' ) {
		this.set( ( state ) => {
			const { styles } = state
			if ( ! styles.hasOwnProperty( media ) ) {
				styles[ media ] = {}
			}
			if ( ! styles[ media ].hasOwnProperty( selector ) ) {
				styles[ media ][ selector ] = {}
			}
			styles[ media ][ selector ][ property ] = value

			const output = this.generateOutput( styles )
			return { styles, output }
		} )

		// console.log( this.get() )
	}

	addFromString( cssString ) {
		const getStylesFromRules = ( rules, media = 'all' ) => {
			const styles = {}
			styles[ media ] = {}
			rules.forEach( ( rule ) => {
				if ( rule.type === 'rule' ) {
					const declarations = {}
					rule.declarations.forEach( ( declaration ) => {
						declarations[ declaration.property ] = declaration.value
					} )
					styles[ media ][ rule.selectors.join(', ') ] = declarations
				} else if ( rule.type === 'media' ) {
					styles[ rule.media ] = getStylesFromRules( rule.rules, rule.media )[ rule.media ]
				}
			} )
			return styles
		}

		try {
			const parsed = CssParser( cssString )
			const styles = getStylesFromRules( parsed.stylesheet.rules )

			this.set( () => ( { styles, output: cssString } ) )
		}
		catch( error ) {
			console.log( error )
			// If error show notice
		}
	}
}

const StylesStore = new StylesClass( initialState )

export { StylesStore, useStore }
