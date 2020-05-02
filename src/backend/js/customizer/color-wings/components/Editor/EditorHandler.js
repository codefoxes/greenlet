import { MainStore } from '../../global/MainStore'

const { Evt } = window.cw

Evt.on( 'focusLocked', ( data ) => {
	const { currentSelector, currentTarget } = data
	const currentStyles = window.getComputedStyle( currentTarget )
	// Todo: Only store the styles used by the editor.
	MainStore.set( () => ( { currentSelector, currentStyles } ) )
} )

Evt.on( 'focusUnlocked', () => {
	MainStore.set( () => ( { currentSelector: '' } ) )
} )
