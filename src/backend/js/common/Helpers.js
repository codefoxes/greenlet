export const $ = jQuery

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

export function waitUntil( condition, interval = 100, timeout = 10000 ) {
	let resolveCb
	const resolved = ( cb, ...args ) => {
		resolveCb = cb
	}

	// Todo: Add rejected logic.
	const rejected = () => {}

	let counter = timeout / interval
	const intId = setInterval( () => {
		counter--
		if ( ( condition === true ) && ( typeof resolveCb === 'function' ) ) {
			resolveCb()
			clearInterval( intId )
		}
		if ( counter <= 0 ) {
			clearInterval( intId )
		}
	}, interval )

	return [ resolved, rejected ]
}
