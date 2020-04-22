import { Evt } from '../../global/Event'
import { waitUntil } from '../../../../common/Helpers'
import { StylesStore } from '../../global/StylesStore'

let cm = false

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
	} )
}

StylesStore.subscribe( () => {
	// Todo: Debounce the Update
	cm.getDoc().setValue( StylesStore.get().output )
	cm.autoFormatRange( { line: 0, ch: 0 }, { line: cm.lineCount() } )
} )

Evt.on( 'textarea-ready', mountCodeMirror )
