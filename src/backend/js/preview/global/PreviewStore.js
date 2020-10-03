import { Store, useStore } from '../../common/Store'

const initialState = {
	currentTarget: '',
	showDomTree: false,
	domTree: []
}

class PreviewClass extends Store {
    showDomTree( data ) {
        this.set( () => ( { currentTarget: data.currentTarget } ) )
        this.set( () => ( { showDomTree: true } ) )
	}
	
	updateDomTree( domTree ) {
		this.set( () => ( { domTree } ) )
	}
}

const PreviewStore = new PreviewClass( initialState )

export { PreviewStore, useStore }
