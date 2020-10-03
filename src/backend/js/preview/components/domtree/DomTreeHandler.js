import { DomTreeStore } from './DomTreeStore'

const { Evt } = window.cw

Evt.on( 'focusLocked', ( data ) => DomTreeStore.showDomTree( data ) )

export const getSelector = ( el ) => {
	//console.log(el.cw_selected)
	const domTree = []
	const element = {
		tag:{},
		id: {},
		class: []
	}

	if ( el === document.body || null === el ) {
		element.tag.name = 'body'
		element.tag.selected = el.cw_selected ? el.cw_selected.tagSelected : false
		domTree.push( element )
		return domTree
	}
	element.tag.name = el.tagName.toLowerCase()
	element.tag.selected = el.cw_selected ? el.cw_selected.tagSelected : false

	if ( el.id !== '' ) {
		element.id.name = el.id
		element.id.selected = el.cw_selected ? el.cw_selected.idSelected : false
	}

	const selectors = []
	el.classList.forEach( cls => {
		const clsObject = {
			name: cls,
			selected: el.cw_selected ? el.cw_selected.classSelected.includes( cls ) : false
		}
		selectors.push( clsObject )
	} )
	element.class = selectors

	const parentDomTree = getSelector( el.parentElement )

	parentDomTree.push( element )

	return parentDomTree
}
