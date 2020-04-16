import { Store, useStore } from '../../services/Store'

const initialState = {
	currentSelector: '',
	openSection: false
}

class EditorClass extends Store {
	test( newState ) {
		super.set( () => ( newState ) )
	}

	toggleSection( section ) {
		this.set( ( state ) => {
			return ( state.openSection === section ) ? { openSection: false } : { openSection: section }
		} )
	}
}

const EditorStore = new EditorClass( initialState )

export { EditorStore, useStore }
