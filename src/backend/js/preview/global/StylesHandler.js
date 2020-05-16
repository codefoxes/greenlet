import { updateFocus } from '../components/focuser/FocusHandler'
import { debounce } from '../../common/Helpers'

const addCWStylesTag = ( id  = 'cw-applied-styles' ) => {
	const styleTag = document.createElement( 'style' )
	styleTag.id  = id
	document.head.appendChild( styleTag )
	return styleTag
}

const styleTagMain = addCWStylesTag()
const styleTagTemp = addCWStylesTag( 'cw-temp-styles' )

const addStyles = () => {
	const { output } = cw.StylesStore.get()
	styleTagMain.innerHTML = output
}

const addTempStyles = ( styleOutput ) => ( styleTagTemp.innerHTML = styleOutput )

const debouncedUpdateFocus = debounce( updateFocus, 500, true )

cw.StylesStore.registerTempStyler( addTempStyles )
cw.StylesStore.subscribe( addStyles )
cw.StylesStore.subscribe( debouncedUpdateFocus )
