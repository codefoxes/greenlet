import { Store, useStore } from './../../../common/Store'

const initialState = {
	currentPage: 'global',
	currentPageType: 'global',
	currentSelector: '',
	openSection: false,
	currentStyles: {},
	previewObject: {}
}

class MainStoreClass extends Store {
	toggleSection( section ) {
		this.set( ( state ) => {
			return ( state.openSection === section ) ? { openSection: false } : { openSection: section }
		} )
	}

	changePage( currentPage, currentPageType ) {
		this.set( () => ( { currentPage, currentPageType } ) )
	}

	addPreviewObject( previewObject ) {
		this.set( () => ( { previewObject } ) )
	}
}

const MainStore = new MainStoreClass( initialState )

export { MainStore, useStore }
