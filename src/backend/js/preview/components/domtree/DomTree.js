import { getSelector } from './DomTreeHandler'
import { DomTreeStore, useStore } from './DomTreeStore'
import styles from './DomTree.scss'
import SelectSearch from 'react-select-search'
import SelectStyles from './Select.scss'

function DomTree() {
    const { currentTarget, showDomTree } = useStore( DomTreeStore )

	return (
		<div id="cw-domtree">
            { showDomTree ? DomTreeElement( getSelector( currentTarget ) ) : 'Click any element to show DOM element tree here' }
            <style type="text/css">{ styles }</style>
            <style type="text/css">{ SelectStyles }</style>
		</div>
	)
}

function DomTreeElement(domTree) {
    return (
        <ul className="cw-domtree-list">
            { 
                domTree.map( ( element, i ) => (
                    <li key={ `${element.tag}-${i}` } className="cw-domtree-elements">
                        { element.tag }
                        { ( element.id || ( element.class && element.class.length > 0 ) ) ?
                            <div className="cw-node-attributes">
                                <DomAttributeSelectSearch element={ element } />
                            </div>
                        : null
                        }
                    </li>
                ) ) 
            }
        </ul> 
    )
}
function DomAttributeSelectSearch( { element } ) {
    const selectOptions = []
    if ( element.id ) {
        selectOptions.push( {
            name: 'Select Id',
            type: 'group',
            items: [ {
                value: element.id,
                name: element.id,
            } ]
        })
    }

    if ( element.class && element.class.length > 0 ) {
        const classOptions = []
        element.class.map( ( cls, i ) => (
            classOptions.push( {
                value: cls,
                name: cls,
            } )
        ) )

        selectOptions.push({
            name: 'Select Class',
            type: 'group',
            items: classOptions
        })
    }

    return (
        <SelectSearch options={ selectOptions } multiple />
    )
}

export default DomTree
