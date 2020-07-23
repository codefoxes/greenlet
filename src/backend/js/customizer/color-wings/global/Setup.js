import { Evt } from './Event'
import { StylesStore } from './StylesStore'
import { MainStore } from './MainStore'

window.cw = {
	Evt,
	StylesStore,
	MainStore
}

Object.filter = ( obj, predicate ) => Object.fromEntries( Object.entries( obj ).filter( predicate ) )
