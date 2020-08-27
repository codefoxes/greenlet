export function debounce(callback, wait, immediate = false) {
	let timeout = null

	return function() {
		const callNow = immediate && !timeout
		const next = () => callback.apply(this, arguments)

		clearTimeout(timeout)
		timeout = setTimeout(next, wait)

		if (callNow) {
			next()
		}
	}
}

export function isCustomizer() {
	// return !!( typeof wp !== 'undefined' && wp.hasOwnProperty( 'customize' ) )
}

export function setGlobals() {
	// window.greenlet = {
	// 	Evt: {
	// 		send: ( id, data ) => wp.customize.previewer.send( id, data ),
	// 		on: ( id, cb ) => wp.customize.previewer.bind( id, cb )
	// 	}
	// }

	// window.greenlet = {
	// 	Messenger: new wp.customize.Messenger( {
	// 		channel : 'greenlet',
	// 		targetWindow : window.parent,
	// 		url : wp.customize.settings.url.allowed[ 0 ],
	// 	} )
	// }

	// greenlet.Messenger.send( 'start-customize', control.params.position )
	// greenlet.Messenger.bind( 'start-customize', d => console.log( d ) )
}
