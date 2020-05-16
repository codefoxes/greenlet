import { StylesStore } from './StylesStore'
import { MainStore } from './MainStore'

let control
const isObject = obj => ( obj === Object( obj ) )

const sendUpdateControlEvent = () => {
	const styles = StylesStore.get().output
	const { currentPage, currentPageType } = MainStore.get()

	let currentStylesDetails
	if ( ! isObject( control.setting._value ) ) {
		currentStylesDetails = {}
	} else {
		currentStylesDetails = JSON.parse( JSON.stringify( control.setting._value ) )
	}

	currentStylesDetails[ currentPage ] = { type: currentPageType, styles }

	cw.Evt.emit( 'update-control', currentStylesDetails )
}

let { currentPage } = MainStore.get()
const updateOnPageChange = () => {
	const page = MainStore.get().currentPage
	if ( page !== currentPage ) {
		if ( isObject( control.setting._value ) && ( page in control.setting._value ) ) {
			const currentStyles = control.setting._value[ page ].styles
			StylesStore.addFromString( currentStyles )
		} else {
			StylesStore.addFromString( '' )
		}

		sendUpdateControlEvent()
		currentPage = page
	}
}

StylesStore.subscribe( sendUpdateControlEvent )
MainStore.subscribe( updateOnPageChange )

function addInitialStyles( api ) {
	control = api
	if ( ! api.setting._value ) {
		return
	}

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
