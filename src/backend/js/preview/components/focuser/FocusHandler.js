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
	const selectors = []
	el.classList.forEach(cls => {
		// Ignore classes
		if ( selectors.length >= 2 ) {
			return false
		}

		// Ignore autogen sequential classes
		if ( /\w*-\d*/.test(`${cls}`) ) {
			return false
		}
		selector += `.${cls}`
		selectors.push(cls)
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
const moveFocus = ( ip, force = false ) => {
	if ( FocusStore.isFocused() && force === false ) {
		return
	}

	let isSelector = false
	if ( ip.target === undefined ) {
		currentTarget = document.querySelector( ip )
		isSelector = true
	} else {
		currentTarget = ip.target
	}

	const client = currentTarget.getBoundingClientRect()
	const offsetTop = window.pageYOffset + client.top
	let detailsTop = ( ( offsetTop - 24 ) < window.pageYOffset ) ? ( offsetTop + client.height ) : ( offsetTop - 24 )
	if ( detailsTop >= document.body.clientHeight ) {
		detailsTop = 0
	}

	const newState = {
		focusLines: getFocusLinesNewState( client ),
		focusDetails: {
			style: {
				left: client.left,
				top: detailsTop,
				height: '24px',
				background: '#7CB342'
			},
			selector: isSelector ? ip : getSelector( currentTarget )
		}
	}

	FocusStore.moveFocus( newState )
}

const lockUnlockFocus = ( e, op = null ) => {
	if ( e ) {
		e.preventDefault()
		e.stopPropagation()
	}

	if ( FocusStore.isFocused() && op !== 'lock' ) {
		FocusStore.unlockFocus()
		Evt.emit( 'focusUnlocked', FocusStore.get().focusDetails.selector )
	} else {
		FocusStore.lockFocus()
		Evt.emit( 'focusLocked', { currentSelector: FocusStore.get().focusDetails.selector, currentTarget } )
	}
	cw.MainStore.setSelectorClass()
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

const updateSelector = ( selector ) => {
	let el = null
	try { el = document.querySelector( selector ) } catch {}

	if ( el === null ) {
		cw.MainStore.setSelectorClass( 'invalid' )
	} else {
		moveFocus( selector, true )
		lockUnlockFocus( false, 'lock' )
	}
}

const bodyContent = document.querySelectorAll( 'body > *:not(script):not(style):not(#color-wings)' )
bodyContent.forEach( el => { el.addEventListener( 'mouseover', moveFocus ) } )

cw.Evt.on( 'mount-colorwings', () => {
	bodyContent.forEach( el => {
		el.addEventListener( 'click', lockUnlockFocus, true )
	} )
})

cw.Evt.on( 'unmount-colorwings', () => {
	bodyContent.forEach( el => {
		el.removeEventListener( 'click', lockUnlockFocus, true )
	} )
})

document.body.addEventListener( 'mouseleave', reduceFocus )
document.body.addEventListener( 'mouseenter', increaseFocus )

// Quick Select
const selectors = [
	{ name: 'Body', sel: 'body' },
	{ name: 'Header', sel: '.site-header' },
	{ name: 'Content Wrapper', sel: '.site-content' },
	{ name: 'Main Content', sel: '.main' },
	{ name: 'Sidebar', sel: '.sidebar' },
	{ name: 'Footer', sel: '.site-footer' },
	{ name: 'Buttons', sel: 'button' },
	{ name: 'Links', sel: 'a' },
	{ name: 'Inputs', sel: 'input' },
	{ name: 'H1', sel: 'h1' },
	{ name: 'H2', sel: 'h2' },
	{ name: 'Paragraphs', sel: 'p' },
	{ name: 'Code', sel: 'code' },
	{ name: 'Article Card', sel: '.entry-article' },
]

const filtered = selectors.filter( item => ( null !== document.querySelector( item.sel ) ) )
cw.MainStore.setQuickSelectors( filtered )

cw.Evt.on( 'select-element', ( selector ) => {
	moveFocus( selector )
	lockUnlockFocus()
})

cw.Evt.on( 'update-selector', ( selector ) => {
	updateSelector( selector )
})
