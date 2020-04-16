import { EditorStore } from './EditorStore'
import { Evt } from '../../services/Event'

Evt.on( 'focusLocked', ( currentSelector ) => {
	EditorStore.set( () => ( { currentSelector } ) )
} )

Evt.on( 'focusUnlocked', () => {
	EditorStore.set( () => ( { currentSelector: '' } ) )
} )
