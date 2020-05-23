import { DomTreeStore } from './DomTreeStore'

const { Evt } = window.cw

Evt.on( 'focusLocked', ( data ) => {
    DomTreeStore.showDomTree( data )
} )

export const getSelector = ( el ) => {
    const domTree = []
    const element = {
        tag: '',
        id: '',
        class: []
    }
	if ( el === document.body ) {
        element.tag = 'body';
        domTree.push(element)
		return domTree;
	}
    element.tag = el.tagName.toLowerCase()
	if ( el.id !== '' ) {
		element.id = el.id
	}

	const selectors = []
	el.classList.forEach(cls => {
		if ( selectors.length >= 4 ) {
			return false
		}

		//Ignore autogen sequential classes
		var regex = /\w*-\d*/
		if ( regex.test(`${cls}`) ) {
			return false
		}
		selectors.push(cls)
	})
    element.class = selectors

    const parentDomTree = getSelector( el.parentElement )
    
    parentDomTree.push(element)
    //domTree.push(element)

    return parentDomTree
}