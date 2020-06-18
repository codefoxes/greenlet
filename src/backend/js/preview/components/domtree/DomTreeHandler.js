import { DomTreeStore } from './DomTreeStore'

const { Evt } = window.cw

Evt.on( 'focusLocked', ( data ) => DomTreeStore.showDomTree( data ) )

export const getSelector = ( el ) => {
	const domTree = []
	const element = {
		tag: '',
		id: '',
		class: []
	}
	// Todo: what if el === null ?
	if ( el === document.body || null === el ) {
		element.tag = 'body'
		domTree.push( element )
		return domTree
	}
	element.tag = el.tagName.toLowerCase()
	if ( el.id !== '' ) {
		element.id = el.id
	}

	const selectors = []
	el.classList.forEach( cls => {
		if ( selectors.length >= 4 ) {
			return false
		}

		// Ignore autogen sequential classes.
		if ( /\w*-\d*/.test( `${cls}` ) ) {
			return false
		}
		selectors.push( cls )
	} )
	element.class = selectors

	const parentDomTree = getSelector( el.parentElement )

	parentDomTree.push( element )

	return parentDomTree
}
