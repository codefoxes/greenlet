import { updateFocus } from '../components/focuser/FocusHandler'
import { debounce } from '../../common/Helpers'

let styleTag

const addCWStylesTag = () => {
	styleTag = document.createElement( 'style' )
	styleTag.id  = 'cw-applied-styles'
	document.head.appendChild( styleTag )
}

addCWStylesTag()

const addStyles = () => {
	const { output } = cw.StylesStore.get()
	styleTag.innerHTML = output
}

const debouncedUpdateFocus = debounce( updateFocus, 500, true )

cw.StylesStore.subscribe( addStyles )
cw.StylesStore.subscribe( debouncedUpdateFocus )
