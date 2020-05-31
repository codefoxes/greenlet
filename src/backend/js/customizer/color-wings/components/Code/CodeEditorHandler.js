import { Evt } from '../../global/Event'
import { waitUntil } from '../../../../common/Helpers'
import { StylesStore } from '../../global/StylesStore'
import { MainStore } from '../../global/MainStore'

let cm = false
let isRunningChange = false
let isProgrammaticalChange = false
let changeOrigin

function onChange( i, changeObj ) {
	changeOrigin = changeObj.origin

	if ( isProgrammaticalChange === true || isRunningChange === true ) {
		return
	}

	isRunningChange = true
	StylesStore.addFromString( cm.getValue() )
	setTimeout( () => { isRunningChange = false }, 100 )
}

function mountCodeMirror( args ) {
	if ( cm !== false ) {
		return
	}

	const editorSettings = {
		indentUnit: 2,
		indentWithTabs: true,
		inputStyle: 'contenteditable',
		lineNumbers: true,
		autoRefresh: true,
		lineWrapping: true,
		styleActiveLine: true,
		continueComments: true,
		extraKeys: { "Ctrl-Space": "autocomplete", "Ctrl-/": "toggleComment", "Cmd-/": "toggleComment", "Alt-F": "findPersistent", "Ctrl-F": "findPersistent", "Cmd-F": "findPersistent" },
		direction: "ltr",
		gutters: [],
		mode: "text/css",
		lint: false,
		autoCloseBrackets: true,
		autoCloseTags: true,
		matchTags: { bothTags: true },
		tabSize: 2,
		matchBrackets: true
	}

	const [ resolved ] = waitUntil( !!( typeof wp !== 'undefined' && wp.hasOwnProperty( 'CodeMirror' ) ) )
	resolved( function() {
		cm = wp.CodeMirror.fromTextArea( document.getElementById( args.textAreaId ), editorSettings )
		cm.on( 'change', onChange )
	} )
}

StylesStore.subscribe( () => {
	// Todo: Debounce the Update

	isProgrammaticalChange = true

	if ( isRunningChange !== true ) {
		cm.getDoc().setValue( StylesStore.get().allOutputs[ MainStore.get().currentPage ] )
	}
	if ( changeOrigin === 'setValue' ) {
		cm.autoFormatRange( { line: 0, ch: 0 }, { line: cm.lineCount() } )
	}

	setTimeout( () => { isProgrammaticalChange = false }, 100 )
} )

Evt.on( 'textarea-ready', mountCodeMirror )
