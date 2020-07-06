import { updateFocus } from '../components/focuser/FocusHandler'
import { debounce } from '../../common/Helpers'

const addCWStylesTag = ( id  = 'cw-applied-styles' ) => {
	const styleTag = document.createElement( 'style' )
	styleTag.id  = id
	document.head.appendChild( styleTag )
	return styleTag
}

const addCWLinkTag = ( id ) => {
	const linkTag = document.createElement( 'link' )
	linkTag.id  = id
	linkTag.rel  = 'stylesheet'
	document.head.appendChild( linkTag )
	return linkTag
}

const styleTagMain = addCWStylesTag()
const styleTagTemp = addCWStylesTag( 'cw-temp-styles' )
const fontLinkTag = addCWLinkTag( 'cw-applied-font' )

const addStyles = () => {
	const { allOutputs } = cw.StylesStore.get()
	let output = ''
	for ( const page in allOutputs ) {
		if ( ! allOutputs.hasOwnProperty( page ) ) { continue }
		if ( page === 'global' ) {
			output += allOutputs[ page ]
		} else if ( ( page in window.cwPreviewObject ) && window.cwPreviewObject[ page ] === '1' ) {
			output += allOutputs[ page ]
		}
	}
	styleTagMain.innerHTML = output
	styleTagTemp.innerHTML = ''
}

const addTempStyles = ( styleOutput ) => ( styleTagTemp.innerHTML = styleOutput )

const debouncedUpdateFocus = debounce( updateFocus, 500, true )

// Not Needed
function appendCWFont( font ) {
	if ( ! window.cWCustomFonts ) {
		window.cWCustomFonts = {}
	}
	const source = font.source
	const family = font.family
	const style  = ( 'normal' === font.style ) ? '' : 'i'
	const weight = `${font.weight}${style}`
	if ( source in window.cWCustomFonts ) {
		if ( family in window.cWCustomFonts[ source ] ) {
			if ( ! window.cWCustomFonts[ source ][ family ].includes( weight ) ) {
				window.cWCustomFonts[ source ][ family ].push( weight )
			}
		} else {
			window.cWCustomFonts[ source ][ family ] = [ weight ]
		}
	} else {
		window.cWCustomFonts[ source ] = { [family]: [ weight ] }
	}
}

const addFont = () => {
	const { currentPage, allFonts } = cw.MainStore.get()
	for ( const source in allFonts[ currentPage ] ) {
		if ( ! allFonts[ currentPage ].hasOwnProperty( source ) ) { continue }
		const fonts = allFonts[ currentPage ][ source ]
		if ( 'google' === source ) {
			const args = []
			for ( const family in fonts ) {
				if ( ! fonts.hasOwnProperty( family ) ) { continue }
				const weights = fonts[ family ]
				const familyFormatted = family.replace( ' ', '+' )
				args.push( `${familyFormatted}:${ weights.join( ',' ) }` )
			}
			fontLinkTag.href = `https://fonts.googleapis.com/css?family=${ args.join( '|' ) }&display=fallback`
		}
		// Todo: Add custom fonts.
	}
}

cw.StylesStore.registerSpecialSubscriber( addTempStyles )
cw.StylesStore.registerSpecialSubscriber( addFont, 'fontManager' )
cw.StylesStore.subscribe( addStyles )
cw.StylesStore.subscribe( debouncedUpdateFocus )
