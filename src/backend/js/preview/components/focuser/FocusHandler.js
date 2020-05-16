import { FocusStore } from './FocusStore'

const { Evt } = cw

const getSelector = ( el ) => {
	if ( el === document.body ) {
		return 'body'
	}

	if ( el.id !== '' ) {
		return `#${el.id}`
	}

	let selector = ''
	el.classList.forEach(cls => {
		// Ignore classes
		if ( selector.length > 20 ) {
			return false
		}

		selector += `.${cls}`
	})

	if ( el.classList.length === 0 ) {
		selector = el.tagName.toLowerCase()
	}

	const parentSelector = getSelector( el.parentElement )

	// Ignore classes
	if ( `${parentSelector} ${selector}`.length > 30 ) {
		return selector
	}

	return `${parentSelector} ${selector}`
}

const getFocusLinesNewState = ( client ) => {
	const offsetTop = window.pageYOffset + client.top
	return {
		top: {
			borderTopWidth: '1px',
			width: client.width,
			left: client.left,
			top: offsetTop
		},
		right: {
			borderRightWidth: '1px',
			height: client.height,
			left: client.right,
			top: offsetTop
		},
		bottom: {
			borderTopWidth: '1px',
			width: client.width + 1,
			left: client.left,
			top: window.pageYOffset + client.bottom
		},
		left: {
			borderRightWidth: '1px',
			height: client.height,
			left: client.left,
			top: offsetTop
		}
	}
}

let currentTarget
const moveFocus = (e) => {
	if ( FocusStore.isFocused() ) {
		return
	}

	currentTarget = e.target
	const client = currentTarget.getBoundingClientRect()
	const offsetTop = window.pageYOffset + client.top
	const detailsTop = ( ( offsetTop - 24 ) < window.pageYOffset ) ? ( offsetTop + client.height ) : ( offsetTop - 24 )

	const newState = {
		focusLines: getFocusLinesNewState( client ),
		focusDetails: {
			style: {
				left: client.left,
				top: detailsTop,
				height: '24px',
				background: '#7CB342'
			},
			selector: getSelector( e.target )
		}
	}

	FocusStore.moveFocus( newState )
}

const lockUnlockFocus = (e) => {
	e.preventDefault()
	e.stopPropagation()

	if ( FocusStore.isFocused() ) {
		FocusStore.unlockFocus()
		Evt.emit( 'focusUnlocked', FocusStore.get().focusDetails.selector )
	} else {
		FocusStore.lockFocus()
		Evt.emit( 'focusLocked', { currentSelector: FocusStore.get().focusDetails.selector, currentTarget } )
	}
}

const reduceFocus = () => { FocusStore.reduceFocusOpacity() }
const increaseFocus = () => { FocusStore.increaseFocusOpacity() }

export const updateFocus = () => {
	if ( currentTarget === undefined ) {
		return
	}

	const client = currentTarget.getBoundingClientRect()

	const newState = {
		focusLines: getFocusLinesNewState( client )
	}
	FocusStore.moveFocus( newState )
}

const bodyContent = document.querySelectorAll( 'body > *:not(script):not(style):not(#color-wings)' )
bodyContent.forEach( el => {
	el.addEventListener( 'mouseover', moveFocus )
	el.addEventListener( 'click', lockUnlockFocus, true )
} )

document.body.addEventListener( 'mouseleave', reduceFocus )
document.body.addEventListener( 'mouseenter', increaseFocus )
