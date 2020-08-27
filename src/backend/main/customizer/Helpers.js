export const $ = jQuery

export function setGlobals() {
	// window.greenlet = {
	// 	Messenger: new wp.customize.Messenger( {
	// 		channel : 'greenlet',
	// 		targetWindow : document.getElementById( 'customize-preview' ).getElementsByTagName( 'iframe' )[0].contentWindow,
	// 		url : wp.customize.settings.url.allowed[ 0 ],
	// 	} )
	// }
}

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
