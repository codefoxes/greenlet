import { getSelector } from './DomTreeHandler'
import { DomTreeStore, useStore } from './DomTreeStore'
import styles from './DomTree.scss'
import SelectSearch from 'react-select-search'
import SelectStyles from './Select.scss'

function DomTree() {
	const { currentTarget, showDomTree } = useStore( DomTreeStore )
	return (
		<div id="cw-domtree">
			{ showDomTree ? DomTreeElement( getSelector( currentTarget ) ) : 'Click any element to show DOM element tree here'}
			<style type="text/css">{ styles } { SelectStyles }</style>
		</div>
	)
}

function DomTreeElement( domTree ) {
	console.log(domTree)
	return (
		<ul className="cw-domtree-list">
			{ domTree.map( ( element, i ) => (
                <li key={ `${ element.tag.name }-${ i }` } className={ `cw-domtree-elements ${ element.tag.selected === true ? 'selected' : '' }`}>
                    { element.tag.name }
                    { ( element.id.name || ( element.class && element.class.length > 0 ) ) ? (
                        <div className="cw-node-attributes">
                            <DomAttributeSelectSearch element={ element } />
                        </div>
                    ) : null }
                </li>
            ) ) }
		</ul>
	)
}

function DomAttributeSelectSearch( { element } ) {
	const selectOptions = []
	if ( element.id && element.id.name ) {
		selectOptions.push( {
			name: 'Select Id',
			type: 'group',
			items: [ {
				value: element.id.name,
				name: element.id.name,
				selected: element.id.selected,
				highlighted: element.id.selected,
			} ]
		} )
	}

	if ( element.class && element.class.length > 0 ) {
		const classOptions = []
		element.class.map( ( cls ) => (
			classOptions.push( {
				value: cls.name,
				name: cls.name,
				selected: cls.selected,
				highlighted: cls.selected,
			} )
		) )

		selectOptions.push( {
			name: 'Select Class',
			type: 'group',
			items: classOptions
		} )
	}

	return (
		<SelectSearch options={ selectOptions } multiple />
	)
}

export default DomTree
