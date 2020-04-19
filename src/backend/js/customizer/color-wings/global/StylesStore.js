import { Store, useStore } from '../../../common/Store'

const initialState = {
	styles: {
		all: {}
	},
	output: ''
}

class StylesClass extends Store {
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
}

const StylesStore = new StylesClass( initialState )

export { StylesStore, useStore }
