import { Store, useStore } from '../../../common/Store'

const initialState = {
	currentTarget: '',
    showDomTree: false
}

class DomTreeClass extends Store {
    showDomTree( data ) {
        this.set( () => ( { currentTarget: data.currentTarget } ) )
        this.set( () => ( { showDomTree: true } ) )
    }
}

const DomTreeStore = new DomTreeClass( initialState )

export { DomTreeStore, useStore }
