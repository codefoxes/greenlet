import { StylesStore } from './StylesStore'
import { MainStore } from './MainStore'

const sendUpdateControlEvent = () => {
	const styles = StylesStore.get().output
	const { currentPage, currentPageType } = MainStore.get()

	const currentStylesDetails = {}
	currentStylesDetails[ currentPage ] = { type: currentPageType, styles }

	cw.Evt.emit( 'update-control', currentStylesDetails )
}

let { currentPage } = MainStore.get()
const updateOnPageChange = () => {
	const page = MainStore.get().currentPage
	if ( page !== currentPage ) {
		sendUpdateControlEvent()
		currentPage = page
	}
}

StylesStore.subscribe( sendUpdateControlEvent )
MainStore.subscribe( updateOnPageChange )

function addInitialStyles( control ) {
	let current
	if ( 'global' in control.setting._value ) {
		current = control.setting._value.global
	} else {
		const keys = Object.keys( control.setting._value )
		if ( keys.length > 0 ) {
			current = control.setting._value[ keys[0] ]
			MainStore.changePage( keys[0], current.type )
		}
	}
	StylesStore.addInitialStyle( current.styles )
}

function addPreviewObject( previewObject ) {
	MainStore.addPreviewObject( previewObject )
}

cw.Evt.on( 'colorwings-will-mount', addInitialStyles )

cw.Evt.on( 'preview-object-ready', addPreviewObject )
