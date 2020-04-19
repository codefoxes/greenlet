import { Store, useStore } from '../../../../common/Store'

const initialState = {
	currentSelector: '',
	openSection: false,
	currentStyles: {}
}

class EditorClass extends Store {
	toggleSection( section ) {
		this.set( ( state ) => {
			return ( state.openSection === section ) ? { openSection: false } : { openSection: section }
		} )
	}
}

const EditorStore = new EditorClass( initialState )

export { EditorStore, useStore }
