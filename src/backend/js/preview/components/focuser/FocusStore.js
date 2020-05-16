import { Store, useStore } from '../../../common/Store'

const initialState = {
	focusLines: {
		top: {},
		right: {},
		bottom: {},
		left: {}
	},
	focusDetails: {
		style: {},
		selector: ''
	},
	focused: false,
	focusOpacity: 1,
	detailsOpacity: 1
}

class FocusClass extends Store {
	moveFocus( newState ) {
		this.set( () => ( newState ) )
	}

	lockFocus() {
		this.set( () => ( { focused: true } ) )
	}

	unlockFocus() {
		this.set( () => ( initialState ) )
	}

	isFocused() {
		return this.get().focused
	}

	reduceFocusOpacity() {
		this.set( () => ( { focusOpacity: 0, detailsOpacity: 1 } ) )
	}

	increaseFocusOpacity() {
		this.set( () => ( { focusOpacity: 1, detailsOpacity: 1 } ) )
	}
}

const FocusStore = new FocusClass( initialState )

export { FocusStore, useStore }
