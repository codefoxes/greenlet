import { FocusStore } from './FocusStore'
import { Evt } from '../../services/Event'

function getSelector( el ) {
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

const moveFocus = (e) => {
	// if (
	// 	e.target.id.includes( 'cw-focus' ) ||
	// 	e.target.id.includes( 'cw-canvas' ) ||
	// 	e.target.id.includes( 'cw-edit' )
	// ) {
	// 	return
	// }

	if ( FocusStore.isFocused() ) {
		return
	}

	const client = e.target.getBoundingClientRect()
	const offsetTop = window.pageYOffset + client.top
	const detailsTop = ( ( offsetTop - 24 ) < window.pageYOffset ) ? ( offsetTop + client.height ) : ( offsetTop - 24 )

	const newState = {
		focusLines: {
			top: {
				borderTop: '1px solid #7CB342',
				width: client.width,
				left: client.left,
				top: offsetTop
			},
			right: {
				borderRight: '1px solid #7CB342',
				height: client.height,
				left: client.right,
				top: offsetTop
			},
			bottom: {
				borderTop: '1px solid #7CB342',
				width: client.width + 1,
				left: client.left,
				top: window.pageYOffset + client.bottom
			},
			left: {
				borderRight: '1px solid #7CB342',
				height: client.height,
				left: client.left,
				top: offsetTop
			},
		},
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

function lockUnlockFocus(e) {
	e.preventDefault()
	e.stopPropagation()

	if ( FocusStore.isFocused() ) {
		FocusStore.unlockFocus()
		Evt.emit( 'focusUnlocked', FocusStore.get().focusDetails.selector )
	} else {
		FocusStore.lockFocus()
		Evt.emit( 'focusLocked', FocusStore.get().focusDetails.selector )
	}
}

const bodyContent = document.querySelectorAll( 'body > *:not(script):not(style):not(#color-wings)' )
bodyContent.forEach( el => {
	el.addEventListener( 'mouseover', moveFocus )
	el.addEventListener( 'click', lockUnlockFocus, true )
} )

// document.body.addEventListener( 'mouseover', moveFocus )

// document.addEventListener( 'click', lockUnlockFocus, true )
