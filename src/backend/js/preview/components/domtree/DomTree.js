import { getSelector } from './DomTreeHandler'
import { DomTreeStore, useStore } from './DomTreeStore'
import styles from './DomTree.scss'

function DomTree() {
    const { currentTarget, showDomTree } = useStore( DomTreeStore )

	return (
		<div id="cw-domtree">
            { showDomTree ? DomTreeElement( getSelector( currentTarget ) ) : 'Click any element to show DOM element tree here' }
            <style type="text/css">{ styles }</style>
		</div>
	)
}

function DomTreeElement(domTree) {
    return (
        <ul className="cw-domtree-list">
            { 
                domTree.map( ( element ) => (
                    <li className="cw-domtree-elements">
                        { element.tag }
                    </li>
                ) ) 
            }
        </ul> 
    )
    //return "Constructed DOM Tree"
}

export default DomTree