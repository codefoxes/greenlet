import { EditorStore } from './EditorStore'

const { Evt } = window.cw

Evt.on( 'focusLocked', ( data ) => {
	const { currentSelector, currentTarget } = data
	const currentStyles = window.getComputedStyle( currentTarget )
	// Todo: Only store the styles used by the editor.
	EditorStore.set( () => ( { currentSelector, currentStyles } ) )
} )

Evt.on( 'focusUnlocked', () => {
	EditorStore.set( () => ( { currentSelector: '' } ) )
} )
