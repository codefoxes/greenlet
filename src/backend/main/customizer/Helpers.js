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

export function arrayMoveMutate(array, from, to) {
	const startIndex = from < 0 ? array.length + from : from

	if (startIndex >= 0 && startIndex < array.length) {
		const endIndex = to < 0 ? array.length + to : to

		const [item] = array.splice(from, 1)
		array.splice(endIndex, 0, item)
	}
}

export function arrayMove(array, from, to) {
	array = [ ...array ]
	arrayMoveMutate(array, from, to)
	return array
}
