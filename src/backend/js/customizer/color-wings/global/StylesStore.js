import { Store, useStore } from '../../../common/Store'
import CssParser from '../../../common/lib/CssParser'
import { debounce } from '../../../common/Helpers'
import { MainStore } from './MainStore'

const initialState = {
	styles: {
		all: {}
	},
	allOutputs: {}
}

class StylesClass extends Store {
	addInitialStyle( styles, settings ) {
		let allOutputs = {}
		for ( const page in settings ) {
			if ( ! settings.hasOwnProperty( page ) ) { continue }
			allOutputs[ page ] = settings[ page ].styles
		}
		this.overrideInitialState( { styles: this.parseStyles( styles ), allOutputs } )
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

	registerSpecialSubscriber( fn, name = 'tempStyler' ) {
		if ( name === 'tempStyler' ) {
			this.tempStyler = fn
		} else if ( name === 'fontManager' ) {
			this.addFont = fn
		}
		this.debouncedSetStyles = debounce( this.setStyles, 500 )
	}

	addStyle( selector, property, value, media = 'all' ) {
		this.tempStyler( `${selector} { ${property}: ${value}; }` )
		this.debouncedSetStyles( selector, property, value, media )
	}

	addStyleNow( selector, property, value, media = 'all' ) {
		// Add style without debounce.
		this.tempStyler( `${selector} { ${property}: ${value}; }` )
		this.setStyles( selector, property, value, media )
	}

	setStyles( selector, property, value, media = 'all' ) {
		this.set( ( state ) => {
			const { styles } = state
			if ( ! styles.hasOwnProperty( media ) ) {
				styles[ media ] = {}
			}
			if ( ! styles[ media ].hasOwnProperty( selector ) ) {
				styles[ media ][ selector ] = {}
			}
			styles[ media ][ selector ][ property ] = value

			const { currentPage } = MainStore.get()
			state.allOutputs[ currentPage ] = this.generateOutput( styles )
			return { styles, allOutputs: state.allOutputs }
		} )

		// console.log( this.get() )
	}

	parseStyles( cssString ) {
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
			return getStylesFromRules( parsed.stylesheet.rules )
		}
		catch( error ) {
			console.log( error )
			// If error show notice
			return false
		}
	}

	addFromString( cssString ) {
		const styles = this.parseStyles( cssString )
		if ( ! styles ) return false

		this.set( ( state ) => {
			const { currentPage } = MainStore.get()
			state.allOutputs[ currentPage ] = cssString
			return { styles, allOutputs: state.allOutputs }
		} )
	}
}

const StylesStore = new StylesClass( initialState )

export { StylesStore, useStore }
