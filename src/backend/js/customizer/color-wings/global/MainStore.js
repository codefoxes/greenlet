import { Store, useStore } from './../../../common/Store'

const initialState = {
	currentPage: 'global',
	currentPageType: 'global',
	currentSelector: '',
	currentPseudo: '',
	openSection: false,
	currentStyles: {},
	previewObject: {},
	allFonts: {},
	quickSelectors: [],
	selectorClass: ''
}

class MainStoreClass extends Store {
	toggleSection( section ) {
		this.set( ( state ) => {
			return ( state.openSection === section ) ? { openSection: false } : { openSection: section }
		} )
	}

	addInitialSettings( settings ) {
		if ( ! settings ) {
			return
		}

		const allFonts = {}
		for ( const page in settings ) {
			if ( ! settings.hasOwnProperty( page ) ) { continue }
			if ( 'fonts' in settings[ page ] ) {
				allFonts[ page ] = settings[ page ].fonts
			}
		}
		this.set( () => ( { allFonts } ) )
	}

	changePage( currentPage, currentPageType ) {
		this.set( () => ( { currentPage, currentPageType } ) )
	}

	addPreviewObject( previewObject ) {
		this.set( () => ( { previewObject } ) )
	}

	addFont( font ) {
		this.set( ( { currentPage, allFonts } ) => {
			if ( ! ( currentPage in allFonts ) ) {
				allFonts[ currentPage ] = {}
			}

			const source = font.source
			const family = font.family
			const style  = ( 'normal' === font.style ) ? '' : 'i'
			const weight = `${font.weight}${style}`
			if ( source in allFonts[ currentPage ] ) {
				if ( family in allFonts[ currentPage ][ source ] ) {
					if ( ! allFonts[ currentPage ][ source ][ family ].includes( weight ) ) {
						allFonts[ currentPage ][ source ][ family ].push( weight )
					}
				} else {
					allFonts[ currentPage ][ source ][ family ] = [ weight ]
				}
			} else {
				allFonts[ currentPage ][ source ] = { [family]: [ weight ] }
			}

			return { allFonts }
		} )
	}

	setQuickSelectors( quickSelectors ) {
		this.set( () => ( { quickSelectors } ) )
	}

	togglePseudo( currentPseudo = '' ) {
		this.set( () => ( { currentPseudo } ) )
	}

	setSelectorClass ( selectorClass = '' ) {
		this.set( () => ( { selectorClass } ) )
	}
}

const MainStore = new MainStoreClass( initialState )

export { MainStore, useStore }
