import { Store, useStore } from '../../services/Store'

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
	focused: false
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
}

const FocusStore = new FocusClass( initialState )

export { FocusStore, useStore }
